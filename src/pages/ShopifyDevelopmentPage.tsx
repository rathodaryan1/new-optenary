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

const shopifyFaqs = [
  { q: 'Can you migrate my existing WooCommerce or Magento store to Shopify?', a: 'Yes. We handle full platform migrations including products, customer records, order history, and SEO URL mappings. We ensure zero downtime during the transition.' },
  { q: 'Do you build custom Shopify themes or use existing ones?', a: 'We do both. We can customize any premium Shopify theme or build a fully bespoke theme from scratch using Liquid, Tailwind, and React for headless setups. Custom themes convert better because they’re built around your brand.' },
  { q: 'What Shopify apps do you integrate?', a: 'We integrate Klaviyo, Yotpo, Recharge, Gorgias, Loox, Shiprocket, Razorpay, and many more. We also build custom private apps when no off-the-shelf solution meets your exact needs.' },
  { q: 'Can you optimize my Shopify store for SEO?', a: 'Absolutely. We optimize meta titles, product schema markup, image alt tags, URL structures, page speed, and Core Web Vitals. Our Shopify stores regularly rank on page 1 of Google within 3–6 months.' },
  { q: 'Will my Shopify store work well on mobile?', a: 'Every store we build is mobile-first. We test across iOS, Android, and various screen sizes to ensure a seamless checkout experience. Mobile conversion rate is our #1 priority.' },
];

export default function ShopifyDevelopmentPage() {
  const shopifySchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "name": "Shopify & Headless E-Commerce Development Services",
        "description": "Optenary builds premium custom Shopify themes and headless Hydrogen storefronts with order sync, custom apps, and automated inventory sync.",
        "provider": {
          "@type": "Organization",
          "name": "Optenary",
          "url": "https://optenary.in/"
        },
        "areaServed": "Global",
        "serviceType": "Shopify Development"
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
            "name": "Shopify Development",
            "item": "https://optenary.in/services/shopify-development"
          }
        ]
      }
    ]
  };


  const whatWeBuild = [
    {
      num: "01",
      title: "Custom Shopify Store Development",
      quote: "Custom Shopify store development is the process of building a Shopify storefront from scratch - with a bespoke design, custom theme, and tailored functionality - instead of using an off-the-shelf template.",
      text: "We design and develop every element of your store around your brand: homepage layout, product listing pages, product detail pages, cart, and checkout flow. No generic templates. No compromises on brand identity. Every decision is made with one goal - converting visitors into buyers.",
      bestFor: "D2C brands, product startups, and businesses launching their first online store."
    },
    {
      num: "02",
      title: "Shopify Theme Development & Customisation",
      quote: "Shopify theme development involves building or modifying a Shopify store's visual layer using Shopify's Liquid templating language - controlling layout, typography, colours, and interactive elements across every page.",
      text: "We build custom Liquid-based themes from scratch or customise your existing Shopify theme to match your brand guidelines precisely. Every element is optimised for mobile-first performance, Core Web Vitals, and conversion rate - because a beautiful theme that loads slowly costs you sales.",
      bestFor: "Brands that have a live store but need a design upgrade, performance fix, or brand-specific visual overhaul."
    },
    {
      num: "03",
      title: "Shopify Plus Development",
      quote: "Shopify Plus is Shopify's enterprise-tier plan built for high-volume brands that need advanced checkout customisation, workflow automation via Shopify Flow, multi-store architecture, and higher API rate limits than standard Shopify allows.",
      text: "We build and configure Shopify Plus setups for brands that have outgrown standard Shopify. This includes custom checkout scripting, Shopify Flow automation for order routing and fulfilment, multi-currency and multi-language stores, and headless commerce architecture for brands needing maximum front-end flexibility.",
      bestFor: "Scaling brands, enterprise retailers, and businesses operating across multiple geographies or doing high order volumes."
    },
    {
      num: "04",
      title: "Shopify App Development & Integration",
      quote: "Shopify app development involves building custom private or public applications that extend Shopify's native functionality - connecting your store to external systems like ERP, CRM, inventory tools, or logistics platforms via Shopify's API.",
      text: "When Shopify's app store does not have exactly what you need, we build it. As a dedicated Shopify app development agency, we handle the full API integration lifecycle - from custom private apps that sync Shopify with your internal systems to purpose-built public apps - covering design, development, testing, and Shopify App Store submission if needed.",
      bestFor: "Store owners needing custom functionality, API syncing with legacy systems, or custom logistics integrations."
    },
    {
      num: "05",
      title: "Shopify Migration Services",
      quote: "Shopify migration is the process of moving an existing online store - along with all product data, customer records, order history, and SEO configurations - from another ecommerce platform to Shopify, with zero data loss and minimal downtime.",
      text: "We manage full platform migrations to Shopify from WooCommerce, Magento, BigCommerce, PrestaShop, and custom-built stores. Every migration includes product data transfer, customer record migration, order history preservation, 301 redirect mapping to protect your SEO rankings, and full store configuration on Shopify before go-live.",
      bestFor: "Businesses on legacy platforms experiencing slow speeds, high maintenance costs, or outgrown features."
    },
    {
      num: "06",
      title: "Shopify Speed Optimisation & CRO",
      quote: "Shopify speed optimization is the process of improving a Shopify store's Core Web Vitals - page load speed, interactivity, and visual stability - to reduce bounce rates, improve Google rankings, and increase the percentage of visitors who complete a purchase.",
      text: "A slow Shopify store is a leaking bucket - you spend on ads and traffic but lose buyers before they reach checkout. We audit your store's full performance stack: Core Web Vitals, image delivery, third-party script load order, theme code bloat, and checkout friction. Then we fix what is costing you sales.",
      bestFor: "Live stores with a high bounce rate, slow mobile load times, or a conversion rate under 2%."
    }
  ];



  const whyChooseUsShopify = [
    {
      title: "Optimized Core Web Vitals",
      desc: "We build clean themes and optimized headless checkouts to deliver mobile page load speeds under 1.5 seconds.",
      icon: Cpu
    },
    {
      title: "100% Secure Transaction Flows",
      desc: "We ensure proper integrations with Shopify Payments, Stripe, and third-party gateways to prevent transaction drop-offs.",
      icon: ShieldCheck
    },
    {
      title: "Conversion-optimized Layouts",
      desc: "We set up single-page cart checkouts, optimized mini-carts, and custom product configuration options to boost AOV.",
      icon: Zap
    },
    {
      title: "Customizable Theme Panels",
      desc: "Developing clean settings panels in the Shopify Editor so your marketing team can change sections without touching code.",
      icon: Layout
    },
    {
      title: "Ongoing Developer Support",
      desc: "We offer continuous audits, inventory synching maintenance, and updates to Shopify's latest OS 2.0 API guidelines.",
      icon: Headphones
    },
    {
      title: "Omnichannel inventory sync",
      desc: "We build sync engines to link Shopify records with warehouse management applications, POS setups, and custom ERP software.",
      icon: Network
    }
  ];

  return (
    <div className="min-h-screen bg-dark-bg text-white selection:bg-brand-orange selection:text-dark-bg antialiased flex flex-col justify-between">
      <SEO 
        title="Shopify Development Services | Custom Themes &amp; Custom Apps"
        description="Hire certified Shopify developers to engineer bespoke storefronts, custom theme designs, private apps, and optimized conversions for fast e-commerce growth."
        keywords="Shopify development company, Shopify developer, headless Shopify, Shopify Hydrogen, custom Shopify apps, Shopify Liquid theme"
        canonicalPath="/services/shopify-development"
        schema={shopifySchema}
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
              Premium Shopify & <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-brand-orangeLight">
                Headless E-Commerce Development
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="text-base md:text-xl text-dark-muted font-medium max-w-4xl mx-auto leading-relaxed mb-10"
            >
              We craft high-converting Shopify stores designed for global scales. From custom Liquid theme structures to blazing-fast headless Hydrogen React store fronts, we deliver shopping experiences that optimize conversions and drive revenue.
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
                href="#why-choose-shopify" 
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-dark-card hover:bg-dark-light border border-dark-border hover:border-brand-orange text-white font-bold uppercase tracking-wider text-sm transition-all transform hover:-translate-y-1"
              >
                Why Shopify?
              </a>
            </motion.div>
          </div>
        </section>

        {/* Global Partner Section */}
        <section className="bg-[#050607] py-20 px-6 md:px-12 border-y border-dark-border/40 relative">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-4xl font-extrabold text-white mb-6">
              Shopify Development <span className="text-brand-orange">Partner Worldwide</span>
            </h2>
            <p className="text-sm md:text-base text-dark-muted leading-relaxed">
              Optenary delivers secure enterprise-grade Shopify solutions, custom Liquid templates, and fully synchronized checkout processes. We help brand operations run with automated inventory synchronization, CRM updates, and analytics reporting. For stores requiring bespoke shopping architectures outside Shopify, we offer complete <a href="/services/custom-ecommerce-development" className="text-brand-orange hover:underline font-semibold">custom e-commerce development</a>.
            </p>
          </div>
        </section>

        {/* What We Build (Zig-Zag) */}
        <section className="bg-dark-bg py-24 px-6 md:px-12 relative overflow-hidden">
          <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-80 h-80 rounded-full bg-brand-orange/5 blur-[120px] pointer-events-none" />

          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-extrabold text-white mt-2 mb-6">
                What Does Optenary Build With Shopify?
              </h2>
              <p className="text-dark-muted max-w-4xl mx-auto text-sm md:text-base leading-relaxed">
                As a trusted Shopify app development agency, Optenary delivers end-to-end Shopify solutions 
                tailored to your business model - whether you are launching a brand-new store, migrating from another platform, 
                or scaling an existing setup to handle higher order volumes. Here is every service we offer within Shopify development:
              </p>
            </div>

            {/* Premium Card Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10">
              {whatWeBuild.map((step, index) => (
                <div key={index} className="group relative p-8 md:p-10 rounded-[2rem] bg-dark-card/30 backdrop-blur-md border border-dark-border hover:border-brand-orange/40 transition-all duration-500 overflow-hidden shadow-sm hover:shadow-glow">
                  {/* Large background number */}
                  <div className="absolute -top-6 -right-4 text-[120px] font-black text-white/[0.03] group-hover:text-brand-orange/[0.05] transition-colors duration-700 pointer-events-none select-none">
                    {step.num}
                  </div>
                  
                  <div className="relative z-10 flex flex-col h-full">
                    <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-6 pr-12">{step.title}</h3>
                    
                    <div className="pl-5 border-l-2 border-brand-orange mb-6">
                      <p className="text-brand-orangeLight font-medium text-sm leading-relaxed">
                        {step.quote}
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

            {/* Comparison Table Section */}
            <div className="mt-32 max-w-5xl mx-auto">
              <h2 className="text-2xl md:text-4xl font-extrabold text-white mb-6 text-center">
                Shopify vs Custom eCommerce - Which Is Right for You?
              </h2>
              <p className="text-dark-muted text-sm md:text-base leading-relaxed mb-10 text-center">
                Shopify is right for most product-based businesses and D2C brands that need to launch fast. Custom ecommerce is right for 
                businesses with complex checkout logic, B2B pricing rules, or marketplace architecture that Shopify cannot support. Here is the 
                full side-by-side breakdown:
              </p>
              
              <div className="w-full bg-dark-card/20 rounded-[2rem] border border-dark-border/60 p-6 md:p-10 shadow-glow">
                {/* Header Row */}
                <div className="hidden md:grid grid-cols-12 gap-6 pb-6 border-b border-brand-orange/20 mb-2">
                  <div className="col-span-4 text-xs font-black text-dark-muted uppercase tracking-widest">Decision Factor</div>
                  <div className="col-span-4 text-xl font-extrabold text-brand-orange">Shopify</div>
                  <div className="col-span-4 text-xl font-extrabold text-white">Custom eCommerce</div>
                </div>
                
                {/* Rows */}
                <div className="flex flex-col gap-4 md:gap-0">
                  {[
                    { factor: "Launch Time", s: "2 to 8 weeks", c: "3 to 6 months" },
                    { factor: "Design Flexibility", s: "High - within Shopify limits", c: "Unlimited" },
                    { factor: "Checkout Control", s: "Standard - Shopify Plus is higher", c: "Complete control" },
                    { factor: "Business Logic", s: "Platform rules apply", c: "Fully custom" },
                    { factor: "Ongoing Cost", s: "Monthly platform fee plus apps", c: "Hosting & maintenance only" },
                    { factor: "Scalability", s: "High", c: "Unlimited" },
                    { factor: "Time to First Sale", s: "Fast", c: "Longer" },
                    { factor: "Best For", s: "D2C brands, product retail", c: "Marketplace, B2B, complex ops" },
                    { factor: "Ownership", s: "Platform owned", c: "You own the full codebase" }
                  ].map((row, i) => (
                    <div key={i} className="group flex flex-col md:grid md:grid-cols-12 gap-2 md:gap-6 py-4 md:py-6 border-b border-dark-border/40 hover:bg-white/[0.02] transition-colors rounded-xl md:rounded-none px-4 md:px-0 bg-dark-bg/40 md:bg-transparent">
                      <div className="col-span-4 flex items-center md:items-start">
                        <span className="text-white font-bold text-sm md:text-base">{row.factor}</span>
                      </div>
                      <div className="col-span-4 flex items-center">
                        <span className="md:hidden text-xs text-brand-orange font-bold uppercase tracking-wider mr-2 w-16">Shopify:</span>
                        <span className="text-brand-orangeLight font-medium text-sm md:text-base">{row.s}</span>
                      </div>
                      <div className="col-span-4 flex items-center">
                        <span className="md:hidden text-xs text-white font-bold uppercase tracking-wider mr-2 w-16">Custom:</span>
                        <span className="text-dark-muted group-hover:text-white/90 transition-colors text-sm md:text-base">{row.c}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 text-sm md:text-base flex flex-col gap-3">
                <p className="text-dark-muted">
                  Not sure which fits your business? <a href="/contact" className="text-brand-orange hover:text-brand-orangeLight font-medium transition-colors">Book a free 30-minute consultation →</a>
                </p>
                <p className="text-dark-muted">
                  Also exploring a fully custom build? <a href="/services/custom-ecommerce" className="text-brand-orange hover:text-brand-orangeLight font-medium transition-colors">Custom eCommerce Development →</a>
                </p>
              </div>
            </div>



          </div>
        </section>

        {/* Why Choose Us */}
        <section id="why-choose-shopify" className="bg-[#050607] py-24 px-6 md:px-12 relative border-y border-dark-border/40">
          <div className="absolute top-10 right-10 w-72 h-72 rounded-full bg-brand-orange/5 blur-[120px] pointer-events-none" />

          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4">
                Why Choose Optenary for <span className="text-brand-orange">Shopify Stores</span>
              </h2>
              <p className="text-dark-muted max-w-3xl mx-auto text-sm md:text-base leading-relaxed">
                We combine native liquid templates, headless hydrogen React structures, and complete catalog automation to build e-commerce solutions that convert.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
              {whyChooseUsShopify.map((item, index) => {
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
              Launch your Shopify store <br className="sm:hidden" /> optimized for conversion.
            </h2>
            <p className="text-sm md:text-base text-white/80 max-w-xl mx-auto mb-8">
              We design Liquid sections, sync databases, and deploy fast checkout structures.
            </p>
            <a href="/contact" className="inline-flex px-8 py-4 rounded-xl bg-white hover:bg-white/90 text-brand-orange font-bold uppercase tracking-wider text-xs transition-colors shadow-glow">
              Book a Discovery Call
            </a>
          </div>
        </section>

        <ServiceFAQ faqs={shopifyFaqs} title="Shopify Development FAQs" />

        <Contact />
      </main>

      <Footer />
    </div>
  );
}
