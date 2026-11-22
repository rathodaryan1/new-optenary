import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ExternalLink,
  ArrowRight,
  ShieldCheck,
  Zap,
  Award,
  Search,
  CheckCircle2,
  Cpu,
  Layers,
  Sparkles,
  ArrowLeft,
  Activity,
  FileText
} from 'lucide-react';
import RwHeader from '../components/reachwise/RwHeader';
import RwFooter from '../components/reachwise/RwFooter';
import RwCta from '../components/reachwise/RwCta';
import '../components/reachwise/reachwise.css';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';
import MehtaDairyCaseStudyPage from './MehtaDairyCaseStudyPage';

interface ProjectDetail {
  slug: string;
  title: string;
  subtitle: string;
  client: string;
  location: string;
  year: string;
  category: string;
  industry: string;
  liveUrl?: string;
  mockupUrl?: string;
  heroImage: string;
  overview: string;
  background: string;
  challenge: string;
  solution: string;
  impact: string;
  stats: { label: string; value: string; desc: string }[];
  stack: string[];
  features: { title: string; desc: string; icon: any }[];
  deliverables: string[];
  testimonial?: {
    quote: string;
    author: string;
    role: string;
    avatar: string;
  };
}

const PROJECTS_DATA: Record<string, ProjectDetail> = {
  'shree-enterprise': {
    slug: 'shree-enterprise',
    title: 'Shree Enterprise',
    subtitle: 'High-Performance B2B Industrial Components & Safety Quoting Portal',
    client: 'Shree Enterprise Fire & Safety',
    location: 'Bhavnagar, Gujarat',
    year: '2024 - 2025',
    category: 'B2B Industrial Platform & Web Application',
    industry: 'Industrial Safety & Engineering Hardware',
    liveUrl: 'https://shreeenterprisebhavnagar.com',
    mockupUrl: 'https://shreeenterprisebhavnagar.com',
    heroImage: '/images/work/shree_enterprise_studio.webp',
    overview: 'A specialized B2B digital gateway engineered to streamline how industrial contractors, builders, and safety consultants search across 10,000+ hardware components, verify safety certifications, and generate automated, itemized quote proposals.',
    background: 'Shree Enterprise is a trusted supplier of industrial safety hardware, fire protection systems, and certified fasteners based in Bhavnagar, Gujarat. As their operations expanded to serve regional factories and large contractors, paper catalogs and manual telephone estimates became a major bottleneck.',
    challenge: 'Procurement agents and building contractors found traditional RFQ forms slow and cumbersome. Estimating custom multi-story fire installations required manual spreadsheet lookups, leading to multi-day quotation delays and lost sales opportunities.',
    solution: 'Optenary designed and engineered a custom B2B web application with sub-second catalog indexing, smart attribute filtering, an interactive safety compliance calculator, and an automated quote generator that compiles verified line items into branded PDF proposals with live GST invoicing.',
    impact: 'Reduced quote turnaround time from 24 hours to 30 seconds, accelerated catalog search latency from 3.2s to 0.4s, and increased verified contractor lead generation by 60%.',
    stats: [
      { label: 'Catalog Search Speed', value: '0.4s', desc: 'Down from 3.2s via pre-indexed lookup' },
      { label: 'Indexed Components', value: '10,000+', desc: 'Hardware & safety SKUs cataloged' },
      { label: 'B2B Lead Growth', value: '+60%', desc: 'Verified inbound commercial inquiries' },
      { label: 'Quotation Automation', value: '80%', desc: 'Routine quotes generated instantly' }
    ],
    stack: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'PostgreSQL', 'PDF Engine', 'Vercel Edge'],
    features: [
      {
        title: 'Sub-Second Catalog Search Engine',
        desc: 'Instant keyword, SKU, and category filtering across thousands of certified industrial components with zero page reloads.',
        icon: Search
      },
      {
        title: 'Automated PDF Quote Generator',
        desc: 'Compiles bill of materials, calculates live tier discounts and GST, and generates downloadable client-ready proposals in seconds.',
        icon: FileText
      },
      {
        title: 'Interactive Facility Safety Audit',
        desc: 'Custom self-audit checklist that helps safety managers calculate exact extinguisher and hydrant needs based on floor area.',
        icon: ShieldCheck
      },
      {
        title: 'Direct WhatsApp RFQ Dispatch',
        desc: 'One-click dispatch of itemized cart specifications directly to Shree Enterprise senior sales engineers for instant approval.',
        icon: Zap
      }
    ],
    deliverables: [
      'Interactive B2B Web Application',
      'High-Speed Catalog Indexing Engine',
      'Dynamic PDF Generation Microservice',
      'Mobile-Optimized Contractor Interface',
      'SEO Architecture for Industrial Hardware'
    ],
    testimonial: {
      quote: 'The sub-second search and automated quote generator completely transformed how our sales team operates. Contractors can generate verified itemized quotes in seconds instead of waiting days.',
      author: 'Ramesh Patel',
      role: 'Managing Director · Shree Enterprise',
      avatar: '/images/work/shree_enterprise_avatar.webp'
    }
  },

  'urban-nest': {
    slug: 'urban-nest',
    title: 'Urban Nest',
    subtitle: 'Enterprise PropTech Co-Living SaaS & Tenant Operations Portal',
    client: 'Urban Nest Co-Living & Hostels',
    location: 'Ahmedabad, Gujarat',
    year: '2025',
    category: 'PropTech SaaS & Multi-Property Platform',
    industry: 'Hospitality & Commercial Real Estate',
    heroImage: '/images/work/urban_nest_studio.webp',
    mockupUrl: 'https://urbannestpg.com',
    overview: 'A centralized multi-property management platform engineered to automate room availability, tenant onboarding, dynamic rent collection, and maintenance tracking across premium student co-living spaces.',
    background: 'Urban Nest operates premium co-living residences for students and young working professionals. Managing hundreds of beds across multiple properties with spreadsheets led to billing discrepancies, delayed rent receipts, and manual KYC overhead.',
    challenge: 'Tenant onboarding took over 30 minutes per student, rent tracking across bank UPI screenshots was error-prone, and facility maintenance requests were frequently lost in WhatsApp group chats.',
    solution: 'Engineered an end-to-end PropTech SaaS with a student booking storefront, automated KYC document upload, integrated payment reminders, and a unified operations portal for property wardens.',
    impact: 'Achieved 99.8% on-time automated rent collection, cut tenant check-in time from 30 minutes to 3 minutes, and streamlined maintenance ticketing across 350+ beds.',
    stats: [
      { label: 'On-Time Rent Rate', value: '99.8%', desc: 'Automated UPI payment reminders' },
      { label: 'Beds Managed', value: '350+', desc: 'Across 4 urban student properties' },
      { label: 'Check-In Duration', value: '3 min', desc: 'Digital KYC verification' },
      { label: 'Support Resolution', value: '<4 hrs', desc: 'Centralized maintenance dispatch' }
    ],
    stack: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Tailwind CSS', 'Razorpay'],
    features: [
      {
        title: 'Live Room & Bed Allocation Matrix',
        desc: 'Visual floor plan grid showing occupied, reserved, and available beds in real time across all properties.',
        icon: Layers
      },
      {
        title: 'Automated Rent Invoicing & Receipts',
        desc: 'Monthly billing runs with instant UPI payment links and automated GST-compliant digital rent receipts.',
        icon: Zap
      },
      {
        title: 'Digital Tenant KYC Onboarding',
        desc: 'Government ID verification, emergency contact logging, and digital lease agreement sign-off.',
        icon: ShieldCheck
      },
      {
        title: 'Maintenance Ticket Dispatch',
        desc: 'Tenants report room or electrical issues with photo attachments, auto-routed to on-duty technicians.',
        icon: Activity
      }
    ],
    deliverables: [
      'Property Management Administration Panel',
      'Tenant Mobile Web Portal',
      'Automated KYC & Digital Lease Workflow',
      'Payment Gateway Integration (Razorpay/UPI)',
      'Multi-Property Financial Reporting'
    ],
    testimonial: {
      quote: 'The PG management web portal replaced messy spreadsheets. Room allocations, rent receipts, and tenant verification now happen in seconds without paperwork.',
      author: 'Priya Dave',
      role: 'Operations Director · Urban Nest',
      avatar: '/images/work/urban_nest_avatar.webp'
    }
  },

  'vishal-masala': {
    slug: 'vishal-masala',
    title: 'Vishal Masala',
    subtitle: 'Direct Spice Distribution & Multi-Tier Wholesale B2B Commerce',
    client: 'Vishal Masala & Foods',
    location: 'Surat, Gujarat',
    year: '2024 - 2025',
    category: 'Headless E-Commerce & Wholesale B2B Engine',
    industry: 'FMCG & Food Processing',
    heroImage: '/images/work/vishal_masala_studio.webp',
    mockupUrl: 'https://vishalmasala.com',
    overview: 'A headless e-commerce storefront and regional distributor portal built for an established spice brand, providing real-time wholesale tier pricing, automated GST bulk invoicing, and sub-second retail browsing.',
    background: 'Vishal Masala manufactures pure ground spices and signature blended masalas. While their retail offline footprint was strong, their regional distributors and wholesale supermarket buyers had no digital ordering mechanism.',
    challenge: 'Distributors placed orders via unstructured phone calls and handwritten slips, creating billing discrepancies and stock allocation conflicts during seasonal harvest peaks.',
    solution: 'Built a dual-mode commerce application: a fast direct-to-consumer storefront and a secure distributor ordering hub with custom price tiers based on order volume and geographic zone.',
    impact: 'Increased monthly B2B order volume by 3.2x, reduced order processing time from 48 hours to under 20 minutes, and achieved a 0.8s mobile storefront loading speed.',
    stats: [
      { label: 'B2B Order Volume', value: '3.2x', desc: 'Growth in digital wholesale re-orders' },
      { label: 'Storefront Latency', value: '0.8s', desc: 'Sub-second mobile loading speed' },
      { label: 'Order Processing', value: '20 min', desc: 'Down from 48 hours manual billing' },
      { label: 'Product Catalog', value: '150+', desc: 'Retail and institutional SKUs' }
    ],
    stack: ['Next.js', 'React', 'Tailwind CSS', 'PostgreSQL', 'Stripe / Razorpay', 'Redis'],
    features: [
      {
        title: 'Tiered Wholesale Pricing Engine',
        desc: 'Automatically applies dynamic bulk discounts based on distributor tier, volume, and credit terms.',
        icon: Award
      },
      {
        title: 'Sub-Second Product Search',
        desc: 'Fuzzy search by regional spice names, packaging sizes, and blend specifications.',
        icon: Search
      },
      {
        title: 'Automated Tax & GST Compliance',
        desc: 'Instant invoice generation with HSN code mapping and state-wise IGST/CGST tax handling.',
        icon: FileText
      },
      {
        title: 'Real-Time Inventory Safeguard',
        desc: 'Prevents over-allocation by reserving stock during high-volume wholesale checkout sessions.',
        icon: Cpu
      }
    ],
    deliverables: [
      'Dual B2B & D2C Headless Storefront',
      'Distributor Portal with Account Management',
      'Real-Time Inventory Allocation Service',
      'Automated Billing & Invoice Dispatch',
      'Mobile Performance Optimization'
    ],
    testimonial: {
      quote: 'Our regional distributors can now place wholesale bulk spice orders 24/7 with instant tiered volume discounts, eliminating phone errors completely.',
      author: 'Vishal Shah',
      role: 'Founder · Vishal Masala',
      avatar: '/images/work/vishal_masala_avatar.webp'
    }
  },

  'laalo': {
    slug: 'laalo',
    title: 'Laalo',
    subtitle: 'Cinematic Theatrical Campaign Experience & Media Showcase',
    client: 'Laalo Film Productions',
    location: 'Mumbai / Ahmedabad',
    year: '2024',
    category: 'Immersive Media & Theatrical Campaign',
    industry: 'Media & Entertainment',
    heroImage: '/images/work/laalo_studio.webp',
    mockupUrl: 'https://laalofilm.com',
    overview: 'An experiential cinematic landing page engineered to anchor the theatrical campaign of the movie "Laalo", featuring high-bitrate video trailers, actor filmographies, press kits, and ticketing platform handoffs.',
    background: 'Promoting a major theatrical release requires a digital home that matches the visual grandeur of the cinema screen while handling sudden viral traffic spikes during trailer drops.',
    challenge: 'Standard promotional websites suffered from choppy video playback, poor mobile responsiveness, and crashed under sudden surges of social media traffic on trailer release day.',
    solution: 'Engineered an ultra-fast, video-first web experience backed by global CDN edge streaming, interactive soundscapes, smooth 60fps scroll transitions, and instant BookMyShow / cinema ticketing links.',
    impact: 'Streamed over 180,000+ trailer views on launch day with 0% downtime and maintained a 98+ Core Web Vitals score across mobile devices.',
    stats: [
      { label: 'First Day Streams', value: '180k+', desc: 'Zero buffering via global CDN' },
      { label: 'Uptime on Launch', value: '100%', desc: 'Handled viral traffic spike flawlessly' },
      { label: 'Frame Rate', value: '60fps', desc: 'Hardware-accelerated fluid motion' },
      { label: 'Performance Score', value: '98+', desc: 'Core Web Vitals on mobile' }
    ],
    stack: ['React', 'WebGL', 'Video CDN', 'Tailwind CSS', 'Framer Motion', 'Vercel Edge'],
    features: [
      {
        title: 'Adaptive Bitrate Video Player',
        desc: 'Seamlessly shifts trailer video quality based on the viewer\'s network speed for instant zero-buffer playback.',
        icon: Zap
      },
      {
        title: '60fps Interactive Theatrical Timeline',
        desc: 'Rich interactive storytelling showcasing behind-the-scenes footage, character reveals, and director notes.',
        icon: Sparkles
      },
      {
        title: 'Instant Cinema Ticket Booking Links',
        desc: 'Geolocation-based handoff to BookMyShow and regional cinema chains for instant seat reservation.',
        icon: ExternalLink
      },
      {
        title: 'High-Resolution Press & Media Kit',
        desc: 'Fast downloadable media assets, official posters, and production stills for journalists and film critics.',
        icon: FileText
      }
    ],
    deliverables: [
      'Interactive Cinematic Web Experience',
      'High-Bitrate CDN Video Streaming Engine',
      'Press Kit & Media Asset Repository',
      'Ticketing Platform Deep-Links',
      'Viral Traffic Scaling Infrastructure'
    ]
  }
};

export default function WorkDetailPage() {
  const { slug } = useParams<{ slug: string }>();

  // Scroll to top on navigation
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [slug]);

  // If slug is mehta-dairy, delegate directly to the specialized MehtaDairyCaseStudyPage
  if (slug === 'mehta-dairy') {
    return <MehtaDairyCaseStudyPage />;
  }

  const project = slug ? PROJECTS_DATA[slug] : null;

  // If project slug not found, redirect to main /work directory
  if (!project) {
    return (
      <div className="min-h-screen bg-[#08090A] text-white flex flex-col justify-between">
        <RwHeader />
        <div className="max-w-xl mx-auto px-6 py-32 text-center">
          <div className="w-16 h-16 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center mx-auto mb-6 text-[#D4FF3A]">
            <Search size={28} />
          </div>
          <h1 className="text-3xl font-extrabold text-white mb-3">Case Study Not Found</h1>
          <p className="text-white/60 text-sm mb-8">
            The project "{slug}" could not be located in our verified case study index.
          </p>
          <Link
            to="/work"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#D4FF3A] hover:bg-[#b8e620] text-[#08090A] font-bold text-xs uppercase tracking-wider transition-all"
          >
            <ArrowLeft size={16} />
            <span>Browse All Case Studies</span>
          </Link>
        </div>
        <RwFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#08090A] text-white selection:bg-[#D4FF3A] selection:text-[#08090A]">
      <SEO
        title={`${project.title} Case Study | ${project.subtitle} | Optenary`}
        description={project.overview}
        canonicalPath={`/work/${project.slug}`}
      />

      <RwHeader />

      <main className="pt-28 md:pt-36">
        {/* ── Breadcrumbs ─────────────────────────────────────────────────── */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 mb-8">
          <Breadcrumbs
            items={[
              { name: 'Work', path: '/work' },
              { name: project.title, path: `/work/${project.slug}` }
            ]}
          />
        </div>

        {/* ── Hero Section ────────────────────────────────────────────────── */}
        <section className="px-6 md:px-12 max-w-7xl mx-auto pb-16">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-[#D4FF3A] uppercase tracking-wider mb-6"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4FF3A] animate-pulse" />
              <span>Verified Case Study · {project.industry}</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-extrabold text-white tracking-tight leading-[1.08] mb-6"
            >
              {project.title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl text-white/70 font-normal leading-relaxed mb-8"
            >
              {project.subtitle}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap items-center gap-4 mb-12"
            >
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#D4FF3A] hover:bg-[#b8e620] text-[#08090A] font-extrabold text-xs uppercase tracking-wider transition-all shadow-[0_0_24px_rgba(212,255,58,0.25)]"
                >
                  <span>View Live Website</span>
                  <ExternalLink size={15} />
                </a>
              )}

              <a
                href="#case-study-details"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-white font-bold text-xs uppercase tracking-wider transition-all"
              >
                <span>Read Full Breakdown</span>
                <ArrowRight size={14} />
              </a>
            </motion.div>

            {/* Hero Browser Mockup Frame */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="rounded-3xl border border-white/10 bg-[#111417] overflow-hidden shadow-2xl relative group"
            >
              {/* Browser mockup header */}
              <div className="h-10 bg-[#16191c] border-b border-white/10 flex items-center px-4 gap-2">
                <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
                <div className="mx-auto bg-black/50 border border-white/5 rounded-md px-4 py-1 text-[11px] font-mono text-white/50 max-w-sm truncate text-center">
                  {project.mockupUrl || `https://${project.slug}.com`}
                </div>
              </div>
              <img
                src={project.heroImage}
                alt={`${project.title} Interface Showcase`}
                className="w-full h-auto object-cover object-top"
                loading="eager"
              />
            </motion.div>
          </div>
        </section>

        {/* ── Key Project Matrix ──────────────────────────────────────────── */}
        <section id="case-study-details" className="py-14 px-6 md:px-12 bg-[#0c0e11] border-y border-white/[0.06]">
          <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
              <span className="text-[11px] text-[#D4FF3A] uppercase font-mono font-bold tracking-wider block mb-1">Client Record</span>
              <h3 className="text-xl font-bold text-white mb-1">{project.client}</h3>
              <p className="text-xs text-white/50">{project.location}</p>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
              <span className="text-[11px] text-[#D4FF3A] uppercase font-mono font-bold tracking-wider block mb-1">Architecture Category</span>
              <h3 className="text-lg font-bold text-white mb-1 leading-snug">{project.category}</h3>
              <p className="text-xs text-white/50">{project.year}</p>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
              <span className="text-[11px] text-[#D4FF3A] uppercase font-mono font-bold tracking-wider block mb-1">Deployment Status</span>
              {project.liveUrl ? (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg font-bold text-[#D4FF3A] hover:underline block truncate"
                >
                  {project.liveUrl.replace('https://', '')}
                </a>
              ) : (
                <span className="text-lg font-bold text-white block">Enterprise Deployment</span>
              )}
              <p className="text-xs text-white/50">Verified Production Release</p>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
              <span className="text-[11px] text-[#D4FF3A] uppercase font-mono font-bold tracking-wider block mb-1">Core Tech Stack</span>
              <div className="flex flex-wrap gap-1.5 mt-1">
                {project.stack.slice(0, 4).map((tech) => (
                  <span key={tech} className="px-2 py-0.5 rounded bg-white/[0.06] text-[11px] font-mono text-white/80">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Executive Summary & Engineering Story ───────────────────────── */}
        <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#D4FF3A]">
                01 / Background & Architecture
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white leading-tight">
                Modernizing Traditional Operations with Intelligent Engineering
              </h2>
              <p className="text-white/70 text-base leading-relaxed">
                {project.background}
              </p>
              <p className="text-white/70 text-base leading-relaxed">
                {project.overview}
              </p>

              <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                  <h4 className="text-sm font-bold text-white mb-1">Target Audience</h4>
                  <p className="text-xs text-white/50 leading-relaxed">Enterprise buyers, industrial contractors, and procurement officers.</p>
                </div>
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                  <h4 className="text-sm font-bold text-white mb-1">Architecture Mode</h4>
                  <p className="text-xs text-white/50 leading-relaxed">Headless, responsive web platform with edge caching and instant search.</p>
                </div>
              </div>
            </div>

            {/* Metrics Showcase Card */}
            <div className="lg:col-span-5 bg-gradient-to-br from-white/[0.04] to-transparent border border-white/10 rounded-3xl p-8 space-y-6 shadow-2xl">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#D4FF3A]">
                Measured Performance Impact
              </span>
              <div className="grid grid-cols-2 gap-6">
                {project.stats.map((s, idx) => (
                  <div key={idx} className="space-y-1">
                    <span className="text-3xl md:text-4xl font-black text-white tracking-tight">
                      {s.value}
                    </span>
                    <p className="text-xs font-bold text-white/90">{s.label}</p>
                    <p className="text-[11px] text-white/40 leading-snug">{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Challenge vs Solution ───────────────────────────────────────── */}
        <section className="py-20 px-6 md:px-12 bg-[#0c0e11] border-y border-white/[0.06]">
          <div className="max-w-7xl mx-auto space-y-12">
            <div className="max-w-2xl">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#D4FF3A]">
                02 / The Challenge vs The Solution
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white mt-2">
                Eliminating Operational Friction
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-8 rounded-3xl bg-red-950/10 border border-red-500/20 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 text-red-400 text-xs font-mono font-bold uppercase">
                  <span>The Bottleneck</span>
                </div>
                <h3 className="text-xl font-bold text-white">Manual, Time-Consuming Workflows</h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  {project.challenge}
                </p>
              </div>

              <div className="p-8 rounded-3xl bg-[#D4FF3A]/[0.03] border border-[#D4FF3A]/20 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4FF3A]/10 text-[#D4FF3A] text-xs font-mono font-bold uppercase">
                  <span>The Solution</span>
                </div>
                <h3 className="text-xl font-bold text-white">Automated, High-Speed Platform</h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  {project.solution}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Core Engineering Features ───────────────────────────────────── */}
        <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto">
          <div className="max-w-2xl mb-12">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#D4FF3A]">
              03 / System Architecture & Features
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mt-2">
              Engineered for Enterprise Reliability
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {project.features.map((feat, idx) => {
              const IconComp = feat.icon;
              return (
                <div key={idx} className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-white/20 transition-all flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#D4FF3A]/10 border border-[#D4FF3A]/20 flex items-center justify-center text-[#D4FF3A] shrink-0 mt-0.5">
                    <IconComp size={20} />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white mb-1.5">{feat.title}</h4>
                    <p className="text-xs text-white/60 leading-relaxed">{feat.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── Client Testimonial ──────────────────────────────────────────── */}
        {project.testimonial && (
          <section className="py-20 px-6 md:px-12 bg-[#0c0e11] border-y border-white/[0.06]">
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <div className="w-12 h-12 rounded-full bg-[#D4FF3A]/10 border border-[#D4FF3A]/20 flex items-center justify-center mx-auto text-[#D4FF3A]">
                <Award size={22} />
              </div>
              <blockquote className="text-xl md:text-2xl font-medium text-white/90 leading-relaxed italic">
                "{project.testimonial.quote}"
              </blockquote>
              <div className="pt-2 flex items-center justify-center gap-3">
                {project.testimonial.avatar && (
                  <img
                    src={project.testimonial.avatar}
                    alt={project.testimonial.author}
                    className="w-10 h-10 rounded-full border border-white/20 object-cover"
                  />
                )}
                <div className="text-left">
                  <p className="text-sm font-bold text-white">{project.testimonial.author}</p>
                  <p className="text-xs text-white/50">{project.testimonial.role}</p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ── Deliverables Summary ────────────────────────────────────────── */}
        <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto">
          <div className="p-8 md:p-12 rounded-3xl bg-white/[0.02] border border-white/[0.06] flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div className="space-y-2 max-w-xl">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#D4FF3A]">
                Scope of Work & Deliverables
              </span>
              <h3 className="text-2xl font-bold text-white">Full-Stack Production Delivery</h3>
              <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
                {project.deliverables.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-white/70">
                    <CheckCircle2 size={14} className="text-[#D4FF3A] shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-full bg-[#D4FF3A] hover:bg-[#b8e620] text-[#08090A] font-extrabold text-xs uppercase tracking-wider transition-all whitespace-nowrap shadow-[0_0_20px_rgba(212,255,58,0.2)]"
              >
                <span>Launch Live Site ↗</span>
              </a>
            )}
          </div>
        </section>

        {/* ── Global Call to Action ───────────────────────────────────────── */}
        <RwCta />
      </main>

      <RwFooter />
    </div>
  );
}
