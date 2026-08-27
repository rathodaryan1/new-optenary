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

const customSoftFaqs = [
  { q: 'What is custom software and why is it better than off-the-shelf tools?', a: 'Custom software is built specifically for your workflows, data, and users. Unlike off-the-shelf tools, it has no licensing fees, no feature bloat, and scales precisely with your business without forcing you to adapt to someone else’s product.' },
  { q: 'How do you scope and price a custom software project?', a: 'We start with a free discovery call to map your requirements. We then provide a fixed-price scope document with milestones, delivery dates, and a detailed tech specification. No hidden charges.' },
  { q: 'Can you migrate our data from an existing system to the new software?', a: 'Yes. Data migration is a core part of our implementation service. We write ETL scripts to map, clean, and migrate your existing records from spreadsheets, legacy databases, or third-party tools to the new system.' },
  { q: 'Who owns the source code after the project is complete?', a: 'You do — 100%. Upon final payment, we transfer the full source code, database schemas, environment configs, and documentation to you. We don’t retain any ownership or lock-in.' },
  { q: 'What if I need changes after the project is launched?', a: 'We offer post-launch support packages and dedicated retainer plans. Any changes are estimated transparently and completed in sprints. Many of our clients have been with us for 2+ years post-launch.' },
];

export default function CustomSoftwarePage() {
  const softwareSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "name": "Custom Software Development & Engineering Services",
        "description": "Optenary engineers custom software solutions, enterprise ERP/CRM portals, scalable API gateways, and DevOps cloud infrastructures.",
        "provider": {
          "@type": "Organization",
          "name": "Optenary",
          "url": "https://optenary.in/"
        },
        "areaServed": "Global",
        "serviceType": "Custom Software Development"
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
            "name": "Custom Software",
            "item": "https://optenary.in/services/custom-software"
          }
        ]
      }
    ]
  };

  const [activeBuildStep, setActiveBuildStep] = useState<number | null>(null);
  const whatWeBuild = [
    {
      num: "01",
      title: "Enterprise ERP / CRM",
      desc: "Custom internal resource planning and operations software tailored perfectly to your workflows.",
      color: "#10b981"
    },
    {
      num: "02",
      title: "Scalable API Gateways",
      desc: "High-throughput APIs linking backend systems, mobile apps, and third-party SaaS platforms.",
      color: "#38bdf8"
    },
    {
      num: "03",
      title: "Cloud Database Systems",
      desc: "Distributed databases built on PostgreSQL, Redis, and Mongo with real-time replication.",
      color: "#339933"
    },
    {
      num: "04",
      title: "Legacy Modernization",
      desc: "Re-architecting outdated applications to modern web stacks without losing existing data schemas.",
      color: "#a855f7"
    },
    {
      num: "05",
      title: "DevOps & Pipelines",
      desc: "Automating cloud infrastructure provisioning, Docker containers, and CI/CD pipelines.",
      color: "#eab308"
    },
    {
      num: "06",
      title: "Custom Dashboards",
      desc: "Interactive client portals and operational dashboards with real-time chart visualizations.",
    }
  ];

  const techStack = [
    {
      name: "React",
      desc: "Dynamic UI Library",
      color: "#61dafb",
      svg: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" alt="React" className="w-10 h-10 md:w-12 md:h-12 object-contain" loading="lazy" decoding="async" />
    },
    {
      name: "Next.js",
      desc: "Server-Side React",
      color: "#ffffff",
      svg: (
        <svg viewBox="0 0 180 180" className="w-10 h-10 md:w-12 md:h-12 fill-current text-white">
          <circle cx="90" cy="90" r="90" fill="black" stroke="white" strokeWidth="4" />
          <path d="M140 137.5L96.2 82.5V137.5H84V52.5H96.2L140 107.5V52.5H152.2V137.5H140Z" fill="white" />
        </svg>
      )
    },
    {
      name: "Node.js",
      desc: "Scalable JS Backend",
      color: "#339933",
      svg: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" alt="Node.js" className="w-10 h-10 md:w-12 md:h-12 object-contain" loading="lazy" decoding="async" />
    },
    {
      name: "AWS",
      desc: "Cloud Deployments",
      color: "#ff9900",
      svg: <img src="https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg" alt="AWS" className="w-10 h-10 md:w-12 md:h-12 object-contain invert opacity-90" loading="lazy" decoding="async" />
    },
    {
      name: "MongoDB",
      desc: "Flexible Document DB",
      color: "#47a248",
      svg: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg" alt="MongoDB" className="w-10 h-10 md:w-12 md:h-12 object-contain" loading="lazy" decoding="async" />
    },
    {
      name: "PostgreSQL",
      desc: "Relational SQL database",
      color: "#336791",
      svg: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg" alt="PostgreSQL" className="w-10 h-10 md:w-12 md:h-12 object-contain" loading="lazy" decoding="async" />
    },
    {
      name: ".NET",
      desc: "Enterprise Backend",
      color: "#512bd4",
      svg: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/dotnetcore/dotnetcore-original.svg" alt=".NET" className="w-10 h-10 md:w-12 md:h-12 object-contain" loading="lazy" decoding="async" />
    }
  ];

  const whyChooseUsSoftware = [
    {
      title: "Clean modular architecture",
      desc: "Our codebases are separated cleanly into domain layers, repositories, and interface components, making updates trivial.",
      icon: Cpu
    },
    {
      title: "Security and compliance",
      desc: "Built-in sanitization, security audits, encrypted configs, and GDPR-ready data schemas ensure secure handling of records.",
      icon: ShieldCheck
    },
    {
      title: "Built to scale to millions",
      desc: "Configured from the ground up for low-latency indexing, database replica load balancing, and efficient server caching.",
      icon: Zap
    },
    {
      title: "Clean API interfaces",
      desc: "We write fully documented OpenAPI (Swagger) or GraphQL schemas so integration with frontends is seamless.",
      icon: Layout
    },
    {
      title: "Direct developer updates",
      desc: "Weekly demo calls, automated build staging links, and transparent Jira/Slack channels keep you updated daily.",
      icon: Headphones
    },
    {
      title: "Fault-tolerant infrastructure",
      desc: "Containerized deployments configured with auto-restart, cluster health monitors, and automated daily backup routines.",
      icon: Network
    }
  ];

  return (
    <div className="min-h-screen bg-dark-bg text-white selection:bg-brand-orange selection:text-dark-bg antialiased flex flex-col justify-between">
      <SEO 
        title="Custom Software Development Company | Enterprise SaaS &amp; Tools"
        description="Optenary engineers tailored custom software systems, SaaS platforms, ERP networks, and internal business tools designed to scale operations and boost efficiency."
        keywords="custom software development, enterprise software engineering, API gateways, ERP development, database design, cloud backend"
        canonicalPath="/services/custom-software"
        schema={softwareSchema}
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
              Tailored Custom Software <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-brand-orangeLight">
                Engineering for Complex Enterprise Workflows
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="text-base md:text-xl text-dark-muted font-medium max-w-4xl mx-auto leading-relaxed mb-10"
            >
              We design and construct bespoke enterprise-grade architectures that eliminate manual system friction. From secure ERP hubs and internal automation layers to scalable database design, we engineer tools that integrate with your daily operations.
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
                href="#why-choose-software-dev" 
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-dark-card hover:bg-dark-light border border-dark-border hover:border-brand-orange text-white font-bold uppercase tracking-wider text-sm transition-all transform hover:-translate-y-1"
              >
                Why Custom Software?
              </a>
            </motion.div>
          </div>
        </section>

        {/* Global Partner Section */}
        <section className="bg-[#050607] py-20 px-6 md:px-12 border-y border-dark-border/40 relative">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-4xl font-extrabold text-white mb-6">
              Custom Software Development <span className="text-brand-orange">Partner Worldwide</span>
            </h2>
            <p className="text-sm md:text-base text-dark-muted leading-relaxed">
              Optenary designs robust backend applications, high-performance database infrastructures, and fully secure internal platforms. We build custom <a href="/services/web-development" className="text-brand-orange hover:underline font-semibold">web portals</a>, <a href="/services/mobile-development" className="text-brand-orange hover:underline font-semibold">mobile app integrations</a>, and autonomous <a href="/services/ai-agents-automation" className="text-brand-orange hover:underline font-semibold">AI workflow agents</a> to translate complicated, manual business steps into optimized systems.
            </p>
          </div>
        </section>

        {/* What We Build (Zig-Zag) */}
        <section className="bg-dark-bg py-24 px-6 md:px-12 relative overflow-hidden">
          <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-80 h-80 rounded-full bg-brand-orange/5 blur-[120px] pointer-events-none" />

          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <span className="px-3.5 py-1.5 rounded-full bg-brand-orange/10 border border-brand-orange/20 text-brand-orange text-xs font-semibold uppercase tracking-wider inline-block mb-4 shadow-glow">
                What We Build
              </span>
              <h2 className="text-3xl md:text-5xl font-extrabold text-white mt-2 mb-4">
                Custom Software <span className="text-brand-orange">Platforms We Engineer</span>
              </h2>
              <p className="text-dark-muted max-w-2xl mx-auto text-sm md:text-base">
                We develop clean, fast, and secure database-driven business software with robust code frameworks.
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
                          <div className={`absolute bottom-[20px] left-1/2 -translate-x-1/2 w-full max-w-[170px] h-[150px] flex flex-col items-center justify-center p-4 rounded-2xl border bg-dark-card/10 text-center transition-all duration-500 ${isActive ? 'border-brand-orange/30 bg-brand-orange/5 shadow-glow' : 'border-dark-border/30'}`}>
                            <h4 className={`text-xs font-bold mb-1.5 transition-colors ${isActive ? 'text-brand-orange' : 'text-white'}`}>{step.title}</h4>
                            <p className="text-[10px] text-dark-muted leading-relaxed">{step.desc}</p>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className={`absolute top-[20px] left-1/2 -translate-x-1/2 w-full max-w-[170px] h-[150px] flex flex-col items-center justify-center p-4 rounded-2xl border bg-dark-card/10 text-center transition-all duration-500 ${isActive ? 'border-brand-orange/30 bg-brand-orange/5 shadow-glow' : 'border-dark-border/30'}`}>
                            <h4 className={`text-xs font-bold mb-1.5 transition-colors ${isActive ? 'text-brand-orange' : 'text-white'}`}>{step.title}</h4>
                            <p className="text-[10px] text-dark-muted leading-relaxed">{step.desc}</p>
                          </div>
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

              {/* Floating Arrows */}
              <div className="absolute left-[16.66%] top-[240px] -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none flex items-center justify-center w-7 h-7 rounded-full bg-dark-bg border border-dark-border shadow-glow">
                <ArrowDownRight className={`w-3.5 h-3.5 transition-colors duration-300 ${activeBuildStep === 0 || activeBuildStep === 1 ? 'text-brand-orange' : 'text-dark-muted'}`} />
              </div>
              <div className="absolute left-[33.33%] top-[240px] -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none flex items-center justify-center w-7 h-7 rounded-full bg-dark-bg border border-dark-border shadow-glow">
                <ArrowUpRight className={`w-3.5 h-3.5 transition-colors duration-300 ${activeBuildStep === 1 || activeBuildStep === 2 ? 'text-brand-orange' : 'text-dark-muted'}`} />
              </div>
              <div className="absolute left-[50%] top-[240px] -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none flex items-center justify-center w-7 h-7 rounded-full bg-dark-bg border border-dark-border shadow-glow">
                <ArrowDownRight className={`w-3.5 h-3.5 transition-colors duration-300 ${activeBuildStep === 2 || activeBuildStep === 3 ? 'text-brand-orange' : 'text-dark-muted'}`} />
              </div>
              <div className="absolute left-[66.66%] top-[240px] -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none flex items-center justify-center w-7 h-7 rounded-full bg-dark-bg border border-dark-border shadow-glow">
                <ArrowUpRight className={`w-3.5 h-3.5 transition-colors duration-300 ${activeBuildStep === 3 || activeBuildStep === 4 ? 'text-brand-orange' : 'text-dark-muted'}`} />
              </div>
              <div className="absolute left-[83.33%] top-[240px] -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none flex items-center justify-center w-7 h-7 rounded-full bg-dark-bg border border-dark-border shadow-glow">
                <ArrowDownRight className={`w-3.5 h-3.5 transition-colors duration-300 ${activeBuildStep === 4 || activeBuildStep === 5 ? 'text-brand-orange' : 'text-dark-muted'}`} />
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

            {/* Tech Stack Panel */}
            <div className="mt-20 flex flex-col items-center w-full max-w-5xl mx-auto">
              {/* Pill header */}
              <div className="mb-6">
                <span className="px-4 py-1.5 rounded-full border border-brand-orange/30 bg-brand-orange/10 text-brand-orange text-[10px] font-bold uppercase tracking-widest">
                  Tech Stack
                </span>
              </div>

              <h3 className="text-3xl md:text-5xl font-extrabold text-white text-center mb-4 tracking-tight">
                Enterprise Software Architectures
              </h3>
              <p className="text-dark-muted max-w-2xl mx-auto text-sm md:text-base text-center mb-12">
                We leverage robust frameworks and scalable cloud solutions to build custom enterprise platforms.
              </p>

              {/* Large cards layout */}
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

        {/* Why Choose Us */}
        <section id="why-choose-software-dev" className="bg-[#050607] py-24 px-6 md:px-12 relative border-y border-dark-border/40">
          <div className="absolute top-10 right-10 w-72 h-72 rounded-full bg-brand-orange/5 blur-[120px] pointer-events-none" />

          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4">
                Why Choose Optenary for <span className="text-brand-orange">Custom Software</span>
              </h2>
              <p className="text-dark-muted max-w-3xl mx-auto text-sm md:text-base leading-relaxed">
                We design and engineer enterprise-grade databases, REST endpoints, and containerized backend clusters suited for long-term scalability.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
              {whyChooseUsSoftware.map((item, index) => {
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
              Ready to engineer your custom software? <br className="sm:hidden" /> Get a robust architecture built.
            </h2>
            <p className="text-sm md:text-base text-white/80 max-w-xl mx-auto mb-8">
              We translate workflows into database records, API routes, and optimized web layouts.
            </p>
            <a href="/contact" className="inline-flex px-8 py-4 rounded-xl bg-white hover:bg-white/90 text-brand-orange font-bold uppercase tracking-wider text-xs transition-colors shadow-glow">
              Book a Discovery Call
            </a>
          </div>
        </section>

        <ServiceFAQ faqs={customSoftFaqs} title="Custom Software FAQs" />

        <Contact />
      </main>

      <Footer />
    </div>
  );
}
