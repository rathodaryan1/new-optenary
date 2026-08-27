import { motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SEO from '../components/SEO';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-dark-bg text-white selection:bg-brand-orange selection:text-dark-bg antialiased flex flex-col justify-between">
      <SEO 
        title="Privacy Policy"
        description="Learn how Optenary collects, processes, and protects your personal information and project data."
        keywords="privacy policy, data protection, optenary privacy, compliance"
        canonicalPath="/privacy-policy"
      />
      <Header />
      <main className="flex-grow pt-28 pb-20 px-6 md:px-12 max-w-4xl mx-auto relative z-10 w-full">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl md:text-5xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-brand-orangeLight">Privacy Policy</h1>
          <p className="text-xs text-dark-muted mb-8 font-mono uppercase tracking-widest">Last updated: May 2026</p>
          
          <div className="prose prose-invert max-w-none space-y-8">
            <p className="text-dark-muted leading-relaxed text-base md:text-lg">
              At Optenary, we value your privacy and are committed to protecting your personal information.
            </p>

            <div className="grid gap-6">
              
              {/* Section 1 */}
              <div className="p-6 rounded-2xl bg-dark-card/30 border border-dark-border/40 backdrop-blur-sm">
                <h2 className="text-lg font-bold text-white mb-3">1. Information We Collect</h2>
                <ul className="list-disc list-inside text-dark-muted space-y-2 text-sm leading-relaxed">
                  <li>Name, email address, phone number, and project details submitted through forms or communications.</li>
                  <li>Technical information such as browser type, device information, and usage analytics collected through cookies or similar technologies.</li>
                </ul>
              </div>

              {/* Section 2 */}
              <div className="p-6 rounded-2xl bg-dark-card/30 border border-dark-border/40 backdrop-blur-sm">
                <h2 className="text-lg font-bold text-white mb-3">2. How We Use Your Information</h2>
                <ul className="list-disc list-inside text-dark-muted space-y-2 text-sm leading-relaxed">
                  <li>To respond to inquiries and provide our services.</li>
                  <li>To communicate project updates, schedules, and important notifications.</li>
                  <li>To improve our website, services, and user experience.</li>
                  <li>To send confirmations, updates, or follow-ups via email or WhatsApp.</li>
                </ul>
              </div>

              {/* Section 3 */}
              <div className="p-6 rounded-2xl bg-dark-card/30 border border-dark-border/40 backdrop-blur-sm">
                <h2 className="text-lg font-bold text-white mb-3">3. Sharing of Information</h2>
                <ul className="list-disc list-inside text-dark-muted space-y-2 text-sm leading-relaxed">
                  <li>We do not sell or rent your personal information.</li>
                  <li>Information may be shared with trusted partners or service providers only when necessary to operate our services.</li>
                </ul>
              </div>

              {/* Section 4 */}
              <div className="p-6 rounded-2xl bg-dark-card/30 border border-dark-border/40 backdrop-blur-sm">
                <h2 className="text-lg font-bold text-white mb-3">4. Cookies & Analytics</h2>
                <p className="text-dark-muted text-sm leading-relaxed">
                  Our website may use cookies and analytics tools to enhance user experience and monitor website performance.
                </p>
              </div>

              {/* Section 5 */}
              <div className="p-6 rounded-2xl bg-dark-card/30 border border-dark-border/40 backdrop-blur-sm">
                <h2 className="text-lg font-bold text-white mb-3">5. Data Security</h2>
                <p className="text-dark-muted text-sm leading-relaxed">
                  We implement reasonable security measures to protect your information from unauthorized access or misuse.
                </p>
              </div>

              {/* Section 6 */}
              <div className="p-6 rounded-2xl bg-dark-card/30 border border-dark-border/40 backdrop-blur-sm">
                <h2 className="text-lg font-bold text-white mb-3">6. Your Rights</h2>
                <p className="text-dark-muted text-sm leading-relaxed">
                  You may request access, correction, or deletion of your personal information by contacting us.
                </p>
              </div>

              {/* Section 7 */}
              <div className="p-6 rounded-2xl bg-dark-card/30 border border-dark-border/40 backdrop-blur-sm">
                <h2 className="text-lg font-bold text-white mb-3">7. Third-Party Services</h2>
                <p className="text-dark-muted text-sm leading-relaxed">
                  Our website may contain links or integrations with third-party services. We are not responsible for their policies or practices.
                </p>
              </div>

              {/* Section 8 */}
              <div className="p-6 rounded-2xl bg-dark-card/30 border border-dark-border/40 backdrop-blur-sm">
                <h2 className="text-lg font-bold text-white mb-3">8. Updates to This Policy</h2>
                <p className="text-dark-muted text-sm leading-relaxed">
                  We may update this Privacy Policy periodically. Changes will be reflected on this page.
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
