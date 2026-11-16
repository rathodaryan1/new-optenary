import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, ArrowUpRight, Radio, X, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export interface ProjectData {
  id: string;
  title: string;
  client: string;
  category: string;
  filterCategory: 'all' | 'ecommerce' | 'saas' | 'b2b' | 'media';
  status: string;
  image: string;
  liveUrl?: string;
  caseStudyUrl?: string;
  description: string;
  technologies: string[];
  metrics: { label: string; value: string }[];
  deliverables: string[];
  overview: string;
  challenge: string;
  solution: string;
}

export const REAL_PROJECTS: ProjectData[] = [
  {
    id: 'mehta-dairy',
    title: 'Mehta Dairy',
    client: 'Mehta Dairy Sweets & Farsan (Est. 1972)',
    category: 'E-Commerce Storefront',
    filterCategory: 'ecommerce',
    status: 'Live in Production',
    image: '/images/mehta_dairy.png',
    liveUrl: 'https://mehtadairy.com',
    caseStudyUrl: '/projects/mehta-dairy',
    description: 'A modern e-commerce storefront for traditional pure cow ghee sweets and farsan, serving customers across India with seamless online ordering and instant WhatsApp assistance.',
    technologies: ['React', 'Vite', 'Node.js', 'Tailwind CSS', 'Razorpay UPI', 'WhatsApp API'],
    metrics: [
      { label: 'Avg Page Load', value: '1.1s' },
      { label: 'Uptime', value: '99.9%' },
      { label: 'Order Assistance', value: 'Instant WhatsApp' }
    ],
    deliverables: [
      'Custom React/Vite Storefront',
      'Dynamic Weight-based Variant Pricing (250g, 500g, 1kg)',
      'Razorpay & UPI Instant Payment Gateway',
      'Direct WhatsApp Order Notification Workflow',
      'Mobile-first responsive UX for all age demographics'
    ],
    overview: 'Established in 1972 in Palitana, Gujarat, Mehta Dairy is renowned for authentic sweets crafted with pure cow ghee. Optenary engineered their complete digital flagship storefront to bring these heritage recipes to sweet enthusiasts nationwide.',
    challenge: 'Digitalizing a 50+ year legacy confectionery brand required preserving customer confidence, engineering dynamic pricing for weight variants, and ensuring rapid checkout speeds during intense festive shopping rushes.',
    solution: 'Designed and deployed an ultra-fast, headless-inspired React web storefront with frictionless cart management, instant UPI payments, and automated WhatsApp order confirmations.'
  },
  {
    id: 'urban-nest',
    title: 'Urban Nest',
    client: 'Urban Nest Co-Living & Hostels',
    category: 'Enterprise PropTech SaaS',
    filterCategory: 'saas',
    status: 'Active Deployment',
    image: '/images/pg_management.webp',
    liveUrl: 'https://urbannest1.vercel.app',
    description: 'An enterprise-grade property management ecosystem automating tenant lifecycles, digital rent collections, interactive floor bed allocation, and maintenance dispatch.',
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Tailwind CSS', 'REST APIs'],
    metrics: [
      { label: 'Operational Overhead', value: '-70%' },
      { label: 'Collection Efficiency', value: 'Automated UPI' },
      { label: 'Mapping', value: 'Interactive Beds' }
    ],
    deliverables: [
      'Multi-tenant Administrative Dashboard',
      'Interactive Room & Bed Floorplan Visualization',
      'Automated Recurring Rent Invoicing & Reminders',
      'Tenant Self-service Onboarding Portal',
      'Maintenance Ticket Dispatch Pipeline'
    ],
    overview: 'Urban Nest unifies fragmented hostel management processes into a single responsive cloud dashboard for real estate operators.',
    challenge: 'Co-living operators struggled with manual cash logs, delayed maintenance requests, and zero visibility into real-time bed occupancy across multi-story buildings.',
    solution: 'Engineered a unified SaaS platform featuring real-time graphical floor maps, automated digital invoices, and automated tenant notifications.'
  },
  {
    id: 'vishal-masala',
    title: 'Vishal Masala',
    client: 'Vishal Masala Spices',
    category: 'Headless E-Commerce Spices Engine',
    filterCategory: 'ecommerce',
    status: 'Live Platform',
    image: '/images/vishal_masala.webp',
    liveUrl: 'https://vishalmasala.vercel.app',
    description: 'A custom headless e-commerce platform built for high-throughput spice retailing and bulk wholesale distribution, featuring instant indexing and tiered shipping calculators.',
    technologies: ['React', 'Vite', 'Node.js', 'Tailwind CSS', 'Stripe / UPI'],
    metrics: [
      { label: 'Page Load Speed', value: '1.2s' },
      { label: 'Checkout Conversion', value: '+45%' },
      { label: 'Search Indexing', value: 'Instant' }
    ],
    deliverables: [
      'Headless Storefront Architecture',
      'Multi-faceted Spice Filtering & Instant Search',
      'Weight-tiered Multi-zone Shipping Calculator',
      'Bulk Commercial Wholesale Invoicing',
      'Mobile-optimized Instant Checkout'
    ],
    overview: 'A high-performance digital storefront engineered for Vishal Masala to digitalize their wholesale and retail spice operations.',
    challenge: 'Off-the-shelf templates could not accommodate granular bulk spice orders, suffered from sluggish load times, and lacked flexible multi-tiered shipping rules.',
    solution: 'Engineered a bespoke React storefront decoupled from a transactional backend, drastically accelerating page response times and checkout conversions.'
  },
  {
    id: 'shree-enterprise',
    title: 'Shree Enterprise',
    client: 'Shree Enterprise Fire & Safety',
    category: 'Industrial Safety B2B Portal',
    filterCategory: 'b2b',
    status: 'Live Platform',
    image: '/images/shree_enterprise.webp',
    liveUrl: 'https://shreeenterprisebhavnagar.com',
    description: 'An industrial safety platform featuring custom safety compliance calculators, a digital equipment catalog, and an automated client quotation generation engine.',
    technologies: ['React', 'Vite', 'Node.js', 'PDFKit', 'Tailwind CSS'],
    metrics: [
      { label: 'Inquiry Efficiency', value: '+60%' },
      { label: 'Quote Generation', value: 'Automated PDF' },
      { label: 'Compliance Index', value: 'Full Standard' }
    ],
    deliverables: [
      'Industrial Safety Equipment Catalog',
      'Interactive Safety Compliance Self-Audit Tool',
      'Dynamic Automated PDF Quote Generator',
      'B2B RFP Submission & Lead Routing Engine',
      'Full SEO & Performance Optimization'
    ],
    overview: 'A digital portal enabling architects, safety engineers, and commercial contractors to verify safety requirements and request certified quotes instantly.',
    challenge: 'Manual safety estimation was slowing the B2B sales cycle and burdening the engineering team with repetitive quotation drafting.',
    solution: 'Designed an interactive safety calculator that instantly outputs comprehensive itemized proposals in PDF format.'
  },
  {
    id: 'laalo',
    title: 'Laalo',
    client: 'Laalo Theatrical Production',
    category: 'Immersive Theatrical Experience',
    filterCategory: 'media',
    status: 'Live Experience',
    image: '/images/laalo_movie.webp',
    liveUrl: 'https://laalo-movie.vercel.app',
    description: 'An experiential cinematic landing page built to promote the theatrical premiere of the movie "Laalo", featuring high-impact video environments and ticketing funnels.',
    technologies: ['React', 'Vite', 'Framer Motion', 'Tailwind CSS'],
    metrics: [
      { label: 'Visual Experience', value: 'Fluid 60 FPS' },
      { label: 'Ticketing Linkage', value: 'Direct Funnel' },
      { label: 'Mobile UX', value: 'Responsive Audio' }
    ],
    deliverables: [
      'Cinematic Hero Atmosphere',
      'Interactive Cast & Character Exploration',
      'Trailer & Media Streaming Integration',
      'Direct Cinema Ticket Funnel Linkage',
      'Fluid Page Transitions'
    ],
    overview: 'A digital media experience crafted to immerse filmgoers into the narrative world of the theatrical film "Laalo".',
    challenge: 'Standard promotional pages lacked theatrical depth and failed to convey emotional resonance on mobile devices.',
    solution: 'Engineered an interactive motion web experience with synchronized ambient aesthetics and frictionless ticketing.'
  }
];

export default function ClientsShowcase() {
  const [activeFilter, setActiveFilter] = useState<'all' | 'ecommerce' | 'saas' | 'b2b' | 'media'>('all');
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);

  const filteredProjects = activeFilter === 'all'
    ? REAL_PROJECTS
    : REAL_PROJECTS.filter(p => p.filterCategory === activeFilter);

  return (
    <section id="work" className="relative py-28 px-6 md:px-12 bg-[#02050f] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-brand-blue/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-[400px] h-[400px] bg-brand-cyan/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-navy-card border border-navy-border text-xs font-mono text-brand-cyan uppercase tracking-wider mb-4">
              <Radio size={12} className="animate-pulse" />
              <span>(00) VERIFIED CLIENT SHOWCASE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
              Real work engineered for <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue via-brand-cyan to-brand-purple">
                high-performance impact.
              </span>
            </h2>
          </div>

          {/* Telemetry ping badge */}
          <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-navy-card/80 border border-navy-border text-xs font-mono text-navy-muted backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <div>
              <span className="text-white font-semibold">LATEST VERIFIED DEPLOYMENT</span>
              <div className="text-[11px] text-navy-muted">Mehta Dairy · mehtadairy.com</div>
            </div>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-10 pb-2 border-b border-navy-border/60">
          {[
            { id: 'all', label: 'All Projects (5)' },
            { id: 'ecommerce', label: 'E-Commerce (2)' },
            { id: 'saas', label: 'SaaS Platforms (1)' },
            { id: 'b2b', label: 'B2B & Industrial (1)' },
            { id: 'media', label: 'Creative & Media (1)' }
          ].map(f => (
            <button
              key={f.id}
              onClick={() => setActiveFilter(f.id as any)}
              className={`px-4 py-2 rounded-lg text-xs font-mono font-medium transition-all ${
                activeFilter === f.id
                  ? 'bg-brand-blue text-white shadow-glow-blue'
                  : 'bg-navy-card/60 text-navy-muted hover:text-white hover:bg-navy-card border border-navy-border/50'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="group glass-panel rounded-2xl overflow-hidden border border-navy-border/80 hover:border-brand-blue/50 transition-all flex flex-col justify-between"
            >
              {/* Card Image / Mockup Preview */}
              <div className="relative aspect-[16/10] bg-[#050814] overflow-hidden border-b border-navy-border/70">
                {/* Browser bar */}
                <div className="h-6 bg-navy-card/90 px-3 flex items-center justify-between border-b border-navy-border/40 select-none">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-red-500/80" />
                    <span className="w-2 h-2 rounded-full bg-yellow-500/80" />
                    <span className="w-2 h-2 rounded-full bg-green-500/80" />
                  </div>
                  <span className="text-[10px] font-mono text-navy-muted truncate max-w-[150px]">
                    {project.liveUrl?.replace('https://', '')}
                  </span>
                  <div className="w-6" />
                </div>

                {/* Screenshot */}
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />

                {/* Category Badge overlay */}
                <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-md bg-[#040817]/85 border border-navy-border text-[10px] font-mono text-brand-cyan backdrop-blur-md">
                  {project.category}
                </div>
              </div>

              {/* Card Details */}
              <div className="p-6 flex-grow flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start gap-2 mb-2">
                    <h3 className="text-xl font-bold text-white group-hover:text-brand-cyan transition-colors">
                      {project.title}
                    </h3>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 whitespace-nowrap">
                      {project.status}
                    </span>
                  </div>

                  <p className="text-xs text-navy-muted leading-relaxed line-clamp-2 mb-4">
                    {project.description}
                  </p>

                  {/* Verified Metrics Chips */}
                  <div className="grid grid-cols-2 gap-2 mb-5">
                    {project.metrics.slice(0, 2).map((m, i) => (
                      <div key={i} className="p-2 rounded-lg bg-[#060b20] border border-navy-border/50 text-[11px] font-mono">
                        <span className="text-navy-muted block text-[10px]">{m.label}</span>
                        <span className="text-brand-blue font-semibold">{m.value}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded bg-navy-card text-[10px] font-mono text-navy-muted border border-navy-border/60"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="px-1.5 py-0.5 rounded bg-navy-card text-[10px] font-mono text-navy-muted border border-navy-border/60">
                        +{project.technologies.length - 4}
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="pt-4 border-t border-navy-border/60 flex items-center justify-between gap-3">
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="flex items-center gap-1.5 text-xs font-mono text-navy-muted hover:text-white transition-colors"
                  >
                    <span>View Blueprint</span>
                    <ChevronRight size={13} />
                  </button>

                  <div className="flex items-center gap-2">
                    {project.caseStudyUrl && (
                      <Link
                        to={project.caseStudyUrl}
                        className="px-2.5 py-1.5 rounded-lg bg-navy-card hover:bg-navy-cardHover border border-navy-border text-xs font-mono text-brand-cyan hover:text-white flex items-center gap-1 transition-colors"
                      >
                        <span>Case Study</span>
                        <ArrowUpRight size={12} />
                      </Link>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-2.5 py-1.5 rounded-lg bg-brand-blue/20 hover:bg-brand-blue text-brand-blue hover:text-white border border-brand-blue/30 text-xs font-mono flex items-center gap-1 transition-all"
                      >
                        <span>Live Site</span>
                        <ExternalLink size={12} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Project Blueprint Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#040818] border border-navy-border rounded-2xl p-6 sm:p-8 shadow-2xl no-scrollbar"
            >
              {/* Modal close */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 p-2 rounded-xl bg-navy-card border border-navy-border hover:bg-navy-cardHover text-navy-muted hover:text-white transition-colors"
              >
                <X size={18} />
              </button>

              <div className="flex items-center gap-2 text-xs font-mono text-brand-cyan uppercase tracking-wider mb-2">
                <span>PROJECT ARCHITECTURE & BLUEPRINT</span>
                <span>·</span>
                <span>{selectedProject.status}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
                {selectedProject.title}
              </h3>
              <p className="text-xs font-mono text-navy-muted mb-6">
                Client: {selectedProject.client}
              </p>

              {/* Screenshot Banner */}
              <div className="relative aspect-[16/9] rounded-xl overflow-hidden border border-navy-border mb-8 bg-black">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover object-top"
                />
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                {selectedProject.metrics.map((m, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-navy-card border border-navy-border">
                    <span className="text-xs font-mono text-navy-muted block mb-1">{m.label}</span>
                    <span className="text-lg font-mono font-bold text-brand-cyan">{m.value}</span>
                  </div>
                ))}
              </div>

              {/* Narrative Blocks */}
              <div className="space-y-6 text-sm text-navy-muted leading-relaxed mb-8">
                <div>
                  <h4 className="text-white font-bold text-base mb-2 font-mono">Overview</h4>
                  <p>{selectedProject.overview}</p>
                </div>
                <div>
                  <h4 className="text-white font-bold text-base mb-2 font-mono">The Engineering Challenge</h4>
                  <p>{selectedProject.challenge}</p>
                </div>
                <div>
                  <h4 className="text-white font-bold text-base mb-2 font-mono">The Optenary Solution</h4>
                  <p>{selectedProject.solution}</p>
                </div>
              </div>

              {/* Technologies */}
              <div className="mb-8">
                <h4 className="text-white font-bold text-xs uppercase font-mono tracking-wider mb-3">
                  Technologies Deployed
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.technologies.map(t => (
                    <span
                      key={t}
                      className="px-3 py-1 rounded-lg bg-navy-card border border-navy-border text-xs font-mono text-white"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Modal Bottom Actions */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-navy-border">
                <div className="text-xs font-mono text-navy-muted">
                  Verified real Optenary client deployment
                </div>
                <div className="flex items-center gap-3">
                  {selectedProject.caseStudyUrl && (
                    <Link
                      to={selectedProject.caseStudyUrl}
                      className="px-4 py-2 rounded-xl bg-navy-card hover:bg-navy-cardHover border border-navy-border text-xs font-mono text-brand-cyan hover:text-white flex items-center gap-1.5 transition-colors"
                    >
                      <span>Read Editorial Case Study</span>
                      <ArrowUpRight size={14} />
                    </Link>
                  )}
                  {selectedProject.liveUrl && (
                    <a
                      href={selectedProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-xl bg-brand-blue hover:bg-blue-600 text-xs font-mono font-semibold text-white flex items-center gap-1.5 shadow-glow-blue transition-all"
                    >
                      <span>Open Live Platform</span>
                      <ExternalLink size={14} />
                    </a>
                  )}
                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
