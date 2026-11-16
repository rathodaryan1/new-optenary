import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Radio, ArrowRight } from 'lucide-react';

interface IntroLoaderProps {
  onComplete?: () => void;
  forceShow?: boolean;
}

export default function IntroLoader({ onComplete, forceShow = false }: IntroLoaderProps) {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [pingStatus, setPingStatus] = useState('Initializing telemetry...');

  useEffect(() => {
    // Safely check sessionStorage
    try {
      if (typeof window !== 'undefined' && window.sessionStorage) {
        const hasSeenIntro = window.sessionStorage.getItem('optenary_intro_seen');
        if (hasSeenIntro && !forceShow) {
          setIsVisible(false);
          onComplete?.();
          return;
        }
      }
    } catch {
      // If storage blocked, ignore and proceed
    }

    const statusUpdates = [
      { at: 15, text: 'Connecting to Optenary core...' },
      { at: 40, text: 'Calibrating digital design systems...' },
      { at: 70, text: 'Loading interactive node network...' },
      { at: 90, text: 'Where technology evolves.' },
      { at: 100, text: 'Ready.' }
    ];

    let finishTimeout: any = null;

    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.floor(Math.random() * 8) + 5;
        if (next >= 100) {
          clearInterval(interval);
          finishTimeout = setTimeout(() => {
            setIsVisible(false);
            try {
              if (typeof window !== 'undefined' && window.sessionStorage) {
                window.sessionStorage.setItem('optenary_intro_seen', 'true');
              }
            } catch {}
            onComplete?.();
          }, 350);
          return 100;
        }

        const match = statusUpdates.find(s => s.at <= next);
        if (match) setPingStatus(match.text);

        return next;
      });
    }, 45);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        skipIntro();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearInterval(interval);
      if (finishTimeout) clearTimeout(finishTimeout);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [forceShow, onComplete]);

  const skipIntro = () => {
    setIsVisible(false);
    try {
      if (typeof window !== 'undefined' && window.sessionStorage) {
        window.sessionStorage.setItem('optenary_intro_seen', 'true');
      }
    } catch {}
    onComplete?.();
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="intro-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } }}
          className="fixed inset-0 z-50 flex flex-col justify-between p-6 md:p-12 bg-[#02050f] text-white select-none cursor-pointer overflow-hidden"
          onClick={skipIntro}
        >
          {/* Ambient background glows */}
          <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-brand-blue/15 rounded-full blur-[140px] pointer-events-none animate-pulse-subtle" />
          <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] bg-brand-cyan/15 rounded-full blur-[130px] pointer-events-none" />
          <div className="absolute inset-0 tech-grid-pattern opacity-30 pointer-events-none" />

          {/* Top telemetry bar */}
          <div className="flex justify-between items-center text-xs text-navy-muted tracking-wider uppercase font-mono z-10">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-cyan animate-ping" />
              <span className="text-white font-semibold">SIGNAL // 01</span>
              <span className="hidden sm:inline text-navy-muted">· THE STUDIO CONNECTION</span>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                skipIntro();
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-navy-card/90 border border-navy-border hover:border-brand-cyan text-xs text-navy-muted hover:text-white transition-colors"
            >
              <span>Press Esc or Click to Skip</span>
              <ArrowRight size={12} />
            </button>
          </div>

          {/* Center Brand Hologram */}
          <div className="flex flex-col items-center justify-center my-auto z-10 text-center">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="relative mb-6"
            >
              <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-to-br from-brand-blue/20 via-brand-cyan/20 to-brand-purple/20 p-0.5 border border-brand-cyan/40 shadow-glow-cyan flex items-center justify-center backdrop-blur-xl">
                <img
                  src="/images/logo.webp"
                  alt="Optenary Logo"
                  className="w-12 h-12 md:w-14 md:h-14 object-contain filter drop-shadow-[0_0_12px_rgba(6,182,212,0.8)]"
                />
              </div>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                className="absolute -inset-3 rounded-2xl border border-dashed border-brand-blue/30 pointer-events-none"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.4 }}
              className="space-y-2"
            >
              <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight text-white uppercase font-sans">
                OPTENARY
              </h1>
              <p className="text-xs md:text-sm font-mono tracking-widest text-brand-cyan uppercase">
                WHERE TECHNOLOGY EVOLVES
              </p>
            </motion.div>

            {/* Radar status message */}
            <div className="mt-8 flex items-center gap-2 text-xs font-mono text-navy-muted">
              <Radio size={14} className="text-brand-cyan animate-pulse" />
              <span>{pingStatus}</span>
            </div>
          </div>

          {/* Bottom Progress Bar & Counter */}
          <div className="w-full max-w-xl mx-auto z-10">
            <div className="flex justify-between items-center text-xs font-mono text-navy-muted mb-2">
              <span className="flex items-center gap-1.5">
                <Sparkles size={12} className="text-brand-blue" />
                SYSTEM INITIALIZATION
              </span>
              <span className="text-white font-bold text-sm tracking-wider">{progress}%</span>
            </div>
            <div className="w-full h-1.5 bg-navy-card rounded-full overflow-hidden border border-navy-border/60">
              <motion.div
                className="h-full bg-gradient-to-r from-brand-blue via-brand-cyan to-brand-purple rounded-full"
                style={{ width: `${progress}%` }}
                transition={{ ease: 'easeOut' }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
