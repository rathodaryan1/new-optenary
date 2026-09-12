import { motion } from 'framer-motion';
import { 
  Cpu, 
  ShieldCheck, 
  Zap, 
  Layout, 
  Headphones, 
  Network,
  Receipt,
  ShoppingCart,
  Building2,
  Smartphone
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Portfolio from '../components/Portfolio';
import Contact from '../components/Contact';
import SEO from '../components/SEO';
import ServiceFAQ from '../components/ServiceFAQ';
import Breadcrumbs from '../components/Breadcrumbs';

const ecommFaqs = [
  { q: 'Why build a custom e-commerce platform instead of using Shopify or WooCommerce?', a: 'Custom e-commerce is ideal when you need unique checkout flows, multi-vendor marketplaces, complex pricing logic, or deep ERP/CRM integrations that off-the-shelf platforms can’t support without expensive workarounds.' },
  { q: 'Can you integrate multiple payment gateways (Razorpay, Stripe, PayU)?', a: 'Yes. We integrate any payment gateway. We also support split payments, subscriptions, EMI options, international currencies, and UPI — all in a single checkout flow.' },
  { q: 'How do you handle inventory management in a custom e-commerce build?', a: 'We build custom inventory modules or integrate with tools like Unicommerce, Increff, or Zoho Inventory. Real-time stock updates, low-stock alerts, and multi-warehouse management are standard.' },
  { q: 'Can the platform handle high traffic during sales events?', a: 'Yes. We architect custom stores on cloud infrastructure (AWS / GCP) with auto-scaling, CDN delivery, and database read replicas to handle traffic spikes during sales events without downtime.' },
  { q: 'Will the custom store have an admin panel to manage orders and products?', a: 'Every custom store we build includes a full admin dashboard — order management, product catalog, customer database, discount management, analytics, and role-based access control.' },
];

export default function CustomEcommercePage() {
  const ecommerceSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://optenary.in/services/custom-ecommerce-development#webpage",
        "url": "https://optenary.in/services/custom-ecommerce-development",
        "name": "Custom E-commerce Development | Optenary",
        "isPartOf": {
          "@id": "https://optenary.in/#website"
        }
      },
      {
        "@type": "Service",
        "name": "Custom E-Commerce Development Services",
        "description": "Optenary engineers custom headless e-commerce platforms, multi-vendor marketplaces, subscription systems, and Stripe payment gateway architectures.",
        "provider": {
          "@id": "https://optenary.in/#organization"
        },
        "areaServed": "Global",
        "serviceType": "E-Commerce Development"
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
            "name": "Custom E-Commerce Development",
            "item": "https://optenary.in/services/custom-ecommerce-development"
          }
        ]
      }
    ]
  };

  const whatWeBuild = [
    {
      num: "01",
      title: "Custom eCommerce Web Development",
      quote: "Custom ecommerce web development is the process of building an online store entirely from scratch - using a chosen technology stack rather than a pre-built platform - giving the business complete control over design, checkout logic, user experience, and every backend process.",
      text: "Our custom ecommerce website development services cover your entire commerce platform from the ground up - product catalogue architecture, custom checkout flow, payment gateway integration, order management system, and admin dashboard - built precisely around how your business operates, not around a platform's limitations.",
      bestFor: "Businesses with unique checkout logic, complex pricing rules, or user experience requirements that Shopify or WooCommerce cannot support out of the box."
    },
    {
      num: "02",
      title: "Multi-Vendor Marketplace Development",
      quote: "A multi-vendor marketplace is an ecommerce platform that allows multiple independent sellers to list, manage, and sell their products through a single storefront - with the platform owner managing the infrastructure, payments, and commission structure.",
      text: "We build marketplace platforms that handle everything a multi-vendor operation requires: seller onboarding and verification, individual seller dashboards, commission management, split payment processing, dispute resolution workflows, and buyer-facing search and filtering. Think Amazon or Flipkart - but built for your specific vertical and business model.",
      bestFor: "Businesses building a marketplace connecting multiple sellers to buyers, vertical commerce platforms, and aggregator models in any product category."
    },
    {
      num: "03",
      title: "B2B eCommerce Portal Development",
      quote: "A B2B ecommerce portal is a commerce platform built specifically for business-to-business transactions - supporting bulk ordering, customer-specific pricing tiers, account-based access, and procurement workflows that consumer-facing ecommerce platforms are not designed to handle.",
      text: "We build B2B commerce portals with the features enterprise buyers require: role-based account access, minimum order quantities, negotiated pricing per customer, purchase order management, credit terms, invoice generation, and ERP or CRM integration. Your B2B buyers get a buying experience as smooth as any consumer platform - without the operational compromises of adapting a consumer tool.",
      bestFor: "Manufacturers, wholesalers, distributors, and brands selling to retailers or business accounts with complex pricing and procurement requirements."
    },
    {
      num: "04",
      title: "Headless eCommerce Development",
      quote: "Headless ecommerce is an architecture where the storefront presentation layer (frontend) is completely decoupled from the commerce backend - allowing businesses to build any frontend experience they want while the backend handles all commerce logic independently via APIs.",
      text: "We architect and build headless commerce platforms using React and Next.js for the frontend, connected to a commerce backend via API - giving your marketing and design teams the freedom to build any experience without touching backend commerce systems. The result is faster page loads, greater design flexibility, and the ability to push your storefront across web, mobile, kiosk, or any channel from one backend.",
      bestFor: "High-traffic brands needing maximum frontend performance, enterprises running omnichannel commerce across multiple touchpoints, and businesses that have outgrown platform-based commerce constraints."
    },
    {
      num: "05",
      title: "Mobile Commerce App Development",
      quote: "A mobile commerce app is a dedicated iOS or Android application built specifically for ecommerce - giving customers a native mobile shopping experience with push notifications, in-app payments, personalised feeds, and offline browsing that a mobile website cannot fully replicate.",
      text: "We build custom mCommerce apps in Flutter and React Native - covering the full shopping journey: product discovery, wishlists, personalised recommendations, one-tap checkout with Razorpay or Stripe, order tracking, and loyalty programme integration. Your customers get a branded app experience on their home screen. You get a direct channel for push-notification marketing and repeat purchases.",
      bestFor: "D2C brands with repeat purchase products, fashion and lifestyle brands, and any ecommerce business ready to build a dedicated mobile audience."
    },
    {
      num: "06",
      title: "eCommerce Platform Migration & Rebuild",
      quote: "An ecommerce platform migration is the process of moving an existing online store - including all product data, customer records, order history, and SEO configurations - from a limiting platform or a legacy custom build to a new, more scalable architecture, with zero data loss.",
      text: "We manage the full migration or rebuild of existing ecommerce platforms - whether you are moving from a platform that has become too restrictive, rebuilding a legacy custom store with outdated architecture, or consolidating multiple storefronts into one unified platform. Every migration includes 301 redirect mapping to protect your SEO rankings, full data transfer, and a tested staging environment before go-live.",
      bestFor: "Businesses on legacy platforms, stores that have outgrown their current architecture, and brands consolidating multiple regional stores into one scalable platform."
    }
  ];

  const whoIsItFor = [
    {
      icon: Receipt,
      title: "Business With Unique Checkout or Pricing Logic",
      ifYouAre: "A company whose checkout involves custom pricing rules, volume discounts, B2B account pricing, subscription models, or a multi-step configuration process that standard platforms cannot support.",
      weHelpYou: "Build a checkout and pricing engine designed around your exact business rules - no workarounds, no third-party patches, no monthly app fees stacking up to fill the gaps."
    },
    {
      icon: ShoppingCart,
      title: "Marketplace or Aggregator Building From Scratch",
      ifYouAre: "Building a platform that connects multiple sellers with buyers - a vertical marketplace, a service aggregator, or a community-led commerce platform - and need full control over the commission, fulfilment, and dispute resolution architecture.",
      weHelpYou: "Design and build the complete marketplace infrastructure - seller management, buyer experience, payment splitting, and the admin layer that keeps the whole operation running."
    },
    {
      icon: Building2,
      title: "Enterprise or B2B Brand Replacing Legacy Systems",
      ifYouAre: "An established B2B business running on a legacy ecommerce platform, a custom-built system from 2015, or a mix of disconnected tools that require your sales team to manually process orders that should be self-serve.",
      weHelpYou: "Rebuild your commerce infrastructure on a modern stack with full ERP, CRM, and inventory system integration - so your B2B buyers can place, track, and manage orders without involving your sales team for every transaction."
    },
    {
      icon: Smartphone,
      title: "D2C Brand Ready for a Dedicated Mobile App",
      ifYouAre: "A D2C brand with a growing repeat-purchase customer base that is ready to move beyond a mobile website and invest in a branded native app experience for iOS and Android.",
      weHelpYou: "Build a Flutter-based mCommerce app with your full product catalogue, one-tap checkout, push notification campaigns, and a personalised feed - giving your customers a reason to open your app every day."
    },
    {
      icon: Zap,
      title: "High-Traffic Brand That Has Outgrown Its Platform",
      ifYouAre: "Running a store on Shopify, WooCommerce, or Magento that is hitting platform limits - whether that is checkout customisation ceilings, API rate limits, hosting performance under high traffic, or rising platform and app subscription costs that no longer make financial sense.",
      weHelpYou: "Architect a custom platform that handles your traffic, supports your exact feature requirements, and frees you from recurring platform fees - with full ownership of the codebase and roadmap."
    }
  ];



  const whyChooseUsCustom = [
    {
      title: "Zero platform boundaries",
      desc: "Build customized e-commerce modules, checkout features, and referral links without platform limitations.",
      icon: Cpu
    },
    {
      title: "PCI-compliant structures",
      desc: "Hardened checkout routing, tokenized client profiles, and secure SSL databases prevent database leaks.",
      icon: ShieldCheck
    },
    {
      title: "Optimized headless load",
      desc: "Next.js static site generation delivers catalog lists immediately, lowering page exit rates.",
      icon: Zap
    },
    {
      title: "Modular API controllers",
      desc: "API endpoints can be linked to third-party ERP channels, custom mobile applications, and sync hooks easily.",
      icon: Layout
    },
    {
      title: "24/7 server monitoring",
      desc: "Weekly code updates, load test inspections, and automatic backups protect backend processes.",
      icon: Headphones
    },
    {
      title: "Deep visual data grids",
      desc: "Configure admin panels showing inventory charts, transaction records, shipping metrics, and revenue details.",
      icon: Network
    }
  ];

  return (
    <div className="min-h-screen bg-dark-bg text-white selection:bg-brand-orange selection:text-dark-bg antialiased flex flex-col justify-between">
      <SEO 
        title="Custom Ecommerce Website Development Company | Optenary"
        description="Optenary is a custom ecommerce website development company engineering headless storefronts, multi-vendor marketplaces, B2B portals & custom checkouts."
        keywords="ecommerce website development, custom ecommerce development, custom ecommerce website development, headless commerce, B2B ecommerce portal, Optenary"
        canonicalPath="/services/custom-ecommerce-development"
        schema={ecommerceSchema}
      />
      <Header />

      <main>
        {/* Hero */}
        <section className="relative min-h-[75vh] flex items-center justify-center overflow-hidden py-24 px-6 md:px-12 bg-dark-bg">
          <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-brand-orange/10 blur-[120px] pointer-events-none" />
          <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-96 h-96 rounded-full bg-brand-orange/5 blur-[150px] pointer-events-none" />

          <div className="max-w-5xl mx-auto text-center relative z-10">
            <Breadcrumbs items={[{ name: 'Services' }, { name: 'Custom E-Commerce' }]} className="justify-center mb-6" />
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1] mb-6"
            >
              Custom Headless Commerce & <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-brand-orangeLight">
                High-Performance Transaction Engines
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="text-base md:text-xl text-dark-muted font-medium max-w-4xl mx-auto leading-relaxed mb-10"
            >
              We engineer custom e-commerce architectures designed to scale without limits or fees. From multi-vendor marketplace engines and headless checkouts to custom subscriptions and ERP integrations, we deliver robust, conversion-optimized retail platforms.
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
                href="#why-choose-custom" 
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-dark-card hover:bg-dark-light border border-dark-border hover:border-brand-orange text-white font-bold uppercase tracking-wider text-sm transition-all transform hover:-translate-y-1"
              >
                Why Custom E-Commerce?
              </a>
            </motion.div>
          </div>
        </section>

        {/* Global Partner Section */}
        <section className="bg-[#050607] py-20 px-6 md:px-12 border-y border-dark-border/40 relative">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-4xl font-extrabold text-white mb-6">
              Custom E-Commerce Development <span className="text-brand-orange">Partner Worldwide</span>
            </h2>
            <p className="text-sm md:text-base text-dark-muted leading-relaxed">
              Optenary designs robust custom store engines, high-speed API checkouts, and fully secure multi-vendor databases. We build architectures that load products and process payouts automatically without vendor fees or limits. For standard stores, we provide expert integration using <a href="/services/shopify-development" className="text-brand-orange hover:underline font-semibold">custom Shopify designs</a> and <a href="/services/wordpress-development" className="text-brand-orange hover:underline font-semibold">WordPress WooCommerce portals</a>.
            </p>
          </div>
        </section>

        {/* What We Build (Zig-Zag) */}
        <section className="bg-dark-bg py-24 px-6 md:px-12 relative overflow-hidden">
          <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-80 h-80 rounded-full bg-brand-orange/5 blur-[120px] pointer-events-none" />

          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-extrabold text-white mt-2 mb-6">
                What Does Optenary Build With Custom eCommerce?
              </h2>
              <p className="text-dark-muted max-w-4xl mx-auto text-sm md:text-base leading-relaxed">
                As a trusted custom ecommerce development company in India, Optenary builds commerce platforms 
                engineered around your specific business logic - whether you need a multi-vendor marketplace, a B2B ordering 
                portal, a headless storefront, or a fully custom mobile commerce app that no out-of-the-box platform can 
                replicate. Here is every solution we deliver within our custom ecommerce website development services:
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
            
            {/* "Is Custom eCommerce the Right Solution" Section */}
            <div className="mt-32 max-w-7xl mx-auto">
              <div className="text-center mb-10">
                <p className="text-sm text-dark-muted mb-8">
                  Looking for a managed Shopify store without the complexity of a fully custom build? Explore → <a href="/services/shopify-development" className="text-brand-orange hover:text-brand-orangeLight font-medium">Shopify Development</a>
                </p>
                <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-dark-card border border-dark-border mb-6">
                  <span className="text-xs font-semibold text-white/80 uppercase tracking-wider">Is This Right for You?</span>
                </div>
                <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6">
                  Is Custom eCommerce the Right Solution for Your Business?
                </h2>
                <p className="text-dark-muted max-w-4xl mx-auto text-sm md:text-base leading-relaxed">
                  Custom ecommerce development is the right choice for businesses whose selling model is too specific, too 
                  complex, or too competitive to be served by an off-the-shelf platform. It is not the right fit for businesses that are 
                  in early-stage validation, have a straightforward product catalogue, or need to launch in under 8 weeks - in those 
                  cases, Shopify is almost always the faster, smarter starting point. Here is who custom ecommerce development 
                  is genuinely built for:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {whoIsItFor.map((item, index) => {
                  const Icon = item.icon;
                  // For a 5-item array in a 3-col grid, the last two items can be centered or take up full space
                  const spanClass = (index >= 3 && whoIsItFor.length === 5) 
                    ? (index === 3 ? "lg:col-span-1 lg:col-start-1 md:col-span-1" : "lg:col-span-2 lg:col-start-2 md:col-span-1") 
                    : "";

                  return (
                    <div key={index} className={`p-8 rounded-[2rem] bg-dark-card/30 border border-dark-border hover:border-brand-orange/40 transition-all duration-300 shadow-sm hover:shadow-glow flex flex-col ${spanClass}`}>
                      <div className="w-12 h-12 rounded-xl bg-dark-bg border border-dark-border flex items-center justify-center text-brand-orange mb-6">
                        <Icon size={24} />
                      </div>
                      <h3 className="text-lg md:text-xl font-bold text-white mb-6">{item.title}</h3>
                      
                      <div className="mb-5 flex flex-col gap-2">
                        <span className="text-brand-orange font-black text-[10px] tracking-widest uppercase">IF YOU ARE</span>
                        <p className="text-sm text-white/90 leading-relaxed">{item.ifYouAre}</p>
                      </div>
                      
                      <div className="flex flex-col gap-2 mt-auto">
                        <span className="text-brand-orange font-black text-[10px] tracking-widest uppercase">WE HELP YOU</span>
                        <p className="text-sm text-dark-muted leading-relaxed">{item.weHelpYou}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Comparison Table Section */}
            <div className="mt-32 max-w-5xl mx-auto">
              <h2 className="text-2xl md:text-4xl font-extrabold text-white mb-6 text-center">
                Custom eCommerce vs Shopify - Which Is Right for You?
              </h2>
              <p className="text-dark-muted text-sm md:text-base leading-relaxed mb-10 text-center">
                Custom ecommerce gives you total control over complex workflows and logic, whereas Shopify gives you speed and a managed ecosystem. Here is the side-by-side comparison:
              </p>
              
              <div className="w-full bg-dark-card/20 rounded-[2rem] border border-dark-border/60 p-6 md:p-10 shadow-glow">
                {/* Header Row */}
                <div className="hidden md:grid grid-cols-12 gap-6 pb-6 border-b border-brand-orange/20 mb-2">
                  <div className="col-span-4 text-xs font-black text-dark-muted uppercase tracking-widest">Decision Factor</div>
                  <div className="col-span-4 text-xl font-extrabold text-brand-orange">Custom eCommerce</div>
                  <div className="col-span-4 text-xl font-extrabold text-white">Shopify</div>
                </div>
                
                {/* Rows */}
                <div className="flex flex-col gap-4 md:gap-0">
                  {[
                    { factor: "Launch Time", c: "3 to 6 months", s: "2 to 8 weeks" },
                    { factor: "Design Flexibility", c: "Unlimited", s: "High - within Shopify limits" },
                    { factor: "Checkout Control", c: "Complete control", s: "Standard - Shopify Plus is higher" },
                    { factor: "Business Logic", c: "Fully custom", s: "Platform rules apply" },
                    { factor: "Ongoing Cost", c: "Hosting & maintenance only", s: "Monthly platform fee plus apps" },
                    { factor: "Scalability", c: "Unlimited", s: "High" },
                    { factor: "Time to First Sale", c: "Longer", s: "Fast" },
                    { factor: "Best For", c: "Marketplace, B2B, complex ops", s: "D2C brands, product retail" },
                    { factor: "Ownership", c: "You own the full codebase", s: "Platform owned" }
                  ].map((row, i) => (
                    <div key={i} className="group flex flex-col md:grid md:grid-cols-12 gap-2 md:gap-6 py-4 md:py-6 border-b border-dark-border/40 hover:bg-white/[0.02] transition-colors rounded-xl md:rounded-none px-4 md:px-0 bg-dark-bg/40 md:bg-transparent">
                      <div className="col-span-4 flex items-center md:items-start">
                        <span className="text-white font-bold text-sm md:text-base">{row.factor}</span>
                      </div>
                      <div className="col-span-4 flex items-center">
                        <span className="md:hidden text-xs text-brand-orange font-bold uppercase tracking-wider mr-2 w-16">Custom:</span>
                        <span className="text-brand-orangeLight font-medium text-sm md:text-base">{row.c}</span>
                      </div>
                      <div className="col-span-4 flex items-center">
                        <span className="md:hidden text-xs text-white font-bold uppercase tracking-wider mr-2 w-16">Shopify:</span>
                        <span className="text-dark-muted group-hover:text-white/90 transition-colors text-sm md:text-base">{row.s}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>



          </div>
        </section>

        {/* Why Choose Us */}
        <section id="why-choose-custom" className="bg-[#050607] py-24 px-6 md:px-12 relative border-y border-dark-border/40">
          <div className="absolute top-10 right-10 w-72 h-72 rounded-full bg-brand-orange/5 blur-[120px] pointer-events-none" />

          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4">
                Why Choose Optenary for <span className="text-brand-orange">Custom E-Commerce</span>
              </h2>
              <p className="text-dark-muted max-w-3xl mx-auto text-sm md:text-base leading-relaxed">
                We combine React/Next.js storefront speeds, Stripe payment gateways, and Algolia/Elasticsearch indexing to build platforms without limits.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
              {whyChooseUsCustom.map((item, index) => {
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
              Build a custom e-commerce engine <br className="sm:hidden" /> built for high concurrency.
            </h2>
            <p className="text-sm md:text-base text-white/80 max-w-xl mx-auto mb-8">
              We design custom checkout controllers, map multi-vendor product grids, and deploy on AWS cluster clusters.
            </p>
            <a href="/contact" className="inline-flex px-8 py-4 rounded-xl bg-white hover:bg-white/90 text-brand-orange font-bold uppercase tracking-wider text-xs transition-colors shadow-glow">
              Book a Discovery Call
            </a>
          </div>
        </section>

        <ServiceFAQ faqs={ecommFaqs} title="Custom E-commerce FAQs" />

        <Contact />
      </main>

      <Footer />
    </div>
  );
}
