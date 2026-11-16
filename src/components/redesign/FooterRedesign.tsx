import { Instagram, Linkedin, ArrowUpRight, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function FooterRedesign() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#01030a] text-white border-t border-navy-border/60 overflow-hidden font-sans">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-brand-blue/5 blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-20 pb-12 relative z-10">

        {/* Top Grid: Brand & Directory Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-navy-border/60">

          {/* Brand Info (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <a href="/home" className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-navy-card border border-navy-border p-1 flex items-center justify-center">
                <img
                  src="/images/logo.webp"
                  alt="Optenary Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <img
                src="/images/logoText.svg"
                alt="Optenary Wordmark"
                className="h-4 w-auto"
              />
            </a>

            <p className="text-xs sm:text-sm text-navy-muted leading-relaxed max-w-sm font-sans">
              Where Technology Evolves. We design and engineer custom software, web platforms, mobile applications, and autonomous AI systems for forward-thinking enterprises.
            </p>

            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>All Systems Operational // 99.9% Production SLA</span>
            </div>

            {/* Optenary OS link */}
            <div className="p-3.5 rounded-xl bg-navy-card/80 border border-navy-border text-xs font-mono text-navy-muted flex items-center justify-between max-w-sm">
              <div>
                <span className="text-white font-bold block">Optenary OS</span>
                <span className="text-[11px] text-navy-muted">Enterprise Cloud Platform</span>
              </div>
              <a
                href="https://app.optenary.in"
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 py-1 rounded-md bg-brand-blue/20 text-brand-cyan hover:text-white border border-brand-blue/30 text-[11px] flex items-center gap-1 transition-colors"
              >
                <span>app.optenary.in</span>
                <ExternalLink size={10} />
              </a>
            </div>
          </div>

          {/* Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-wider text-white font-bold">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs font-mono text-navy-muted">
              <li><a href="#home" className="hover:text-brand-cyan transition-colors">00 / Home</a></li>
              <li><a href="#work" className="hover:text-brand-cyan transition-colors">01 / Verified Work</a></li>
              <li><a href="#services" className="hover:text-brand-cyan transition-colors">02 / Services</a></li>
              <li><a href="#process" className="hover:text-brand-cyan transition-colors">03 / Lifecycle</a></li>
              <li><a href="#capabilities" className="hover:text-brand-cyan transition-colors">04 / Architecture</a></li>
              <li><a href="#studio" className="hover:text-brand-cyan transition-colors">05 / Studio Ethos</a></li>
              <li><a href="#contact" className="hover:text-brand-cyan transition-colors">06 / Contact</a></li>
            </ul>
          </div>

          {/* Engineering Domains (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-wider text-white font-bold">
              Engineering Domains
            </h4>
            <ul className="space-y-2.5 text-xs font-mono text-navy-muted">
              <li><Link to="/services/web-development" className="hover:text-white transition-colors">Web Development</Link></li>
              <li><Link to="/services/mobile-development" className="hover:text-white transition-colors">Mobile Applications</Link></li>
              <li><Link to="/services/ai-agents-automation" className="hover:text-white transition-colors">AI Agents & Automation</Link></li>
              <li><Link to="/services/custom-software" className="hover:text-white transition-colors">Custom Software & SaaS</Link></li>
              <li><Link to="/services/custom-ecommerce-development" className="hover:text-white transition-colors">Headless E-Commerce</Link></li>
              <li><Link to="/projects/mehta-dairy" className="text-brand-cyan hover:underline flex items-center gap-1">Mehta Dairy Case Study <ArrowUpRight size={11} /></Link></li>
            </ul>
          </div>

          {/* Direct Line & Socials (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-wider text-white font-bold">
              Direct Channels
            </h4>
            <div className="space-y-2.5 text-xs font-mono text-navy-muted">
              <a href="tel:+919316688014" className="block hover:text-white transition-colors">
                +91 9316688014
              </a>
              <a href="mailto:info@optenary.in" className="block hover:text-white transition-colors">
                info@optenary.in
              </a>
              <a href="https://wa.me/919316688014" target="_blank" rel="noopener noreferrer" className="block text-emerald-400 hover:text-emerald-300 transition-colors">
                WhatsApp Line
              </a>
              <div className="pt-2 flex items-center gap-3">
                <a
                  href="https://www.instagram.com/optenary/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-navy-card border border-navy-border flex items-center justify-center text-navy-muted hover:text-brand-cyan transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram size={14} />
                </a>
                <a
                  href="https://www.linkedin.com/company/optenary/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-navy-card border border-navy-border flex items-center justify-center text-navy-muted hover:text-brand-blue transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={14} />
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Giant Metallic Wordmark (Reachwise-inspired signature flourish) */}
        <div className="py-12 select-none overflow-hidden text-center">
          <span className="text-[14vw] font-black uppercase tracking-tighter leading-none text-transparent bg-clip-text bg-gradient-to-b from-[#151f42]/60 via-[#0a0f26]/40 to-transparent block font-sans">
            OPTENARY
          </span>
        </div>

        {/* Bottom Legal & Back to Top Bar */}
        <div className="pt-6 border-t border-navy-border/50 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-mono text-navy-muted">
          <div>
            © {new Date().getFullYear()} Optenary. Where Technology Evolves. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</Link>
            <button
              onClick={scrollToTop}
              className="hover:text-brand-cyan transition-colors flex items-center gap-1"
            >
              <span>Back to top ↑</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
