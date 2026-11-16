import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Send,
  CheckCircle2,
  AlertCircle,
  Phone,
  Mail,
  MessageSquare,
  Shield,
  Sparkles
} from 'lucide-react';

export default function ContactSection() {
  const servicesList = [
    'Web Development',
    'Mobile App Development',
    'AI Agents & Automation',
    'Custom Software & SaaS',
    'E-commerce Development',
    'UI/UX & Product Design',
    'Desktop Applications',
    'Game Development'
  ];

  const industriesList = [
    'Startups & Early-Stage MVPs',
    'E-Commerce & D2C Brands',
    'B2B Portals & Logistics',
    'Healthcare & MedTech',
    'FinTech & Wealth Management',
    'Real Estate & PropTech',
    'FoodTech & Confectionery',
    'Other Specialized Domain'
  ];

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    industry: '',
    desc: '',
    agree: false
  });

  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, agree: e.target.checked }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.name.trim()) return setError('Please enter your full name');
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) return setError('Please enter a valid business email address');
    if (!formData.phone.trim()) return setError('Please enter your contact phone or WhatsApp number');
    if (!formData.service) return setError('Please select a service domain');
    if (!formData.industry) return setError('Please select an industry classification');
    if (!formData.agree) return setError('Please confirm acceptance of Privacy Policy & Terms');

    setIsSubmitting(true);

    try {
      const BOT_TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN || '8967268981:AAGzFp8vjPl3CkWj6krl7ffBs3Pdydhy84A';
      const CHAT_ID = import.meta.env.VITE_TELEGRAM_CHAT_ID || '5704424192';

      const messageText = `🚀 *New Optenary Inbound Project Lead*

*Name:* ${formData.name}
*Email:* ${formData.email}
*Phone:* ${formData.phone}

*Service Domain:* ${formData.service}
*Industry:* ${formData.industry}

*Project Blueprint / Details:*
${formData.desc || 'No additional specifications provided.'}

*Source:* Optenary Redesign Marketing Portal`;

      const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: messageText,
          parse_mode: 'Markdown',
        }),
      });

      const result = await response.json();

      if (result.ok) {
        setIsSuccess(true);
        setFormData({ name: '', email: '', phone: '', service: '', industry: '', desc: '', agree: false });
      } else {
        setError('Transmission encountered an issue. Please reach us directly via WhatsApp.');
      }
    } catch {
      setError('Network communication failed. Please reach us via WhatsApp or direct call.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative py-28 px-6 md:px-12 bg-[#030612] overflow-hidden border-t border-navy-border/50">
      {/* Background glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-brand-cyan/10 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-brand-blue/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-navy-card border border-navy-border text-xs font-mono text-brand-cyan uppercase tracking-wider mb-4">
            <Sparkles size={12} className="text-brand-cyan" />
            <span>(08) START A PROJECT // INTAKE & DIRECT LINE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Let's build technology that{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue via-brand-cyan to-brand-purple">
              moves your business forward.
            </span>
          </h2>
          <p className="mt-4 text-base text-navy-muted leading-relaxed">
            Fill out the project scope below to receive a direct technical response and feasibility roadmap within 48 hours.
          </p>
        </div>

        {/* Form and Contact Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Form Container (7 cols) */}
          <div className="lg:col-span-7 glass-panel-elevated rounded-2xl p-6 sm:p-8 border border-brand-blue/30 relative">
            <AnimatePresence>
              {isSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-16 text-center space-y-4"
                >
                  <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto shadow-glow">
                    <CheckCircle2 size={32} />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Project Inquiry Received</h3>
                  <p className="text-sm text-navy-muted max-w-md mx-auto leading-relaxed">
                    Thank you for contacting Optenary. Our engineering team has received your submission and will review your technical specifications. You will receive an initial response within 24 to 48 hours.
                  </p>
                  <button
                    onClick={() => setIsSuccess(false)}
                    className="px-6 py-2.5 rounded-xl bg-navy-card hover:bg-navy-cardHover border border-navy-border text-xs font-mono text-white transition-colors"
                  >
                    Submit Another Inquiry
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-navy-muted uppercase mb-1.5">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g. Rahul Sharma"
                        className="w-full px-4 py-3 rounded-xl bg-navy-card border border-navy-border focus:border-brand-cyan focus:outline-none text-sm text-white placeholder-navy-muted/50 transition-colors font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-navy-muted uppercase mb-1.5">
                        Business Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="e.g. rahul@company.com"
                        className="w-full px-4 py-3 rounded-xl bg-navy-card border border-navy-border focus:border-brand-cyan focus:outline-none text-sm text-white placeholder-navy-muted/50 transition-colors font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-navy-muted uppercase mb-1.5">
                      Phone / WhatsApp Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                      className="w-full px-4 py-3 rounded-xl bg-navy-card border border-navy-border focus:border-brand-cyan focus:outline-none text-sm text-white placeholder-navy-muted/50 transition-colors font-mono"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-navy-muted uppercase mb-1.5">
                        Primary Service Needed *
                      </label>
                      <select
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-navy-card border border-navy-border focus:border-brand-cyan focus:outline-none text-xs text-white transition-colors font-mono"
                      >
                        <option value="">Select Service Domain</option>
                        {servicesList.map(s => (
                          <option key={s} value={s} className="bg-[#040818] text-white">
                            {s}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-navy-muted uppercase mb-1.5">
                        Industry / Category *
                      </label>
                      <select
                        name="industry"
                        value={formData.industry}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-navy-card border border-navy-border focus:border-brand-cyan focus:outline-none text-xs text-white transition-colors font-mono"
                      >
                        <option value="">Select Industry</option>
                        {industriesList.map(ind => (
                          <option key={ind} value={ind} className="bg-[#040818] text-white">
                            {ind}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-navy-muted uppercase mb-1.5">
                      Project Objective & Timeline
                    </label>
                    <textarea
                      name="desc"
                      rows={4}
                      value={formData.desc}
                      onChange={handleChange}
                      placeholder="Briefly describe what you're building, target launch dates, or key technical challenges..."
                      className="w-full px-4 py-3 rounded-xl bg-navy-card border border-navy-border focus:border-brand-cyan focus:outline-none text-sm text-white placeholder-navy-muted/50 transition-colors font-mono resize-none"
                    />
                  </div>

                  {/* Agree Checkbox */}
                  <div className="flex items-start gap-2.5 pt-1">
                    <input
                      type="checkbox"
                      id="agree"
                      checked={formData.agree}
                      onChange={handleCheckboxChange}
                      className="mt-1 rounded bg-navy-card border-navy-border text-brand-blue focus:ring-0 cursor-pointer"
                    />
                    <label htmlFor="agree" className="text-xs text-navy-muted leading-relaxed cursor-pointer select-none">
                      I agree to Optenary's <a href="/privacy-policy" className="text-brand-cyan hover:underline">Privacy Policy</a> and <a href="/terms-of-service" className="text-brand-cyan hover:underline">Terms of Service</a>. Your contact information is never shared or sold.
                    </label>
                  </div>

                  {error && (
                    <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-mono flex items-center gap-2">
                      <AlertCircle size={14} className="shrink-0" />
                      <span>{error}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-brand-blue to-brand-cyan hover:from-blue-600 hover:to-cyan-500 text-white font-bold uppercase tracking-wider text-xs font-mono flex items-center justify-center gap-2 shadow-glow-cyan transition-all disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Transmitting Telemetry...</span>
                    ) : (
                      <>
                        <span>Submit Project Inquiry</span>
                        <Send size={14} />
                      </>
                    )}
                  </button>
                </form>
              )}
            </AnimatePresence>
          </div>

          {/* Right Column: Direct Channels (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Direct Line Card */}
            <div className="glass-panel rounded-2xl p-6 sm:p-7 border border-navy-border space-y-6">
              <h3 className="text-lg font-bold text-white font-mono flex items-center gap-2">
                <Sparkles size={16} className="text-brand-cyan" />
                <span>Direct Studio Channels</span>
              </h3>

              <div className="space-y-4">
                {/* Phone */}
                <a
                  href="tel:+919316688014"
                  className="flex items-center gap-4 p-4 rounded-xl bg-navy-card hover:bg-navy-cardHover border border-navy-border hover:border-brand-blue/40 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg bg-navy-base border border-navy-border flex items-center justify-center text-brand-blue group-hover:text-brand-cyan transition-colors shrink-0">
                    <Phone size={18} />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-navy-muted uppercase block">Call Direct</span>
                    <span className="text-sm font-bold text-white font-mono">+91 9316688014</span>
                  </div>
                </a>

                {/* WhatsApp */}
                <a
                  href="https://wa.me/919316688014"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 transition-colors shrink-0">
                    <MessageSquare size={18} />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-emerald-400 uppercase block font-bold">Fastest Response</span>
                    <span className="text-sm font-bold text-white font-mono">Chat on WhatsApp</span>
                  </div>
                </a>

                {/* Email */}
                <a
                  href="mailto:info@optenary.in"
                  className="flex items-center gap-4 p-4 rounded-xl bg-navy-card hover:bg-navy-cardHover border border-navy-border hover:border-brand-purple/40 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg bg-navy-base border border-navy-border flex items-center justify-center text-brand-purple group-hover:text-white transition-colors shrink-0">
                    <Mail size={18} />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-navy-muted uppercase block">Official Email</span>
                    <span className="text-sm font-bold text-white font-mono">info@optenary.in</span>
                  </div>
                </a>
              </div>
            </div>

            {/* Studio Guarantee Badge */}
            <div className="p-5 rounded-2xl bg-navy-card/60 border border-navy-border/70 text-xs font-mono text-navy-muted space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <Shield size={14} className="text-brand-cyan" />
                <span>Zero Sales Fluff Guarantee</span>
              </div>
              <p className="leading-relaxed">
                You will be connected directly with our product engineering team to discuss technical architecture, real feasibility, and milestones.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
