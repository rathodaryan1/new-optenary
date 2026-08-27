import { motion } from 'framer-motion';
import { BrandLogo } from './BrandLogos';

export default function Integrations() {
  const row1 = [
    { name: "Stripe", color: "#635bff", slug: "stripe" },
    { name: "Razorpay", color: "#0b72e7", slug: "razorpay" },
    { name: "PayPal", color: "#003087", slug: "paypal" },
    { name: "WhatsApp API", color: "#25d366", slug: "whatsapp" },
    { name: "Twilio", color: "#f22f46", slug: "twilio" },
    { name: "OpenAI", color: "#10a37f", slug: "openai/ffffff" },
    { name: "Gemini", color: "#1a73e8", slug: "googlegemini" },
    { name: "PhonePe", color: "#5f259f", slug: "phonepe" },
    { name: "Firebase", color: "#ffca28", slug: "firebase" },
    { name: "Google Analytics", color: "#e37400", slug: "googleanalytics" },
    { name: "Sentry", color: "#362d59", slug: "sentry" },
    { name: "HubSpot", color: "#ff7a59", slug: "hubspot" }
  ];

  const row2 = [
    { name: "Salesforce", color: "#00a1e0", slug: "salesforce" },
    { name: "Cloudflare", color: "#f38020", slug: "cloudflare" },
    { name: "Google Maps", color: "#4285f4", slug: "googlemaps" },
    { name: "Meta Platforms", color: "#0668e1", slug: "meta" },
    { name: "Shiprocket", color: "#772288" }, // fallback
    { name: "Apple App Store", color: "#007aff", slug: "apple/ffffff" },
    { name: "Google Play Store", color: "#607d8b", slug: "googleplay" },
    { name: "n8n", color: "#ff6d5a", slug: "n8n/ffffff" },
    { name: "Zoom", color: "#2d8cff", slug: "zoom" },
    { name: "Strapi", color: "#4945ff", slug: "strapi" }
  ];

  return (
    <section id="integrations" className="bg-[#050607] py-24 px-6 md:px-12 relative overflow-hidden">
      
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-brand-orange/5 blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="px-3 py-1 rounded-full bg-brand-orange/10 border border-brand-orange/20 text-brand-orange text-xs font-semibold uppercase tracking-wider"
          >
            Integrations
          </motion.span>
          
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-extrabold text-white mt-4 mb-4 max-w-3xl mx-auto"
          >
            Plug into the tools your <span className="text-brand-orange">business already runs on</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-dark-muted max-w-2xl mx-auto text-base md:text-lg"
          >
            We integrate with 42+ leading platforms across payments, AI, communication, analytics, CRM, and more.
          </motion.p>
        </div>

        {/* Double Track Marquees */}
        <div className="flex flex-col gap-6 relative z-10 w-full overflow-hidden">
          
          {/* Row 1 - Forward */}
          <div className="flex w-max select-none">
            <div className="animate-marquee-forward flex items-center gap-6 pr-6">
              {row1.map((item, i) => (
                <div key={i} className="flex items-center gap-3 px-5 py-3.5 rounded-xl bg-dark-card/60 border border-dark-border hover:border-brand-orange/30 transition-colors shrink-0 shadow-glow">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-white text-xs border border-dark-border/40 bg-dark-bg/80 shrink-0">
                    {BrandLogo({ name: item.name }) ? (
                      <div className="w-4 h-4 shrink-0 flex items-center justify-center">
                        <BrandLogo name={item.name} className="w-4 h-4" />
                      </div>
                    ) : item.slug ? (
                      <img 
                        src={`https://cdn.simpleicons.org/${item.slug}`} 
                        alt={item.name} 
                        className="w-4 h-4 object-contain"
                        loading="lazy"
                      decoding="async" />
                    ) : (
                      <span style={{ color: item.color }}>{item.name[0]}</span>
                    )}
                  </div>
                  <span className="text-sm font-semibold text-white/90">{item.name}</span>
                </div>
              ))}
            </div>
            {/* Duplicate for loop */}
            <div className="animate-marquee-forward flex items-center gap-6 pr-6" aria-hidden="true">
              {row1.map((item, i) => (
                <div key={`dup1-${i}`} className="flex items-center gap-3 px-5 py-3.5 rounded-xl bg-dark-card/60 border border-dark-border hover:border-brand-orange/30 transition-colors shrink-0 shadow-glow">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-white text-xs border border-dark-border/40 bg-dark-bg/80 shrink-0">
                    {BrandLogo({ name: item.name }) ? (
                      <div className="w-4 h-4 shrink-0 flex items-center justify-center">
                        <BrandLogo name={item.name} className="w-4 h-4" />
                      </div>
                    ) : item.slug ? (
                      <img 
                        src={`https://cdn.simpleicons.org/${item.slug}`} 
                        alt={item.name} 
                        className="w-4 h-4 object-contain"
                        loading="lazy"
                      decoding="async" />
                    ) : (
                      <span style={{ color: item.color }}>{item.name[0]}</span>
                    )}
                  </div>
                  <span className="text-sm font-semibold text-white/90">{item.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Row 2 - Reverse */}
          <div className="flex w-max select-none">
            <div className="animate-marquee-reverse flex items-center gap-6 pr-6">
              {row2.map((item, i) => (
                <div key={i} className="flex items-center gap-3 px-5 py-3.5 rounded-xl bg-dark-card/60 border border-dark-border hover:border-brand-orange/30 transition-colors shrink-0 shadow-glow">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-white text-xs border border-dark-border/40 bg-dark-bg/80 shrink-0">
                    {BrandLogo({ name: item.name }) ? (
                      <div className="w-4 h-4 shrink-0 flex items-center justify-center">
                        <BrandLogo name={item.name} className="w-4 h-4" />
                      </div>
                    ) : item.slug ? (
                      <img 
                        src={`https://cdn.simpleicons.org/${item.slug}`} 
                        alt={item.name} 
                        className="w-4 h-4 object-contain"
                        loading="lazy"
                      decoding="async" />
                    ) : (
                      <span style={{ color: item.color }}>{item.name[0]}</span>
                    )}
                  </div>
                  <span className="text-sm font-semibold text-white/90">{item.name}</span>
                </div>
              ))}
            </div>
            {/* Duplicate for loop */}
            <div className="animate-marquee-reverse flex items-center gap-6 pr-6" aria-hidden="true">
              {row2.map((item, i) => (
                <div key={`dup2-${i}`} className="flex items-center gap-3 px-5 py-3.5 rounded-xl bg-dark-card/60 border border-dark-border hover:border-brand-orange/30 transition-colors shrink-0 shadow-glow">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-white text-xs border border-dark-border/40 bg-dark-bg/80 shrink-0">
                    {BrandLogo({ name: item.name }) ? (
                      <div className="w-4 h-4 shrink-0 flex items-center justify-center">
                        <BrandLogo name={item.name} className="w-4 h-4" />
                      </div>
                    ) : item.slug ? (
                      <img 
                        src={`https://cdn.simpleicons.org/${item.slug}`} 
                        alt={item.name} 
                        className="w-4 h-4 object-contain"
                        loading="lazy"
                      decoding="async" />
                    ) : (
                      <span style={{ color: item.color }}>{item.name[0]}</span>
                    )}
                  </div>
                  <span className="text-sm font-semibold text-white/90">{item.name}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
