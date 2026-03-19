#!/usr/bin/env bash

# ============================================================================
# LegalTech AI Hub — Full Infrastructure Setup
# Configures: Cloudflare Email Routing, SendGrid Sender, Cloudflare Worker Secrets
# No external dependencies (no python/jq required — works on Git Bash/MINGW64)
# ============================================================================

# --- CREDENTIALS (export these before running) ---
# Export before running:
#   export CF_DNS_TOKEN="your_cloudflare_dns_token"
#   export CF_WORKERS_TOKEN="your_cloudflare_workers_token"
#   export SENDGRID_API_KEY="your_sendgrid_api_key"

if [ -z "${CF_DNS_TOKEN:-}" ]; then echo "ERROR: Set CF_DNS_TOKEN environment variable"; exit 1; fi
if [ -z "${CF_WORKERS_TOKEN:-}" ]; then echo "ERROR: Set CF_WORKERS_TOKEN environment variable"; exit 1; fi
if [ -z "${SENDGRID_API_KEY:-}" ]; then echo "ERROR: Set SENDGRID_API_KEY environment variable"; exit 1; fi

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

# Track step results for accurate summary
STEP_EMAIL_ROUTING="unknown"
STEP_EMAIL_RULES=0
STEP_EMAIL_RULES_FAIL=0
STEP_SENDGRID_SENDERS="unknown"
STEP_DOMAIN_AUTH="unknown"
STEP_INBOUND_PARSE="unknown"
STEP_WORKER_SECRETS="unknown"

# Safe curl wrapper — never fails, returns {} on error
apicall() {
  curl -s --max-time 30 "$@" 2>/dev/null || echo '{}'
}

# Minimal JSON value extractor (no python/jq needed)
json_val() {
  local json="$1" key="$2"
  echo "$json" | sed -n 's/.*"'"$key"'"[[:space:]]*:[[:space:]]*"\([^"]*\)".*/\1/p' | head -1
}

json_bool() {
  local json="$1" key="$2"
  echo "$json" | sed -n 's/.*"'"$key"'"[[:space:]]*:[[:space:]]*\([a-zA-Z0-9]*\).*/\1/p' | head -1
}

json_success() {
  local val
  val=$(json_bool "$1" "success")
  [ "$val" = "true" ]
}

# ============================================================================
header "STEP 1: Get Cloudflare Zone ID"
# ============================================================================

info "Looking up zone ID for $DOMAIN..."
ZONE_RESPONSE=$(apicall -X GET \
  "https://api.cloudflare.com/client/v4/zones?name=$DOMAIN" \
  -H "Authorization: Bearer $CF_DNS_TOKEN" \
  -H "Content-Type: application/json")

ZONE_ID=$(json_val "$ZONE_RESPONSE" "id")
ACCOUNT_ID=$(echo "$ZONE_RESPONSE" | sed -n 's/.*"account"[[:space:]]*:[[:space:]]*{[^}]*"id"[[:space:]]*:[[:space:]]*"\([^"]*\)".*/\1/p' | head -1)

if [ -z "$ZONE_ID" ]; then
  fail "Could not get Zone ID. Check your CF_DNS_TOKEN."
  echo "Response: $ZONE_RESPONSE"
  exit 1
fi

ok "Zone ID: $ZONE_ID"
ok "Account ID: $ACCOUNT_ID"

# ============================================================================
header "STEP 2: Cloudflare Email Routing — Enable"
# ============================================================================

info "Checking email routing status..."
ER_STATUS=$(apicall -X GET \
  "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/email/routing" \
  -H "Authorization: Bearer $CF_DNS_TOKEN" \
  -H "Content-Type: application/json")

ENABLED=$(json_bool "$ER_STATUS" "enabled")

if [ "$ENABLED" = "true" ]; then
  ok "Email routing already enabled"
  STEP_EMAIL_ROUTING="ok"
else
  info "Enabling email routing..."
  ENABLE_RESULT=$(apicall -X PUT \
    "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/email/routing/enable" \
    -H "Authorization: Bearer $CF_DNS_TOKEN" \
    -H "Content-Type: application/json")
  if json_success "$ENABLE_RESULT"; then
    ok "Email routing enabled"
    STEP_EMAIL_ROUTING="ok"
  else
    warn "Could not enable via API — enable it in Cloudflare dashboard > Email > Email Routing"
    warn "Response: $ENABLE_RESULT"
    STEP_EMAIL_ROUTING="fail"
  fi
fi

# ============================================================================
header "STEP 3: Cloudflare Email Routing — Verify Destination"
# ============================================================================

info "Checking if $DEST_EMAIL is a verified destination..."
DEST_CHECK=$(apicall -X GET \
  "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/email/routing/addresses" \
  -H "Authorization: Bearer $CF_DNS_TOKEN" \
  -H "Content-Type: application/json")

if echo "$DEST_CHECK" | grep -q "$DEST_EMAIL"; then
  ok "$DEST_EMAIL already verified as destination"
else
  info "Adding $DEST_EMAIL as destination (check Gmail for verification email)..."
  apicall -X POST \
    "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/email/routing/addresses" \
    -H "Authorization: Bearer $CF_DNS_TOKEN" \
    -H "Content-Type: application/json" \
    -d "{\"email\": \"$DEST_EMAIL\"}" > /dev/null
  warn "Verification email sent to $DEST_EMAIL — click the link in Gmail!"
fi

# ============================================================================
header "STEP 4: Cloudflare Email Routing — Create Forwarding Rules"
# ============================================================================

for PREFIX in contact updates newsletter admin; do
  FULL_ADDR="${PREFIX}@${DOMAIN}"
  info "Setting up $FULL_ADDR → $DEST_EMAIL..."

  RESULT=$(apicall -X POST \
    "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/email/routing/rules" \
    -H "Authorization: Bearer $CF_DNS_TOKEN" \
    -H "Content-Type: application/json" \
    -d "{
      \"actions\": [{\"type\": \"forward\", \"value\": [\"$DEST_EMAIL\"]}],
      \"matchers\": [{\"type\": \"literal\", \"field\": \"to\", \"value\": \"$FULL_ADDR\"}],
      \"enabled\": true,
      \"name\": \"Forward $FULL_ADDR to Gmail\"
    }")

  if json_success "$RESULT"; then
    ok "$FULL_ADDR → $DEST_EMAIL"
    STEP_EMAIL_RULES=$((STEP_EMAIL_RULES + 1))
  else
    ERROR_MSG=$(json_val "$RESULT" "message")
    if echo "$ERROR_MSG" | grep -qi "already exists\|duplicate"; then
      ok "$FULL_ADDR already configured"
      STEP_EMAIL_RULES=$((STEP_EMAIL_RULES + 1))
    else
      fail "$FULL_ADDR — ${ERROR_MSG:-unknown error}"
      STEP_EMAIL_RULES_FAIL=$((STEP_EMAIL_RULES_FAIL + 1))
    fi
  fi
done

# ============================================================================
header "STEP 5: SendGrid — Verify Sender Identities"
# ============================================================================

for SENDER_JSON in \
  '{"nickname":"LegalTech Contact","from_email":"contact@legaltech-ai-hub.com","from_name":"LegalTech AI Hub","reply_to":"contact@legaltech-ai-hub.com","reply_to_name":"LegalTech AI Hub","address":"123 Main St","city":"New York","state":"NY","zip":"10001","country":"US"}' \
  '{"nickname":"LegalTech Updates","from_email":"updates@legaltech-ai-hub.com","from_name":"LegalTech AI Hub","reply_to":"updates@legaltech-ai-hub.com","reply_to_name":"LegalTech AI Hub","address":"123 Main St","city":"New York","state":"NY","zip":"10001","country":"US"}'; do

  EMAIL=$(json_val "$SENDER_JSON" "from_email")
  info "Verifying sender: $EMAIL..."

  RESULT=$(apicall -X POST \
    "https://api.sendgrid.com/v3/verified_senders" \
    -H "Authorization: Bearer $SENDGRID_API_KEY" \
    -H "Content-Type: application/json" \
    -d "$SENDER_JSON")

  if echo "$RESULT" | grep -q '"id"'; then
    ok "$EMAIL — verification email sent (check inbox)"
    STEP_SENDGRID_SENDERS="ok"
  elif echo "$RESULT" | grep -qi "already exists\|duplicate"; then
    ok "$EMAIL — already registered"
    STEP_SENDGRID_SENDERS="ok"
  else
    ERROR_MSG=$(json_val "$RESULT" "message")
    warn "$EMAIL — ${ERROR_MSG:-check SendGrid dashboard}"
    [ "$STEP_SENDGRID_SENDERS" != "ok" ] && STEP_SENDGRID_SENDERS="fail"
  fi
done

# ============================================================================
header "STEP 6: SendGrid — Domain Authentication (DKIM/SPF)"
# ============================================================================

info "Checking existing domain authentication..."
EXISTING_AUTH=$(apicall -X GET \
  "https://api.sendgrid.com/v3/whitelabel/domains" \
  -H "Authorization: Bearer $SENDGRID_API_KEY" \
  -H "Content-Type: application/json")

if echo "$EXISTING_AUTH" | grep -q "\"domain\".*\"$DOMAIN\""; then
  DOMAIN_AUTH_ID=$(echo "$EXISTING_AUTH" | grep -o '"id"[[:space:]]*:[[:space:]]*[0-9]*' | head -1 | grep -o '[0-9]*')
  ok "Domain authentication already exists (ID: ${DOMAIN_AUTH_ID:-unknown})"
  STEP_DOMAIN_AUTH="ok"
else
  info "Creating domain authentication for $DOMAIN..."
  AUTH_RESULT=$(apicall -X POST \
    "https://api.sendgrid.com/v3/whitelabel/domains" \
    -H "Authorization: Bearer $SENDGRID_API_KEY" \
    -H "Content-Type: application/json" \
    -d "{\"domain\": \"$DOMAIN\", \"automatic_security\": true, \"default\": true}")

  DOMAIN_AUTH_ID=$(echo "$AUTH_RESULT" | grep -o '"id"[[:space:]]*:[[:space:]]*[0-9]*' | head -1 | grep -o '[0-9]*')

  if [ -n "$DOMAIN_AUTH_ID" ]; then
    ok "Domain auth created (ID: $DOMAIN_AUTH_ID)"

    info "Adding SendGrid DNS records to Cloudflare..."

    # Extract host/data/type triples from SendGrid response
    HOSTS=$(echo "$AUTH_RESULT" | grep -o '"host"[[:space:]]*:[[:space:]]*"[^"]*"' | sed 's/.*"\([^"]*\)"$/\1/')
    DATAS=$(echo "$AUTH_RESULT" | grep -o '"data"[[:space:]]*:[[:space:]]*"[^"]*"' | sed 's/.*"\([^"]*\)"$/\1/')
    TYPES=$(echo "$AUTH_RESULT" | grep -o '"type"[[:space:]]*:[[:space:]]*"[^"]*"' | sed 's/.*"\([^"]*\)"$/\1/')

    # Convert to arrays (works in bash 4+, Git Bash has bash 4+)
    IFS=$'\n' read -r -d '' -a HOST_ARR <<< "$HOSTS" || true
    IFS=$'\n' read -r -d '' -a DATA_ARR <<< "$DATAS" || true
    IFS=$'\n' read -r -d '' -a TYPE_ARR <<< "$TYPES" || true

    for i in "${!HOST_ARR[@]}"; do
      RHOST="${HOST_ARR[$i]}"
      RDATA="${DATA_ARR[$i]}"
      RTYPE="${TYPE_ARR[$i]}"
      [ -z "$RHOST" ] && continue

      RTYPE_UPPER=$(echo "$RTYPE" | tr '[:lower:]' '[:upper:]')
      [ "$RTYPE_UPPER" != "TXT" ] && RTYPE_UPPER="CNAME"

      info "Adding $RTYPE_UPPER record: $RHOST..."
      if [ "$RTYPE_UPPER" = "TXT" ]; then
        DNS_DATA="{\"type\":\"$RTYPE_UPPER\",\"name\":\"$RHOST\",\"content\":\"$RDATA\",\"ttl\":1}"
      else
        DNS_DATA="{\"type\":\"$RTYPE_UPPER\",\"name\":\"$RHOST\",\"content\":\"$RDATA\",\"ttl\":1,\"proxied\":false}"
      fi

      DNS_RESULT=$(apicall -X POST \
        "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/dns_records" \
        -H "Authorization: Bearer $CF_DNS_TOKEN" \
        -H "Content-Type: application/json" \
        -d "$DNS_DATA")

      if json_success "$DNS_RESULT"; then
        ok "$RTYPE_UPPER: $RHOST"
      else
        warn "$RTYPE_UPPER: $RHOST — may already exist"
      fi
    done

    info "Validating domain authentication (waiting for DNS)..."
    sleep 5
    VALIDATE=$(apicall -X POST \
      "https://api.sendgrid.com/v3/whitelabel/domains/$DOMAIN_AUTH_ID/validate" \
      -H "Authorization: Bearer $SENDGRID_API_KEY" \
      -H "Content-Type: application/json")

    VALID=$(json_bool "$VALIDATE" "valid")
    if [ "$VALID" = "true" ]; then
      ok "Domain authentication validated!"
      STEP_DOMAIN_AUTH="ok"
    else
      warn "Not yet validated — DNS may need time to propagate. Re-run validation later."
      STEP_DOMAIN_AUTH="pending"
    fi
  else
    fail "Domain auth creation failed"
    STEP_DOMAIN_AUTH="fail"
    echo "Response: $AUTH_RESULT"
  fi
fi

# ============================================================================
header "STEP 7: Cloudflare Worker Secrets"
# ============================================================================

info "Deploying secrets to Cloudflare Worker: $WORKER_NAME"
warn "You'll need to set these values. Using wrangler is recommended:"
echo ""
echo "  npx wrangler secret put SENDGRID_API_KEY"
echo "  npx wrangler secret put ADMIN_API_KEY"
echo "  npx wrangler secret put ANTHROPIC_API_KEY"
echo "  npx wrangler secret put CRON_SECRET"
echo ""

if [ -n "${ACCOUNT_ID:-}" ]; then
  info "Setting SENDGRID_API_KEY via API..."
  SECRET_RESULT=$(apicall -X PUT \
    "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/workers/scripts/$WORKER_NAME/secrets" \
    -H "Authorization: Bearer $CF_WORKERS_TOKEN" \
    -H "Content-Type: application/json" \
    -d "{\"name\": \"SENDGRID_API_KEY\", \"text\": \"$SENDGRID_API_KEY\", \"type\": \"secret_text\"}")

  if json_success "$SECRET_RESULT"; then
    ok "SENDGRID_API_KEY deployed to worker"
    STEP_WORKER_SECRETS="ok"
  else
    warn "Could not set via API — use wrangler commands above"
    STEP_WORKER_SECRETS="fail"
  fi
fi

# ============================================================================
header "STEP 8: SendGrid Inbound Parse (Email Webhook)"
# ============================================================================

info "Setting up inbound parse webhook..."
PARSE_RESULT=$(apicall -X POST \
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
  STEP_INBOUND_PARSE="ok"
elif echo "$PARSE_RESULT" | grep -qi "already exists"; then
  ok "Inbound parse webhook already configured"
  STEP_INBOUND_PARSE="ok"
else
  ERROR_MSG=$(json_val "$PARSE_RESULT" "message")
  warn "Inbound parse — ${ERROR_MSG:-check SendGrid dashboard}"
  STEP_INBOUND_PARSE="fail"
fi

warn "SKIPPING SendGrid MX record — Cloudflare Email Routing manages its own MX records."
warn "Adding mx.sendgrid.net would conflict with email routing and break inbound forwarding."
warn "Inbound parse requires a subdomain MX (e.g., parse.legaltech-ai-hub.com) if needed alongside email routing."

# ============================================================================
header "SETUP COMPLETE"
# ============================================================================

echo ""
echo "Results:"

# Email routing
if [ "$STEP_EMAIL_ROUTING" = "ok" ]; then
  ok "Cloudflare Email Routing: Enabled"
else
  fail "Cloudflare Email Routing: Not enabled — do it in dashboard"
fi

# Forwarding rules
if [ "$STEP_EMAIL_RULES_FAIL" -gt 0 ]; then
  if [ "$STEP_EMAIL_RULES" -gt 0 ]; then
    warn "Email Forwarding Rules: $STEP_EMAIL_RULES/4 configured, $STEP_EMAIL_RULES_FAIL failed"
  else
    fail "Email Forwarding Rules: All 4 failed — check API token permissions (needs Email Routing)"
  fi
else
  ok "Email Forwarding Rules: $STEP_EMAIL_RULES/4 addresses → Gmail"
fi

# SendGrid senders
if [ "$STEP_SENDGRID_SENDERS" = "ok" ]; then
  ok "SendGrid Sender Verification: Initiated"
else
  fail "SendGrid Sender Verification: Failed"
fi

# Domain auth
if [ "$STEP_DOMAIN_AUTH" = "ok" ]; then
  ok "SendGrid Domain Authentication: DKIM/SPF configured"
elif [ "$STEP_DOMAIN_AUTH" = "pending" ]; then
  warn "SendGrid Domain Authentication: Created, pending DNS propagation"
else
  fail "SendGrid Domain Authentication: Failed"
fi

# Worker secrets
if [ "$STEP_WORKER_SECRETS" = "ok" ]; then
  ok "Cloudflare Worker Secrets: SENDGRID_API_KEY deployed"
else
  warn "Cloudflare Worker Secrets: Set manually via wrangler"
fi

# Inbound parse
if [ "$STEP_INBOUND_PARSE" = "ok" ]; then
  ok "SendGrid Inbound Parse: Webhook registered"
else
  fail "SendGrid Inbound Parse: Failed"
fi

echo ""
warn "ACTION ITEMS:"
echo "  1. Check moonsmoke.contact@gmail.com for Cloudflare destination verification email"
echo "  2. Check moonsmoke.contact@gmail.com for SendGrid sender verification emails"
echo "  3. Set remaining worker secrets: ADMIN_API_KEY, ANTHROPIC_API_KEY, CRON_SECRET"
echo "  4. Set up Gmail filters (see CLAUDE.md for filter rules)"
echo "  5. Deploy worker: npx wrangler deploy"

if [ "$STEP_EMAIL_RULES_FAIL" -gt 0 ]; then
  echo ""
  warn "EMAIL ROUTING FIX:"
  echo "  Your CF_DNS_TOKEN lacks Email Routing permissions."
  echo "  Option A: Edit token in Cloudflare → My Profile → API Tokens"
  echo "           Add permission: Zone → Email Routing Rules → Edit"
  echo "  Option B: Set up manually in Cloudflare Dashboard → Email → Email Routing"
  echo "           Create: contact@, updates@, newsletter@, admin@ → moonsmoke.contact@gmail.com"
fi
echo ""
