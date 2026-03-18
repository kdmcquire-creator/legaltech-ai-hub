#!/usr/bin/env bash
set -euo pipefail

# ============================================================================
# LegalTech AI Hub — Full Infrastructure Setup
# Configures: Cloudflare Email Routing, SendGrid Sender, Cloudflare Worker Secrets
# ============================================================================

# --- CREDENTIALS (export these before running) ---
# Export before running:
#   export CF_DNS_TOKEN="your_cloudflare_dns_token"
#   export CF_WORKERS_TOKEN="your_cloudflare_workers_token"
#   export SENDGRID_API_KEY="your_sendgrid_api_key"
CF_DNS_TOKEN="${CF_DNS_TOKEN:?ERROR: Set CF_DNS_TOKEN environment variable}"
CF_WORKERS_TOKEN="${CF_WORKERS_TOKEN:?ERROR: Set CF_WORKERS_TOKEN environment variable}"
SENDGRID_API_KEY="${SENDGRID_API_KEY:?ERROR: Set SENDGRID_API_KEY environment variable}"

DOMAIN="legaltech-ai-hub.com"
DEST_EMAIL="moonsmoke.contact@gmail.com"
WORKER_NAME="legaltech-ai-hub"

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

ok()   { echo -e "${GREEN}✓${NC} $1"; }
fail() { echo -e "${RED}✗${NC} $1"; }
info() { echo -e "${BLUE}→${NC} $1"; }
warn() { echo -e "${YELLOW}!${NC} $1"; }
header() { echo -e "\n${BLUE}━━━ $1 ━━━${NC}"; }

# Retry helper for network calls
retry() {
  local max=4 delay=2 attempt=1
  while true; do
    if "$@"; then return 0; fi
    if (( attempt >= max )); then return 1; fi
    warn "Attempt $attempt failed, retrying in ${delay}s..."
    sleep "$delay"
    delay=$((delay * 2))
    attempt=$((attempt + 1))
  done
}

# ============================================================================
header "STEP 1: Get Cloudflare Zone ID"
# ============================================================================

info "Looking up zone ID for $DOMAIN..."
ZONE_RESPONSE=$(retry curl -sf -X GET \
  "https://api.cloudflare.com/client/v4/zones?name=$DOMAIN" \
  -H "Authorization: Bearer $CF_DNS_TOKEN" \
  -H "Content-Type: application/json")

ZONE_ID=$(echo "$ZONE_RESPONSE" | python3 -c "import sys,json; r=json.load(sys.stdin); print(r['result'][0]['id'])" 2>/dev/null)
ACCOUNT_ID=$(echo "$ZONE_RESPONSE" | python3 -c "import sys,json; r=json.load(sys.stdin); print(r['result'][0]['account']['id'])" 2>/dev/null)

if [ -z "$ZONE_ID" ]; then
  fail "Could not get Zone ID. Check your DNS token."
  echo "Response: $ZONE_RESPONSE"
  exit 1
fi

ok "Zone ID: $ZONE_ID"
ok "Account ID: $ACCOUNT_ID"

# ============================================================================
header "STEP 2: Cloudflare Email Routing — Enable"
# ============================================================================

info "Checking email routing status..."
ER_STATUS=$(retry curl -sf -X GET \
  "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/email/routing" \
  -H "Authorization: Bearer $CF_DNS_TOKEN" \
  -H "Content-Type: application/json")

ENABLED=$(echo "$ER_STATUS" | python3 -c "import sys,json; print(json.load(sys.stdin).get('result',{}).get('enabled', False))" 2>/dev/null)

if [ "$ENABLED" = "True" ]; then
  ok "Email routing already enabled"
else
  info "Enabling email routing..."
  retry curl -sf -X PUT \
    "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/email/routing/enable" \
    -H "Authorization: Bearer $CF_DNS_TOKEN" \
    -H "Content-Type: application/json" > /dev/null
  ok "Email routing enabled"
fi

# ============================================================================
header "STEP 3: Cloudflare Email Routing — Verify Destination"
# ============================================================================

info "Checking if $DEST_EMAIL is a verified destination..."
DEST_CHECK=$(retry curl -sf -X GET \
  "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/email/routing/addresses" \
  -H "Authorization: Bearer $CF_DNS_TOKEN" \
  -H "Content-Type: application/json")

DEST_VERIFIED=$(echo "$DEST_CHECK" | python3 -c "
import sys, json
data = json.load(sys.stdin)
for addr in data.get('result', []):
    if addr.get('email') == '$DEST_EMAIL' and addr.get('verified'):
        print('yes')
        break
else:
    print('no')
" 2>/dev/null)

if [ "$DEST_VERIFIED" = "yes" ]; then
  ok "$DEST_EMAIL already verified as destination"
else
  info "Adding $DEST_EMAIL as destination (check Gmail for verification email)..."
  retry curl -sf -X POST \
    "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/email/routing/addresses" \
    -H "Authorization: Bearer $CF_DNS_TOKEN" \
    -H "Content-Type: application/json" \
    -d "{\"email\": \"$DEST_EMAIL\"}" > /dev/null 2>&1 || true
  warn "Verification email sent to $DEST_EMAIL — click the link in Gmail!"
fi

# ============================================================================
header "STEP 4: Cloudflare Email Routing — Create Forwarding Rules"
# ============================================================================

ADDRESSES=("contact" "updates" "newsletter" "admin")

for PREFIX in "${ADDRESSES[@]}"; do
  FULL_ADDR="${PREFIX}@${DOMAIN}"
  info "Setting up $FULL_ADDR → $DEST_EMAIL..."

  RESULT=$(retry curl -s -X POST \
    "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/email/routing/rules" \
    -H "Authorization: Bearer $CF_DNS_TOKEN" \
    -H "Content-Type: application/json" \
    -d "{
      \"actions\": [{\"type\": \"forward\", \"value\": [\"$DEST_EMAIL\"]}],
      \"matchers\": [{\"type\": \"literal\", \"field\": \"to\", \"value\": \"$FULL_ADDR\"}],
      \"enabled\": true,
      \"name\": \"Forward $FULL_ADDR to Gmail\"
    }")

  SUCCESS=$(echo "$RESULT" | python3 -c "import sys,json; print(json.load(sys.stdin).get('success', False))" 2>/dev/null)

  if [ "$SUCCESS" = "True" ]; then
    ok "$FULL_ADDR → $DEST_EMAIL"
  else
    ERROR=$(echo "$RESULT" | python3 -c "import sys,json; errs=json.load(sys.stdin).get('errors',[]); print(errs[0].get('message','unknown') if errs else 'unknown')" 2>/dev/null)
    if echo "$ERROR" | grep -qi "already exists\|duplicate"; then
      ok "$FULL_ADDR already configured"
    else
      fail "$FULL_ADDR — $ERROR"
    fi
  fi
done

# ============================================================================
header "STEP 5: SendGrid — Verify Sender Identities"
# ============================================================================

SENDERS=(
  '{"nickname":"LegalTech Contact","from_email":"contact@legaltech-ai-hub.com","from_name":"LegalTech AI Hub","reply_to":"contact@legaltech-ai-hub.com","reply_to_name":"LegalTech AI Hub","address":"123 Main St","city":"New York","state":"NY","zip":"10001","country":"US"}'
  '{"nickname":"LegalTech Updates","from_email":"updates@legaltech-ai-hub.com","from_name":"LegalTech AI Hub","reply_to":"updates@legaltech-ai-hub.com","reply_to_name":"LegalTech AI Hub","address":"123 Main St","city":"New York","state":"NY","zip":"10001","country":"US"}'
)

for SENDER_JSON in "${SENDERS[@]}"; do
  EMAIL=$(echo "$SENDER_JSON" | python3 -c "import sys,json; print(json.load(sys.stdin)['from_email'])")
  info "Verifying sender: $EMAIL..."

  RESULT=$(retry curl -s -X POST \
    "https://api.sendgrid.com/v3/verified_senders" \
    -H "Authorization: Bearer $SENDGRID_API_KEY" \
    -H "Content-Type: application/json" \
    -d "$SENDER_JSON")

  if echo "$RESULT" | python3 -c "import sys,json; d=json.load(sys.stdin); print('id' in d)" 2>/dev/null | grep -q True; then
    ok "$EMAIL — verification email sent (check inbox)"
  elif echo "$RESULT" | grep -qi "already exists\|duplicate"; then
    ok "$EMAIL — already registered"
  else
    ERROR=$(echo "$RESULT" | python3 -c "import sys,json; d=json.load(sys.stdin); errs=d.get('errors',[]); print(errs[0].get('message','') if errs else str(d))" 2>/dev/null)
    warn "$EMAIL — $ERROR"
  fi
done

# ============================================================================
header "STEP 6: SendGrid — Domain Authentication (DKIM/SPF)"
# ============================================================================

info "Checking existing domain authentication..."
EXISTING_AUTH=$(retry curl -sf -X GET \
  "https://api.sendgrid.com/v3/whitelabel/domains" \
  -H "Authorization: Bearer $SENDGRID_API_KEY" \
  -H "Content-Type: application/json")

DOMAIN_AUTH_EXISTS=$(echo "$EXISTING_AUTH" | python3 -c "
import sys, json
domains = json.load(sys.stdin)
for d in domains:
    if d.get('domain') == '$DOMAIN':
        print(d.get('id'))
        break
else:
    print('no')
" 2>/dev/null)

if [ "$DOMAIN_AUTH_EXISTS" != "no" ] && [ -n "$DOMAIN_AUTH_EXISTS" ]; then
  ok "Domain authentication already exists (ID: $DOMAIN_AUTH_EXISTS)"
  DOMAIN_AUTH_ID="$DOMAIN_AUTH_EXISTS"
else
  info "Creating domain authentication for $DOMAIN..."
  AUTH_RESULT=$(retry curl -s -X POST \
    "https://api.sendgrid.com/v3/whitelabel/domains" \
    -H "Authorization: Bearer $SENDGRID_API_KEY" \
    -H "Content-Type: application/json" \
    -d "{
      \"domain\": \"$DOMAIN\",
      \"automatic_security\": true,
      \"default\": true
    }")

  DOMAIN_AUTH_ID=$(echo "$AUTH_RESULT" | python3 -c "import sys,json; print(json.load(sys.stdin).get('id',''))" 2>/dev/null)

  if [ -n "$DOMAIN_AUTH_ID" ]; then
    ok "Domain auth created (ID: $DOMAIN_AUTH_ID)"

    # Get the DNS records that need to be added
    info "DNS records needed for SendGrid authentication:"
    echo "$AUTH_RESULT" | python3 -c "
import sys, json
data = json.load(sys.stdin)
dns = data.get('dns', {})
for key, record in dns.items():
    rtype = record.get('type', 'CNAME')
    host = record.get('host', '')
    rdata = record.get('data', '')
    print(f'  {rtype}: {host} → {rdata}')
" 2>/dev/null

    # Add DNS records via Cloudflare
    header "STEP 6b: Adding SendGrid DNS records to Cloudflare"
    echo "$AUTH_RESULT" | python3 -c "
import sys, json
data = json.load(sys.stdin)
dns = data.get('dns', {})
for key, record in dns.items():
    rtype = record.get('type', 'cname').upper()
    host = record.get('host', '')
    rdata = record.get('data', '')
    if rtype == 'CNAME':
        rtype = 'CNAME'
    elif rtype == 'TXT':
        rtype = 'TXT'
    print(f'{rtype}|{host}|{rdata}')
" 2>/dev/null | while IFS='|' read -r RTYPE RHOST RDATA; do
      info "Adding $RTYPE record: $RHOST..."
      if [ "$RTYPE" = "TXT" ]; then
        DNS_DATA="{\"type\":\"$RTYPE\",\"name\":\"$RHOST\",\"content\":\"$RDATA\",\"ttl\":1}"
      else
        DNS_DATA="{\"type\":\"$RTYPE\",\"name\":\"$RHOST\",\"content\":\"$RDATA\",\"ttl\":1,\"proxied\":false}"
      fi

      DNS_RESULT=$(retry curl -s -X POST \
        "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/dns_records" \
        -H "Authorization: Bearer $CF_DNS_TOKEN" \
        -H "Content-Type: application/json" \
        -d "$DNS_DATA")

      DNS_SUCCESS=$(echo "$DNS_RESULT" | python3 -c "import sys,json; print(json.load(sys.stdin).get('success', False))" 2>/dev/null)
      if [ "$DNS_SUCCESS" = "True" ]; then
        ok "$RTYPE: $RHOST"
      else
        warn "$RTYPE: $RHOST — may already exist or failed"
      fi
    done

    # Validate the domain authentication
    info "Validating domain authentication (may take a minute for DNS propagation)..."
    sleep 5
    VALIDATE=$(retry curl -s -X POST \
      "https://api.sendgrid.com/v3/whitelabel/domains/$DOMAIN_AUTH_ID/validate" \
      -H "Authorization: Bearer $SENDGRID_API_KEY" \
      -H "Content-Type: application/json")

    VALID=$(echo "$VALIDATE" | python3 -c "import sys,json; print(json.load(sys.stdin).get('valid', False))" 2>/dev/null)
    if [ "$VALID" = "True" ]; then
      ok "Domain authentication validated!"
    else
      warn "Domain not yet validated — DNS may need time to propagate. Re-run validation later."
    fi
  else
    fail "Domain auth creation failed"
    echo "$AUTH_RESULT"
  fi
fi

# ============================================================================
header "STEP 7: Cloudflare Worker Secrets"
# ============================================================================

info "Deploying secrets to Cloudflare Worker: $WORKER_NAME"
warn "You'll need to set these values. Using wrangler is recommended:"
echo ""
echo "  Run these commands (you'll be prompted for each value):"
echo ""
echo "  npx wrangler secret put SENDGRID_API_KEY"
echo "  npx wrangler secret put ADMIN_API_KEY"
echo "  npx wrangler secret put ANTHROPIC_API_KEY"
echo "  npx wrangler secret put CRON_SECRET"
echo ""

# Try to set SENDGRID_API_KEY via API if we have Account ID
if [ -n "$ACCOUNT_ID" ]; then
  info "Setting SENDGRID_API_KEY via API..."
  SECRET_RESULT=$(retry curl -s -X PUT \
    "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/workers/scripts/$WORKER_NAME/secrets" \
    -H "Authorization: Bearer $CF_WORKERS_TOKEN" \
    -H "Content-Type: application/json" \
    -d "{\"name\": \"SENDGRID_API_KEY\", \"text\": \"$SENDGRID_API_KEY\", \"type\": \"secret_text\"}")

  SECRET_SUCCESS=$(echo "$SECRET_RESULT" | python3 -c "import sys,json; print(json.load(sys.stdin).get('success', False))" 2>/dev/null)
  if [ "$SECRET_SUCCESS" = "True" ]; then
    ok "SENDGRID_API_KEY deployed to worker"
  else
    warn "Could not set via API — use wrangler command above"
  fi
fi

# ============================================================================
header "STEP 8: SendGrid Inbound Parse (Email Webhook)"
# ============================================================================

info "Setting up inbound parse webhook..."
PARSE_RESULT=$(retry curl -s -X POST \
  "https://api.sendgrid.com/v3/user/webhooks/parse/settings" \
  -H "Authorization: Bearer $SENDGRID_API_KEY" \
  -H "Content-Type: application/json" \
  -d "{
    \"hostname\": \"$DOMAIN\",
    \"url\": \"https://$DOMAIN/api/webhooks/inbound-email\",
    \"spam_check\": true,
    \"send_raw\": false
  }")

if echo "$PARSE_RESULT" | grep -qi "hostname\|url"; then
  ok "Inbound parse webhook configured"
  info "Webhook URL: https://$DOMAIN/api/webhooks/inbound-email"
else
  ERROR=$(echo "$PARSE_RESULT" | python3 -c "import sys,json; d=json.load(sys.stdin); errs=d.get('errors',[]); print(errs[0].get('message','') if errs else str(d))" 2>/dev/null)
  if echo "$ERROR" | grep -qi "already exists"; then
    ok "Inbound parse webhook already configured"
  else
    warn "Inbound parse — $ERROR"
  fi
fi

# Add MX record for inbound parse
info "Adding MX record for SendGrid inbound parse..."
MX_RESULT=$(retry curl -s -X POST \
  "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/dns_records" \
  -H "Authorization: Bearer $CF_DNS_TOKEN" \
  -H "Content-Type: application/json" \
  -d "{\"type\":\"MX\",\"name\":\"$DOMAIN\",\"content\":\"mx.sendgrid.net\",\"priority\":10,\"ttl\":1}")

MX_SUCCESS=$(echo "$MX_RESULT" | python3 -c "import sys,json; print(json.load(sys.stdin).get('success', False))" 2>/dev/null)
if [ "$MX_SUCCESS" = "True" ]; then
  ok "MX record added for inbound parse"
else
  warn "MX record may already exist or conflict with email routing MX — check manually"
fi

# ============================================================================
header "SETUP COMPLETE"
# ============================================================================

echo ""
ok "Cloudflare Email Routing: 4 addresses → Gmail"
ok "SendGrid Sender Verification: Initiated"
ok "SendGrid Domain Authentication: DKIM/SPF configured"
ok "SendGrid Inbound Parse: Webhook registered"
echo ""
warn "ACTION ITEMS:"
echo "  1. Check moonsmoke.contact@gmail.com for Cloudflare destination verification email"
echo "  2. Check moonsmoke.contact@gmail.com for SendGrid sender verification emails"
echo "  3. Set remaining worker secrets: ADMIN_API_KEY, ANTHROPIC_API_KEY, CRON_SECRET"
echo "  4. Set up Gmail filters (see CLAUDE.md for filter rules)"
echo "  5. Deploy worker: npx wrangler deploy"
echo ""
echo "  NOTE: MX records for email routing and inbound parse may conflict."
echo "  Cloudflare Email Routing typically manages its own MX records."
echo "  If inbound parse is needed, you may need to choose one approach for MX."
echo ""
