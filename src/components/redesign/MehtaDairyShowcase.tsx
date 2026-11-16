import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ExternalLink, ShieldCheck, Zap, Sparkles, ShoppingBag, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function MehtaDairyShowcase() {
  const [activeTab, setActiveTab] = useState<'overview' | 'challenges' | 'solution' | 'results'>('overview');

  return (
    <section className="relative py-28 px-6 md:px-12 bg-[#02050f] overflow-hidden border-t border-navy-border/50">
      {/* Background Glows */}
      <div className="absolute top-1/2 left-1/4 w-[600px] h-[600px] bg-brand-cyan/10 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-brand-blue/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Section Marker */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-navy-card border border-navy-border text-xs font-mono text-brand-cyan uppercase tracking-wider mb-4">
              <Sparkles size={12} className="text-brand-cyan" />
              <span>(02) EDITORIAL CASE STUDY // FLAGSHIP DEPLOYMENT</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Mehta Dairy — Digitalizing a 50-year heritage confectionery.
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/projects/mehta-dairy"
              className="px-4 py-2.5 rounded-xl bg-navy-card hover:bg-navy-cardHover border border-navy-border text-xs font-mono text-white flex items-center gap-1.5 transition-colors"
            >
              <span>Full Case Study Page</span>
              <ArrowUpRight size={14} className="text-brand-cyan" />
            </Link>
            <a
              href="https://mehtadairy.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl bg-brand-blue hover:bg-blue-600 text-xs font-mono font-semibold text-white flex items-center gap-1.5 shadow-glow-blue transition-all"
            >
              <span>Visit mehtadairy.com</span>
              <ExternalLink size={14} />
            </a>
          </div>
        </div>

        {/* Editorial Hero Layout: Two Columns (Visual Left/Top, Deep Narrative Right/Bottom) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-16">
          
          {/* Visual Showcase (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative rounded-2xl overflow-hidden border border-navy-border/80 bg-navy-card/50 shadow-2xl group">
              {/* Browser Bar */}
              <div className="h-7 bg-navy-card px-4 flex items-center justify-between border-b border-navy-border/50">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                </div>
                <div className="text-[11px] font-mono text-navy-muted bg-navy-base/60 px-3 py-0.5 rounded border border-navy-border/30">
                  https://mehtadairy.com
                </div>
                <div className="text-[10px] font-mono text-emerald-400">● LIVE</div>
              </div>

              {/* Main Screenshot */}
              <div className="aspect-[16/10] overflow-hidden bg-black relative">
                <img
                  src="/images/mehta_dairy.png"
                  alt="Mehta Dairy Storefront"
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Thumbnail grid showcasing actual products & store */}
            <div className="grid grid-cols-2 gap-4">
              <div className="relative rounded-xl overflow-hidden border border-navy-border/60 aspect-[16/9] bg-navy-card">
                <img
                  src="/images/mehta_products.png"
                  alt="Mehta Dairy Products"
                  className="w-full h-full object-cover object-center"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-3">
                  <span className="text-[11px] font-mono text-white font-medium">Handcrafted Pure Cow Ghee Sweets</span>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-navy-border/60 bg-navy-card/60 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <img src="/images/mehta_logo.png" alt="Mehta Dairy Logo" className="w-7 h-7 object-contain" />
                    <span className="text-xs font-mono font-bold text-white">Mehta Dairy Sweets</span>
                  </div>
                  <p className="text-[11px] text-navy-muted leading-relaxed">
                    Palitana, Gujarat. Established in 1972. Famed for traditional Peda, Kaju Katli, and authentic farsan.
                  </p>
                </div>
                <div className="flex items-center gap-2 mt-3 pt-2 border-t border-navy-border/40 text-[10px] font-mono text-brand-cyan">
                  <ShieldCheck size={12} />
                  <span>100% Verified Production Client</span>
                </div>
              </div>
            </div>
          </div>

          {/* Editorial Narrative Tabs (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Nav Tabs */}
            <div className="flex gap-2 p-1 rounded-xl bg-navy-card/80 border border-navy-border">
              {[
                { id: 'overview', label: 'Overview' },
                { id: 'challenges', label: 'Challenges' },
                { id: 'solution', label: 'Solution' },
                { id: 'results', label: 'Outcomes' }
              ].map(t => (
                <button
                  key={t.id}
                  onClick={() => setActiveTab(t.id as any)}
                  className={`flex-1 py-1.5 text-xs font-mono rounded-lg transition-all ${
                    activeTab === t.id
                      ? 'bg-brand-blue text-white shadow-glow-blue'
                      : 'text-navy-muted hover:text-white'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {/* Tab Contents */}
            <div className="glass-panel rounded-2xl p-6 border border-navy-border min-h-[360px] flex flex-col justify-between">
              {activeTab === 'overview' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                  <h3 className="text-xl font-bold text-white">The Legacy Heritage Meets Digital Commerce</h3>
                  <p className="text-xs sm:text-sm text-navy-muted leading-relaxed">
                    Established in 1972 in Palitana, Gujarat, Mehta Dairy is a household confectionery brand renowned for uncompromising quality, crafting handcrafted sweets and authentic snacks with 100% pure cow ghee.
                  </p>
                  <p className="text-xs sm:text-sm text-navy-muted leading-relaxed">
                    Optenary was commissioned to build their flagship e-commerce platform from scratch—enabling customers across India to purchase fresh festive delicacies online with effortless ordering, instant UPI checkouts, and real-time WhatsApp assistance.
                  </p>
                  <div className="pt-2">
                    <span className="text-[11px] font-mono text-brand-cyan block mb-2 uppercase">Core Project Scope</span>
                    <div className="flex flex-wrap gap-1.5">
                      {['Custom React Storefront', 'Weight Tiers (250g, 500g, 1kg)', 'Razorpay Gateway', 'WhatsApp Ordering Bot', 'Pan-India Logistics'].map(s => (
                        <span key={s} className="px-2 py-0.5 rounded bg-navy-card text-[10px] font-mono text-slate-300 border border-navy-border">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'challenges' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                  <h3 className="text-xl font-bold text-white">Engineering Obstacles & Requirements</h3>
                  <ul className="space-y-3 text-xs sm:text-sm text-navy-muted">
                    <li className="flex items-start gap-2">
                      <span className="text-brand-cyan font-bold font-mono">01</span>
                      <span><strong>Dynamic Variant Pricing:</strong> Traditional sweets are ordered by gram weight (250g, 500g, 1kg) with varying packaging requirements rather than static SKU counts.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-brand-cyan font-bold font-mono">02</span>
                      <span><strong>High Festive Traffic Spikes:</strong> Confectionery orders surge by 10x during Diwali and festive seasons, requiring zero downtime and sub-second load times.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-brand-cyan font-bold font-mono">03</span>
                      <span><strong>Demographic Inclusivity:</strong> Legacy customers needed an intuitive, frictionless checkout experience suitable for all age groups with direct WhatsApp support.</span>
                    </li>
                  </ul>
                </motion.div>
              )}

              {activeTab === 'solution' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                  <h3 className="text-xl font-bold text-white">The Optenary Engineering Solution</h3>
                  <p className="text-xs sm:text-sm text-navy-muted leading-relaxed">
                    We rejected generic page-builders and engineered a bespoke React & Vite storefront coupled with an edge-optimized architecture:
                  </p>
                  <div className="space-y-2 text-xs font-mono text-slate-300">
                    <div className="p-2.5 rounded-lg bg-navy-card border border-navy-border flex items-center gap-2">
                      <Zap size={14} className="text-brand-cyan shrink-0" />
                      <span>Instant client-side cart calculations without reload lag</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-navy-card border border-navy-border flex items-center gap-2">
                      <ShoppingBag size={14} className="text-brand-blue shrink-0" />
                      <span>Single-step checkout flow with Razorpay UPI and cards</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-navy-card border border-navy-border flex items-center gap-2">
                      <MessageSquare size={14} className="text-emerald-400 shrink-0" />
                      <span>Automated WhatsApp order notifications for customer peace of mind</span>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'results' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                  <h3 className="text-xl font-bold text-white">Verified Production Outcomes</h3>
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <div className="p-3 rounded-xl bg-navy-card border border-navy-border">
                      <div className="text-2xl font-mono font-bold text-brand-cyan">1.1s</div>
                      <div className="text-[11px] text-navy-muted">Average page load speed</div>
                    </div>
                    <div className="p-3 rounded-xl bg-navy-card border border-navy-border">
                      <div className="text-2xl font-mono font-bold text-brand-blue">99.9%</div>
                      <div className="text-[11px] text-navy-muted">Production uptime record</div>
                    </div>
                    <div className="p-3 rounded-xl bg-navy-card border border-navy-border">
                      <div className="text-2xl font-mono font-bold text-emerald-400">Pan-India</div>
                      <div className="text-[11px] text-navy-muted">D2C order fulfillment</div>
                    </div>
                    <div className="p-3 rounded-xl bg-navy-card border border-navy-border">
                      <div className="text-2xl font-mono font-bold text-brand-purple">Zero</div>
                      <div className="text-[11px] text-navy-muted">Checkout drop-off errors</div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Bottom Card Footer */}
              <div className="pt-4 border-t border-navy-border/60 flex items-center justify-between text-xs font-mono">
                <span className="text-navy-muted">Tech: React · Node · Tailwind · UPI</span>
                <Link to="/projects/mehta-dairy" className="text-brand-cyan hover:underline flex items-center gap-1">
                  <span>Read Full Technical Writeup</span>
                  <ArrowUpRight size={12} />
                </Link>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
