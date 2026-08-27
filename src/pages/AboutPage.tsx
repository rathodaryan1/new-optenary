import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight, ArrowDownRight, ArrowUpRight } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SEO from '../components/SEO';

export default function AboutPage() {
  const aboutSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "AboutPage",
        "@id": "https://optenary.in/about#webpage",
        "url": "https://optenary.in/about",
        "name": "About Us - Optenary",
        "isPartOf": {
          "@id": "https://optenary.in/#website"
        }
      },
      {
        "@type": "Person",
        "@id": "https://optenary.in/about#aryan-rathod",
        "name": "Aryan Rathod",
        "jobTitle": "Founder & CEO",
        "worksFor": {
          "@type": "Organization",
          "name": "Optenary",
          "url": "https://optenary.in/"
        },
        "url": "https://optenary.in/about",
        "sameAs": "https://www.linkedin.com/in/rathodaryan/",
        "description": "Aryan Rathod is the Founder & CEO of Optenary, a future-focused technology company driven by innovation, creativity, and a passion for building impactful digital solutions."
      },
      {
        "@type": "Person",
        "@id": "https://optenary.in/about#arjun-parmar",
        "name": "Arjun Parmar",
        "jobTitle": "COO",
        "worksFor": {
          "@type": "Organization",
          "name": "Optenary",
          "url": "https://optenary.in/"
        },
        "url": "https://optenary.in/about",
        "sameAs": "https://www.linkedin.com/in/arjun-parmar-7b6663241/",
        "description": "Arjun Parmar is an operations and business strategy leader and COO of Optenary, specializing in streamlining processes and managing operations."
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://optenary.in/about#breadcrumb",
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
            "name": "About Us",
            "item": "https://optenary.in/about"
          }
        ]
      }
    ]
  };

  const industries = [
    "Edtech", "Real Estate", "Startup", "SaaS", "E-commerce",
    "MVP", "EMS, CRM", "B2B Portal", "Automobile", "Career",
    "Consulting", "Fin-tech", "Automation", "IOT Platforms", "Social Media"
  ];

  const valueList = [
    "Proven experience building scalable systems across global industries",
    "Predictable delivery lifecycles with absolute transparency",
    "Seamless integration with teams across global time zones",
    "Uncompromising focus on low-latency, ironclad security, and scaling layers",
    "Expert product consultation matching modern technical standards"
  ];

  const differenceCards = [
    { title: "Architecture First", row: 1 },
    { title: "Deterministic Timelines", row: 2 },
    { title: "SLA-Driven Performance", row: 1 },
    { title: "Direct Founder Engagement", row: 2 },
    { title: "Startups & Fortune Enterprises", row: 1 },
    { title: "Long-Term Value Alignment", row: 2 }
  ];

  const missionPointsLeft = [
    "Constructing secure, resilient, and optimized software foundations",
    "Accelerating time-to-market for scaling digital brands",
    "Ensuring engineering consistency and project accountability",
    "Translating complicated workflows into simple web interfaces"
  ];

  const missionPointsRight = [
    "Establishing long-term technology partnerships globally",
    "Pioneering AI-first product strategies for business growth",
    "Building premium, human-centric visual interfaces",
    "Standardizing software delivery with high-performance codebases"
  ];

  return (
    <div className="min-h-screen bg-dark-bg text-white selection:bg-brand-orange selection:text-dark-bg antialiased flex flex-col justify-between">
      <SEO
        title="About Optenary | Custom Software &amp; AI Development"
        description="Learn about Optenary, a global technology partner founded by Aryan Rathod and Arjun Parmar. We specialize in custom software engineering, mobile apps, and AI workflow automations."
        keywords="about optenary, aryan rathod, arjun parmar, custom software development company, tech partner, app development agency"
        canonicalPath="/about"
        schema={aboutSchema}
      />
      {/* Header component */}
      <Header />

      <main className="flex-grow bg-[#050607] relative overflow-hidden">
        {/* Decorative background glows */}
        <div className="absolute top-24 left-1/4 w-[400px] h-[400px] rounded-full bg-brand-orange/5 blur-[160px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-brand-orangeLight/5 blur-[160px] pointer-events-none" />

        {/* ========================================== */}
        {/* HERO SECTION                               */}
        {/* ========================================== */}
        <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto relative z-10 text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-brand-orange text-xs font-bold uppercase tracking-widest inline-block mb-4"
          >
            About Optenary
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-extrabold text-white leading-tight max-w-5xl mx-auto mb-6"
          >
            Your Global Technology Partner for <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-brand-orangeLight">AI Automation</span> & Custom Software Development
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-dark-muted max-w-4xl mx-auto text-sm md:text-base leading-relaxed mb-10"
          >
            Optenary is a global technology partner specializing in custom web engineering, high-performance mobile apps, and enterprise-grade software. We collaborate with forward-thinking startups and established brands worldwide, delivering robust digital products engineered for long-term scale, security, and market impact.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <a
              href="https://cal.com/optenary"
              target="_blank"
              rel="noopener noreferrer"
              className="px-7 py-3.5 rounded-xl bg-brand-orange hover:bg-brand-orangeDark text-dark-bg font-bold uppercase tracking-wider text-xs transition-all transform hover:-translate-y-0.5 shadow-glow"
            >
              Let's Build Together
            </a>
            <button
              onClick={() => document.getElementById('who-we-are')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-7 py-3.5 rounded-xl bg-dark-card hover:bg-dark-light border border-dark-border text-white font-bold uppercase tracking-wider text-xs transition-colors"
            >
              Why Optenary?
            </button>
          </motion.div>
        </section>

        {/* ========================================== */}
        {/* WHO WE ARE SECTION                         */}
        {/* ========================================== */}
        <section id="who-we-are" className="py-20 px-6 md:px-12 border-t border-dark-border/40 bg-dark-card/10">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">

            {/* Left: Industries served grid */}
            <div className="lg:col-span-6 grid grid-cols-3 gap-3">
              {industries.map((ind, idx) => (
                <div
                  key={idx}
                  className="px-3 py-4 rounded-xl bg-dark-card/60 border border-dark-border text-center text-xs text-white/90 font-semibold hover:border-brand-orange/40 hover:text-white transition-all cursor-default select-none shadow-sm"
                >
                  {ind}
                </div>
              ))}
            </div>

            {/* Right: Who we are text block */}
            <div className="lg:col-span-6">
              <span className="text-brand-orange text-xs font-bold uppercase tracking-widest block mb-4">
                Who We Are
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white mt-4 mb-6 leading-tight">
                A digital innovation studio building <span className="text-brand-orange">resilient software infrastructure.</span>
              </h2>
              <p className="text-sm md:text-base text-dark-muted leading-relaxed mb-4">
                Optenary is composed of technical engineers, interface designers, and product growth leaders. We believe software is the core engine of modern business growth, demanding strict design values and deep technical execution.
              </p>
              <p className="text-sm md:text-base text-dark-muted leading-relaxed mb-8">
                We operate as your specialized technology partner, bridging the gap between raw concept prototypes and highly optimized, globally scaled applications.
              </p>
              <a
                href="https://cal.com/optenary"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex px-7 py-3.5 rounded-xl bg-brand-orange hover:bg-brand-orangeDark text-dark-bg font-bold uppercase tracking-wider text-xs transition-all shadow-glow"
              >
                Book a Discovery Call
              </a>
            </div>

          </div>
        </section>

        {/* ========================================== */}
        {/* WHY CLIENTS CHOOSE OPTENARY                */}
        {/* ========================================== */}
        <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-dark-border/40">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

            {/* Left text */}
            <div className="lg:col-span-5">
              <span className="text-brand-orange text-xs font-bold uppercase tracking-widest block mb-4">
                Why Choose Us
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white mt-4 mb-6 leading-tight">
                Uncompromising <span className="text-brand-orange">Engineering Standards</span>
              </h2>
              <p className="text-sm md:text-base text-dark-muted leading-relaxed">
                Optenary balances high operational velocity with deep technical strategy. We construct scalable cloud backends, secure multi-tenant SaaS architectures, and high-performance frontend interfaces.
              </p>
            </div>

            {/* Right bullet lists */}
            <div className="lg:col-span-7 space-y-5">
              {valueList.map((val, idx) => (
                <div key={idx} className="flex gap-4 p-5 rounded-2xl bg-dark-card/50 border border-dark-border hover:border-brand-orange/20 transition-all items-start">
                  <div className="w-6 h-6 rounded-full bg-brand-orange/10 flex items-center justify-center text-brand-orange shrink-0 mt-0.5">
                    <CheckCircle2 size={15} />
                  </div>
                  <span className="text-sm md:text-base text-white/95 font-medium">{val}</span>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* ========================================== */}
        {/* WHAT MAKES US DIFFERENT                    */}
        {/* ========================================== */}
        <section className="py-24 px-6 md:px-12 border-t border-dark-border/40 bg-dark-card/10">
          <div className="max-w-7xl mx-auto text-center mb-16">
            <span className="px-3 py-1 rounded-full bg-brand-orange/10 border border-brand-orange/20 text-brand-orange text-xs font-semibold uppercase tracking-wider">
              Why Optenary
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mt-4 mb-4">
              What Makes <span className="text-brand-orange">Optenary Different</span>
            </h2>
            <p className="text-dark-muted max-w-xl mx-auto text-sm md:text-base">
              Strategy, scalability, and execution aligned to your business goals.
            </p>
          </div>

          {/* Diamond flowchart cards container */}
          <div className="max-w-6xl mx-auto py-16 pb-28 relative">

            {/* Desktop interlocking grid */}
            <div className="hidden lg:grid grid-cols-6 gap-x-6 relative">
              {differenceCards.map((card, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col items-center justify-center relative group h-48 ${card.row === 2 ? 'translate-y-12' : '-translate-y-12'
                    }`}
                >
                  {/* Rotated diamond background */}
                  <div className="absolute w-36 h-36 border border-dark-border bg-dark-card/80 rotate-45 rounded-2xl group-hover:border-brand-orange/30 group-hover:bg-dark-card transition-all duration-300 shadow-glow" />

                  {/* Horizontal text layer */}
                  <div className="relative z-10 w-32 text-center text-xs md:text-sm font-extrabold text-white/95 leading-snug px-3 pointer-events-none">
                    {card.title}
                  </div>

                  {/* Flow Arrow */}
                  {idx < 5 && (
                    card.row === 2 ? (
                      <ArrowUpRight className="absolute top-[calc(50%_-_48px)] left-[calc(100%_+_12px)] -translate-x-1/2 -translate-y-1/2 text-brand-orange w-6 h-6 animate-pulse z-20 pointer-events-none" />
                    ) : (
                      <ArrowDownRight className="absolute top-[calc(50%_+_48px)] left-[calc(100%_+_12px)] -translate-x-1/2 -translate-y-1/2 text-brand-orange w-6 h-6 animate-pulse z-20 pointer-events-none" />
                    )
                  )}
                </div>
              ))}
            </div>

            {/* Mobile/Tablet simple list view */}
            <div className="lg:hidden grid grid-cols-1 md:grid-cols-2 gap-4">
              {differenceCards.map((card, idx) => (
                <div key={idx} className="p-6 rounded-2xl bg-dark-card border border-dark-border flex items-center justify-start gap-4">
                  <div className="w-8 h-8 rounded-xl bg-brand-orange/10 flex items-center justify-center text-brand-orange font-black shrink-0">
                    {idx + 1}
                  </div>
                  <span className="text-sm font-bold text-white/90">{card.title}</span>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* ========================================== */}
        {/* MISSION & VISION                           */}
        {/* ========================================== */}
        <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-dark-border/40">
          <div className="text-center mb-16">
            <span className="text-brand-orange text-xs font-bold uppercase tracking-widest block mb-4">
              Mission & Vision
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mt-4 mb-4">
              Mission & <span className="text-brand-orange">Vision</span>
            </h2>
            <p className="text-dark-muted max-w-2xl mx-auto text-sm md:text-base">
              To help businesses worldwide transform ideas into powerful digital products with clarity, speed, and trust.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 max-w-5xl mx-auto">
            <div className="space-y-4">
              {missionPointsLeft.map((point, idx) => (
                <div key={idx} className="flex gap-3 items-center">
                  <div className="text-brand-orange shrink-0">
                    <CheckCircle2 size={16} />
                  </div>
                  <span className="text-sm md:text-base text-white/90 font-medium">{point}</span>
                </div>
              ))}
            </div>
            <div className="space-y-4">
              {missionPointsRight.map((point, idx) => (
                <div key={idx} className="flex gap-3 items-center">
                  <div className="text-brand-orange shrink-0">
                    <CheckCircle2 size={16} />
                  </div>
                  <span className="text-sm md:text-base text-white/90 font-medium">{point}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================== */}
        {/* THE MIND BEHIND OPTENARY                   */}
        {/* ========================================== */}
        <section className="py-24 px-6 md:px-12 border-t border-dark-border/40 bg-dark-card/10">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <span className="text-brand-orange text-xs font-bold uppercase tracking-widest block mb-4">
                Team
              </span>
              <h2 className="text-3xl md:text-5xl font-extrabold text-white mt-4 mb-4">
                The Mind Behind <span className="text-brand-orange">Optenary</span>
              </h2>
              <p className="text-dark-muted max-w-xl mx-auto text-sm md:text-base">
                The vision, experience, and thinking shaping how we build technology.
              </p>
            </div>

            <div className="space-y-24 max-w-5xl mx-auto">

              {/* Profile 1: Aryan Rathod */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

                {/* Photo Left */}
                <div className="lg:col-span-5 flex justify-center">
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-brand-orange to-brand-orangeLight rounded-2xl blur-[12px] opacity-25 group-hover:opacity-40 transition-opacity" />
                    <img
                      src="/images/aryan.webp"
                      alt="Aryan Rathod"
                      className="w-full max-w-[320px] aspect-[4/5] object-cover rounded-2xl border border-dark-border shadow-glow grayscale hover:grayscale-0 transition-all duration-300"
                    loading="lazy" decoding="async" />
                  </div>
                </div>

                {/* Text Right */}
                <div className="lg:col-span-7">
                  <h3 className="text-2xl font-bold text-white mb-2">Aryan Rathod</h3>
                  <span className="text-brand-orange font-bold uppercase tracking-wider text-xs block mb-6">Founder & CEO</span>

                  <div className="space-y-4 text-sm md:text-base text-dark-muted leading-relaxed mb-8">
                    <p>
                      Aryan Rathod is the Founder & CEO of Optenary, a future-focused technology company driven by innovation, creativity, and a passion for building impactful digital solutions.
                    </p>
                    <p>
                      His journey began during the second year of his Diploma in Computer Engineering, fueled by a strong interest in technology and a desire to create something meaningful. What started as curiosity quickly evolved into a vision of building products that solve real problems and create value for businesses.
                    </p>
                    <p>
                      Today, through Optenary, Aryan helps startups and businesses build web applications, mobile applications, SaaS platforms, AI solutions, and automation systems. His focus is on turning ideas into scalable digital products that drive growth, efficiency, and long-term success.
                    </p>
                  </div>

                  <a
                    href="https://www.linkedin.com/in/rathodaryan/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-orange hover:bg-brand-orangeDark text-dark-bg font-bold uppercase tracking-wider text-xs transition-all shadow-glow"
                   aria-label="LinkedIn">
                    <span>Connect on LinkedIn</span>
                    <ArrowRight size={13} />
                  </a>
                </div>

              </div>

              {/* Profile 2: Arjun Parmar */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pt-8">

                {/* Text Left (Desktop) */}
                <div className="lg:col-span-7 order-2 lg:order-1">
                  <h3 className="text-2xl font-bold text-white mb-2">Arjun Parmar</h3>
                  <span className="text-brand-orange font-bold uppercase tracking-wider text-xs block mb-6">COO</span>

                  <div className="space-y-4 text-sm md:text-base text-dark-muted leading-relaxed mb-8">
                    <p>
                      Arjun Parmar is an operations and business strategy leader with a strong focus on execution, client success, and sustainable growth. He specializes in streamlining processes, managing operations, and ensuring that ideas are transformed into successful outcomes through efficient planning and coordination.
                    </p>
                    <p>
                      As COO at Optenary, Arjun oversees business operations, client relationships, project delivery, and organizational growth across web applications, mobile applications, SaaS platforms, and AI-driven solutions. His approach emphasizes operational excellence, clear communication, and building long-term partnerships that create value for clients.
                    </p>
                    <p>
                      Beyond daily operations, Arjun works closely with founders, clients, and teams to optimize workflows, improve execution systems, and align business objectives with strategic growth. His strength lies in bringing structure, clarity, and efficiency to every stage of the business journey.
                    </p>
                  </div>

                  <a
                    href="https://www.linkedin.com/in/arjun-parmar-7b6663241/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-orange hover:bg-brand-orangeDark text-dark-bg font-bold uppercase tracking-wider text-xs transition-all shadow-glow"
                   aria-label="LinkedIn">
                    <span>Connect on LinkedIn</span>
                    <ArrowRight size={13} />
                  </a>
                </div>

                {/* Photo Right */}
                <div className="lg:col-span-5 flex justify-center order-1 lg:order-2">
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-brand-orange to-brand-orangeLight rounded-2xl blur-[12px] opacity-25 group-hover:opacity-40 transition-opacity" />
                    <img
                      src="/images/arjun.webp"
                      alt="Arjun Parmar"
                      className="w-full max-w-[320px] aspect-[4/5] object-cover rounded-2xl border border-dark-border shadow-glow grayscale hover:grayscale-0 transition-all duration-300"
                    loading="lazy" decoding="async" />
                  </div>
                </div>

              </div>

            </div>
          </div>
        </section>

        {/* ========================================== */}
        {/* BOTTOM CTA BANNER                          */}
        {/* ========================================== */}
        <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden py-16 px-6 md:px-16 text-center border border-dark-border shadow-glow bg-gradient-to-br from-brand-orange/20 via-dark-card to-brand-orangeLight/10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.15),transparent_60%)] pointer-events-none" />

            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tight leading-tight">
                Your vision deserves the <span className="text-brand-orangeLight">right tech partner.</span>
              </h2>
              <p className="text-dark-muted text-sm md:text-base leading-relaxed mb-8">
                Let's build something reliable, scalable, and future-ready together.
              </p>
              <a
                href="https://cal.com/optenary"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-8 py-4 rounded-xl bg-white hover:bg-slate-100 text-dark-bg font-black uppercase tracking-wider text-xs transition-all transform hover:scale-105 shadow-lg"
              >
                Book a Discovery Call
              </a>
            </div>
          </div>
        </section>

      </main>

      {/* Footer component */}
      <Footer />
    </div>
  );
}
