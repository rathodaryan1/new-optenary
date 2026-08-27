import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowUpRight, 
  ArrowDownRight, 
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

const webFaqs = [
  { q: 'How long does it take to build a custom website?', a: 'A typical business website takes 4–8 weeks from kickoff to launch. Complex platforms with custom backends, integrations, or e-commerce can take 3–6 months depending on scope.' },
  { q: 'What technologies do you use for web development?', a: 'We build primarily with React, Next.js, TypeScript, and Node.js for frontend/backend. For databases we use PostgreSQL, MongoDB, or Supabase depending on the project needs.' },
  { q: 'Do you provide ongoing maintenance after launch?', a: 'Yes — we offer monthly maintenance packages covering security updates, performance monitoring, bug fixes, and content updates. Most clients stay with us on a retainer.' },
  { q: 'Can you redesign my existing website without losing SEO rankings?', a: 'Absolutely. We carry out a full SEO audit before redesign, preserve your existing URL structure, set up proper 301 redirects, and migrate all metadata to protect your rankings.' },
  { q: 'Will my website be mobile-friendly and fast?', a: 'Every website we build is fully responsive and optimized for Core Web Vitals. We target a Google PageSpeed score of 90+ and ensure fast loading on all devices and network speeds.' },
];

export default function WebDevelopmentPage() {
  const webSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Custom Web Application Development Services",
    "description": "Optenary provides custom web app development services and progressive web app solutions built for scalability, speed, and business impact.",
    "provider": {
      "@type": "Organization",
      "name": "Optenary",
      "url": "https://optenary.in/"
    },
    "areaServed": "Global",
    "serviceType": "Web Development"
  };

  const [activeBuildStep, setActiveBuildStep] = useState<number | null>(null);

  const whatWeBuild = [
    {
      num: "01",
      title: "SaaS Web platforms",
      desc: "Multi-tenant software platforms with secure user management, billing plans, and data partitioning.",
      color: "#10b981"
    },
    {
      num: "02",
      title: "Admin dashboards & Analytics",
      desc: "Internal back-office tools, metrics visualizers, charts, and user analytics dashboards.",
      color: "#38bdf8"
    },
    {
      num: "03",
      title: "CRM, ERP & Internal tools",
      desc: "Tailored business software mapping complex workflows, databases, and enterprise reporting.",
      color: "#a855f7"
    },
    {
      num: "04",
      title: "Marketplaces & Booking",
      desc: "Multi-vendor ecommerce sites, booking calendars, ratings, and payment split transactions.",
      color: "#ec4899"
    },
    {
      num: "05",
      title: "Customer Portals (B2B/B2C)",
      desc: "Secure self-service client portals for invoice tracking, document sharing, and support tickets.",
      color: "#22c55e"
    },
    {
      num: "06",
      title: "Progressive & responsive apps",
      desc: "Mobile-optimized PWAs with offline caching, push notifications, and fast loading speeds.",
      color: "#eab308"
    }
  ];

  const techStack = [
    {
      name: "React",
      desc: "Dynamic UI Library",
      svg: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" alt="React" className="w-10 h-10 md:w-12 md:h-12 object-contain" loading="lazy" decoding="async" />
    },
    {
      name: "Next.js",
      desc: "Server-Side React",
      svg: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg" alt="Next.js" className="w-10 h-10 md:w-12 md:h-12 object-contain invert" loading="lazy" decoding="async" />
    },
    {
      name: "Node.js",
      desc: "Scalable JS Backend",
      svg: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" alt="Node.js" className="w-10 h-10 md:w-12 md:h-12 object-contain" loading="lazy" decoding="async" />
    },
    {
      name: "AWS",
      desc: "Cloud Deployments",
      svg: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" alt="AWS" className="w-10 h-10 md:w-12 md:h-12 object-contain" loading="lazy" decoding="async" />
    },
    {
      name: "MongoDB",
      desc: "Flexible Document DB",
      svg: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg" alt="MongoDB" className="w-10 h-10 md:w-12 md:h-12 object-contain" loading="lazy" decoding="async" />
    },
    {
      name: "PostgreSQL",
      desc: "Relational SQL database",
      svg: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg" alt="PostgreSQL" className="w-10 h-10 md:w-12 md:h-12 object-contain" loading="lazy" decoding="async" />
    },
    {
      name: "Django",
      desc: "Python Web Framework",
      svg: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/django/django-plain.svg" alt="Django" className="w-10 h-10 md:w-12 md:h-12 object-contain" loading="lazy" decoding="async" />
    },
    {
      name: "Laravel",
      desc: "PHP MVC Framework",
      svg: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/laravel/laravel-original.svg" alt="Laravel" className="w-10 h-10 md:w-12 md:h-12 object-contain" loading="lazy" decoding="async" />
    }
  ];

  const whyChooseUsWeb = [
    {
      title: "Scalable architecture for business growth",
      desc: "We build with future expansion in mind, ensuring your database and server structure can scale to millions of users without hiccups.",
      icon: Cpu
    },
    {
      title: "Secure backend and API development",
      desc: "Protecting user data with robust authentication, role-based access control, and industry-standard security protocols.",
      icon: ShieldCheck
    },
    {
      title: "Performance-optimized web apps for speed",
      desc: "Blazing fast load times and optimized bundles that improve user retention, search ranking, and conversion rates.",
      icon: Zap
    },
    {
      title: "Modern frameworks and clean UI/UX",
      desc: "Using React, Next.js, and modern UI paradigms to design intuitive, high-fidelity user experiences that keep visitors engaged.",
      icon: Layout
    },
    {
      title: "Dedicated support after launch",
      desc: "Post-launch maintenance, regular updates, bug fixes, and performance monitoring to keep your software running 24/7.",
      icon: Headphones
    },
    {
      title: "Seamless integrations with SaaS & CRMs",
      desc: "Connecting payment gateways, custom APIs, SMS platforms, messaging channels, and CRMs to automate business routines.",
      icon: Network
    }
  ];

  return (
    <div className="min-h-screen bg-dark-bg text-white selection:bg-brand-orange selection:text-dark-bg antialiased flex flex-col justify-between">
      <SEO 
        title="Custom Web App Development Service"
        description="Optenary is a custom web app development agency providing scalable web application development services and progressive web app solutions."
        keywords="custom web app development, web app development agency, web development services India, progressive web app, SaaS platform development"
        canonicalPath="/services/web-development"
        schema={webSchema}
      />
      <Header />

      <main>
        {/* ======================================================== */}
        {/* HERO SECTION                                             */}
        {/* ======================================================== */}
        <section className="relative min-h-[75vh] flex items-center justify-center overflow-hidden py-24 px-6 md:px-12 bg-dark-bg">
          <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-brand-orange/10 blur-[120px] pointer-events-none" />
          <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-96 h-96 rounded-full bg-brand-orange/5 blur-[150px] pointer-events-none" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293708_1px,transparent_1px),linear-gradient(to_bottom,#1f293708_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

          <div className="max-w-5xl mx-auto text-center relative z-10">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1] mb-6"
            >
              Enterprise-Grade Web Application <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-brand-orangeLight">
                Engineering Built for Scale
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="text-base md:text-xl text-dark-muted font-medium max-w-4xl mx-auto leading-relaxed mb-10"
            >
              Optenary designs and builds high-performance web applications, interactive SaaS portals, and server-rendered platforms. We specialize in low-latency execution, bulletproof security systems, and modern modular architectures that grow alongside your business.
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
                href="#why-choose-web-dev" 
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-dark-card hover:bg-dark-light border border-dark-border hover:border-brand-orange text-white font-bold uppercase tracking-wider text-sm transition-all transform hover:-translate-y-1"
              >
                Why Optenary?
              </a>
            </motion.div>
          </div>
        </section>

        {/* ======================================================== */}
        {/* GLOBAL PARTNER SECTION                                    */}
        {/* ======================================================== */}
        <section className="bg-[#050607] py-20 px-6 md:px-12 border-y border-dark-border/40 relative">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-4xl font-extrabold text-white mb-6">
              Web Application Development <span className="text-brand-orange">Partner Worldwide</span>
            </h2>
            <p className="text-sm md:text-base text-dark-muted leading-relaxed">
              As a trusted web app development agency, Optenary supports businesses with scalable platforms and modern digital solutions across global markets. We deliver reliable web application development services India companies depend on, while also working with international clients through clear communication and product-focused execution.
            </p>
          </div>
        </section>

        {/* ======================================================== */}
        {/* WHAT WE BUILD (Zig-Zag Diamond Timeline)                 */}
        {/* ======================================================== */}
        <section className="bg-dark-bg py-24 px-6 md:px-12 relative overflow-hidden">
          <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-80 h-80 rounded-full bg-brand-orange/5 blur-[120px] pointer-events-none" />

          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <span className="px-3.5 py-1.5 rounded-full bg-brand-orange/10 border border-brand-orange/20 text-brand-orange text-xs font-semibold uppercase tracking-wider inline-block mb-4 shadow-glow">
                What We Build
              </span>
              <h2 className="text-3xl md:text-5xl font-extrabold text-white mt-2 mb-4">
                Custom Web App Development <span className="text-brand-orange">Services We Provide</span>
              </h2>
              <p className="text-dark-muted max-w-2xl mx-auto text-sm md:text-base">
                We deliver custom web application development services for secure, scalable web platforms.
              </p>
            </div>

            {/* Desktop Diamond Grid */}
            <div className="relative hidden lg:block h-[480px] w-full z-10 select-none mb-16">
              <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" viewBox="0 0 1200 480" preserveAspectRatio="none">
                {[...Array(5)].map((_, i) => (
                  <path 
                    key={i}
                    d={`M ${100 + i * 200},${i % 2 === 0 ? 120 : 360} L ${300 + i * 200},${i % 2 === 0 ? 360 : 120}`}
                    stroke={activeBuildStep === i || activeBuildStep === i + 1 ? "#10b981" : "#1e2329"}
                    strokeWidth={activeBuildStep === i || activeBuildStep === i + 1 ? "2.5" : "1.5"}
                    fill="none"
                    className={activeBuildStep === i || activeBuildStep === i + 1 ? "animate-path-active opacity-100" : "animate-path-flow opacity-30"}
                    style={{ 
                      filter: activeBuildStep === i || activeBuildStep === i + 1 ? 'drop-shadow(0 0 4px #10b981)' : 'none',
                      transition: 'all 0.3s ease'
                    }}
                  />
                ))}
              </svg>

              <div className="grid grid-cols-6 h-full relative z-10">
                {whatWeBuild.map((step, index) => {
                  const isOdd = index % 2 === 0;
                  const isActive = activeBuildStep === index;

                  return (
                    <div 
                      key={index} 
                      className="relative h-[480px] w-full"
                      onMouseEnter={() => setActiveBuildStep(index)}
                      onMouseLeave={() => setActiveBuildStep(null)}
                    >
                      {isOdd ? (
                        <>
                          {/* Top Position: Diamond Node */}
                          <motion.div 
                            whileHover={{ scale: 1.05 }}
                            className="absolute top-[18px] left-1/2 -translate-x-1/2 w-36 h-36 flex items-center justify-center cursor-pointer"
                          >
                            <div className={`absolute inset-0 border border-dashed rounded-3xl rotate-45 scale-110 transition-all duration-500 ${isActive ? 'border-brand-orange/60 shadow-glow' : 'border-dark-border/40'}`} />
                            <div className={`absolute inset-0 border rounded-2xl rotate-45 transition-all duration-500 ${isActive ? 'border-brand-orange/60 bg-brand-orange/10' : 'border-dark-border bg-dark-card/50'}`} />
                            <div className="relative z-10 flex flex-col items-center justify-center p-3 text-center">
                              <span className={`text-[9px] font-bold tracking-wider mb-0.5 transition-colors ${isActive ? 'text-brand-orange' : 'text-dark-muted'}`}>{step.num}</span>
                              <span className="text-[11px] font-extrabold tracking-tight text-white leading-tight max-w-[100px]">{step.title}</span>
                            </div>
                          </motion.div>

                          {/* Bottom Position: Text Panel */}
                          <div className={`absolute bottom-[20px] left-1/2 -translate-x-1/2 w-full max-w-[170px] h-[150px] flex flex-col items-center justify-center p-4 rounded-2xl border bg-dark-card/10 text-center transition-all duration-500 ${isActive ? 'border-brand-orange/30 bg-brand-orange/5 shadow-glow' : 'border-dark-border/30'}`}>
                            <h4 className={`text-xs font-bold mb-1.5 transition-colors ${isActive ? 'text-brand-orange' : 'text-white'}`}>{step.title}</h4>
                            <p className="text-[10px] text-dark-muted leading-relaxed">{step.desc}</p>
                          </div>
                        </>
                      ) : (
                        <>
                          {/* Top Position: Text Panel */}
                          <div className={`absolute top-[20px] left-1/2 -translate-x-1/2 w-full max-w-[170px] h-[150px] flex flex-col items-center justify-center p-4 rounded-2xl border bg-dark-card/10 text-center transition-all duration-500 ${isActive ? 'border-brand-orange/30 bg-brand-orange/5 shadow-glow' : 'border-dark-border/30'}`}>
                            <h4 className={`text-xs font-bold mb-1.5 transition-colors ${isActive ? 'text-brand-orange' : 'text-white'}`}>{step.title}</h4>
                            <p className="text-[10px] text-dark-muted leading-relaxed">{step.desc}</p>
                          </div>

                          {/* Bottom Position: Diamond Node */}
                          <motion.div 
                            whileHover={{ scale: 1.05 }}
                            className="absolute bottom-[18px] left-1/2 -translate-x-1/2 w-36 h-36 flex items-center justify-center cursor-pointer"
                          >
                            <div className={`absolute inset-0 border border-dashed rounded-3xl rotate-45 scale-110 transition-all duration-500 ${isActive ? 'border-brand-orange/60 shadow-glow' : 'border-dark-border/40'}`} />
                            <div className={`absolute inset-0 border rounded-2xl rotate-45 transition-all duration-500 ${isActive ? 'border-brand-orange/60 bg-brand-orange/10' : 'border-dark-border bg-dark-card/50'}`} />
                            <div className="relative z-10 flex flex-col items-center justify-center p-3 text-center">
                              <span className={`text-[9px] font-bold tracking-wider mb-0.5 transition-colors ${isActive ? 'text-brand-orange' : 'text-dark-muted'}`}>{step.num}</span>
                              <span className="text-[11px] font-extrabold tracking-tight text-white leading-tight max-w-[100px]">{step.title}</span>
                            </div>
                          </motion.div>
                        </>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Absolute Floating Arrow Indicators */}
              <div className="absolute left-[16.66%] top-[240px] -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none flex items-center justify-center w-7 h-7 rounded-full bg-dark-bg border border-dark-border shadow-glow">
                <ArrowDownRight className={`w-3.5 h-3.5 transition-colors duration-300 ${activeBuildStep === 0 || activeBuildStep === 1 ? 'text-brand-orange animate-pulse' : 'text-dark-muted'}`} />
              </div>
              <div className="absolute left-[33.33%] top-[240px] -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none flex items-center justify-center w-7 h-7 rounded-full bg-dark-bg border border-dark-border shadow-glow">
                <ArrowUpRight className={`w-3.5 h-3.5 transition-colors duration-300 ${activeBuildStep === 1 || activeBuildStep === 2 ? 'text-brand-orange animate-pulse' : 'text-dark-muted'}`} />
              </div>
              <div className="absolute left-[50%] top-[240px] -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none flex items-center justify-center w-7 h-7 rounded-full bg-dark-bg border border-dark-border shadow-glow">
                <ArrowDownRight className={`w-3.5 h-3.5 transition-colors duration-300 ${activeBuildStep === 2 || activeBuildStep === 3 ? 'text-brand-orange animate-pulse' : 'text-dark-muted'}`} />
              </div>
              <div className="absolute left-[66.66%] top-[240px] -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none flex items-center justify-center w-7 h-7 rounded-full bg-dark-bg border border-dark-border shadow-glow">
                <ArrowUpRight className={`w-3.5 h-3.5 transition-colors duration-300 ${activeBuildStep === 3 || activeBuildStep === 4 ? 'text-brand-orange animate-pulse' : 'text-dark-muted'}`} />
              </div>
              <div className="absolute left-[83.33%] top-[240px] -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none flex items-center justify-center w-7 h-7 rounded-full bg-dark-bg border border-dark-border shadow-glow">
                <ArrowDownRight className={`w-3.5 h-3.5 transition-colors duration-300 ${activeBuildStep === 4 || activeBuildStep === 5 ? 'text-brand-orange animate-pulse' : 'text-dark-muted'}`} />
              </div>
            </div>

            {/* Mobile Vertical Timeline */}
            <div className="relative block lg:hidden pl-8 md:pl-16 z-10 mb-16">
              <div className="absolute left-[28px] md:left-[36px] top-4 bottom-4 w-[2px] bg-gradient-to-b from-brand-orange/40 via-dark-border to-brand-orange/10" />
              <div className="flex flex-col gap-8">
                {whatWeBuild.map((step, index) => {
                  const isActive = activeBuildStep === index;
                  return (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      className="relative flex gap-5 items-start"
                      onMouseEnter={() => setActiveBuildStep(index)}
                      onMouseLeave={() => setActiveBuildStep(null)}
                    >
                      <div className="relative w-10 h-10 flex items-center justify-center shrink-0 mt-1">
                        <div className={`absolute inset-0 border border-dashed rounded-lg rotate-45 transition-all duration-300 ${isActive ? 'border-brand-orange' : 'border-dark-border'}`} />
                        <div className={`absolute inset-0 border rounded-lg rotate-45 transition-all duration-300 ${isActive ? 'border-brand-orange/40 bg-brand-orange/10' : 'border-dark-border bg-dark-card'}`} />
                        <span className="relative z-10 text-xs font-bold text-white">{step.num}</span>
                      </div>
                      <div className={`flex-grow p-5 rounded-2xl border bg-dark-card/30 backdrop-blur-sm transition-all duration-300 ${isActive ? 'border-brand-orange/30 shadow-glow bg-brand-orange/5' : 'border-dark-border/60'}`}>
                        <h3 className="text-base font-bold text-white mb-2">{step.title}</h3>
                        <p className="text-xs md:text-sm text-dark-muted leading-relaxed">{step.desc}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* ======================================================== */}
            {/* TECH STACK PANEL                                         */}
            {/* ======================================================== */}
            <div className="mt-20 flex flex-col items-center w-full max-w-5xl mx-auto">
              {/* Pill header */}
              <div className="mb-6">
                <span className="px-4 py-1.5 rounded-full border border-brand-orange/30 bg-brand-orange/10 text-brand-orange text-[10px] font-bold uppercase tracking-widest">
                  Tech Stack
                </span>
              </div>

              <h3 className="text-3xl md:text-5xl font-extrabold text-white text-center mb-4 tracking-tight">
                Enterprise Web Architectures
              </h3>
              <p className="text-dark-muted max-w-2xl mx-auto text-sm md:text-base text-center mb-12">
                We leverage modern web technologies to build secure, scalable, and high-performance digital platforms.
              </p>

              {/* Large cards layout matching screenshot */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 w-full">
                {techStack.map((tech, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col items-center justify-center p-6 md:p-8 rounded-2xl bg-dark-card/50 border border-dark-border/60 text-center hover:border-brand-orange/40 hover:bg-[#121620] transition-all duration-300 shadow-sm"
                  >
                    <div className="mb-4">
                      {tech.svg}
                    </div>
                    <span className="text-white font-bold text-sm md:text-base block mb-1">
                      {tech.name}
                    </span>
                    <span className="text-xs text-dark-muted font-medium block">
                      {tech.desc}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* ======================================================== */}
        {/* WHY CHOOSE US FOR WEB DEVELOPMENT                        */}
        {/* ======================================================== */}
        <section id="why-choose-web-dev" className="bg-[#050607] py-24 px-6 md:px-12 relative border-y border-dark-border/40">
          <div className="absolute top-10 right-10 w-72 h-72 rounded-full bg-brand-orange/5 blur-[120px] pointer-events-none" />

          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4">
                Why Choose Optenary for <span className="text-brand-orange">Web Development</span>
              </h2>
              <p className="text-dark-muted max-w-3xl mx-auto text-sm md:text-base leading-relaxed">
                As a trusted partner for custom web app development services, we build scalable, secure web platforms designed for long-term growth, including progressive web app development service solutions built for performance.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
              {whyChooseUsWeb.map((item, index) => {
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

        {/* ======================================================== */}
        {/* REAL PRODUCTS WE'VE BUILT (Filtered Portfolio Showcase)  */}
        {/* ======================================================== */}
        <Portfolio />

        {/* ======================================================== */}
        {/* CTA VISION BLOCK                                         */}
        {/* ======================================================== */}
        <section className="bg-dark-bg py-16 px-6 md:px-12 relative overflow-hidden">
          <div className="max-w-5xl mx-auto rounded-3xl bg-gradient-to-r from-brand-orange to-brand-orangeDark p-10 md:p-14 text-center relative shadow-glow-large">
            <div className="absolute inset-0 opacity-15 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent pointer-events-none" />
            
            <h2 className="text-2xl md:text-4xl font-extrabold text-white mb-4 relative z-10 leading-tight">
              Your vision deserves the <br className="sm:hidden" /> right tech partner.
            </h2>
            <p className="text-sm md:text-base text-white/80 max-w-xl mx-auto mb-8 relative z-10">
              Let's build something reliable, scalable, and future-ready together.
            </p>
            
            <a 
              href="/contact" 
              className="inline-flex px-8 py-4 rounded-xl bg-white hover:bg-white/90 text-brand-orange font-bold uppercase tracking-wider text-xs transition-colors shadow-glow relative z-10"
            >
              Book a Discovery Call
            </a>
          </div>
        </section>

        {/* FAQ */}
        <ServiceFAQ faqs={webFaqs} title="Web Development FAQs" />

        {/* ======================================================== */}
        {/* CONTACT FORM                                             */}
        {/* ======================================================== */}
        <Contact />
      </main>

      {/* Shared Footer directories */}
      <Footer />
    </div>
  );
}
