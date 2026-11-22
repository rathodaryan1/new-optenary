import { useEffect, useRef, useState } from 'react';

/**
 * OptenaryCursor
 * 
 * Signature interactive cursor for both Mobile (touch) and Desktop (pointer).
 * Features a glowing neon lime center dot with a concentric high-definition outer circular ring,
 * spring-lerp motion physics, and tactile ripple ping feedback on tap/click.
 */
export default function OptenaryCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  const [visible, setVisible] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isPing, setIsPing] = useState(false);

  // Position references for fluid RAF interpolation
  const pos = useRef({
    targetX: -100,
    targetY: -100,
    ringX: -100,
    ringY: -100,
    dotX: -100,
    dotY: -100,
    active: false,
    isTouching: false,
  });

  const pingTimer = useRef<number | null>(null);
  const hideTimer = useRef<number | null>(null);
  const rafId = useRef<number | null>(null);

  const triggerPing = () => {
    setIsPing(false);
    if (pingTimer.current) window.clearTimeout(pingTimer.current);
    // Microtask force restart
    window.requestAnimationFrame(() => {
      setIsPing(true);
      pingTimer.current = window.setTimeout(() => {
        setIsPing(false);
      }, 550);
    });
  };

  useEffect(() => {
    // ── Animation Loop (60/120fps hardware accelerated) ──────────
    const loop = () => {
      const p = pos.current;
      if (p.active) {
        // High-precision smooth lerping: dot is quick/responsive, ring has elastic drag
        const ringLerp = p.isTouching ? 0.45 : 0.32;
        const dotLerp = p.isTouching ? 0.75 : 0.65;

        p.ringX += (p.targetX - p.ringX) * ringLerp;
        p.ringY += (p.targetY - p.ringY) * ringLerp;

        p.dotX += (p.targetX - p.dotX) * dotLerp;
        p.dotY += (p.targetY - p.dotY) * dotLerp;

        if (ringRef.current) {
          ringRef.current.style.transform = `translate3d(${p.ringX.toFixed(1)}px, ${p.ringY.toFixed(1)}px, 0)`;
        }
        if (dotRef.current) {
          dotRef.current.style.transform = `translate3d(${p.dotX.toFixed(1)}px, ${p.dotY.toFixed(1)}px, 0)`;
        }
      }
      rafId.current = window.requestAnimationFrame(loop);
    };
    rafId.current = window.requestAnimationFrame(loop);

    // ── Mobile Touch Handlers ─────────────────────────────────────
    const onTouchStart = (e: TouchEvent) => {
      if (!e.touches || e.touches.length === 0) return;
      const touch = e.touches[0];
      const p = pos.current;

      p.targetX = touch.clientX;
      p.targetY = touch.clientY;
      p.ringX = touch.clientX;
      p.ringY = touch.clientY;
      p.dotX = touch.clientX;
      p.dotY = touch.clientY;
      p.active = true;
      p.isTouching = true;

      if (hideTimer.current) window.clearTimeout(hideTimer.current);
      setVisible(true);
      setIsPressed(true);
      triggerPing();
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!e.touches || e.touches.length === 0) return;
      const touch = e.touches[0];
      const p = pos.current;

      p.targetX = touch.clientX;
      p.targetY = touch.clientY;
      p.active = true;
      p.isTouching = true;

      if (!visible) setVisible(true);
    };

    const onTouchEnd = () => {
      const p = pos.current;
      p.isTouching = false;
      setIsPressed(false);

      if (hideTimer.current) window.clearTimeout(hideTimer.current);
      // Smooth 280ms exit grace period so touch feels tactile and clean
      hideTimer.current = window.setTimeout(() => {
        setVisible(false);
        p.active = false;
      }, 280);
    };

    // ── Desktop Pointer Handlers ──────────────────────────────────
    const onMouseMove = (e: MouseEvent) => {
      const p = pos.current;
      if (p.isTouching) return; // Prevent mobile touch emulation conflict

      if (!p.active) {
        p.ringX = e.clientX;
        p.ringY = e.clientY;
        p.dotX = e.clientX;
        p.dotY = e.clientY;
      }

      p.targetX = e.clientX;
      p.targetY = e.clientY;
      p.active = true;
      if (!visible) setVisible(true);

      const target = e.target as HTMLElement | null;
      if (target) {
        const isClickable = !!target.closest('a, button, [role="button"], input[type="submit"], input[type="button"], .rw-btn, label, select, summary');
        const isInput = !!target.closest('input[type="text"], input[type="email"], input[type="number"], input[type="password"], textarea, [contenteditable="true"]');
        setIsHovered(isClickable);
        if (isInput) {
          setVisible(false);
        }
      }
    };

    const onMouseDown = () => {
      setIsPressed(true);
      triggerPing();
    };

    const onMouseUp = () => {
      setIsPressed(false);
    };

    const onMouseLeave = () => {
      setVisible(false);
      pos.current.active = false;
    };

    // Attach listeners with passive flags to guarantee 100% native scrolling performance
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd, { passive: true });
    window.addEventListener('touchcancel', onTouchEnd, { passive: true });

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown, { passive: true });
    window.addEventListener('mouseup', onMouseUp, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);

    return () => {
      if (rafId.current) window.cancelAnimationFrame(rafId.current);
      if (pingTimer.current) window.clearTimeout(pingTimer.current);
      if (hideTimer.current) window.clearTimeout(hideTimer.current);

      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('touchcancel', onTouchEnd);

      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [visible]);

  return (
    <>
      <style>{CSS_OPT_CURSOR}</style>
      <div
        ref={cursorRef}
        className={`opt-cur ${visible ? 'is-visible' : ''} ${isPressed ? 'is-pressed' : ''} ${isHovered ? 'is-hover' : ''} ${isPing ? 'is-ping' : ''}`}
        aria-hidden="true"
      >
        {/* Outer Circular Ring (thin white border, concentric) */}
        <div ref={ringRef} className="opt-cur-ring" />

        {/* Inner Neon Lime Dot (brand signature brass) */}
        <div ref={dotRef} className="opt-cur-dot" />
      </div>
    </>
  );
}

const CSS_OPT_CURSOR = `
/* ==============================================================================
   OPTENARY INTERACTIVE SIGNATURE CURSOR (Mobile Touch & Desktop)
   ============================================================================== */
.opt-cur {
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 2147483647;
  pointer-events: none !important;
  user-select: none !important;
  touch-action: none !important;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.24s cubic-bezier(0.16, 1, 0.3, 1), visibility 0.24s;
  will-change: opacity;
}

.opt-cur.is-visible {
  opacity: 1;
  visibility: visible;
}

/* Outer Concentric Circular Ring */
.opt-cur-ring {
  position: fixed;
  left: 0;
  top: 0;
  width: 36px;
  height: 36px;
  margin-left: -18px;
  margin-top: -18px;
  border-radius: 50%;
  pointer-events: none !important;
  box-shadow: inset 0 0 0 1.5px rgba(255, 255, 255, 0.85);
  transition: width 0.28s cubic-bezier(0.34, 1.56, 0.64, 1),
              height 0.28s cubic-bezier(0.34, 1.56, 0.64, 1),
              margin 0.28s cubic-bezier(0.34, 1.56, 0.64, 1),
              box-shadow 0.25s ease,
              background 0.25s ease;
  will-change: transform;
}

/* Inner Solid Neon Lime Dot */
.opt-cur-dot {
  position: fixed;
  left: 0;
  top: 0;
  width: 10px;
  height: 10px;
  margin-left: -5px;
  margin-top: -5px;
  border-radius: 50%;
  pointer-events: none !important;
  background: #D8FF3E;
  box-shadow: 0 0 10px rgba(216, 255, 62, 0.8), 0 0 2px rgba(216, 255, 62, 0.95);
  transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1),
              background 0.2s ease;
  will-change: transform;
}

/* Hover State (Desktop over clickable elements) */
.opt-cur.is-hover .opt-cur-ring {
  width: 52px;
  height: 52px;
  margin-left: -26px;
  margin-top: -26px;
  box-shadow: inset 0 0 0 1.5px #D8FF3E;
  background: rgba(216, 255, 62, 0.06);
}

.opt-cur.is-hover .opt-cur-dot {
  transform: scale(1.15);
  background: #E8FF66;
}

/* Pressed / Active Touch State */
.opt-cur.is-pressed .opt-cur-ring {
  width: 44px;
  height: 44px;
  margin-left: -22px;
  margin-top: -22px;
  box-shadow: inset 0 0 0 2px #D8FF3E;
  background: rgba(216, 255, 62, 0.12);
}

.opt-cur.is-pressed .opt-cur-dot {
  transform: scale(1.3);
}

/* Tactile Ripple Ping Animation */
.opt-cur.is-ping .opt-cur-ring::after {
  content: "";
  position: absolute;
  inset: -6px;
  border-radius: 50%;
  border: 1.5px solid #D8FF3E;
  animation: opt-ping 0.5s cubic-bezier(0.2, 0.6, 0.3, 1) forwards;
}

@keyframes opt-ping {
  0% {
    transform: scale(0.85);
    opacity: 0.9;
  }
  100% {
    transform: scale(1.65);
    opacity: 0;
  }
}

/* Mobile responsive sizing */
@media (max-width: 768px) {
  .opt-cur-ring {
    width: 38px;
    height: 38px;
    margin-left: -19px;
    margin-top: -19px;
  }
  .opt-cur-dot {
    width: 11px;
    height: 11px;
    margin-left: -5.5px;
    margin-top: -5.5px;
  }
}
`;

