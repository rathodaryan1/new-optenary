import { useEffect } from 'react';
import SEO from '../components/SEO';
import RwHeader from '../components/reachwise/RwHeader';
import RwLegal from '../components/reachwise/RwLegal';
import RwFooter from '../components/reachwise/RwFooter';
import '../components/reachwise/reachwise.css';

const PRIVACY_MARKDOWN = `## 1. Information We Collect
At Optenary, we collect information you provide directly to us when you fill out contact forms, schedule consultation meetings, or engage our engineering studio for software, mobile, AI, and web development projects:
- **Contact Details:** Name, company or organisation name, professional email address, phone number, and physical office location.
- **Project Specifications:** Technical requirements, architecture diagrams, feature lists, budget ranges, and target deployment timelines.
- **Automated Technical Telemetry:** Browser type, operating system, IP address, device viewport, referral sources, and anonymized user journey paths collected via strictly necessary analytics and session telemetry.

## 2. How We Use Your Data
We process collected data under legitimate business interest, contractual necessity, and direct consent for:
- Delivering custom software engineering, cloud infrastructure, AI automation, and UI/UX design services.
- Responding to technical project inquiries, scoping architectural estimates, and executing statement-of-work (SOW) deliverables.
- Sending transactional updates, engineering reports, security vulnerability alerts, and fortnightly engineering dispatches.
- Continually benchmarking website performance, Core Web Vitals, and accessibility compliance.

> We treat your proprietary source code, internal system schemas, and technical product concepts with strict confidentiality under bilateral Non-Disclosure Agreements (NDAs).

## 3. Data Protection & Security Architecture
Optenary implements multi-layered security controls to protect client information and system records:
- **Encryption at Rest & in Transit:** All traffic is encrypted using TLS 1.3 / modern cryptographic ciphers; stored data utilizes AES-256 encryption.
- **Principle of Least Privilege:** Production databases and project repositories are accessible solely by authorized engineering leads via multi-factor authentication (MFA) and hardware security keys.
- **Tenant Isolation:** We strictly isolate client datasets, test environments, and development staging servers to prevent cross-contamination.

## 4. Third-Party Integrations & Service Providers
We do not sell, rent, or trade your personal or business data to third-party advertising networks. We share information only with trusted infrastructure providers critical to service delivery:
- **Cloud Infrastructure Providers:** Amazon Web Services (AWS), Google Cloud Platform (GCP), and Cloudflare for edge CDN, compute, and DNS resolution.
- **Communication & Workspace Tools:** Google Workspace and transactional email providers operating under GDPR-compliant Data Processing Agreements (DPAs).
- **Payment & Invoicing:** Compliant, PCI-DSS certified payment gateways for milestone billing and retained engineering contracts.

## 5. Cookies & Local Storage
We use minimal, privacy-first session cookies to remember navigation states, maintain cookie preferences, and analyze aggregated traffic. We do not use intrusive third-party cross-site trackers. You can disable cookies at any time via your browser settings.

## 6. Your Rights & Data Portability
Under applicable data protection frameworks (including India's Digital Personal Data Protection Act (DPDPA) and GDPR where applicable), you have the right to:
- Request a copy of the personal information Optenary holds about you.
- Request immediate rectification of inaccurate or incomplete records.
- Request the permanent erasure of your personal data ("right to be forgotten"), subject to statutory tax and contract retention obligations.
- Opt-out of non-essential communications and engineering newsletters at any time via one-click unsubscribe links.

## 7. Contacting the Data Controller
To exercise your rights or ask questions regarding this policy, contact our compliance team:
- **Email:** [hello@optenary.in](mailto:hello@optenary.in)
- **Phone:** [+91 93166 88014](tel:+919316688014)
- **Office:** Surat, Gujarat, India
`;

export default function PrivacyPolicyPage() {
  useEffect(() => {
    document.title = 'Privacy Policy — Optenary Digital Product Studio';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#EEEEE8] text-[#0D0E10] selection:bg-[#D4FF3A] selection:text-[#08090A] antialiased">
      <SEO 
        title="Privacy Policy | Optenary"
        description="Learn how Optenary collects, processes, and protects your personal information, system telemetry, and project intellectual property."
        keywords="privacy policy, data protection, optenary privacy, compliance, NDA, GDPR, DPDPA"
        canonicalPath="/privacy-policy"
      />
      <RwHeader />
      <main id="main-content">
        <RwLegal
          eyebrow="Governance"
          heading="Privacy|*Policy*."
          lead="At Optenary, we value your privacy and are committed to protecting your personal information, proprietary source code, and project data."
          updated="October 2026"
          tocTitle="Policy Sections"
          content={PRIVACY_MARKDOWN}
        />
      </main>
      <RwFooter wordmark="Optenary" />
    </div>
  );
}
