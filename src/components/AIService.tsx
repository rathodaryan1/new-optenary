import { motion } from 'framer-motion';
import { Bot, Workflow, Cpu, Sparkles } from 'lucide-react';

export default function AIService() {
  const capabilities = [
    {
      title: "Autonomous Voice Agents",
      desc: "Deploy custom conversational AI trained on your knowledge base to handle 24/7 sales and customer operations naturally.",
      icon: Bot,
      color: "text-brand-emerald bg-brand-emerald/20 border-brand-emerald/20 hover:border-brand-emerald/40",
      glow: "group-hover:shadow-[0_0_20px_rgba(16,185,129,0.15)]"
    },
    {
      title: "Intelligent Workflows",
      desc: "Eliminate manual data entry and complex pipelines with self-healing workflow automations triggered by real-time events.",
      icon: Workflow,
      color: "text-brand-cyan bg-brand-cyan/10 border-brand-cyan/20 hover:border-brand-cyan/40",
      glow: "group-hover:shadow-[0_0_20px_rgba(6,182,212,0.15)]"
    },
    {
      title: "Universal Integrations",
      desc: "Connect AI capabilities directly with your custom CRM, ERP databases, Slack channels, and email systems out of the box.",
      icon: Cpu,
      color: "text-brand-purple bg-brand-purple/10 border-brand-purple/20 hover:border-brand-purple/40",
      glow: "group-hover:shadow-[0_0_20px_rgba(168,85,247,0.15)]"
    }
  ];

  return (
    <section id="who-we-are" className="bg-dark-bg py-24 px-6 md:px-12 relative overflow-hidden border-t border-dark-border/40">

      {/* Background decorations */}
      <div className="absolute top-1/4 left-0 w-96 h-96 rounded-full bg-brand-emerald/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 rounded-full bg-brand-purple/5 blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">

        {/* Section Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-emerald/10 border border-brand-emerald/20 text-brand-emerald text-xs font-semibold uppercase tracking-wider shadow-glow"
          >
            <Sparkles size={12} />
            <span>AI Automation</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-extrabold text-white mt-4 mb-4"
          >
            Run Smarter with <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-emerald via-brand-cyan to-brand-purple font-black">AI Orchestration</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-dark-muted max-w-2xl mx-auto text-sm md:text-base"
          >
            We build state-of-the-art AI infrastructure that seamlessly integrates into your company operations, turning complex tasks into automatic routines.
          </motion.p>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Left Column: Visual AI Dashboard / Simulated UI */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 relative group"
          >
            {/* Ambient Card Glow */}
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-brand-emerald via-brand-cyan to-brand-purple opacity-20 blur-xl group-hover:opacity-30 transition duration-1000" />

            <div className="relative w-full h-[320px] md:h-[380px] rounded-2xl overflow-hidden border border-dark-border/80 bg-dark-card shadow-glow">
              <img
                src="/images/aiautomation.webp"
                alt="Optenary AI Agent Telemetry Dashboard"
                className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-all duration-700 opacity-90"
              loading="lazy" decoding="async" />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/90 via-transparent to-transparent pointer-events-none" />


            </div>
          </motion.div>

          {/* Right Column: AI Core Capabilities list */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 flex flex-col justify-center gap-6"
          >
            <div className="grid gap-4">
              {capabilities.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={index}
                    whileHover={{ x: 4 }}
                    className="group flex gap-4 p-5 rounded-2xl bg-dark-card/40 border border-dark-border/80 hover:border-brand-emerald/20 transition-all duration-300 cursor-default"
                  >
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 border transition-all duration-300 ${item.color} ${item.glow}`}>
                      <Icon size={20} className="transition-transform duration-300 group-hover:scale-110" />
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-base mb-1.5 transition-colors group-hover:text-brand-emerald">
                        {item.title}
                      </h3>
                      <p className="text-xs md:text-sm text-dark-muted leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <div className="mt-4 pl-1">
              <a
                href="#contact-us"
                className="inline-flex px-6 py-3.5 rounded-xl bg-brand-emerald hover:bg-brand-emeraldDark text-dark-bg font-bold uppercase tracking-wider text-xs transition-all transform hover:-translate-y-0.5 shadow-glow"
              >
                Schedule AI Demo
              </a>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
