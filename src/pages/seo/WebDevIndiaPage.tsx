import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight, Layers, Users, Clock, Star, HelpCircle } from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Contact from '../../components/Contact';
import SEO from '../../components/SEO';
import Breadcrumbs from '../../components/Breadcrumbs';
import { Link } from 'react-router-dom';

const services = [
  'Custom Web App Development',
  'React & Next.js Development',
  'E-commerce Platforms',
  'CMS & WordPress Development',
  'API & Backend Systems',
  'Cloud Hosting & DevOps',
];

const stats = [
  { icon: Layers, value: '20+', label: 'Web Projects Delivered' },
  { icon: Users, value: '30+', label: 'Indian & Global Clients' },
  { icon: Clock, value: '3+', label: 'Years in India Market' },
  { icon: Star, value: '98%', label: 'Client Retention' },
];

const faqs = [
  {
    question: "What technologies do you use for web development?",
    answer: "We specialize in modern JavaScript frameworks like React, Next.js, and Node.js for high-performance applications. For content-heavy sites and e-commerce, we excel in WordPress and Shopify development. We choose the right stack based on your specific business requirements."
  },
  {
    question: "How long does a typical web development project take?",
    answer: "A standard corporate website or landing page takes 2-4 weeks. Complex SaaS platforms, custom portals, or advanced e-commerce applications typically take 8-16 weeks depending on feature complexity and integrations."
  },
  {
    question: "Do you provide ongoing support after the website goes live?",
    answer: "Absolutely. We offer flexible post-launch support and maintenance contracts to handle server management, security updates, bug fixes, and feature enhancements to ensure your platform scales securely."
  },
  {
    question: "Are your web applications mobile-responsive and SEO-friendly?",
    answer: "Yes, every website we build is 100% responsive across all devices and follows strict technical SEO best practices, including semantic HTML, fast loading speeds, and optimized Core Web Vitals out of the box."
  }
];

const schema = [
  {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Optenary — Web Development Company India',
    url: 'https://optenary.in/web-development-company-india',
    description: 'Top web development company in India offering custom web applications, React development, e-commerce platforms, and enterprise software solutions.',
    areaServed: 'India',
    serviceType: 'Web Development',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
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
        name: 'Web Development Company India',
        item: 'https://optenary.in/web-development-company-india',
      }
    ]
  }
];

export default function WebDevIndiaPage() {
  return (
    <div className="min-h-screen bg-dark-bg text-white selection:bg-brand-orange selection:text-dark-bg antialiased flex flex-col">
      <SEO
        title="Web Development Company India | Website Development Services | Optenary"
        description="Optenary is a top web development company in India offering custom website development services, SaaS platforms, React apps &amp; e-commerce solutions."
        keywords="web development company India, website development company India, website development services, web development company Gujarat, Optenary"
        canonicalPath="/web-development-company-india"
        schema={schema}
      />
      <Header />
      <main className="flex-grow">

        {/* Hero */}
        <article>
          <header className="relative pt-28 pb-20 px-6 md:px-12 overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full bg-brand-orange/5 blur-[180px] pointer-events-none" />
            <div className="max-w-5xl mx-auto relative z-10">
              <Breadcrumbs items={[{ name: 'Web Development Company India' }]} className="mb-6" />
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-orange/10 border border-brand-orange/20 text-brand-orange text-xs font-semibold uppercase tracking-wider mb-6">
                Web Development Company · India
              </motion.div>
              <motion.h1 initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-6">
                India's Trusted{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-brand-orangeLight">
                  Web Development Company
                </span>
              </motion.h1>
              <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                className="text-dark-muted text-base md:text-xl max-w-2xl mb-10 leading-relaxed">
                Optenary builds custom web applications, SaaS platforms, and enterprise portals for startups and businesses across India and globally. Code-first, no templates.
              </motion.p>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="flex flex-wrap gap-4">
                <Link to="/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-orange hover:bg-brand-orangeDark text-dark-bg font-bold text-xs uppercase tracking-wider transition-all shadow-glow">
                  Get a Free Quote <ArrowRight size={14} />
                </Link>
                <Link to="/projects" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-dark-card border border-dark-border hover:border-brand-orange/40 text-white font-bold text-xs uppercase tracking-wider transition-all">
                  View Our Work
                </Link>
              </motion.div>
            </div>
          </header>

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

          {/* Why Choose Us Block */}
          <section className="px-6 md:px-12 py-16 max-w-5xl mx-auto">
            <div className="bg-dark-card border border-dark-border rounded-2xl p-8 md:p-12 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-orange/5 blur-[80px] rounded-full pointer-events-none" />
              <div className="relative z-10 max-w-3xl">
                <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-6">Why Partner with Optenary for Web Development in India?</h2>
                <p className="text-dark-muted leading-relaxed mb-6">
                  Finding a reliable web development partner in India can be challenging due to varying quality standards and missed deadlines. Optenary changes the narrative by providing silicon-valley grade engineering talent directly from India. We specialize in robust architectures using React, Next.js, and cloud-native solutions that are built to scale from day one.
                </p>
                <p className="text-dark-muted leading-relaxed">
                  We don't just write code; we solve business problems. Whether you're an Indian enterprise looking to digitize your legacy systems, or a startup needing a lightning-fast MVP to secure funding, our transparent communication, agile methodology, and strict adherence to technical SEO and performance standards ensure your platform's success in competitive markets.
                </p>
              </div>
            </div>
          </section>

          {/* Services */}
          <section className="px-6 md:px-12 py-16 bg-[#0b0d0e]">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-2xl md:text-4xl font-extrabold text-white mb-4 text-center">Web Development Services We Offer</h2>
              <p className="text-dark-muted text-center mb-12 max-w-xl mx-auto">Everything from a landing page to a full-scale SaaS platform — built with modern technology and best practices.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {services.map((s, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
                    className="flex items-center gap-3 p-4 rounded-xl bg-dark-card border border-dark-border hover:border-brand-orange/30 transition-all">
                    <CheckCircle2 size={18} className="text-brand-orange shrink-0" />
                    <h3 className="text-white font-semibold text-sm m-0">{s}</h3>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="px-6 md:px-12 py-20 max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-4xl font-extrabold text-white mb-4 text-center">Frequently Asked Questions</h2>
            <p className="text-dark-muted text-center mb-12">Common questions about our web development services in India.</p>
            
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="bg-dark-card border border-dark-border rounded-xl p-6 hover:border-brand-orange/30 transition-colors">
                  <h3 className="text-lg font-bold text-white mb-3 flex items-start gap-3">
                    <HelpCircle size={20} className="text-brand-orange shrink-0 mt-0.5" />
                    {faq.question}
                  </h3>
                  <p className="text-dark-muted leading-relaxed ml-8">{faq.answer}</p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="px-6 md:px-12 py-16 max-w-5xl mx-auto text-center">
            <h2 className="text-2xl md:text-4xl font-extrabold text-white mb-4">Ready to Build Your Web Platform?</h2>
            <p className="text-dark-muted mb-8 max-w-xl mx-auto">Get a free project scope and transparent fixed-price quote. No commitment required.</p>
            <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-brand-orange hover:bg-brand-orangeDark text-dark-bg font-bold uppercase tracking-wider text-sm transition-all shadow-glow">
              Start Your Project <ArrowRight size={16} />
            </Link>
          </section>

          <Contact />
        </article>
      </main>
      <Footer />
    </div>
  );
}
