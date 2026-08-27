import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight, Smartphone, Users, Clock, Star } from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Contact from '../../components/Contact';
import SEO from '../../components/SEO';
import { Link } from 'react-router-dom';

const services = [
  'React Native App Development',
  'Flutter App Development',
  'iOS (Swift) App Development',
  'Android (Kotlin) App Development',
  'App Store & Play Store Publishing',
  'App Maintenance & Updates',
];

const stats = [
  { icon: Smartphone, value: '12+', label: 'Apps Launched' },
  { icon: Users, value: '30+', label: 'Happy Clients' },
  { icon: Clock, value: '6 Wk', label: 'Avg MVP Timeline' },
  { icon: Star, value: '4.9★', label: 'Average App Rating' },
];

const schema = [
  {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Optenary — Mobile App Developer Surat',
    url: 'https://optenary.in/mobile-app-developer-surat',
    description: 'Top mobile app development company in Surat offering React Native, Flutter, iOS and Android app development for startups and businesses.',
    areaServed: ['Surat', 'Gujarat', 'India'],
    serviceType: 'Mobile App Development',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://optenary.in/',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Mobile App Developer Surat',
        item: 'https://optenary.in/mobile-app-developer-surat',
      }
    ]
  }
];

export default function MobileAppSuratPage() {
  return (
    <div className="min-h-screen bg-dark-bg text-white selection:bg-brand-orange selection:text-dark-bg antialiased flex flex-col">
      <SEO
        title="Mobile App Developer Surat | iOS &amp; Android Apps"
        description="Top mobile app development company in Surat. We build custom iOS, Android, Flutter, and React Native apps optimized for performance and approved on app stores."
        keywords="mobile app developer Surat, app development company Surat, React Native developer Surat, iOS app development Surat, Android app developer Surat, mobile app development Gujarat"
        canonicalPath="/mobile-app-developer-surat"
        schema={schema}
      />
      <Header />
      <main className="flex-grow">

        {/* Hero */}
        <section className="relative pt-28 pb-20 px-6 md:px-12 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full bg-brand-orange/5 blur-[180px] pointer-events-none" />
          <div className="max-w-5xl mx-auto relative z-10">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-orange/10 border border-brand-orange/20 text-brand-orange text-xs font-semibold uppercase tracking-wider mb-6">
              Mobile App Development · Surat, Gujarat
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-6">
              #1 Mobile App Developer{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-brand-orangeLight">
                in Surat, Gujarat
              </span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="text-dark-muted text-base md:text-xl max-w-2xl mb-10 leading-relaxed">
              Optenary builds high-quality iOS and Android apps for Surat-based businesses and startups. From MVPs to full enterprise apps — delivered fast, priced fairly, built to last.
            </motion.p>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="flex flex-wrap gap-4">
              <Link to="/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-orange hover:bg-brand-orangeDark text-dark-bg font-bold text-xs uppercase tracking-wider transition-all shadow-glow">
                Get a Free Quote <ArrowRight size={14} />
              </Link>
              <Link to="/projects" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-dark-card border border-dark-border hover:border-brand-orange/40 text-white font-bold text-xs uppercase tracking-wider transition-all">
                View Our Apps
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Stats */}
        <section className="px-6 md:px-12 py-12 max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map(({ icon: Icon, value, label }, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="p-5 rounded-2xl bg-dark-card border border-dark-border text-center">
                <Icon size={18} className="text-brand-orange mx-auto mb-2" />
                <div className="text-2xl font-black text-white mb-1">{value}</div>
                <div className="text-xs text-dark-muted font-semibold uppercase tracking-wider">{label}</div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Services */}
        <section className="px-6 md:px-12 py-16 bg-[#0b0d0e]">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl md:text-4xl font-extrabold text-white mb-4 text-center">Mobile App Services in Surat</h2>
            <p className="text-dark-muted text-center mb-12 max-w-xl mx-auto">Full-stack mobile development from design to App Store — all under one roof.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {services.map((s, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
                  className="flex items-center gap-3 p-4 rounded-xl bg-dark-card border border-dark-border hover:border-brand-orange/30 transition-all">
                  <CheckCircle2 size={18} className="text-brand-orange shrink-0" />
                  <span className="text-white font-semibold text-sm">{s}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-6 md:px-12 py-16 max-w-5xl mx-auto text-center">
          <h2 className="text-2xl md:text-4xl font-extrabold text-white mb-4">Start Your Mobile App Project in Surat</h2>
          <p className="text-dark-muted mb-8 max-w-xl mx-auto">Free consultation, transparent pricing, and a dedicated team from day one.</p>
          <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-brand-orange hover:bg-brand-orangeDark text-dark-bg font-bold uppercase tracking-wider text-sm transition-all shadow-glow">
            Book Free Consultation <ArrowRight size={16} />
          </Link>
        </section>

        <Contact />
      </main>
      <Footer />
    </div>
  );
}
