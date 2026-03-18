import React from "react";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">{title}</h2>
      {children}
    </section>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 text-center">
      <p className="text-3xl font-bold text-emerald-700 mb-1">{value}</p>
      <p className="text-gray-600 text-sm">{label}</p>
    </div>
  );
}

function KeyTakeaway({ children }: { children: React.ReactNode }) {
  return (
    <div className="p-8 bg-blue-50 rounded-xl border border-blue-100">
      <h2 className="text-2xl font-semibold mb-4 text-blue-900">Key Takeaways</h2>
      {children}
    </div>
  );
}

/* ---------- ARTICLE CONTENT ---------- */

const soloAttorneyContent = (
  <>
    <Section title="Background">
      <p className="text-lg leading-relaxed text-gray-700">
        Sarah Chen is a solo attorney based in Austin, Texas, specializing in commercial contract law. Her practice focuses on small-to-midsize businesses that need lease agreements, vendor contracts, partnership agreements, and service-level agreements reviewed or drafted from scratch. On a typical month, Sarah handles between 15 and 20 contracts — a volume that kept her working evenings and weekends just to stay current.
      </p>
      <p className="text-lg leading-relaxed text-gray-700 mt-4">
        With no associates or paralegals on staff, every hour spent buried in contract markup was an hour she couldn&apos;t spend on business development, client consultations, or the strategic advisory work that commands higher fees.
      </p>
    </Section>

    <hr className="my-12 border-gray-200" />

    <Section title="The Challenge">
      <p className="text-lg leading-relaxed text-gray-700">
        Each contract required 3 to 4 hours of manual review. Sarah would read every clause line by line, cross-reference state-specific requirements, flag non-standard indemnification language, and draft redline suggestions — all by hand. At 15 contracts per month, that consumed roughly 50 to 60 billable hours on review alone. The remaining hours barely covered client calls, filings, and administrative tasks.
      </p>
      <p className="text-lg leading-relaxed text-gray-700 mt-4">
        Client relationships were suffering. Response times stretched to 5 to 7 business days, and Sarah had to turn away prospective clients simply because she lacked the bandwidth. She explored hiring a part-time associate, but the overhead — salary, benefits, malpractice insurance — would have cost $80K or more annually, a figure that didn&apos;t make financial sense for a solo practice.
      </p>
    </Section>

    <hr className="my-12 border-gray-200" />

    <Section title="The Solution">
      <p className="text-lg leading-relaxed text-gray-700">
        After evaluating several platforms, Sarah adopted an AI-powered contract review tool that offered automatic clause detection, risk scoring, and redline generation. The tool integrated directly with Microsoft Word, allowing her to review contracts inside her existing workflow without switching between applications.
      </p>
      <p className="text-lg leading-relaxed text-gray-700 mt-4">
        She spent the first two weeks calibrating the tool to her practice area — uploading her preferred clause language, configuring risk thresholds for indemnification and liability caps, and testing it against contracts she had already reviewed manually. By week three, the AI was flagging the same issues she would have caught herself, plus a handful of subtle inconsistencies in defined terms that she admitted she might have missed on a late-night review.
      </p>
    </Section>

    <hr className="my-12 border-gray-200" />

    <Section title="The Results">
      <p className="text-lg leading-relaxed text-gray-700">
        Within the first full month, Sarah&apos;s average contract review time dropped from 3.5 hours to approximately 1 hour — a 70% reduction. The AI handled the initial clause identification and risk scoring in under two minutes. Sarah&apos;s role shifted from line-by-line reading to targeted review of flagged items, strategic analysis, and client-specific customization.
      </p>
      <p className="text-lg leading-relaxed text-gray-700 mt-4">
        The freed-up hours had a cascading effect. She increased her monthly contract volume from 15 to 25 without extending her work hours. Response times improved to 1 to 2 business days, which led to stronger client retention and more referrals. Over the first year, the additional capacity translated to more than $40,000 in new revenue — against a tool cost of roughly $3,600 annually.
      </p>
    </Section>

    <hr className="my-12 border-gray-200" />

    <Section title="By the Numbers">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Metric value="70%" label="Time saved per contract" />
        <Metric value="15→25" label="Monthly contracts handled" />
        <Metric value="$40K+" label="Additional annual revenue" />
      </div>
    </Section>

    <hr className="my-12 border-gray-200" />

    <KeyTakeaway>
      <ul className="space-y-3 text-lg text-gray-800">
        <li><strong>AI review works best as a force multiplier, not a replacement.</strong> Sarah still reviews every contract — the AI simply eliminates the mechanical work and lets her focus on judgment calls.</li>
        <li><strong>Calibration time is an investment.</strong> The two weeks spent configuring the tool to her practice area paid dividends in accuracy and trust.</li>
        <li><strong>Capacity gains compound.</strong> Faster turnaround didn&apos;t just increase volume — it improved client satisfaction and generated referrals.</li>
        <li><strong>The math favors adoption.</strong> At $300 per month versus $80K+ for a junior hire, AI tooling is the most cost-effective way for a solo attorney to scale.</li>
      </ul>
    </KeyTakeaway>
  </>
);

const legalAidContent = (
  <>
    <Section title="Background">
      <p className="text-lg leading-relaxed text-gray-700">
        Community Legal Partners is a small legal aid organization in Cleveland, Ohio, with four staff attorneys and two administrative employees. The nonprofit serves low-income individuals and families facing housing disputes, family law matters, benefit denials, and consumer protection issues. Demand for their services had grown steadily for years, driven by rising housing costs and an expanding service area.
      </p>
      <p className="text-lg leading-relaxed text-gray-700 mt-4">
        Despite the team&apos;s dedication, the math was unforgiving. Four attorneys, each carrying a caseload of 40 to 50 active matters, could only serve roughly 600 clients per year. The waitlist had grown to over six months.
      </p>
    </Section>

    <hr className="my-12 border-gray-200" />

    <Section title="The Challenge">
      <p className="text-lg leading-relaxed text-gray-700">
        The biggest bottlenecks were document preparation and legal research. Housing attorneys spent hours drafting motions to dismiss, answers to eviction complaints, and habitability demand letters — documents that followed predictable patterns but still required manual assembly for each client. Family law attorneys faced similar repetition with custody agreements, protective order petitions, and modification motions.
      </p>
      <p className="text-lg leading-relaxed text-gray-700 mt-4">
        Grant funding covered salaries and office costs, but there was no budget for additional attorneys. The organization needed to do more with the same resources — or accept that hundreds of eligible clients would go unserved.
      </p>
    </Section>

    <hr className="my-12 border-gray-200" />

    <Section title="The Solution">
      <p className="text-lg leading-relaxed text-gray-700">
        The executive director assembled a small working group to identify free and low-cost AI tools that could reduce time spent on repetitive tasks. Over the course of two months, they implemented three categories of tools.
      </p>
      <p className="text-lg leading-relaxed text-gray-700 mt-4">
        First, a free AI document assembly platform that allowed attorneys to build templates for their most common filings. Client-specific information was entered through a simple questionnaire, and the tool generated a complete, court-ready document in minutes. Second, an AI-powered legal research tool with a free tier for nonprofit organizations, which dramatically reduced the time spent finding relevant case law and statutes. Third, an AI intake chatbot deployed on the organization&apos;s website that could screen potential clients for eligibility, gather basic case information, and schedule appointments — all before an attorney ever touched the file.
      </p>
    </Section>

    <hr className="my-12 border-gray-200" />

    <Section title="The Results">
      <p className="text-lg leading-relaxed text-gray-700">
        The impact was transformative. Document assembly time for standard filings dropped from 90 minutes to 15 minutes. Research time on routine matters fell by roughly 60%. The intake chatbot screened out ineligible inquiries before they consumed attorney time and pre-populated case files with the information attorneys needed to hit the ground running.
      </p>
      <p className="text-lg leading-relaxed text-gray-700 mt-4">
        Within six months, the organization tripled its client capacity — serving over 1,800 clients annually with the same four-attorney team. The waitlist shrank from six months to approximately three weeks. Attorney satisfaction improved as well; the team reported spending more time on substantive legal work and less time on copy-paste document assembly.
      </p>
    </Section>

    <hr className="my-12 border-gray-200" />

    <Section title="By the Numbers">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Metric value="3x" label="Client capacity increase" />
        <Metric value="6mo→3wk" label="Waitlist reduction" />
        <Metric value="$0" label="Additional tool costs" />
      </div>
    </Section>

    <hr className="my-12 border-gray-200" />

    <KeyTakeaway>
      <ul className="space-y-3 text-lg text-gray-800">
        <li><strong>Free tiers and nonprofit pricing exist.</strong> Many AI legal tools offer free access or steep discounts for legal aid organizations — you just have to ask.</li>
        <li><strong>Template-heavy practices benefit the most.</strong> Legal aid work is often high-volume and pattern-driven, making it an ideal fit for AI document assembly.</li>
        <li><strong>Intake automation is a hidden multiplier.</strong> Screening clients before they reach an attorney saves more time than most organizations realize.</li>
        <li><strong>Technology doesn&apos;t replace compassion.</strong> The attorneys now spend more face-to-face time with clients, not less — because the paperwork no longer dominates their day.</li>
      </ul>
    </KeyTakeaway>
  </>
);

const smallBusinessContent = (
  <>
    <Section title="Background">
      <p className="text-lg leading-relaxed text-gray-700">
        Priya Mehta founded BrightCart, an e-commerce company selling sustainable home goods, in 2023. The business grew quickly — from 5 employees working out of a warehouse in Portland, Oregon, to 25 team members spread across Oregon, California, and Texas. That growth was exciting, but it created a legal headache that Priya hadn&apos;t anticipated: employment contracts.
      </p>
      <p className="text-lg leading-relaxed text-gray-700 mt-4">
        Each new hire needed an employment agreement that complied with the specific labor laws of their state. Non-compete enforceability, at-will employment language, paid leave requirements, and wage transparency rules all varied significantly between Oregon, California, and Texas.
      </p>
    </Section>

    <hr className="my-12 border-gray-200" />

    <Section title="The Challenge">
      <p className="text-lg leading-relaxed text-gray-700">
        Priya initially hired outside counsel to draft employment contracts. The cost was approximately $500 per contract, and turnaround took 5 to 7 business days. With 20 new hires planned over six months, that meant $10,000 in legal fees just for employment agreements — not counting amendments, contractor agreements, or the inevitable revisions when state laws changed.
      </p>
      <p className="text-lg leading-relaxed text-gray-700 mt-4">
        The slow turnaround was equally painful. Priya lost a strong candidate who accepted another offer while waiting for BrightCart&apos;s contract to be finalized. She needed a faster, cheaper approach that didn&apos;t sacrifice compliance.
      </p>
    </Section>

    <hr className="my-12 border-gray-200" />

    <Section title="The Solution">
      <p className="text-lg leading-relaxed text-gray-700">
        Priya adopted an AI-powered contract drafting platform designed for small businesses. The tool offered state-specific employment contract templates that were regularly updated to reflect current labor laws. She selected her state, answered a guided questionnaire about the role (full-time vs. part-time, exempt vs. non-exempt, remote vs. on-site), and the AI generated a complete draft in under five minutes.
      </p>
      <p className="text-lg leading-relaxed text-gray-700 mt-4">
        The platform also included a compliance-checking feature that scanned the generated contract against the relevant state&apos;s employment regulations and flagged any provisions that might create legal risk. For California hires, it automatically excluded non-compete clauses (which are unenforceable in that state) and included required meal and rest break language. For Texas hires, it included at-will provisions with the proper statutory references.
      </p>
    </Section>

    <hr className="my-12 border-gray-200" />

    <Section title="The Results">
      <p className="text-lg leading-relaxed text-gray-700">
        Contract drafting time dropped from 5 to 7 days to under 30 minutes — a 90% reduction in turnaround. Priya could generate a compliant contract the same day she extended an offer, eliminating the candidate-loss problem entirely. Over the next six months, she drafted 20 employment agreements, 8 contractor agreements, and 4 amendments using the platform.
      </p>
      <p className="text-lg leading-relaxed text-gray-700 mt-4">
        The total cost savings exceeded $15,000 compared to outside counsel rates. Priya did have an employment attorney review the first three AI-generated contracts to validate accuracy, and the feedback was positive — the attorney flagged only minor stylistic preferences, not compliance gaps. That initial validation gave Priya the confidence to use the tool independently for subsequent hires.
      </p>
    </Section>

    <hr className="my-12 border-gray-200" />

    <Section title="By the Numbers">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Metric value="90%" label="Faster contract drafting" />
        <Metric value="3" label="States covered compliantly" />
        <Metric value="$15K+" label="Saved in outside legal fees" />
      </div>
    </Section>

    <hr className="my-12 border-gray-200" />

    <KeyTakeaway>
      <ul className="space-y-3 text-lg text-gray-800">
        <li><strong>Multi-state compliance is where AI shines.</strong> Keeping up with different employment laws across states is exactly the kind of rule-based, detail-heavy work that AI handles well.</li>
        <li><strong>Validate early, then trust the process.</strong> Having a human attorney review the first few AI-generated contracts builds confidence without ongoing expense.</li>
        <li><strong>Speed matters for hiring.</strong> In a competitive labor market, being able to send a compliant offer letter the same day is a real advantage.</li>
        <li><strong>Small businesses don&apos;t need enterprise tools.</strong> Purpose-built AI platforms for SMBs are affordable and often more user-friendly than the tools designed for law firms.</li>
      </ul>
    </KeyTakeaway>
  </>
);

const startupSeriesAContent = (
  <>
    <Section title="Background">
      <p className="text-lg leading-relaxed text-gray-700">
        Jordan Rivera is a first-time founder building DataPulse, a B2B SaaS platform that provides analytics dashboards for mid-market retailers. After 18 months of bootstrapping, the product had gained traction — 35 paying customers, $420K in ARR, and growing interest from venture capital firms. Two investors had expressed serious interest in leading a Series A round.
      </p>
      <p className="text-lg leading-relaxed text-gray-700 mt-4">
        But Jordan had a problem. The company&apos;s legal foundation was held together with free templates downloaded from the internet and handshake agreements with early contractors. Investor due diligence would expose every gap.
      </p>
    </Section>

    <hr className="my-12 border-gray-200" />

    <Section title="The Challenge">
      <p className="text-lg leading-relaxed text-gray-700">
        Jordan needed a comprehensive set of legal documents: a proper terms of service, a GDPR- and CCPA-compliant privacy policy, mutual NDAs for investor conversations, employee and contractor agreements for 8 team members, an IP assignment agreement to ensure the company owned all code, and a clean cap table with proper documentation.
      </p>
      <p className="text-lg leading-relaxed text-gray-700 mt-4">
        Quotes from startup-focused law firms ranged from $12,000 to $25,000 for the full package. With $60K in the bank and a burn rate of $15K per month, spending that much on legal work before the funding closed was a risk Jordan couldn&apos;t take. But going into due diligence unprepared was an even bigger risk — investors would either walk away or demand punitive terms.
      </p>
    </Section>

    <hr className="my-12 border-gray-200" />

    <Section title="The Solution">
      <p className="text-lg leading-relaxed text-gray-700">
        Jordan took a methodical, tool-by-tool approach using free AI legal platforms. For contract analysis and risk checking, Jordan used a free AI contract review tool to scan existing agreements — including the hastily drafted contractor agreements and the original co-founder agreement — identifying missing clauses, ambiguous IP provisions, and unsigned documents that needed immediate attention.
      </p>
      <p className="text-lg leading-relaxed text-gray-700 mt-4">
        For document generation, Jordan used AI-powered document assembly tools to draft a terms of service, privacy policy, mutual NDA template, and standard employment agreement. Each tool asked guided questions about the business (SaaS model, data handling practices, jurisdictions served) and generated documents tailored to those specifics. For clause-level analysis, Jordan ran every generated document through an AI clause analyzer that benchmarked the language against market-standard terms, flagging anything that was unusually broad, narrow, or missing.
      </p>
      <p className="text-lg leading-relaxed text-gray-700 mt-4">
        The entire process took four weeks of part-time work — evenings and weekends alongside product development. Jordan spent $0 on tools, using only free tiers and open-source resources.
      </p>
    </Section>

    <hr className="my-12 border-gray-200" />

    <Section title="The Results">
      <p className="text-lg leading-relaxed text-gray-700">
        When due diligence began, the lead investor&apos;s counsel reviewed DataPulse&apos;s legal documentation and flagged only two minor issues: a missing arbitration clause in the terms of service and a contractor agreement that lacked a proper work-for-hire provision. Both were corrected in under an hour using the same AI tools.
      </p>
      <p className="text-lg leading-relaxed text-gray-700 mt-4">
        The investor&apos;s general counsel later told Jordan it was &quot;one of the cleaner legal packages we&apos;ve seen from a pre-Series A company.&quot; The round closed at $2.5M on founder-friendly terms. Jordan estimated the AI-driven approach saved approximately $15,000 in legal fees and — critically — preserved four months of runway that would have been consumed by traditional legal preparation.
      </p>
    </Section>

    <hr className="my-12 border-gray-200" />

    <Section title="By the Numbers">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Metric value="$15K" label="Saved in legal fees" />
        <Metric value="12" label="Documents prepared" />
        <Metric value="4 weeks" label="Total preparation time" />
      </div>
    </Section>

    <hr className="my-12 border-gray-200" />

    <KeyTakeaway>
      <ul className="space-y-3 text-lg text-gray-800">
        <li><strong>Due diligence readiness is non-negotiable.</strong> Investors expect a clean legal house. AI tools can get you there without draining your runway.</li>
        <li><strong>Free tools are genuinely capable.</strong> Jordan used exclusively free tiers and produced documents that passed investor scrutiny with minimal revisions.</li>
        <li><strong>Scan existing agreements first.</strong> The biggest risks were in documents that already existed — not the ones that needed to be created.</li>
        <li><strong>AI doesn&apos;t replace a lawyer forever.</strong> Jordan hired startup counsel after closing the round. AI bridged the gap when budget constraints made traditional legal fees impractical.</li>
      </ul>
    </KeyTakeaway>
  </>
);

const litigationEdiscoveryContent = (
  <>
    <Section title="Background">
      <p className="text-lg leading-relaxed text-gray-700">
        Brennan &amp; Cole LLP is a 20-attorney litigation boutique in Chicago specializing in complex commercial disputes. The firm was retained to defend a mid-size manufacturing company in a breach-of-contract and trade-secret misappropriation case brought by a former supplier. The stakes were high — the plaintiff sought $18M in damages — and the discovery obligations were massive.
      </p>
      <p className="text-lg leading-relaxed text-gray-700 mt-4">
        The client&apos;s document universe included 2.3 million files: emails, Slack messages, shared drive documents, engineering specifications, and financial records spanning seven years of the business relationship. All of it was potentially discoverable.
      </p>
    </Section>

    <hr className="my-12 border-gray-200" />

    <Section title="The Challenge">
      <p className="text-lg leading-relaxed text-gray-700">
        The firm obtained estimates from two traditional e-discovery vendors. Both projected a review cost of approximately $1.8M, based on a linear review model using contract attorneys at $45 to $65 per hour. The timeline was equally daunting: 8 months for first-pass review, with production deadlines set at 6 months by the court. The numbers simply did not work.
      </p>
      <p className="text-lg leading-relaxed text-gray-700 mt-4">
        Beyond cost and time, quality was a concern. Linear review — where contract attorneys read documents one by one — is prone to inconsistency. Different reviewers apply different judgment to the same privilege and relevance questions, especially over an 8-month engagement with reviewer turnover. The risk of inadvertent privilege waiver on a dataset this large was significant.
      </p>
    </Section>

    <hr className="my-12 border-gray-200" />

    <Section title="The Solution">
      <p className="text-lg leading-relaxed text-gray-700">
        The litigation team selected an AI-powered e-discovery platform that combined predictive coding (technology-assisted review, or TAR) with advanced analytics including email threading, near-duplicate detection, and concept clustering. The workflow proceeded in three phases.
      </p>
      <p className="text-lg leading-relaxed text-gray-700 mt-4">
        In Phase 1, the platform ingested and processed all 2.3 million documents, automatically de-duplicating the set down to 1.4 million unique items. Email threading further reduced the review set by grouping conversation chains into single review units. In Phase 2, a senior associate and two partners reviewed a seed set of 2,500 documents, coding each for relevance, privilege, and key issues. The AI model trained on these decisions, then scored the entire corpus. After two additional rounds of active learning — where the model surfaced the most uncertain documents for human review — the system achieved a recall rate above 90% and precision above 85%. In Phase 3, a targeted human review of the AI-identified relevant and privileged documents was conducted by a team of six attorneys over four weeks, focusing on the approximately 180,000 documents the AI flagged as potentially responsive.
      </p>
    </Section>

    <hr className="my-12 border-gray-200" />

    <Section title="The Results">
      <p className="text-lg leading-relaxed text-gray-700">
        The entire review was completed in 10 weeks — well within the court&apos;s 6-month production deadline and roughly 75% faster than the traditional estimate. Total cost came in at $600,000, saving the client $1.2M compared to the linear review estimates.
      </p>
      <p className="text-lg leading-relaxed text-gray-700 mt-4">
        Quality metrics were equally strong. The AI-assisted review achieved higher consistency than linear review benchmarks, with inter-reviewer agreement rates above 92%. A post-review quality control sample of 1,500 documents found only 11 coding errors — a 0.73% error rate, compared to the 3 to 5% error rates typical of large-scale linear reviews. No privilege documents were inadvertently produced.
      </p>
      <p className="text-lg leading-relaxed text-gray-700 mt-4">
        The case ultimately settled favorably for the client, with opposing counsel acknowledging that the speed and thoroughness of production put pressure on their own, more disorganized discovery process.
      </p>
    </Section>

    <hr className="my-12 border-gray-200" />

    <Section title="By the Numbers">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Metric value="$1.2M" label="Cost savings vs. traditional review" />
        <Metric value="2.3M" label="Documents reviewed" />
        <Metric value="10 weeks" label="Total review time (vs. 8 months)" />
      </div>
    </Section>

    <hr className="my-12 border-gray-200" />

    <KeyTakeaway>
      <ul className="space-y-3 text-lg text-gray-800">
        <li><strong>TAR is no longer experimental.</strong> Courts have accepted technology-assisted review for over a decade. The question is no longer whether to use it, but how to use it well.</li>
        <li><strong>Senior attorney involvement in seed sets is critical.</strong> The quality of the AI model depends entirely on the quality of the training decisions. This is not a task to delegate to the most junior person on the team.</li>
        <li><strong>Cost savings scale with document volume.</strong> The larger the dataset, the greater the advantage of AI-assisted review over linear review. At 2.3M documents, the savings were dramatic.</li>
        <li><strong>Speed is a strategic advantage.</strong> Producing documents quickly and thoroughly shifts litigation dynamics in your favor and demonstrates confidence in your position.</li>
      </ul>
    </KeyTakeaway>
  </>
);

export const caseStudyContent: Record<string, React.ReactNode> = {
  "solo-attorney-contract-review-ai": soloAttorneyContent,
  "legal-aid-nonprofit-ai-tools": legalAidContent,
  "small-business-ai-employment-contracts": smallBusinessContent,
  "startup-series-a-legal-free-tools": startupSeriesAContent,
  "litigation-firm-ediscovery-cost-savings": litigationEdiscoveryContent,
};
