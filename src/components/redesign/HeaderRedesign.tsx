import { useState, useEffect } from 'react';
import { Phone, Mail, Instagram, Linkedin, Menu, X, ArrowRight, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function HeaderRedesign() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Work', num: '00', href: '#work' },
    { label: 'Services', num: '01', href: '#services' },
    { label: 'Case Study', num: '02', href: '/projects/mehta-dairy', isRoute: true },
    { label: 'Process', num: '03', href: '#process' },
    { label: 'Capabilities', num: '04', href: '#capabilities' },
    { label: 'Studio', num: '05', href: '#studio' },
    { label: 'Contact', num: '06', href: '#contact' },
  ];

  return (
    <>
      {/* Top Telemetry & Contact Bar */}
      <div className="w-full bg-[#02050e] border-b border-navy-border/60 text-xs py-2 px-4 md:px-12 flex justify-between items-center text-navy-muted z-50 relative font-mono">
        <div className="flex items-center gap-4">
          <a
            href="tel:+919316688014"
            className="flex items-center gap-1.5 hover:text-brand-cyan transition-colors"
          >
            <Phone size={11} className="text-brand-cyan" />
            <span>+91 9316688014</span>
          </a>
          <span className="hidden sm:inline text-navy-border">|</span>
          <div className="hidden sm:flex items-center gap-2 text-[11px]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-slate-300">NOW BOOKING Q3/Q4</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <a
              href="https://wa.me/919316688014"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-[11px] text-emerald-400 hover:text-emerald-300 transition-colors"
              aria-label="WhatsApp"
            >
              <MessageSquare size={12} />
              <span className="hidden md:inline">WhatsApp</span>
            </a>
            <span className="hidden md:inline text-navy-border">|</span>
            <a
              href="https://www.instagram.com/optenary/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-brand-cyan transition-colors"
              aria-label="Instagram"
            >
              <Instagram size={12} />
            </a>
            <a
              href="https://www.linkedin.com/company/optenary/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-brand-cyan transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={12} />
            </a>
            <a
              href="mailto:info@optenary.in"
              className="hover:text-brand-cyan transition-colors"
              aria-label="Email Optenary"
            >
              <Mail size={12} />
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <header
        className={`sticky top-0 w-full z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#030612]/90 backdrop-blur-xl border-b border-navy-border/80 py-3.5 shadow-2xl'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          
          {/* Logo with Geometric P */}
          <a href="/home" className="flex items-center gap-3 group">
            <div className="relative w-8 h-8 rounded-lg bg-navy-card border border-navy-border p-1 flex items-center justify-center group-hover:border-brand-cyan transition-colors shadow-glow-cyan">
              <img
                src="/images/logo.webp"
                alt="Optenary Logo"
                width={28}
                height={28}
                className="w-full h-full object-contain select-none"
              />
            </div>
            <img
              src="/images/logoText.svg"
              alt="Optenary Wordmark"
              width={105}
              height={16}
              className="h-4 w-auto select-none opacity-90 group-hover:opacity-100 transition-opacity"
            />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-7 text-xs font-mono">
            {navLinks.map((link) => {
              if (link.isRoute) {
                return (
                  <Link
                    key={link.label}
                    to={link.href}
                    className="flex items-center gap-1 text-navy-muted hover:text-white transition-colors group"
                  >
                    <span className="text-[10px] text-brand-blue group-hover:text-brand-cyan transition-colors">
                      {link.num}
                    </span>
                    <span>{link.label}</span>
                  </Link>
                );
              }
              return (
                <a
                  key={link.label}
                  href={link.href}
                  className="flex items-center gap-1 text-navy-muted hover:text-white transition-colors group"
                >
                  <span className="text-[10px] text-brand-blue group-hover:text-brand-cyan transition-colors">
                    {link.num}
                  </span>
                  <span>{link.label}</span>
                </a>
              );
            })}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="#contact"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-blue to-brand-cyan hover:from-blue-600 hover:to-cyan-500 text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-glow-cyan transition-all transform hover:-translate-y-0.5"
            >
              <span>Start a Project</span>
              <ArrowRight size={13} />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl bg-navy-card border border-navy-border text-navy-muted hover:text-white focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden fixed top-[86px] left-0 w-full bg-[#030612]/98 backdrop-blur-2xl border-b border-navy-border z-40 px-6 py-8 overflow-y-auto max-h-[calc(100vh-90px)]"
          >
            <div className="space-y-4 mb-8 font-mono">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-between p-3 rounded-xl bg-navy-card/60 border border-navy-border/60 text-sm text-slate-300 hover:text-white hover:border-brand-cyan transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-brand-cyan font-bold">{link.num}</span>
                    <span>{link.label}</span>
                  </div>
                  <ArrowRight size={14} className="text-navy-muted" />
                </a>
              ))}
            </div>

            <a
              href="#contact"
              onClick={() => setIsOpen(false)}
              className="w-full py-3.5 rounded-xl bg-brand-blue text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-glow-blue mb-6"
            >
              <span>Start a Project</span>
              <ArrowRight size={14} />
            </a>

            <div className="pt-4 border-t border-navy-border flex justify-between items-center text-xs font-mono text-navy-muted">
              <span>+91 9316688014</span>
              <span>info@optenary.in</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
