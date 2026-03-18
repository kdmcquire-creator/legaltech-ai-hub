#!/usr/bin/env bash
#
# setup-email-infrastructure.sh
#
# Automates the full email infrastructure setup for legaltech-ai-hub.com:
#   1. Cloudflare Email Routing (updates@, newsletter@, admin@)
#   2. SendGrid sender identity verification (updates@)
#   3. Gmail label + filter creation (LegalTech/Contact, Updates, Newsletter, Admin)
#
# Prerequisites:
#   - curl, jq installed
#   - Cloudflare API token with Zone:Email Routing Rules:Edit + Zone:DNS:Edit
#   - SendGrid API key (from Cloudflare Workers secrets or SendGrid dashboard)
#   - Gmail OAuth token (see instructions below for obtaining one)
#
# Usage:
#   chmod +x scripts/setup-email-infrastructure.sh
#   ./scripts/setup-email-infrastructure.sh
#
set -euo pipefail

# ─────────────────────────────────────────────
# CONFIGURATION — Fill these in before running
# ─────────────────────────────────────────────
CLOUDFLARE_API_TOKEN="${CLOUDFLARE_API_TOKEN:-}"
CLOUDFLARE_ZONE_ID="${CLOUDFLARE_ZONE_ID:-}"
CLOUDFLARE_ACCOUNT_ID="${CLOUDFLARE_ACCOUNT_ID:-3582b6bec8f0d717e1d4a926447647b6}"

SENDGRID_API_KEY="${SENDGRID_API_KEY:-}"

# Gmail OAuth2 access token (short-lived).
# Get one at: https://developers.google.com/oauthplayground/
#   1. Select "Gmail API v1" → check all scopes (or at minimum gmail.settings.basic + gmail.labels)
#   2. Authorize → Exchange authorization code for tokens
#   3. Copy the Access Token below
GMAIL_ACCESS_TOKEN="${GMAIL_ACCESS_TOKEN:-}"

DOMAIN="legaltech-ai-hub.com"
DESTINATION_EMAIL="moonsmoke.contact@gmail.com"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

info()    { echo -e "${BLUE}[INFO]${NC} $*"; }
success() { echo -e "${GREEN}[OK]${NC} $*"; }
warn()    { echo -e "${YELLOW}[WARN]${NC} $*"; }
error()   { echo -e "${RED}[ERROR]${NC} $*"; }

check_deps() {
    for cmd in curl jq; do
        if ! command -v "$cmd" &>/dev/null; then
            error "$cmd is required but not installed."
            exit 1
        fi
    done
}

# ─────────────────────────────────────────────
# 1. CLOUDFLARE EMAIL ROUTING
# ─────────────────────────────────────────────
setup_cloudflare_email_routing() {
    if [[ -z "$CLOUDFLARE_API_TOKEN" ]]; then
        warn "CLOUDFLARE_API_TOKEN not set — skipping Cloudflare Email Routing setup."
        return
    fi
    if [[ -z "$CLOUDFLARE_ZONE_ID" ]]; then
        warn "CLOUDFLARE_ZONE_ID not set — skipping Cloudflare Email Routing setup."
        return
    fi

    local CF_API="https://api.cloudflare.com/client/v4"
    local AUTH_HEADER="Authorization: Bearer ${CLOUDFLARE_API_TOKEN}"

    info "Verifying Cloudflare API token..."
    local verify
    verify=$(curl -s "${CF_API}/user/tokens/verify" -H "$AUTH_HEADER")
    local status
    status=$(echo "$verify" | jq -r '.success')
    if [[ "$status" != "true" ]]; then
        error "Cloudflare token verification failed:"
        echo "$verify" | jq .
        return 1
    fi
    success "Cloudflare API token is valid."

    # Check if destination email is already verified
    info "Checking destination email verification..."
    local destinations
    destinations=$(curl -s "${CF_API}/zones/${CLOUDFLARE_ZONE_ID}/email/routing/addresses" \
        -H "$AUTH_HEADER")
    local dest_verified
    dest_verified=$(echo "$destinations" | jq -r \
        ".result[]? | select(.email == \"${DESTINATION_EMAIL}\") | .verified // empty")

    if [[ -z "$dest_verified" ]]; then
        info "Adding destination email ${DESTINATION_EMAIL}..."
        local add_dest
        add_dest=$(curl -s -X POST \
            "${CF_API}/zones/${CLOUDFLARE_ZONE_ID}/email/routing/addresses" \
            -H "$AUTH_HEADER" \
            -H "Content-Type: application/json" \
            --data "{\"email\": \"${DESTINATION_EMAIL}\"}")
        local add_success
        add_success=$(echo "$add_dest" | jq -r '.success')
        if [[ "$add_success" == "true" ]]; then
            warn "Verification email sent to ${DESTINATION_EMAIL} — check inbox and verify before continuing."
            echo "    Press Enter after you've verified the destination email..."
            read -r
        else
            # May already exist at account level
            warn "Could not add destination (may already exist at account level):"
            echo "$add_dest" | jq -r '.errors[]?.message // empty'
        fi
    else
        success "Destination ${DESTINATION_EMAIL} is already verified."
    fi

    # Enable email routing if not already enabled
    info "Checking email routing status..."
    local routing_settings
    routing_settings=$(curl -s "${CF_API}/zones/${CLOUDFLARE_ZONE_ID}/email/routing" \
        -H "$AUTH_HEADER")
    local routing_enabled
    routing_enabled=$(echo "$routing_settings" | jq -r '.result.enabled // false')
    if [[ "$routing_enabled" != "true" ]]; then
        info "Enabling email routing for ${DOMAIN}..."
        curl -s -X PUT "${CF_API}/zones/${CLOUDFLARE_ZONE_ID}/email/routing/enable" \
            -H "$AUTH_HEADER" \
            -H "Content-Type: application/json" > /dev/null
        success "Email routing enabled."
    else
        success "Email routing is already enabled."
    fi

    # Create routing rules for each address
    local addresses=("updates" "newsletter" "admin")

    # Get existing rules to avoid duplicates
    local existing_rules
    existing_rules=$(curl -s "${CF_API}/zones/${CLOUDFLARE_ZONE_ID}/email/routing/rules" \
        -H "$AUTH_HEADER")

    for prefix in "${addresses[@]}"; do
        local email="${prefix}@${DOMAIN}"

        # Check if rule already exists
        local rule_exists
        rule_exists=$(echo "$existing_rules" | jq -r \
            ".result[]? | select(.matchers[]?.value == \"${email}\") | .name // empty")

        if [[ -n "$rule_exists" ]]; then
            success "Rule for ${email} already exists — skipping."
            continue
        fi

        info "Creating email routing rule: ${email} → ${DESTINATION_EMAIL}"
        local create_result
        create_result=$(curl -s -X POST \
            "${CF_API}/zones/${CLOUDFLARE_ZONE_ID}/email/routing/rules" \
            -H "$AUTH_HEADER" \
            -H "Content-Type: application/json" \
            --data "{
                \"name\": \"Forward ${prefix} to Gmail\",
                \"enabled\": true,
                \"matchers\": [{
                    \"type\": \"literal\",
                    \"field\": \"to\",
                    \"value\": \"${email}\"
                }],
                \"actions\": [{
                    \"type\": \"forward\",
                    \"value\": [\"${DESTINATION_EMAIL}\"]
                }]
            }")

        local create_success
        create_success=$(echo "$create_result" | jq -r '.success')
        if [[ "$create_success" == "true" ]]; then
            success "Created routing rule for ${email}"
        else
            error "Failed to create rule for ${email}:"
            echo "$create_result" | jq -r '.errors[]?.message // empty'
        fi
    done

    echo ""
    success "Cloudflare Email Routing setup complete!"
    info "Addresses configured:"
    info "  contact@${DOMAIN}   → ${DESTINATION_EMAIL} (already existed)"
    info "  updates@${DOMAIN}   → ${DESTINATION_EMAIL}"
    info "  newsletter@${DOMAIN} → ${DESTINATION_EMAIL}"
    info "  admin@${DOMAIN}     → ${DESTINATION_EMAIL}"
    echo ""
}

# ─────────────────────────────────────────────
# 2. SENDGRID SENDER VERIFICATION
# ─────────────────────────────────────────────
setup_sendgrid_sender() {
    if [[ -z "$SENDGRID_API_KEY" ]]; then
        warn "SENDGRID_API_KEY not set — skipping SendGrid sender verification."
        return
    fi

    local SG_API="https://api.sendgrid.com/v3"
    local AUTH_HEADER="Authorization: Bearer ${SENDGRID_API_KEY}"

    info "Checking existing SendGrid verified senders..."
    local senders
    senders=$(curl -s "${SG_API}/verified_senders" \
        -H "$AUTH_HEADER")

    # Check if updates@ is already verified
    local updates_exists
    updates_exists=$(echo "$senders" | jq -r \
        ".results[]? | select(.from_email == \"updates@${DOMAIN}\") | .from_email // empty")

    if [[ -n "$updates_exists" ]]; then
        success "updates@${DOMAIN} is already a verified sender in SendGrid."
        return
    fi

    info "Creating verified sender for updates@${DOMAIN}..."
    local create_result
    create_result=$(curl -s -X POST "${SG_API}/verified_senders" \
        -H "$AUTH_HEADER" \
        -H "Content-Type: application/json" \
        --data "{
            \"nickname\": \"LegalTech Updates\",
            \"from_email\": \"updates@${DOMAIN}\",
            \"from_name\": \"LegalTech AI Hub\",
            \"reply_to\": \"updates@${DOMAIN}\",
            \"reply_to_name\": \"LegalTech AI Hub\",
            \"address\": \"123 Main St\",
            \"city\": \"San Francisco\",
            \"state\": \"CA\",
            \"zip\": \"94105\",
            \"country\": \"US\"
        }")

    # Check for errors
    local has_errors
    has_errors=$(echo "$create_result" | jq -r '.errors // empty')
    if [[ -n "$has_errors" && "$has_errors" != "null" ]]; then
        error "Failed to create sender:"
        echo "$create_result" | jq .
        return 1
    fi

    success "Verification request created for updates@${DOMAIN}"
    warn "A verification email has been sent to updates@${DOMAIN}"
    warn "Since Cloudflare Email Routing forwards to ${DESTINATION_EMAIL},"
    warn "check your Gmail inbox for the SendGrid verification link and click it."
    echo ""
}

# ─────────────────────────────────────────────
# 3. GMAIL LABELS + FILTERS
# ─────────────────────────────────────────────
setup_gmail_filters() {
    if [[ -z "$GMAIL_ACCESS_TOKEN" ]]; then
        warn "GMAIL_ACCESS_TOKEN not set — skipping Gmail filter setup."
        warn ""
        warn "To get a token:"
        warn "  1. Go to https://developers.google.com/oauthplayground/"
        warn "  2. Select 'Gmail API v1' → check gmail.settings.basic + gmail.labels"
        warn "  3. Authorize with moonsmoke.contact@gmail.com"
        warn "  4. Exchange code for tokens → copy the Access Token"
        warn "  5. Re-run with: GMAIL_ACCESS_TOKEN=<token> ./scripts/setup-email-infrastructure.sh"
        return
    fi

    local GMAIL_API="https://gmail.googleapis.com/gmail/v1/users/me"
    local AUTH_HEADER="Authorization: Bearer ${GMAIL_ACCESS_TOKEN}"

    info "Setting up Gmail labels and filters..."

    # Get existing labels
    local existing_labels
    existing_labels=$(curl -s "${GMAIL_API}/labels" -H "$AUTH_HEADER")

    # Check if auth worked
    local label_error
    label_error=$(echo "$existing_labels" | jq -r '.error.message // empty')
    if [[ -n "$label_error" ]]; then
        error "Gmail API error: ${label_error}"
        return 1
    fi

    # Define labels and their corresponding filter criteria
    declare -A LABEL_FILTERS=(
        ["LegalTech/Contact"]="contact@${DOMAIN}"
        ["LegalTech/Updates"]="updates@${DOMAIN}"
        ["LegalTech/Newsletter"]="newsletter@${DOMAIN}"
        ["LegalTech/Admin"]="admin@${DOMAIN}"
    )

    # First, ensure parent label "LegalTech" exists
    local parent_id
    parent_id=$(echo "$existing_labels" | jq -r '.labels[]? | select(.name == "LegalTech") | .id // empty')
    if [[ -z "$parent_id" ]]; then
        info "Creating parent label 'LegalTech'..."
        local parent_result
        parent_result=$(curl -s -X POST "${GMAIL_API}/labels" \
            -H "$AUTH_HEADER" \
            -H "Content-Type: application/json" \
            --data '{
                "name": "LegalTech",
                "labelListVisibility": "labelShow",
                "messageListVisibility": "show"
            }')
        parent_id=$(echo "$parent_result" | jq -r '.id // empty')
        if [[ -n "$parent_id" ]]; then
            success "Created parent label 'LegalTech'"
        else
            error "Failed to create parent label:"
            echo "$parent_result" | jq .
            return 1
        fi
    else
        success "Parent label 'LegalTech' already exists."
    fi

    # Create sub-labels and filters
    for label_name in "${!LABEL_FILTERS[@]}"; do
        local filter_email="${LABEL_FILTERS[$label_name]}"

        # Check if label exists
        local label_id
        label_id=$(echo "$existing_labels" | jq -r \
            ".labels[]? | select(.name == \"${label_name}\") | .id // empty")

        if [[ -z "$label_id" ]]; then
            info "Creating label '${label_name}'..."
            local label_result
            label_result=$(curl -s -X POST "${GMAIL_API}/labels" \
                -H "$AUTH_HEADER" \
                -H "Content-Type: application/json" \
                --data "{
                    \"name\": \"${label_name}\",
                    \"labelListVisibility\": \"labelShow\",
                    \"messageListVisibility\": \"show\"
                }")
            label_id=$(echo "$label_result" | jq -r '.id // empty')
            if [[ -n "$label_id" ]]; then
                success "Created label '${label_name}' (${label_id})"
            else
                error "Failed to create label '${label_name}':"
                echo "$label_result" | jq .
                continue
            fi
        else
            success "Label '${label_name}' already exists (${label_id})."
        fi

        # Check if filter already exists for this criteria
        local existing_filters
        existing_filters=$(curl -s "${GMAIL_API}/settings/filters" -H "$AUTH_HEADER")
        local filter_exists
        filter_exists=$(echo "$existing_filters" | jq -r \
            ".filter[]? | select(.criteria.to == \"${filter_email}\") | .id // empty")

        if [[ -n "$filter_exists" ]]; then
            success "Filter for to:${filter_email} already exists — skipping."
            continue
        fi

        info "Creating filter: to:${filter_email} → label '${label_name}'..."
        local filter_result
        filter_result=$(curl -s -X POST "${GMAIL_API}/settings/filters" \
            -H "$AUTH_HEADER" \
            -H "Content-Type: application/json" \
            --data "{
                \"criteria\": {
                    \"to\": \"${filter_email}\"
                },
                \"action\": {
                    \"addLabelIds\": [\"${label_id}\"],
                    \"removeLabelIds\": []
                }
            }")

        local filter_id
        filter_id=$(echo "$filter_result" | jq -r '.id // empty')
        if [[ -n "$filter_id" ]]; then
            success "Created filter: to:${filter_email} → ${label_name}"
        else
            error "Failed to create filter for ${filter_email}:"
            echo "$filter_result" | jq .
        fi
    done

    echo ""
    success "Gmail labels and filters setup complete!"
    info "Filters created:"
    info "  to:contact@${DOMAIN}    → LegalTech/Contact"
    info "  to:updates@${DOMAIN}    → LegalTech/Updates"
    info "  to:newsletter@${DOMAIN} → LegalTech/Newsletter"
    info "  to:admin@${DOMAIN}      → LegalTech/Admin"
    echo ""
}

# ─────────────────────────────────────────────
# MAIN
# ─────────────────────────────────────────────
main() {
    echo ""
    echo "=================================================="
    echo "  LegalTech AI Hub — Email Infrastructure Setup"
    echo "=================================================="
    echo ""

    check_deps

    echo "─── Step 1/3: Cloudflare Email Routing ───"
    setup_cloudflare_email_routing

    echo "─── Step 2/3: SendGrid Sender Verification ───"
    setup_sendgrid_sender

    echo "─── Step 3/3: Gmail Labels & Filters ───"
    setup_gmail_filters

    echo ""
    echo "=================================================="
    echo "  Setup Summary"
    echo "=================================================="
    echo ""
    [[ -n "$CLOUDFLARE_API_TOKEN" && -n "$CLOUDFLARE_ZONE_ID" ]] \
        && success "Cloudflare Email Routing: configured" \
        || warn "Cloudflare Email Routing: skipped (missing token or zone ID)"
    [[ -n "$SENDGRID_API_KEY" ]] \
        && success "SendGrid Sender Verification: requested" \
        || warn "SendGrid Sender Verification: skipped (missing API key)"
    [[ -n "$GMAIL_ACCESS_TOKEN" ]] \
        && success "Gmail Labels & Filters: configured" \
        || warn "Gmail Labels & Filters: skipped (missing access token)"
    echo ""
    info "Done! Check the output above for any items that need manual follow-up."
    echo ""
}

main "$@"
