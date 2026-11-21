import { useState, useEffect } from 'react';

interface RwPricingProps {
  id?: string;
}

export default function RwPricing({ id = 'pricing' }: RwPricingProps) {
  const [billing, setBilling] = useState<'monthly' | 'quarterly'>('monthly');
  const [isPhone, setIsPhone] = useState(
    typeof window !== 'undefined' ? window.innerWidth < 810 : false
  );
  const [isTab, setIsTab] = useState(
    typeof window !== 'undefined'
      ? window.innerWidth >= 810 && window.innerWidth < 1100
      : false
  );

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      setIsPhone(w < 810);
      setIsTab(w >= 810 && w < 1100);
    };
    handleResize();
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const plans = [
    {
      no: '01',
      name: 'Sprint / MVP', tag: 'Rapid product build from concept to launch.', monthlyPrice: '1,999', quarterlyPrice: '1,799',
      isFeatured: false,
      btnText: 'Start with MVP',
      features: ['Full-stack Web or Mobile MVP', 'UI/UX Interactive Figma Design', 'Clean TypeScript & Database Schema', 'Staging preview deployments', '100% IP & Source Code Ownership'],
    },
    {
      no: '02',
      name: 'Dedicated Squad', tag: 'Continuous engineering & scaling squad.', monthlyPrice: '3,999', quarterlyPrice: '3,599',
      isFeatured: true,
      chip: '★ Most picked',
      btnText: 'Start with Dedicated Squad',
      features: ['Dedicated Senior Full-Stack Engineers', 'Frontend, Backend & AI Pipeline Dev', 'Bi-weekly sprint deliveries & demo', 'Automated CI/CD & Unit Tests', 'Direct Slack / Discord channel', '24/7 Production uptime monitoring'],
    },
    {
      no: '03',
      name: 'Enterprise / Custom', tag: 'Full-scale digital transformation & architecture.', monthlyPrice: '6,499', quarterlyPrice: '5,849',
      isFeatured: false,
      btnText: 'Start with Enterprise',
      features: ['Custom Microservices & Cloud Architecture', 'Autonomous AI Agents & Enterprise RAG', 'Legacy Modernization & Migration', 'SOC2 / HIPAA / ISO Security Compliance', 'Dedicated Solutions Architect', 'SLA guaranteed response time'],
    },
  ];

  return (
    <section
      id={id}
      className={`rw rw-sec rw-dark rwpr is-set ${isPhone ? 'is-ph' : isTab ? 'is-tab' : ''}`}
      style={{
        fontFamily: "var(--rw-font-b, 'Funnel Sans'), Inter, system-ui, sans-serif",
        fontWeight: 400,
        width: '100%',
      }}
    >
      <i className="rwpr-glow" aria-hidden="true" />
      <div className="rw-wrap rwpr-in">
        {/* Top Header */}
        <div className="rwpr-top">
          <div className="rwpr-hd">
            <p
              className="rw-eb is-on"
              style={{
                fontFamily: "var(--rw-font-m, 'Geist Mono'), ui-monospace, monospace",
                fontWeight: 400,
              }}
            >
              <i aria-hidden="true" />
              (08) Pricing
            </p>
            <h2
              className="rw-hd is-on"
              style={{
                fontFamily: "var(--rw-font-d, 'Funnel Display'), Inter, sans-serif",
                fontWeight: 700,
                fontSize: 'clamp(40px, 4.6vw, 68px)',
                lineHeight: 0.95,
              }}
            >
              <span className="rw-hd-l">
                <span className="rw-hd-w">
                  <span className="rw-hd-i">Simple </span>
                </span>
                <span className="rw-hd-w">
                  <span className="rw-hd-i">monthly </span>
                </span>
              </span>
              <span className="rw-hd-l">
                <span className="rw-hd-w is-accw">
                  <span className="rw-hd-i is-acc">
                    <span className="rw-it">retainers.</span>
                  </span>
                </span>
              </span>
            </h2>
            <p className="rwpr-sub" style={{ opacity: 1, transform: 'none' }}>
              Pick the channels you need. Every plan comes with a strategist, a live dashboard and plain-number reports.
            </p>
          </div>

          {/* Billing Switcher */}
          <div
            className="rwpr-tg"
            role="group"
            aria-label="Billing period"
            style={{
              fontFamily: "var(--rw-font-m, 'Geist Mono'), ui-monospace, monospace",
              fontWeight: 400,
              opacity: 1,
              transform: 'none',
            }}
          >
            <button
              type="button"
              className={`rwpr-tb ${billing === 'monthly' ? 'is-act' : ''}`}
              onClick={() => setBilling('monthly')}
            >
              Monthly
            </button>
            <button
              type="button"
              className={`rwpr-tb ${billing === 'quarterly' ? 'is-act' : ''}`}
              onClick={() => setBilling('quarterly')}
            >
              Quarterly
              <b className="rwpr-save">−10%</b>
            </button>
            <i
              className="rwpr-tk"
              aria-hidden="true"
              style={{
                transform: billing === 'monthly' ? 'translateX(0)' : 'translateX(100%)',
              }}
            />
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="rwpr-row" style={{ '--n': 3 } as React.CSSProperties}>
          {plans.map((p, idx) => {
            const price = billing === 'monthly' ? p.monthlyPrice : p.quarterlyPrice;
            return (
              <article
                key={p.no}
                className={`rwpr-card ${p.isFeatured ? 'is-feat' : ''}`}
                style={
                  {
                    '--d': idx === 0 ? -1 : idx === 1 ? 0 : 1,
                    '--z': p.isFeatured ? 5 : 2,
                    opacity: 1,
                    transform: 'none',
                  } as React.CSSProperties
                }
              >
                {p.isFeatured && (
                  <>
                    <i className="rwpr-ring" aria-hidden="true" />
                    <i className="rwpr-pulse" aria-hidden="true" />
                  </>
                )}
                <div className="rwpr-cin">
                  <div className="rwpr-ch">
                    <span
                      className="rwpr-no"
                      style={{
                        fontFamily: "var(--rw-font-m, 'Geist Mono'), ui-monospace, monospace",
                        fontWeight: 400,
                      }}
                    >
                      {p.no}
                    </span>
                    {p.chip && (
                      <span
                        className="rwpr-chip"
                        style={{
                          fontFamily: "var(--rw-font-m, 'Geist Mono'), ui-monospace, monospace",
                          fontWeight: 400,
                        }}
                      >
                        <i className="rwpr-chip-i" aria-hidden="true">
                          ★
                        </i>
                        Most picked
                        <i className="rwpr-chip-p" aria-hidden="true" />
                      </span>
                    )}
                  </div>

                  <h3
                    className="rwpr-name"
                    style={{
                      fontFamily: "var(--rw-font-d, 'Funnel Display'), Inter, sans-serif",
                      fontWeight: 700,
                    }}
                  >
                    {p.name}
                  </h3>

                  <p className="rwpr-tag">{p.tag}</p>

                  <p
                    className="rwpr-price"
                    style={{
                      fontFamily: "var(--rw-font-d, 'Funnel Display'), Inter, sans-serif",
                      fontWeight: 700,
                    }}
                  >
                    <span className="rwpr-cur">$</span>
                    <span className="rwpr-roll" aria-label={price}>
                      {price}
                    </span>
                    <span
                      className="rwpr-per"
                      style={{
                        fontFamily: "var(--rw-font-m, 'Geist Mono'), ui-monospace, monospace",
                        fontWeight: 400,
                      }}
                    >
                      /mo
                    </span>
                  </p>

                  <p
                    className="rwpr-bill"
                    style={{
                      fontFamily: "var(--rw-font-m, 'Geist Mono'), ui-monospace, monospace",
                      fontWeight: 400,
                    }}
                  >
                    <i aria-hidden="true" />
                    {billing === 'monthly' ? 'Billed monthly · cancel anytime' : 'Billed quarterly · 10% saved'}
                  </p>

                  <ul className="rwpr-inc">
                    {p.features.map((feat, fIdx) => (
                      <li key={fIdx} style={{ '--j': fIdx } as React.CSSProperties}>
                        <svg viewBox="0 0 20 20" aria-hidden="true">
                          <circle cx="10" cy="10" r="9" />
                          <path d="M5.6 10.4l3 3 5.8-6.6" />
                        </svg>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>

                  <a
                    className={`rw-btn ${p.isFeatured ? 'rw-solid' : 'rw-ghost'} rwpr-btn`}
                    href={`/contact?plan=${encodeURIComponent(p.name.toLowerCase())}&budget=${price}`}
                    aria-label={`${p.name} ${p.btnText}`}
                  >
                    <span className="rw-face">
                      <span className="rw-fill" aria-hidden="true" />
                      <span className="rw-lbl">
                        <span className="rw-roll">
                          <span className="rw-l1">{p.btnText}</span>
                          <span className="rw-l2" aria-hidden="true">
                            {p.btnText}
                          </span>
                        </span>
                      </span>
                      <span className="rw-arr" aria-hidden="true">
                        <span className="rw-a1">
                          <svg
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <rect x="3.5" y="5" width="17" height="15" rx="3" />
                            <path d="M3.5 10h17M8 3v4M16 3v4" />
                          </svg>
                        </span>
                        <span className="rw-a2">
                          <svg
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <rect x="3.5" y="5" width="17" height="15" rx="3" />
                            <path d="M3.5 10h17M8 3v4M16 3v4" />
                          </svg>
                        </span>
                      </span>
                    </span>
                    <span className="rw-ping" aria-hidden="true">
                      <i className="rw-ping-r" />
                      <b>
                        <span>1</span>
                        <span>+1</span>
                      </b>
                    </span>
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

