import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"

interface RwHeaderProps {
  active?: string
  ground?: "dark" | "light" | "auto"
}

export default function RwHeader({ active, ground }: RwHeaderProps) {
  const [open, setOpen] = useState(false)
  const [glass, setGlass] = useState(false)
  const [time, setTime] = useState("")
  const [isPhone, setIsPhone] = useState(false)
  const [isCompact, setIsCompact] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth
      setIsPhone(w < 810)
      setIsCompact(w < 1024)
    }
    handleResize()
    window.addEventListener("resize", handleResize, { passive: true })
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Determine active route if not explicitly passed
  const currentActive =
    active ||
    (location.pathname === "/" || location.pathname === "/home"
      ? "home"
      : location.pathname.replace(/^\//, ""))

  const isLight =
    ground === "light" ||
    (ground !== "dark" &&
      (currentActive === "services" ||
        currentActive === "about" ||
        currentActive === "contact" ||
        location.pathname === "/services" ||
        location.pathname === "/about" ||
        location.pathname === "/contact"))

  useEffect(() => {
    const onScroll = () => {
      setGlass(window.scrollY > 40)
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    const updateTime = () => {
      try {
        const d = new Date()
        setTime(
          d.toLocaleTimeString("en-US", {
            timeZone: "Asia/Kolkata",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false,
          })
        )
      } catch (e) {
        setTime("10:00:00")
      }
    }
    updateTime()
    const t = setInterval(updateTime, 1000)
    return () => clearInterval(t)
  }, [])

  const navLinks = [
    { label: "Services", href: "/services", key: "services" },
    { label: "Work", href: "/work", key: "work" },
    { label: "Pricing", href: "/pricing", key: "pricing" },
    { label: "About", href: "/about", key: "about" },
    { label: "Blog", href: "/blog", key: "blog" },
    { label: "Contact", href: "/contact", key: "contact" },
  ]

  return (
    <div className="rwhd-root" data-rwhd>
      <style>{`
        @media (max-width: 1024px) {
          .rwhd-nav { display: none !important; }
        }
        @media (max-width: 768px) {
          .rwhd-cta { display: none !important; }
          .rwhd-bar { justify-content: space-between !important; }
        }
      `}</style>
      <div className={`rw rwhd ${open ? "is-open" : ""} ${isPhone ? "is-ph" : isCompact ? "is-cmp" : ""}`}>
        <header className={`rwhd-top ${glass ? "is-glass" : ""} ${isLight ? "is-lt" : ""}`}>
          <div className="rwhd-bar">
            {/* Logo */}
            <a className="rwhd-logo" href="/" aria-label="Optenary home">
              <img
                src="/images/logo_transparent.webp"
                alt="Optenary logo mark"
                width={30}
                height={30}
                className="rwhd-mark"
                style={{
                  width: 30,
                  height: 30,
                  objectFit: "contain",
                  display: "block",
                  filter: "drop-shadow(0 2px 8px rgba(1, 122, 245, 0.4))",
                }}
              />
              <span>Optenary</span>
            </a>

            {/* Desktop Navigation pill */}
            <nav className="rwhd-nav" aria-label="Main">
              <ul className="rwhd-lk">
                {navLinks.map((l) => (
                  <li key={l.key}>
                    <a
                      href={l.href}
                      aria-current={currentActive === l.key ? "page" : undefined}
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Actions: CTA and Mobile Burger */}
            <div className="rwhd-act">
              <a
                className="rw-btn rw-quiet rwhd-cta"
                data-mag="true"
                data-cur="go"
                href="/contact"
              >
                <span className="rw-face">
                  <span className="rw-fill" aria-hidden="true" />
                  <span className="rw-lbl">
                    <span className="rw-roll">
                      <span className="rw-l1">Start a project</span>
                      <span className="rw-l2" aria-hidden="true">
                        Start a project
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

              {/* Mobile Burger toggle */}
              <button
                type="button"
                className="rwhd-bg"
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
                onClick={() => setOpen(!open)}
              >
                <span className="rwhd-bg-l">
                  <i
                    style={
                      open
                        ? { top: "5px", transform: "rotate(45deg)", width: "100%" }
                        : {}
                    }
                  />
                  <i
                    style={
                      open
                        ? { top: "5px", transform: "rotate(-45deg)", width: "100%" }
                        : {}
                    }
                  />
                </span>
                <span className="rwhd-bg-t">{open ? "Close" : "Menu"}</span>
              </button>
            </div>
          </div>
        </header>

        {/* Mobile Fullscreen Drawer */}
        <div
          className="rwhd-drw"
          aria-hidden={!open}
          style={{ visibility: open ? "visible" : "hidden" }}
        >
          <div className="rwhd-rw">
            <div className="rwhd-rings">
              <i />
              <i />
              <i />
              <i />
              <b />
              <b />
            </div>
          </div>
          <div className="rwhd-dr-in">
            <ul className="rwhd-dl">
              {navLinks.map((l, i) => (
                <li key={l.key} style={{ "--i": i } as any}>
                  <a href={l.href} onClick={() => setOpen(false)}>
                    <span className="rwhd-dl-n">0{i + 1}</span>
                    <span className="rwhd-dl-m">
                      <span className="rwhd-dl-t">{l.label}</span>
                    </span>
                    <span className="rwhd-dl-a">
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </span>
                  </a>
                </li>
              ))}
            </ul>

            <div className="rwhd-dr-info">
              <div>
                <p className="rwhd-dr-k">Contact</p>
                <a href="mailto:hello@optenary.in">
                  hello@optenary.in
                </a>
                <a href="tel:+919316688014">+91 93166 88014</a>
              </div>
              <div>
                <p className="rwhd-dr-k">Studio</p>
                <span>India (HQ) · Global</span>
                <p className="rwhd-time">
                  <span className="rwhd-live" />
                  <span>IST: {time}</span>
                </p>
              </div>
              <div className="rwhd-dr-cta">
                <a
                  className="rw-btn rw-solid"
                  href="/contact"
                  onClick={() => setOpen(false)}
                >
                  <span className="rw-face">
                    <span className="rw-lbl">Start a project</span>
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
