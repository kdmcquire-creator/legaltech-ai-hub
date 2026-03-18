import React from "react";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">{title}</h2>
      {children}
    </section>
  );
}

function KeyMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="border rounded-lg p-4 text-center">
      <p className="text-3xl font-bold text-blue-600">{value}</p>
      <p className="text-gray-500 text-sm mt-1">{label}</p>
    </div>
  );
}

function Takeaway({ children }: { children: React.ReactNode }) {
  return (
    <div className="p-8 bg-blue-50 rounded-xl border border-blue-100">
      <h2 className="text-2xl font-semibold mb-4 text-blue-900">Key Takeaways</h2>
      {children}
    </div>
  );
}

export const caseStudyContent: Record<string, React.ReactNode> = {
  "solo-attorney-contract-review-ai": (
    <>
      <Section title="Overview">
        <p className="text-gray-700 leading-relaxed">
          Sarah Chen is a solo commercial contracts attorney based in Austin, Texas, specializing in commercial leases
          and vendor agreements for small and mid-sized businesses. Like many solo practitioners, she found herself
          spending the majority of her working hours on document review rather than strategic legal work and client
          development. After adopting an AI-powered contract review tool, she reduced her review time by 70% and
          transformed the trajectory of her practice.
        </p>
      </Section>

      <Section title="The Challenge">
        <p className="text-gray-700 leading-relaxed">
          Before implementing AI, Sarah was processing 25 to 30 contracts per month, dedicating more than 15 hours
          each week solely to contract review. The work was repetitive but demanded intense concentration — a single
          missed clause or inconsistency could expose her clients to significant liability. As her practice grew,
          the volume became unsustainable. She was turning away new clients because she simply didn&apos;t have the
          bandwidth, and the fatigue from marathon review sessions was increasing her risk of errors. Hiring an
          associate wasn&apos;t financially viable, and outsourcing to contract attorneys introduced quality control
          concerns she wasn&apos;t comfortable with.
        </p>
      </Section>

      <Section title="The Solution">
        <p className="text-gray-700 leading-relaxed">
          Sarah adopted an AI contract review platform that integrates directly with her document management system.
          The tool analyzes each contract against a customizable playbook of her preferred terms, flagging deviations,
          missing clauses, and internal inconsistencies. She spent approximately two weeks configuring the playbook to
          reflect her standard positions on indemnification, limitation of liability, termination provisions, and
          insurance requirements. The AI now performs the initial review pass, highlighting issues and generating a
          redline summary that Sarah refines before sending to opposing counsel.
        </p>
      </Section>

      <Section title="Results">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <KeyMetric label="Time Saved on Review" value="70%" />
          <KeyMetric label="Contracts Per Month" value="25-30" />
          <KeyMetric label="Revenue Growth" value="40%" />
          <KeyMetric label="Weekly Hours Freed" value="10+" />
        </div>
        <p className="text-gray-700 leading-relaxed">
          What previously took Sarah 30 to 45 minutes per contract now takes 10 to 15 minutes. The AI&apos;s first-pass
          review catches clause inconsistencies that she admits she occasionally missed during long review sessions —
          particularly cross-reference errors between indemnification and insurance provisions. With more than 10 hours
          per week freed up, Sarah has invested that time in client development, attending networking events, and
          offering advisory consultations. Her practice revenue has grown 40% year over year, and she has not needed
          to hire additional staff.
        </p>
      </Section>

      <Section title="Implementation Details">
        <p className="text-gray-700 leading-relaxed">
          The transition required a modest upfront investment of time and money. The AI platform costs approximately
          $350 per month, which Sarah considers negligible compared to the revenue it has enabled. The two-week
          playbook configuration period was the most labor-intensive phase — she reviewed her last 50 contracts to
          identify her standard positions and exceptions. She also maintains a quarterly review cycle, updating the
          playbook as market standards and client needs evolve. Sarah emphasizes that the AI does not replace her
          judgment; it accelerates the mechanical aspects of review so she can focus on the strategic and
          relationship-driven parts of her practice.
        </p>
      </Section>

      <Takeaway>
        <ul className="space-y-2 text-blue-900">
          <li>• AI contract review tools can reduce review time by 70% for solo practitioners handling routine commercial agreements.</li>
          <li>• The initial playbook configuration is critical — invest the time to customize the tool to your practice area and preferred terms.</li>
          <li>• Freed capacity can be redirected to revenue-generating activities like client development, making the ROI substantial even for solo practices.</li>
          <li>• AI catches consistency errors that fatigued human reviewers may miss, improving work product quality alongside efficiency.</li>
        </ul>
      </Takeaway>
    </>
  ),

  "legal-aid-nonprofit-ai-tools": (
    <>
      <Section title="Overview">
        <p className="text-gray-700 leading-relaxed">
          Greater Boston Legal Aid (GBLA) is a nonprofit legal services organization providing free representation to
          low-income residents across the greater Boston metropolitan area. With a 12-person team serving a community
          with overwhelming demand for civil legal assistance, GBLA faced a persistent backlog that left vulnerable
          clients waiting six months or longer for help. By strategically implementing free and low-cost AI tools
          across intake, document assembly, and legal research, GBLA tripled its client capacity without adding staff.
        </p>
      </Section>

      <Section title="The Challenge">
        <p className="text-gray-700 leading-relaxed">
          GBLA&apos;s waiting list had grown to more than 400 individuals, with average wait times exceeding six months
          for non-emergency matters. The organization&apos;s attorneys were spending a disproportionate amount of time
          on administrative tasks — initial intake screenings, drafting routine court filings, and conducting baseline
          legal research for common housing and benefits disputes. Many callers had issues that could be resolved with
          self-help resources, but staff lacked the bandwidth to properly triage and redirect them. Meanwhile, clients
          with urgent needs, including those facing eviction or domestic violence situations, were caught in the same
          queue as individuals seeking general legal information.
        </p>
      </Section>

      <Section title="The Solution">
        <p className="text-gray-700 leading-relaxed">
          GBLA implemented a three-pronged AI strategy using primarily free and open-source tools. First, an AI-powered
          intake chatbot was deployed on their website and phone system to conduct initial screening. The chatbot asks
          structured questions to assess case type, urgency, income eligibility, and jurisdiction, then either schedules
          an attorney consultation or directs the caller to curated self-help resources. Second, a document automation
          system generates housing court forms, benefits appeal letters, and other routine filings based on attorney-approved
          templates. Third, an AI legal research assistant helps staff attorneys prepare for hearings by quickly identifying
          relevant case law and statutory provisions for common civil legal issues in Massachusetts.
        </p>
      </Section>

      <Section title="Results">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <KeyMetric label="Client Capacity Increase" value="3x" />
          <KeyMetric label="Inquiries Triaged by AI" value="60%" />
          <KeyMetric label="Form Generation Time" value="Minutes" />
          <KeyMetric label="Wait Time Reduction" value="75%" />
        </div>
        <p className="text-gray-700 leading-relaxed">
          The AI chatbot now handles 60% of initial inquiries, filtering those who can benefit from self-help resources
          and prioritizing urgent cases for immediate attorney attention. Document automation has reduced the time to
          produce housing court filings from 2 to 3 hours of manual drafting down to approximately 15 minutes of
          attorney review and customization. The research assistant saves an estimated 4 hours per case on legal
          research for common dispute types. Combined, these efficiencies have allowed GBLA to serve three times as
          many clients with the same 12-person team, and the average wait time for non-emergency matters has dropped
          from over six months to approximately six weeks.
        </p>
      </Section>

      <Section title="Implementation Details">
        <p className="text-gray-700 leading-relaxed">
          GBLA secured a small technology grant of $12,000 to cover initial setup and integration costs. The intake
          chatbot was built using an open-source conversational AI framework, customized with GBLA&apos;s screening
          criteria and resource directory. Document templates were developed by senior attorneys and reviewed for
          compliance with Massachusetts court filing requirements. The organization conducted a three-month pilot
          with the housing unit before rolling the tools out to all practice areas. Staff training took approximately
          two weeks, and GBLA assigned one paralegal as the &quot;technology liaison&quot; responsible for maintaining
          templates and monitoring chatbot accuracy. The team reviews AI-generated outputs on a monthly basis to ensure
          quality standards are maintained.
        </p>
      </Section>

      <Takeaway>
        <ul className="space-y-2 text-blue-900">
          <li>• Legal aid organizations can dramatically expand capacity using free and low-cost AI tools without increasing headcount.</li>
          <li>• AI-powered intake triage is especially impactful — routing self-help-eligible inquiries frees attorneys for complex cases that require representation.</li>
          <li>• Document automation delivers outsized returns for organizations that handle high volumes of standardized court filings.</li>
          <li>• A phased rollout with a dedicated technology liaison helps ensure quality and staff buy-in during the transition.</li>
        </ul>
      </Takeaway>
    </>
  ),

  "small-business-ai-employment-contracts": (
    <>
      <Section title="Overview">
        <p className="text-gray-700 leading-relaxed">
          Marcus Rivera is the founder and CEO of BrightCart, a 45-person e-commerce company headquartered in Dallas,
          Texas. When BrightCart expanded operations into California and New York, Marcus needed employment contracts
          that complied with each state&apos;s distinct labor and employment laws. Rather than engage outside counsel
          for every contract iteration, he used AI-powered legal drafting tools to produce compliant agreements in hours
          instead of weeks — saving more than $15,000 in outside counsel fees for routine employment documentation.
        </p>
      </Section>

      <Section title="The Challenge">
        <p className="text-gray-700 leading-relaxed">
          Multi-state employment compliance is notoriously complex. California&apos;s strict non-compete restrictions,
          mandatory paid sick leave provisions, and at-will employment notice requirements differ substantially from
          Texas and New York law. Marcus had been quoted $4,000 to $6,000 per state by employment law firms to draft
          compliant offer letters, employment agreements, and contractor agreements. With plans to hire 15 new employees
          across three states, the projected legal costs for routine documentation alone exceeded $18,000. As a growing
          company, BrightCart needed those funds for product development and marketing, not for boilerplate contract
          drafting that followed well-established legal patterns.
        </p>
      </Section>

      <Section title="The Solution">
        <p className="text-gray-700 leading-relaxed">
          Marcus used an AI legal drafting platform designed for employment documentation. The tool includes
          state-specific templates that are updated regularly to reflect current employment law requirements. He
          selected the relevant states, specified key terms such as compensation structure, benefits eligibility,
          intellectual property assignment, and confidentiality provisions, and the AI generated draft agreements
          tailored to each jurisdiction. The platform flagged specific provisions where California law differed from
          his Texas-based defaults — including meal and rest break requirements, expense reimbursement obligations, and
          the prohibition on non-compete clauses. Marcus then had a local employment attorney in each state conduct a
          focused review of the AI-generated drafts, which took roughly one hour per state rather than the full
          drafting engagement originally quoted.
        </p>
      </Section>

      <Section title="Results">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <KeyMetric label="Drafting Speed Improvement" value="90%" />
          <KeyMetric label="Legal Cost Savings" value="$15K+" />
          <KeyMetric label="States Covered" value="3" />
          <KeyMetric label="Time to Final Contracts" value="3 Days" />
        </div>
        <p className="text-gray-700 leading-relaxed">
          The AI platform generated initial drafts for all three states within a single afternoon. Attorney review and
          final revisions were completed within three business days — a process that would have taken three to four weeks
          through traditional outside counsel engagement. Total legal spend came to approximately $2,800 (platform
          subscription plus attorney review hours), compared to the original estimate of $18,000 or more. Marcus
          reports that the AI-generated drafts were substantively strong, with attorneys making only minor adjustments
          to severability clauses and jurisdiction-specific notice periods. He continues to use the platform for new
          hire documentation and has extended it to independent contractor agreements.
        </p>
      </Section>

      <Section title="Implementation Details">
        <p className="text-gray-700 leading-relaxed">
          Marcus subscribes to the AI drafting platform at $199 per month, which includes unlimited document generation
          and access to all state templates. He maintains a relationship with employment attorneys in each state for
          final review of AI-generated documents — a focused review engagement that costs $300 to $500 per state rather
          than a full drafting project. For complex provisions such as intellectual property assignment clauses and
          non-compete or non-solicitation agreements where permitted, Marcus still engages outside counsel directly.
          He treats the AI tool as appropriate for &quot;established law with clear patterns&quot; and relies on human
          attorneys for provisions requiring strategic judgment or where the law is unsettled.
        </p>
      </Section>

      <Takeaway>
        <ul className="space-y-2 text-blue-900">
          <li>• AI drafting tools excel at generating multi-state employment contracts where the legal requirements are well-established and template-driven.</li>
          <li>• The most cost-effective approach combines AI drafting with focused attorney review — reducing lawyer hours from full drafting to targeted revision.</li>
          <li>• Small businesses expanding to new states can save 80% or more on routine employment documentation costs.</li>
          <li>• Complex or strategically sensitive provisions (IP assignment, non-competes) should still involve direct attorney engagement.</li>
        </ul>
      </Takeaway>
    </>
  ),

  "startup-series-a-legal-free-tools": (
    <>
      <Section title="Overview">
        <p className="text-gray-700 leading-relaxed">
          Priya Sharma is a first-time founder who built DataLens, a B2B SaaS platform for supply chain analytics.
          When she began preparing for her Series A fundraise, she faced the daunting reality of legal costs that
          could consume a significant portion of her remaining seed capital. By strategically using free AI-powered
          legal tools — including contract checkers, legal readiness assessments, and document comparison utilities —
          Priya prepared her company for due diligence and reduced her total Series A legal spend from an estimated
          $23,000 to just $8,000.
        </p>
      </Section>

      <Section title="The Challenge">
        <p className="text-gray-700 leading-relaxed">
          Series A fundraising involves substantial legal complexity: reviewing and cleaning up existing SAFE agreements
          and convertible notes, organizing corporate records, ensuring IP assignments are properly executed, preparing
          disclosure schedules, and negotiating the term sheet and definitive documents. Priya had raised her seed round
          using standard SAFE agreements from Y Combinator, but she wasn&apos;t certain they were properly executed or
          that the terms were consistent across her five investor SAFEs. Her corporate records were disorganized, stored
          across Google Drive folders and email attachments. Outside counsel estimated $20,000 to $25,000 for full
          Series A legal representation, a figure that would strain DataLens&apos;s remaining $180,000 in runway.
        </p>
      </Section>

      <Section title="The Solution">
        <p className="text-gray-700 leading-relaxed">
          Priya used a combination of free AI legal tools to do the preparatory work herself before engaging an attorney.
          She ran her five SAFE agreements through a free AI contract checker, which identified three critical issues: one
          SAFE had an incorrect valuation cap that didn&apos;t match the signed term sheet, another was missing the
          pro-rata rights side letter that had been agreed upon verbally, and a third contained an outdated
          most-favored-nation clause that conflicted with a later SAFE. She then used a free legal readiness quiz tool
          to identify gaps in her corporate housekeeping — discovering that two employees had never signed IP assignment
          agreements and that her Delaware franchise tax was overdue. Finally, she used a document comparison tool to
          verify consistency across her corporate formation documents.
        </p>
      </Section>

      <Section title="Results">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <KeyMetric label="Total Legal Savings" value="$15K" />
          <KeyMetric label="Critical Issues Caught" value="3" />
          <KeyMetric label="Final Legal Spend" value="$8K" />
          <KeyMetric label="Due Diligence Prep Time" value="2 Weeks" />
        </div>
        <p className="text-gray-700 leading-relaxed">
          By catching the three SAFE agreement issues before attorney review, Priya avoided what could have been a
          deal-disrupting discovery during investor due diligence. The incorrect valuation cap alone could have created
          a $200,000 discrepancy in her cap table calculations. With her documents organized and preliminary issues
          resolved, her attorney&apos;s work was focused on final review, term sheet negotiation, and closing — reducing
          billable hours from an estimated 50 to 60 hours down to approximately 20 hours. Priya closed her $2.5 million
          Series A within six weeks of engaging counsel, a timeline her attorney described as unusually efficient for a
          first-time founder.
        </p>
      </Section>

      <Section title="Implementation Details">
        <p className="text-gray-700 leading-relaxed">
          Priya spent approximately two weeks on self-service preparation before engaging her attorney. The free AI
          contract checker she used required uploading each SAFE agreement individually and generated a plain-language
          summary of key terms, potential issues, and deviations from standard YC SAFE templates. The legal readiness
          quiz was a 30-minute online assessment that produced a checklist of corporate housekeeping items needed for
          due diligence. She used the checklist to gather and organize all corporate records into a virtual data room
          before her first attorney meeting. Priya emphasizes that the AI tools didn&apos;t replace her lawyer — they
          allowed her to be a more prepared and efficient client, which directly translated to lower legal bills and a
          smoother fundraising process.
        </p>
      </Section>

      <Takeaway>
        <ul className="space-y-2 text-blue-900">
          <li>• Free AI legal tools can help startup founders identify critical issues in existing agreements before costly attorney review.</li>
          <li>• Preparing due diligence materials with AI assistance reduces attorney hours and compresses fundraising timelines.</li>
          <li>• The biggest value comes from catching errors early — a single mismatched valuation cap could derail an entire funding round.</li>
          <li>• AI tools work best as preparation aids, not attorney replacements. The goal is to be a better-prepared client, not to eliminate legal counsel.</li>
        </ul>
      </Takeaway>
    </>
  ),

  "litigation-firm-ediscovery-cost-savings": (
    <>
      <Section title="Overview">
        <p className="text-gray-700 leading-relaxed">
          Morrison &amp; Associates is a 15-attorney litigation firm based in Chicago, Illinois, specializing in complex
          commercial disputes. When the firm took on a breach-of-contract case involving 2.3 million documents in
          discovery, the projected cost of traditional manual review threatened to make the case economically unviable
          for their client. By deploying an AI-powered e-discovery platform with predictive coding and automated
          document classification, the firm reduced the reviewable document set by 92% and saved $1.2 million in
          review costs on a single matter.
        </p>
      </Section>

      <Section title="The Challenge">
        <p className="text-gray-700 leading-relaxed">
          The case involved a dispute between two manufacturing companies over a multi-year supply agreement. The
          opposing party produced 2.3 million documents, including emails, spreadsheets, contracts, invoices, and
          internal memoranda spanning a seven-year period. Traditional document review using contract attorneys at
          market rates would have required approximately 35 to 40 reviewers working for four months, at a projected
          cost exceeding $1.8 million. The client&apos;s total damages claim was $4.5 million, meaning that discovery
          costs alone could consume 40% of the potential recovery. Morrison &amp; Associates needed a way to conduct a
          defensible review at a fraction of the traditional cost, without sacrificing quality or creating grounds for
          sanctions.
        </p>
      </Section>

      <Section title="The Solution">
        <p className="text-gray-700 leading-relaxed">
          The firm engaged an AI-powered e-discovery platform that combines predictive coding (technology-assisted
          review) with machine learning document classification. The process began with senior attorneys reviewing and
          coding a seed set of 3,000 documents across relevance, privilege, and key issue categories. The AI model
          trained on these coding decisions and then scored the entire 2.3 million document collection. Documents
          scoring below the relevance threshold were set aside after statistical validation confirmed a recall rate
          above 90%. The AI also applied automated privilege classification, flagging documents containing attorney
          names, legal terminology, and communication patterns consistent with privileged material. This reduced the
          reviewable set to approximately 180,000 documents, which a team of 8 contract reviewers completed in six
          weeks.
        </p>
      </Section>

      <Section title="Results">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <KeyMetric label="Total Cost Savings" value="$1.2M" />
          <KeyMetric label="Document Reduction" value="92%" />
          <KeyMetric label="Final Review Cost" value="$600K" />
          <KeyMetric label="Privileged Docs Caught by AI" value="340+" />
        </div>
        <p className="text-gray-700 leading-relaxed">
          The total review cost came to approximately $600,000 — one-third of the projected $1.8 million for manual
          review. Beyond cost savings, the AI platform delivered measurably higher quality. During validation sampling,
          the AI&apos;s privilege classification identified 340 privileged documents that human reviewers had missed or
          miscoded in a parallel test sample. This was particularly significant because inadvertent privilege waiver
          could have had severe consequences for the client. The case ultimately settled favorably, and the client
          credited the firm&apos;s cost-effective discovery management as a key factor in their decision to pursue the
          litigation rather than accepting an early lowball settlement.
        </p>
      </Section>

      <Section title="Implementation Details">
        <p className="text-gray-700 leading-relaxed">
          Morrison &amp; Associates worked with the e-discovery vendor to establish a defensible workflow that would
          withstand judicial scrutiny. The firm documented the predictive coding methodology in a detailed protocol
          submitted to the court, including the seed set selection process, training rounds, statistical validation
          metrics, and quality control sampling procedures. Senior partners invested approximately 40 hours in seed set
          review and model training over the first two weeks. The firm also negotiated with opposing counsel to accept
          the technology-assisted review protocol, citing case law supporting predictive coding as a proportionate
          discovery method under Federal Rule of Civil Procedure 26(b)(1). The platform&apos;s analytics dashboard
          allowed the litigation team to track review progress, identify key document clusters, and develop case themes
          during the review process — turning discovery from a pure cost center into a strategic advantage.
        </p>
      </Section>

      <Takeaway>
        <ul className="space-y-2 text-blue-900">
          <li>• AI-powered e-discovery can reduce document review costs by 65% or more on large-scale litigation matters.</li>
          <li>• Predictive coding is not just cheaper — it can be more accurate than manual review, particularly for privilege identification.</li>
          <li>• Proper documentation of the AI methodology is essential for defensibility; courts increasingly accept technology-assisted review when properly validated.</li>
          <li>• The cost savings from AI e-discovery can make litigation economically viable for cases that would otherwise be too expensive to pursue.</li>
        </ul>
      </Takeaway>
    </>
  ),
};
