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

## Newsletter Architecture

### Delivery Cadence
- **Primary:** Wednesday at 10:00 AM ET (15:00 UTC)
- Based on B2B email research: mid-week, mid-morning maximizes open rates for legal professionals

### Newsletter Formats (5 active)
| Format | Name | Cadence | Description |
|--------|------|---------|-------------|
| Anchor | **The Docket** | Weekly | Curated roundup: 3-4 news + tool spotlight + site link |
| Opinion | **Hot Take** | Monthly | Bold single-topic opinion piece, 600-800 words |
| Prediction | **Crystal Ball** | Monthly | Provocative wild prediction, invites replies |
| Satire | **The Gold Standard** | ~Bi-monthly, unpredictable | Onion-style straight-faced absurdist pieces |
| Tactical | **The Practitioner's Playbook** | Monthly | Step-by-step actionable guide delivered as email |

### Warehoused Formats (for future rotation)
- **Inbox Debate** — Two opposing viewpoints, reader votes
- **Founder Spotlight** — Interview/profile of a legal tech founder
- **The Numbers** — Pure data: charts, stats, funding rounds
- **Reader Mailbag** — Curated reader questions with answers

### Infrastructure
- Queue system: `/admin/newsletters` page + JSON files in `/newsletters/`
- Scheduling: Cloudflare Worker cron trigger (Wednesday 10:00 AM ET)
- News crawler: Daily cron, RSS feeds + keyword scoring + Claude API article generation
- Preference learning: Approval/rejection history guides future crawler submissions
- Auto-reply agent: Cloudflare Worker, 4x/day, generates 3-4 draft replies for inbound emails

### Environment Variables (newsletter/crawler/agent)
- `ADMIN_API_KEY` — Admin auth for newsletter queue and crawler
- `ANTHROPIC_API_KEY` — Claude API for article generation and reply drafting
- `CRON_SECRET` — Auth for cron endpoints
- `SENDGRID_API_KEY` — Already configured
- `SENDGRID_NEWSLETTER_FROM_EMAIL` — Already configured (`updates@legaltech-ai-hub.com`)
- `CONTACT_TO_EMAIL` — Already configured

## Advertising
- **AdSense:** Publisher ID `ca-pub-5995172189982724`, ads.txt in place
- **Status:** Site ready for AdSense review request
- **Ad placements:** Homepage mid, tools directory top, tool sidebar, review/guide/case study bottom, reviews/guides/case studies index mid, glossary bottom
- **Premium networks:** Target Mediavine at 50K sessions/mo, Raptive at 100K+

## Monthly Reminders
- **Newsletter content planning:** Monthly session to plan next batch of Gold Standard satire + upcoming Docket hooks
- **Affiliate program check:** Review pending applications and new program opportunities
- **Content audit:** Check for outdated tool info, pricing changes, new tools to add
