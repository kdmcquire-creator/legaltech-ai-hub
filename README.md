# LegalTech AI Hub

AI Tool Directory for Legal Tech professionals. A curated platform helping solo practitioners, law firms, and in-house teams discover, compare, and evaluate AI-powered legal technology tools.

## Features

- **Tool Directory** — Browsable catalog of legal AI tools with category filtering
- **Expert Reviews & Comparisons** — Side-by-side evaluations of popular platforms
- **Buyer Guides** — Tailored recommendations by practice type
- **Legal Readiness Quiz** — Free 18-question interactive assessment across 6 legal categories
- **Contract Clause Checker** — Free client-side scanner that detects 15 standard contract clauses
- **Tool Submission** — Vendors can submit their tools for listing
- **Blog** — Articles comparing legal service providers (e.g., LegalZoom vs LawDepot)

## Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Email:** SendGrid (`@sendgrid/mail`)
- **Deployment:** Vercel (recommended)

## Getting Started

### Prerequisites

- Node.js 18+
- npm
- A [SendGrid](https://sendgrid.com/) account and API key (for contact/submission forms)

### Installation

```bash
# Clone the repo
git clone https://github.com/kdmcquire-creator/legaltech-ai-hub.git
cd legaltech-ai-hub

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
```

### Environment Variables

Edit `.env.local` with your values:

| Variable | Description | Example |
|----------|-------------|---------|
| `SENDGRID_API_KEY` | Your SendGrid API key | `SG.xxxxxxxxxxxx` |
| `SENDGRID_FROM_EMAIL` | Verified sender email in SendGrid | `contact@legaltech-ai-hub.com` |
| `CONTACT_TO_EMAIL` | Admin email that receives form submissions | `you@example.com` |

### SendGrid Setup

1. Create a free account at [sendgrid.com](https://sendgrid.com/)
2. Go to **Settings → API Keys** and create an API key with "Mail Send" permission
3. Go to **Settings → Sender Authentication** and verify your sender email domain or address
4. Copy the API key into `SENDGRID_API_KEY` in your `.env.local`
5. Set `SENDGRID_FROM_EMAIL` to your verified sender address
6. Set `CONTACT_TO_EMAIL` to the inbox where you want to receive submissions

### Running Locally

```bash
# Development server
npm run dev

# Production build
npm run build
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment (Cloudflare / Vercel)

### Vercel (Recommended for Next.js)

1. Push your repo to GitHub
2. Import the project at [vercel.com](https://vercel.com/)
3. Add the three environment variables (`SENDGRID_API_KEY`, `SENDGRID_FROM_EMAIL`, `CONTACT_TO_EMAIL`) in **Settings → Environment Variables**
4. Deploy

### Cloudflare Pages

If deploying to Cloudflare Pages with the Next.js adapter:

1. Connect your GitHub repo in the [Cloudflare Dashboard](https://dash.cloudflare.com/) under **Pages**
2. Set the build command to `npm run build` and output directory to `.next`
3. Add the SendGrid environment variables in **Settings → Environment Variables**
4. Note: API routes (`/api/contact`, `/api/submit-tool`) require the Node.js compatibility flag or Cloudflare Workers for server-side functionality

### Cloudflare DNS (Custom Domain)

If your domain's DNS is managed by Cloudflare:

1. Go to your domain in the [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Navigate to **DNS → Records**
3. Add a CNAME record pointing to your deployment (e.g., `cname.vercel-dns.com` for Vercel)
4. Enable the orange cloud (proxy) for CDN/SSL benefits
5. Under **SSL/TLS**, set encryption mode to **Full (strict)**

## Project Structure

```
src/
├── app/                        # Next.js App Router pages
│   ├── api/
│   │   ├── contact/route.ts    # Contact form → SendGrid
│   │   └── submit-tool/route.ts # Tool submission → SendGrid
│   ├── tools/                  # Tool directory & detail pages
│   ├── categories/             # Category browsing
│   ├── reviews/                # Reviews & comparisons
│   ├── legal-readiness/        # Legal Readiness Quiz
│   ├── clause-checker/         # Contract Clause Checker
│   ├── blog/                   # Blog articles
│   ├── contact/, submit/, about/, privacy/, terms/, disclosure/
│   ├── robots.ts               # SEO robots.txt
│   └── sitemap.ts              # SEO sitemap
├── components/
│   └── AffiliateBlock.tsx      # Reusable affiliate disclosure
├── lib/
│   ├── tools.ts                # Tool catalog data
│   ├── reviews.ts              # Review metadata
│   └── review-content.tsx      # Review article content
└── globals.css                 # Global styles
```

## API Routes

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/contact` | POST | Handles contact form submissions (`name`, `email`, `message`) |
| `/api/submit-tool` | POST | Handles vendor tool submissions (`name`, `url`, `description`) |

Both endpoints send email notifications via SendGrid to the configured `CONTACT_TO_EMAIL` address.

## Adding / Editing Tools

All tool data lives in `/src/lib/tools.ts`. To add a new tool, add an entry to the tools array with the required fields (name, slug, description, category, pricing, etc.). No database required — redeploy after changes.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm start` | Run production server |
| `npm run lint` | Lint with ESLint |

## License

All rights reserved.
