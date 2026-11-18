import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft, Search } from 'lucide-react';
import RwHeader from '../components/reachwise/RwHeader';
import RwFooter from '../components/reachwise/RwFooter';
import '../components/reachwise/reachwise.css';
import SEO from '../components/SEO';

export default function NotFoundPage() {
  const quickLinks = [
    { label: 'Home', href: '/' },
    { label: 'About Us', href: '/about' },
    { label: 'Services', href: '/services/web-development' },
    { label: 'Contact', href: '/contact' },
    { label: 'Integrations', href: '/integrations' },
    { label: 'FAQ', href: '/faq' },
  ];

  return (
    <div className="min-h-screen bg-[#050607] text-white antialiased flex flex-col">
      <SEO
        title="404 – Page Not Found"
        description="The page you are looking for doesn't exist. Head back to Optenary's home page to explore our AI automation and custom software services."
        canonicalPath="/404"
        noindex={true}
      />
      <RwHeader />

      <main className="flex-grow flex items-center justify-center px-6 py-24 relative overflow-hidden">
        {/* Background glows */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-brand-orange/5 blur-[160px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-purple-500/5 blur-[160px] pointer-events-none" />

        <div className="relative z-10 max-w-2xl mx-auto text-center">
          {/* Animated 404 number */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="mb-6"
          >
            <span className="text-[10rem] md:text-[14rem] font-black leading-none select-none"
              style={{
                background: 'linear-gradient(135deg, #f97316 0%, #fb923c 40%, #1e1e2e 80%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                filter: 'drop-shadow(0 0 60px rgba(249,115,22,0.3))',
              }}
            >
              404
            </span>
          </motion.div>

          {/* Icon */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex justify-center mb-6"
          >
            <div className="w-16 h-16 rounded-2xl bg-brand-orange/10 border border-brand-orange/20 flex items-center justify-center">
              <Search size={28} className="text-brand-orange" />
            </div>
          </motion.div>

          {/* Text */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-3xl md:text-4xl font-extrabold text-white mb-4"
          >
            Oops! Page Not Found
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-dark-muted text-base md:text-lg leading-relaxed mb-10 max-w-lg mx-auto"
          >
            The page you're looking for doesn't exist or has been moved. Let's get you back on track.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-brand-orange hover:bg-brand-orangeDark text-dark-bg font-bold uppercase tracking-wider text-xs transition-all transform hover:-translate-y-0.5 shadow-glow"
            >
              <Home size={14} />
              Back to Home
            </Link>
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-dark-card hover:bg-dark-light border border-dark-border text-white font-bold uppercase tracking-wider text-xs transition-colors"
            >
              <ArrowLeft size={14} />
              Go Back
            </button>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <p className="text-dark-muted text-xs uppercase tracking-wider font-semibold mb-4">Or explore these pages</p>
            <div className="flex flex-wrap justify-center gap-3">
              {quickLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="px-4 py-2 rounded-lg bg-dark-card/60 border border-dark-border hover:border-brand-orange/40 hover:text-brand-orange text-white/80 text-xs font-semibold transition-all"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      </main>

      <RwFooter wordmark="Optenary" />
    </div>
  );
}
