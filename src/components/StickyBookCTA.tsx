import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Phone } from 'lucide-react';

export default function StickyBookCTA() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Only show on mobile, after 3 seconds, once per session
    const alreadyDismissed = sessionStorage.getItem('sticky-cta-dismissed');
    if (alreadyDismissed) return;

    const timer = setTimeout(() => {
      setVisible(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const dismiss = () => {
    setDismissed(true);
    setVisible(false);
    sessionStorage.setItem('sticky-cta-dismissed', 'true');
  };

  if (dismissed) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          className="md:hidden fixed bottom-0 left-0 right-0 z-40 px-4 pb-4 pt-2"
        >
          <div className="relative flex items-center justify-between gap-3 px-5 py-3.5 rounded-2xl border border-brand-orange/30 shadow-2xl"
            style={{
              background: 'linear-gradient(135deg, #0a1a0e 0%, #050607 100%)',
              backdropFilter: 'blur(20px)',
            }}
          >
            {/* Dismiss button */}
            <button
              onClick={dismiss}
              aria-label="Dismiss"
              className="absolute -top-2.5 -right-2.5 w-6 h-6 rounded-full bg-dark-card border border-dark-border flex items-center justify-center text-dark-muted hover:text-white transition-colors"
            >
              <X size={12} />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand-orange/10 border border-brand-orange/20 flex items-center justify-center text-brand-orange shrink-0">
                <Phone size={18} />
              </div>
              <div>
                <p className="text-white font-bold text-sm leading-tight">Ready to build something?</p>
                <p className="text-dark-muted text-xs">Free discovery call, no commitment</p>
              </div>
            </div>

            <Link
              to="/contact"
              onClick={dismiss}
              className="shrink-0 px-4 py-2 rounded-xl bg-brand-orange text-black font-bold text-xs uppercase tracking-wider hover:bg-brand-orangeDark transition-colors whitespace-nowrap"
            >
              Book Call
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
