import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Instagram, Linkedin, Facebook, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter your email.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    setError('');
    setSubscribed(true);
    setEmail('');
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#050607] border-t border-dark-border pt-20 pb-10 px-6 md:px-12 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-brand-orange/5 blur-[150px] pointer-events-none" />
      <div className="absolute top-0 left-0 w-[300px] h-[300px] rounded-full bg-brand-orange/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 pb-16">

          {/* Brand Info & Newsletter */}
          <div className="lg:col-span-4 flex flex-col justify-between">
            <div>
              {/* Logo */}
              <a href="/home" className="flex items-center gap-2.5 group w-fit mb-6">
                <img src="/images/logo.webp" alt="Optenary logo mark" width={32} height={32} className="h-8 w-auto select-none" decoding="async" />
                <img src="/images/logoText.svg" alt="Optenary wordmark" width={110} height={16} className="h-[16px] w-auto select-none opacity-90 group-hover:opacity-100 transition-opacity" decoding="async" />
              </a>
              <p className="text-dark-muted text-sm leading-relaxed mb-8 max-w-sm">
                We combine product-focused engineering with advanced automation to build scalable platforms that launch, scale, and transform your business globally.
              </p>
            </div>

            {/* Newsletter Subscription */}
            <div className="mt-auto">
              <h4 className="text-white font-semibold text-sm mb-3">
                Join our newsletter
              </h4>
              <p className="text-dark-muted text-xs mb-4 max-w-xs leading-relaxed">
                Stay up to date on releases and business tips. By subscribing, you agree to our{' '}
                <a href="/privacy-policy" className="text-brand-orange underline hover:text-brand-orange/80">
                  Privacy Policy
                </a>.
              </p>

              <form onSubmit={handleSubscribe} className="relative max-w-sm">
                {!subscribed ? (
                  <div className="flex items-center gap-2">
                    <div className="relative flex-grow">
                      <input
                        type="email"
                        aria-label="Email address"
                        placeholder="Your email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-dark-card border border-dark-border text-white text-sm focus:outline-none focus:border-brand-orange/50 transition-all placeholder:text-dark-muted"
                      />
                      {error && (
                        <span className="absolute left-0 -bottom-5 text-[10px] text-red-500">
                          {error}
                        </span>
                      )}
                    </div>
                    <button
                      type="submit"
                      className="p-3 rounded-xl bg-brand-orange hover:bg-brand-orangeDark text-dark-bg transition-colors shadow-glow flex items-center justify-center shrink-0"
                      aria-label="Subscribe"
                    >
                      <ArrowRight size={18} />
                    </button>
                  </div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex items-center gap-2 text-brand-orange bg-brand-orange/5 border border-brand-orange/20 px-4 py-3 rounded-xl"
                  >
                    <CheckCircle2 size={16} />
                    <span className="text-xs font-semibold">Thank you for subscribing!</span>
                  </motion.div>
                )}
              </form>
            </div>
          </div>

          {/* Spacer for desktop layout */}
          <div className="hidden lg:block lg:col-span-1"></div>

          {/* Navigation Links Columns */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-semibold text-sm tracking-wider uppercase mb-6">
              Company
            </h4>
            <ul className="space-y-3.5 text-sm">
              {['Home', 'About', 'Services', 'Projects', 'Contact', 'Blog'].map((item) => (
                <li key={item}>
                  <a
                    href={
                      item === 'Home' ? '/home' :
                        item === 'About' ? '/about' :
                          item === 'Services' ? '/home' :
                            item === 'Projects' ? '/projects' :
                              item === 'Contact' ? '/contact' : '/blog'
                    }
                    className="text-dark-muted hover:text-white hover:translate-x-1 inline-block transition-all"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-white font-semibold text-sm tracking-wider uppercase mb-6">
              Services
            </h4>
            <ul className="space-y-3.5 text-sm">
              {[
                { name: 'Web Development', href: '/services/web-development' },
                { name: 'Mobile App Development', href: '/services/mobile-development' },
                { name: 'Custom Software Development', href: '/services/custom-software' },
                { name: 'AI Agents & Automation', href: '/services/ai-agents-automation' },
                { name: 'Shopify Development', href: '/services/shopify-development' },
                { name: 'WordPress Development', href: '/services/wordpress-development' }
              ].map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="text-dark-muted hover:text-white hover:translate-x-1 inline-block transition-all"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="text-white font-semibold text-sm tracking-wider uppercase mb-6">
              Latest Articles
            </h4>
            <ul className="space-y-4 text-xs">
              {[
                { title: 'Native vs Hybrid Apps', date: 'May 2026' },
                { title: 'Optenary VS Other Agencies', date: 'Apr 2026' },
                { title: 'AI Agents: Automating Service Efficiency', date: 'Mar 2026' },
                { title: 'Developer or Agency for App Dev?', date: 'Feb 2026' }
              ].map((blog, idx) => (
                <li key={idx} className="group cursor-pointer">
                  <a href="/blog" className="block">
                    <span className="text-dark-muted group-hover:text-white transition-colors block font-medium leading-relaxed">
                      {blog.title}
                    </span>
                    <span className="text-[10px] text-brand-orange mt-1 block">
                      {blog.date}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Middle Divider & Contact Info Row */}
        <div className="border-t border-dark-border py-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-sm">

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-dark-card border border-dark-border flex items-center justify-center text-brand-orange">
              <Phone size={16} />
            </div>
            <div>
              <span className="text-xs text-dark-muted block">Call Us</span>
              <a href="tel:+919316688014" className="text-white hover:text-brand-orange transition-colors font-medium">
                +91 93166 88014
              </a>
              <span className="text-dark-muted mx-1.5">/</span>
              <a href="tel:+916351561018" className="text-white hover:text-brand-orange transition-colors font-medium">
                +91 63515 61018
              </a>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-dark-card border border-dark-border flex items-center justify-center text-brand-orange">
              <Mail size={16} />
            </div>
            <div>
              <span className="text-xs text-dark-muted block">Mail Us</span>
              <a href="mailto:info@optenary.in" className="text-white hover:text-brand-orange transition-colors font-medium" aria-label="Email Optenary">
                info@optenary.in
              </a>
            </div>
          </div>

          <div className="flex items-center justify-start md:justify-end gap-3.5">
            <a
              href="https://www.instagram.com/optenary/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-xl bg-dark-card border border-dark-border flex items-center justify-center text-dark-muted hover:text-white hover:border-brand-orange transition-all"
              aria-label="Instagram"
            >
              <Instagram size={18} />
            </a>
            <a
              href="https://www.linkedin.com/company/optenary/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-xl bg-dark-card border border-dark-border flex items-center justify-center text-dark-muted hover:text-white hover:border-brand-orange transition-all"
              aria-label="LinkedIn"
            >
              <Linkedin size={18} />
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=61590224205980"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-xl bg-dark-card border border-dark-border flex items-center justify-center text-dark-muted hover:text-white hover:border-brand-orange transition-all"
              aria-label="Facebook"
            >
              <Facebook size={18} />
            </a>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-dark-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-dark-muted">
          <div>
            © {currentYear} Optenary Tech Private Limited. All rights reserved.
          </div>
          <div className="flex gap-6">
            <a href="/privacy-policy" className="hover:text-white transition-colors underline decoration-dark-muted/30">
              Privacy Policy
            </a>
            <a href="/terms-of-service" className="hover:text-white transition-colors underline">
              Terms of Service
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
