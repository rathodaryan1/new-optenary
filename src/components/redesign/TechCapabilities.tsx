import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Globe,
  Smartphone,
  Database,
  Bot,
  Zap,
  Cpu,
  ArrowRight,
  Server
} from 'lucide-react';

interface TechDomain {
  id: string;
  name: string;
  icon: any;
  title: string;
  summary: string;
  diagramTitle: string;
  pipeline: { step: string; detail: string; tech: string }[];
  stack: string[];
  benchmarks: { label: string; value: string }[];
}

export const TECH_DOMAINS: TechDomain[] = [
  {
    id: 'web',
    name: 'Web Applications',
    icon: Globe,
    title: 'Edge-Rendered & Sub-Second Web Platforms',
    summary: 'Engineered with React, Next.js, and Vite for lightning-quick client loads, deterministic state hydration, and zero layout shift.',
    diagramTitle: 'Edge Delivery & Hydration Pipeline',
    pipeline: [
      { step: 'Edge Request', detail: 'DNS routed to closest CDN node with SSL handshake', tech: 'Cloudflare / Vercel Edge' },
      { step: 'Static Cache / SSR', detail: 'Instant sub-second HTML delivery with preloaded LCP assets', tech: 'Next.js / Vite Static Engine' },
      { step: 'State Hydration', detail: 'Lightweight React tree hydration with code splitting', tech: 'React 19 / TypeScript' },
      { step: 'API Synchronization', detail: 'Optimistic UI updates via cached background fetch', tech: 'REST & GraphQL' }
    ],
    stack: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Vite', 'Node.js', 'Vercel Edge'],
    benchmarks: [
      { label: 'Time to First Byte', value: '<80ms' },
      { label: 'Lighthouse Performance', value: '98/100' },
      { label: 'Core Web Vitals', value: 'Pass' }
    ]
  },
  {
    id: 'mobile',
    name: 'Mobile Applications',
    icon: Smartphone,
    title: 'Native-Speed iOS & Android Ecosystems',
    summary: 'Crafted with React Native and Flutter, combining cross-platform code efficiency with 60-120fps native performance.',
    diagramTitle: 'Cross-Platform Native Bridge Pipeline',
    pipeline: [
      { step: 'UI Layer', detail: 'Declarative component hierarchy with fluid 60fps gesture physics', tech: 'React Native / Flutter' },
      { step: 'Local Storage', detail: 'Offline-first SQLite / MMKV encrypted local database', tech: 'MMKV / WatermelonDB' },
      { step: 'Native Bridge', detail: 'Hardware sensors, biometrics, camera and push tokens', tech: 'Swift / Kotlin Native Modules' },
      { step: 'Cloud Sync', detail: 'Background delta sync when network connectivity is detected', tech: 'WebSocket / REST' }
    ],
    stack: ['React Native', 'Flutter', 'TypeScript', 'Firebase', 'Redux', 'Fastlane'],
    benchmarks: [
      { label: 'Frame Rate', value: '60-120 FPS' },
      { label: 'App Launch', value: '<1.1s' },
      { label: 'Offline Support', value: '100% Core' }
    ]
  },
  {
    id: 'saas',
    name: 'SaaS Platforms',
    icon: Database,
    title: 'Multi-Tenant Cloud Architectures',
    summary: 'Engineered for high concurrency, isolated tenant databases, automated subscription billing, and enterprise role-based security.',
    diagramTitle: 'Multi-Tenant Isolated Data Architecture',
    pipeline: [
      { step: 'Tenant Gateway', detail: 'Subdomain or custom domain routing with tenancy identification', tech: 'NGINX / Cloudflare' },
      { step: 'Auth & RBAC', detail: 'JWT session tokens with granular permissions and MFA', tech: 'OAuth2 / Argon2' },
      { step: 'Isolated Queries', detail: 'Row-level security (RLS) ensuring strict tenant isolation', tech: 'PostgreSQL / Prisma' },
      { step: 'Billing Automation', detail: 'Stripe & Razorpay webhooks sync with subscription state', tech: 'Webhooks & BullMQ' }
    ],
    stack: ['Node.js', 'PostgreSQL', 'Redis', 'Docker', 'Prisma', 'BullMQ', 'AWS'],
    benchmarks: [
      { label: 'Tenant Isolation', value: 'Strict RLS' },
      { label: 'API Latency', value: '<120ms' },
      { label: 'Uptime SLA', value: '99.9%' }
    ]
  },
  {
    id: 'ai',
    name: 'AI Solutions',
    icon: Bot,
    title: 'Autonomous Multi-Agent & RAG Systems',
    summary: 'Bridging generative AI with real operational data: custom multi-agent task execution, vector knowledge retrieval, and autonomous chat assistants.',
    diagramTitle: 'Autonomous Agent & Vector Retrieval Loop',
    pipeline: [
      { step: 'User / System Trigger', detail: 'Natural language instruction, document upload or webhook ping', tech: 'API Gateway / WhatsApp' },
      { step: 'Vector Retrieval', detail: 'Semantic similarity search across indexed organizational documents', tech: 'Pinecone / pgvector' },
      { step: 'Model Reasoning', detail: 'Context-injected prompt synthesis with strict guardrails', tech: 'OpenAI / Gemini APIs' },
      { step: 'Tool Execution', detail: 'Agent calls internal APIs, updates CRM, or sends WhatsApp alert', tech: 'LangChain & Function Calling' }
    ],
    stack: ['OpenAI API', 'Gemini Live', 'LangChain', 'Pinecone', 'Python', 'FastAPI'],
    benchmarks: [
      { label: 'Vector Retrieval', value: '<95ms' },
      { label: 'Hallucination Guard', value: 'Context-Locked' },
      { label: 'Agent Availability', value: '24/7/365' }
    ]
  },
  {
    id: 'automation',
    name: 'Business Automation',
    icon: Zap,
    title: 'Headless Integration & Data Pipelines',
    summary: 'Connecting fragmented software systems into synchronized, autonomous workflows that eliminate manual human re-entry.',
    diagramTitle: 'Event-Driven Real-Time Automation Pipeline',
    pipeline: [
      { step: 'Event Ingestion', detail: 'Receives webhook events from forms, checkouts, or ERPs', tech: 'Webhook Listeners' },
      { step: 'Transform & Validate', detail: 'Sanitizes payload, enforces schemas, and logs telemetry', tech: 'Zod & Node.js' },
      { step: 'Message Queue', detail: 'Buffers workload with exponential backoff retry mechanisms', tech: 'Redis / BullMQ' },
      { step: 'Target Dispatch', detail: 'Updates ERP, sends customer WhatsApp message, drafts invoice', tech: 'WhatsApp API / Stripe' }
    ],
    stack: ['Node.js', 'Redis', 'BullMQ', 'WhatsApp Business API', 'Webhooks', 'Docker'],
    benchmarks: [
      { label: 'Trigger to Dispatch', value: '<600ms' },
      { label: 'Failed Retry Rate', value: 'Automated 5x' },
      { label: 'Manual Time Saved', value: '70-90%' }
    ]
  },
  {
    id: 'custom',
    name: 'Custom Software',
    icon: Cpu,
    title: 'Specialized High-Performance Engines',
    summary: 'From custom estimation engines and PDF generators to local POS and desktop tools, built exactly to specification.',
    diagramTitle: 'Deterministic Calculation & Output Pipeline',
    pipeline: [
      { step: 'Parameter Input', detail: 'Dynamic engineering inputs, specifications or floor metrics', tech: 'Reactive Input Matrix' },
      { step: 'Calculation Engine', detail: 'Mathematical algorithm calculates material costs & tolerances', tech: 'C++ / TypeScript Engine' },
      { step: 'Document Rendering', detail: 'Generates branded compliance reports and itemized PDFs', tech: 'PDFKit / Headless Chromium' },
      { step: 'Secure Dispatch', detail: 'Delivers to client via encrypted link and logs to audit vault', tech: 'S3 Presigned URLs' }
    ],
    stack: ['TypeScript', 'Node.js', 'PDFKit', 'Electron', 'PostgreSQL', 'Tauri'],
    benchmarks: [
      { label: 'Computation Time', value: '<250ms' },
      { label: 'PDF Generation', value: '<1.2s' },
      { label: 'Deterministic Output', value: '100% Match' }
    ]
  }
];

export default function TechCapabilities() {
  const [activeDomainId, setActiveDomainId] = useState('web');
  const activeDomain = TECH_DOMAINS.find(d => d.id === activeDomainId) || TECH_DOMAINS[0];

  return (
    <section id="capabilities" className="relative py-28 px-6 md:px-12 bg-[#02050f] overflow-hidden border-t border-navy-border/50">
      {/* Background glow orbs */}
      <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-brand-cyan/10 rounded-full blur-[170px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-brand-blue/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-navy-card border border-navy-border text-xs font-mono text-brand-cyan uppercase tracking-wider mb-4">
            <Cpu size={12} className="text-brand-cyan" />
            <span>(04) ARCHITECTURAL CAPABILITIES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
            How we engineer software that{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue via-brand-cyan to-brand-purple">
              never breaks under pressure.
            </span>
          </h2>
          <p className="mt-4 text-base text-navy-muted leading-relaxed">
            Inspect our system pipelines, architectural patterns, and verified technology stacks across all digital disciplines.
          </p>
        </div>

        {/* Domain Navigation Pills */}
        <div className="flex flex-wrap gap-2.5 mb-10 pb-4 border-b border-navy-border/60">
          {TECH_DOMAINS.map(domain => {
            const isActive = domain.id === activeDomainId;
            const Icon = domain.icon;

            return (
              <button
                key={domain.id}
                onClick={() => setActiveDomainId(domain.id)}
                className={`px-4 py-2.5 rounded-xl text-xs font-mono font-medium flex items-center gap-2 transition-all ${
                  isActive
                    ? 'bg-brand-blue text-white shadow-glow-blue'
                    : 'bg-navy-card/70 hover:bg-navy-card border border-navy-border/60 text-navy-muted hover:text-white'
                }`}
              >
                <Icon size={14} className={isActive ? 'text-brand-cyan' : 'text-navy-muted'} />
                <span>{domain.name}</span>
              </button>
            );
          })}
        </div>

        {/* Architecture Blueprint Display */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeDomain.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="glass-panel-elevated rounded-2xl p-6 sm:p-10 border border-brand-blue/30"
          >
            {/* Blueprint Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 mb-8 border-b border-navy-border/70">
              <div>
                <span className="text-xs font-mono text-brand-cyan uppercase tracking-wider block mb-1">
                  ARCHITECTURE BLUEPRINT // {activeDomain.name}
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                  {activeDomain.title}
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-navy-muted max-w-md">
                {activeDomain.summary}
              </p>
            </div>

            {/* Visual Pipeline Flow Diagram */}
            <div className="mb-10">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono uppercase tracking-wider text-white font-bold flex items-center gap-2">
                  <Server size={14} className="text-brand-cyan" />
                  <span>{activeDomain.diagramTitle}</span>
                </span>
                <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Deterministic Execution
                </span>
              </div>

              {/* Step Flow Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {activeDomain.pipeline.map((p, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-navy-card/90 border border-navy-border/80 flex flex-col justify-between relative group hover:border-brand-blue/50 transition-colors"
                  >
                    <div className="mb-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[11px] font-mono font-bold text-brand-cyan">
                          STEP 0{idx + 1}
                        </span>
                        {idx < activeDomain.pipeline.length - 1 && (
                          <ArrowRight size={12} className="text-navy-muted hidden lg:inline" />
                        )}
                      </div>
                      <h4 className="text-sm font-bold text-white mb-1.5">{p.step}</h4>
                      <p className="text-xs text-navy-muted leading-relaxed">{p.detail}</p>
                    </div>

                    <div className="pt-3 border-t border-navy-border/50 text-[10px] font-mono text-brand-blue truncate">
                      {p.tech}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Stack & Benchmarks Footer */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-6 border-t border-navy-border/60">
              
              {/* Stack Pills (7 cols) */}
              <div className="md:col-span-7">
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white mb-3">
                  Core Technologies & Libraries
                </h4>
                <div className="flex flex-wrap gap-2">
                  {activeDomain.stack.map(tech => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-lg bg-navy-card border border-navy-border text-xs font-mono text-brand-cyan"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Benchmarks (5 cols) */}
              <div className="md:col-span-5">
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white mb-3">
                  Production SLA Benchmarks
                </h4>
                <div className="grid grid-cols-3 gap-2">
                  {activeDomain.benchmarks.map((b, i) => (
                    <div key={i} className="p-2.5 rounded-lg bg-navy-card border border-navy-border text-center">
                      <div className="text-sm font-mono font-bold text-white">{b.value}</div>
                      <div className="text-[10px] text-navy-muted font-mono truncate">{b.label}</div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}
