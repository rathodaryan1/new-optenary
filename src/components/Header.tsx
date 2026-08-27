import { useState, useEffect } from 'react';
import { Phone, Mail, Instagram, Linkedin, Facebook, ChevronDown, Menu, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ServiceItem {
  name: string;
  href: string;
  subItems?: { name: string; href: string }[];
}

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [showServices, setShowServices] = useState(false);
  const [activeSubMenu, setActiveSubMenu] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const servicesList: ServiceItem[] = [
    { name: "Web Application", href: "/services/web-development" },
    { name: "Mobile Application", href: "/services/mobile-development" },
    { name: "Custom Software", href: "/services/custom-software" },
    { name: "Desktop Development", href: "/services/desktop-development" },
    { name: "AI Agents & Automation", href: "/services/ai-agents-automation" },
    { 
      name: "E-Commerce Development", 
      href: "/services/custom-ecommerce-development",
      subItems: [
        { name: "Shopify Development", href: "/services/shopify-development" },
        { name: "WordPress Development", href: "/services/wordpress-development" },
        { name: "Custom E-Commerce", href: "/services/custom-ecommerce-development" }
      ]
    }
  ];

  return (
    <>
      {/* Top Contact Bar */}
      <div className="w-full bg-[#050607] border-b border-dark-border text-xs py-2 px-4 md:px-12 flex justify-between items-center text-dark-muted z-50 relative">
        <a href="tel:+919316688014" className="flex items-center gap-1.5 hover:text-brand-orange transition-colors">
          <Phone size={12} className="text-brand-orange" />
          <span>+91 9316688014</span>
        </a>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <a href="https://www.instagram.com/optenary/" target="_blank" rel="noopener noreferrer" className="hover:text-brand-orange transition-colors" aria-label="Instagram">
              <Instagram size={12} />
            </a>
            <a href="https://www.linkedin.com/company/optenary/" target="_blank" rel="noopener noreferrer" className="hover:text-brand-orange transition-colors" aria-label="LinkedIn">
              <Linkedin size={12} />
            </a>
            <a href="https://www.facebook.com/profile.php?id=61590224205980" target="_blank" rel="noopener noreferrer" className="hover:text-brand-orange transition-colors" aria-label="Facebook">
              <Facebook size={12} />
            </a>
            <a href="mailto:info@optenary.in" className="hover:text-brand-orange transition-colors" aria-label="Email Optenary">
              <Mail size={12} />
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <header className={`sticky top-0 w-full z-40 transition-all duration-300 ${isScrolled ? 'bg-dark-bg/90 backdrop-blur-md border-b border-dark-border py-4' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">

          {/* Logo */}
          <a href="/home" className="flex items-center gap-2.5 group">
            <img src="/images/logo.webp" alt="Optenary logo mark" width={32} height={32} className="h-8 w-auto select-none" fetchPriority="high" decoding="sync" />
            <img src="/images/logoText.svg" alt="Optenary wordmark" width={110} height={16} className="h-[16px] w-auto select-none opacity-90 group-hover:opacity-100 transition-opacity" fetchPriority="high" decoding="sync" />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium">
            <a href="/home" className="hover:text-brand-orange transition-colors">Home</a>
            <a href="/about" className="hover:text-brand-orange transition-colors">About</a>

            {/* Services Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setShowServices(true)}
              onMouseLeave={() => {
                setShowServices(false);
                setActiveSubMenu(null);
              }}
            >
              <button className="flex items-center gap-1 hover:text-brand-orange transition-colors py-2">
                Services
                <ChevronDown size={14} className={`transition-transform duration-250 ${showServices ? 'rotate-180 text-brand-orange' : ''}`} />
              </button>

              <AnimatePresence>
                {showServices && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 w-64 mt-2 p-2 rounded-xl bg-[#09090b]/95 backdrop-blur-2xl border border-dark-border/80 shadow-glow z-50"
                  >
                    <div className="grid gap-1">
                      {servicesList.map((service, i) => {
                        if (service.subItems) {
                          const isSubOpen = activeSubMenu === service.name;
                          return (
                            <div
                              key={i}
                              className="relative"
                              onMouseEnter={() => setActiveSubMenu(service.name)}
                            >
                              <button className="w-full px-4 py-2.5 rounded-lg text-sm text-dark-muted hover:text-white hover:bg-brand-orange/10 transition-all flex items-center justify-between group">
                                <span className="font-medium text-left">{service.name}</span>
                                <ArrowRight size={12} className="text-dark-muted group-hover:text-brand-orange transition-colors" />
                              </button>

                              <AnimatePresence>
                                {isSubOpen && (
                                  <motion.div
                                    initial={{ opacity: 0, x: 10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 10 }}
                                    className="absolute left-full top-0 w-56 ml-2 p-1.5 rounded-xl bg-[#09090b]/95 backdrop-blur-2xl border border-dark-border/80 shadow-glow z-50"
                                  >
                                    <div className="grid gap-1">
                                      {service.subItems.map((sub, sIdx) => (
                                        <a
                                          key={sIdx}
                                          href={sub.href}
                                          className="px-3.5 py-2 rounded-lg text-xs text-dark-muted hover:text-white hover:bg-brand-orange/10 transition-all flex items-center justify-between group"
                                        >
                                          {sub.name}
                                          <ArrowRight size={10} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-brand-orange" />
                                        </a>
                                      ))}
                                    </div>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          );
                        }

                        return (
                          <a
                            key={i}
                            href={service.href}
                            onMouseEnter={() => setActiveSubMenu(null)}
                            className="px-4 py-2.5 rounded-lg text-sm text-dark-muted hover:text-white hover:bg-brand-orange/10 transition-all flex items-center justify-between group"
                          >
                            {service.name}
                            <ArrowRight size={12} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-brand-orange" />
                          </a>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <a href="/integrations" className="hover:text-brand-orange transition-colors">Integrations</a>
            <a href="/projects" className="hover:text-brand-orange transition-colors">Projects</a>
            <a href="/blog" className="hover:text-brand-orange transition-colors">Blog</a>
            <a href="/faq" className="hover:text-brand-orange transition-colors">FAQ</a>
            <a href="/contact" className="hover:text-brand-orange transition-colors">Contact</a>
          </nav>

          {/* Action Button & Hamburger */}
          <div className="flex items-center gap-4">
            <a
              href="https://cal.com/optenary"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex px-5 py-2.5 rounded-full bg-brand-orange hover:bg-brand-orangeDark text-dark-bg text-xs font-bold uppercase tracking-wider transition-all transform hover:-translate-y-0.5 shadow-glow"
            >
              Book a Call
            </a>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-lg bg-dark-card border border-dark-border text-white hover:border-brand-orange transition-colors"
              aria-label="Toggle menu"
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
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-dark-bg z-50 flex flex-col p-8 overflow-y-auto lg:hidden"
          >
            <div className="flex justify-between items-center mb-12">
              {/* Logo */}
              <div className="flex items-center gap-2.5">
                <img src="/images/logo.webp" alt="Optenary logo mark" className="h-8 w-auto select-none" decoding="async" />
                <img src="/images/logoText.svg" alt="Optenary wordmark" className="h-[16px] w-auto select-none opacity-90" decoding="async" />
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-lg bg-dark-card border border-dark-border text-white hover:border-brand-orange transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Menu Links */}
            <nav className="flex flex-col gap-6 text-xl font-semibold mb-12">
              <a href="/home" onClick={() => setIsOpen(false)} className="hover:text-brand-orange transition-colors">Home</a>
              <a href="/about" onClick={() => setIsOpen(false)} className="hover:text-brand-orange transition-colors">About</a>

              {/* Services Accordion */}
              <div>
                <button
                  onClick={() => setShowServices(!showServices)}
                  className="flex items-center justify-between w-full hover:text-brand-orange transition-colors"
                >
                  <span>Services</span>
                  <ChevronDown size={18} className={`transition-transform ${showServices ? 'rotate-180 text-brand-orange' : ''}`} />
                </button>
                <AnimatePresence>
                  {showServices && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden mt-3 pl-4 flex flex-col gap-4 border-l border-dark-border"
                    >
                      {servicesList.map((service, i) => {
                        if (service.subItems) {
                          return (
                            <div key={i} className="flex flex-col gap-2 pt-1">
                              <span className="text-sm font-bold text-brand-orange uppercase tracking-wider">
                                {service.name}
                              </span>
                              <div className="pl-3 flex flex-col gap-2.5 border-l border-dark-border/40">
                                {service.subItems.map((sub, sIdx) => (
                                  <a
                                    key={sIdx}
                                    href={sub.href}
                                    onClick={() => setIsOpen(false)}
                                    className="text-sm text-dark-muted hover:text-brand-orange transition-colors"
                                  >
                                    {sub.name}
                                  </a>
                                ))}
                              </div>
                            </div>
                          );
                        }
                        return (
                          <a
                            key={i}
                            href={service.href}
                            onClick={() => setIsOpen(false)}
                            className="text-base text-dark-muted hover:text-brand-orange transition-colors"
                          >
                            {service.name}
                          </a>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <a href="/integrations" onClick={() => setIsOpen(false)} className="hover:text-brand-orange transition-colors">Integrations</a>
              <a href="/projects" onClick={() => setIsOpen(false)} className="hover:text-brand-orange transition-colors">Projects</a>
              <a href="/blog" onClick={() => setIsOpen(false)} className="hover:text-brand-orange transition-colors">Blog</a>
              <a href="/faq" onClick={() => setIsOpen(false)} className="hover:text-brand-orange transition-colors">FAQ</a>
              <a href="/contact" onClick={() => setIsOpen(false)} className="hover:text-brand-orange transition-colors">Contact</a>
            </nav>

            <div className="mt-auto flex flex-col gap-4">
              <a
                href="https://cal.com/optenary"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="w-full text-center py-4 rounded-xl bg-brand-orange hover:bg-brand-orangeDark text-dark-bg font-bold uppercase tracking-wider transition-colors shadow-glow"
              >
                Book a Discovery Call
              </a>

              <div className="flex justify-center gap-6 text-dark-muted mt-4">
                <a href="https://www.instagram.com/optenary/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" aria-label="Instagram">
                  <Instagram size={20} />
                </a>
                <a href="https://www.linkedin.com/company/optenary/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" aria-label="LinkedIn">
                  <Linkedin size={20} />
                </a>
                <a href="https://www.facebook.com/profile.php?id=61590224205980" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" aria-label="Facebook">
                  <Facebook size={20} />
                </a>
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
