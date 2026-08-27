import { motion } from 'framer-motion';

export default function Testimonials() {
  const quotes = [
    {
      text: "Design is not just what it looks like and feels like. Design is how it works.",
      author: "Steve Jobs",
      role: "Co-Founder, Apple"
    },
    {
      text: "Software is a great combination of artistry and engineering.",
      author: "Bill Gates",
      role: "Co-Founder, Microsoft"
    },
    {
      text: "If you double the number of experiments you do per year, you double your inventiveness.",
      author: "Jeff Bezos",
      role: "Founder, Amazon"
    },
    {
      text: "Software is eating the world.",
      author: "Marc Andreessen",
      role: "Co-Founder, Netscape & a16z"
    },
    {
      text: "Make something people want.",
      author: "Paul Graham",
      role: "Co-Founder, Y Combinator"
    },
    {
      text: "If something is important enough, even if the odds are against you, you should still do it.",
      author: "Elon Musk",
      role: "Founder, SpaceX & Tesla"
    }
  ];

  // Duplicate for seamless looping
  const marqueeItems = [...quotes, ...quotes];

  return (
    <section className="bg-dark-bg py-24 relative overflow-hidden border-t border-dark-border/40">
      
      {/* Inline styles for custom marquee animation */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 35s linear infinite;
        }
      `}</style>

      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-brand-purple/5 blur-[150px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10 mb-16">
        {/* Section Header */}
        <div className="text-center">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-brand-purple text-xs font-bold uppercase tracking-widest block mb-4"
          >
            Engineering Philosophy
          </motion.span>
          
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-extrabold text-white mt-4 mb-4"
          >
            Ideas That <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-emerald via-brand-cyan to-brand-purple font-black">Drive Our Code</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-dark-muted max-w-2xl mx-auto text-sm md:text-base"
          >
            We align our engineering values with the wisdom of the creators who shaped the digital landscape.
          </motion.p>
        </div>
      </div>

      {/* Infinite Scrolling Marquee Row */}
      <div className="relative flex overflow-x-hidden w-full select-none hover:[&>div]:pause-marquee">
        <div className="flex gap-6 animate-marquee w-max py-4 px-3">
          {marqueeItems.map((item, index) => (
            <div
              key={index}
              className="w-[320px] md:w-[380px] shrink-0 p-8 rounded-3xl bg-dark-card/50 border border-dark-border hover:border-brand-purple/20 hover:bg-dark-card/85 transition-all flex flex-col justify-between"
            >
              <p className="text-sm md:text-base text-white/90 leading-relaxed font-medium mb-8">
                "{item.text}"
              </p>
              
              <div className="border-t border-dark-border/60 pt-4 flex flex-col">
                <span className="text-white font-bold text-sm">
                  {item.author}
                </span>
                <span className="text-[10px] text-dark-muted uppercase font-semibold tracking-wider mt-0.5">
                  {item.role}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
