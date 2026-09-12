import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight, Bot, Users, Clock, Zap, HelpCircle } from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Contact from '../../components/Contact';
import SEO from '../../components/SEO';
import Breadcrumbs from '../../components/Breadcrumbs';
import { Link } from 'react-router-dom';

const services = [
  'AI Voice Agents for Sales & Support',
  'WhatsApp & Telegram Bot Automation',
  'CRM & Workflow Automation',
  'AI Chatbots & Customer Support Bots',
  'Data Pipeline & Reporting Automation',
  'Custom LLM Integration (ChatGPT, Gemini)',
];

const stats = [
  { icon: Bot, value: '8+', label: 'AI Agents Deployed' },
  { icon: Users, value: '30+', label: 'Businesses Automated' },
  { icon: Clock, value: '40h', label: 'Hours Saved Per Client/Week' },
  { icon: Zap, value: '60%', label: 'Avg Support Cost Reduction' },
];

const faqs = [
  {
    question: "How much does AI automation cost for businesses in India?",
    answer: "The cost depends on the complexity of the workflow. Simple WhatsApp bots start at affordable monthly rates, while complex AI voice agents and custom enterprise CRM automations are priced based on API usage and integration complexity. We offer flexible plans designed for Indian SMBs."
  },
  {
    question: "What specific processes can an AI automation agency handle?",
    answer: "We automate repetitive tasks like customer support (L1/L2), lead qualification via voice calls, WhatsApp order tracking, data entry between software like Tally and CRMs, and email sorting."
  },
  {
    question: "Do you integrate with Indian payment gateways and CRMs?",
    answer: "Yes, we seamlessly integrate our AI agents with tools like Razorpay, Cashfree, Zoho, LeadSquared, and standard platforms like HubSpot, Shopify, and Salesforce."
  },
  {
    question: "How long does it take to deploy an AI agent?",
    answer: "Most straightforward chatbots and workflow automations can be deployed within 2 to 4 weeks. Complex voice AI agents that require deep custom LLM training take 4 to 8 weeks."
  }
];

const schema = [
  {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Optenary — AI Automation Agency India',
    url: 'https://optenary.in/ai-automation-agency-india',
    description: 'Leading AI automation agency in India building AI voice agents, workflow automation, chatbots, and CRM automation for modern businesses.',
    areaServed: 'India',
    serviceType: 'AI Automation',
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
        name: 'AI Automation Agency India',
        item: 'https://optenary.in/ai-automation-agency-india',
      }
    ]
  }
];

export default function AIAutomationIndiaPage() {
  return (
    <div className="min-h-screen bg-dark-bg text-white selection:bg-brand-orange selection:text-dark-bg antialiased flex flex-col">
      <SEO
        title="AI Automation Agency India | AI Agent Development | Optenary"
        description="Optenary is a leading AI automation agency in India deploying autonomous AI voice agents, smart chatbots, and custom workflow automations."
        keywords="AI automation agency India, AI agent development, AI voice agent India, workflow automation India, WhatsApp bot development India, Optenary"
        canonicalPath="/ai-automation-agency-india"
        schema={schema}
      />
      <Header />
      <main className="flex-grow">

        {/* Hero */}
        <article>
          <header className="relative pt-28 pb-20 px-6 md:px-12 overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full bg-brand-orange/5 blur-[180px] pointer-events-none" />
            <div className="max-w-5xl mx-auto relative z-10">
              <Breadcrumbs items={[{ name: 'AI Automation Agency India' }]} className="mb-6" />
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-orange/10 border border-brand-orange/20 text-brand-orange text-xs font-semibold uppercase tracking-wider mb-6">
                AI Automation Agency · India
              </motion.div>
              <motion.h1 initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-6">
                India's Premier{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-brand-orangeLight">
                  AI Automation Agency
                </span>
              </motion.h1>
              <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                className="text-dark-muted text-base md:text-xl max-w-2xl mb-10 leading-relaxed">
                Optenary deploys AI voice agents, chatbots, and workflow automation systems that help Indian businesses slash operational costs and scale without headcount.
              </motion.p>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="flex flex-wrap gap-4">
                <Link to="/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-orange hover:bg-brand-orangeDark text-dark-bg font-bold text-xs uppercase tracking-wider transition-all shadow-glow">
                  Automate My Business <ArrowRight size={14} />
                </Link>
                <Link to="/services/ai-agents-automation" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-dark-card border border-dark-border hover:border-brand-orange/40 text-white font-bold text-xs uppercase tracking-wider transition-all">
                  See AI Services
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
                <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-6">Why Choose Optenary for AI Automation in India?</h2>
                <p className="text-dark-muted leading-relaxed mb-6">
                  As the AI landscape rapidly evolves, generic off-the-shelf software often fails to meet the unique operational needs of Indian businesses. At Optenary, we don't just sell software; we act as your dedicated growth partner. We specialize in mapping out your most time-consuming bottlenecks and replacing them with robust, custom-trained LLMs and deterministic workflows.
                </p>
                <p className="text-dark-muted leading-relaxed">
                  Whether you need a multilingual AI voice agent that can speak English and Hindi, a WhatsApp bot that handles 10,000 queries a day, or deep API integrations connecting your legacy CRM to modern data pipelines, our team of expert developers guarantees a high-ROI automation strategy tailored for the Indian market.
                </p>
              </div>
            </div>
          </section>

          {/* Services */}
          <section className="px-6 md:px-12 py-16 bg-[#0b0d0e]">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-2xl md:text-4xl font-extrabold text-white mb-4 text-center">AI Automation Services for Indian Businesses</h2>
              <p className="text-dark-muted text-center mb-12 max-w-xl mx-auto">From simple WhatsApp bots to full AI agent systems that handle sales calls — we build it all.</p>
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
            <p className="text-dark-muted text-center mb-12">Common questions about working with our AI automation agency in India.</p>

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
            <h2 className="text-2xl md:text-4xl font-extrabold text-white mb-4">Ready to Automate Your Business?</h2>
            <p className="text-dark-muted mb-8 max-w-xl mx-auto">Book a free 30-minute automation audit. We'll identify the top 3 processes you can automate this month.</p>
            <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-brand-orange hover:bg-brand-orangeDark text-dark-bg font-bold uppercase tracking-wider text-sm transition-all shadow-glow">
              Book Free Audit <ArrowRight size={16} />
            </Link>
          </section>

          <Contact />
        </article>
      </main>
      <Footer />
    </div>
  );
}
