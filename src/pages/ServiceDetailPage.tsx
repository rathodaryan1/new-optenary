import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import SEO from '../components/SEO';
import RwHeader from '../components/reachwise/RwHeader';
import RwPageHero from '../components/reachwise/RwPageHero';
import RwFunnel from '../components/reachwise/RwFunnel';
import RwFaq from '../components/reachwise/RwFaq';
import RwCta from '../components/reachwise/RwCta';
import RwFooter from '../components/reachwise/RwFooter';
import '../components/reachwise/reachwise.css';

interface ServiceData {
  slug: string;
  title: string;
  eyebrow: string;
  heroTitle: string;
  lead: string;
  price: string;
  kpi: string;
  kpiLabel: string;
  techStack: string[];
  deliverables: { title: string; desc: string; icon: string }[];
  caseStudy?: { title: string; client: string; desc: string; link: string; metric: string; metricLabel: string; img: string };
  funnelSteps: string;
  faqs: { q: string; a: string }[];
}

const SERVICES_REGISTRY: Record<string, ServiceData> = {
  'web-development': {
    slug: 'web-development',
    title: 'Web Development',
    eyebrow: '(01) Capability · Web Engineering',
    heroTitle: 'Web Development|*Engineered for scale.*',
    lead: 'Modern React and Next.js web applications built with clean TypeScript, sub-second TTFB, edge SSR hydration, and fluid 60fps UX.',
    price: 'From $2,400',
    kpi: '99+',
    kpiLabel: 'Lighthouse Performance Score',
    techStack: ['React', 'Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'Tailwind CSS', 'Docker', 'AWS'],
    deliverables: [
      {
        title: 'Full-Stack Next.js & React',
        desc: 'Server-side rendering, streaming SSR, and edge API routes tailored for high concurrency and sub-second global responses.',
        icon: '⚡',
      },
      {
        title: 'Sub-Second Global TTFB',
        desc: 'Edge caching via Cloudflare/Vercel, asset prefetching, and Brotli compression ensuring instant first-byte arrival globally.',
        icon: '🌐',
      },
      {
        title: '100% Client Code & IP Ownership',
        desc: 'Clean, strictly typed TypeScript code delivered with comprehensive automated integration tests and zero vendor lock-in.',
        icon: '🔒',
      },
      {
        title: 'Automated CI/CD & Deployments',
        desc: 'Dockerized staging environments, automated GitHub Actions testing pipelines, and zero-downtime production rollouts.',
        icon: '🚀',
      },
      {
        title: 'Enterprise Security Architecture',
        desc: 'CSRF mitigation, strict Content Security Policies (CSP), rate limiting, and encrypted session management.',
        icon: '🛡️',
      },
      {
        title: '100/100 Core Web Vitals',
        desc: 'Zero layout shift (CLS), instant interactive readiness (INP), and lightning-fast largest contentful paint (LCP).',
        icon: '📈',
      },
    ],
    caseStudy: {
      title: 'Direct-to-consumer dairy e-commerce & distribution',
      client: 'Mehta Dairy',
      desc: 'High-performance Next.js direct-to-consumer web platform handling daily subscription orders with sub-second page loads.',
      link: '/work',
      metric: '2,400+',
      metricLabel: 'Daily active orders scaled',
      img: '/images/work/mehta_dairy_studio.webp',
    },
    funnelSteps: 'Architecture Scoping · Sprint 1: Requirements breakdown, API schema design, and technical stack lock-in.;UI/UX & Design System · Sprint 2: Interactive prototypes, component library tokens, and design sign-off.;Agile Full-Stack Engineering · Sprints 3–4: Scalable code, database integration, and weekly preview builds.;QA & Cloud Launch · Launch: Automated stress testing, SEO audit, security compliance, and zero-downtime go-live.',
    faqs: [
      { q: 'How long does a custom web development sprint take?', a: 'A standard web application or high-performance corporate site takes 4 to 8 weeks from initial architecture to production deployment. Complex SaaS platforms run in 2-week agile sprints over 2 to 4 months.' },
      { q: 'Do we own the source code and infrastructure?', a: 'Yes. 100% of all bespoke source code, database schemas, Figma design files, and deployment configurations belong entirely to your company upon milestone completion.' },
      { q: 'How do you guarantee sub-second page performance?', a: 'We architect every project with lightweight variable fonts, edge asset caching, streaming SSR, modern WebP/AVIF formats, and strict bundle-budget limits.' },
      { q: 'Can you migrate or redesign an existing website without losing SEO?', a: 'Yes. We run a comprehensive pre-launch SEO audit, maintain 1:1 URL mappings or exact 301 redirects, migrate all schema metadata, and ensure Core Web Vitals improve post-launch.' },
    ],
  },
  'mobile-development': {
    slug: 'mobile-development',
    title: 'Mobile Applications',
    eyebrow: '(02) Capability · Mobile Engineering',
    heroTitle: 'Mobile Apps|*People love to use.*',
    lead: 'Pixel-perfect iOS & Android applications built with Flutter and React Native. Smooth 60fps animations, offline-first data sync, and instant push notifications.',
    price: 'From $3,500',
    kpi: '60fps',
    kpiLabel: 'Fluid Native Animation Parity',
    techStack: ['Flutter', 'React Native', 'Swift', 'Kotlin', 'Firebase', 'SQLite', 'GraphQL', 'App Store'],
    deliverables: [
      {
        title: 'Single Codebase for iOS & Android',
        desc: 'Complete feature parity across iPhone and Android without paying twice for separate platform engineering teams.',
        icon: '📱',
      },
      {
        title: 'Offline-First Synchronization',
        desc: 'Local SQLite data persistence guaranteeing complete app usability even in zero-reception transit environments.',
        icon: '🔄',
      },
      {
        title: 'Native Device Hardware Access',
        desc: 'Biometric authentication (Face ID / Touch ID), Bluetooth, GPS, camera, and native background audio pipelines.',
        icon: '⚙️',
      },
      {
        title: 'Instant Push & Engagement',
        desc: 'Real-time WebSocket event notifications, segmented FCM messaging, and deep-linking directly into application views.',
        icon: '🔔',
      },
      {
        title: 'Store Submission & Launch',
        desc: 'End-to-end Apple App Store and Google Play Store review approval handling with zero submission friction.',
        icon: '⭐',
      },
      {
        title: 'Real-time Crash Telemetry',
        desc: 'Sentry and Firebase crash reporting catching production exceptions instantly with full device stack traces.',
        icon: '📊',
      },
    ],
    caseStudy: {
      title: 'Smart PG accommodation & co-living management',
      client: 'Urban Nest',
      desc: 'Mobile-first tenant onboarding, biometric gate access, automated rent payment reminders, and maintenance ticketing.',
      link: '/work',
      metric: '98%',
      metricLabel: 'Tenant satisfaction & retention',
      img: '/images/work/urban_nest_studio.webp',
    },
    funnelSteps: 'Mobile UX & Architecture · Sprint 1: Mobile user journeys, platform HIG/Material design, and API specs.;Prototype & Design Tokens · Sprint 2: Interactive Figma mobile prototype and component tokenization.;Cross-Platform Build · Sprints 3–4: Native features, state management, and weekly TestFlight/APK releases.;App Store Approval · Launch: Store metadata optimization, compliance verification, and public launch.',
    faqs: [
      { q: 'Should we choose Flutter or React Native?', a: 'Both are outstanding choices in 2026. Flutter delivers pixel-perfect UI fidelity across platforms using Skia/Impeller, while React Native excels when sharing TypeScript logic with your web frontend.' },
      { q: 'Do you assist with Apple and Google Store approvals?', a: 'Yes. We manage certificates, privacy manifests, screenshots, store listing copy, and test accounts until full store approval is granted.' },
      { q: 'Can the app work without an internet connection?', a: 'Yes. We implement offline-first caching architectures with SQLite or Hive, synchronizing records automatically when network connectivity returns.' },
    ],
  },
  'custom-software': {
    slug: 'custom-software',
    title: 'Custom Software & SaaS',
    eyebrow: '(03) Capability · Enterprise Software',
    heroTitle: 'Custom Software|*Built for your workflow.*',
    lead: 'Multi-tenant cloud architectures, bespoke SaaS platforms, internal ERP dashboards, and resilient background job processing pipelines designed for enterprise durability.',
    price: 'From $4,800',
    kpi: '99.9%',
    kpiLabel: 'Target Production Uptime SLA',
    techStack: ['TypeScript', 'Python', 'PostgreSQL', 'Redis', 'Docker', 'Kubernetes', 'AWS', 'Stripe'],
    deliverables: [
      {
        title: 'Multi-Tenant Database Isolation',
        desc: 'Row-Level Security (RLS) guaranteeing strict data privacy and zero cross-tenant contamination.',
        icon: '🏢',
      },
      {
        title: 'Automated Job Processing Queues',
        desc: 'Distributed Redis & BullMQ workers processing PDF exports, background analytics, and webhook dispatch.',
        icon: '⚡',
      },
      {
        title: 'Subscription & Billing Pipelines',
        desc: 'Turnkey Stripe and Razorpay integrations with automated tax calculations, metered usage, and invoice dispatch.',
        icon: '💳',
      },
      {
        title: 'Granular Role-Based Access (RBAC)',
        desc: 'Fine-grained permission matrices, team workspace hierarchies, and single sign-on (SSO) readiness.',
        icon: '🔑',
      },
      {
        title: 'Comprehensive REST & GraphQL APIs',
        desc: 'Self-documenting OpenAPI / Swagger specifications and deterministic rate-limited API endpoints.',
        icon: '🔌',
      },
      {
        title: 'Observable Audit Logging',
        desc: 'Immutable audit logs tracking sensitive user actions, security alterations, and compliance events.',
        icon: '📋',
      },
    ],
    caseStudy: {
      title: 'B2B industrial components & fasteners inventory engine',
      client: 'Shree Enterprise',
      desc: 'Bespoke inventory engine indexing over 10,000+ hardware SKUs with instant quote generation and ERP sync.',
      link: '/work',
      metric: '0.4s',
      metricLabel: 'Catalog query latency down from 3.2s',
      img: '/images/work/shree_enterprise_studio.webp',
    },
    funnelSteps: 'System Architecture · Sprint 1: Domain-driven design, entity schemas, and tenancy model design.;Core API & Security · Sprints 2–3: Authentication, database migrations, and queue workers.;Frontend & Dashboard · Sprints 4–5: Role-based admin panels, reporting dashboards, and billing integration.;Load Testing & Deployment · Launch: Penetration testing, database read-replica setup, and cloud launch.',
    faqs: [
      { q: 'How do you ensure data isolation between different customer tenants?', a: 'We utilize PostgreSQL Row-Level Security (RLS) and schema-level tenancy models, enforcing isolation at the database query layer rather than application code.' },
      { q: 'Can you integrate with our existing ERP or third-party CRM?', a: 'Yes. We have built integrations with SAP, Salesforce, HubSpot, QuickBooks, Tally, and custom legacy SQL databases.' },
      { q: 'What happens after the software launches?', a: 'We provide a 30-day post-launch warranty covering all bug fixes and offer ongoing SLA retainer plans for continuous feature iterations and 24/7 uptime monitoring.' },
    ],
  },
  'ai-agents-automation': {
    slug: 'ai-agents-automation',
    title: 'AI Agents & Automation',
    eyebrow: '(04) Capability · Applied AI Engineering',
    heroTitle: 'Autonomous AI|*That executes real work.*',
    lead: 'Moving beyond superficial chat prompts: deterministic agent tool calling, multi-agent orchestrations, enterprise RAG document retrieval, and automated business workflows.',
    price: 'From $2,800',
    kpi: '< 1.2s',
    kpiLabel: 'LLM Response & Tool Execution',
    techStack: ['Python', 'LangGraph', 'Claude / GPT API', 'pgvector', 'Ollama', 'Docker', 'FastAPI', 'n8n'],
    deliverables: [
      {
        title: 'Deterministic Tool Calling',
        desc: 'Structured Zod / JSON schemas guaranteeing the AI executes database and API actions with zero hallucinations.',
        icon: '🤖',
      },
      {
        title: 'Enterprise RAG Document Search',
        desc: 'Vector embeddings over private PDF catalogs and company manuals with strict permission-aware retrieval.',
        icon: '🔍',
      },
      {
        title: 'Autonomous Multi-Agent Pipelines',
        desc: 'Collaborative agent swarms handling automated lead qualification, contract analysis, and support resolution.',
        icon: '🤝',
      },
      {
        title: 'Private & Local LLM Hosting',
        desc: 'Deploy open-source LLMs (Llama 3, Mistral) on your own private cloud hardware for absolute data sovereignty.',
        icon: '🛡️',
      },
      {
        title: 'Human-in-the-Loop Safeguards',
        desc: 'Approval checkpoints for high-stakes business operations ensuring humans retain final authority.',
        icon: '👤',
      },
      {
        title: 'Continuous Trace Telemetry',
        desc: 'LangSmith / Arize observability tracking prompt performance, execution latency, and token cost curves.',
        icon: '📊',
      },
    ],
    funnelSteps: 'Use Case Feasibility · Sprint 1: Identify high-ROI workflows, evaluate token budgets, and lock model strategy.;RAG & Vector Ingestion · Sprint 2: Data parsing, embedding pipeline, and vector indexing setup.;Agent Orchestration · Sprints 3–4: Tool-calling logic, deterministic guards, and webhook triggers.;Staging Validation · Launch: Rigorous red-teaming, regression test suite, and monitored production deployment.',
    faqs: [
      { q: 'Is our proprietary company data used to train public AI models?', a: 'Never. We enforce zero-data-retention enterprise API endpoints or deploy self-hosted private models directly in your dedicated AWS/GCP VPC.' },
      { q: 'How do you prevent AI hallucinations?', a: 'By combining deterministic schema validation (Zod/Pydantic), strict tool-calling boundaries, ground-truth RAG retrieval, and explicit confidence score cutoffs.' },
    ],
  },
  'web-design': {
    slug: 'web-design',
    title: 'UI/UX & Design Systems',
    eyebrow: '(05) Capability · Product Design',
    heroTitle: 'Design Systems|*Built for conversion.*',
    lead: 'Comprehensive Figma design systems, interactive prototypes, fluid micro-interactions, and 1:1 translation into production React component libraries.',
    price: 'From $2,000',
    kpi: '1:1',
    kpiLabel: 'Figma to React Production Parity',
    techStack: ['Figma', 'Design Tokens', 'Tailwind CSS', 'Framer Motion', 'Storybook', 'WCAG AA'],
    deliverables: [
      {
        title: 'Modular Design Tokens',
        desc: 'Comprehensive color tokens, typography scales, spacing variables, and component variants.',
        icon: '🎨',
      },
      {
        title: 'Interactive Figma Prototypes',
        desc: 'Realistic clickable user flows validated with real customers before writing a single line of code.',
        icon: '🖱️',
      },
      {
        title: 'Responsive Breakpoint Parity',
        desc: 'Crafted systematically for mobile (320px+), tablet, and desktop viewports.',
        icon: '📐',
      },
      {
        title: 'Production React Storybook',
        desc: 'Tokens and components directly mapped to production React & Tailwind codebases.',
        icon: '📦',
      },
      {
        title: 'WCAG 2.1 AA Accessibility',
        desc: 'Color contrast validation, keyboard navigation focus rings, and screen-reader accessibility.',
        icon: '♿',
      },
      {
        title: 'Motion & Micro-Interactions',
        desc: 'Fluid physics-based spring animations and interactive cues that make software feel alive.',
        icon: '✨',
      },
    ],
    funnelSteps: 'Product Discovery · Sprint 1: User personas, competitor teardowns, and information architecture.;Wireframing & UX · Sprint 2: Low-fidelity wireframes and primary conversion paths.;Visual Design & Tokens · Sprints 3–4: High-fidelity components, typography tokens, and design sign-off.;Code Handoff · Launch: Storybook components, React code review, and QA alignment.',
    faqs: [
      { q: 'Do you deliver Figma files or code?', a: 'Both. We deliver comprehensive Figma files with auto-layout and design variables, along with ready-to-use production React/Tailwind component tokens.' },
      { q: 'Can you redesign our existing application without disrupting users?', a: 'Yes. We build design systems incrementally, allowing teams to roll out modern UI updates page-by-page without risky all-at-once migrations.' },
    ],
  },
  'custom-ecommerce': {
    slug: 'custom-ecommerce',
    title: 'Digital Commerce',
    eyebrow: '(06) Capability · High-Conversion Commerce',
    heroTitle: 'Digital Commerce|*Built for conversion & speed.*',
    lead: 'Headless storefronts, custom Shopify Plus liquid engineering, and bespoke checkout funnels architected to eliminate cart abandonment and handle peak traffic.',
    price: 'From $3,200',
    kpi: '< 1s',
    kpiLabel: 'Checkout & Storefront Load Speed',
    techStack: ['Shopify Plus', 'Next.js Commerce', 'Tailwind CSS', 'Stripe', 'Razorpay', 'GraphQL', 'Algolia'],
    deliverables: [
      {
        title: 'Headless Next.js Storefronts',
        desc: 'Sub-second page navigation and instant category filtering powered by Next.js and CDN edge caching.',
        icon: '🛍️',
      },
      {
        title: '1-Click Express Checkout',
        desc: 'Streamlined checkout flows with Apple Pay, Google Pay, and UPI express integrations.',
        icon: '⚡',
      },
      {
        title: 'Automated Inventory & ERP Sync',
        desc: 'Real-time multi-warehouse stock synchronization, courier API dispatch, and automated tracking.',
        icon: '📦',
      },
      {
        title: 'High-Concurrency Flash Sales',
        desc: 'Redis-cached catalog architectures built to withstand 10,000+ simultaneous checkout requests.',
        icon: '🔥',
      },
      {
        title: 'Cart Abandonment Recovery',
        desc: 'Automated recovery flows via WhatsApp and email recovering up to 25% of uncompleted carts.',
        icon: '🛒',
      },
      {
        title: 'Multi-Currency & Regional Tax',
        desc: 'Dynamic local currency conversion, GST / VAT compliance, and international shipping calculation.',
        icon: '🌍',
      },
    ],
    caseStudy: {
      title: 'Direct spice distribution & wholesale ordering portal',
      client: 'Vishal Masala',
      desc: 'Catalog showcase and multi-tier wholesale pricing engine tailored for regional spice distributors and retail consumers.',
      link: '/work',
      metric: '86%',
      metricLabel: 'Wholesale reorder rate increase',
      img: '/images/work/vishal_masala_studio.webp',
    },
    funnelSteps: 'E-Commerce Scoping · Sprint 1: Catalog schema, payment gateway compliance, and checkout flow design.;Storefront UX · Sprint 2: High-converting product detail pages (PDP) and checkout prototypes.;Platform Build · Sprints 3–4: Custom theme/storefront engineering, inventory sync, and gateway integration.;Launch & Flash-Sale Testing · Launch: Payment sandbox verification, load testing, and production go-live.',
    faqs: [
      { q: 'Should we build with Shopify or custom headless commerce?', a: 'For standard retail stores, a customized Shopify Plus theme offers unbeatable reliability and app ecosystems. For businesses with complex wholesale tiers or unique configurators, headless Next.js delivers absolute flexibility.' },
      { q: 'How do you handle sudden flash sale traffic spikes?', a: 'We cache product catalog and collection pages on global edge CDNs, ensuring database servers only process transactional checkout requests.' },
    ],
  },
};

// Aliases for SEO / legacy routes
SERVICES_REGISTRY['desktop-development'] = {
  ...SERVICES_REGISTRY['custom-software'],
  slug: 'desktop-development',
  title: 'Desktop Development',
  heroTitle: 'Desktop Applications|*Built for performance.*',
  lead: 'Cross-platform desktop software built with Tauri and Electron. Native hardware integrations, offline SQLite storage, and automated multi-OS updates.',
};

SERVICES_REGISTRY['shopify-development'] = {
  ...SERVICES_REGISTRY['custom-ecommerce'],
  slug: 'shopify-development',
  title: 'Shopify Development',
  heroTitle: 'Shopify Plus Stores|*Built to convert.*',
  lead: 'Custom Liquid themes, private Shopify app extensions, and high-performance e-commerce experiences engineered for enterprise brands.',
};

SERVICES_REGISTRY['custom-ecommerce-development'] = SERVICES_REGISTRY['custom-ecommerce'];

SERVICES_REGISTRY['wordpress-development'] = {
  ...SERVICES_REGISTRY['web-development'],
  slug: 'wordpress-development',
  title: 'WordPress & Headless CMS',
  heroTitle: 'Enterprise WordPress|*Fast & secure.*',
  lead: 'Headless WordPress architectures, custom Gutenberg block systems, and ultra-fast Next.js frontends engineered for publishing scale.',
};

SERVICES_REGISTRY['seo'] = SERVICES_REGISTRY['web-development'];
SERVICES_REGISTRY['social-media'] = SERVICES_REGISTRY['mobile-development'];
SERVICES_REGISTRY['paid-ads'] = SERVICES_REGISTRY['ai-agents-automation'];
SERVICES_REGISTRY['content'] = SERVICES_REGISTRY['web-design'];
SERVICES_REGISTRY['branding'] = SERVICES_REGISTRY['web-design'];

export default function ServiceDetailPage({ forcedSlug }: { forcedSlug?: string }) {
  const { slug: routeSlug } = useParams<{ slug: string }>();
  const activeSlug = (forcedSlug || routeSlug || 'web-development').toLowerCase().trim();
  const service = SERVICES_REGISTRY[activeSlug] || SERVICES_REGISTRY['web-development'];

  useEffect(() => {
    document.title = `${service.title} — Optenary Digital Product Studio`;
    window.scrollTo(0, 0);
  }, [service]);

  return (
    <div
      className="optenary-site"
      style={{
        background: '#EEEEE8',
        minHeight: '100vh',
        color: '#0D0E10',
        overflowX: 'clip',
      }}
    >
      <SEO
        title={`${service.title} — Optenary Digital Product Studio`}
        description={service.lead}
        keywords={`${service.title}, optenary services, web development, custom software, engineering studio, react, next.js, typescript`}
        canonicalPath={`/services/${service.slug}`}
      />
      <RwHeader active="services" ground="light" />

      <main id="main-content">
        {/* Modern Reachwise Hero */}
        <RwPageHero
          ground="light"
          object="pulse"
          eyebrow={service.eyebrow}
          title={service.heroTitle}
          lead={service.lead}
          primary="Start a Project"
          primaryLink="/contact"
          secondary="All Services"
          secondaryLink="/services"
          meta={service.techStack.slice(0, 5).join(';')}
          scrollCue="Scroll"
          chips={`⚡|${service.kpi} ${service.kpiLabel};★|100% Client Code Ownership;💰|${service.price}`}
          centerLabel="Optenary"
        />

        {/* Deliverables Section */}
        <section className="rw-sec" style={{ padding: 'clamp(64px, 8vw, 120px) 0' }}>
          <div className="rw-wrap">
            <div style={{ marginBottom: 'clamp(40px, 5vw, 64px)' }}>
              <p
                style={{
                  fontSize: 12,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: 'color-mix(in srgb, var(--rw-ink) 65%, transparent)',
                  fontWeight: 600,
                  margin: '0 0 12px 0',
                }}
              >
                (Deliverables) What We Engineer
              </p>
              <h2
                style={{
                  fontSize: 'clamp(32px, 4.2vw, 56px)',
                  letterSpacing: '-0.04em',
                  lineHeight: 1.05,
                  margin: 0,
                  fontWeight: 700,
                }}
              >
                Production standards,{' '}
                <span style={{ color: 'var(--rw-pine)', fontStyle: 'italic', fontWeight: 400 }}>
                  committed in writing.
                </span>
              </h2>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: 'clamp(20px, 2.4vw, 32px)',
              }}
            >
              {service.deliverables.map((d, i) => (
                <div
                  key={i}
                  style={{
                    background: 'color-mix(in srgb, var(--rw-cloud) 85%, var(--rw-paper))',
                    border: '1px solid color-mix(in srgb, var(--rw-ink) 8%, transparent)',
                    borderRadius: 24,
                    padding: 'clamp(28px, 3vw, 36px)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 16,
                  }}
                >
                  <span
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: '50%',
                      background: 'var(--rw-brass)',
                      display: 'grid',
                      placeItems: 'center',
                      fontSize: 20,
                    }}
                  >
                    {d.icon}
                  </span>
                  <h3
                    style={{
                      fontSize: 'clamp(20px, 1.8vw, 24px)',
                      letterSpacing: '-0.03em',
                      lineHeight: 1.2,
                      margin: 0,
                      fontWeight: 700,
                    }}
                  >
                    {d.title}
                  </h3>
                  <p
                    style={{
                      fontSize: 15,
                      lineHeight: 1.65,
                      color: 'color-mix(in srgb, var(--rw-ink) 75%, transparent)',
                      margin: 0,
                    }}
                  >
                    {d.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Tech Stack Pills */}
            <div
              style={{
                marginTop: 'clamp(48px, 6vw, 80px)',
                padding: 'clamp(24px, 3vw, 36px)',
                borderRadius: 24,
                background: 'var(--rw-night)',
                color: 'var(--rw-cloud)',
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 24,
              }}
            >
              <div>
                <p
                  style={{
                    fontSize: 12,
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color: 'var(--rw-brass)',
                    margin: '0 0 6px 0',
                    fontWeight: 600,
                  }}
                >
                  Architectural Foundation
                </p>
                <h4 style={{ fontSize: 'clamp(20px, 2vw, 26px)', margin: 0, fontWeight: 700 }}>
                  Tools & Technologies We Deploy
                </h4>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {service.techStack.map((tech, i) => (
                  <span
                    key={i}
                    style={{
                      padding: '8px 16px',
                      borderRadius: 999,
                      background: 'color-mix(in srgb, var(--rw-cloud) 12%, transparent)',
                      border: '1px solid color-mix(in srgb, var(--rw-cloud) 18%, transparent)',
                      fontSize: 13,
                      letterSpacing: '0.04em',
                      fontWeight: 600,
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Featured Case Study if available */}
        {service.caseStudy && (
          <section
            className="rw-sec"
            style={{
              padding: 'clamp(64px, 8vw, 120px) 0',
              background: 'color-mix(in srgb, var(--rw-cloud) 50%, var(--rw-paper))',
              borderTop: '1px solid color-mix(in srgb, var(--rw-ink) 8%, transparent)',
              borderBottom: '1px solid color-mix(in srgb, var(--rw-ink) 8%, transparent)',
            }}
          >
            <div className="rw-wrap">
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                  gap: 'clamp(32px, 5vw, 64px)',
                  alignItems: 'center',
                }}
              >
                <div>
                  <span
                    style={{
                      fontSize: 12,
                      letterSpacing: '0.14em',
                      textTransform: 'uppercase',
                      color: 'var(--rw-pine)',
                      fontWeight: 700,
                    }}
                  >
                    Proven Production Outcome · {service.caseStudy.client}
                  </span>
                  <h3
                    style={{
                      fontSize: 'clamp(28px, 3.2vw, 44px)',
                      letterSpacing: '-0.04em',
                      lineHeight: 1.1,
                      margin: '14px 0 18px 0',
                      fontWeight: 700,
                    }}
                  >
                    {service.caseStudy.title}
                  </h3>
                  <p
                    style={{
                      fontSize: 16,
                      lineHeight: 1.7,
                      color: 'color-mix(in srgb, var(--rw-ink) 78%, transparent)',
                      marginBottom: 24,
                    }}
                  >
                    {service.caseStudy.desc}
                  </p>

                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'baseline',
                      gap: 12,
                      padding: '12px 20px',
                      borderRadius: 16,
                      background: 'var(--rw-cloud)',
                      border: '1px solid color-mix(in srgb, var(--rw-ink) 10%, transparent)',
                      marginBottom: 28,
                    }}
                  >
                    <b style={{ fontSize: 32, letterSpacing: '-0.04em', color: 'var(--rw-ink)' }}>
                      {service.caseStudy.metric}
                    </b>
                    <span style={{ fontSize: 13, color: 'color-mix(in srgb, var(--rw-ink) 70%, transparent)' }}>
                      {service.caseStudy.metricLabel}
                    </span>
                  </div>

                  <div>
                    <Link
                      to={service.caseStudy.link}
                      className="rw-btn rw-solid"
                      style={{ textDecoration: 'none' }}
                    >
                      <span className="rw-face">
                        <span className="rw-lbl">Explore All Case Studies</span>
                      </span>
                    </Link>
                  </div>
                </div>

                <div
                  style={{
                    borderRadius: 24,
                    overflow: 'hidden',
                    boxShadow: '0 24px 60px -20px rgba(0,0,0,0.25)',
                    aspectRatio: '16/11',
                    background: 'var(--rw-night)',
                  }}
                >
                  <img
                    src={service.caseStudy.img}
                    alt={service.caseStudy.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                    }}
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Process Funnel */}
        <RwFunnel
          eyebrow="(02) The Engineering Process"
          heading={`From scoping to|*${service.title} launch*.`}
          intro={`Our battle-tested 4-stage engineering sprint methodology delivering ${service.title} on time, on budget, and fully tested.`}
          steps={service.funnelSteps}
        />

        {/* Service FAQs */}
        <RwFaq
          eyebrow="(03) Service FAQ"
          heading="Frequently asked|*questions*."
          cardTitle={`Have questions about our ${service.title} capabilities?`}
          cardBody="Schedule a direct 30-minute scoping call with an Optenary engineering lead. We review your architecture and provide an estimate with zero obligation."
          button="Book Scoping Call"
          buttonLink="/contact"
        />

        {/* Global CTA */}
        <RwCta />
      </main>

      <RwFooter wordmark="Optenary" />
    </div>
  );
}
