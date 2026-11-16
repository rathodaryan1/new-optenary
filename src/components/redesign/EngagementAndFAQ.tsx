import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, CheckCircle2, ArrowRight, ShieldCheck, HelpCircle } from 'lucide-react';

interface EngagementModel {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  bestFor: string;
  commitment: string;
  deliverables: string[];
  ctaText: string;
  popular?: boolean;
}

export const ENGAGEMENT_MODELS: EngagementModel[] = [
  {
    id: 'sprint',
    badge: 'FOCUSED SPRINT',
    title: 'Engineering Sprint',
    subtitle: 'High-velocity 2 to 4-week targeted technical sprint.',
    bestFor: 'Targeted feature releases, AI agent integrations, or sub-second performance overhauls.',
    commitment: '2 to 4 Weeks',
    deliverables: [
      'Dedicated senior product engineer',
      'Daily async updates & weekly live demo builds',
      'Full TypeScript source code & test suites',
      'Production deployment to your cloud account',
      '14 days post-sprint bug warranty'
    ],
    ctaText: 'Book an Engineering Sprint'
  },
  {
    id: 'custom-build',
    badge: 'MOST POPULAR',
    title: 'Custom Product Build',
    subtitle: 'End-to-end turnkey engineering from concept to production.',
    bestFor: 'Startups and businesses building new web platforms, SaaS products, or mobile apps from scratch.',
    commitment: '6 to 12 Weeks (Milestone-based)',
    deliverables: [
      'Comprehensive Discovery & Architecture Blueprint',
      'Complete Figma UI/UX Design System',
      'Production-grade Web, Mobile or SaaS Platform',
      'Autonomous AI Agent & Webhook Automations',
      'Razorpay / Stripe Payments & WhatsApp Integrations',
      '100% Complete IP & Repository Ownership',
      '30 days post-launch dedicated warranty'
    ],
    ctaText: 'Start a Custom Build',
    popular: true
  },
  {
    id: 'partnership',
    badge: 'CONTINUOUS PARTNERSHIP',
    title: 'Technology Retainer',
    subtitle: 'Ongoing engineering capacity and architectural guidance.',
    bestFor: 'Scaling businesses needing continuous feature iteration, telemetry monitoring, and dedicated DevOps.',
    commitment: 'Monthly Rolling Retainer',
    deliverables: [
      'Guaranteed monthly engineering hours',
      'SLA-backed priority emergency response',
      'Automated telemetry & 24/7 uptime monitoring',
      'Continuous security patches & performance tuning',
      'Fractional CTO guidance & roadmap planning'
    ],
    ctaText: 'Discuss a Tech Partnership'
  }
];

export const FAQS = [
  {
    q: 'How does Optenary differ from generic software agencies?',
    a: 'We eliminate the traditional agency bloat. When you partner with Optenary, you work directly with our founder and senior engineers who write your code. We build with clean, type-safe architectures (React, Next.js, Node.js, Python) rather than fragile website builders, guaranteeing sub-second load times and long-term scalability.'
  },
  {
    q: 'Who owns the intellectual property and codebase?',
    a: 'You do—100%. Upon milestone completion, all source code, Figma design files, database schemas, and documentation are transferred directly to your organization. We never lock you into proprietary vendor platforms.'
  },
  {
    q: 'How do you handle project milestones and transparency?',
    a: 'We operate on deterministic weekly cycles. Every week, you receive an interactive demo on a private staging URL to test real working software. You can track exact milestone progress in real time with zero unexpected surprises.'
  },
  {
    q: 'Can you integrate AI agents into our existing software stack?',
    a: 'Yes. We specialize in building autonomous AI agents and automated workflows (using OpenAI, Gemini, LangChain, and vector embeddings) that integrate seamlessly into existing PostgreSQL, MySQL, REST APIs, and WhatsApp Business channels.'
  },
  {
    q: 'What real projects has Optenary engineered?',
    a: 'Our verified deployments include Mehta Dairy (mehtadairy.com — a 1.1s e-commerce storefront processing pan-India orders), Urban Nest (an enterprise PropTech co-living SaaS platform), Vishal Masala (headless spices e-commerce), and Shree Enterprise (industrial B2B portal with automated PDF quoting).'
  },
  {
    q: 'How do we begin a project with Optenary?',
    a: 'Submit an inquiry through our intake form below or message us directly on WhatsApp at +91 9316688014. We will review your requirements, conduct a preliminary technical feasibility assessment, and deliver a detailed roadmap within 48 hours.'
  }
];

export default function EngagementAndFAQ() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenFaqIndex(openFaqIndex === idx ? null : idx);
  };

  return (
    <section className="relative py-28 px-6 md:px-12 bg-[#02050f] overflow-hidden border-t border-navy-border/50">
      {/* Background glow orbs */}
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-brand-blue/10 rounded-full blur-[170px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-brand-purple/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Section Header: Engagement Models */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-navy-card border border-navy-border text-xs font-mono text-brand-cyan uppercase tracking-wider mb-4">
            <ShieldCheck size={12} className="text-brand-blue" />
            <span>(07) ENGAGEMENT MODELS & TRANSPARENT COLLABORATION</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Predictable models designed for{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue via-brand-cyan to-brand-purple">
              sustainable velocity.
            </span>
          </h2>
          <p className="mt-4 text-base text-navy-muted leading-relaxed">
            Choose the engagement model tailored to your product stage. All engagements feature milestone-based transparency and 100% IP ownership.
          </p>
        </div>

        {/* 3 Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-28">
          {ENGAGEMENT_MODELS.map((model) => (
            <div
              key={model.id}
              className={`rounded-2xl p-7 flex flex-col justify-between transition-all duration-300 relative ${
                model.popular
                  ? 'glass-panel-elevated border-brand-cyan/50 shadow-glow-cyan'
                  : 'glass-panel border-navy-border/70 hover:border-navy-border'
              }`}
            >
              {model.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-gradient-to-r from-brand-blue to-brand-cyan text-[10px] font-mono font-bold text-white uppercase tracking-wider shadow-md">
                  RECOMMENDED FOR NEW BUILDS
                </div>
              )}

              <div>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-[10px] font-mono font-bold text-brand-cyan uppercase tracking-widest">
                    {model.badge}
                  </span>
                  <span className="text-xs font-mono text-navy-muted">{model.commitment}</span>
                </div>

                <h3 className="text-2xl font-bold text-white mb-2">{model.title}</h3>
                <p className="text-xs text-navy-muted leading-relaxed mb-4">{model.subtitle}</p>

                <div className="p-3 rounded-xl bg-navy-base/80 border border-navy-border/60 text-xs font-mono text-slate-300 mb-6">
                  <span className="text-brand-blue font-bold block mb-1">Best suited for:</span>
                  <span>{model.bestFor}</span>
                </div>

                <div className="space-y-2.5 mb-8">
                  <span className="text-[11px] font-mono text-navy-muted uppercase tracking-wider block font-bold">
                    Included Capabilities
                  </span>
                  {model.deliverables.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs font-mono text-slate-300">
                      <CheckCircle2 size={13} className="text-brand-cyan shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <a
                href="#contact"
                className={`w-full py-3.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                  model.popular
                    ? 'bg-gradient-to-r from-brand-blue to-brand-cyan hover:from-blue-600 hover:to-cyan-500 text-white shadow-glow-blue'
                    : 'bg-navy-card hover:bg-navy-cardHover text-white border border-navy-border hover:border-brand-blue/40'
                }`}
              >
                <span>{model.ctaText}</span>
                <ArrowRight size={13} />
              </a>
            </div>
          ))}
        </div>

        {/* Section Header: FAQ */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-navy-card border border-navy-border text-xs font-mono text-brand-purple uppercase tracking-wider mb-4">
            <HelpCircle size={12} className="text-brand-purple" />
            <span>FREQUENTLY ANSWERED QUESTIONS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Clear answers before we write a single line of code.
          </h2>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-4xl mx-auto space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;

            return (
              <div
                key={idx}
                className="rounded-xl border border-navy-border/70 bg-navy-card/50 overflow-hidden transition-colors hover:border-brand-blue/30"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full text-left p-5 flex items-center justify-between gap-4"
                >
                  <span className="font-bold text-sm sm:text-base text-white">
                    {faq.q}
                  </span>
                  <ChevronDown
                    size={16}
                    className={`text-brand-cyan transition-transform duration-300 shrink-0 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div className="p-5 pt-0 text-xs sm:text-sm text-navy-muted leading-relaxed font-sans border-t border-navy-border/30">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
