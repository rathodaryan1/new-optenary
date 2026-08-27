import { motion } from 'framer-motion';
import Header from '../components/Header';
import Portfolio from '../components/Portfolio';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const industries = [
  'PropTech', 'E-Commerce', 'FoodTech', 'EdTech', 'FinTech',
  'B2B SaaS', 'Healthcare', 'CareerTech', 'AutoTech', 'Social',
];

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-dark-bg text-white selection:bg-brand-orange selection:text-dark-bg antialiased flex flex-col">
      <SEO
        title="Our Projects - Case Studies & Ventures"
        description="Explore Optenary's portfolio of 20+ custom web systems, mobile applications, AI agents, and enterprise digital solutions across 10+ industries."
        keywords="optenary portfolio, software engineering case studies, web development projects, mobile app case studies, AI automation projects, custom software projects"
        canonicalPath="/projects"
      />
      <Header />

      <main className="flex-grow">

        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <section className="relative pt-28 pb-16 px-6 md:px-12 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full bg-brand-orange/5 blur-[180px] pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-brand-orangeLight/5 blur-[160px] pointer-events-none" />

          <div className="max-w-7xl mx-auto relative z-10">

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-center mb-6"
            >
              <span className="px-4 py-1.5 rounded-full bg-brand-orange/10 border border-brand-orange/20 text-brand-orange text-xs font-semibold uppercase tracking-wider">
                Our Work
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-extrabold text-white text-center leading-tight mb-6"
            >
              Products we've{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-brand-orangeLight">
                built & shipped
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-dark-muted text-base md:text-lg text-center max-w-3xl mx-auto mb-12"
            >
              From idea to production — real products, real clients, real impact. Each case study below includes the challenge, our solution, and measurable outcomes.
            </motion.p>

            {/* Industry tags */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap justify-center gap-2 mb-8"
            >
              {industries.map(ind => (
                <span key={ind} className="px-3 py-1.5 rounded-lg bg-dark-card border border-dark-border text-dark-muted text-xs font-semibold hover:border-brand-orange/30 hover:text-white transition-all cursor-default">
                  {ind}
                </span>
              ))}
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex justify-center"
            >
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-orange hover:bg-brand-orangeDark text-dark-bg font-bold text-xs uppercase tracking-wider transition-all shadow-glow"
              >
                Start Your Project
                <ArrowRight size={14} />
              </Link>
            </motion.div>
          </div>
        </section>

        {/* ── Portfolio Grid ────────────────────────────────────────────────── */}
        <Portfolio />

      </main>

      <Footer />
    </div>
  );
}
