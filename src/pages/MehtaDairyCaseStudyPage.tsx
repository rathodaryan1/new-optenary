import { motion } from 'framer-motion';
import { 
  ShoppingCart, 
  CreditCard, 
  Smartphone, 
  Zap, 
  MessageSquare, 
  ShieldCheck, 
  Package, 
  UserCheck, 
  Search, 
  ExternalLink,
  Award,
  Clock,
  ArrowRight
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';
import Contact from '../components/Contact';
import { Link } from 'react-router-dom';

export default function MehtaDairyCaseStudyPage() {
  const caseStudySchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://optenary.in/projects/mehta-dairy#webpage",
        "url": "https://optenary.in/projects/mehta-dairy",
        "name": "Mehta Dairy E-Commerce Case Study | Optenary",
        "description": "Explore how Optenary engineered a custom, high-performance e-commerce platform for Mehta Dairy, digitalizing traditional sweets and farsan online.",
        "isPartOf": {
          "@id": "https://optenary.in/#website"
        }
      },
      {
        "@type": "CreativeWork",
        "@id": "https://optenary.in/projects/mehta-dairy#casestudy",
        "name": "Mehta Dairy E-Commerce Platform Case Study",
        "headline": "Digitalizing a 50+ Year Legacy Sweets & Farsan Merchant Online",
        "description": "Custom headless e-commerce website development for Mehta Dairy, featuring online shopping, UPI payments, WhatsApp integration, and mobile optimization.",
        "author": {
          "@id": "https://optenary.in/#organization"
        },
        "publisher": {
          "@id": "https://optenary.in/#organization"
        },
        "mainEntityOfPage": "https://optenary.in/projects/mehta-dairy",
        "about": {
          "@type": "Organization",
          "name": "Mehta Dairy",
          "url": "https://mehtadairy.com",
          "description": "Heritage Indian sweet & farsan merchant established in 1972 in Palitana, Gujarat."
        }
      }
    ]
  };

  const keyFeatures = [
    { title: "Online Shopping", desc: "Intuitive product selection with variant weight options (250g, 500g, 1kg) and pure cow ghee guarantees.", icon: ShoppingCart },
    { title: "Product Catalog", desc: "Structured categorization for sweets, dry fruit kachori, farsan, namkeen, and festive gift boxes.", icon: Search },
    { title: "Cart & Checkout", desc: "One-step frictionless cart with weight-based rate calculations and address validation.", icon: Package },
    { title: "Online Payments", desc: "Instant checkout integrated with Razorpay, UPI apps, Credit/Debit cards, and NetBanking.", icon: CreditCard },
    { title: "Order Management", desc: "Automated merchant order dashboard to streamline daily packing, dispatching, and invoicing.", icon: ShieldCheck },
    { title: "Delivery Tracking", desc: "Real-time dispatch updates and tracking notifications for customer orders pan-India.", icon: Clock },
    { title: "Customer Accounts", desc: "Secure account profiles for saved delivery addresses, order history, and quick reordering.", icon: UserCheck },
    { title: "WhatsApp Integration", desc: "Direct WhatsApp support and instant order status inquiries for customers.", icon: MessageSquare },
    { title: "Responsive Design", desc: "Mobile-first user interface optimized for smartphones, tablets, and desktop displays.", icon: Smartphone },
    { title: "Performance Optimization", desc: "Sub-1.2s page loads, image compression, CDN caching, and high-volume surge stability.", icon: Zap }
  ];

  const techStack = [
    "React 19", "Vite", "Node.js", "Tailwind CSS", 
    "Razorpay Payment Gateway", "WhatsApp Business API", "Vercel Edge Network"
  ];

  return (
    <div className="min-h-screen bg-dark-bg text-white selection:bg-brand-orange selection:text-dark-bg antialiased flex flex-col justify-between">
      <SEO
        title="Mehta Dairy E-Commerce Case Study | Optenary"
        description="Case study on Mehta Dairy's custom e-commerce website built by Optenary. Discover how we digitized a 50+ year legacy brand with online shopping, payments, and WhatsApp integration."
        keywords="mehta dairy case study, mehta dairy e-commerce, custom e-commerce web development, sweets website development, optenary case study, online sweet store India"
        canonicalPath="/projects/mehta-dairy"
        schema={caseStudySchema}
      />
      <Header />

      <main className="flex-grow pt-28">

        {/* ── Breadcrumb Header Section ───────────────────────────────────── */}
        <section className="px-6 md:px-12 max-w-7xl mx-auto w-full mb-8">
          <Breadcrumbs
            items={[
              { name: 'Projects', path: '/projects' },
              { name: 'Mehta Dairy Case Study' }
            ]}
          />
        </section>

        {/* ── Hero Showcase Section ────────────────────────────────────────── */}
        <section className="relative px-6 md:px-12 pb-16 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] rounded-full bg-brand-orange/10 blur-[180px] pointer-events-none" />

          <div className="max-w-7xl mx-auto relative z-10">
            {/* Status & Industry Badges */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-wrap items-center gap-2 mb-6"
            >
              <span className="px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Live / Completed Project
              </span>
              <span className="px-3.5 py-1 rounded-full bg-brand-orange/10 border border-brand-orange/20 text-brand-orange text-xs font-semibold uppercase tracking-wider">
                E-Commerce Website
              </span>
              <span className="px-3.5 py-1 rounded-full bg-dark-card border border-dark-border text-dark-muted text-xs font-semibold uppercase tracking-wider">
                FoodTech & Sweets Retail
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-6"
            >
              Bringing Mehta Dairy's Heritage Sweets &amp; Farsan{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-brand-orangeLight">
                Online Nationwide
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-dark-muted text-base md:text-xl leading-relaxed max-w-3xl mb-8"
            >
              A modern e-commerce website for Mehta Dairy, bringing traditional sweets, farsan and dairy products online with a premium, smooth and mobile-friendly shopping experience.
            </motion.p>

            {/* Live Link CTA */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap items-center gap-4 mb-12"
            >
              <a
                href="https://mehtadairy.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-brand-orange hover:bg-brand-orangeDark text-dark-bg font-extrabold text-xs uppercase tracking-wider transition-all shadow-glow"
              >
                <span>View Live Website</span>
                <ExternalLink size={15} />
              </a>

              <a
                href="#case-study-details"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-dark-card hover:bg-dark-light border border-dark-border text-white font-bold text-xs uppercase tracking-wider transition-all"
              >
                <span>Read Full Case Study</span>
                <ArrowRight size={14} />
              </a>
            </motion.div>

            {/* Hero Banner Screenshot */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="rounded-3xl border border-white/10 bg-dark-card overflow-hidden shadow-2xl relative group"
            >
              {/* Browser mockup header */}
              <div className="h-9 bg-[#16191c] border-b border-white/10 flex items-center px-4 gap-2">
                <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
                <div className="mx-auto bg-dark-bg/80 border border-white/5 rounded-md px-4 py-1 text-[11px] font-mono text-dark-muted">
                  https://mehtadairy.com
                </div>
              </div>
              <img
                src="/images/mehta_dairy.png"
                alt="Mehta Dairy E-Commerce Website Homepage Banner"
                className="w-full h-auto object-cover"
                loading="eager"
              />
            </motion.div>
          </div>
        </section>

        {/* ── Project Quick Stats & Overview Matrix ──────────────────────── */}
        <section id="case-study-details" className="py-16 px-6 md:px-12 bg-[#090b0c] border-y border-dark-border">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-dark-card/40 border border-white/5">
              <span className="text-xs text-brand-orange uppercase font-bold tracking-wider block mb-1">Client</span>
              <h3 className="text-xl font-bold text-white mb-1">Mehta Dairy</h3>
              <p className="text-xs text-dark-muted">Established in 1972, Palitana, Gujarat</p>
            </div>

            <div className="p-6 rounded-2xl bg-dark-card/40 border border-white/5">
              <span className="text-xs text-brand-orange uppercase font-bold tracking-wider block mb-1">Project Category</span>
              <h3 className="text-xl font-bold text-white mb-1">E-Commerce Website</h3>
              <p className="text-xs text-dark-muted">Direct-to-Consumer & Retail</p>
            </div>

            <div className="p-6 rounded-2xl bg-dark-card/40 border border-white/5">
              <span className="text-xs text-brand-orange uppercase font-bold tracking-wider block mb-1">Live URL</span>
              <a 
                href="https://mehtadairy.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-lg font-bold text-brand-orange hover:underline block truncate"
              >
                mehtadairy.com
              </a>
              <p className="text-xs text-dark-muted">Live & Operational</p>
            </div>

            <div className="p-6 rounded-2xl bg-dark-card/40 border border-white/5">
              <span className="text-xs text-brand-orange uppercase font-bold tracking-wider block mb-1">Services Delivered</span>
              <h3 className="text-sm font-bold text-white mb-1">Storefront & Checkout Systems</h3>
              <p className="text-xs text-dark-muted">Full-Stack Development & Optimization</p>
            </div>
          </div>
        </section>

        {/* ── Executive Summary & Brand Story ─────────────────────────────── */}
        <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-bold uppercase tracking-widest text-brand-orange">
                Background & Brand Story
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white leading-tight">
                A 50-Year Heritage Born in Palitana, Built for the Digital Era
              </h2>
              <p className="text-dark-muted text-base leading-relaxed">
                Established in 1972 in the sacred pilgrim town of Palitana, Gujarat, Mehta Dairy was founded on a simple promise: crafting authentic Indian sweets and farsan using 100% pure cow ghee and traditional recipes passed down through generations.
              </p>
              <p className="text-dark-muted text-base leading-relaxed">
                To expand their reach beyond physical retail branches and serve sweet lovers across India, Mehta Dairy partnered with Optenary to architect a modern e-commerce platform that combines traditional brand warmth with a smooth, high-converting digital shopping experience.
              </p>

              <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-3 p-4 rounded-xl bg-dark-card/50 border border-dark-border">
                  <Award className="text-brand-orange shrink-0 mt-1" size={20} />
                  <div>
                    <h4 className="text-sm font-bold text-white">Pure Ingredients Guarantee</h4>
                    <p className="text-xs text-dark-muted">100% pure cow ghee sweets handcrafted fresh daily.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 rounded-xl bg-dark-card/50 border border-dark-border">
                  <Smartphone className="text-brand-orange shrink-0 mt-1" size={20} />
                  <div>
                    <h4 className="text-sm font-bold text-white">Mobile-First Commerce</h4>
                    <p className="text-xs text-dark-muted">Effortless ordering on smartphones with instant UPI pay.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 flex justify-center">
              <div className="p-8 rounded-3xl bg-gradient-to-b from-[#181a1d] to-[#0d0f11] border border-white/10 text-center shadow-2xl relative w-full max-w-md">
                <div className="w-24 h-24 mx-auto mb-6 rounded-2xl bg-white/5 p-3 border border-white/10 flex items-center justify-center">
                  <img src="/images/mehta_logo.png" alt="Mehta Dairy Official Logo" className="max-h-full max-w-full object-contain" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Mehta Dairy &amp; Sweet Mart</h3>
                <p className="text-xs text-brand-orange font-semibold uppercase tracking-wider mb-4">Palitana • Gujarat • Pan-India Delivery</p>
                <div className="text-xs text-dark-muted border-t border-white/10 pt-4 space-y-2">
                  <div className="flex justify-between">
                    <span>Founded</span>
                    <span className="font-bold text-white">1972</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Specialty</span>
                    <span className="font-bold text-white">Handcrafted Ghee Sweets & Farsan</span>
                  </div>
                  <div className="flex justify-between">
                    <span>E-Commerce Launch</span>
                    <span className="font-bold text-white">Completed & Live</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Objectives, Challenges & Technical Solution ──────────────────── */}
        <section className="py-20 px-6 md:px-12 bg-[#090b0c] border-y border-dark-border">
          <div className="max-w-7xl mx-auto space-y-16">

            <div className="text-center max-w-3xl mx-auto">
              <span className="text-xs font-bold uppercase tracking-widest text-brand-orange">Engineering Case Study</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white mt-3">The Challenge &amp; Our Technical Solution</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Challenge */}
              <div className="p-8 rounded-3xl bg-dark-card/40 border border-dark-border space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 font-bold text-xl">
                  🚨
                </div>
                <h3 className="text-2xl font-bold text-white">The Challenge</h3>
                <p className="text-dark-muted text-sm leading-relaxed">
                  Traditional confectionery products carry unique digital commerce challenges that standard out-of-the-box e-commerce templates cannot satisfy:
                </p>
                <ul className="space-y-2.5 text-xs text-dark-muted">
                  <li className="flex items-start gap-2">
                    <span className="text-rose-400 font-bold">•</span>
                    <span><strong>Weight-Based Variants:</strong> Supporting multi-weight pricing options (250g, 500g, 1kg) per sweet item with dynamic cart adjustments.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-rose-400 font-bold">•</span>
                    <span><strong>High-Volume Surge Traffic:</strong> Sustaining fast performance during major Indian festival seasons (Diwali, Rakshabandhan) when order traffic spikes 10x.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-rose-400 font-bold">•</span>
                    <span><strong>Frictionless Payment Routing:</strong> Providing instant mobile UPI payments alongside cards and netbanking for high conversion across all demographics.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-rose-400 font-bold">•</span>
                    <span><strong>Direct Customer Communication:</strong> Connecting buyers directly to WhatsApp support for order tracking and custom corporate gift inquiries.</span>
                  </li>
                </ul>
              </div>

              {/* Solution */}
              <div className="p-8 rounded-3xl bg-dark-card/40 border border-dark-border space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold text-xl">
                  🛠️
                </div>
                <h3 className="text-2xl font-bold text-white">Our Technical Solution</h3>
                <p className="text-dark-muted text-sm leading-relaxed">
                  Optenary built a high-performance, responsive React e-commerce platform optimized for speed, search visibility, and customer conversion:
                </p>
                <ul className="space-y-2.5 text-xs text-dark-muted">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 font-bold">•</span>
                    <span><strong>High-Speed Front-End:</strong> Decoupled React + Vite storefront delivering sub-1.2s page loads and smooth client-side category filtering.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 font-bold">•</span>
                    <span><strong>Integrated Payment Gateway:</strong> Seamless checkout flow supporting Razorpay, GPay, PhonePe, Paytm UPI, and cards with instant confirmation.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 font-bold">•</span>
                    <span><strong>WhatsApp Order Assistant:</strong> One-click WhatsApp communication integration allowing instant order inquiries and customer service.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 font-bold">•</span>
                    <span><strong>Mobile-First UX:</strong> Fully responsive interface designed for optimal single-thumb navigation on smartphone screens.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ── Key Features Matrix (All 10 Key Features) ────────────────────── */}
        <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-orange">Platform Capabilities</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mt-3">Key Features Implemented</h2>
            <p className="text-dark-muted text-base mt-3">
              Every feature was designed to ensure a reliable, customer-centric shopping experience.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {keyFeatures.map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <div key={idx} className="p-6 rounded-2xl bg-dark-card/50 border border-dark-border hover:border-brand-orange/30 transition-all group">
                  <div className="w-10 h-10 rounded-xl bg-brand-orange/10 border border-brand-orange/20 flex items-center justify-center text-brand-orange mb-4 group-hover:scale-110 transition-transform">
                    <Icon size={20} />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{feat.title}</h3>
                  <p className="text-xs text-dark-muted leading-relaxed">{feat.desc}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── Real Screenshots Showcase ───────────────────────────────────── */}
        <section className="py-20 px-6 md:px-12 bg-[#090b0c] border-y border-dark-border">
          <div className="max-w-7xl mx-auto space-y-12">
            <div className="text-center max-w-3xl mx-auto">
              <span className="text-xs font-bold uppercase tracking-widest text-brand-orange">Visual Showcase</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white mt-3">Real Storefront &amp; Product Catalog Screenshots</h2>
              <p className="text-dark-muted text-base mt-2">Authentic live website interfaces shipped for Mehta Dairy.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="rounded-2xl border border-white/10 overflow-hidden bg-black shadow-xl">
                  <img src="/images/mehta_dairy.png" alt="Mehta Dairy Homepage Banner Screenshot" className="w-full h-auto object-cover" />
                </div>
                <h4 className="text-sm font-bold text-white text-center">Hero Banner &amp; Specialty Sweets Index</h4>
              </div>

              <div className="space-y-4">
                <div className="rounded-2xl border border-white/10 overflow-hidden bg-black shadow-xl">
                  <img src="/images/mehta_products.png" alt="Mehta Dairy Product Catalog Screenshot" className="w-full h-auto object-cover" />
                </div>
                <h4 className="text-sm font-bold text-white text-center">Interactive Product Catalog &amp; Category Filters</h4>
              </div>
            </div>
          </div>
        </section>

        {/* ── Tech Stack Specs ───────────────────────────────────────────── */}
        <section className="py-16 px-6 md:px-12 max-w-7xl mx-auto">
          <div className="p-8 rounded-3xl bg-dark-card/40 border border-dark-border flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-brand-orange">Technical Architecture</span>
              <h3 className="text-2xl font-bold text-white mt-1">Technologies Actually Used</h3>
              <p className="text-xs text-dark-muted mt-2">Engineered for security, mobile responsiveness, and high speed.</p>
            </div>

            <div className="flex flex-wrap gap-2">
              {techStack.map((tech, i) => (
                <span key={i} className="px-3 py-1.5 rounded-xl bg-dark-light border border-white/10 text-xs font-semibold text-white/90">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ── Related Services Cross Links ────────────────────────────────── */}
        <section className="py-16 px-6 md:px-12 bg-[#090b0c] border-t border-dark-border">
          <div className="max-w-7xl mx-auto text-center space-y-8">
            <h3 className="text-2xl font-bold text-white">Explore Relevant Optenary Services</h3>
            <div className="flex flex-wrap justify-center gap-4 text-xs font-bold uppercase tracking-wider">
              <Link to="/services/custom-ecommerce-development" className="px-5 py-3 rounded-xl bg-dark-card border border-dark-border hover:border-brand-orange text-white transition-all flex items-center gap-2">
                <span>Custom E-Commerce Development</span>
                <ArrowRight size={14} className="text-brand-orange" />
              </Link>
              <Link to="/services/web-development" className="px-5 py-3 rounded-xl bg-dark-card border border-dark-border hover:border-brand-orange text-white transition-all flex items-center gap-2">
                <span>Web Development Services</span>
                <ArrowRight size={14} className="text-brand-orange" />
              </Link>
              <Link to="/services/shopify-development" className="px-5 py-3 rounded-xl bg-dark-card border border-dark-border hover:border-brand-orange text-white transition-all flex items-center gap-2">
                <span>Shopify Development</span>
                <ArrowRight size={14} className="text-brand-orange" />
              </Link>
            </div>
          </div>
        </section>

        {/* ── CTA Contact Section ─────────────────────────────────────────── */}
        <Contact />

      </main>

      <Footer />
    </div>
  );
}
