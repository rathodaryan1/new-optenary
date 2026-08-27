import { motion } from 'framer-motion';
import { Globe, Smartphone, Cloud, Cpu, ShoppingCart, ArrowRight, Monitor } from 'lucide-react';

export default function Services() {
  const services = [
    {
      title: "Web Application",
      icon: Globe,
      desc: "High-performance web applications designed for absolute security, low latency, and infinite scaling using modern framework architectures.",
      href: "/services/web-development",
      color: "group-hover:text-brand-emerald group-hover:bg-brand-emerald/5 group-hover:border-brand-emerald/20",
      accent: "group-hover:border-brand-emerald/30"
    },
    {
      title: "Mobile Application",
      icon: Smartphone,
      desc: "Native iOS and Android platforms engineered to deliver pixel-perfect designs, offline-first states, and optimal performance.",
      href: "/services/mobile-development",
      color: "group-hover:text-brand-cyan group-hover:bg-brand-cyan/5 group-hover:border-brand-cyan/20",
      accent: "group-hover:border-brand-cyan/30"
    },
    {
      title: "Custom Software",
      icon: Cloud,
      desc: "Bespoke SaaS architectures and core workflows built to digitize legacy corporate processes and support high transaction volume.",
      href: "/services/custom-software",
      color: "group-hover:text-brand-purple group-hover:bg-brand-purple/5 group-hover:border-brand-purple/20",
      accent: "group-hover:border-brand-purple/30"
    },
    {
      title: "Desktop Development",
      icon: Monitor,
      desc: "Secure, native cross-platform desktop applications (Windows & macOS) engineered for absolute offline speed and system integrations.",
      href: "/services/desktop-development",
      color: "group-hover:text-brand-cyan group-hover:bg-brand-cyan/5 group-hover:border-brand-cyan/20",
      accent: "group-hover:border-brand-cyan/30"
    },
    {
      title: "AI Agents & Automation",
      icon: Cpu,
      desc: "Intelligent AI agent pipelines, custom cognitive models, and automated integration layers designed to accelerate team throughput.",
      href: "/services/ai-agents-automation",
      color: "group-hover:text-brand-emerald group-hover:bg-brand-emerald/5 group-hover:border-brand-emerald/20",
      accent: "group-hover:border-brand-emerald/30"
    },
    {
      title: "E-Commerce Development",
      icon: ShoppingCart,
      desc: "Custom-tailored commerce ecosystems and headless storefronts engineered for fast checkout speeds and search optimization.",
      href: "/services/custom-ecommerce-development",
      color: "group-hover:text-brand-purple group-hover:bg-brand-purple/5 group-hover:border-brand-purple/20",
      accent: "group-hover:border-brand-purple/30"
    }
  ];

  return (
    <section id="services" className="bg-dark-bg py-24 px-6 md:px-12 relative overflow-hidden border-t border-dark-border/40">
      
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-brand-emerald/5 blur-[150px] pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-brand-emerald text-xs font-bold uppercase tracking-widest block mb-4"
          >
            Our Expertise
          </motion.span>
          
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-extrabold text-white mt-4 mb-4"
          >
            What <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-emerald via-brand-cyan to-brand-purple font-black">We Do</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-dark-muted max-w-2xl mx-auto text-sm md:text-base"
          >
            End-to-end digital engineering that launches, scales, and automates your business.
          </motion.p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                whileHover={{ y: -5 }}
                className={`group p-8 rounded-3xl bg-dark-card border border-dark-border/85 transition-all duration-300 flex flex-col justify-between shadow-glow relative hover:bg-dark-card/60 ${service.accent}`}
              >
                <div>
                  {/* Badge Icon */}
                  <div className={`w-11 h-11 rounded-xl bg-dark-bg/60 flex items-center justify-center border border-dark-border transition-all duration-300 text-dark-muted ${service.color}`}>
                    <Icon size={20} />
                  </div>

                  <h3 className="text-lg font-bold text-white mt-6 mb-3 transition-colors group-hover:text-white">
                    {service.title}
                  </h3>

                  <p className="text-xs md:text-sm text-dark-muted leading-relaxed mb-6">
                    {service.desc}
                  </p>
                </div>

                <a 
                  href={service.href} 
                  className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-dark-muted group-hover:text-white transition-colors mt-auto"
                >
                  <span>Discuss Project</span>
                  <ArrowRight size={12} className="transform group-hover:translate-x-1 transition-transform" />
                </a>
              </motion.div>
            );
          })}
        </div>

        {/* View Projects CTA */}
        <div className="text-center mt-16">
          <motion.a 
            href="/projects"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-dark-card border border-dark-border hover:border-brand-emerald/30 text-xs font-bold uppercase tracking-wider transition-all shadow-glow"
          >
            <span>View All Projects</span>
            <ArrowRight size={12} />
          </motion.a>
        </div>

      </div>
    </section>
  );
}
