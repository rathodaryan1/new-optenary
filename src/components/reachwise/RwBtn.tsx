import React, { type CSSProperties } from 'react';

export const Glyph = ({ k }: { k?: string }) =>
  k === 'mail' ? (
    <svg viewBox="0 0 24 24" aria-hidden fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="5" width="18" height="14" rx="3" />
      <path d="M4 7l8 6 8-6" />
    </svg>
  ) : k === 'cal' ? (
    <svg viewBox="0 0 24 24" aria-hidden fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3.5" y="5" width="17" height="15" rx="3" />
      <path d="M3.5 10h17M8 3v4M16 3v4" />
    </svg>
  ) : k === 'play' ? (
    <svg viewBox="0 0 24 24" aria-hidden>
      <path fill="currentColor" d="M8 5.5v13l10.5-6.5z" />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" aria-hidden fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 17L17 7M9 7h8v8" />
    </svg>
  );

export function jumpTo(e: React.MouseEvent, href: string) {
  try {
    const m = String(href || '').match(/^\/?#([\w-]+)$/);
    if (!m) return;
    const el = document.getElementById(m[1]);
    if (el) {
      e.preventDefault();
      const W = window as any;
      const L = W.__ltLenis || W.__vcLenis || W.lenis;
      if (L && L.scrollTo) L.scrollTo(el, { offset: -20 });
      else el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      try {
        history.replaceState(null, '', '#' + m[1]);
      } catch {}
    } else if (href.startsWith('#')) {
      e.preventDefault();
      window.location.href = '/' + href;
    }
  } catch {}
}

export interface RwBtnProps {
  href: string;
  label: string;
  kind?: 'solid' | 'ghost' | 'quiet';
  arrow?: boolean;
  style?: CSSProperties;
  className?: string;
  onClick?: (e: React.MouseEvent) => void;
  ariaLabel?: string;
  cur?: string;
  icon?: string;
  sub?: string;
}

export default function RwBtn({
  href,
  label,
  kind = 'solid',
  arrow = true,
  style,
  className,
  onClick,
  ariaLabel,
  cur,
  icon,
  sub,
}: RwBtnProps) {
  return (
    <a
      className={`rw-btn rw-${kind}${arrow ? '' : ' rw-noarr'}${className ? ' ' + className : ''}`}
      data-mag="true"
      data-cur={cur || 'go'}
      href={href}
      target={/^https?:\/\//.test(href || '') ? '_blank' : undefined}
      rel={/^https?:\/\//.test(href || '') ? 'noopener noreferrer' : undefined}
      onClick={onClick || ((e: any) => jumpTo(e, href))}
      aria-label={ariaLabel || (sub ? `${sub} ${label}` : undefined)}
      style={style}
    >
      <span className="rw-face">
        <span className="rw-fill" aria-hidden />
        <span className="rw-lbl">
          <span className="rw-roll">
            <span className="rw-l1">{label}</span>
            <span className="rw-l2" aria-hidden>
              {label}
            </span>
          </span>
        </span>
        {arrow && (
          <span className="rw-arr" aria-hidden>
            <span className="rw-a1">
              <Glyph k={icon} />
            </span>
            <span className="rw-a2">
              <Glyph k={icon} />
            </span>
          </span>
        )}
      </span>
      <span className="rw-ping" aria-hidden>
        <i className="rw-ping-r" />
        <b>
          <span>1</span>
          <span>+1</span>
        </b>
      </span>
    </a>
  );
}

