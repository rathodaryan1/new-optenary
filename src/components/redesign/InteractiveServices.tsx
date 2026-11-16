import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Globe,
  Smartphone,
  Bot,
  Database,
  ShoppingCart,
  Palette,
  Monitor,
  Gamepad2,
  ArrowRight,
  CheckCircle2,
  Cpu,
  Layers,
  Sparkles
} from 'lucide-react';
import { Link } from 'react-router-dom';

export interface ServiceDetail {
  id: string;
  number: string;
  title: string;
  shortTag: string;
  icon: any;
  headline: string;
  description: string;
  capabilities: string[];
  technologies: string[];
  relatedProjects: { name: string; link: string; category: string }[];
  route: string;
  visualType: 'web' | 'mobile' | 'ai' | 'saas' | 'ecommerce' | 'uiux' | 'desktop' | 'game';
}

export const SERVICES_DATA: ServiceDetail[] = [
  {
    id: 'web-dev',
    number: '01',
    title: 'Web Development',
    shortTag: 'High-Performance Frontends & Edge Architectures',
    icon: Globe,
    headline: 'Sub-second, bespoke web platforms engineered without template bloat.',
    description: 'We architect ultra-responsive, accessible, and SEO-dominant web applications tailored specifically for modern businesses. From interactive landing experiences to complex multi-page enterprise hubs, every line of code is structured for peak performance and Core Web Vitals.',
    capabilities: [
      'Custom React, Next.js & Vite SPAs / PWAs',
      'SSR & Edge-Rendered Dynamic Web Platforms',
      'Headless CMS & Decoupled Frontend Frameworks',
      'Micro-Interactions, 60fps Motion & Framer Motion',
      'Core Web Vitals Perfection & 100% SEO Accessibility'
    ],
    technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Vite', 'Node.js', 'Vercel / AWS'],
    relatedProjects: [
      { name: 'Mehta Dairy', link: '/projects/mehta-dairy', category: 'High-speed Storefront' },
      { name: 'Shree Enterprise', link: 'https://shreeenterprisebhavnagar.com', category: 'Corporate B2B Portal' }
    ],
    route: '/services/web-development',
    visualType: 'web'
  },
  {
    id: 'mobile-dev',
    number: '02',
    title: 'Mobile App Development',
    shortTag: 'Native iOS & Android Engineering',
    icon: Smartphone,
    headline: 'Native-feel iOS and Android applications with intuitive UX.',
    description: 'We develop native and cross-platform mobile solutions delivering fluid 60-120fps interactions, offline capabilities, secure biometrics, and push notifications. Built to scale from day one on both App Store and Google Play.',
    capabilities: [
      'Cross-Platform React Native & Flutter Apps',
      'Native iOS (Swift) & Android (Kotlin) Integrations',
      'Offline-First Local Storage & Sync Engines',
      'Biometric Security & Hardware Sensor APIs',
      'App Store Submission & Automated CI/CD Pipelines'
    ],
    technologies: ['React Native', 'Flutter', 'TypeScript', 'Firebase', 'Redux Toolkit', 'Fastlane'],
    relatedProjects: [
      { name: 'Urban Nest Resident App', link: 'https://urbannest1.vercel.app', category: 'Tenant Co-Living' }
    ],
    route: '/services/mobile-development',
    visualType: 'mobile'
  },
  {
    id: 'ai-agents',
    number: '03',
    title: 'AI Agents & Automation',
    shortTag: 'Autonomous Workflows & LLM Orchestration',
    icon: Bot,
    headline: 'Autonomous AI agents that execute complex business workflows 24/7.',
    description: 'Bridge the gap between AI hype and real operational leverage. We engineer custom autonomous AI agents, retrieval-augmented generation (RAG) knowledge systems, conversational WhatsApp assistants, and automated multi-step pipelines.',
    capabilities: [
      'Autonomous Multi-Agent Task Orchestration',
      'RAG Pipelines over Proprietary Enterprise Data',
      'WhatsApp Business API AI Assistants & Chatbots',
      'Automated Document Ingestion & Lead Scoring',
      'Custom LLM Fine-Tuning & Prompt Architecture'
    ],
    technologies: ['OpenAI API', 'Gemini Live / Decisions API', 'LangChain', 'Python', 'Vector DBs (Pinecone)', 'WhatsApp API'],
    relatedProjects: [
      { name: 'Mehta Dairy WhatsApp Bot', link: '/projects/mehta-dairy', category: 'Instant Order Assistant' }
    ],
    route: '/services/ai-agents-automation',
    visualType: 'ai'
  },
  {
    id: 'custom-software',
    number: '04',
    title: 'Custom Software & SaaS',
    shortTag: 'Enterprise Scalable Cloud Systems',
    icon: Database,
    headline: 'Scalable multi-tenant cloud platforms that automate entire operations.',
    description: 'Replace fragmented spreadsheets and disjointed tools with bespoke cloud platforms designed precisely around your operational blueprint. Featuring multi-tenant databases, role-based security, automated billing, and audit logs.',
    capabilities: [
      'Multi-Tenant SaaS Architecture & Subdomains',
      'Role-Based Access Control (RBAC) & OAuth2',
      'Automated Invoicing & Stripe / Razorpay Webhooks',
      'Interactive Visual Dashboards & Real-Time Telemetry',
      'High-Throughput PostgreSQL & Redis Cache Clusters'
    ],
    technologies: ['Node.js', 'PostgreSQL', 'Redis', 'Docker', 'Prisma', 'REST / GraphQL', 'AWS / DigitalOcean'],
    relatedProjects: [
      { name: 'Urban Nest', link: 'https://urbannest1.vercel.app', category: 'PropTech SaaS Engine' },
      { name: 'Shree Enterprise Quoting', link: 'https://shreeenterprisebhavnagar.com', category: 'Automated Estimation' }
    ],
    route: '/services/custom-software',
    visualType: 'saas'
  },
  {
    id: 'ecommerce',
    number: '05',
    title: 'E-commerce Development',
    shortTag: 'Headless & High-Converting Commerce',
    icon: ShoppingCart,
    headline: 'High-speed, conversion-focused storefronts built for scale.',
    description: 'We develop custom headless storefronts and optimized Shopify engines that convert casual browsers into repeat buyers. Engineered with sub-second page loads, frictionless one-step checkouts, and seamless payment gateways.',
    capabilities: [
      'Headless Commerce Storefronts (React / Next.js)',
      'Shopify & Shopify Plus Custom Theme & App Builds',
      'Custom Weight-based & Bulk Tier Pricing Engines',
      'UPI, Razorpay, Stripe & Cashfree Integrations',
      'Automated WhatsApp Order & Tracking Dispatch'
    ],
    technologies: ['React', 'Shopify Liquid', 'Storefront API', 'Razorpay', 'Stripe', 'Node.js', 'Tailwind CSS'],
    relatedProjects: [
      { name: 'Mehta Dairy Storefront', link: '/projects/mehta-dairy', category: '1.1s D2C Confectionery' },
      { name: 'Vishal Masala', link: 'https://vishalmasala.vercel.app', category: 'Headless Spices Platform' }
    ],
    route: '/services/custom-ecommerce-development',
    visualType: 'ecommerce'
  },
  {
    id: 'uiux-design',
    number: '06',
    title: 'UI/UX & Product Design',
    shortTag: 'Design Systems & Interactive Prototypes',
    icon: Palette,
    headline: 'Intuitive, conversion-driven interfaces crafted with surgical precision.',
    description: 'We craft digital product experiences that feel effortless to navigate. From user research and interactive Figma wireframes to full component design systems with dark mode, fluid typography, and responsive micro-interactions.',
    capabilities: [
      'End-to-End Product Design Systems in Figma',
      'Interactive Prototyping & User Flow Mapping',
      'Dark Mode Aesthetics & Fluid Typography Scales',
      'Accessibility Audits & WCAG 2.1 Compliance',
      'Seamless Developer Handoff with React Storybooks'
    ],
    technologies: ['Figma', 'FigJam', 'Tokens Studio', 'Framer', 'Tailwind CSS', 'Radix UI'],
    relatedProjects: [
      { name: 'Urban Nest SaaS Interface', link: 'https://urbannest1.vercel.app', category: 'Hostel Command Center' },
      { name: 'Laalo Experience', link: 'https://laalo-movie.vercel.app', category: 'Theatrical Design' }
    ],
    route: '/services/web-development',
    visualType: 'uiux'
  },
  {
    id: 'desktop-dev',
    number: '07',
    title: 'Desktop Applications',
    shortTag: 'Cross-Platform Windows & macOS Apps',
    icon: Monitor,
    headline: 'Native performance for desktop computing without platform friction.',
    description: 'When web browsers cannot fulfill hardware-intensive or offline requirements, we construct robust cross-platform desktop applications using Electron and Tauri. Complete with local hardware access, auto-updaters, and system tray integration.',
    capabilities: [
      'Cross-Platform Desktop Apps for Windows & macOS',
      'Tauri & Rust Lightweight Native Binaries',
      'Electron High-Fidelity UI Applications',
      'Local Hardware, POS & Serial Port Integration',
      'Automated Background Updates & Code Signing'
    ],
    technologies: ['Electron', 'Tauri', 'Rust', 'React', 'Node.js', 'C++ / Native Addons'],
    relatedProjects: [
      { name: 'Offline POS & Invoicing Systems', link: '#contact', category: 'Retail Management' }
    ],
    route: '/services/desktop-development',
    visualType: 'desktop'
  },
  {
    id: 'game-dev',
    number: '08',
    title: 'Game Development',
    shortTag: 'Interactive 2D/3D & Experiential Graphics',
    icon: Gamepad2,
    headline: 'Interactive web games, 3D product visualizers, and brand experiences.',
    description: 'Engage audiences through interactive gamified experiences, WebGL simulations, and 2D/3D game mechanics. Perfect for product configurators, experiential marketing campaigns, and browser-based entertainment.',
    capabilities: [
      'WebGL & Three.js Interactive 3D Environments',
      'Canvas & PixiJS High-Performance 2D Web Games',
      'Physics Engines & Real-Time Collision Mechanics',
      'Gamified Brand Activations & Viral Mini-Games',
      'Cross-Platform Touch & Controller Input Mapping'
    ],
    technologies: ['Three.js', 'WebGL', 'Pixi.js', 'Phaser', 'TypeScript', 'GLSL Shaders'],
    relatedProjects: [
      { name: 'Laalo Interactive Media Experience', link: 'https://laalo-movie.vercel.app', category: 'Cinematic Web Experience' }
    ],
    route: '/services/web-development',
    visualType: 'game'
  }
];

export default function InteractiveServices() {
  const [activeServiceId, setActiveServiceId] = useState<string>('web-dev');

  const activeService = SERVICES_DATA.find(s => s.id === activeServiceId) || SERVICES_DATA[0];

  return (
    <section id="services" className="relative py-28 px-6 md:px-12 bg-[#030612] overflow-hidden border-t border-navy-border/50">
      {/* Background glow orbs */}
      <div className="absolute top-1/3 right-0 w-[600px] h-[600px] bg-brand-blue/10 rounded-full blur-[170px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-brand-purple/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-navy-card border border-navy-border text-xs font-mono text-brand-cyan uppercase tracking-wider mb-4">
            <Sparkles size={12} className="text-brand-blue" />
            <span>(01) INTERACTIVE SERVICE SELECTOR</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Specialized engineering capabilities{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue via-brand-cyan to-brand-purple">
              built for ambitious ventures.
            </span>
          </h2>
          <p className="mt-4 text-base text-navy-muted leading-relaxed">
            Select any domain below to examine technical architecture, capabilities, and verified case studies.
          </p>
        </div>

        {/* Selector Layout: Left Column Services List, Right Column Interactive Blueprint */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Services Tab Column (5 cols) */}
          <div className="lg:col-span-5 space-y-2">
            {SERVICES_DATA.map((service) => {
              const isActive = service.id === activeServiceId;
              const Icon = service.icon;

              return (
                <button
                  key={service.id}
                  onClick={() => setActiveServiceId(service.id)}
                  className={`w-full text-left p-4 sm:p-5 rounded-xl border transition-all duration-300 flex items-center justify-between group ${
                    isActive
                      ? 'bg-gradient-to-r from-navy-cardHover to-navy-card border-brand-blue/60 shadow-glow-blue'
                      : 'bg-navy-card/50 hover:bg-navy-card border-navy-border/60 hover:border-navy-border text-navy-muted hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className={`font-mono text-xs font-bold tracking-wider ${isActive ? 'text-brand-cyan' : 'text-navy-muted group-hover:text-white'}`}>
                      {service.number}
                    </span>
                    <div className="w-9 h-9 rounded-lg bg-navy-base border border-navy-border flex items-center justify-center shrink-0">
                      <Icon size={18} className={isActive ? 'text-brand-cyan' : 'text-navy-muted group-hover:text-brand-blue'} />
                    </div>
                    <div>
                      <div className={`font-bold text-sm sm:text-base ${isActive ? 'text-white' : 'text-slate-300 group-hover:text-white'}`}>
                        {service.title}
                      </div>
                      <div className="text-[11px] font-mono text-navy-muted truncate max-w-[200px] sm:max-w-[260px]">
                        {service.shortTag}
                      </div>
                    </div>
                  </div>

                  <ArrowRight
                    size={16}
                    className={`transition-all duration-300 shrink-0 ${
                      isActive
                        ? 'text-brand-cyan translate-x-1 opacity-100'
                        : 'text-navy-muted opacity-0 group-hover:opacity-100'
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Interactive Preview Blueprint Display (7 cols) */}
          <div className="lg:col-span-7 sticky top-28">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeService.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="glass-panel-elevated rounded-2xl p-6 sm:p-8 border border-brand-blue/30 relative overflow-hidden"
              >
                {/* Visual Header Pill */}
                <div className="flex items-center justify-between pb-4 mb-6 border-b border-navy-border/60">
                  <div className="flex items-center gap-2 text-xs font-mono text-brand-cyan uppercase">
                    <span className="w-2 h-2 rounded-full bg-brand-cyan animate-pulse" />
                    <span>DOMAIN SPECIFICATION // {activeService.number}</span>
                  </div>
                  <span className="text-xs font-mono text-navy-muted">
                    Optenary Engineering Hub
                  </span>
                </div>

                {/* Service Title & Headline */}
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
                  {activeService.title}
                </h3>
                <p className="text-brand-cyan font-mono text-xs sm:text-sm mb-4">
                  {activeService.headline}
                </p>
                <p className="text-sm text-navy-muted leading-relaxed mb-6">
                  {activeService.description}
                </p>

                {/* Capabilities list */}
                <div className="mb-6">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-white font-bold mb-3 flex items-center gap-1.5">
                    <CheckCircle2 size={13} className="text-brand-blue" />
                    <span>Core Deliverables & Capabilities</span>
                  </h4>
                  <ul className="space-y-2">
                    {activeService.capabilities.map((cap, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs text-slate-300 font-mono">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan shrink-0 mt-1.5" />
                        <span>{cap}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Technologies Stack */}
                <div className="mb-6 pt-4 border-t border-navy-border/60">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-white font-bold mb-3 flex items-center gap-1.5">
                    <Cpu size={13} className="text-brand-purple" />
                    <span>Deployed Technology Stack</span>
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {activeService.technologies.map(tech => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-md bg-navy-card border border-navy-border text-xs font-mono text-brand-cyan"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Related Real Projects */}
                {activeService.relatedProjects.length > 0 && (
                  <div className="mb-6 pt-4 border-t border-navy-border/60">
                    <h4 className="text-xs font-mono uppercase tracking-wider text-white font-bold mb-3 flex items-center gap-1.5">
                      <Layers size={13} className="text-brand-blue" />
                      <span>Verified Related Project</span>
                    </h4>
                    <div className="flex flex-wrap gap-3">
                      {activeService.relatedProjects.map((p, idx) => (
                        <div
                          key={idx}
                          className="px-3 py-2 rounded-lg bg-navy-card/80 border border-navy-border flex items-center gap-2 text-xs font-mono"
                        >
                          <span className="text-white font-semibold">{p.name}</span>
                          <span className="text-navy-muted">({p.category})</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action CTA */}
                <div className="pt-6 border-t border-navy-border/80 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <Link
                    to={activeService.route}
                    className="text-xs font-mono text-navy-muted hover:text-white flex items-center gap-1 transition-colors"
                  >
                    <span>Read Full Service Specification</span>
                    <ArrowRight size={13} />
                  </Link>

                  <a
                    href="#contact"
                    className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-blue to-brand-cyan hover:from-blue-600 hover:to-cyan-500 text-white font-bold uppercase tracking-wider text-xs font-mono flex items-center justify-center gap-2 shadow-glow-blue transition-all"
                  >
                    <span>Commission {activeService.title}</span>
                    <ArrowRight size={14} />
                  </a>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
