import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function Vision() {
  return (
    <section className="bg-[#050607] py-20 px-6 md:px-12 relative overflow-hidden">
      
      {/* Background glow effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(255,78,0,0.08),transparent_100%)] pointer-events-none" />

      <div className="max-w-5xl mx-auto text-center relative z-10 p-12 rounded-3xl glass-panel border border-brand-orange/20 shadow-glow-large">
        <motion.h2 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl md:text-4xl font-extrabold text-white mb-4 leading-tight"
        >
          Your vision deserves the <span className="text-brand-orange">right tech partner.</span>
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-dark-muted text-sm md:text-base max-w-xl mx-auto mb-8"
        >
          Let’s build something reliable, scalable, and future-ready together.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <a 
            href="/contact" 
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-brand-orange hover:bg-brand-orangeDark text-dark-bg font-bold uppercase tracking-wider text-xs transition-all transform hover:-translate-y-0.5 shadow-glow"
          >
            <span>Discuss your Project</span>
            <ArrowRight size={14} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
