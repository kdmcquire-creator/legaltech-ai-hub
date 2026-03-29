import { NextResponse } from "next/server";

export async function GET() {
  const content = `# LegalTech AI Hub
> Independent reviews, guides, and comparisons of AI tools for legal professionals.

## About
LegalTech AI Hub covers AI-powered legal software including contract analysis, legal research, document automation, and practice management tools. We help lawyers, paralegals, and legal teams evaluate and adopt AI tools.

## Sections
- /tools — Directory of 50+ legal AI tools with in-depth reviews
- /reviews — Detailed reviews and head-to-head comparisons
- /guides — How-to guides for implementing AI in legal workflows
- /case-studies — Real-world adoption stories from law firms
- /calculators — Free legal fee and ROI calculators
- /glossary — Legal AI terminology reference

## Contact
https://legaltech-ai-hub.com/contact
`;

  return new NextResponse(content, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
