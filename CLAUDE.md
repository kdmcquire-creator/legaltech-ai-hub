# LegalTech AI Hub - Project Memory

## Email Architecture

### Receiving: Cloudflare Email Routing (free)
All addresses forward to: **moonsmoke.contact@gmail.com**

| Address | Purpose |
|---------|---------|
| `contact@legaltech-ai-hub.com` | Contact form, general inquiries (already set up) |
| `updates@legaltech-ai-hub.com` | Newsletter sends, product updates |
| `newsletter@legaltech-ai-hub.com` | Newsletter signup confirmations |
| `admin@legaltech-ai-hub.com` | Admin notifications, system alerts |

**Setup location:** Cloudflare Dashboard → Email → Email Routing → Add each address → forward to moonsmoke.contact@gmail.com

### Sending: SendGrid (transactional + marketing)
- Contact form replies send from: `contact@legaltech-ai-hub.com`
- Newsletter sends from: `updates@legaltech-ai-hub.com`
- SendGrid handles DKIM, SPF, deliverability
- SendGrid API key stored in environment variable: `SENDGRID_API_KEY`
- Contact form recipient env var: `CONTACT_EMAIL`

### Architecture Diagram
```
Inbound:  anyone → contact@your-domain  → Cloudflare Email Routing → moonsmoke.contact@gmail.com
Inbound:  anyone → updates@your-domain  → Cloudflare Email Routing → moonsmoke.contact@gmail.com
Inbound:  anyone → newsletter@your-domain → Cloudflare Email Routing → moonsmoke.contact@gmail.com
Inbound:  anyone → admin@your-domain    → Cloudflare Email Routing → moonsmoke.contact@gmail.com
Outbound: SendGrid → sends as contact@your-domain (contact form replies)
Outbound: SendGrid → sends as updates@your-domain (newsletters)
```

### Gmail Organization (manual setup)
Create Gmail filters to auto-label incoming forwarded mail:
- Filter: `to:contact@legaltech-ai-hub.com` → Label: "LegalTech/Contact"
- Filter: `to:updates@legaltech-ai-hub.com` → Label: "LegalTech/Updates"
- Filter: `to:newsletter@legaltech-ai-hub.com` → Label: "LegalTech/Newsletter"
- Filter: `to:admin@legaltech-ai-hub.com` → Label: "LegalTech/Admin"

### What's NOT needed
- Google Workspace ($7/mo/user) — overkill unless sending *as* the domain from Gmail compose
- Namecheap email hosting — Cloudflare routing does the same thing free
- Separate mailbox service — Gmail is the single inbox

## Cloudflare Email Routing Setup Steps
1. Go to Cloudflare Dashboard → select legaltech-ai-hub.com domain
2. Navigate to Email → Email Routing
3. Click "Create address" for each: updates@, newsletter@, admin@
4. Set destination: moonsmoke.contact@gmail.com
5. Cloudflare will add necessary MX/TXT DNS records automatically
6. Verify the destination email if not already verified

## SendGrid Sender Identities Needed
- `contact@legaltech-ai-hub.com` (likely already verified)
- `updates@legaltech-ai-hub.com` (needs to be added as a verified sender in SendGrid)
- Verify via: SendGrid Dashboard → Settings → Sender Authentication → Single Sender Verification

## Domain
- Domain: legaltech-ai-hub.com
- Registrar: Namecheap
- DNS/CDN: Cloudflare
- Hosting: Cloudflare Pages (via OpenNext)
