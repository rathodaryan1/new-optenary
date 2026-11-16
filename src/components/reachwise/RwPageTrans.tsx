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

interface PageTransContextValue {
  triggerTransition: (to: string, title?: string, origin?: { x: number; y: number }) => void;
  isTransitioning: boolean;
  pageName: string;
}

const PageTransContext = createContext<PageTransContextValue>({
  triggerTransition: () => { },
  isTransitioning: false,
  pageName: 'Home',
});

export const usePageTransition = () => useContext(PageTransContext);

// Maps a pathname or hash or text to the Reachwise display label
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
    if (cleanHash.includes('number') || cleanHash.includes('report') || cleanHash.includes('kpi')) return 'The Numbers';
    if (cleanHash.includes('feed') || cleanHash.includes('social')) return 'Content';
    if (cleanHash.includes('funnel') || cleanHash.includes('how-we-work')) return 'How We Work';
    if (cleanHash.includes('journal') || cleanHash.includes('blog')) return 'Journal';
  }

  const cleanPath = pathname.toLowerCase().replace(/\/$/, '') || '/';
  if (cleanPath === '/' || cleanPath === '/home') return 'Home';
  if (cleanPath === '/services') return 'Services';
  if (cleanPath === '/services/seo') return 'SEO';
  if (cleanPath === '/services/social-media') return 'Social Media';
  if (cleanPath === '/services/paid-ads') return 'Paid Ads';
  if (cleanPath === '/services/content') return 'Content';
  if (cleanPath === '/services/web-design') return 'Web Design';
  if (cleanPath === '/services/branding') return 'Branding';
  if (cleanPath === '/work' || cleanPath === '/projects') return 'Work';
  if (cleanPath === '/about') return 'About';
  if (cleanPath === '/pricing') return 'Pricing';
  if (cleanPath === '/contact') return 'Contact';
  if (cleanPath === '/blog') return 'Blog';
  if (cleanPath === '/faq') return 'FAQ';
  if (cleanPath === '/terms-of-service') return 'Terms';
  if (cleanPath === '/privacy-policy') return 'Privacy';

  if (cleanPath.startsWith('/services/')) return 'Services';
  if (cleanPath.startsWith('/blog/')) return 'Blog';
  if (cleanPath.startsWith('/projects/')) return 'Work';

  // 3. Fallback from anchor text if short
  const rawText = targetEl?.textContent?.trim() || '';
  if (rawText && rawText.length <= 25 && !rawText.includes('\n')) {
    if (/book\s*a\s*call/i.test(rawText) || /contact/i.test(rawText) || /audit/i.test(rawText)) {
      return 'Contact';
    }
    if (/see\s*our\s*work/i.test(rawText) || /case\s*studies/i.test(rawText)) {
      return 'Work';
    }
    if (/see\s*pricing/i.test(rawText) || /pricing/i.test(rawText)) {
      return 'Pricing';
    }
    return rawText;
  }

  return 'Home';
}

export default function RwPageTrans({ children }: { children?: ReactNode }) {
  const navigate = useNavigate();

  const [status, setStatus] = useState<'idle' | 'leaving' | 'entering'>('idle');
  const [pageName, setPageName] = useState<string>('Home');
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

      const W = window.innerWidth;
      const H = window.innerHeight;
      const x = origin ? origin.x : W / 2;
      const y = origin ? origin.y : H / 2;
      const r = computeRadius(x, y);

      const resolvedTitle = title || resolveTransitionTitle(to);

      setCoords({ x, y, r });
      setPageName(resolvedTitle);
      setStatus('leaving');

      // Save point in session for persistence
      try {
        sessionStorage.setItem(
          'rw-pt',
          JSON.stringify({ x: x / W, y: y / H, t: Date.now() })
        );
      } catch { }

      if (timerRef.current) clearTimeout(timerRef.current);

      // At 560ms (exact Framer departure wavefront duration):
      timerRef.current = setTimeout(() => {
        // Execute navigation or section scroll
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
          // If destination contains hash, e.g. /services#seo
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

        // Switch to entering phase (wave shrinks back to origin point & dot pings)
        setStatus('entering');

        // Entering wave duration + dot ping: 680ms
        timerRef.current = setTimeout(() => {
          setStatus('idle');
          isTransitioningRef.current = false;
        }, 680);
      }, 560);
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
          }, 680);
          return () => clearTimeout(t);
        }
      }
    } catch { }
  }, []);

  // Global click listener to intercept internal navigations
  useEffect(() => {
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

      // Prevent native jump / navigation and trigger Reachwise Signal Transition
      e.preventDefault();
      e.stopPropagation();

      const origin = { x: e.clientX, y: e.clientY };
      const title = resolveTransitionTitle(href, anchor || transEl);

      triggerTransition(href, title, origin);
    };

    window.addEventListener('click', handleGlobalClick, { capture: true });
    return () => window.removeEventListener('click', handleGlobalClick, { capture: true });
  }, [triggerTransition]);

  return (
    <PageTransContext.Provider
      value={{
        triggerTransition,
        isTransitioning: status !== 'idle',
        pageName,
      }}
    >
      {/* Exact Reachwise "THE SIGNAL" Page Transition Layer */}
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
            '--d': '560ms',
            '--rw-night': '#08090A',
            '--rw-brass': '#D4FF3A',
            '--rw-ink': '#0D0E10',
            '--rw-cloud': '#FFFFFF',
            '--rw-bone': '#EEEEE8',
            fontFamily: "var(--rw-font-b, 'Funnel Sans'), sans-serif",
          } as React.CSSProperties
        }
      >
        {/* Signal-Lime leading wavefront */}
        <i className="rwtr-lime" />

        {/* Deep Night ground following behind it */}
        <i className="rwtr-fill" />

        {/* Central Display: • OPENING / + Signal-lime Pill Name */}
        <div className="rwtr-mid">
          <p
            className="rwtr-k"
            style={{
              fontFamily: "var(--rw-font-m, 'Geist Mono'), ui-monospace, monospace",
              fontWeight: 400,
            }}
          >
            <i />
            Opening
            <span>/</span>
          </p>
          <p
            className="rwtr-name"
            style={{
              fontFamily: "var(--rw-font-d, 'Funnel Display'), Inter, system-ui, sans-serif",
              fontWeight: 700,
              fontStyle: 'normal',
            }}
          >
            <span>{pageName}</span>
          </p>
        </div>

        {/* Origin dot that pings when arriving */}
        <i className="rwtr-dot" />
      </div>

      {children}
    </PageTransContext.Provider>
  );
}
