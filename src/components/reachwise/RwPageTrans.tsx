import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  useCallback,
  type ReactNode,
} from 'react';
import { useNavigate } from 'react-router-dom';
import './reachwise.css';

interface PageTransContextValue {
  triggerTransition: (to: string, title?: string, origin?: { x: number; y: number }) => void;
  isTransitioning: boolean;
  pageName: string;
  pageRoute: string;
}

const PageTransContext = createContext<PageTransContextValue>({
  triggerTransition: () => { },
  isTransitioning: false,
  pageName: 'Home',
  pageRoute: '/home',
});

export const usePageTransition = () => useContext(PageTransContext);

// Preload route chunks eagerly on hover or transition trigger
const ROUTE_PRELOADERS: Record<string, () => Promise<any>> = {
  '/services': () => import('../../pages/ServicesPage'),
  '/work': () => import('../../pages/WorkPage'),
  '/pricing': () => import('../../pages/PricingPage'),
  '/about': () => import('../../pages/AboutPage'),
  '/contact': () => import('../../pages/ContactPage'),
  '/blog': () => import('../../pages/BlogPage'),
  '/faq': () => import('../../pages/FAQPage'),
  '/terms-of-service': () => import('../../pages/TermsPage'),
  '/privacy-policy': () => import('../../pages/PrivacyPolicyPage'),
};

export function preloadRoute(to: string) {
  try {
    const [path] = to.split('#');
    const clean = path.toLowerCase().replace(/\/$/, '') || '/';
    if (ROUTE_PRELOADERS[clean]) {
      ROUTE_PRELOADERS[clean]();
    } else if (clean.startsWith('/services/')) {
      import('../../pages/ServiceDetailPage');
    } else if (clean.startsWith('/blog/')) {
      import('../../pages/BlogPage');
    } else if (clean.startsWith('/work/') || clean.startsWith('/projects/')) {
      import('../../pages/MehtaDairyCaseStudyPage');
    }
  } catch { }
}

// Maps a route or href to the exact slug shown in the capsule (e.g. /work, /services, /pricing)
export function resolveTransitionRoute(href: string): string {
  let pathname = href;
  let hash = '';
  try {
    const url = new URL(href, window.location.origin);
    pathname = url.pathname;
    hash = url.hash;
  } catch {
    if (href.startsWith('#')) {
      hash = href;
      pathname = window.location.pathname;
    }
  }

  const cleanHash = hash.replace(/^#/, '').toLowerCase();
  if (cleanHash) {
    if (cleanHash.includes('work') || cleanHash.includes('case-stud') || cleanHash === 'projects') return '/work';
    if (cleanHash.includes('service') || cleanHash.includes('channel')) return '/services';
    if (cleanHash.includes('pricing') || cleanHash.includes('plan')) return '/pricing';
    if (cleanHash.includes('about')) return '/about';
    if (cleanHash.includes('contact') || cleanHash.includes('audit')) return '/contact';
    if (cleanHash.includes('client') || cleanHash.includes('radar')) return '/clients';
    if (cleanHash.includes('review') || cleanHash.includes('testim')) return '/reviews';
    if (cleanHash.includes('team') || cleanHash.includes('specialist')) return '/team';
    if (cleanHash.includes('faq')) return '/faq';
    if (cleanHash.includes('number') || cleanHash.includes('report') || cleanHash.includes('kpi')) return '/capabilities';
    if (cleanHash.includes('feed') || cleanHash.includes('social')) return '/insights';
    if (cleanHash.includes('funnel') || cleanHash.includes('how-we-work')) return '/process';
    if (cleanHash.includes('journal') || cleanHash.includes('blog')) return '/blog';
  }

  const cleanPath = pathname.toLowerCase().replace(/\/$/, '') || '/';
  if (cleanPath === '/' || cleanPath === '/home') return '/home';
  if (cleanPath === '/services') return '/services';
  if (cleanPath === '/work' || cleanPath === '/projects') return '/work';
  if (cleanPath === '/pricing') return '/pricing';
  if (cleanPath === '/about') return '/about';
  if (cleanPath === '/contact') return '/contact';
  if (cleanPath === '/blog') return '/blog';
  if (cleanPath === '/faq') return '/faq';
  if (cleanPath === '/terms-of-service') return '/terms';
  if (cleanPath === '/privacy-policy') return '/privacy';
  if (cleanPath === '/portal') return '/portal';
  if (cleanPath === '/portal/onboarding' || cleanPath === '/onboarding') return '/onboarding';
  if (cleanPath === '/login') return '/login';
  if (cleanPath === '/admin') return '/admin';
  if (cleanPath === '/admin/projects') return '/projects';
  if (cleanPath === '/admin/clients') return '/clients';
  if (cleanPath === '/admin/crm' || cleanPath === '/admin/leads') return '/leads';
  if (cleanPath === '/admin/tasks') return '/tasks';
  if (cleanPath === '/admin/team') return '/team';
  if (cleanPath === '/admin/updates') return '/updates';
  if (cleanPath === '/admin/files') return '/files';
  if (cleanPath === '/admin/analytics') return '/analytics';
  if (cleanPath === '/admin/settings') return '/settings';

  if (cleanPath.startsWith('/services/')) {
    const sub = cleanPath.replace('/services/', '');
    return `/${sub}`;
  }
  if (cleanPath.startsWith('/work/')) {
    const sub = cleanPath.replace('/work/', '');
    return `/${sub}`;
  }
  if (cleanPath.startsWith('/blog/')) {
    const sub = cleanPath.replace('/blog/', '');
    return `/${sub}`;
  }

  return cleanPath.startsWith('/') ? cleanPath : `/${cleanPath}`;
}

// Maps a pathname or hash or text to the Optenary display label
export function resolveTransitionTitle(href: string, targetEl?: HTMLElement | null): string {
  // 1. Explicit data attribute on the element or parent
  const explicit = targetEl?.getAttribute('data-trans-title') ||
    targetEl?.closest('[data-trans-title]')?.getAttribute('data-trans-title');
  if (explicit && explicit.trim()) return explicit.trim();

  // 2. Parse URL / hash
  let pathname = href;
  let hash = '';
  try {
    const url = new URL(href, window.location.origin);
    pathname = url.pathname;
    hash = url.hash;
  } catch {
    if (href.startsWith('#')) {
      hash = href;
      pathname = window.location.pathname;
    }
  }

  const cleanHash = hash.replace(/^#/, '').toLowerCase();
  if (cleanHash) {
    if (cleanHash.includes('work') || cleanHash.includes('case-stud') || cleanHash === 'projects') return 'Work';
    if (cleanHash.includes('service') || cleanHash.includes('channel')) return 'Services';
    if (cleanHash.includes('pricing') || cleanHash.includes('plan')) return 'Pricing';
    if (cleanHash.includes('about')) return 'About';
    if (cleanHash.includes('contact') || cleanHash.includes('audit')) return 'Contact';
    if (cleanHash.includes('client') || cleanHash.includes('radar')) return 'Clients';
    if (cleanHash.includes('review') || cleanHash.includes('testim')) return 'Reviews';
    if (cleanHash.includes('team') || cleanHash.includes('specialist')) return 'Team';
    if (cleanHash.includes('faq')) return 'FAQ';
    if (cleanHash.includes('number') || cleanHash.includes('report') || cleanHash.includes('kpi')) return 'Capabilities';
    if (cleanHash.includes('feed') || cleanHash.includes('social')) return 'Insights';
    if (cleanHash.includes('funnel') || cleanHash.includes('how-we-work')) return 'Process';
    if (cleanHash.includes('journal') || cleanHash.includes('blog')) return 'Journal';
  }

  const cleanPath = pathname.toLowerCase().replace(/\/$/, '') || '/';
  if (cleanPath === '/' || cleanPath === '/home') return 'Home';
  if (cleanPath === '/services') return 'Services';

  // Specific service detail pages
  if (cleanPath === '/services/web-development') return 'Web Development';
  if (cleanPath === '/services/mobile-development') return 'Mobile Apps';
  if (cleanPath === '/services/custom-software') return 'Custom Software';
  if (cleanPath === '/services/desktop-development') return 'Desktop Software';
  if (cleanPath === '/services/ai-agents-automation') return 'AI & Automation';
  if (cleanPath === '/services/web-design') return 'UI/UX Design';
  if (cleanPath === '/services/custom-ecommerce' || cleanPath === '/services/custom-ecommerce-development') return 'Digital Commerce';
  if (cleanPath === '/services/shopify-development') return 'Shopify Dev';
  if (cleanPath === '/services/wordpress-development') return 'WordPress Dev';
  if (cleanPath === '/services/seo') return 'Web Development';
  if (cleanPath === '/services/social-media') return 'Mobile Apps';
  if (cleanPath === '/services/paid-ads') return 'AI & Automation';
  if (cleanPath === '/services/content') return 'UI/UX Design';
  if (cleanPath === '/services/branding') return 'UI/UX Design';

  if (cleanPath === '/work' || cleanPath === '/projects') return 'Work';
  if (cleanPath === '/work/mehta-dairy' || cleanPath === '/projects/mehta-dairy') return 'Mehta Dairy';
  if (cleanPath === '/about') return 'About';
  if (cleanPath === '/pricing') return 'Pricing';
  if (cleanPath === '/contact') return 'Contact';
  if (cleanPath === '/blog') return 'Blog';
  if (cleanPath === '/faq') return 'FAQ';
  if (cleanPath === '/terms-of-service') return 'Terms';
  if (cleanPath === '/privacy-policy') return 'Privacy';
  if (cleanPath === '/portal') return 'Client Portal';
  if (cleanPath === '/portal/onboarding' || cleanPath === '/onboarding') return 'Onboarding';
  if (cleanPath === '/login') return 'Sign In';
  if (cleanPath === '/admin') return 'Admin OS';
  if (cleanPath === '/admin/projects') return 'Projects';
  if (cleanPath === '/admin/clients') return 'Clients';
  if (cleanPath === '/admin/crm' || cleanPath === '/admin/leads') return 'Leads & CRM';
  if (cleanPath === '/admin/tasks') return 'Tasks & Sprints';
  if (cleanPath === '/admin/team') return 'Engineering Team';
  if (cleanPath === '/admin/updates') return 'Updates Feed';
  if (cleanPath === '/admin/files') return 'Deliverables & Files';
  if (cleanPath === '/admin/analytics') return 'Analytics';
  if (cleanPath === '/admin/settings') return 'Settings';

  if (cleanPath.startsWith('/services/')) return 'Services';
  if (cleanPath.startsWith('/blog/')) return 'Blog';
  if (cleanPath.startsWith('/projects/') || cleanPath.startsWith('/work/')) return 'Work';

  // 3. Fallback from anchor text if short
  const rawText = targetEl?.textContent?.trim() || '';
  if (rawText && rawText.length <= 25 && !rawText.includes('\n')) {
    if (/book\s*a\s*call/i.test(rawText) || /contact/i.test(rawText) || /start\s*a\s*project/i.test(rawText)) {
      return 'Contact';
    }
    if (/see\s*our\s*work/i.test(rawText) || /case\s*studies/i.test(rawText) || /explore\s*our\s*work/i.test(rawText)) {
      return 'Work';
    }
    if (/see\s*pricing/i.test(rawText) || /pricing/i.test(rawText)) {
      return 'Pricing';
    }
    return rawText;
  }

  return 'Optenary';
}

export default function RwPageTrans({ children }: { children?: ReactNode }) {
  const navigate = useNavigate();

  const [status, setStatus] = useState<'idle' | 'leaving' | 'entering'>('idle');
  const [pageName, setPageName] = useState<string>('Home');
  const [pageRoute, setPageRoute] = useState<string>('/home');
  const [coords, setCoords] = useState<{ x: number; y: number; r: number }>({
    x: typeof window !== 'undefined' ? window.innerWidth / 2 : 500,
    y: typeof window !== 'undefined' ? window.innerHeight / 2 : 500,
    r: typeof window !== 'undefined' ? Math.max(window.innerWidth, window.innerHeight) * 1.5 : 1200,
  });

  const isTransitioningRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Compute radius that covers entire viewport from point (x, y)
  const computeRadius = (x: number, y: number) => {
    const W = window.innerWidth;
    const H = window.innerHeight;
    return Math.ceil(Math.hypot(Math.max(x, W - x), Math.max(y, H - y))) + 36;
  };

  const triggerTransition = useCallback(
    (to: string, title?: string, origin?: { x: number; y: number }) => {
      // Check reduced motion preference
      if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        if (to.startsWith('#')) {
          const el = document.getElementById(to.replace('#', ''));
          el?.scrollIntoView({ behavior: 'auto' });
        } else {
          navigate(to);
        }
        return;
      }

      if (isTransitioningRef.current) return;
      isTransitioningRef.current = true;

      // 1. Immediately preload the destination route chunk
      preloadRoute(to);

      const W = window.innerWidth;
      const H = window.innerHeight;
      const x = origin ? origin.x : W / 2;
      const y = origin ? origin.y : H / 2;
      const r = computeRadius(x, y);

      const resolvedTitle = title || resolveTransitionTitle(to);
      const resolvedRoute = resolveTransitionRoute(to);

      setCoords({ x, y, r });
      setPageName(resolvedTitle);
      setPageRoute(resolvedRoute);
      setStatus('leaving');

      // Save point in session for persistence
      try {
        sessionStorage.setItem(
          'rw-pt',
          JSON.stringify({ x: x / W, y: y / H, t: Date.now() })
        );
      } catch { }

      if (timerRef.current) clearTimeout(timerRef.current);

      // Animation Timeline:
      // 0ms -> 400ms: Circular Signal wavefront expands to cover screen
      // 140ms: Top Capsule [ ◉ OPENING /work ] animates in
      // 180ms: Lime badge [ Work ] animates in (fully intact, no clipping)
      // 520ms -> 860ms: Complete badge is 100% displayed and held for user to read
      // At 860ms: Navigate & reset scroll behind solid night mask
      timerRef.current = setTimeout(() => {
        if (to.startsWith('#')) {
          const id = to.replace('#', '');
          const targetEl = document.getElementById(id);
          if (targetEl) {
            targetEl.scrollIntoView({ behavior: 'auto' });
          }
          try {
            history.pushState(null, '', to);
          } catch { }
        } else {
          const [path, hash] = to.split('#');
          navigate(path || '/');
          if (hash) {
            setTimeout(() => {
              const el = document.getElementById(hash);
              if (el) el.scrollIntoView({ behavior: 'auto' });
            }, 60);
          } else {
            window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
          }
        }

        // At 900ms: Smoothly switch to 'entering':
        // Text & badge fade away cleanly (200ms) while iris contracts back to origin (520ms)
        timerRef.current = setTimeout(() => {
          setStatus('entering');

          // At 1440ms (540ms after entering): Transition complete
          timerRef.current = setTimeout(() => {
            setStatus('idle');
            isTransitioningRef.current = false;
          }, 540);
        }, 40);
      }, 860);
    },
    [navigate]
  );

  // Check if arriving from a fresh page load or SSR session
  useEffect(() => {
    try {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      const stored = sessionStorage.getItem('rw-pt');
      if (stored) {
        sessionStorage.removeItem('rw-pt');
        const f = JSON.parse(stored);
        if (f && Date.now() - (+f.t || 0) < 6000) {
          const W = window.innerWidth;
          const H = window.innerHeight;
          const x = (+f.x || 0.5) * W;
          const y = (+f.y || 0.5) * H;
          const r = computeRadius(x, y);
          setCoords({ x, y, r });
          setStatus('entering');
          const t = setTimeout(() => {
            setStatus('idle');
          }, 540);
          return () => clearTimeout(t);
        }
      }
    } catch { }
  }, []);

  // Global click & hover listener
  useEffect(() => {
    const handleGlobalHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const anchor = target?.closest('a') as HTMLAnchorElement | null;
      const href = anchor?.getAttribute('href');
      if (href && (href.startsWith('/') || href.startsWith('#')) && !href.startsWith('//')) {
        preloadRoute(href);
      }
    };

    const handleGlobalClick = (e: MouseEvent) => {
      // Ignore right clicks or clicks with modifier keys
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      // Find closest anchor tag or element requesting transition
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const anchor = target.closest('a') as HTMLAnchorElement | null;
      const transEl = target.closest('[data-rw-trans="true"]') as HTMLElement | null;

      const href = anchor?.getAttribute('href') || transEl?.getAttribute('data-href');
      if (!href) return;

      // Exclude special protocols & external links
      if (
        href.startsWith('mailto:') ||
        href.startsWith('tel:') ||
        href.startsWith('javascript:') ||
        anchor?.getAttribute('target') === '_blank' ||
        anchor?.hasAttribute('download')
      ) {
        return;
      }

      // Check external domain
      try {
        const url = new URL(href, window.location.origin);
        if (url.origin !== window.location.origin) return; // external
      } catch {
        // invalid URL, ignore
        return;
      }

      // Prevent native jump and trigger Signal Transition
      e.preventDefault();
      e.stopPropagation();

      const origin = { x: e.clientX, y: e.clientY };
      const title = resolveTransitionTitle(href, anchor || transEl);

      triggerTransition(href, title, origin);
    };

    window.addEventListener('mouseover', handleGlobalHover, { passive: true });
    window.addEventListener('click', handleGlobalClick, { capture: true });
    return () => {
      window.removeEventListener('mouseover', handleGlobalHover);
      window.removeEventListener('click', handleGlobalClick, { capture: true });
    };
  }, [triggerTransition]);

  return (
    <PageTransContext.Provider
      value={{
        triggerTransition,
        isTransitioning: status !== 'idle',
        pageName,
        pageRoute,
      }}
    >
      {/* Reachwise "THE SIGNAL" Page Transition Layer */}
      <div
        className={`rwtr ${status === 'leaving'
          ? 'rwtr-on rwtr-leave'
          : status === 'entering'
            ? 'rwtr-on rwtr-enter'
            : 'rwtr-idle'
          }`}
        aria-hidden={status === 'idle'}
        style={
          {
            '--x': `${coords.x}px`,
            '--y': `${coords.y}px`,
            '--R': `${coords.r}px`,
            '--rwtr-x': `${coords.x}px`,
            '--rwtr-y': `${coords.y}px`,
            '--rwtr-r': `${coords.r}px`,
            '--d': '400ms',
            '--rw-night': '#08090A',
            '--rw-brass': '#D4FF3A',
            '--rw-lime': '#D4FF3A',
            '--rw-ink': '#08090A',
            '--rw-cloud': '#FFFFFF',
            '--rw-bone': '#EEEEE8',
            fontFamily: "var(--rw-font-b, 'Funnel Sans'), sans-serif",
          } as React.CSSProperties
        }
      >
        {/* Leading lime wavefront */}
        <i className="rwtr-lime" />

        {/* Deep Night ground following behind it */}
        <i className="rwtr-fill" />

        {/* Central Display: [ ◉ OPENING  /work ] + [ Work ] */}
        <div className="rwtr-mid">
          <p className="rwtr-k">
            <span className="rwtr-radar" aria-hidden="true">
              <i className="rwtr-radar-ring" />
              <i className="rwtr-radar-dot" />
            </span>
            <span className="rwtr-k-txt">OPENING</span>
            <span className="rwtr-k-route">{pageRoute}</span>
          </p>
          <div className="rwtr-name">
            <span className="rwtr-pill">{pageName}</span>
          </div>
        </div>

        {/* Origin dot that pings when arriving */}
        <i className="rwtr-dot" />
      </div>

      {children}
    </PageTransContext.Provider>
  );
}

