import { NextResponse } from "next/server";

export async function GET() {
  const content = `# LegalTech AI Hub
> Practical legal technology guidance for small businesses, solo founders, and lean legal teams.

## About
LegalTech AI Hub covers AI-powered legal software including contract analysis, legal research, document automation, e-signature, practice management, and business formation tools. We focus on tools that help small businesses and solo founders handle legal operations without enterprise budgets.

## Sections
- /tools — Directory of 50+ legal AI tools with in-depth reviews
- /reviews — Detailed reviews and head-to-head comparisons
- /guides — How-to guides for implementing AI in legal workflows
- /case-studies — Real-world adoption stories from law firms
- /calculators — Free legal fee and ROI calculators
- /glossary — Legal AI terminology reference

## Not Legal Advice
LegalTech AI Hub publishes technology reviews and tool comparisons. Nothing on this site constitutes legal advice, and no attorney-client relationship is formed by reading this content. Readers should consult a licensed attorney in their jurisdiction for matters requiring legal counsel. We share tools we use to run our own small business (Moonsmoke LLC).

## Editorial Approach
- We write about tools we actually use for our own business operations.
- Affiliate relationships are disclosed on every review. Recommendations are not paid placements.
- Content is AI-assisted in research and drafting; reviewed and edited by a human (Kyle McQuire, Founder of Moonsmoke LLC) before publication.

## Contact
https://legaltech-ai-hub.com/contact
`;

  return new NextResponse(content, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
