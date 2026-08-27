import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie } from 'lucide-react';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      // Delay so it doesn't compete with page load animations
      const timer = setTimeout(() => setVisible(true), 5500);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem('cookie-consent', 'declined');
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 120, opacity: 0 }}
          transition={{ type: 'spring', damping: 22, stiffness: 280, delay: 0.1 }}
          className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-sm z-50"
          role="dialog"
          aria-label="Cookie consent"
        >
          <div
            className="rounded-2xl border border-dark-border p-5 shadow-2xl"
            style={{
              background: 'rgba(17, 21, 24, 0.95)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
            }}
          >
            <div className="flex items-start gap-3 mb-4">
              <div className="w-9 h-9 rounded-xl bg-brand-orange/10 border border-brand-orange/20 flex items-center justify-center text-brand-orange shrink-0 mt-0.5">
                <Cookie size={16} />
              </div>
              <div>
                <p className="text-white font-bold text-sm mb-1">We use cookies 🍪</p>
                <p className="text-dark-muted text-xs leading-relaxed">
                  We use cookies to enhance your experience and analyze site traffic. See our{' '}
                  <Link to="/privacy-policy" className="text-[#10b981] underline hover:text-white transition-colors" onClick={accept}>
                    Privacy Policy
                  </Link>
                  .
                </p>
              </div>
            </div>

            <div className="flex gap-2.5">
              <button
                onClick={accept}
                className="flex-1 py-2.5 rounded-xl bg-brand-orange hover:bg-brand-orangeDark text-dark-bg font-bold text-xs uppercase tracking-wider transition-colors"
              >
                Accept All
              </button>
              <button
                onClick={decline}
                className="flex-1 py-2.5 rounded-xl bg-dark-light hover:bg-dark-border text-white font-bold text-xs uppercase tracking-wider transition-colors border border-dark-border"
              >
                Decline
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
