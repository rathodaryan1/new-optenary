import { motion } from 'framer-motion';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Portfolio from '../components/Portfolio';
import Contact from '../components/Contact';
import SEO from '../components/SEO';
import ServiceFAQ from '../components/ServiceFAQ';

const desktopFaqs = [
  { q: 'What technologies do you use for desktop development?', a: 'We build native and cross-platform desktop applications using Tauri, Electron, Rust, C#, and Qt. We choose the stack based on system performance requirements and target operating systems (Windows, macOS, or Linux).' },
  { q: 'Will the desktop application work offline?', a: 'Yes. Offline-first execution is a core benefit of desktop apps. We design applications to store data locally via SQLite or embedded databases and synchronize with remote servers once a network connection is established.' },
  { q: 'Can you integrate desktop apps with local hardware and USB devices?', a: 'Yes. We build low-level system integrations that communicate directly with USB peripherals, hardware sensors, printers, scanners, and custom serial ports.' },
  { q: 'Who owns the desktop application code?', a: 'You retain 100% intellectual property ownership. Upon final payment, the complete source code, asset assets, compilation scripts, and setup installers are transferred to you.' },
  { q: 'How do you handle updates and patches for desktop apps?', a: 'We implement automated over-the-air (OTA) update frameworks like Tauri Updater. When a new version is released, the application securely prompts the user and auto-installs the patch without manual friction.' }
];

export default function DesktopDevelopmentPage() {
  const desktopSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Desktop Application Development Services",
    "description": "Optenary builds high-performance, secure cross-platform desktop applications for Windows, macOS, and Linux.",
    "provider": {
      "@type": "Organization",
      "name": "Optenary",
      "url": "https://optenary.in/"
    },
    "areaServed": "Global",
    "serviceType": "Desktop Application Development"
  };

  const whatWeBuild = [
    { title: "Windows native app development", row: 1 },
    { title: "Integration with web and mobile systems", row: 2 },
    { title: "Backend APIs and secure cloud sync", row: 1 },
    { title: "Rust Desktop app development", row: 2 },
    { title: "POS Systems", row: 1 },
    { title: "Internal Desktop Tools", row: 2 }
  ];

  const techStack = [
    {
      name: "Rust",
      desc: "Systems & Safety Logic",
      svg: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/rust/rust-original.svg" alt="Rust" className="w-10 h-10 md:w-12 md:h-12 object-contain invert" loading="lazy" decoding="async" />
    },
    {
      name: ".NET",
      desc: "Windows App Ecosystem",
      svg: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/dot-net/dot-net-original.svg" alt=".NET" className="w-10 h-10 md:w-12 md:h-12 object-contain" loading="lazy" decoding="async" />
    },
    {
      name: "Java",
      desc: "Cross-Platform Runtime",
      svg: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg" alt="Java" className="w-10 h-10 md:w-12 md:h-12 object-contain" loading="lazy" decoding="async" />
    },
    {
      name: "Python",
      desc: "Data Processing & AI Tools",
      svg: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" alt="Python" className="w-10 h-10 md:w-12 md:h-12 object-contain" loading="lazy" decoding="async" />
    },
    {
      name: "MongoDB",
      desc: "Flexible Document DB",
      svg: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg" alt="MongoDB" className="w-10 h-10 md:w-12 md:h-12 object-contain" loading="lazy" decoding="async" />
    },
    {
      name: "C++",
      desc: "High-Performance Compiles",
      svg: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg" alt="C++" className="w-10 h-10 md:w-12 md:h-12 object-contain" loading="lazy" decoding="async" />
    },
    {
      name: "Tauri",
      desc: "Modern Cross-Platform Apps",
      svg: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tauri/tauri-original.svg" alt="Tauri" className="w-10 h-10 md:w-12 md:h-12 object-contain" loading="lazy" decoding="async" />
    },
    {
      name: "AWS",
      desc: "Cloud Infrastructure",
      svg: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" alt="AWS" className="w-10 h-10 md:w-12 md:h-12 object-contain" loading="lazy" decoding="async" />
    }
  ];

  return (
    <div className="min-h-screen bg-dark-bg text-white selection:bg-brand-orange selection:text-dark-bg antialiased flex flex-col justify-between">
      <SEO 
        title="Desktop Application Development - Optenary"
        description="Optenary engineers native and cross-platform desktop applications for Windows, macOS, and Linux using Tauri, Electron, and C#."
        keywords="desktop development, native app development, tauri development, electron app development, custom desktop software"
        canonicalPath="/services/desktop-development"
        schema={desktopSchema}
      />
      <Header />

      <main className="flex-grow bg-[#050607] relative overflow-hidden">
        {/* Glows */}
        <div className="absolute top-24 left-1/4 w-80 h-80 rounded-full bg-brand-orange/5 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-brand-orange/5 blur-[150px] pointer-events-none" />

        {/* Hero Section */}
        <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto relative z-10 text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-brand-orange text-xs font-bold uppercase tracking-widest inline-block mb-4"
          >
            Desktop Engineering
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-extrabold text-white leading-tight max-w-5xl mx-auto mb-6"
          >
            High-Performance Desktop <br />Application <span className="text-brand-orange">Engineering Worldwide</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-dark-muted max-w-4xl mx-auto text-sm md:text-base leading-relaxed mb-10"
          >
            Optenary designs and develops low-latency, secure, and deeply integrated desktop applications that run close to the metal. From custom local database engines to hardware integrations and multi-threaded tools, we deliver native-grade desktop solutions across Windows, macOS, and Linux.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
          >
            <a
              href="/contact"
              className="px-7 py-3.5 rounded-xl bg-brand-orange hover:bg-brand-orangeDark text-dark-bg font-bold uppercase tracking-wider text-xs transition-all transform hover:-translate-y-0.5 shadow-glow"
            >
              Start Desktop Project
            </a>
          </motion.div>
        </section>

        {/* Flowchart Section: What We Build */}
        <section className="py-24 px-6 md:px-12 border-t border-dark-border/40 bg-dark-card/10">
          <div className="max-w-7xl mx-auto text-center mb-16">
            <span className="px-3.5 py-1.5 rounded-full bg-[#161b22] border border-[#30363d] text-white text-[10px] font-bold uppercase tracking-widest inline-block mb-4">
              What We Build
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mt-4 mb-4">
              Desktop App Development Services <span className="text-brand-orange">We Provide</span>
            </h2>
            <p className="text-dark-muted max-w-2xl mx-auto text-sm md:text-base">
              We offer end-to-end desktop software development tailored to business needs, delivering secure, high-performance applications across Windows, macOS, and cross-platform environments.
            </p>
          </div>

          <div className="max-w-6xl mx-auto py-16 pb-28 relative">
            {/* Desktop interlocking grid */}
            <div className="hidden lg:grid grid-cols-6 gap-x-6 relative">
              {whatWeBuild.map((card, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col items-center justify-center relative group h-48 ${
                    card.row === 2 ? 'translate-y-12' : '-translate-y-12'
                  }`}
                >
                  {/* Rotated diamond background */}
                  <div className="absolute w-36 h-36 border border-dark-border bg-dark-card/85 rotate-45 rounded-2xl group-hover:border-brand-orange/40 group-hover:bg-dark-card transition-all duration-300 shadow-glow" />

                  {/* Horizontal text layer */}
                  <div className="relative z-10 w-32 text-center text-[11px] font-extrabold text-white/95 leading-snug px-3 pointer-events-none">
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
              {whatWeBuild.map((card, idx) => (
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

        {/* Tech Stack */}
        <section className="py-24 px-6 md:px-12 border-t border-dark-border/40">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col items-center w-full max-w-5xl mx-auto">
              {/* Pill header */}
              <div className="mb-6">
                <span className="px-4 py-1.5 rounded-full border border-brand-orange/30 bg-brand-orange/10 text-brand-orange text-[10px] font-bold uppercase tracking-widest">
                  Tech Stack
                </span>
              </div>

              <h3 className="text-3xl md:text-5xl font-extrabold text-white text-center mb-4 tracking-tight">
                Enterprise Desktop Architectures
              </h3>
              <p className="text-dark-muted max-w-2xl mx-auto text-sm md:text-base text-center mb-12">
                We utilize native compiler toolchains and hardware-integrated software stacks to build high-performance tools.
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

        {/* FAQ */}
        <ServiceFAQ faqs={desktopFaqs} />

        {/* Case Studies */}
        <Portfolio />

        {/* Contact */}
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
