import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, HelpCircle } from 'lucide-react';

export default function FAQ() {
  const faqs = [
    {
      q: "What makes Optenary different?",
      a: "We take ownership of every project, focusing on clarity, communication, and results. No confusion — just reliable, future-ready solutions built to help your business grow."
    },
    {
      q: "Do you provide support after launch?",
      a: "Yes. We offer post-launch maintenance, updates, and performance monitoring to ensure your product runs smoothly."
    },
    {
      q: "How do I know my project won’t face delays?",
      a: "We follow a clear roadmap and agile sprints with weekly progress updates. Our transparent process keeps your project on track and eliminates unexpected delays."
    },
    {
      q: "Can you scale my product as I grow?",
      a: "Of course. Every product we build is made to scale — we can easily add new features, users, or integrations as your business expands."
    },
    {
      q: "Will I get a clear roadmap before starting?",
      a: "Yes. Before development, we share a detailed plan covering timelines, features, and milestones so you always know what’s happening next."
    },
    {
      q: "How much does a project cost?",
      a: "Pricing depends on your project’s size and complexity. After understanding your needs, we share a transparent quote — no hidden charges."
    },
    {
      q: "How long will it take?",
      a: "Timelines vary — a simple site may take 2–4 weeks, while complex platforms need more time. We define clear milestones before we start."
    },
    {
      q: "What does an AI automation agency do?",
      a: "An AI automation agency builds AI agents and workflows that reduce manual tasks and improve business operations."
    },
    {
      q: "Do you provide enterprise mobile app development services?",
      a: "Yes, we develop secure enterprise-grade mobile apps with scalable infrastructure and integrations."
    },
    {
      q: "Can you build custom SaaS platforms from scratch?",
      a: "Absolutely. Our custom SaaS development services cover strategy, MVP development, launch, and scaling."
    }
  ];

  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="faq" className="bg-[#0b0d0e] py-24 px-6 md:px-12 relative overflow-hidden">
      
      {/* Background decoration */}
      <div className="absolute bottom-1/4 left-0 w-80 h-80 rounded-full bg-brand-orange/5 blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="px-3 py-1 rounded-full bg-brand-orange/10 border border-brand-orange/20 text-brand-orange text-xs font-semibold uppercase tracking-wider"
          >
            FAQs
          </motion.span>
          
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-extrabold text-white mt-4 mb-4"
          >
            Have <span className="text-brand-orange">Questions?</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-dark-muted max-w-2xl mx-auto text-sm md:text-base"
          >
            Everything you need to know before we even start.
          </motion.p>
        </div>

        {/* Accordions */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = activeIndex === index;
            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className={`rounded-2xl border transition-all duration-300 ${isOpen ? 'bg-dark-card/60 border-brand-orange/30 shadow-glow' : 'bg-dark-card/35 border-dark-border/60'}`}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <div className="flex gap-3 items-center">
                    <HelpCircle size={18} className={`shrink-0 ${isOpen ? 'text-brand-orange' : 'text-dark-muted'}`} />
                    <span className="text-sm md:text-base font-bold text-white pr-4">{faq.q}</span>
                  </div>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border transition-colors ${isOpen ? 'border-brand-orange/30 text-brand-orange bg-brand-orange/5' : 'border-dark-border text-dark-muted'}`}>
                    {isOpen ? <Minus size={14} /> : <Plus size={14} />}
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-1 text-xs md:text-sm text-dark-muted leading-relaxed border-t border-dark-border/40 max-w-3xl ml-7">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Callout */}
        <div className="text-center mt-12 p-6 rounded-2xl bg-dark-card/30 border border-dark-border max-w-xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <span className="text-sm font-bold text-white block">Still have questions?</span>
            <span className="text-xs text-dark-muted">We’re here to help you solve your tech puzzles.</span>
          </div>
          <a 
            href="#contact-us" 
            className="px-5 py-2.5 rounded-xl bg-brand-orange hover:bg-brand-orangeDark text-dark-bg text-xs font-bold uppercase tracking-wider transition-colors shadow-glow"
          >
            Contact us
          </a>
        </div>

      </div>
    </section>
  );
}
