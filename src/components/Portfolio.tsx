import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight, X, Check, Code, Shield, Briefcase, Sparkles, ExternalLink, Layers } from 'lucide-react';

interface ProjectItem {
  title: string;
  sub: string;
  tags: string[];
  color: string;
  accent: string;
  desc: string;
  type: string;
  industry: string;
  status: string;
  liveUrl?: string;
  caseStudyUrl?: string;
  stack: string[];
  services: string[];
  features?: string[];
  overview: string;
  challenges: string;
  solution: string;
  impact: string;
  mock: React.ReactNode;
}

export default function Portfolio() {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'features' | 'challenges' | 'solution' | 'impact'>('overview');

  const projects: ProjectItem[] = [
    {
      title: "Mehta Dairy",
      sub: "Premium Sweets & Farsan E-Commerce Storefront",
      tags: ["E-Commerce Website", "Live / Completed", "D2C & Retail"],
      color: "from-amber-600/25 via-orange-600/20 to-yellow-600/25",
      accent: "text-amber-400",
      desc: "A modern e-commerce website for Mehta Dairy, bringing traditional sweets, farsan and dairy products online with a premium, smooth and mobile-friendly shopping experience.",
      type: "E-Commerce Website",
      industry: "FoodTech & Sweets Retail",
      status: "Live / Completed",
      liveUrl: "https://mehtadairy.com",
      caseStudyUrl: "/projects/mehta-dairy",
      stack: ["React", "Vite", "Node.js", "Tailwind CSS", "Razorpay / UPI", "WhatsApp Business API"],
      services: [
        "Storefront Engineering",
        "Product Catalog Architecture",
        "Cart & Checkout Systems",
        "Online Payment Integration",
        "WhatsApp Assistant Integration",
        "Performance & Mobile Optimization"
      ],
      features: [
        "Online Shopping",
        "Product Catalog",
        "Cart & Checkout",
        "Online Payments",
        "Order Management",
        "Delivery Tracking",
        "Customer Accounts",
        "WhatsApp Integration",
        "Responsive Design",
        "Performance Optimization"
      ],
      overview: "A modern e-commerce website for Mehta Dairy, bringing traditional sweets, farsan and dairy products online with a premium, smooth and mobile-friendly shopping experience. Established in 1972 in Palitana, Gujarat, Mehta Dairy's digital storefront connects sweet lovers pan-India with handcrafted delicacies made from 100% pure cow ghee.",
      challenges: "Digitalizing a 50+ year legacy confectionery brand without losing customer trust. The platform needed to support dynamic weight-based pricing (250g, 500g, 1kg), seamless online payments, instant WhatsApp order communication, fast page load speeds during festival peak surges, and an effortless checkout experience for all age groups.",
      solution: "Engineered a custom high-performance e-commerce platform featuring an intuitive product catalog, weight & quantity variant selection, instant cart & checkout workflows, integrated online payments (UPI, Credit/Debit Cards, NetBanking), automated order management, delivery tracking, customer accounts, direct WhatsApp support, and responsive mobile optimization.",
      impact: "Successfully launched mehtadairy.com live in production, processing pan-India orders with a 1.1s average page load speed, 99.9% uptime, and significantly increased direct-to-consumer sales during major festival seasons.",
      mock: (
        <div className="w-full h-full bg-dark-bg rounded-lg border border-white/10 overflow-hidden flex flex-col shadow-2xl">
          {/* Browser header */}
          <div className="h-4 bg-dark-card border-b border-white/5 flex items-center gap-1 px-2 shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ff5f56]" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#ffbd2e]" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#27c93f]" />
            <div className="flex-grow text-[6px] text-dark-muted font-mono truncate text-center select-none bg-dark-bg/60 rounded py-0.5 mx-2 max-w-[150px]">
              mehtadairy.com
            </div>
          </div>
          {/* Browser page content */}
          <div className="flex-grow relative overflow-hidden bg-black group/img">
            <img
              src="/images/mehta_dairy.png"
              alt="Mehta Dairy E-Commerce Website"
              className="w-full h-full object-cover object-top transition-transform duration-500 group-hover/img:scale-105"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      )
    },
    {
      title: "Urban Nest",
      sub: "Enterprise Co-Living & Housing SaaS Platform",
      tags: ["B2B2C", "SaaS & Mobile App"],
      color: "from-blue-600/20 to-cyan-600/20",
      accent: "text-blue-400",
      desc: "An enterprise-grade property management ecosystem designed to streamline tenant lifecycles, automate digital rent collections, optimize bed allocation, and coordinate maintenance logistics for modern co-living providers.",
      type: "PropTech SaaS Product",
      industry: "Real Estate & Co-Living",
      status: "Live Project",
      liveUrl: "https://urbannest1.vercel.app",
      stack: ["React", "Node.js", "PostgreSQL", "Tailwind CSS"],
      services: ["Product Architecture", "UI/UX Design Strategy", "Full-Stack Development", "Automated Billing Systems"],
      features: [
        "Tenant Lifecycle Management",
        "Automated Rent Collection",
        "Interactive Floor Maps",
        "Maintenance Logistics",
        "Multi-Tenant Command Center",
        "Responsive Mobile App"
      ],
      overview: "A comprehensive, multi-tenant digital housing ecosystem engineered to unify hostel operations, tenant invoicing, room mapping, and administrative workflows into a single dashboard.",
      challenges: "Property managers lose significant operating efficiency due to fragmented tenant communication, manual bank reconciliation, poor occupancy visibility, and delayed maintenance responses.",
      solution: "Engineered an administrative command center paired with a resident application. Integrated instant UPI payment routing, real-time interactive floor/bed allocation maps, and an SLA-driven maintenance dispatch pipeline.",
      impact: "Reduced operational overhead by 70% and lowered late-payment rates by 90% via automated cross-channel billing updates.",
      mock: (
        <div className="w-full h-full bg-dark-bg rounded-lg border border-white/10 overflow-hidden flex flex-col shadow-2xl">
          {/* Browser header */}
          <div className="h-4 bg-dark-card border-b border-white/5 flex items-center gap-1 px-2 shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ff5f56]" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#ffbd2e]" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#27c93f]" />
            <div className="flex-grow text-[6px] text-dark-muted font-mono truncate text-center select-none bg-dark-bg/60 rounded py-0.5 mx-2 max-w-[150px]">
              urbannest1.vercel.app
            </div>
          </div>
          {/* Browser page content */}
          <div className="flex-grow relative overflow-hidden bg-black">
            <img
              src="/images/pg_management.webp"
              alt="Urban Nest PG Management"
              className="w-full h-full object-cover object-top"
              loading="lazy" decoding="async" />
          </div>
        </div>
      )
    },
    {
      title: "Vishal Masala",
      sub: "Headless E-Commerce Spices Engine",
      tags: ["B2C & B2B", "Headless Commerce"],
      color: "from-orange-600/20 to-amber-600/20",
      accent: "text-amber-400",
      desc: "A custom headless e-commerce architecture engineered for high-throughput spice retailing and bulk distribution, featuring instant product indexing, multi-faceted filtering, and seamless custom shipping calculators.",
      type: "Client Platform",
      industry: "E-Commerce / FoodTech",
      status: "Live Project",
      liveUrl: "https://vishalmasala.vercel.app",
      stack: ["React", "Vite", "Node.js", "Stripe API", "Tailwind CSS"],
      services: ["UI/UX Interface Design", "Headless Storefront Engineering", "Custom Payment Integrations", "Fulfillment Automation"],
      features: [
        "Headless Commerce Architecture",
        "Bulk Wholesale Ordering",
        "Weight-Based Shipping Logic",
        "Instant Product Search",
        "Custom Payment Checkout",
        "Fulfillment Automation"
      ],
      overview: "A bespoke headless storefront designed for Vishal Masala to digitalize their heritage spices business, optimizing page performance, product discoverability, and purchase conversion rates.",
      challenges: "Standard out-of-the-box e-commerce templates restricted layout customizability for bulk commercial accounts, suffered from slow page loads, and lacked flexible logic for weight-based multi-tier shipping rates.",
      solution: "Developed an optimized React storefront decoupled from a secure transactional backend. Designed an intuitive one-page retail/wholesale layout alongside dynamic shipping and checkout API integrations.",
      impact: "Achieved a 1.2s page load speed, driving a 45% increase in conversion rates and minimizing checkout drop-offs.",
      mock: (
        <div className="w-full h-full bg-dark-bg rounded-lg border border-white/10 overflow-hidden flex flex-col shadow-2xl">
          {/* Browser header */}
          <div className="h-4 bg-dark-card border-b border-white/5 flex items-center gap-1 px-2 shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ff5f56]" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#ffbd2e]" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#27c93f]" />
            <div className="flex-grow text-[6px] text-dark-muted font-mono truncate text-center select-none bg-dark-bg/60 rounded py-0.5 mx-2 max-w-[150px]">
              vishalmasala.vercel.app
            </div>
          </div>
          {/* Browser page content */}
          <div className="flex-grow relative overflow-hidden bg-black">
            <img
              src="/images/vishal_masala.webp"
              alt="Vishal Masala E-Commerce"
              className="w-full h-full object-cover object-top"
              loading="lazy" decoding="async" />
          </div>
        </div>
      )
    },
    {
      title: "Shree Enterprise",
      sub: "Industrial Fire Protection B2B Portal",
      tags: ["B2B", "Corporate Platform"],
      color: "from-rose-600/20 to-red-600/20",
      accent: "text-rose-400",
      desc: "A corporate safety portal showcasing industrial fire protection solutions, featuring custom safety compliance calculators, a digital equipment index, and a automated client quotation engine.",
      type: "Client Portal",
      industry: "Industrial Safety & Compliance",
      status: "Live Project",
      liveUrl: "https://shreeenterprisebhavnagar.com",
      stack: ["React", "Vite", "PDFKit", "Tailwind CSS"],
      services: ["Enterprise Platform Engineering", "Interactive Audit Calculators", "Dynamic Document Generation"],
      features: [
        "Safety Audit Calculators",
        "Automated PDF Quote Engine",
        "Equipment Catalog Index",
        "B2B Inquiry Workflows",
        "Compliance Reporting"
      ],
      overview: "A premium B2B digital gateway engineered to streamline how industrial safety consultants and building contractors audit safety specifications and request certified safety equipment.",
      challenges: "B2B procurement agents found standard quote request forms tedious, resulting in long sales cycles and manual estimation delays for custom fire installation layouts.",
      solution: "Created an interactive self-audit checklist calculator and dynamic catalog search, backed by an automated system that instantly drafts itemized custom quotes as downloadable PDFs.",
      impact: "Boosted B2B lead generation by 60% and automated 80% of routine sales quote requests.",
      mock: (
        <div className="w-full h-full bg-dark-bg rounded-lg border border-white/10 overflow-hidden flex flex-col shadow-2xl">
          {/* Browser header */}
          <div className="h-4 bg-dark-card border-b border-white/5 flex items-center gap-1 px-2 shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ff5f56]" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#ffbd2e]" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#27c93f]" />
            <div className="flex-grow text-[6px] text-dark-muted font-mono truncate text-center select-none bg-dark-bg/60 rounded py-0.5 mx-2 max-w-[150px]">
              shreeenterprisebhavnagar.com
            </div>
          </div>
          {/* Browser page content */}
          <div className="flex-grow relative overflow-hidden bg-black">
            <img
              src="/images/shree_enterprise.webp"
              alt="Shree Enterprise Fire Safety"
              className="w-full h-full object-cover object-top"
              loading="lazy" decoding="async" />
          </div>
        </div>
      )
    },
    {
      title: "Laalo",
      sub: "Immersive Theatrical Campaign Experience",
      tags: ["Media & Entertainment", "Immersive Web Design"],
      color: "from-purple-600/20 to-pink-600/20",
      accent: "text-purple-400",
      desc: "An experiential cinematic landing page built to promote the theatrical launch of the movie 'Laalo', featuring high-impact video environments, fluid timelines, and ticketing integrations.",
      type: "Internal Creative Project",
      industry: "Media & Entertainment",
      status: "Live Project",
      liveUrl: "https://laalo-movie.vercel.app",
      stack: ["React", "Vite", "Framer Motion", "Tailwind CSS"],
      services: ["Creative Front-End Direction", "Fluid Motion Graphic Design", "Ticketing Funnel Integration"],
      features: [
        "Cinematic Hero Environment",
        "Interactive Motion Graphics",
        "Behind-The-Scenes Gallery",
        "Box Office Ticket Funnel",
        "Responsive Sound & Video Layers"
      ],
      overview: "A highly immersive, motion-focused entertainment web campaign engineered to build pre-release momentum, host behind-the-scenes content, and drive advance ticket sales.",
      challenges: "Standard promotional websites fail to translate the visual scale, emotional theme, and dynamic narrative of a theatrical film release to the web browser.",
      solution: "Engineered a cinematic dark-mode application featuring optimized background video layers, fluid scroll-triggered layouts, responsive cast timeline cards, and a seamless box office widget.",
      impact: "Generated over 50,000 trailer views in the initial week of campaign deployment alongside a 15% ticket click-through rate.",
      mock: (
        <div className="w-full h-full bg-dark-bg rounded-lg border border-white/10 overflow-hidden flex flex-col shadow-2xl">
          {/* Browser header */}
          <div className="h-4 bg-dark-card border-b border-white/5 flex items-center gap-1 px-2 shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ff5f56]" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#ffbd2e]" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#27c93f]" />
            <div className="flex-grow text-[6px] text-dark-muted font-mono truncate text-center select-none bg-dark-bg/60 rounded py-0.5 mx-2 max-w-[150px]">
              laalo-movie.vercel.app
            </div>
          </div>
          {/* Browser page content */}
          <div className="flex-grow relative overflow-hidden bg-black">
            <img
              src="/images/laalo_movie.webp"
              alt="Laalo Movie Portfolio Website"
              className="w-full h-full object-cover object-top"
              loading="lazy" decoding="async" />
          </div>
        </div>
      )
    }
  ];

  return (
    <section id="what-we-have-built" className="bg-[#0b0d0e] py-24 px-6 md:px-12 relative overflow-hidden">

      {/* Background decoration */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-brand-orange/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">

        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-brand-orange text-xs font-bold uppercase tracking-widest block mb-4"
          >
            Our Work
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-extrabold text-white mt-4 mb-4"
          >
            Real Products <span className="text-brand-orange">We've Built</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-dark-muted max-w-2xl mx-auto text-base md:text-lg"
          >
            Explore platforms and applications delivered through our scalable web app development service and enterprise-ready software expertise.
          </motion.p>
        </div>

        {/* Portfolio Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 max-w-5xl mx-auto gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -6 }}
              className="group rounded-2xl bg-dark-card/50 border border-dark-border hover:border-brand-orange/30 overflow-hidden flex flex-col shadow-glow"
            >
              {/* Card visual mockup window */}
              <div className={`h-52 bg-gradient-to-br ${project.color} p-4 flex items-center justify-center border-b border-dark-border relative overflow-hidden`}>
                <div className="w-full h-full transform group-hover:scale-[1.02] transition-transform duration-300">
                  {project.mock}
                </div>
              </div>

              {/* Card content text details */}
              <div className="p-6 flex flex-col flex-grow justify-between">
                <div>
                  <div className="flex flex-wrap gap-1.5 mb-2.5">
                    {project.tags.map((tag, tIdx) => (
                      <span key={tIdx} className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded border ${
                        tag.includes('Live') 
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                          : 'text-dark-muted bg-dark-light/50 border-dark-border'
                      }`}>
                        {tag}
                      </span>
                    ))}
                  </div>

                  <h3 className="text-xl font-bold text-white mb-1 group-hover:text-brand-orange transition-colors flex items-center justify-between">
                    <span>{project.title}</span>
                  </h3>
                  <span className="text-xs text-brand-orangeLight/80 font-medium block mb-3">{project.sub}</span>
                  <p className="text-xs md:text-sm text-dark-muted leading-relaxed mb-6">
                    {project.desc}
                  </p>
                </div>

                {/* Card Action Buttons */}
                <div className="flex flex-wrap items-center gap-2.5 pt-4 border-t border-white/5 mt-auto">
                  {project.caseStudyUrl ? (
                    <Link
                      to={project.caseStudyUrl}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-dark-light hover:bg-brand-orange hover:text-dark-bg text-xs font-bold uppercase tracking-wider text-white transition-all border border-dark-border hover:border-brand-orange"
                    >
                      <span>View Case Study</span>
                      <Sparkles size={13} />
                    </Link>
                  ) : (
                    <button
                      onClick={() => { setSelectedProject(project); setActiveTab('overview'); }}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-dark-light hover:bg-brand-orange hover:text-dark-bg text-xs font-bold uppercase tracking-wider text-white transition-all border border-dark-border hover:border-brand-orange"
                    >
                      <span>View Case Study</span>
                      <Sparkles size={13} />
                    </button>
                  )}

                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-brand-orange/10 hover:bg-brand-orange text-brand-orange hover:text-dark-bg text-xs font-bold uppercase tracking-wider transition-all border border-brand-orange/30 hover:border-brand-orange"
                    >
                      <span>View Live Website</span>
                      <ExternalLink size={13} />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4 md:p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="bg-[#0b0d0e] border border-dark-border rounded-3xl w-full max-w-5xl h-[90vh] md:h-[82vh] overflow-hidden flex flex-col md:flex-row relative shadow-2xl"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-dark-light border border-dark-border text-white hover:border-brand-orange hover:text-brand-orange transition-colors z-30"
                aria-label="Close modal"
              >
                <X size={18} />
              </button>

              {/* Left Side: Specs & Hero Visual */}
              <div className="md:w-2/5 border-b md:border-b-0 md:border-r border-dark-border flex flex-col h-1/2 md:h-full bg-dark-card/20 overflow-y-auto">
                {/* Visual Header */}
                <div className={`h-44 bg-gradient-to-br ${selectedProject.color} p-4 flex items-center justify-center border-b border-dark-border relative overflow-hidden shrink-0`}>
                  <div className="w-full h-full scale-[0.88]">
                    {selectedProject.mock}
                  </div>
                </div>

                {/* Specs Info */}
                <div className="p-6 space-y-5 flex-grow">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">{selectedProject.title}</h3>
                    <span className="text-xs text-brand-orangeLight font-medium">{selectedProject.sub}</span>
                  </div>

                  {/* Fact Sheet */}
                  <div className="space-y-3 bg-[#111317]/50 p-4 rounded-2xl border border-white/5 text-xs">
                    <div className="flex justify-between items-center py-1 border-b border-white/5">
                      <span className="text-dark-muted flex items-center gap-1.5"><Briefcase size={12} className="text-brand-orange" /> Project Type</span>
                      <span className="font-bold text-white/90">{selectedProject.type}</span>
                    </div>
                    <div className="flex justify-between items-center py-1 border-b border-white/5">
                      <span className="text-dark-muted flex items-center gap-1.5"><Shield size={12} className="text-brand-orange" /> Industry</span>
                      <span className="font-bold text-white/90">{selectedProject.industry}</span>
                    </div>
                    <div className="flex flex-col gap-1.5 py-1 border-b border-white/5">
                      <span className="text-dark-muted flex items-center gap-1.5"><Code size={12} className="text-brand-orange" /> Tech Stack</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {selectedProject.stack.map((tech: string, i: number) => (
                          <span key={i} className="px-2 py-0.5 rounded bg-dark-light/50 border border-white/5 text-[10px] text-white/80 font-medium">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                    {selectedProject.liveUrl && (
                      <div className="flex justify-between items-center py-1">
                        <span className="text-dark-muted flex items-center gap-1.5"><ExternalLink size={12} className="text-brand-orange" /> Live Website</span>
                        <a 
                          href={selectedProject.liveUrl} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="font-bold text-brand-orange hover:underline text-[11px] truncate max-w-[160px]"
                        >
                          {selectedProject.liveUrl.replace('https://', '')}
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Side: Tabbed Details */}
              <div className="md:w-3/5 flex flex-col h-1/2 md:h-full bg-[#070809]">
                {/* Tabs selection bar */}
                <div className="flex border-b border-dark-border px-6 pt-4 gap-1.5 overflow-x-auto shrink-0 scrollbar-none">
                  {(['overview', 'features', 'challenges', 'solution', 'impact'] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-4 py-3 text-xs font-bold uppercase tracking-wider border-b-2 transition-all shrink-0 ${activeTab === tab
                          ? 'border-brand-orange text-brand-orange'
                          : 'border-transparent text-dark-muted hover:text-white'
                        }`}
                    >
                      {tab === 'solution' ? 'Solution' : tab === 'features' ? 'Key Features' : tab}
                    </button>
                  ))}
                </div>

                {/* Tab content area */}
                <div className="p-6 md:p-8 overflow-y-auto flex-grow">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTab}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-4"
                    >
                      {activeTab === 'overview' && (
                        <div>
                          <h4 className="text-sm font-bold uppercase tracking-widest text-brand-orange mb-3 flex items-center gap-2">
                            <Sparkles size={14} /> Project Overview
                          </h4>
                          <p className="text-sm md:text-base text-white/85 leading-relaxed">
                            {selectedProject.overview}
                          </p>
                          <div className="mt-6">
                            <h5 className="text-xs font-bold uppercase tracking-wider text-white/90 mb-3">Services Delivered</h5>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                              {selectedProject.services.map((service: string, i: number) => (
                                <div key={i} className="flex items-center gap-2 text-xs text-dark-muted bg-[#111317]/50 p-2.5 rounded-xl border border-white/5">
                                  <Check size={12} className="text-brand-orange shrink-0" />
                                  <span className="font-semibold text-white/80">{service}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}

                      {activeTab === 'features' && (
                        <div>
                          <h4 className="text-sm font-bold uppercase tracking-widest text-brand-orange mb-3 flex items-center gap-2">
                            <Layers size={14} /> Key Features & Capabilities
                          </h4>
                          <p className="text-xs text-dark-muted mb-4">
                            Core functional modules and user experience features shipped in this project:
                          </p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {(selectedProject.features || selectedProject.services).map((feat: string, i: number) => (
                              <div key={i} className="flex items-center gap-2.5 text-xs text-white/90 bg-[#111317]/70 p-3 rounded-xl border border-white/5 hover:border-brand-orange/30 transition-all">
                                <span className="w-6 h-6 rounded-lg bg-brand-orange/10 flex items-center justify-center text-brand-orange font-bold text-[10px] shrink-0">
                                  {i + 1}
                                </span>
                                <span className="font-semibold text-white/90">{feat}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {activeTab === 'challenges' && (
                        <div>
                          <h4 className="text-sm font-bold uppercase tracking-widest text-brand-orange mb-3 flex items-center gap-2">
                            🚨 The Challenge / Opportunity
                          </h4>
                          <p className="text-sm md:text-base text-white/85 leading-relaxed">
                            {selectedProject.challenges}
                          </p>
                        </div>
                      )}

                      {activeTab === 'solution' && (
                        <div>
                          <h4 className="text-sm font-bold uppercase tracking-widest text-brand-orange mb-3 flex items-center gap-2">
                            🛠️ Our Approach & Solution
                          </h4>
                          <p className="text-sm md:text-base text-white/85 leading-relaxed">
                            {selectedProject.solution}
                          </p>
                        </div>
                      )}

                      {activeTab === 'impact' && (
                        <div>
                          <h4 className="text-sm font-bold uppercase tracking-widest text-brand-orange mb-3 flex items-center gap-2">
                            📈 Results & Business Impact
                          </h4>
                          <p className="text-sm md:text-base text-white/85 leading-relaxed">
                            {selectedProject.impact}
                          </p>
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Footer options */}
                <div className="p-4 border-t border-dark-border bg-[#090b0c] flex flex-wrap items-center justify-end gap-3 shrink-0">
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="px-4 py-2.5 rounded-xl bg-dark-light hover:bg-dark-card border border-dark-border text-white text-xs font-bold uppercase tracking-wider transition-colors"
                  >
                    Close Case Study
                  </button>

                  {selectedProject.liveUrl && (
                    <a
                      href={selectedProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2.5 rounded-xl bg-brand-orange/15 hover:bg-brand-orange hover:text-dark-bg border border-brand-orange/40 text-brand-orange text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5"
                    >
                      <span>View Live Website</span>
                      <ExternalLink size={13} />
                    </a>
                  )}

                  <a
                    href="/contact"
                    onClick={() => setSelectedProject(null)}
                    className="px-4 py-2.5 rounded-xl bg-brand-orange hover:bg-brand-orangeDark text-dark-bg text-xs font-bold uppercase tracking-wider transition-all shadow-glow flex items-center gap-1.5"
                  >
                    <span>Start Similar Project</span>
                    <ArrowUpRight size={13} />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
