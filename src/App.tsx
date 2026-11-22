import { useEffect, Suspense } from 'react';
import { BrowserRouter, Routes, Route, useLocation, useParams } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Analytics } from '@vercel/analytics/react';
import PageTransition from './components/PageTransition';
import PageSkeleton from './components/PageSkeleton';
import HomePage from './pages/HomePage';

import ErrorBoundary from './components/ErrorBoundary';
import RwPageTrans from './components/reachwise/RwPageTrans';
import OptenaryCursor from './components/reachwise/OptenaryCursor';
import { lazyWithRetry } from './utils/lazyWithRetry';
import { AuthProvider } from './platform/auth/AuthContext';
import { RequireAdminOrTeam, RequireClient } from './platform/auth/RouteGuards';
import { PlatformProvider } from './platform/platformContext';

// ─── Lazy-loaded pages ────────────────────────────────────────────────────────
const ServicesPage             = lazyWithRetry(() => import('./pages/ServicesPage'));
const ServiceDetailPage       = lazyWithRetry(() => import('./pages/ServiceDetailPage'));
const PricingPage              = lazyWithRetry(() => import('./pages/PricingPage'));
const AboutPage                = lazyWithRetry(() => import('./pages/AboutPage'));
const IntegrationsPage         = lazyWithRetry(() => import('./pages/IntegrationsPage'));
const WorkPage                  = lazyWithRetry(() => import('./pages/WorkPage'));
const MehtaDairyCaseStudyPage  = lazyWithRetry(() => import('./pages/MehtaDairyCaseStudyPage'));
const FAQPage                  = lazyWithRetry(() => import('./pages/FAQPage'));
const ContactPage              = lazyWithRetry(() => import('./pages/ContactPage'));
const PrivacyPolicyPage        = lazyWithRetry(() => import('./pages/PrivacyPolicyPage'));
const TermsPage                = lazyWithRetry(() => import('./pages/TermsPage'));
const BlogPage                 = lazyWithRetry(() => import('./pages/BlogPage'));
const NotFoundPage             = lazyWithRetry(() => import('./pages/NotFoundPage'));
// SEO Landing pages
const WebDevIndiaPage          = lazyWithRetry(() => import('./pages/seo/WebDevIndiaPage'));
const MobileAppSuratPage       = lazyWithRetry(() => import('./pages/seo/MobileAppSuratPage'));
const AIAutomationIndiaPage    = lazyWithRetry(() => import('./pages/seo/AIAutomationIndiaPage'));

// Optenary Operations Platform
const LoginPage                = lazyWithRetry(() => import('./platform/pages/LoginPage'));
const ClientPortalPage         = lazyWithRetry(() => import('./platform/pages/ClientPortalPage'));
const ClientOnboardingPage     = lazyWithRetry(() => import('./platform/pages/ClientOnboardingPage'));
const AdminDashboardPage       = lazyWithRetry(() => import('./platform/pages/AdminDashboardPage'));
const AdminProjectsPage        = lazyWithRetry(() => import('./platform/pages/AdminProjectsPage'));
const AdminClientsPage         = lazyWithRetry(() => import('./platform/pages/AdminClientsPage'));
const AdminLeadsCrmPage        = lazyWithRetry(() => import('./platform/pages/AdminLeadsCrmPage'));
const AdminTasksPage           = lazyWithRetry(() => import('./platform/pages/AdminTasksPage'));
const AdminTeamPage            = lazyWithRetry(() => import('./platform/pages/AdminTeamPage'));
const AdminUpdatesPage         = lazyWithRetry(() => import('./platform/pages/AdminUpdatesPage'));
const AdminFilesPage           = lazyWithRetry(() => import('./platform/pages/AdminFilesPage'));
const AdminAnalyticsPage       = lazyWithRetry(() => import('./platform/pages/AdminAnalyticsPage'));
const AdminSettingsPage        = lazyWithRetry(() => import('./platform/pages/AdminSettingsPage'));

// Blog slug wrapper — reads :slug from URL and passes it to BlogPage
function BlogSlugPage() {
  const { slug } = useParams<{ slug: string }>();
  return <_BlogPage slug={slug} />;
}
const _BlogPage = lazyWithRetry(() => import('./pages/BlogPage'));

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
          <Route path="/services"             element={<PageTransition><ServicesPage /></PageTransition>} />
          <Route path="/work"                 element={<PageTransition><WorkPage /></PageTransition>} />
          <Route path="/work/mehta-dairy"     element={<PageTransition><MehtaDairyCaseStudyPage /></PageTransition>} />
          <Route path="/about"                element={<PageTransition><AboutPage /></PageTransition>} />
          <Route path="/pricing"              element={<PageTransition><PricingPage /></PageTransition>} />
          <Route path="/projects"             element={<PageTransition><WorkPage /></PageTransition>} />
          <Route path="/projects/mehta-dairy" element={<PageTransition><MehtaDairyCaseStudyPage /></PageTransition>} />
          <Route path="/integrations"         element={<PageTransition><IntegrationsPage /></PageTransition>} />
          <Route path="/faq"          element={<PageTransition><FAQPage /></PageTransition>} />
          <Route path="/contact"      element={<PageTransition><ContactPage /></PageTransition>} />
          {/* Blog */}
          <Route path="/blog"          element={<PageTransition><BlogPage /></PageTransition>} />
          <Route path="/blog/:slug"    element={<PageTransition><BlogSlugPage /></PageTransition>} />

          {/* Legal */}
          <Route path="/privacy-policy"   element={<PageTransition><PrivacyPolicyPage /></PageTransition>} />
          <Route path="/terms-of-service" element={<PageTransition><TermsPage /></PageTransition>} />

          {/* Services */}
          <Route path="/services"                              element={<PageTransition><ServicesPage /></PageTransition>} />
          <Route path="/services/web-development"              element={<PageTransition><ServiceDetailPage forcedSlug="web-development" /></PageTransition>} />
          <Route path="/services/mobile-development"           element={<PageTransition><ServiceDetailPage forcedSlug="mobile-development" /></PageTransition>} />
          <Route path="/services/custom-software"              element={<PageTransition><ServiceDetailPage forcedSlug="custom-software" /></PageTransition>} />
          <Route path="/services/desktop-development"          element={<PageTransition><ServiceDetailPage forcedSlug="desktop-development" /></PageTransition>} />
          <Route path="/services/ai-agents-automation"         element={<PageTransition><ServiceDetailPage forcedSlug="ai-agents-automation" /></PageTransition>} />
          <Route path="/services/shopify-development"          element={<PageTransition><ServiceDetailPage forcedSlug="shopify-development" /></PageTransition>} />
          <Route path="/services/wordpress-development"        element={<PageTransition><ServiceDetailPage forcedSlug="wordpress-development" /></PageTransition>} />
          <Route path="/services/custom-ecommerce"             element={<PageTransition><ServiceDetailPage forcedSlug="custom-ecommerce" /></PageTransition>} />
          <Route path="/services/custom-ecommerce-development" element={<PageTransition><ServiceDetailPage forcedSlug="custom-ecommerce" /></PageTransition>} />
          <Route path="/services/web-design"                   element={<PageTransition><ServiceDetailPage forcedSlug="web-design" /></PageTransition>} />
          <Route path="/services/seo"                          element={<PageTransition><ServiceDetailPage forcedSlug="web-development" /></PageTransition>} />
          <Route path="/services/social-media"                 element={<PageTransition><ServiceDetailPage forcedSlug="mobile-development" /></PageTransition>} />
          <Route path="/services/paid-ads"                     element={<PageTransition><ServiceDetailPage forcedSlug="ai-agents-automation" /></PageTransition>} />
          <Route path="/services/content"                      element={<PageTransition><ServiceDetailPage forcedSlug="web-design" /></PageTransition>} />
          <Route path="/services/branding"                     element={<PageTransition><ServiceDetailPage forcedSlug="web-design" /></PageTransition>} />
          <Route path="/services/:slug"                         element={<PageTransition><ServiceDetailPage /></PageTransition>} />

          {/* Local SEO pages */}
          <Route path="/web-development-company-india" element={<PageTransition><WebDevIndiaPage /></PageTransition>} />
          <Route path="/mobile-app-developer-surat"    element={<PageTransition><MobileAppSuratPage /></PageTransition>} />
          <Route path="/ai-automation-agency-india"    element={<PageTransition><AIAutomationIndiaPage /></PageTransition>} />

          {/* Auth */}
          <Route path="/login" element={<PageTransition><LoginPage /></PageTransition>} />

          {/* Client Portal & Onboarding */}
          <Route path="/portal"            element={<RequireClient><PageTransition><ClientPortalPage /></PageTransition></RequireClient>} />
          <Route path="/portal/onboarding" element={<PageTransition><ClientOnboardingPage /></PageTransition>} />
          <Route path="/onboarding"        element={<PageTransition><ClientOnboardingPage /></PageTransition>} />

          {/* Admin Operations Platform (Protected by RequireAdminOrTeam) */}
          <Route path="/admin"             element={<RequireAdminOrTeam><PageTransition><AdminDashboardPage /></PageTransition></RequireAdminOrTeam>} />
          <Route path="/admin/leads"       element={<RequireAdminOrTeam><PageTransition><AdminLeadsCrmPage /></PageTransition></RequireAdminOrTeam>} />
          <Route path="/admin/crm"         element={<RequireAdminOrTeam><PageTransition><AdminLeadsCrmPage /></PageTransition></RequireAdminOrTeam>} />
          <Route path="/admin/clients"     element={<RequireAdminOrTeam><PageTransition><AdminClientsPage /></PageTransition></RequireAdminOrTeam>} />
          <Route path="/admin/projects"    element={<RequireAdminOrTeam><PageTransition><AdminProjectsPage /></PageTransition></RequireAdminOrTeam>} />
          <Route path="/admin/tasks"       element={<RequireAdminOrTeam><PageTransition><AdminTasksPage /></PageTransition></RequireAdminOrTeam>} />
          <Route path="/admin/team"        element={<RequireAdminOrTeam><PageTransition><AdminTeamPage /></PageTransition></RequireAdminOrTeam>} />
          <Route path="/admin/updates"     element={<RequireAdminOrTeam><PageTransition><AdminUpdatesPage /></PageTransition></RequireAdminOrTeam>} />
          <Route path="/admin/files"       element={<RequireAdminOrTeam><PageTransition><AdminFilesPage /></PageTransition></RequireAdminOrTeam>} />
          <Route path="/admin/analytics"   element={<RequireAdminOrTeam><PageTransition><AdminAnalyticsPage /></PageTransition></RequireAdminOrTeam>} />
          <Route path="/admin/settings"    element={<RequireAdminOrTeam><PageTransition><AdminSettingsPage /></PageTransition></RequireAdminOrTeam>} />

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
    <ErrorBoundary>
      <BrowserRouter>
        <AuthProvider>
          <PlatformProvider>
            <RwPageTrans>
              {/* Vercel Analytics */}
              <Analytics />

              {/* Scroll restoration */}
              <ScrollToHash />

              {/* Interactive signature cursor for mobile & desktop */}
              <OptenaryCursor />

              {/* Animated route transitions */}
              <AnimatedRoutes />
            </RwPageTrans>
          </PlatformProvider>
        </AuthProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
