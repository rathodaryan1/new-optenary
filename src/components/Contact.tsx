import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, Send, Calendar, MessageSquare, Phone, Mail, ArrowRight } from 'lucide-react';

export default function Contact() {
  const services = [
    "Web Application",
    "Mobile Application",
    "Custom Software",
    "Desktop Development",
    "AI Agents & Automation",
    "E-Commerce Development"
  ];

  const industries = [
    "MVP / Startups",
    "Healthcare",
    "Edtech",
    "Fintech",
    "E-commerce",
    "Automobiles",
    "Employee Management Tool",
    "CRM / B2B Portals",
    "Hospitality / Restaurants",
    "Other"
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

    // Validations
    if (!formData.name.trim()) return setError('Please enter your full name');
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) return setError('Please enter a valid email address');
    if (!formData.phone.trim()) return setError('Please enter your phone number');
    if (!formData.service) return setError('Please select a service');
    if (!formData.industry) return setError('Please select an industry');
    if (!formData.agree) return setError('You must agree to the Privacy Policy & Terms');

    setIsSubmitting(true);

    try {
      // Telegram Bot API credentials loaded from environment variables with safe hardcoded fallbacks
      const BOT_TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN || '8967268981:AAGzFp8vjPl3CkWj6krl7ffBs3Pdydhy84A';
      const CHAT_ID = import.meta.env.VITE_TELEGRAM_CHAT_ID || '5704424192';

      const text = `🚀 *New Project Inquiry*
      
*Name:* ${formData.name}
*Email:* ${formData.email}
*Phone:* ${formData.phone}

*Service:* ${formData.service}
*Industry:* ${formData.industry}

*Details:*
${formData.desc || 'No description provided.'}`;

      const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: text,
          parse_mode: 'Markdown',
        }),
      });

      const result = await response.json();

      if (result.ok) {
        setIsSuccess(true);
        setFormData({ name: '', email: '', phone: '', service: '', industry: '', desc: '', agree: false });
      } else {
        setError('Failed to send message. Please try again.');
      }
    } catch {
      setError('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // WhatsApp configuration
  const whatsappUrl = "https://wa.me/919316688014?text=Hi%20Optenary%2C%20I%27d%20like%20to%20discuss%20a%20project%20with%20you.";

  return (
    <section id="contact-us" className="bg-dark-bg py-24 px-6 md:px-12 relative overflow-hidden border-t border-dark-border/40">
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-brand-emerald/5 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[400px] h-[400px] rounded-full bg-brand-purple/5 blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">

        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-brand-emerald text-xs font-bold uppercase tracking-widest block mb-4"
          >
            Start Your Journey
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-extrabold text-white mt-4 mb-4"
          >
            Let's Build Something <span className="text-brand-emerald">Exceptional</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-dark-muted max-w-2xl mx-auto text-sm md:text-base"
          >
            Whether you want to submit a formal request for proposal or schedule an instant discovery call, we are ready.
          </motion.p>
        </div>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Left Column: Premium Intake Form */}
          <div className="lg:col-span-7 rounded-3xl bg-dark-card border border-dark-border/80 p-6 md:p-10 shadow-glow relative overflow-hidden">
            <div className="mb-8">
              <h3 className="text-white font-bold text-lg md:text-xl flex items-center gap-2">
                <MessageSquare className="text-brand-emerald" size={20} />
                <span>Submit a Project Inquiry</span>
              </h3>
              <p className="text-xs text-dark-muted mt-1">Get an estimated proposal and timeline within 24 hours.</p>
            </div>

            <AnimatePresence mode="wait">
              {!isSuccess ? (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-5"
                >
                  {/* Form Errors */}
                  {error && (
                    <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs md:text-sm flex items-center gap-2.5">
                      <AlertCircle size={16} />
                      <span>{error}</span>
                    </div>
                  )}

                  {/* Input Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Full Name */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="name" className="text-[10px] font-bold text-white/90 uppercase tracking-wider">Full Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="e.g. Your Full Name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-dark-bg/60 border border-dark-border/80 focus:border-brand-emerald focus:ring-1 focus:ring-brand-emerald/30 outline-none text-sm text-white transition-all shadow-[0_0_15px_rgba(16,185,129,0.02)]"
                      />
                    </div>

                    {/* Email */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="email" className="text-[10px] font-bold text-white/90 uppercase tracking-wider">Email Address</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="e.g. Your@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-dark-bg/60 border border-dark-border/80 focus:border-brand-emerald focus:ring-1 focus:ring-brand-emerald/30 outline-none text-sm text-white transition-all shadow-[0_0_15px_rgba(16,185,129,0.02)]"
                      />
                    </div>

                    {/* Phone */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="phone" className="text-[10px] font-bold text-white/90 uppercase tracking-wider">Phone Number</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        placeholder="e.g. Your Phone Number"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-dark-bg/60 border border-dark-border/80 focus:border-brand-emerald focus:ring-1 focus:ring-brand-emerald/30 outline-none text-sm text-white transition-all shadow-[0_0_15px_rgba(16,185,129,0.02)]"
                      />
                    </div>

                    {/* Service Selector */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="service" className="text-[10px] font-bold text-white/90 uppercase tracking-wider">Select Service</label>
                      <select
                        id="service"
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-dark-bg/60 border border-dark-border/80 focus:border-brand-emerald focus:ring-1 focus:ring-brand-emerald/30 outline-none text-sm text-white/90 transition-all appearance-none cursor-pointer"
                      >
                        <option value="" disabled className="bg-dark-card">Select a service</option>
                        {services.map((s, idx) => (
                          <option key={idx} value={s} className="bg-dark-card text-white">{s}</option>
                        ))}
                      </select>
                    </div>

                    {/* Industry Selector */}
                    <div className="flex flex-col gap-1.5 md:col-span-2">
                      <label htmlFor="industry" className="text-[10px] font-bold text-white/90 uppercase tracking-wider">Select Industry</label>
                      <select
                        id="industry"
                        name="industry"
                        value={formData.industry}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-dark-bg/60 border border-dark-border/80 focus:border-brand-emerald focus:ring-1 focus:ring-brand-emerald/30 outline-none text-sm text-white/90 transition-all appearance-none cursor-pointer"
                      >
                        <option value="" disabled className="bg-dark-card">Select industry</option>
                        {industries.map((ind, idx) => (
                          <option key={idx} value={ind} className="bg-dark-card text-white">{ind}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Project description */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="desc" className="text-[10px] font-bold text-white/90 uppercase tracking-wider">Project details</label>
                    <textarea
                      id="desc"
                      name="desc"
                      rows={4}
                      placeholder="Tell us about your project requirements, target platforms, and scope..."
                      value={formData.desc}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-dark-bg/60 border border-dark-border/80 focus:border-brand-emerald focus:ring-1 focus:ring-brand-emerald/30 outline-none text-sm text-white transition-all resize-none shadow-[0_0_15px_rgba(16,185,129,0.02)]"
                    />
                  </div>

                  {/* Terms checkbox */}
                  <div className="flex items-center gap-2.5 pt-1">
                    <input
                      type="checkbox"
                      id="agree"
                      checked={formData.agree}
                      onChange={handleCheckboxChange}
                      className="w-4 h-4 accent-brand-emerald bg-dark-bg border border-dark-border rounded cursor-pointer"
                    />
                    <label htmlFor="agree" className="text-xs text-dark-muted cursor-pointer select-none">
                      I agree to the <a href="/privacy-policy" className="text-brand-emerald hover:underline font-semibold">Privacy Policy</a> & <a href="/terms-of-service" className="text-brand-emerald hover:underline font-semibold">Terms of Service</a>
                    </label>
                  </div>

                  {/* Submit Area */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-dark-border/40">
                    <p className="text-[10px] text-dark-muted max-w-sm text-center sm:text-left leading-normal">
                      Note: Form submissions are processed instantly. Career inquiries should be directed to our jobs panel.
                    </p>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-brand-emerald hover:bg-brand-emeraldDark disabled:bg-brand-emerald/50 text-dark-bg font-bold uppercase tracking-wider text-xs transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2 shadow-glow"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="w-3.5 h-3.5 rounded-full border-2 border-white border-t-transparent animate-spin" />
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <span>Submit Request</span>
                          <Send size={11} />
                        </>
                      )}
                    </button>
                  </div>

                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center py-10 flex flex-col items-center justify-center"
                >
                  <div className="w-14 h-14 rounded-full bg-brand-emerald/10 border border-brand-emerald/20 flex items-center justify-center text-brand-emerald mb-6 shadow-glow">
                    <CheckCircle2 size={32} className="animate-pulse" />
                  </div>

                  <h3 className="text-xl md:text-2xl font-extrabold text-white mb-2">
                    Inquiry Received
                  </h3>

                  <p className="text-xs md:text-sm text-dark-muted max-w-xs mb-8">
                    Your details have been securely logged. Our team will follow up via email or phone within 24 hours.
                  </p>

                  <button
                    onClick={() => setIsSuccess(false)}
                    className="px-5 py-2.5 rounded-xl bg-dark-bg border border-dark-border hover:border-brand-emerald text-white text-xs font-bold uppercase tracking-wider transition-colors"
                  >
                    Send another inquiry
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right Column: Cal.com Booking Widget & WhatsApp Connect */}
          <div className="lg:col-span-5 flex flex-col gap-6 w-full">

            {/* Cal.com glassmorphic booking panel */}
            <div className="rounded-3xl bg-dark-card border border-dark-border/80 p-6 md:p-8 shadow-glow flex flex-col h-full">
              <div className="mb-6">
                <h3 className="text-white font-bold text-lg md:text-xl flex items-center gap-2">
                  <Calendar className="text-brand-purple" size={20} />
                  <span>Book Discovery Call</span>
                </h3>
                <p className="text-xs text-dark-muted mt-1">Schedule a 15-minute video consultation directly with us.</p>
              </div>

              {/* High-fidelity Cal.com Embed Simulation / Iframe */}
              <div className="w-full grow aspect-[4/3] min-h-[300px] rounded-2xl bg-dark-bg border border-dark-border/60 overflow-hidden relative">
                <iframe
                  src="https://cal.com/optenary?theme=dark"
                  title="Optenary Cal.com Booking Scheduler"
                  className="w-full h-full border-none"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            </div>

            {/* Quick Connect (WhatsApp, Phone, Email) */}
            <div className="rounded-3xl bg-dark-card border border-dark-border/80 p-6 md:p-8 shadow-glow flex flex-col gap-4">
              <h4 className="text-white font-bold text-sm tracking-wide uppercase">Direct Connections</h4>

              <div className="grid gap-3">
                {/* WhatsApp CTA */}
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 rounded-2xl bg-[#25d366]/5 border border-[#25d366]/20 hover:border-[#25d366]/50 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#25d366]/10 flex items-center justify-center text-[#25d366]">
                      <MessageSquare size={16} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white">Chat on WhatsApp</p>
                      <p className="text-[10px] text-dark-muted">Instant response during business hours</p>
                    </div>
                  </div>
                  <ArrowRight size={14} className="text-dark-muted group-hover:text-white transition-colors" />
                </a>

                {/* Email Direct */}
                <a
                  href="mailto:info@optenary.in"
                  className="flex items-center justify-between p-4 rounded-2xl bg-dark-bg/40 border border-dark-border/60 hover:border-brand-emerald/30 transition-all group"
                 aria-label="Email Optenary">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-brand-emerald/10 flex items-center justify-center text-brand-emerald">
                      <Mail size={16} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white">Email Us Directly</p>
                      <p className="text-[10px] text-dark-muted">info@optenary.in</p>
                    </div>
                  </div>
                  <ArrowRight size={14} className="text-dark-muted group-hover:text-white transition-colors" />
                </a>

                {/* Call Direct */}
                <a
                  href="tel:+919316688014"
                  className="flex items-center justify-between p-4 rounded-2xl bg-dark-bg/40 border border-dark-border/60 hover:border-brand-purple/30 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-brand-purple/10 flex items-center justify-center text-brand-purple">
                      <Phone size={16} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white">Call Office</p>
                      <p className="text-[10px] text-dark-muted">+91 93166 88014</p>
                    </div>
                  </div>
                  <ArrowRight size={14} className="text-dark-muted group-hover:text-white transition-colors" />
                </a>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
