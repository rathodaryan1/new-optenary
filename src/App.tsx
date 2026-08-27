import { useEffect, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, useLocation, useParams } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Analytics } from '@vercel/analytics/react';
import PageTransition from './components/PageTransition';
import PageSkeleton from './components/PageSkeleton';
import HomePage from './pages/HomePage';

const StickyBookCTA = lazy(() => import('./components/StickyBookCTA'));
const CookieConsent = lazy(() => import('./components/CookieConsent'));

// ─── Lazy-loaded pages ────────────────────────────────────────────────────────
const AboutPage                = lazy(() => import('./pages/AboutPage'));
const IntegrationsPage         = lazy(() => import('./pages/IntegrationsPage'));
const WebDevelopmentPage       = lazy(() => import('./pages/WebDevelopmentPage'));
const MobileDevelopmentPage    = lazy(() => import('./pages/MobileDevelopmentPage'));
const CustomSoftwarePage       = lazy(() => import('./pages/CustomSoftwarePage'));
const DesktopDevelopmentPage    = lazy(() => import('./pages/DesktopDevelopmentPage'));
const AIAgentsAutomationPage   = lazy(() => import('./pages/AIAgentsAutomationPage'));
const ShopifyDevelopmentPage   = lazy(() => import('./pages/ShopifyDevelopmentPage'));
const WordPressDevelopmentPage = lazy(() => import('./pages/WordPressDevelopmentPage'));
const CustomEcommercePage      = lazy(() => import('./pages/CustomEcommercePage'));
const ProjectsPage             = lazy(() => import('./pages/ProjectsPage'));
const FAQPage                  = lazy(() => import('./pages/FAQPage'));
const ContactPage              = lazy(() => import('./pages/ContactPage'));
const PrivacyPolicyPage        = lazy(() => import('./pages/PrivacyPolicyPage'));
const TermsPage                = lazy(() => import('./pages/TermsPage'));
const BlogPage                 = lazy(() => import('./pages/BlogPage'));
const NotFoundPage             = lazy(() => import('./pages/NotFoundPage'));
// SEO Landing pages
const WebDevIndiaPage          = lazy(() => import('./pages/seo/WebDevIndiaPage'));
const MobileAppSuratPage       = lazy(() => import('./pages/seo/MobileAppSuratPage'));
const AIAutomationIndiaPage    = lazy(() => import('./pages/seo/AIAutomationIndiaPage'));

// Blog slug wrapper — reads :slug from URL and passes it to BlogPage
function BlogSlugPage() {
  const { slug } = useParams<{ slug: string }>();
  return <_BlogPage slug={slug} />;
}
const _BlogPage = lazy(() => import('./pages/BlogPage'));

// ─── Scroll helper ────────────────────────────────────────────────────────────
function ScrollToHash() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        const timer = setTimeout(() => element.scrollIntoView({ behavior: 'smooth' }), 100);
        return () => clearTimeout(timer);
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [pathname, hash]);
  return null;
}

// ─── Animated Routes (page transitions) ──────────────────────────────────────
function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait" initial={false}>
      <Suspense fallback={<PageSkeleton />}>
        <Routes location={location} key={location.pathname}>
          {/* Home */}
          <Route path="/"     element={<PageTransition><HomePage /></PageTransition>} />
          <Route path="/home" element={<PageTransition><HomePage /></PageTransition>} />

          {/* Core pages */}
          <Route path="/about"        element={<PageTransition><AboutPage /></PageTransition>} />
          <Route path="/projects"     element={<PageTransition><ProjectsPage /></PageTransition>} />
          <Route path="/integrations" element={<PageTransition><IntegrationsPage /></PageTransition>} />
          <Route path="/faq"          element={<PageTransition><FAQPage /></PageTransition>} />
          <Route path="/contact"      element={<PageTransition><ContactPage /></PageTransition>} />
          {/* Blog */}
          <Route path="/blog"          element={<PageTransition><BlogPage /></PageTransition>} />
          <Route path="/blog/:slug"    element={<PageTransition><BlogSlugPage /></PageTransition>} />

          {/* Legal */}
          <Route path="/privacy-policy"   element={<PageTransition><PrivacyPolicyPage /></PageTransition>} />
          <Route path="/terms-of-service" element={<PageTransition><TermsPage /></PageTransition>} />

          {/* Services */}
          <Route path="/services/web-development"              element={<PageTransition><WebDevelopmentPage /></PageTransition>} />
          <Route path="/services/mobile-development"           element={<PageTransition><MobileDevelopmentPage /></PageTransition>} />
          <Route path="/services/custom-software"              element={<PageTransition><CustomSoftwarePage /></PageTransition>} />
          <Route path="/services/desktop-development"             element={<PageTransition><DesktopDevelopmentPage /></PageTransition>} />
          <Route path="/services/ai-agents-automation"         element={<PageTransition><AIAgentsAutomationPage /></PageTransition>} />
          <Route path="/services/shopify-development"          element={<PageTransition><ShopifyDevelopmentPage /></PageTransition>} />
          <Route path="/services/wordpress-development"        element={<PageTransition><WordPressDevelopmentPage /></PageTransition>} />
          <Route path="/services/custom-ecommerce-development" element={<PageTransition><CustomEcommercePage /></PageTransition>} />

          {/* Local SEO pages */}
          <Route path="/web-development-company-india" element={<PageTransition><WebDevIndiaPage /></PageTransition>} />
          <Route path="/mobile-app-developer-surat"    element={<PageTransition><MobileAppSuratPage /></PageTransition>} />
          <Route path="/ai-automation-agency-india"    element={<PageTransition><AIAutomationIndiaPage /></PageTransition>} />

          {/* 404 */}
          <Route path="*" element={<PageTransition><NotFoundPage /></PageTransition>} />
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────
function App() {
  return (
    <BrowserRouter>
      {/* Vercel Analytics */}
      <Analytics />

      {/* Scroll restoration */}
      <ScrollToHash />

      {/* Animated route transitions */}
      <AnimatedRoutes />

      {/* Global floating UI */}
      <Suspense fallback={null}>
        <StickyBookCTA />
        <CookieConsent />
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
