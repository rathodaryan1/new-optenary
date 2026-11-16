import { Terminal, Linkedin, Github, Mail, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function StudioStory() {
  const principles = [
    {
      number: '01',
      title: 'Architecture Over Shortcuts',
      desc: 'We never compromise with fragile website builders or bloated templates. Every system is hand-crafted with type-safe TypeScript, clean component architecture, and resilient backends.'
    },
    {
      number: '02',
      title: 'Direct Engineer Access',
      desc: 'You collaborate directly with senior product engineers and our founder. No junior account managers, no telephone games, and no translation loss between your vision and code.'
    },
    {
      number: '03',
      title: 'Deterministic Delivery',
      desc: 'Transparent milestones, private weekly staging URLs, and strict budget predictability. You test and verify features every single week as they are brought to life.'
    },
    {
      number: '04',
      title: 'Autonomous Operational Leverage',
      desc: 'We deploy AI and event-driven automation where they genuinely eliminate repetitive manual labor, cut operating overhead, and accelerate conversion velocity.'
    }
  ];

  return (
    <section id="studio" className="relative py-28 px-6 md:px-12 bg-[#030612] overflow-hidden border-t border-navy-border/50">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-brand-blue/10 rounded-full blur-[170px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[550px] h-[550px] bg-brand-purple/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-navy-card border border-navy-border text-xs font-mono text-brand-cyan uppercase tracking-wider mb-4">
            <Terminal size={12} className="text-brand-cyan" />
            <span>(06) STUDIO PHILOSOPHY // CRAFT & OWNERSHIP</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
            We are a digital product studio{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue via-brand-cyan to-brand-purple">
              obsessed with execution.
            </span>
          </h2>
          <p className="mt-4 text-base text-navy-muted leading-relaxed">
            Headquartered in Gujarat, India, delivering high-performance platforms for forward-thinking brands across the globe.
          </p>
        </div>

        {/* Founder & Ethos Dual Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch mb-16">
          
          {/* Left Column: Founder Card (5 cols) */}
          <div className="lg:col-span-5 glass-panel rounded-2xl p-6 sm:p-8 border border-navy-border flex flex-col justify-between relative group">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="relative w-16 h-16 rounded-2xl overflow-hidden border border-brand-cyan/40 p-0.5 bg-gradient-to-tr from-brand-blue via-brand-cyan to-brand-purple shrink-0 shadow-glow-cyan">
                  <img
                    src="/images/aryan.webp"
                    alt="Aryan Rathod"
                    className="w-full h-full object-cover rounded-xl"
                    loading="lazy"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Aryan Rathod</h3>
                  <span className="text-xs font-mono text-brand-cyan uppercase tracking-wider block">
                    Founder & CEO // Product Architect
                  </span>
                  <div className="text-[11px] font-mono text-navy-muted mt-0.5">
                    Surat / Gujarat, India
                  </div>
                </div>
              </div>

              <blockquote className="text-sm text-slate-300 leading-relaxed font-sans italic border-l-2 border-brand-cyan/60 pl-4 py-1">
                "We founded Optenary with a simple standard: build software that is clean, transparent, and built to scale. No bloat, no superficial agency vanity metrics—only robust digital infrastructure that moves businesses forward."
              </blockquote>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3 rounded-xl bg-navy-base border border-navy-border">
                  <span className="text-[10px] font-mono text-navy-muted uppercase block">Engineering Ethos</span>
                  <span className="text-xs font-mono font-bold text-white">Zero Technical Debt</span>
                </div>
                <div className="p-3 rounded-xl bg-navy-base border border-navy-border">
                  <span className="text-[10px] font-mono text-navy-muted uppercase block">Core Standard</span>
                  <span className="text-xs font-mono font-bold text-brand-cyan">Sub-second Latency</span>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-navy-border/60 flex items-center justify-between">
              <div className="flex gap-3">
                <a
                  href="https://www.linkedin.com/in/rathodaryan/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-navy-card border border-navy-border flex items-center justify-center text-navy-muted hover:text-brand-cyan transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={14} />
                </a>
                <a
                  href="https://github.com/rathodaryan1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-navy-card border border-navy-border flex items-center justify-center text-navy-muted hover:text-brand-blue transition-colors"
                  aria-label="GitHub"
                >
                  <Github size={14} />
                </a>
                <a
                  href="mailto:aryan@optenary.in"
                  className="w-8 h-8 rounded-lg bg-navy-card border border-navy-border flex items-center justify-center text-navy-muted hover:text-white transition-colors"
                  aria-label="Email"
                >
                  <Mail size={14} />
                </a>
              </div>

              <Link
                to="/about"
                className="text-xs font-mono text-brand-cyan hover:underline flex items-center gap-1"
              >
                <span>Read Full Studio Story</span>
                <ArrowRight size={12} />
              </Link>
            </div>
          </div>

          {/* Right Column: 4 Core Principles (7 cols) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {principles.map((item) => (
              <div
                key={item.number}
                className="p-6 rounded-2xl bg-navy-card/60 border border-navy-border/70 hover:border-brand-blue/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <span className="text-xs font-mono font-bold text-brand-cyan block mb-2">
                    PRINCIPLE // {item.number}
                  </span>
                  <h4 className="text-base font-bold text-white mb-2">{item.title}</h4>
                  <p className="text-xs text-navy-muted leading-relaxed font-sans">{item.desc}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-navy-border/40 flex items-center gap-1.5 text-[11px] font-mono text-slate-400">
                  <CheckCircle2 size={12} className="text-emerald-400" />
                  <span>Strict Optenary Guarantee</span>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
