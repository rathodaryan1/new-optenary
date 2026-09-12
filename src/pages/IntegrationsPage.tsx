import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ArrowRight, Zap, CheckCircle } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { BrandLogo } from '../components/BrandLogos';
import SEO from '../components/SEO';

interface Integration {
  name: string;
  category: string;
  desc: string;
  color: string;
  slug?: string;
}

export default function IntegrationsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const categories = [
    'All',
    'Payments & Billing',
    'Communication & Messaging',
    'AI & LLMs',
    'Notifications & Engagement',
    'Analytics & Monitoring',
    'CRM & Customer Support',
    'Cloud & Infrastructure',
    'Maps & Location',
    'Marketing & Social',
    'Logistics & Fulfillment',
    'App Distribution',
    'Automation & Workflows',
    'Scheduling & Meetings',
    'Headless CMS'
  ];

  const integrations: Integration[] = [
    // Payments & Billing
    {
      name: 'Stripe',
      category: 'Payments & Billing',
      desc: 'Subscriptions, one-time payments, payouts, and Connect.',
      color: '#635bff',
      slug: 'stripe'
    },
    {
      name: 'Razorpay',
      category: 'Payments & Billing',
      desc: 'Indian payment gateway with UPI, cards, netbanking, and subscriptions.',
      color: '#0b72e7',
      slug: 'razorpay'
    },
    {
      name: 'PayPal',
      category: 'Payments & Billing',
      desc: 'Global checkout and recurring billing across 200+ markets.',
      color: '#003087',
      slug: 'paypal'
    },
    {
      name: 'Paytm',
      category: 'Payments & Billing',
      desc: 'Payment gateway, wallet, and UPI for Indian customers.',
      color: '#00b9f1',
      slug: 'paytm'
    },
    {
      name: 'PhonePe',
      category: 'Payments & Billing',
      desc: 'UPI-first payments and merchant collections in India.',
      color: '#5f259f'
    },
    // Communication & Messaging
    {
      name: 'WhatsApp API',
      category: 'Communication & Messaging',
      desc: 'Cloud API for templated messages, support, and commerce flows.',
      color: '#25d366',
      slug: 'whatsapp'
    },
    {
      name: 'Twilio',
      category: 'Communication & Messaging',
      desc: 'SMS, voice, OTP verification, and WhatsApp Business messaging.',
      color: '#f22f46',
      slug: 'twilio'
    },
    {
      name: 'AiSensy',
      category: 'Communication & Messaging',
      desc: 'Official WhatsApp BSP for broadcast, chatbots, and CRM.',
      color: '#ff6f06'
    },
    {
      name: 'Brevo',
      category: 'Communication & Messaging',
      desc: 'Transactional + marketing email, SMS, and automation.',
      color: '#008060',
      slug: 'brevo'
    },
    {
      name: 'SendGrid',
      category: 'Communication & Messaging',
      desc: 'High-deliverability transactional email at scale.',
      color: '#0091ff',
      slug: 'sendgrid'
    },
    {
      name: 'Mailgun',
      category: 'Communication & Messaging',
      desc: 'Email APIs for sending, receiving, and tracking.',
      color: '#e12d30',
      slug: 'mailgun'
    },
    // AI & LLMs
    {
      name: 'OpenAI',
      category: 'AI & LLMs',
      desc: 'GPT models for chat, agents, embeddings, and assistants.',
      color: '#10a37f',
      slug: 'openai/ffffff'
    },
    {
      name: 'Gemini',
      category: 'AI & LLMs',
      desc: 'Google Gemini multimodal models for text, vision, and reasoning.',
      color: '#7a2fff',
      slug: 'googlegemini'
    },
    {
      name: 'Vapi',
      category: 'AI & LLMs',
      desc: 'Real-time voice AI agents for sales and support calls.',
      color: '#0b91ff'
    },
    // Notifications & Engagement
    {
      name: 'OneSignal',
      category: 'Notifications & Engagement',
      desc: 'Push notifications across web, mobile, and email.',
      color: '#e51b24',
      slug: 'onesignal'
    },
    {
      name: 'Firebase',
      category: 'Notifications & Engagement',
      desc: 'Auth, realtime DB, FCM, Crashlytics, and remote config.',
      color: '#ffca28',
      slug: 'firebase'
    },
    {
      name: 'MoEngage',
      category: 'Notifications & Engagement',
      desc: 'Cross-channel customer engagement and journey orchestration.',
      color: '#00b5e2'
    },
    {
      name: 'Engage',
      category: 'Notifications & Engagement',
      desc: 'Customer marketing automation across email, SMS, and WhatsApp.',
      color: '#0063ff'
    },
    // Analytics & Monitoring
    {
      name: 'Google Analytics',
      category: 'Analytics & Monitoring',
      desc: 'Web and app analytics with GA4 events and conversions.',
      color: '#f9ab00',
      slug: 'googleanalytics'
    },
    {
      name: 'Mixpanel',
      category: 'Analytics & Monitoring',
      desc: 'Product analytics, funnels, retention, and cohorts.',
      color: '#7856ff',
      slug: 'mixpanel'
    },
    {
      name: 'Hotjar',
      category: 'Analytics & Monitoring',
      desc: 'Heatmaps, session recordings, and user feedback.',
      color: '#ff4757',
      slug: 'hotjar'
    },
    {
      name: 'Sentry',
      category: 'Analytics & Monitoring',
      desc: 'Error tracking and performance monitoring across stacks.',
      color: '#362d59',
      slug: 'sentry'
    },
    // CRM & Customer Support
    {
      name: 'Salesforce',
      category: 'CRM & Customer Support',
      desc: 'Enterprise CRM integration, lead sync, and sales pipeline management.',
      color: '#00a1e0',
      slug: 'salesforce'
    },
    {
      name: 'HubSpot',
      category: 'CRM & Customer Support',
      desc: 'CRM, marketing automation, and sales workflows.',
      color: '#ff7a59',
      slug: 'hubspot'
    },
    {
      name: 'Zoho',
      category: 'CRM & Customer Support',
      desc: 'CRM, mail, books, and end-to-end business automation.',
      color: '#e21a22',
      slug: 'zoho'
    },
    {
      name: 'Zendesk',
      category: 'CRM & Customer Support',
      desc: 'Helpdesk, ticketing, and omnichannel support.',
      color: '#03363d',
      slug: 'zendesk'
    },
    // Cloud & Infrastructure
    {
      name: 'Cloudflare',
      category: 'Cloud & Infrastructure',
      desc: 'CDN, WAF, DNS, and edge security globally.',
      color: '#f38020',
      slug: 'cloudflare'
    },
    {
      name: 'Digital Ocean',
      category: 'Cloud & Infrastructure',
      desc: 'Droplets, managed databases, and app platform hosting.',
      color: '#0080ff',
      slug: 'digitalocean'
    },
    {
      name: 'Cloudinary',
      category: 'Cloud & Infrastructure',
      desc: 'Image and video upload, transformation, and delivery.',
      color: '#3448c5',
      slug: 'cloudinary'
    },
    // Maps & Location
    {
      name: 'Google Maps Platform',
      category: 'Maps & Location',
      desc: 'Maps, places, geocoding, and distance matrix APIs.',
      color: '#34a853',
      slug: 'googlemaps'
    },
    {
      name: 'Mapbox',
      category: 'Maps & Location',
      desc: 'Custom maps, navigation, and location SDKs.',
      color: '#000000',
      slug: 'mapbox'
    },
    // Marketing & Social
    {
      name: 'Meta Platforms',
      category: 'Marketing & Social',
      desc: 'Facebook & Instagram Graph, Ads, and Login APIs.',
      color: '#0668e1',
      slug: 'meta'
    },
    {
      name: 'Instagram Graph API',
      category: 'Marketing & Social',
      desc: 'Social login, media publishing, and direct messaging.',
      color: '#e1306c',
      slug: 'instagram'
    },
    // Logistics & Fulfillment
    {
      name: 'Shiprocket',
      category: 'Logistics & Fulfillment',
      desc: 'Multi-courier shipping, tracking, and returns for India.',
      color: '#772288'
    },
    // App Distribution
    {
      name: 'Apple App Store',
      category: 'App Distribution',
      desc: 'iOS app submission, TestFlight, and App Store Connect.',
      color: '#0070c0',
      slug: 'apple/ffffff'
    },
    {
      name: 'Google Play Store',
      category: 'App Distribution',
      desc: 'Android publishing, internal tracks, and Play Console.',
      color: '#3bccff',
      slug: 'googleplay'
    },
    // Automation & Workflows
    {
      name: 'n8n',
      category: 'Automation & Workflows',
      desc: 'Self-hosted workflow automation across 400+ apps.',
      color: '#ff6d5a',
      slug: 'n8n/ffffff'
    },
    {
      name: 'Make',
      category: 'Automation & Workflows',
      desc: 'Visual scenario builder for cross-app automation.',
      color: '#430098',
      slug: 'make/ffffff'
    },
    // Scheduling & Meetings
    {
      name: 'Calendly',
      category: 'Scheduling & Meetings',
      desc: 'Automated meeting scheduling with calendar sync.',
      color: '#006BFF',
      slug: 'calendly'
    },
    {
      name: 'Zoom',
      category: 'Scheduling & Meetings',
      desc: 'Video meetings, webinars, and SDK embeds.',
      color: '#2d8cff',
      slug: 'zoom'
    },
    {
      name: 'Google Meet',
      category: 'Scheduling & Meetings',
      desc: 'Video conferencing tied into Google Workspace.',
      color: '#00a859',
      slug: 'googlemeet'
    },
    // Headless CMS
    {
      name: 'Strapi',
      category: 'Headless CMS',
      desc: 'Open-source headless CMS with flexible content APIs.',
      color: '#4945ff',
      slug: 'strapi'
    }
  ];

  const filteredIntegrations = useMemo(() => {
    return integrations.filter((item) => {
      const matchCategory = selectedCategory === 'All' || item.category === selectedCategory;
      const matchQuery = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         item.desc.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchQuery;
    });
  }, [selectedCategory, searchQuery, integrations]);

  return (
    <div className="min-h-screen bg-dark-bg text-white selection:bg-brand-orange selection:text-dark-bg antialiased flex flex-col justify-between">
      <SEO 
        title="API Integrations & Third-Party Platforms"
        description="Explore the third-party integrations we ship, from payments (Stripe, Razorpay) and AI models to analytics, CRMs, logistics, and mapping APIs."
        keywords="third-party integrations, API connectors, Stripe integration, Razorpay integration, OpenAI integrations, CRM sync"
        canonicalPath="/integrations"
      />
      {/* Shared Header Navigation */}
      <Header />

      <main className="flex-grow bg-[#050607] py-28 px-6 md:px-12 relative overflow-hidden">
        {/* Glow Rings */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-brand-orange/5 blur-[150px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-brand-orange/5 blur-[150px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          
          {/* ======================================================== */}
          {/* HEADER HERO AREA                                         */}
          {/* ======================================================== */}
          <div className="text-center mb-16">
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="px-3.5 py-1.5 rounded-full bg-brand-orange/10 border border-brand-orange/20 text-brand-orange text-xs font-semibold uppercase tracking-wider inline-block mb-6 shadow-glow"
            >
              42+ Integrations
            </motion.span>
            
            <motion.h1 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mt-2 mb-6 max-w-4xl mx-auto"
            >
              Third-party integrations we <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-brand-orangeLight">ship every day</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-dark-muted max-w-3xl mx-auto text-sm md:text-base leading-relaxed mb-10"
            >
              From payments and AI to logistics and analytics — we plug your product into the platforms your business already runs on. Battle-tested, production-ready, and built to scale.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
            >
              <a 
                href="/contact" 
                className="px-7 py-3.5 rounded-xl bg-brand-orange hover:bg-brand-orangeDark text-dark-bg font-bold uppercase tracking-wider text-xs transition-all transform hover:-translate-y-0.5 shadow-glow"
              >
                Discuss your integration
              </a>
              <a 
                href="#integrations-explorer" 
                className="px-7 py-3.5 rounded-xl bg-dark-card hover:bg-dark-light border border-dark-border text-white font-bold uppercase tracking-wider text-xs transition-colors"
              >
                Explore by category
              </a>
            </motion.div>

            {/* Statistics Section */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto border-y border-dark-border/40 py-8 text-center bg-dark-card/10 backdrop-blur-sm rounded-3xl px-6">
              <div>
                <span className="text-3xl md:text-4xl font-black text-brand-orange block mb-1">42+</span>
                <span className="text-xs text-dark-muted font-semibold uppercase tracking-wider">Platforms integrated</span>
              </div>
              <div>
                <span className="text-3xl md:text-4xl font-black text-brand-orange block mb-1">14+</span>
                <span className="text-xs text-dark-muted font-semibold uppercase tracking-wider">Domains covered</span>
              </div>
              <div>
                <span className="text-3xl md:text-4xl font-black text-brand-orange block mb-1">50+</span>
                <span className="text-xs text-dark-muted font-semibold uppercase tracking-wider">Production deployments</span>
              </div>
            </div>
          </div>

          {/* ======================================================== */}
          {/* INTERACTIVE DISCOVERY DASHBOARD BLOCK                     */}
          {/* ======================================================== */}
          <div id="integrations-explorer" className="mt-12 bg-dark-card/20 border border-dark-border/50 rounded-3xl p-6 md:p-10 shadow-glow relative">
            
            {/* Controls Bar (Tabs selection & Search query input) */}
            <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6 pb-8 border-b border-dark-border/40">
              
              {/* Search Console Widget (Premium Visual design) */}
              <div className="relative w-full xl:max-w-md shrink-0 group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-brand-orange via-brand-orangeLight to-brand-orange rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-700" />
                <div className="relative flex items-center bg-dark-bg/95 border border-dark-border/80 focus-within:border-brand-orange/50 rounded-2xl p-0.5 transition-all overflow-hidden">
                  
                  {/* Visual API badge inside the search bar */}
                  <div className="flex items-center gap-1.5 pl-3.5 pr-2.5 py-2.5 bg-dark-card/60 rounded-xl border border-dark-border/40 shrink-0 text-brand-orange">
                    <Search size={14} />
                    <span className="text-[9px] font-extrabold uppercase tracking-widest hidden sm:inline">API</span>
                  </div>

                  <input
                    type="text"
                    placeholder="Search platforms..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-3.5 pr-4 py-2.5 bg-transparent text-sm text-white focus:outline-none placeholder:text-dark-muted font-medium"
                  />
                  
                  {/* Subtle terminal pulse dot */}
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-1.5 pointer-events-none">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-orange/80 animate-ping" />
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-orange absolute right-0" />
                  </div>
                </div>
              </div>

              {/* Categories tab buttons */}
              <div className="flex flex-wrap gap-2 w-full xl:justify-end no-scrollbar overflow-x-auto py-1">
                {categories.map((cat) => {
                  const isActive = selectedCategory === cat;
                  return (
                    <button
                      key={cat}
                      onClick={() => {
                        setSelectedCategory(cat);
                        setSearchQuery(''); // reset search query on tab change
                      }}
                      className={`px-4 py-2.5 rounded-full text-xs font-bold transition-all uppercase tracking-wider shrink-0 ${
                        isActive 
                          ? 'bg-brand-orange text-dark-bg shadow-glow' 
                          : 'bg-dark-bg/60 border border-dark-border text-dark-muted hover:text-white hover:border-brand-orange/20'
                      }`}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>

            </div>

            {/* Dynamic Grid Listing */}
            <div className="pt-8">
              <AnimatePresence mode="popLayout">
                {filteredIntegrations.length > 0 ? (
                  <motion.div 
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  >
                    {filteredIntegrations.map((item, idx) => {
                      const isHovered = hoveredIdx === idx;
                      return (
                        <motion.div
                          layout
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          transition={{ duration: 0.25 }}
                          key={item.name}
                          onMouseEnter={() => setHoveredIdx(idx)}
                          onMouseLeave={() => setHoveredIdx(null)}
                          style={{
                            borderColor: isHovered ? item.color : 'rgba(30, 35, 41, 0.4)',
                            boxShadow: isHovered ? `0 0 25px -5px ${item.color}33` : 'none',
                          }}
                          className="relative p-6 rounded-2xl bg-dark-bg/60 border transition-all duration-300 flex items-start gap-4 cursor-pointer select-none group"
                        >
                          
                          {/* Glowing Radial Brand Icon container */}
                          <div 
                            className="w-12 h-12 rounded-xl flex items-center justify-center font-extrabold text-white text-base relative shrink-0 overflow-hidden border border-dark-border bg-dark-bg/40"
                          >
                            {BrandLogo({ name: item.name }) ? (
                              <div className="w-6 h-6 flex items-center justify-center relative z-10 transition-transform duration-300 group-hover:scale-110 shrink-0">
                                <BrandLogo name={item.name} className="w-6 h-6" />
                              </div>
                            ) : item.slug ? (
                              <img 
                                src={`https://cdn.simpleicons.org/${item.slug}`} 
                                alt={item.name} 
                                className="w-6 h-6 object-contain relative z-10 transition-transform duration-300 group-hover:scale-110" 
                                loading="lazy"
                              decoding="async" />
                            ) : (
                              <span className="relative z-10 font-sans tracking-tight" style={{ color: item.color }}>
                                {item.name[0]}
                              </span>
                            )}
                          </div>

                          {/* Text descriptions */}
                          <div className="flex-grow">
                            <div className="flex justify-between items-center mb-1">
                              <h3 className="text-sm font-bold text-white group-hover:text-white transition-colors">
                                {item.name}
                              </h3>
                              
                              {/* Dynamic Checkmark indicator on hover */}
                              <CheckCircle 
                                size={12} 
                                className="opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all"
                                style={{ color: item.color }}
                              />
                            </div>
                            
                            <span className="text-[9px] uppercase tracking-wider font-extrabold text-brand-orangeLight/80 block mb-2">
                              {item.category}
                            </span>

                            <p className="text-xs text-dark-muted leading-relaxed">
                              {item.desc}
                            </p>
                          </div>

                        </motion.div>
                      );
                    })}
                  </motion.div>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center py-16 flex flex-col items-center justify-center"
                  >
                    <div className="w-12 h-12 rounded-full bg-dark-bg/80 border border-dark-border flex items-center justify-center text-dark-muted mb-4">
                      <Search size={18} />
                    </div>
                    <span className="text-sm font-bold text-white block mb-1">No platforms found</span>
                    <span className="text-xs text-dark-muted max-w-xs">We couldn't find any integrations matching your search query or category filter.</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Banner bottom hint */}
            <div className="mt-10 border-t border-dark-border/40 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <Zap size={14} className="text-brand-orange" />
                <span className="text-xs text-dark-muted font-medium">Need a custom integration? We build custom API connectors in-house.</span>
              </div>
              
              <a 
                href="/contact"
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brand-orange hover:text-brand-orangeLight transition-colors"
              >
                <span>Build a Custom API Connector</span>
                <ArrowRight size={12} />
              </a>
            </div>

          </div>

        </div>
      </main>

      {/* Shared Footer directories */}
      <Footer />
    </div>
  );
}
