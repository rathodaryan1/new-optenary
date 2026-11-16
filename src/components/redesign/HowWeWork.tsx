import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, Lightbulb, PenTool, Code2, ShieldAlert, Rocket, CheckCircle2, ArrowRight } from 'lucide-react';

interface ProcessStep {
  number: string;
  id: string;
  title: string;
  icon: any;
  duration: string;
  description: string;
  deliverables: string[];
  clientRole: string;
  engineeringFocus: string;
}

export const WORK_STEPS: ProcessStep[] = [
  {
    number: '01',
    id: 'discover',
    title: 'Discover',
    icon: Compass,
    duration: 'Week 1',
    description: 'We initiate every engagement with deep discovery: dissecting business objectives, user journeys, technical constraints, and competitive differentiators.',
    deliverables: [
      'Technical Scope & Product Blueprint',
      'System Architecture Feasibility Matrix',
      'User Personas & Core Journeys',
      'Security & Compliance Requirements'
    ],
    clientRole: 'Share vision, existing workflows, and core operational pain points.',
    engineeringFocus: 'Deconstruct complexity into actionable architectural modules.'
  },
  {
    number: '02',
    id: 'strategy',
    title: 'Strategy',
    icon: Lightbulb,
    duration: 'Week 1-2',
    description: 'We map out the exact technology stack, database schemas, API interfaces, and deployment timelines to ensure optimal scalability from day one.',
    deliverables: [
      'Technology Stack Selection (React, Node, Cloud)',
      'Database Schema & Data Model Design',
      'Milestone Timeline & Sprint Roadmap',
      'Third-party Integration Specs (Payments, WhatsApp, AI)'
    ],
    clientRole: 'Review and approve milestones, dependencies, and integration scope.',
    engineeringFocus: 'Establish resilient, future-proof foundations with zero technical debt.'
  },
  {
    number: '03',
    id: 'design',
    title: 'Design',
    icon: PenTool,
    duration: 'Week 2-3',
    description: 'Our design team creates bespoke, high-conversion visual design systems and interactive prototypes in Figma, refining typography, dark-mode tones, and micro-interactions.',
    deliverables: [
      'Complete Figma Interactive Prototype',
      'Modular Design System & Color Tokens',
      'Responsive Mobile & Tablet Viewports',
      'Interaction Specs & Motion Guidelines'
    ],
    clientRole: 'Provide feedback on interactive click-through prototypes.',
    engineeringFocus: 'Ensure pixel-level feasibility and WCAG 2.1 accessibility.'
  },
  {
    number: '04',
    id: 'engineering',
    title: 'Engineering',
    icon: Code2,
    duration: 'Week 3-6',
    description: 'We write clean, modular, production-ready code. Frontend components and backend cloud services are constructed concurrently with weekly testable builds.',
    deliverables: [
      'Bespoke Frontend (React / Vite / Next.js / Mobile)',
      'Secure REST & GraphQL APIs (Node.js / Python)',
      'Autonomous AI Agent & Webhook Workflows',
      'Staging Environment with Live Preview Builds'
    ],
    clientRole: 'Test bi-weekly feature releases on private staging URLs.',
    engineeringFocus: 'Maintain sub-second page performance, strict type safety, and clean code.'
  },
  {
    number: '05',
    id: 'testing',
    title: 'Testing',
    icon: ShieldAlert,
    duration: 'Week 6-7',
    description: 'Rigorous cross-device testing, edge-case validation, automated stress tests, and security audits to guarantee flawless stability prior to public release.',
    deliverables: [
      'Cross-Device & Cross-Browser Audit Report',
      'Core Web Vitals & Latency Benchmarks (Target <1.2s)',
      'Payment Gateway & Webhook Reconciliation Tests',
      'Security Vulnerability & Penetration Scans'
    ],
    clientRole: 'Final User Acceptance Testing (UAT) sign-off.',
    engineeringFocus: 'Eliminate all latency bottlenecks, memory leaks, and edge-case errors.'
  },
  {
    number: '06',
    id: 'launch',
    title: 'Launch & Scale',
    icon: Rocket,
    duration: 'Week 7+',
    description: 'We orchestrate zero-downtime deployment to production infrastructure, configure CDN edge caches, initialize real-time telemetry, and provide continuous scaling.',
    deliverables: [
      'Production DNS & CDN Edge Routing',
      'Real-Time Telemetry & Error Tracking Setup',
      'Comprehensive Codebase & Documentation Handoff',
      'Post-Launch Evolution & SLA Support Agreement'
    ],
    clientRole: 'Celebrate launch and watch users interact with your new product.',
    engineeringFocus: 'Continuous monitoring, sub-second response times, and ongoing optimization.'
  }
];

export default function HowWeWork() {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const activeStep = WORK_STEPS[activeStepIndex];

  return (
    <section id="process" className="relative py-28 px-6 md:px-12 bg-[#030612] overflow-hidden border-t border-navy-border/50">
      {/* Background glow orbs */}
      <div className="absolute top-1/2 left-0 w-[550px] h-[550px] bg-brand-blue/10 rounded-full blur-[170px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-brand-purple/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-navy-card border border-navy-border text-xs font-mono text-brand-cyan uppercase tracking-wider mb-4">
            <Rocket size={12} className="text-brand-cyan" />
            <span>(03) THE ENGINEERING LIFECYCLE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
            How we take ambitious concepts to{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue via-brand-cyan to-brand-purple">
              production-grade reality.
            </span>
          </h2>
          <p className="mt-4 text-base text-navy-muted leading-relaxed">
            A disciplined, transparent 6-stage lifecycle engineered for predictability, craftsmanship, and speed.
          </p>
        </div>

        {/* Step Navigation Pill Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-10">
          {WORK_STEPS.map((step, idx) => {
            const isActive = idx === activeStepIndex;
            const Icon = step.icon;

            return (
              <button
                key={step.id}
                onClick={() => setActiveStepIndex(idx)}
                className={`p-3.5 rounded-xl border text-left transition-all flex flex-col justify-between ${
                  isActive
                    ? 'bg-navy-cardHover border-brand-cyan/60 shadow-glow-cyan'
                    : 'bg-navy-card/60 hover:bg-navy-card border-navy-border/60 text-navy-muted hover:text-white'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-[11px] font-mono font-bold ${isActive ? 'text-brand-cyan' : 'text-navy-muted'}`}>
                    STAGE {step.number}
                  </span>
                  <Icon size={16} className={isActive ? 'text-brand-cyan' : 'text-navy-muted'} />
                </div>
                <div className={`font-bold text-sm ${isActive ? 'text-white' : 'text-slate-300'}`}>
                  {step.title}
                </div>
                <div className="text-[10px] font-mono text-navy-muted mt-1">
                  {step.duration}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Stage Blueprint Card */}
        <div className="glass-panel-elevated rounded-2xl p-6 sm:p-10 border border-brand-blue/30 relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
            >
              {/* Left Column: Stage Narrative (7 cols) */}
              <div className="lg:col-span-7 space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-navy-base border border-navy-border flex items-center justify-center text-brand-cyan shadow-glow-cyan">
                    {activeStep.icon && <activeStep.icon size={24} />}
                  </div>
                  <div>
                    <span className="text-xs font-mono text-brand-cyan uppercase tracking-wider block">
                      STAGE {activeStep.number} // {activeStep.duration}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                      {activeStep.title} Phase
                    </h3>
                  </div>
                </div>

                <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans">
                  {activeStep.description}
                </p>

                {/* Deliverables List */}
                <div className="p-5 rounded-xl bg-navy-card/80 border border-navy-border/80">
                  <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider mb-3 flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-brand-cyan" />
                    <span>Key Stage Deliverables</span>
                  </h4>
                  <ul className="space-y-2">
                    {activeStep.deliverables.map((item, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs text-navy-muted font-mono">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-blue shrink-0 mt-1.5" />
                        <span className="text-slate-300">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Right Column: Roles & Engineering Focus (5 cols) */}
              <div className="lg:col-span-5 space-y-4">
                <div className="p-5 rounded-xl bg-navy-card border border-navy-border">
                  <span className="text-[11px] font-mono text-brand-blue uppercase font-bold block mb-1">
                    Your Collaboration Role
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {activeStep.clientRole}
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-navy-card border border-navy-border">
                  <span className="text-[11px] font-mono text-brand-purple uppercase font-bold block mb-1">
                    Engineering Priority
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {activeStep.engineeringFocus}
                  </p>
                </div>

                <div className="pt-4 flex items-center justify-between">
                  <button
                    disabled={activeStepIndex === 0}
                    onClick={() => setActiveStepIndex(prev => Math.max(0, prev - 1))}
                    className="px-4 py-2 rounded-lg bg-navy-card border border-navy-border text-xs font-mono text-navy-muted hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  >
                    ← Previous Stage
                  </button>
                  <button
                    disabled={activeStepIndex === WORK_STEPS.length - 1}
                    onClick={() => setActiveStepIndex(prev => Math.min(WORK_STEPS.length - 1, prev + 1))}
                    className="px-4 py-2 rounded-lg bg-brand-blue hover:bg-blue-600 text-xs font-mono text-white disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-glow-blue flex items-center gap-1.5"
                  >
                    <span>Next Stage</span>
                    <ArrowRight size={12} />
                  </button>
                </div>
              </div>

            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}

