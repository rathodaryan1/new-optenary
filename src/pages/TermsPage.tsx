import { motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SEO from '../components/SEO';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-dark-bg text-white selection:bg-brand-orange selection:text-dark-bg antialiased flex flex-col justify-between">
      <SEO 
        title="Terms of Service"
        description="Review the terms and conditions for engaging with Optenary's custom software development, AI automation, and web/mobile development services."
        keywords="terms of service, optenary terms, engagement contract, intellectual property terms"
        canonicalPath="/terms"
      />
      <Header />
      <main className="flex-grow pt-28 pb-20 px-6 md:px-12 max-w-4xl mx-auto relative z-10 w-full">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl md:text-5xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-brand-orangeLight">Terms of Service</h1>
          <p className="text-xs text-dark-muted mb-8 font-mono uppercase tracking-widest">Last updated: May 2026</p>
          
          <div className="prose prose-invert max-w-none space-y-8">
            <p className="text-dark-muted leading-relaxed text-base md:text-lg">
              Welcome to Optenary. By accessing or using our website and services, you agree to comply with these Terms of Service.
            </p>

            <div className="grid gap-6">
              
              {/* Section 1 */}
              <div className="p-6 rounded-2xl bg-dark-card/30 border border-dark-border/40 backdrop-blur-sm">
                <h2 className="text-lg font-bold text-white mb-3">1. Use of the Website</h2>
                <ul className="list-disc list-inside text-dark-muted space-y-2 text-sm leading-relaxed">
                  <li>You agree to use this website only for lawful purposes.</li>
                  <li>Unauthorized use, copying, or distribution of our content is strictly prohibited.</li>
                </ul>
              </div>

              {/* Section 2 */}
              <div className="p-6 rounded-2xl bg-dark-card/30 border border-dark-border/40 backdrop-blur-sm">
                <h2 className="text-lg font-bold text-white mb-3">2. Services</h2>
                <ul className="list-disc list-inside text-dark-muted space-y-2 text-sm leading-relaxed">
                  <li>Optenary provides AI-powered digital solutions, web development, SaaS platforms, automation systems, software development, and related technology services.</li>
                  <li>All services may be governed by separate agreements or project contracts where applicable.</li>
                </ul>
              </div>

              {/* Section 3 */}
              <div className="p-6 rounded-2xl bg-dark-card/30 border border-dark-border/40 backdrop-blur-sm">
                <h2 className="text-lg font-bold text-white mb-3">3. Contact & Meeting Requests</h2>
                <p className="text-dark-muted text-sm leading-relaxed">
                  By submitting forms on our website, you agree that we may contact you via email, WhatsApp, phone calls, or other communication methods regarding your inquiry or project.
                </p>
              </div>

              {/* Section 4 */}
              <div className="p-6 rounded-2xl bg-dark-card/30 border border-dark-border/40 backdrop-blur-sm">
                <h2 className="text-lg font-bold text-white mb-3">4. Intellectual Property</h2>
                <ul className="list-disc list-inside text-dark-muted space-y-2 text-sm leading-relaxed">
                  <li>All website content, including text, graphics, branding, designs, and software, belongs to Optenary unless otherwise stated.</li>
                  <li>Unauthorized use of our intellectual property is prohibited.</li>
                </ul>
              </div>

              {/* Section 5 */}
              <div className="p-6 rounded-2xl bg-dark-card/30 border border-dark-border/40 backdrop-blur-sm">
                <h2 className="text-lg font-bold text-white mb-3">5. Limitation of Liability</h2>
                <ul className="list-disc list-inside text-dark-muted space-y-2 text-sm leading-relaxed">
                  <li>We strive to provide accurate and reliable information, but we do not guarantee the website will always be error-free or uninterrupted.</li>
                  <li>Optenary is not liable for indirect, incidental, or consequential damages arising from the use of our website or services.</li>
                </ul>
              </div>

              {/* Section 6 */}
              <div className="p-6 rounded-2xl bg-dark-card/30 border border-dark-border/40 backdrop-blur-sm">
                <h2 className="text-lg font-bold text-white mb-3">6. Third-Party Links</h2>
                <p className="text-dark-muted text-sm leading-relaxed">
                  Our website may contain links to external websites or services. We are not responsible for their content, policies, or practices.
                </p>
              </div>

              {/* Section 7 */}
              <div className="p-6 rounded-2xl bg-dark-card/30 border border-dark-border/40 backdrop-blur-sm">
                <h2 className="text-lg font-bold text-white mb-3">7. Updates to Terms</h2>
                <p className="text-dark-muted text-sm leading-relaxed">
                  We may update these Terms of Service at any time. Continued use of our website means you accept the updated terms.
                </p>
              </div>

              {/* Section 8 */}
              <div className="p-6 rounded-2xl bg-dark-card/30 border border-dark-border/40 backdrop-blur-sm">
                <h2 className="text-lg font-bold text-white mb-3">8. Governing Law</h2>
                <p className="text-dark-muted text-sm leading-relaxed">
                  These Terms shall be governed by the laws of India.
                </p>
              </div>

              {/* Section 9 */}
              <div className="p-6 rounded-2xl bg-dark-card/30 border border-dark-border/40 backdrop-blur-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <h2 className="text-lg font-bold text-white mb-1">9. Contact Us</h2>
                  <p className="text-dark-muted text-sm">Location: Gujarat, India</p>
                </div>
                <a 
                  href="mailto:hello@optenary.in" 
                  className="px-5 py-2.5 rounded-xl bg-brand-orange hover:bg-brand-orangeDark text-dark-bg font-bold text-xs uppercase tracking-wider transition-all shadow-glow"
                 aria-label="Email Optenary">
                  hello@optenary.in
                </a>
              </div>

            </div>
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}
