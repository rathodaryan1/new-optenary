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

const aiFaqs = [
  { q: 'What is an AI Voice Agent and how does it help my business?', a: 'An AI Voice Agent is an automated system that handles inbound/outbound calls, answers customer queries, books appointments, and escalates complex issues — all without a human agent. It operates 24/7, reducing your support cost by up to 60%.' },
  { q: 'Can an AI agent integrate with my existing CRM or software?', a: 'Yes. We build AI agents that connect natively with tools like HubSpot, Salesforce, Zoho, WhatsApp, and custom databases via APIs. Your team sees all conversations and data in one place.' },
  { q: 'How long does it take to set up an AI automation system?', a: 'A basic AI chatbot or workflow automation takes 2–4 weeks. A full voice agent with CRM integration, escalation flows, and custom knowledge base takes 6–8 weeks.' },
  { q: 'Is my customer data safe with an AI agent?', a: 'All data is encrypted in transit and at rest. We comply with data protection standards and can deploy agents on your own private cloud infrastructure if your business requires data sovereignty.' },
  { q: 'What industries benefit most from AI automation?', a: 'Real estate, healthcare, e-commerce, logistics, hospitality, and education are seeing the biggest ROI. Any business handling high volumes of repetitive customer interactions is an ideal candidate.' },
];

export default function AIAgentsAutomationPage() {
  const aiSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://optenary.in/services/ai-agents-automation#webpage",
        "url": "https://optenary.in/services/ai-agents-automation",
        "name": "AI Automation & AI Agent Development | Optenary",
        "isPartOf": {
          "@id": "https://optenary.in/#website"
        }
      },
      {
        "@type": "Service",
        "name": "AI Agents & Workflow Automation Services",
        "description": "Optenary designs autonomous AI agents, voice AI assistants, and backend workflow automations using LLMs, n8n, Make, and vector database pipelines.",
        "provider": {
          "@id": "https://optenary.in/#organization"
        },
        "areaServed": "Global",
        "serviceType": "AI & Automation"
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
            "name": "AI & Automation",
            "item": "https://optenary.in/services/ai-agents-automation"
          }
        ]
      }
    ]
  };

  const [activeBuildStep, setActiveBuildStep] = useState<number | null>(null);

  const whatWeBuild = [
    {
      num: "01",
      title: "Autonomous Agents",
      desc: "Custom-designed multi-agent pipelines for lead scoring, automated email replies, and support workflows.",
      color: "#10b981"
    },
    {
      num: "02",
      title: "Voice AI Assistants",
      desc: "Deploying interactive, human-like voice agents on telephony systems, Zoom, and websites using Vapi/Retell.",
      color: "#38bdf8"
    },
    {
      num: "03",
      title: "Workflow Automations",
      desc: "Complex multi-step background sync pipelines connecting your CRMs and database tables via n8n/Make.",
      color: "#339933"
    },
    {
      num: "04",
      title: "Cognitive RPA Tools",
      desc: "Smart screen and document parsing models to extract invoice line items, read contracts, and file forms.",
      color: "#a855f7"
    },
    {
      num: "05",
      title: "Chatbots & Co-pilots",
      desc: "Secure, custom-trained chatbots with RAG pipelines to answer internal knowledge base questions.",
      color: "#eab308"
    },
    {
      num: "06",
      title: "Vector DB Pipelines",
      desc: "Setting up semantic search systems, hybrid text search, and recommendation engines with Pinecone/Qdrant.",
      color: "#f43f5e"
    }
  ];

  const techStack = [
    {
      name: "OpenAI",
      desc: "Cognitive Reasoning LLMs",
      svg: (
        <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 md:w-12 md:h-12 fill-white"><path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.073zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z"/></svg>
      )
    },
    {
      name: "Vapi",
      desc: "Real-time Voice AI Assistants",
      svg: (
        <svg viewBox="0 0 1080 1080" className="w-10 h-10 md:w-12 md:h-12 fill-[#0BD8B6]">
          <path d="M311.61 394.47C294.651 359.673 252.577 345.156 217.635 362.045C182.693 378.933 168.115 420.832 185.074 455.628L297.133 685.547C308.867 709.62 333.351 724.932 360.222 725C387.095 725.067 411.656 709.881 423.513 685.866L537.027 455.948C554.163 421.238 539.8 379.266 504.945 362.201C470.089 345.136 427.942 359.44 410.805 394.149L360.808 495.414L311.61 394.47Z" />
          <path d="M783.392 394.47C771.657 370.395 747.171 355.084 720.301 355.016C693.432 354.948 668.867 370.135 657.012 394.149L543.497 624.068C532.779 645.775 534.069 671.452 546.909 691.985C559.747 712.518 582.318 725 606.608 725H832.183C856.408 725 878.927 712.583 891.787 692.136C904.642 671.689 906.028 646.091 895.448 624.388L783.392 394.47Z" />
        </svg>
      )
    },
    {
      name: "Next.js",
      desc: "Server-Side Frontends",
      svg: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg" alt="Next.js" className="w-10 h-10 md:w-12 md:h-12 object-contain invert" loading="lazy" decoding="async" />
    },
    {
      name: "n8n",
      desc: "Workflow API Orchestration",
      svg: (
        <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 md:w-12 md:h-12 fill-[#FF6D5D]">
          <path d="M12 2a4 4 0 00-4 4 4 4 0 001.373 3H4a4 4 0 00-4 4 4 4 0 004 4 4 4 0 004-4c0-.28-.035-.55-.098-.814L10.385 10A4 4 0 0012 10a4 4 0 001.615.347l2.483 2.839A4 4 0 0016 14a4 4 0 004 4 4 4 0 004-4 4 4 0 00-4-4 4 4 0 00-1.373.253L16.63 7.828A4 4 0 0016 6a4 4 0 00-4-4zm-8 10a2 2 0 110 4 2 2 0 010-4zm16 0a2 2 0 110 4 2 2 0 010-4zm-8-8a2 2 0 110 4 2 2 0 010-4z"/>
        </svg>
      )
    },
    {
      name: "Node.js",
      desc: "Scalable JS Backends",
      svg: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" alt="Node.js" className="w-10 h-10 md:w-12 md:h-12 object-contain" loading="lazy" decoding="async" />
    },
    {
      name: "Python",
      desc: "Data Science & Agent Logic",
      svg: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" alt="Python" className="w-10 h-10 md:w-12 md:h-12 object-contain" loading="lazy" decoding="async" />
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
    }
  ];

  const whyChooseUsAI = [
    {
      title: "Immediate latency optimizations",
      desc: "We tune chunking, token pipelines, and streaming WebSocket protocols to cut AI generation latencies under 500ms.",
      icon: Cpu
    },
    {
      title: "HIPAA & GDPR-compliant privacy",
      desc: "Configuring local hosting options, enterprise LLM agreements, and strict PII filters so data never leaks to models.",
      icon: ShieldCheck
    },
    {
      title: "Uptime monitoring & failovers",
      desc: "Configured backup LLM switches (e.g. Claude to GPT fallback) to protect automated workflows from vendor downtime.",
      icon: Zap
    },
    {
      title: "Strict evaluation & unit testing",
      desc: "Integrating validation suites (Ragas, TruLens) to audit model hallucinations, response metrics, and prompt structures.",
      icon: Layout
    },
    {
      title: "Cost management and auditing",
      desc: "Token usage logs, semantic caching (Redis), and LLM cost-monitoring dashboards to manage APIs and prevent billing spikes.",
      icon: Headphones
    },
    {
      title: "Strict visual logging systems",
      desc: "Custom debug logs for prompt nodes, memory states, agent tools, and API calls to monitor automations in real time.",
      icon: Network
    }
  ];

  return (
    <div className="min-h-screen bg-dark-bg text-white selection:bg-brand-orange selection:text-dark-bg antialiased flex flex-col justify-between">
      <SEO 
        title="AI Automation &amp; AI Agent Development | Optenary"
        description="Deploy autonomous AI voice agents, custom RAG chatbots, and intelligent background workflow automation pipelines using n8n, Make, Vapi, and Retell."
        keywords="AI agents, workflow automation, autonomous agents, voice AI assistants, vector DB pipelines, OpenAI integrations, n8n automation"
        canonicalPath="/services/ai-agents-automation"
        schema={aiSchema}
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
              Autonomous AI Agents & <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-brand-orangeLight">
                Intelligent Workflow Pipelines
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="text-base md:text-xl text-dark-muted font-medium max-w-4xl mx-auto leading-relaxed mb-10"
            >
              We engineer multi-agent systems and cognitive automation workflows that run 24/7. Connecting LLMs, vector search, voice streams, and API orchestration tools, we construct resilient agents that execute complex business tasks with speed and precision.
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
                href="#why-choose-ai" 
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-dark-card hover:bg-dark-light border border-dark-border hover:border-brand-orange text-white font-bold uppercase tracking-wider text-sm transition-all transform hover:-translate-y-1"
              >
                Why AI & Automation?
              </a>
            </motion.div>
          </div>
        </section>

        {/* Global Partner Section */}
        <section className="bg-[#050607] py-20 px-6 md:px-12 border-y border-dark-border/40 relative">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-4xl font-extrabold text-white mb-6">
              AI & Workflow Automation <span className="text-brand-orange">Partner Worldwide</span>
            </h2>
            <p className="text-sm md:text-base text-dark-muted leading-relaxed">
              Optenary delivers fast, secure, and production-ready AI solutions with custom vector indexes, streaming voice agents, and robust n8n backend architectures. We help enterprises eliminate routine tasks, integrate <a href="/services/custom-software" className="text-brand-orange hover:underline font-semibold">custom software systems</a>, and optimize frontend <a href="/services/web-development" className="text-brand-orange hover:underline font-semibold">web applications</a> for cost savings.
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
                AI Agent & Automation <span className="text-brand-orange">Solutions We Deliver</span>
              </h2>
              <p className="text-dark-muted max-w-2xl mx-auto text-sm md:text-base">
                We design and integrate autonomous systems, custom model structures, and cognitive RPA tools.
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
                Enterprise AI Architectures
              </h3>
              <p className="text-dark-muted max-w-2xl mx-auto text-sm md:text-base text-center mb-12">
                We orchestrate high-performance cognitive agents and automation pipelines with bleeding-edge models.
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
        <section id="why-choose-ai" className="bg-[#050607] py-24 px-6 md:px-12 relative border-y border-dark-border/40">
          <div className="absolute top-10 right-10 w-72 h-72 rounded-full bg-brand-orange/5 blur-[120px] pointer-events-none" />

          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4">
                Why Choose Optenary for <span className="text-brand-orange">AI & Automation</span>
              </h2>
              <p className="text-dark-muted max-w-3xl mx-auto text-sm md:text-base leading-relaxed">
                We combine industry-standard model architectures, private endpoint configurations, and automated visual sync graphs to build enterprise workflows that reduce error rates to near-zero.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
              {whyChooseUsAI.map((item, index) => {
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
              Streamline operational overheads <br className="sm:hidden" /> with autonomous agents.
            </h2>
            <p className="text-sm md:text-base text-white/80 max-w-xl mx-auto mb-8">
              We design model prompts, clean vector context databases, and automated system triggers.
            </p>
            <a href="/contact" className="inline-flex px-8 py-4 rounded-xl bg-white hover:bg-white/90 text-brand-orange font-bold uppercase tracking-wider text-xs transition-colors shadow-glow">
              Book a Discovery Call
            </a>
          </div>
        </section>

        <ServiceFAQ faqs={aiFaqs} title="AI Automation FAQs" />

        <Contact />
      </main>

      <Footer />
    </div>
  );
}
