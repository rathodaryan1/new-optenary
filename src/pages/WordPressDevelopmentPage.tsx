import { motion } from 'framer-motion';
import { 
  Cpu, 
  ShieldCheck, 
  Zap, 
  Layout, 
  Headphones, 
  Network 
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Portfolio from '../components/Portfolio';
import Contact from '../components/Contact';
import SEO from '../components/SEO';
import ServiceFAQ from '../components/ServiceFAQ';

const wpFaqs = [
  { q: 'Is WordPress good for SEO?', a: 'WordPress is one of the most SEO-friendly platforms when properly configured. With the right theme, caching, image optimization, and an SEO plugin like Rank Math or Yoast, WordPress sites consistently rank at the top of search results.' },
  { q: 'Can you build a custom WordPress plugin for us?', a: 'Yes. We build custom plugins for any functionality — custom booking systems, payment gateways, membership portals, API integrations, or dashboard widgets. All code is well-documented and yours to keep.' },
  { q: 'How secure is a WordPress website you build?', a: 'We harden every WordPress site we build: no default admin usernames, 2FA, a WAF, automatic backups, SSL, and regular security scans. We also remove all unused plugins and themes that create attack surfaces.' },
  { q: 'Can you migrate my website to WordPress from another platform?', a: 'Yes. We migrate from Squarespace, Wix, Webflow, Joomla, Drupal, and custom-built websites to WordPress. We preserve all content, SEO rankings, and redirect old URLs properly.' },
  { q: 'Will I be able to update content myself after the site is built?', a: 'Absolutely. WordPress’s Gutenberg editor is user-friendly. We also provide a video walkthrough and documentation so your team can manage pages, blogs, and media without needing a developer.' },
];

export default function WordPressDevelopmentPage() {
  const wpSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://optenary.in/services/wordpress-development#webpage",
        "url": "https://optenary.in/services/wordpress-development",
        "name": "WordPress Development Services | Optenary",
        "isPartOf": {
          "@id": "https://optenary.in/#website"
        }
      },
      {
        "@type": "Service",
        "name": "WordPress & WooCommerce Development Services",
        "description": "Optenary builds premium custom WordPress themes, custom Gutenberg React blocks, and secure, high-speed WooCommerce shopping storefronts.",
        "provider": {
          "@id": "https://optenary.in/#organization"
        },
        "areaServed": "Global",
        "serviceType": "WordPress Development"
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://optenary.in/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "WordPress Development",
            "item": "https://optenary.in/services/wordpress-development"
          }
        ]
      }
    ]
  };

  const whatWeBuild = [
    {
      num: "01",
      title: "Custom WordPress Themes",
      quote: "A custom WordPress theme gives you full control over design and code quality, ensuring your site is blazing fast and unique.",
      text: "Pixel-perfect theme designs written from scratch, avoiding heavy third-party page builders for maximum performance. We build exactly what your brand needs without the bloat.",
      bestFor: "Brands seeking a high-performance website with unique aesthetics and zero code bloat."
    },
    {
      num: "02",
      title: "WooCommerce Engines",
      quote: "WooCommerce turns WordPress into a fully-fledged e-commerce platform that you fully own and control.",
      text: "Scalable online stores featuring custom cart drawers, billing systems, and optimized checkout pipelines. We architect WooCommerce to handle thousands of products without slowing down.",
      bestFor: "E-commerce brands wanting complete ownership of their data and custom checkout flows."
    },
    {
      num: "03",
      title: "Headless WordPress",
      quote: "Headless WordPress decouples the frontend from the backend, giving you the ultimate flexibility in performance and security.",
      text: "Decoupled web applications using React/Next.js frontends with WordPress REST and WPGraphQL backends. This provides lightning-fast page loads and ultimate security.",
      bestFor: "Enterprise websites and publishers requiring maximum speed and omnichannel content delivery."
    },
    {
      num: "04",
      title: "Custom Gutenberg Blocks",
      quote: "Gutenberg blocks empower your marketing team to build complex layouts visually, without touching a single line of code.",
      text: "Tailored React block components allowing editors to build pages with customized brand guidelines. Say goodbye to messy shortcodes and hello to a seamless drag-and-drop experience.",
      bestFor: "Content-heavy sites needing strict design consistency while giving editors flexibility."
    },
    {
      num: "05",
      title: "Enterprise Multi-Sites",
      quote: "WordPress Multisite allows you to manage a network of sites from a single centralized dashboard.",
      text: "Complex networks of regional sites, multi-lingual portals, and subsidiary blogs managed under a single dashboard. We structure multisite networks to share assets securely and scale infinitely.",
      bestFor: "Global brands, franchises, or universities needing to manage multiple distinct websites."
    },
    {
      num: "06",
      title: "Secure Hosting Clusters",
      quote: "Enterprise-grade hosting architecture is the backbone of a reliable, high-traffic WordPress application.",
      text: "Setting up WP Engine, Kinsta, or AWS cloud clusters with Redis cache layers and server level firewalls. We ensure your site stays online, fast, and secure during the heaviest traffic spikes.",
      bestFor: "High-traffic publishers and large WooCommerce stores where downtime means lost revenue."
    }
  ];



  const whyChooseUsWP = [
    {
      title: "Engineered page speed",
      desc: "We write clean CSS and modular PHP codes, achieving page load times below 2 seconds without bloated plugin setups.",
      icon: Cpu
    },
    {
      title: "Hardened WordPress security",
      desc: "Securing wp-login dashboards, scheduling automated database sweeps, and setting up strict Cloudflare firewall rules.",
      icon: ShieldCheck
    },
    {
      title: "Scalable WooCommerce caches",
      desc: "Using Redis object caching to handle bulk catalog database operations and checkout spikes smoothly.",
      icon: Zap
    },
    {
      title: "User-friendly Gutenberg UI",
      desc: "We craft visual controls in the block editor, allowing your editors to alter page copies and layouts easily.",
      icon: Layout
    },
    {
      title: "Security & plugin monitoring",
      desc: "We provide weekly updates, vulnerability patches, database optimization sweeps, and 24/7 server support.",
      icon: Headphones
    },
    {
      title: "Decoupled headless frameworks",
      desc: "Combining the editing experience of WordPress with Next.js/React templates for secure e-commerce systems.",
      icon: Network
    }
  ];

  return (
    <div className="min-h-screen bg-dark-bg text-white selection:bg-brand-orange selection:text-dark-bg antialiased flex flex-col justify-between">
      <SEO 
        title="WordPress Development Services | Optenary"
        description="Custom WordPress development services including custom theme engineering, Elementor builds, headless WordPress setups, and secure enterprise migrations."
        keywords="WordPress development agency, custom WordPress theme, WooCommerce developer, Gutenberg block editor, headless WordPress, custom PHP CMS"
        canonicalPath="/services/wordpress-development"
        schema={wpSchema}
      />
      <Header />

      <main>
        {/* Hero */}
        <section className="relative min-h-[75vh] flex items-center justify-center overflow-hidden py-24 px-6 md:px-12 bg-dark-bg">
          <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-brand-orange/10 blur-[120px] pointer-events-none" />
          <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-96 h-96 rounded-full bg-brand-orange/5 blur-[150px] pointer-events-none" />

          <div className="max-w-5xl mx-auto text-center relative z-10">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1] mb-6"
            >
              Custom WordPress & <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-brand-orangeLight">
                WooCommerce Development Services
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="text-base md:text-xl text-dark-muted font-medium max-w-4xl mx-auto leading-relaxed mb-10"
            >
              We engineer custom WordPress and WooCommerce platforms built for speed and security. Avoiding heavy pre-made builders, we write clean PHP code, React-backed Gutenberg blocks, and headless WP implementations to deliver stable, scalable CMS setups.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <a 
                href="/contact" 
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-brand-orange hover:bg-brand-orangeDark text-dark-bg font-bold uppercase tracking-wider text-sm transition-all transform hover:-translate-y-1 shadow-glow"
              >
                Book a Call
              </a>
              <a 
                href="#why-choose-wp" 
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-dark-card hover:bg-dark-light border border-dark-border hover:border-brand-orange text-white font-bold uppercase tracking-wider text-sm transition-all transform hover:-translate-y-1"
              >
                Why WordPress?
              </a>
            </motion.div>
          </div>
        </section>

        {/* Global Partner Section */}
        <section className="bg-[#050607] py-20 px-6 md:px-12 border-y border-dark-border/40 relative">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-4xl font-extrabold text-white mb-6">
              WordPress & WooCommerce <span className="text-brand-orange">Partner Worldwide</span>
            </h2>
            <p className="text-sm md:text-base text-dark-muted leading-relaxed">
              Optenary delivers secure enterprise-grade WordPress development services with custom databases, headless integrations, and WooCommerce checkouts. We keep CMS systems protected with automated security auditing and hosting configuration updates. For clients looking for other e-commerce setups, we also provide <a href="/services/shopify-development" className="text-brand-orange hover:underline font-semibold">custom Shopify stores</a> and specialized database-driven <a href="/services/custom-ecommerce-development" className="text-brand-orange hover:underline font-semibold">custom e-commerce platforms</a>.
            </p>
          </div>
        </section>

        {/* What We Build (Zig-Zag) */}
        <section className="bg-dark-bg py-24 px-6 md:px-12 relative overflow-hidden">
          <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-80 h-80 rounded-full bg-brand-orange/5 blur-[120px] pointer-events-none" />

          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-extrabold text-white mt-2 mb-6">
                WordPress & WooCommerce Solutions We Deliver
              </h2>
              <p className="text-dark-muted max-w-4xl mx-auto text-sm md:text-base leading-relaxed">
                As a premium WordPress development agency, we engineer scalable, lightning-fast solutions—whether you need a custom theme, a robust WooCommerce store, or a high-performance headless architecture. Here is every solution we deliver within our WordPress development services:
              </p>
            </div>

            {/* Premium Card Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10">
              {whatWeBuild.map((step, index) => (
                <div key={index} className="group relative p-8 md:p-10 rounded-[2rem] bg-dark-card/30 backdrop-blur-md border border-dark-border hover:border-brand-orange/40 transition-all duration-500 overflow-hidden shadow-sm hover:shadow-glow flex flex-col h-full">
                  {/* Large background number */}
                  <div className="absolute -top-6 -right-4 text-[120px] font-black text-white/[0.03] group-hover:text-brand-orange/[0.05] transition-colors duration-700 pointer-events-none select-none">
                    {step.num}
                  </div>
                  
                  <div className="relative z-10 flex flex-col h-full">
                    <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-6 pr-12">{step.title}</h3>
                    
                    <div className="pl-5 border-l-2 border-brand-orange mb-6">
                      <p className="text-brand-orangeLight italic font-medium text-sm leading-relaxed">
                        "{step.quote}"
                      </p>
                    </div>
                    
                    <p className="text-dark-muted text-sm md:text-base leading-relaxed mb-8 flex-grow">
                      {step.text}
                    </p>
                    
                    <div className="inline-flex flex-col sm:flex-row sm:items-center gap-3 px-5 py-3 rounded-2xl bg-[#1A1D21]/80 border border-dark-border/60 backdrop-blur-sm mt-auto">
                      <span className="text-brand-orange font-black text-[10px] tracking-widest uppercase shrink-0">
                        BEST FOR
                      </span>
                      <span className="text-white/90 text-xs md:text-sm font-medium leading-relaxed">
                        {step.bestFor}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>



          </div>
        </section>

        {/* Why Choose Us */}
        <section id="why-choose-wp" className="bg-[#050607] py-24 px-6 md:px-12 relative border-y border-dark-border/40">
          <div className="absolute top-10 right-10 w-72 h-72 rounded-full bg-brand-orange/5 blur-[120px] pointer-events-none" />

          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4">
                Why Choose Optenary for <span className="text-brand-orange">WordPress Portals</span>
              </h2>
              <p className="text-dark-muted max-w-3xl mx-auto text-sm md:text-base leading-relaxed">
                We combine native custom blocks, headless Next.js frontends, and optimized WooCommerce caching layers to build e-commerce solutions that scale.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
              {whyChooseUsWP.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div 
                    key={index}
                    whileHover={{ y: -5 }}
                    className="p-6 rounded-2xl bg-dark-card/40 border border-dark-border/60 hover:border-brand-orange/20 transition-all flex flex-col gap-4 shadow-glow"
                  >
                    <div className="w-10 h-10 rounded-xl bg-brand-orange/10 border border-brand-orange/20 flex items-center justify-center text-brand-orange shrink-0">
                      <Icon size={18} />
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-sm md:text-base mb-2">
                        {item.title}
                      </h3>
                      <p className="text-xs md:text-sm text-dark-muted leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Portfolio, CTA, Contact */}
        <Portfolio />

        <section className="bg-dark-bg py-16 px-6 md:px-12 relative overflow-hidden">
          <div className="max-w-5xl mx-auto rounded-3xl bg-gradient-to-r from-brand-orange to-brand-orangeDark p-10 md:p-14 text-center relative shadow-glow-large">
            <h2 className="text-2xl md:text-4xl font-extrabold text-white mb-4 leading-tight">
              Create a custom WordPress solution <br className="sm:hidden" /> optimized for speed.
            </h2>
            <p className="text-sm md:text-base text-white/80 max-w-xl mx-auto mb-8">
              We write custom Gutenberg React blocks, optimize database structures, and configure staging servers.
            </p>
            <a href="/contact" className="inline-flex px-8 py-4 rounded-xl bg-white hover:bg-white/90 text-brand-orange font-bold uppercase tracking-wider text-xs transition-colors shadow-glow">
              Book a Discovery Call
            </a>
          </div>
        </section>

        <ServiceFAQ faqs={wpFaqs} title="WordPress Development FAQs" />

        <Contact />
      </main>

      <Footer />
    </div>
  );
}
