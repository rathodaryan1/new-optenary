import { useEffect } from 'react';
import SEO from '../components/SEO';
import RwHeader from '../components/reachwise/RwHeader';
import RwLegal from '../components/reachwise/RwLegal';
import RwFooter from '../components/reachwise/RwFooter';
import '../components/reachwise/reachwise.css';

const TERMS_MARKDOWN = `## 1. Acceptance of Terms
Welcome to Optenary. By accessing this website (optenary.in), communicating with our team, or contracting our technology studio for software development, mobile application engineering, AI automation, or cloud architecture services, you agree to be bound by these Terms of Service and any project-specific Master Services Agreements (MSA) or Statements of Work (SOW) executed between the parties.

## 2. Studio Services & Engagement Scope
Optenary provides digital technology and software engineering services, including:
- Custom full-stack web and SaaS platform architecture
- Native and cross-platform mobile application development (iOS & Android)
- Autonomous AI agent systems, LLM fine-tuning, and deterministic workflow pipelines
- Enterprise DevOps, infrastructure orchestration, CI/CD, and cloud cost optimization
- UI/UX product design, interactive prototypes, and design systems

All custom development engagements are delivered according to milestone roadmaps, architectural specifications, and quality benchmarks mutually agreed upon in writing.

## 3. Intellectual Property Rights
- **Client Deliverables:** Upon full settlement of invoiced milestone fees, all proprietary bespoke source code, custom assets, databases, and application designs developed exclusively for the client transfer to the client, unless explicitly reserved as pre-existing background IP.
- **Optenary Background IP & Tooling:** Generic utility libraries, base boilerplates, deployment scripts, algorithmic routines, and developer tooling created prior to or independent of the engagement remain the intellectual property of Optenary. Clients receive a perpetual, irrevocable, worldwide, royalty-free license to use, modify, and run such tooling within the deliverable software.
- **Studio Branding:** The Optenary name, geometric P logo, typography, domain assets, and marketing materials are the exclusive property of Optenary and may not be used without prior written authorization.

## 4. Client Responsibilities & Materials
To ensure timely sprint execution, clients agree to:
- Provide timely access to third-party APIs, credentials, hosting environments, and domain DNS records required for project execution.
- Review design prototypes, staging builds, and milestone deliverables within the agreed review windows (typically 5 business days).
- Warrant that all text, logos, trademarks, and third-party media supplied to Optenary for integration into deliverables do not infringe upon any third-party intellectual property rights.

## 5. Warranties & Quality Assurance
Optenary engineers all software following modern engineering standards, automated test coverage, and strict performance budgets:
- All custom software releases include a standard 30-day post-launch warranty covering bug fixes and remediation of deviations from agreed-upon project specifications.
- We do not warrant that third-party APIs, external cloud outages (e.g. AWS, Stripe, Google), or unapproved client modifications will operate without interruption.

> Our engineering philosophy is grounded in durability: we write clean, typed, well-documented code designed to outlast short-term technology fads.

## 6. Limitation of Liability
To the maximum extent permitted by applicable law, in no event shall Optenary or its directors, engineers, or contractors be liable for any indirect, punitive, special, incidental, or consequential damages (including loss of business profits, lost revenue, data corruption, or operational interruptions) arising out of or related to website access or project delivery. Optenary's total cumulative liability under any engagement shall not exceed the total fees paid by the client to Optenary during the three (3) months preceding the claim.

## 7. Governing Law & Dispute Resolution
These Terms and any project engagements shall be governed by and construed in accordance with the substantive laws of India, without regard to its conflict of law principles. Any dispute arising out of or relating to these terms shall be subject to the exclusive jurisdiction of the competent courts in Surat, Gujarat, India.

## 8. Modifications to Terms
Optenary reserves the right to revise these Terms periodically. Substantive updates will be published on this page with a revised effective date. Continued access to our services after any modification constitutes acceptance of the updated terms.

## 9. Contact & Inquiries
For legal notices, contract inquiries, or clarification regarding these terms:
- **Email:** [hello@optenary.in](mailto:hello@optenary.in)
- **Phone:** [+91 93166 88014](tel:+919316688014)
- **Location:** Surat, Gujarat, India
`;

export default function TermsPage() {
  useEffect(() => {
    document.title = 'Terms of Service — Optenary Digital Product Studio';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#EEEEE8] text-[#0D0E10] selection:bg-[#D4FF3A] selection:text-[#08090A] antialiased">
      <SEO 
        title="Terms of Service | Optenary"
        description="Review the terms and conditions for engaging with Optenary's custom software development, AI automation, and web/mobile development services."
        keywords="terms of service, optenary terms, engagement contract, intellectual property terms, SLA, warranty, software agreement"
        canonicalPath="/terms-of-service"
      />
      <RwHeader />
      <main id="main-content">
        <RwLegal
          eyebrow="Contracts & Terms"
          heading="Terms of|*Service*."
          lead="Review the terms and governance standards for engaging Optenary for custom software development, AI automation, and digital engineering."
          updated="October 2026"
          tocTitle="Agreement Terms"
          content={TERMS_MARKDOWN}
        />
      </main>
      <RwFooter wordmark="Optenary" />
    </div>
  );
}
