// @ts-nocheck
/* eslint-disable */
// ===== REACHWISE shared scaffold (THE REACH: chalk ground, ink type, signal-lime pulses, ping-pink dots, PING buttons) (inlined by mk.py; each Framer code file must be self-contained) =====
import {
    useEffect,
    useLayoutEffect,
    useRef,
    useState,
    type CSSProperties,
} from "react"
import { createPortal } from "react-dom"
// Framer shim for standard React/Vite
const useIsStaticRenderer = () => false;
const RenderTarget = {
    canvas: 'canvas',
    preview: 'preview',
    current: () => 'preview',
};
const addPropertyControls = (_comp: any, _controls: any) => {};
const ControlType = {
    String: 'string',
    Number: 'number',
    Boolean: 'boolean',
    Color: 'color',
    Enum: 'enum',
    Object: 'object',
    Array: 'array',
    ResponsiveImage: 'responsiveImage',
    Font: 'font',
    Link: 'link',
};
// ===== REACHWISE shared scaffold (THE REACH: chalk ground, ink type, signal-lime pulses, ping-pink dots, PING buttons) (inlined by mk.py; each Framer code file must be self-contained) =====




const FONTS =
    "https://fonts.googleapis.com/css2?family=Funnel+Display:wght@300..800&family=Funnel+Sans:ital,wght@0,300..800;1,300..800&family=Geist+Mono:wght@300..600&display=swap"
// Token-safe alpha: Styles-bound colours arrive as var(--token-…) so hex-alpha breaks; color-mix keeps a palette flip working. Never 0% (hue drops) — floor at 0.4%.
const A = (c: string, a: number) =>
    `color-mix(in srgb, ${c} ${Math.max(0.4, Math.round(a * 1000) / 10)}%, transparent)`
const MIX = (a: string, b: string, t: number) =>
    `color-mix(in srgb, ${a} ${Math.round((1 - t) * 100)}%, ${b})`
const srcOf = (v: any, fallback: string) =>
    v && typeof v === "object" && v.src
        ? String(v.src).split("?")[0]
        : typeof v === "string" && v.trim()
          ? v.trim().split("?")[0]
          : fallback
const T = (s: string | undefined, fb: string) => (s && s.trim() ? s.trim() : fb)
// ink or white text on a CMS brand colour (luminance test; the brand colour is data, not a palette token)
const onBrand = (hex: string) => {
    const m = String(hex || "")
        .replace("#", "")
        .match(/^([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i)
    if (!m) return "var(--rw-cloud)"
    const [r, g, b] = [m[1], m[2], m[3]].map((x) => {
        const v = parseInt(x, 16) / 255
        return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)
    })
    const L = 0.2126 * r + 0.7152 * g + 0.0722 * b
    return L > 0.2 ? "var(--rw-ink)" : "var(--rw-cloud)"
}
const cleanTel = (s: string) => s.replace(/[^\d+]/g, "")
// Premium layout band (measured 09-13): container 1340 @1440 / 1520 @1920, body 16, button label 12–13.
const MAXW = "clamp(1280px, 92vw, 1520px)"
// Responsive delivery: Framer's resizer serves any upload at ?scale-down-to=N (longest side). The query is stripped first so one file never downloads twice.
// Responsive delivery. Framer uploads: the resizer serves ?scale-down-to=N. Unsplash stand-ins: ?w=N. The src is already the smallest width that covers the slot (a 52px avatar never pulls a 1600px photo), so a big image is never decoded for a small box — decode is what stalls scrolling.
const RS_W = [160, 320, 480, 800, 1200, 1600]
const rsTarget = (sizes: string) => {
    const t =
        String(sizes || "")
            .trim()
            .split(",")
            .pop() || ""
    const px = t.match(/(\d+(?:\.\d+)?)px/)
    const vw = t.match(/(\d+(?:\.\d+)?)vw/)
    const want = px
        ? parseFloat(px[1]) * 2
        : vw
          ? (parseFloat(vw[1]) / 100) * 1600 * 1.25
          : 1600
    return RS_W.find((w) => w >= want) || 1600
}
const RS = (u: string, sizes: string) => {
    const s = String(u || "")
    const b = s.split("?")[0]
    if (/framerusercontent\.com\/images\//.test(s)) {
        const w = rsTarget(sizes)
        const d = w <= 512 ? 512 : w <= 1024 ? 1024 : 2048
        return {
            src: `${b}?scale-down-to=${d}`,
            srcSet: `${b}?scale-down-to=512 512w, ${b}?scale-down-to=1024 1024w, ${b}?scale-down-to=2048 2048w`,
            sizes,
        }
    }
    if (/images\.unsplash\.com\//.test(s)) {
        const w = rsTarget(sizes)
        const q = (n: number) => `${b}?w=${n}&q=70&fm=jpg&auto=format`
        return {
            src: q(w),
            srcSet: RS_W.filter((n) => n <= Math.max(w * 2, 480))
                .map((n) => `${q(n)} ${n}w`)
                .join(", "),
            sizes,
        }
    }
    return { src: s }
}

// A Framer Font control stores a selector (GF;Family-700), not a CSS family — derive one, reject anything with ';'
const famOf = (f: any): string => {
    if (!f) return ""
    if (typeof f === "string") return f.includes(";") ? "" : f
    if (f.fontFamily && !String(f.fontFamily).includes(";"))
        return String(f.fontFamily)
    const sel = String(f.fontSelector || "")
    if (!sel) return ""
    const n = sel.split(";").pop() || ""
    return n
        .replace(/-(regular|italic|bold|\d{3}(italic)?)$/i, "")
        .replace(/-/g, " ")
}
const wOf = (f: any, fb: number): number => {
    if (!f) return fb
    if (f.fontWeight) return Number(f.fontWeight) || fb
    const m = String(f.fontSelector || "").match(/-(\d{3})/)
    return m ? Number(m[1]) : fb
}
// famCss: Framer's Font `fontFamily` is ALREADY a stack — never wrap it in quotes (one fake family → fallback renders). A bare name gets quoted.
const famCss = (f: any): string => {
    const fa = famOf(f).replace(/"/g, "'").trim()
    if (!fa) return ""
    return fa.includes(",") || fa.startsWith("'") ? fa : `'${fa}'`
}
const stack = (custom: boolean, f: any, fb: string, tail: string) => {
    const fam = custom ? famCss(f) : ""
    return `${fam ? `${fam}, ` : ""}${fb}, ${tail}`
}

function useFonts() {
    useEffect(() => {
        if (
            typeof document === "undefined" ||
            document.getElementById("rw-fonts")
        )
            return
        const l = document.createElement("link")
        l.id = "rw-fonts"
        l.rel = "stylesheet"
        l.href = FONTS
        document.head.appendChild(l)
    }, [])
}
// live = client after hydration and not on the canvas. SSR and the first client render share the same markup.
// TRUE on the Framer canvas AND in its export / thumbnail / screenshot renderers (anything that is not the running preview): no scroll and no hydration there, so every reveal / pinned stage must draw its FINAL state or the editor shows empty blocks.
function useStill() {
    const isStatic = useIsStaticRenderer()
    let t: any = null
    try {
        t = RenderTarget.current()
    } catch (e) {}
    return isStatic || (t !== null && t !== RenderTarget.preview)
}
function useLive() {
    const isStatic = useIsStaticRenderer()
    const [live, setLive] = useState(false)
    useEffect(() => {
        if (
            !isStatic &&
            RenderTarget.current() !== RenderTarget.canvas &&
            typeof window !== "undefined"
        )
            setLive(true)
    }, [isStatic])
    return live
}
// Width/height of the root + viewport height. SSR starts from the breakpoint hint (Framer renders the Tablet/Phone copies with the same code and no width).
function useSize(root: React.RefObject<HTMLElement | null>, hint?: string) {
    const ov = String(hint || "").toLowerCase()
    const initW =
        typeof window !== "undefined" && window.innerWidth
            ? window.innerWidth
            : ov === "phone"
              ? 390
              : ov === "tablet"
                ? 810
                : 1440
    const initVh =
        typeof window !== "undefined" && window.innerHeight
            ? window.innerHeight
            : ov === "phone"
              ? 844
              : ov === "tablet"
                ? 1080
                : 900
    const [w, setW] = useState(initW),
        [vh, setVh] = useState(initVh)
    useLayoutEffect(() => {
        const el = root.current
        if (!el) return
        const ro = new ResizeObserver(([e]) => {
            const x = Math.round(
                (e.borderBoxSize && e.borderBoxSize[0]
                    ? e.borderBoxSize[0].inlineSize
                    : 0) || el.offsetWidth
            )
            if (x > 0) setW(x)
        })
        ro.observe(el)
        const vv = () => setVh(window.innerHeight)
        vv()
        const read = () => {
            const x = Math.round(el.offsetWidth)
            if (x > 0) setW(x)
        }
        const t1 = window.setTimeout(read, 150),
            t2 = window.setTimeout(read, 700),
            t3 = window.setTimeout(read, 1600)
        window.addEventListener("resize", vv)
        window.addEventListener("load", read)
        return () => {
            ro.disconnect()
            window.clearTimeout(t1)
            window.clearTimeout(t2)
            window.clearTimeout(t3)
            window.removeEventListener("resize", vv)
            window.removeEventListener("load", read)
        }
    }, [])
    return { w, vh }
}
const useReduced = () => {
    const [rm, setRm] = useState(false)
    useLayoutEffect(() => {
        setRm(window.matchMedia("(prefers-reduced-motion: reduce)").matches)
    }, [])
    return rm
}
type Sub = (t: number) => void
// One shared rAF for every section. Each frame runs ALL reads first (layout reads: getBoundingClientRect, offsetHeight), then ALL writes (CSS vars, transforms).
// Interleaving read → write → read made the browser recalc the whole page's style once per section per frame (layout thrashing: 20+ recalcs a frame).
function onTick(fn: Sub, read?: Sub, pre?: Sub): () => void {
    if (typeof window === "undefined") return () => {}
    const w = window as any
    if (!w.__nuTick) {
        w.__nuTick = {
            pre: new Set<Sub>(),
            subs: new Set<Sub>(),
            reads: new Set<Sub>(),
            raf: 0,
        }
        const loop = (t: number) => {
            const T = w.__nuTick
            T.pre.forEach((r: Sub) => r(t))
            T.reads.forEach((r: Sub) => r(t))
            T.subs.forEach((s: Sub) => s(t))
            T.raf = requestAnimationFrame(loop)
        }
        w.__nuTick.raf = requestAnimationFrame(loop)
    }
    w.__nuTick.subs.add(fn)
    if (read) w.__nuTick.reads.add(read)
    if (pre) w.__nuTick.pre.add(pre)
    return () => {
        w.__nuTick.subs.delete(fn)
        if (read) w.__nuTick.reads.delete(read)
        if (pre) w.__nuTick.pre.delete(pre)
    }
}
const clamp01 = (v: number) => Math.min(1, Math.max(0, v))
const easeIO = (t: number) => {
    const x = clamp01(t)
    return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2
}

// ---- Palette (8 Styles tokens bound on every instance) ----
type Pal = {
    bone: string
    ink: string
    brass: string
    pine: string
    fog: string
    stone: string
    cloud: string
    night: string
}
const DEF: Pal = {
    bone: "#EEEEE8",
    ink: "#0D0E10",
    brass: "#D4FF3A",
    pine: "#16181B",
    fog: "#DCDCD3",
    stone: "#75766F",
    cloud: "#FFFFFF",
    night: "#08090A",
}
const PINK = "#FF3E88" // notification dots only (a constant, not a token)
const colorsOf = (p: any): Pal => ({
    bone: p.bone || DEF.bone,
    ink: p.ink || DEF.ink,
    brass: p.brass || DEF.brass,
    pine: p.pine || DEF.pine,
    fog: p.fog || DEF.fog,
    stone: p.stone || DEF.stone,
    cloud: p.cloud || DEF.cloud,
    night: p.night || DEF.night,
})
// a Style-bound colour arrives as var(--token-…, #hex): let the browser resolve it to r,g,b for canvas drawing
const cssRgb = (el: Element | null, col: string, fb: string) => {
    if (!el || typeof window === "undefined") return fb
    const p = document.createElement("i")
    p.style.display = "none"
    p.style.color = col
    el.appendChild(p)
    const v = getComputedStyle(p).color
    p.remove()
    const m = v.match(/(\d+(?:\.\d+)?),\s*(\d+(?:\.\d+)?),\s*(\d+(?:\.\d+)?)/)
    return m
        ? `${Math.round(+m[1])},${Math.round(+m[2])},${Math.round(+m[3])}`
        : fb
}
const cssVars = (c: Pal): any => ({
    "--rw-bone": c.bone,
    "--rw-ink": c.ink,
    "--rw-brass": c.brass,
    "--rw-pine": c.pine,
    "--rw-fog": c.fog,
    "--rw-stone": c.stone,
    "--rw-cloud": c.cloud,
    "--rw-night": c.night,
})
const COLOR_CONTROLS = {
    bone: { type: ControlType.Color, title: "Paper", defaultValue: DEF.bone },
    ink: { type: ControlType.Color, title: "Ink", defaultValue: DEF.ink },
    brass: {
        type: ControlType.Color,
        title: "Accent",
        defaultValue: DEF.brass,
    },
    pine: { type: ControlType.Color, title: "Deep", defaultValue: DEF.pine },
    fog: { type: ControlType.Color, title: "Line", defaultValue: DEF.fog },
    stone: { type: ControlType.Color, title: "Muted", defaultValue: DEF.stone },
    cloud: { type: ControlType.Color, title: "White", defaultValue: DEF.cloud },
    night: { type: ControlType.Color, title: "Dark", defaultValue: DEF.night },
} as const
// ---- Fonts: Custom Fonts toggle → Font controls; off = Funnel Display / Funnel Sans / Geist Mono ----
const FONT_CONTROLS = {
    customFonts: {
        type: ControlType.Boolean,
        title: "Custom Fonts",
        description:
            "Off = the site fonts (set once on the Header in the Site Layout). On = different fonts for this section only",
        defaultValue: false,
    },
    displayFont: {
        type: ControlType.Font,
        title: "Display Font",
        defaultFontType: "sans-serif",
        hidden: (p: any) => !p.customFonts,
    },
    bodyFont: {
        type: ControlType.Font,
        title: "Body Font",
        defaultFontType: "sans-serif",
        hidden: (p: any) => !p.customFonts,
    },
    monoFont: {
        type: ControlType.Font,
        title: "Mono Font",
        defaultFontType: "monospace",
        hidden: (p: any) => !p.customFonts,
    },
} as const
type Fonts = { D: CSSProperties; B: CSSProperties; M: CSSProperties }
const NUMF = "var(--rw-font-m, 'Geist Mono'), ui-monospace, monospace"
// Site-wide fonts: the Header (Site Layout, every page) writes --rw-font-d/b/m (+ weights) on :root when its Custom Fonts is on. A section uses them unless its own Custom Fonts is on.
const siteFontCss = (p: any): string => {
    if (!p || !p.customFonts) return ""
    const v: string[] = []
    const put = (k: string, f: any, w: number) => {
        const fam = famCss(f)
        if (fam) {
            v.push(`--rw-font-${k}:${fam}`)
            v.push(`--rw-font-${k}w:${wOf(f, w)}`)
        }
    }
    put("d", p.displayFont, 600)
    put("b", p.bodyFont, 400)
    put("m", p.monoFont, 400)
    put("a", p.accentFont, 400)
    return v.length ? `:root{${v.join(";")}}` : ""
}
function fontsOf(p: any): Fonts {
    const on = !!p.customFonts
    const D: CSSProperties = {
        fontFamily: stack(
            on,
            p.displayFont,
            "var(--rw-font-d, 'Funnel Display')",
            "Inter, -apple-system, Arial, sans-serif"
        ),
        fontWeight: on
            ? wOf(p.displayFont, 600)
            : ("var(--rw-font-dw, 600)" as any),
        fontStyle:
            on && p.displayFont && p.displayFont.fontStyle
                ? p.displayFont.fontStyle
                : "normal",
    }
    const B: CSSProperties = {
        fontFamily: stack(
            on,
            p.bodyFont,
            "var(--rw-font-b, 'Funnel Sans')",
            "Inter, system-ui, -apple-system, Arial, sans-serif"
        ),
        fontWeight: on
            ? wOf(p.bodyFont, 400)
            : ("var(--rw-font-bw, 400)" as any),
    }
    const M: CSSProperties = {
        fontFamily: stack(
            on,
            p.monoFont,
            "var(--rw-font-m, 'Geist Mono')",
            "ui-monospace, SFMono-Regular, Menlo, monospace"
        ),
        fontWeight: on
            ? wOf(p.monoFont, 400)
            : ("var(--rw-font-mw, 400)" as any),
    }
    return { D, B, M }
}
const BP_CONTROL: any = {
    bpHint: {
        type: ControlType.Enum,
        title: "Breakpoint Hint",
        description:
            "Set per breakpoint copy so the server render starts at the right width",
        options: ["auto", "desktop", "tablet", "phone"],
        optionTitles: ["Auto", "Desktop", "Tablet", "Phone"],
        defaultValue: "auto",
        hidden: () => true,
    },
}

// ---- Button system: THE PING — a pill. On hover a pink notification dot pops on its right edge with a rolling "+1", a lime ring pings out of the dot, the accent fill sweeps in from the left and the label rolls up. Magnetic on desktop, squish on press. Solid = ink (fill lime), ghost = glass/hairline (fill paper), quiet = small nav pill. ----
const Glyph = ({ k }: { k?: string }) =>
    k === "mail" ? (
        <svg
            viewBox="0 0 24 24"
            aria-hidden
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <rect x="3" y="5" width="18" height="14" rx="3" />
            <path d="M4 7l8 6 8-6" />
        </svg>
    ) : k === "cal" ? (
        <svg
            viewBox="0 0 24 24"
            aria-hidden
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <rect x="3.5" y="5" width="17" height="15" rx="3" />
            <path d="M3.5 10h17M8 3v4M16 3v4" />
        </svg>
    ) : k === "play" ? (
        <svg viewBox="0 0 24 24" aria-hidden>
            <path fill="currentColor" d="M8 5.5v13l10.5-6.5z" />
        </svg>
    ) : (
        <svg
            viewBox="0 0 24 24"
            aria-hidden
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M7 17L17 7M9 7h8v8" />
        </svg>
    )
// In-page CTA jumps ("#download", "/#download"): scroll to the section when it is on this page, otherwise go to it on the home page.
function jumpTo(e: any, href: string) {
    try {
        const m = String(href || "").match(/^\/?#([\w-]+)$/)
        if (!m) return
        const el = document.getElementById(m[1])
        if (el) {
            e.preventDefault()
            const W = window as any
            const L = W.__ltLenis || W.__vcLenis || W.lenis
            if (L && L.scrollTo) L.scrollTo(el, { offset: -20 })
            else el.scrollIntoView({ behavior: "smooth", block: "start" })
            try {
                history.replaceState(null, "", "#" + m[1])
            } catch (x) {}
        } else if (href.startsWith("#")) {
            e.preventDefault()
            window.location.href = "/" + href
        }
    } catch (x) {}
}
const Btn = ({
    href,
    label,
    kind = "solid",
    arrow = true,
    style,
    className,
    onClick,
    ariaLabel,
    cur,
    icon,
    sub,
}: {
    href: string
    label: string
    kind?: "solid" | "ghost" | "quiet"
    arrow?: boolean
    style?: CSSProperties
    className?: string
    onClick?: any
    ariaLabel?: string
    cur?: string
    icon?: string
    sub?: string
}) => (
    <a
        className={`rw-btn rw-${kind}${arrow ? "" : " rw-noarr"}${className ? " " + className : ""}`}
        data-mag
        data-cur={cur || "go"}
        href={href}
        target={/^https?:\/\//.test(href || "") ? "_blank" : undefined}
        rel={/^https?:\/\//.test(href || "") ? "noopener" : undefined}
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
)
function useNearFocus(
    root: React.RefObject<HTMLElement | null>,
    live: boolean
) {
    useEffect(() => {
        if (!live || !root.current) return
        const el = root.current
        const f = (e: FocusEvent) => {
            const t = e.target as HTMLElement
            const sc = t.closest?.(".rw-inring") as HTMLElement | null
            if (!sc) return
            try {
                t.scrollIntoView({ block: "nearest", inline: "nearest" })
            } catch (x) {}
        }
        el.addEventListener("focusin", f)
        return () => el.removeEventListener("focusin", f)
    }, [live])
}
function useMagnet(root: React.RefObject<HTMLElement | null>, live: boolean) {
    useEffect(() => {
        if (
            !live ||
            !root.current ||
            !window.matchMedia("(hover:hover) and (pointer:fine)").matches
        )
            return
        const r = root.current
        const btns = () =>
            Array.from(r.querySelectorAll<HTMLElement>("[data-mag]"))
        const mv = (e: PointerEvent) => {
            for (const b of btns()) {
                const rc = b.getBoundingClientRect()
                const dx = e.clientX - (rc.left + rc.width / 2),
                    dy = e.clientY - (rc.top + rc.height / 2)
                const d = Math.hypot(dx, dy)
                const pull = d < 150 ? (1 - d / 150) * 8 : 0
                b.style.setProperty("--mx", `${(dx / (d || 1)) * pull}px`)
                b.style.setProperty("--my", `${(dy / (d || 1)) * pull}px`)
            }
        }
        const lv = () => {
            for (const b of btns()) {
                b.style.setProperty("--mx", "0px")
                b.style.setProperty("--my", "0px")
            }
        }
        r.addEventListener("pointermove", mv as any)
        r.addEventListener("pointerleave", lv)
        return () => {
            r.removeEventListener("pointermove", mv as any)
            r.removeEventListener("pointerleave", lv)
        }
    }, [live])
}
const CSS_BASE = `
:where(.rw){position:relative;z-index:10} .rw,.rw *{box-sizing:border-box;min-width:0} .rw-sr{position:absolute!important;width:1px!important;height:1px!important;overflow:hidden!important;clip:rect(0 0 0 0)!important;white-space:nowrap!important;padding:0!important;margin:-1px!important;border:0!important} :where(.rw) a{color:inherit} html,body{overflow-x:clip}
:where(a[href],button,input,select,textarea,summary,[tabindex]:not([tabindex="-1"]),[role="button"]):focus-visible{outline:3px solid var(--rw-ink,#0D0E10)!important;outline-offset:2px!important;box-shadow:0 0 0 2px var(--rw-bone,#EEEEE8)!important} :where(.rw-dark) :where(a[href],button,input,select,textarea,summary,[tabindex]:not([tabindex="-1"])):focus-visible{outline-color:var(--rw-cloud,#FFFFFF)!important;box-shadow:0 0 0 2px var(--rw-night,#08090A)!important} :where(.rw-inring) :where(a[href],button):focus-visible{outline-offset:-4px!important;box-shadow:none!important} :where(.rw) :is(input:not([type=range]):not([type=checkbox]):not([type=radio]),textarea,select):focus-visible{outline:2px solid currentColor!important;outline-offset:2px!important;box-shadow:none!important} :where(.rw) textarea{resize:none} .rw-inring:focus-visible{outline-offset:-3px!important;box-shadow:none!important} html{scroll-padding-top:96px;scroll-padding-bottom:88px}
.rw-btn{position:relative;display:inline-flex;padding:0;min-height:56px;border-radius:999px;text-decoration:none;cursor:pointer;isolation:isolate;white-space:nowrap;font-size:14px;font-weight:600;letter-spacing:-.005em;border:0;color:var(--fg);transition:color .35s,transform .45s cubic-bezier(.34,1.56,.64,1)}
.rw-face{position:relative;z-index:1;display:inline-flex;align-items:center;gap:14px;width:100%;min-height:inherit;padding:0 10px 0 26px;border-radius:inherit;background:var(--face);-webkit-backdrop-filter:blur(14px) saturate(1.3);backdrop-filter:blur(14px) saturate(1.3);box-shadow:inset 0 0 0 1px var(--rim);overflow:hidden;isolation:isolate}
.rw-fill{position:absolute;z-index:0;inset:0;background:var(--fill);border-radius:inherit;clip-path:circle(0% at 100% 50%);transition:clip-path .7s cubic-bezier(.7,0,.2,1)} .rw-btn:hover .rw-fill,.rw-btn:focus-visible .rw-fill{clip-path:circle(150% at 100% 50%)}
.rw-lbl{position:relative;z-index:1;display:inline-flex;flex-direction:column;justify-content:center;line-height:1.15}
.rw-roll{display:block;height:1.2em;overflow:hidden;line-height:1.2} .rw-l1,.rw-l2{display:block;transition:translate .5s cubic-bezier(.7,0,.2,1)} .rw-btn:hover .rw-l1,.rw-btn:hover .rw-l2,.rw-btn:focus-visible .rw-l1,.rw-btn:focus-visible .rw-l2{translate:0 -100%}
.rw-arr{position:relative;z-index:1;display:grid;place-items:center;width:38px;height:38px;flex:none;border-radius:50%;background:var(--chip);color:var(--chipfg);overflow:hidden;transition:background .4s,color .4s} .rw-arr>span{grid-area:1/1;display:grid;place-items:center;transition:transform .55s cubic-bezier(.7,0,.2,1)} .rw-arr svg{width:15px;height:15px} .rw-a2{transform:translate(-160%,160%)}
.rw-btn:hover .rw-a1,.rw-btn:focus-visible .rw-a1{transform:translate(160%,-160%)} .rw-btn:hover .rw-a2,.rw-btn:focus-visible .rw-a2{transform:none} .rw-btn:hover .rw-arr,.rw-btn:focus-visible .rw-arr{background:var(--chip2);color:var(--chipfg2)}
.rw-ping{position:absolute;z-index:3;right:-3px;top:-5px;width:22px;height:22px;pointer-events:none} .rw-ping b{position:absolute;inset:0;display:block;border-radius:999px;background:#FF3E88;color:#0D0E10;font:600 12px/22px var(--rw-font-m,'Geist Mono'),ui-monospace,monospace;text-align:center;overflow:hidden;scale:0;transition:scale .45s cubic-bezier(.34,1.56,.64,1),width .4s;box-shadow:0 0 0 2.5px var(--ring,var(--rw-bone))} .rw-ping b span{display:block;height:22px;transition:translate .45s cubic-bezier(.7,0,.2,1) .2s}
.rw-ping-r{position:absolute;inset:0;border-radius:50%;box-shadow:0 0 0 2px var(--rw-brass);opacity:0}
.rw-btn:hover .rw-ping b,.rw-btn:focus-visible .rw-ping b{scale:1;transition-delay:.12s} .rw-btn:hover .rw-ping b span,.rw-btn:focus-visible .rw-ping b span{translate:0 -100%} .rw-btn:hover .rw-ping-r,.rw-btn:focus-visible .rw-ping-r{animation:rw-pingr 1.2s cubic-bezier(.2,.6,.3,1) .25s 2}
@keyframes rw-pingr{0%{opacity:.95;transform:scale(1)}100%{opacity:0;transform:scale(3.2)}}
.rw-btn:hover,.rw-btn:focus-visible{color:var(--fg2)}
.rw-btn.rw-noarr .rw-face{padding-right:26px}
.rw-btn.rw-solid{--face:var(--rw-ink);--rim:transparent;--fill:var(--rw-brass);--fg:var(--rw-bone);--fg2:var(--rw-ink);--chip:var(--rw-brass);--chipfg:var(--rw-ink);--chip2:var(--rw-ink);--chipfg2:var(--rw-brass)}
.rw-btn.rw-ghost{--face:color-mix(in srgb,var(--rw-cloud) 14%,transparent);--rim:color-mix(in srgb,var(--rw-cloud) 38%,transparent);--fill:var(--rw-cloud);--fg:var(--rw-cloud);--fg2:var(--rw-ink);--chip:color-mix(in srgb,var(--rw-cloud) 18%,transparent);--chipfg:var(--rw-cloud);--chip2:var(--rw-ink);--chipfg2:var(--rw-cloud)}
.rw-btn.rw-quiet{min-height:44px;font-size:13px;--face:var(--rw-brass);--rim:transparent;--fill:var(--rw-ink);--fg:var(--rw-ink);--fg2:var(--rw-bone);--chip:var(--rw-ink);--chipfg:var(--rw-brass);--chip2:var(--rw-brass);--chipfg2:var(--rw-ink)} .rw-btn.rw-quiet .rw-arr{width:30px;height:30px} .rw-btn.rw-quiet .rw-face{padding-left:18px;gap:10px;padding-right:7px}
/* on dark grounds (not the hero, which keeps its ink pill): solid = lime face */
.rw-dark:not(.rwh) .rw-btn.rw-solid{--face:var(--rw-brass);--fill:var(--rw-cloud);--fg:var(--rw-ink);--fg2:var(--rw-ink);--chip:var(--rw-ink);--chipfg:var(--rw-brass);--chip2:var(--rw-ink);--chipfg2:var(--rw-cloud)}
/* on chalk grounds: ghost = ink hairline */
.rw:not(.rw-dark) .rw-btn.rw-ghost,.rw-lt .rw-btn.rw-ghost{--face:transparent;--rim:color-mix(in srgb,var(--rw-ink) 30%,transparent);--fill:var(--rw-ink);--fg:var(--rw-ink);--fg2:var(--rw-bone);--chip:color-mix(in srgb,var(--rw-ink) 8%,transparent);--chipfg:var(--rw-ink);--chip2:var(--rw-brass);--chipfg2:var(--rw-ink)}
.rw .rw-dark .rw-btn.rw-ghost,.rw:not(.rw-dark) .rw-dark .rw-btn.rw-ghost{--face:color-mix(in srgb,var(--rw-cloud) 14%,transparent);--rim:color-mix(in srgb,var(--rw-cloud) 38%,transparent);--fill:var(--rw-cloud);--fg:var(--rw-cloud);--fg2:var(--rw-ink);--chip:color-mix(in srgb,var(--rw-cloud) 18%,transparent);--chipfg:var(--rw-cloud);--chip2:var(--rw-ink);--chipfg2:var(--rw-cloud)}
@media (max-width:600px),(hover:none){.rw .rw-btn{white-space:normal;text-align:left;line-height:1.25;min-height:56px;max-width:100%} .rw .rw-roll{height:auto} .rw .rw-l2{display:none} .rw .rw-ping{display:none}}
.rw-btn:hover{transform:translate(var(--mx,0px),var(--my,0px))} .rw-btn:active{transform:translate(var(--mx,0px),var(--my,0px)) scale(.97)!important;transition-duration:.12s}
/* TEXT-SAFE accents: lime is a SURFACE colour on chalk (pulses, fills, chips) — accent text on chalk is ink; on night grounds the lime itself reads */
.rw{--rw-acc:var(--rw-ink);--rw-acc-lg:var(--rw-brass);--rw-hl:var(--rw-brass);--rw-mut:color-mix(in srgb,var(--rw-stone) 60%,var(--rw-ink));--rw-acc-d:var(--rw-brass)}
.rw-lt,.rw .rw-lt{--rw-acc:var(--rw-ink);--rw-acc-lg:var(--rw-brass);--rw-hl:var(--rw-brass);--rw-mut:color-mix(in srgb,var(--rw-stone) 60%,var(--rw-ink))}
.rw-dark,.rw.rw-dark{--rw-acc:var(--rw-brass);--rw-acc-lg:var(--rw-brass);--rw-hl:transparent;--rw-mut:color-mix(in srgb,var(--rw-stone) 45%,var(--rw-cloud))}
.rw-port{width:7px;height:7px;flex:none;border-radius:50%;background:#FF3E88;animation:rw-blink 1.4s ease-in-out infinite} @keyframes rw-blink{50%{opacity:.25}}
@media (prefers-reduced-motion:reduce){.rw *,.sth *{animation-duration:.01ms!important;transition-duration:.01ms!important}}`

const IcoArrow = ({ s = 15 }: { s?: number }) => (
    <svg
        width={s}
        height={s}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
    >
        <path d="M5 12h14M13 5l7 7-7 7" />
    </svg>
)
const Stars = ({ v = 5, s = 13 }: { v?: number; s?: number }) => (
    <span className="rw-stars" aria-hidden>
        {[0, 1, 2, 3, 4].map((i) => (
            <svg
                key={i}
                width={s}
                height={s}
                viewBox="0 0 24 24"
                style={{ opacity: i < Math.round(v) ? 1 : 0.28 }}
            >
                <path
                    fill="currentColor"
                    d="M12 2.6l2.9 6.1 6.7.9-4.9 4.6 1.2 6.6L12 17.6 6.1 20.8l1.2-6.6L2.4 9.6l6.7-.9z"
                />
            </svg>
        ))}
    </span>
)

// ===== REACHWISE motion layer (THE FLOW) (composed by mk.py after _common) =====
// One shared rAF (onTick). Sections write --sp (0 = top edge enters the viewport bottom → 1 = bottom edge leaves the top) and,
// for tall pinned wrappers, --pp (0 = wrapper top hits the viewport top → 1 = wrapper bottom hits the viewport bottom). IO-gated.
const SCRUB_K = 0.18
// Decode a section's photos while it is still a screen and a half away, so the first frame it is on screen never waits for a decode.
function usePre(el: HTMLElement) {
    try {
        const io = new IntersectionObserver(
            (es) => {
                if (!es[0].isIntersecting) return
                io.disconnect()
                el.querySelectorAll("img").forEach((im) => {
                    try {
                        ;(im as HTMLImageElement).loading = "eager"
                        ;(im as HTMLImageElement).decode().catch(() => {})
                    } catch (e) {}
                })
            },
            { rootMargin: "150% 0px 150% 0px" }
        )
        io.observe(el)
    } catch (e) {}
}
function focusTo(el: HTMLElement | null, frac: number) {
    if (!el || typeof window === "undefined") return
    if (window.innerWidth < 810) return
    const r = el.getBoundingClientRect()
    const vh = window.innerHeight
    if (r.height <= vh * 1.05) return
    const y =
        r.top +
        window.scrollY +
        (r.height - vh) * Math.min(1, Math.max(0, frac))
    if (Math.abs(window.scrollY - y) < 8) return
    const w = window as any
    if (w.__ltLenis) w.__ltLenis.scrollTo(y, { immediate: true, force: true })
    else window.scrollTo(0, y)
}
function useScrollVars(
    ref: React.RefObject<HTMLElement | null>,
    live: boolean,
    rm: boolean,
    cb?: (sp: number, pp: number) => void
) {
    useEffect(() => {
        if (!live || rm || !ref.current) return
        const el = ref.current
        let vis = true,
            last = -9,
            cs = -1,
            cp = -1,
            settled = false
        usePre(el)
        const io = new IntersectionObserver(
            (es) => {
                vis = es[0].isIntersecting
            },
            { rootMargin: "25% 0px 25% 0px" }
        )
        io.observe(el)
        // eased scrub: the values glide toward the true scroll position (K per frame), so wheel steps never jump a pinned scene
        let rt = 0,
            rh = 0,
            vh = 1,
            fresh = false
        const read = () => {
            if (!vis && settled) {
                fresh = false
                return
            }
            const r = el.getBoundingClientRect()
            rt = r.top
            rh = r.height
            vh = window.innerHeight || 1
            fresh = true
        }
        const off = onTick(() => {
            if (!fresh) return
            const sp = clamp01((vh - rt) / (vh + rh))
            const pp = rh > vh * 1.05 ? clamp01(-rt / (rh - vh)) : sp
            if (cs < 0) {
                cs = sp
                cp = pp
            } else {
                cs += (sp - cs) * SCRUB_K
                cp += (pp - cp) * SCRUB_K
                if (Math.abs(sp - cs) < 0.0005) cs = sp
                if (Math.abs(pp - cp) < 0.0005) cp = pp
            }
            settled = cs === sp && cp === pp
            if (Math.abs(cs + cp - last) < 0.0003) return
            last = cs + cp
            el.style.setProperty("--sp", cs.toFixed(4))
            el.style.setProperty("--pp", cp.toFixed(4))
            if (cb) cb(cs, cp)
        }, read)
        return () => {
            off()
            io.disconnect()
        }
    }, [live, rm])
}
// STAGE — false while the loader or the page-transition cover is on screen (html.rw-hold-*), so first-screen intros play AFTER the cover lifts, never under it. 9 s safety.
function useStage(live: boolean) {
    const [r, setR] = useState(false)
    useEffect(() => {
        if (!live) return
        const h = document.documentElement
        const ok = () => !/(^|\s)rw-hold/.test(h.className)
        if (ok()) {
            setR(true)
            return
        }
        const mo = new MutationObserver(() => {
            if (ok()) {
                mo.disconnect()
                setR(true)
            }
        })
        mo.observe(h, { attributes: true, attributeFilter: ["class"] })
        const t = window.setTimeout(() => {
            mo.disconnect()
            setR(true)
        }, 9000)
        return () => {
            mo.disconnect()
            window.clearTimeout(t)
        }
    }, [live])
    return r
}
// true once the element has entered the viewport (stays true) — and only once the stage is clear. Reduced motion = true at once.
function useOn(
    ref: React.RefObject<HTMLElement | null>,
    live: boolean,
    rm: boolean,
    amount = 0.16
) {
    const [on, setOn] = useState(false)
    const still = useStill()
    const ready = useStage(live)
    useEffect(() => {
        if (!live) return
        if (rm) {
            setOn(true)
            return
        }
        if (!ready) return
        const el = ref.current
        if (!el) return
        let off = () => {}
        // keyboard focus: mark the section FIRST and flush styles, so the reveal that follows runs with instant transitions (a transition keeps the timing it started with)
        const fin = (e: Event) => {
            try {
                if ((e.target as Element).matches(":focus-visible")) {
                    el.setAttribute("data-kb", "")
                    void el.offsetWidth
                }
            } catch (x) {}
            setOn(true)
        }
        const fout = (e: any) => {
            if (!el.contains(e.relatedTarget as Node))
                el.removeAttribute("data-kb")
        }
        el.addEventListener("focusin", fin)
        el.addEventListener("focusout", fout)
        const io = new IntersectionObserver(
            (es) => {
                for (const e of es)
                    if (e.isIntersecting) {
                        io.disconnect()
                        // IO ignores occlusion: under a curtain (Reveal) wait until about a quarter of it is uncovered
                        off = onTick(() => {
                            const rev = el.closest(
                                ".rw-rev.is-act"
                            ) as HTMLElement | null
                            const rv = rev
                                ? parseFloat(
                                      rev.style.getPropertyValue("--rv") || "0"
                                  )
                                : 1
                            if (rv > 0.1) {
                                setOn(true)
                                off()
                            }
                        })
                    }
            },
            {
                threshold: Math.min(
                    amount,
                    Math.max(0.005, 80 / Math.max(1, el.offsetHeight))
                ),
                rootMargin: "0px",
            } /* 10-20: reveal once ~80px is in view */
        )
        io.observe(el)
        return () => {
            io.disconnect()
            off()
            el.removeEventListener("focusin", fin)
            el.removeEventListener("focusout", fout)
        }
    }, [live, rm, ready])
    return on || still
}
// CURTAIN REVEAL — the section is pinned BEHIND the one above it and is uncovered as that one lifts away (the footer movement, for any section).
// Wrapper = section + a spacer of T, pulled up by T (page length unchanged); the section is sticky for exactly T of scroll. T = min(section height, 100svh):
// a tall section pins at the top, a short one sits on the bottom edge of the viewport. The section ABOVE needs a higher Layer (z-index).
function Reveal({
    on,
    layer = 9,
    style,
    children,
}: {
    on: boolean
    layer?: number
    style?: CSSProperties
    children: any
}) {
    const live = useLive()
    const rm = useReduced()
    const wrap = useRef<HTMLDivElement>(null)
    const inner = useRef<HTMLDivElement>(null)
    const sp = useRef<HTMLDivElement>(null)
    const [h, setH] = useState(0)
    const act = on && live && !rm && h > 0
    useEffect(() => {
        if (!on || !live || rm || !inner.current) return
        const el = inner.current
        const m = () => setH(el.offsetHeight)
        m()
        const ro = new ResizeObserver(m)
        ro.observe(el)
        return () => ro.disconnect()
    }, [on, live, rm])
    useEffect(() => {
        if (!act || !wrap.current) return
        const el = wrap.current
        let vis = true,
            last = -1
        const io = new IntersectionObserver(
            (es) => {
                vis = es[0].isIntersecting
            },
            { rootMargin: "30% 0px 30% 0px" }
        )
        io.observe(el)
        let cur = -1,
            T = 0,
            vh = 1,
            top = 0,
            fresh = false
        const read = () => {
            if (!vis) {
                fresh = false
                return
            }
            T = sp.current ? sp.current.offsetHeight : 0
            vh = window.innerHeight
            top = el.getBoundingClientRect().top
            fresh = true
        }
        const off = onTick(() => {
            if (!fresh || !T) return
            const rv = clamp01((vh - T - top) / T)
            if (cur < 0) cur = rv
            else {
                cur += (rv - cur) * SCRUB_K
                if (Math.abs(rv - cur) < 0.0005) cur = rv
            }
            if (Math.abs(cur - last) < 0.0004) return
            last = cur
            el.style.setProperty("--rv", cur.toFixed(4))
        }, read)
        return () => {
            off()
            io.disconnect()
        }
    }, [act])
    return (
        <div
            ref={wrap}
            className={`rw-rev${act ? " is-act" : ""}`}
            style={{
                ...(style || {}),
                ["--h" as any]: `${h}px`,
                ["--layer" as any]: layer,
            }}
            onFocusCapture={(e) => {
                if (!act || !wrap.current) return
                const t = e.target as HTMLElement
                const w = window as any
                const r = wrap.current.getBoundingClientRect()
                const T = sp.current ? sp.current.offsetHeight : 0
                const y = Math.max(
                    0,
                    Math.min(
                        document.documentElement.scrollHeight -
                            window.innerHeight,
                        r.top + window.scrollY - window.innerHeight + 2 * T
                    )
                )
                if (Math.abs(window.scrollY - y) > 4) {
                    if (w.__ltLenis)
                        w.__ltLenis.scrollTo(y, {
                            immediate: true,
                            force: true,
                        })
                    else window.scrollTo(0, y)
                }
                requestAnimationFrame(() => {
                    try {
                        t.scrollIntoView({ block: "nearest" })
                    } catch (x) {}
                })
            }}
        >
            <div ref={inner} className="rw-rev-in">
                {children}
            </div>
            <div ref={sp} className="rw-rev-sp" aria-hidden />
        </div>
    )
}
const REVEAL_CONTROLS: any = {
    reveal: {
        type: ControlType.Boolean,
        title: "Reveal",
        description:
            "Curtain: this section waits behind the one above and is uncovered as that one lifts away",
        enabledTitle: "Curtain",
        disabledTitle: "Off",
        defaultValue: true,
    },
    layer: {
        type: ControlType.Number,
        title: "Layer",
        description:
            "Stacking order. Must be LOWER than the section above (sections default to 10)",
        min: 0,
        max: 20,
        step: 1,
        displayStepper: true,
        defaultValue: 9,
        hidden: (p: any) => p.reveal === false,
    },
}
const splitWords = (s: string) =>
    String(s || "")
        .replace(/\*([^*]+)\*/g, (_m: string, g: string) =>
            g
                .trim()
                .split(/\s+/)
                .map((w: string) => {
                    const m = w.match(/^(.*?)([.,!?;:’']*)$/)
                    return m && m[1] ? `*${m[1]}*${m[2]}` : w
                })
                .join(" ")
        )
        .split(/\s+/)
        .filter(Boolean)
        .map((t) => {
            const m = t.match(/^\*(.+?)\*([.,!?;:’']*)$/)
            return m
                ? { t: m[1], tail: m[2], acc: true }
                : { t: t.replace(/\*/g, ""), tail: "", acc: false }
        })
const plainOf = (s: string) =>
    String(s || "")
        .replace(/\*/g, "")
        .replace(/\s*\|\s*/g, " ")
        .replace(/\s+/g, " ")
        .trim()
// Heading whose words rise out of masks. "|" forces a line break, *word* = the accent: light-weight coral (deep coral mix on paper).
const Head = ({
    text,
    on,
    D,
    tag = "h2",
    size = "clamp(40px,4.8vw,72px)",
    lh = 0.92,
    delay = 0,
    step = 55,
    style,
    className,
}: {
    text: string
    on: boolean
    D: CSSProperties
    tag?: any
    size?: string
    lh?: number
    delay?: number
    step?: number
    style?: CSSProperties
    className?: string
}) => {
    const Tag = tag
    let k = 0
    return (
        <Tag
            className={`rw-hd${on ? " is-on" : ""}${className ? " " + className : ""}`}
            aria-label={plainOf(text)}
            style={{
                ...D,
                fontSize: typeof size === "number" ? Math.max(12, size) : size,
                lineHeight: lh,
                ...(style || {}),
            }}
        >
            {String(text)
                .split("|")
                .map((line, li) => (
                    <span key={li} className="rw-hd-l" aria-hidden>
                        {splitWords(line).map((w, i) => {
                            const d = delay + k++ * step
                            return (
                                <span
                                    key={i}
                                    className={`rw-hd-w${w.acc ? " is-accw" : ""}`}
                                >
                                    <span
                                        className={`rw-hd-i${w.acc ? " is-acc" : ""}`}
                                        style={{
                                            transitionDelay: `${d}ms`,
                                            ["--pd" as any]: `${d + 500}ms`,
                                        }}
                                    >
                                        {w.acc ? (
                                            <span className="rw-it">
                                                {w.t}
                                                {w.tail}
                                                <svg
                                                    className="rw-spark"
                                                    viewBox="0 0 24 24"
                                                    aria-hidden
                                                >
                                                    <path d="M12 1.5C12.9 8 16 11.1 22.5 12 16 12.9 12.9 16 12 22.5 11.1 16 8 12.9 1.5 12 8 11.1 11.1 8 12 1.5Z" />
                                                </svg>
                                            </span>
                                        ) : (
                                            <>
                                                {w.t}
                                                {w.tail}
                                            </>
                                        )}
                                    </span>{" "}
                                </span>
                            )
                        })}
                    </span>
                ))}
        </Tag>
    )
}
const Eyebrow = ({
    text,
    on,
    M,
    delay = 0,
    style,
}: {
    text: string
    on: boolean
    M: CSSProperties
    delay?: number
    style?: CSSProperties
}) =>
    text ? (
        <p
            className={`rw-eb${on ? " is-on" : ""}`}
            style={{ ...M, transitionDelay: `${delay}ms`, ...(style || {}) }}
        >
            <i aria-hidden />
            {text}
        </p>
    ) : null
// one-shot rise for copy / rows
const rise = (on: boolean, d = 0, y = 22): CSSProperties => ({
    opacity: on ? 1 : 0,
    translate: on ? "0 0" : `0 ${y}px`,
    transition: `opacity .9s ease ${d}ms, translate 1s cubic-bezier(.2,.8,.2,1) ${d}ms`,
})
// Image that UNMASKS through a shape as it enters, settles from a zoom, then drifts with scroll (needs --sp on an ancestor).
const SHAPES: Record<string, [string, string]> = {
    up: ["inset(100% 0 0 0)", "inset(0 0 0 0)"],
    down: ["inset(0 0 100% 0)", "inset(0 0 0 0)"],
    left: ["inset(0 100% 0 0)", "inset(0 0 0 0)"],
    right: ["inset(0 0 0 100%)", "inset(0 0 0 0)"],
    diag: [
        "polygon(0 100%,0 100%,0 100%,0 100%)",
        "polygon(0 -160%,260% 100%,0 100%,0 100%)",
    ],
    iris: ["circle(0% at 50% 55%)", "circle(85% at 50% 55%)"],
    arch: [
        "inset(100% 0 0 0 round 999px 999px 0 0)",
        "inset(0 0 0 0 round 999px 999px 0 0)",
    ],
    slit: ["inset(0 50% 0 50%)", "inset(0 0 0 0)"],
}
const Um = ({
    src,
    alt = "",
    on,
    shape = "up",
    ratio = "4/5",
    delay = 0,
    par = 1,
    focus = "50% 40%",
    radius = 4,
    sizes = "(max-width: 809px) 100vw, 50vw",
    style,
    className,
    eager = false,
}: {
    src: string
    alt?: string
    on: boolean
    shape?: string
    ratio?: string
    delay?: number
    par?: number
    focus?: string
    radius?: number
    sizes?: string
    style?: CSSProperties
    className?: string
    eager?: boolean
}) => {
    const sh = SHAPES[shape] || SHAPES.up
    const im = RS(src, sizes)
    return (
        <div
            className={`rw-um${on ? " is-on" : ""}${className ? " " + className : ""}`}
            style={{
                aspectRatio: ratio,
                borderRadius: radius,
                clipPath: on ? sh[1] : sh[0],
                WebkitClipPath: on ? sh[1] : sh[0],
                transitionDelay: `${delay}ms`,
                ["--par" as any]: par,
                ...(style || {}),
            }}
        >
            <img
                src={im.src}
                srcSet={(im as any).srcSet}
                sizes={(im as any).sizes}
                alt={alt}
                loading={eager ? "eager" : "lazy"}
                decoding="async"
                draggable={false}
                style={{ objectPosition: focus, transitionDelay: `${delay}ms` }}
            />
        </div>
    )
}
const CSS_MOTION = `
[data-kb] *,[data-kb] *::before,[data-kb] *::after{transition:none!important}
.rw-sec{position:relative;z-index:10;display:block;width:100%;--sp:.5;--pp:0}
.rw-rev{position:relative;width:100%;--rv:1} .rw-rev-in{position:relative} .rw-rev-sp{height:0}
.rw-rev.is-act{--rv:0;--t:min(var(--h),100vh);--t:min(var(--h),100svh);z-index:var(--layer,9);margin-top:calc(var(--t)*-1)}
.rw-rev.is-act>.rw-rev-in{position:sticky;top:calc(100vh - var(--t));top:calc(100svh - var(--t))} .rw-rev.is-act>.rw-rev-sp{height:var(--t)}
/* the lifting edge throws a shadow on the section beneath, and that section comes out of the dark as it is uncovered */
.rw-rev.is-act>.rw-rev-in::before{content:"";position:absolute;z-index:40;left:0;right:0;top:0;height:120px;translate:0 calc((1 - var(--rv))*var(--t));background:linear-gradient(180deg,rgba(0,0,0,.2),rgba(0,0,0,0));opacity:min(1,calc(var(--rv)*(1 - var(--rv))*9));pointer-events:none}
.rw-rev.is-act>.rw-rev-in::after{content:"";position:absolute;z-index:39;left:0;right:0;top:0;height:var(--t);background:#000;opacity:calc((1 - var(--rv))*.16);pointer-events:none}
.rw-wrap{--pad:56px;width:100%;max-width:calc(${MAXW} + var(--pad)*2);margin:0 auto;padding-left:var(--pad);padding-right:var(--pad)}
.rw-eb{display:inline-flex;align-items:center;gap:9px;width:max-content;max-width:100%;margin:0;padding:7px 13px 7px 11px;border-radius:999px;background:color-mix(in srgb,var(--rw-ink) 6%,transparent);box-shadow:inset 0 0 0 1px color-mix(in srgb,var(--rw-ink) 12%,transparent);color:var(--rw-ink);font-size:12px;font-weight:500;letter-spacing:.06em;opacity:0;translate:0 10px;transition:opacity .8s ease,translate .9s cubic-bezier(.2,.8,.2,1)} .rw-eb.is-on{opacity:1;translate:0 0}
.rw-eb i{display:block;flex:none;order:-1;width:7px;height:7px;border-radius:50%;background:var(--rw-brass)}
.rw-dark .rw-eb{color:var(--rw-cloud);background:color-mix(in srgb,var(--rw-cloud) 9%,transparent);box-shadow:inset 0 0 0 1px color-mix(in srgb,var(--rw-cloud) 18%,transparent)}
.rw-hd{margin:0;letter-spacing:-.042em;text-wrap:balance;font-weight:var(--rw-font-dw,600)} .rw-hd-l{display:block}
.rw-hd-w{display:inline-block;overflow:hidden;vertical-align:top;padding:0 .04em .12em;margin:0 -.04em -.12em;white-space:pre}
.rw-hd-i{position:relative;display:inline-block;translate:0 108%;transition:translate 1.05s cubic-bezier(.2,.85,.15,1)}
.rw-hd.is-on .rw-hd-i{translate:0 0}
.rw-hd-w.is-accw{overflow:hidden}
.rw-it{position:relative;color:var(--rw-acc);font-weight:300} .rw-dark .rw-it{color:var(--rw-brass)}
.rw-spark{display:none}

.rw-um{position:relative;overflow:hidden;transition:clip-path 1.35s cubic-bezier(.7,0,.2,1);background:color-mix(in srgb,var(--rw-stone) 22%,transparent)}
.rw-um img{position:absolute;left:0;top:-9%;width:100%;height:118%;display:block;object-fit:cover;scale:1.28;translate:0 calc((var(--sp,.5) - .5)*var(--par,1)*-7%);transition:scale 1.9s cubic-bezier(.16,.84,.24,1);user-select:none}
.rw-um.is-on img{scale:1}
/* diagonal cuts: the section hangs over its neighbour and is cut on a slope (clip-path, so the neighbour shows through) */
.rw-cut-t{margin-top:calc(var(--cut,7vw)*-1);clip-path:polygon(0 var(--cut,7vw),100% 0,100% 100%,0 100%);padding-top:var(--cut,7vw)}
.rw-cut-b{margin-bottom:calc(var(--cut,7vw)*-1);padding-bottom:var(--cut,7vw)}
.rw-cut-t.rw-cut-b{clip-path:polygon(0 var(--cut,7vw),100% 0,100% calc(100% - var(--cut,7vw)),0 100%)}
.rw-cut-b:not(.rw-cut-t){clip-path:polygon(0 0,100% 0,100% calc(100% - var(--cut,7vw)),0 100%)}
@media (max-width:1099px){.rw-wrap{--pad:32px}}
@media (max-width:699px){.rw-wrap{--pad:20px}}
:root{--g:56px}@media (max-width:1099px){:root{--g:32px}}@media (max-width:699px){:root{--g:20px}} /* 10-20 one gutter */
@media (prefers-reduced-motion:reduce){.rw-hd-i{translate:0 0!important} .rw-spark{scale:1!important;rotate:0deg!important;animation:none!important} .rw-um{clip-path:none!important} .rw-um img{scale:1!important;translate:0 0!important}}
`

// ===== REACHWISE CMS bridge (composed by mk.py after _reveal). Hidden Collection Lists in the Site Layout render one <span data-rw-row="kind" data-f1…> per CMS item on every page bound to that layout (server render included).
// Sections render the baked SEED (lockstep with cms-seed.json) on the server and on the first client render — no hydration diff — then a layout effect swaps in the live CMS rows before paint.
type CmsRow = Record<string, string>
const SEED: Record<string, CmsRow[]> = {
    site: [
        {
            slug: "site",
            f1: "Optenary",
            f2: "Digital Product & Technology Studio",
            f3: "Optenary designs and engineers websites, mobile applications, custom software, SaaS platforms and intelligent AI solutions.",
            f4: "hello@optenary.in",
            f5: "+91 93166 88014",
            f6: "/contact",
            f7: "India (HQ)",
            f8: "Asia/Kolkata",
            f9: "4.9",
            f10: "126",
            f11: "Instagram:https://www.instagram.com/optenary/,LinkedIn:https://www.linkedin.com/company/optenary/",
            f12: "WHERE TECHNOLOGY EVOLVES",
            f13: "Verified",
            n1: "1",
        },
    ],
    services: [
        {
            slug: "web-development",
            f1: "Web Development",
            f2: "High-performance web apps built to scale.",
            f3: "Modern React & Next.js architectures with clean TypeScript, sub-second TTFB, and fluid UX.",
            f4: "From $2,400",
            f5: "Full-Stack React & Next.js;TypeScript Architecture;API & Database Integration;Lighthouse 95+ Performance;CI/CD Deployment",
            f6: "web-dev",
            f7: "99+ Lighthouse Score",
            n1: "1",
        },
        {
            slug: "mobile-development",
            f1: "Mobile Applications",
            f2: "Native & cross-platform apps people love.",
            f3: "Smooth iOS & Android apps built with Flutter and React Native. Pixel-perfect, offline-ready, and fast.",
            f4: "From $3,500",
            f5: "iOS & Android Cross-Platform;Offline Data Sync;Push Notifications & Biometrics;App Store & Play Store Launch;Continuous Crash Monitoring",
            f6: "mobile",
            f7: "60fps Smooth UI",
            n1: "2",
        },
        {
            slug: "custom-software",
            f1: "Custom Software & SaaS",
            f2: "Software architected for your unique workflow.",
            f3: "Bespoke SaaS platforms, internal ERP dashboards, multi-tenant databases, and enterprise API ecosystems.",
            f4: "From $4,800",
            f5: "Multi-Tenant Architecture;Role-Based Access Control;Stripe / Razorpay Billing;Automated Background Workers;Enterprise Data Security",
            f6: "saas",
            f7: "99.9% Target Uptime",
            n1: "3",
        },
        {
            slug: "ai-agents-automation",
            f1: "AI Agents & Automation",
            f2: "Autonomous intelligence for modern business.",
            f3: "Self-operating AI agents, RAG document pipelines, custom LLM tool-calling, and automated workflow orchestrations.",
            f4: "From $2,800",
            f5: "Autonomous Agent Tool Calling;RAG Vector Search;Workflow Automation (Zapier/n8n);Private Model Hosting;Real-time Data Streaming",
            f6: "ai",
            f7: "Sub-second LLM Latency",
            n1: "4",
        },
        {
            slug: "web-design",
            f1: "UI/UX & Design Systems",
            f2: "Interfaces that turn users into advocates.",
            f3: "Comprehensive design systems in Figma translated directly into modular React component libraries.",
            f4: "From $2,000",
            f5: "Design System Tokens;Figma Interactive Prototypes;Responsive Breakpoint Systems;Micro-Interactions & Animations;Production React Tokens",
            f6: "design",
            f7: "Figma to Code 1:1",
            n1: "5",
        },
        {
            slug: "custom-ecommerce",
            f1: "Digital Commerce",
            f2: "E-commerce built for conversion and volume.",
            f3: "Headless commerce, Shopify Plus, and custom store architectures engineered for high-volume transactions.",
            f4: "From $3,200",
            f5: "Headless Storefronts;Multi-Currency & Tax;Inventory & ERP Sync;1-Click Checkout Flow;Cart Abandonment Recovery",
            f6: "commerce",
            f7: "< 1s Checkout Load",
            n1: "6",
        },
    ],
}
const SW_BUILD = "RwServiceGrid@cms1"
// An override control wins only when it holds real text; empty (or a single space) inherits from the CMS.
const pick = (o: any, fb: string) =>
    o !== undefined && o !== null && String(o).trim() ? String(o).trim() : fb
const imgOf = (r: CmsRow | undefined, k = "img") =>
    String((r && r[k]) || "").split("?")[0]
// A cleared CMS image draws this quiet placeholder — never a stock photo, and list positions stay aligned with their rows.
const EMPTY_IMG =
    "data:image/svg+xml;utf8," +
    encodeURIComponent(
        "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 500' preserveAspectRatio='xMidYMid slice'><rect width='400' height='500' fill='#D3D8E2'/><rect x='120' y='170' width='160' height='160' rx='8' fill='none' stroke='#AEB6C6' stroke-width='1.5'/><rect x='100' y='150' width='200' height='200' rx='10' fill='none' stroke='#C3CAD8' stroke-width='1' stroke-dasharray='2 6'/></svg>"
    )
const imgOr = (r: CmsRow | undefined, k = "img") => imgOf(r, k) || EMPTY_IMG
const cmsNum = (r: CmsRow | undefined, k: string, fb = 0) => {
    const v = parseFloat(String((r && r[k]) ?? ""))
    return isFinite(v) ? v : fb
}
const useIso = typeof window === "undefined" ? useEffect : useLayoutEffect
function readCMS(kind: string): CmsRow[] | null {
    if (typeof document === "undefined") return null
    if (!document.querySelector('[data-rw-row="bridge"]')) return null
    const seen = new Set<string>()
    const out: CmsRow[] = []
    document.querySelectorAll(`[data-rw-row="${kind}"]`).forEach((el) => {
        const o: CmsRow = {}
        for (const a of Array.from(el.attributes))
            if (a.name.startsWith("data-")) o[a.name.slice(5)] = a.value
        const key = o.slug || JSON.stringify(o)
        if (seen.has(key)) return
        seen.add(key)
        out.push(o)
    })
    return out.sort((a, b) => (parseFloat(a.n1) || 0) - (parseFloat(b.n1) || 0))
}
function useCMS(kind: string, fallback: CmsRow[]): CmsRow[] {
    const [rows, setRows] = useState<CmsRow[]>(fallback)
    const sig = useRef("")
    useIso(() => {
        let n = 0,
            t = 0,
            ok = 0
        try {
            const w = window as any
            if (!w.__ltCms || typeof w.__ltCms !== "object") w.__ltCms = {}
            w.__ltCms[SW_BUILD] = 1
        } catch (e) {}
        const pull = () => {
            const r = readCMS(kind)
            if (!r) return false
            const s = JSON.stringify(r)
            if (s !== sig.current) {
                sig.current = s
                setRows(r)
            }
            return true
        }
        const mo = new MutationObserver(() => {
            if (pull()) {
                ok++
                if (ok > 2) mo.disconnect()
            }
        })
        mo.observe(document.body, { childList: true, subtree: true })
        if (pull()) ok++
        const poll = () => {
            if (n++ < 30) {
                pull()
                t = window.setTimeout(poll, 150)
            }
        }
        t = window.setTimeout(poll, 150)
        return () => {
            mo.disconnect()
            window.clearTimeout(t)
        }
    }, [kind])
    return rows
}
// The one-row Site collection holds every agency-wide fact (name, contact, booking link, proof numbers). A section's "… Override" control only replaces it on that one section.
function useSite() {
    const r = useCMS("site", SEED.site || [])
    const s = r[0] || (SEED.site || [])[0] || {}
    const g = (k: string) => String(s[k] ?? "").trim()
    return {
        name: g("f1") || "Optenary",
        role: g("f2"),
        tagline: g("f3"),
        email: g("f4"),
        phone: g("f5"),
        book: g("f6") || "/contact",
        city: g("f7"),
        tz: g("f8") || "Asia/Kolkata",
        rating: g("f9") || "4.9",
        reviews: g("f10"),
        socials: g("f11"),
        announce: g("f12"),
        clients: g("f13"),
    }
}
const linkList = (s: string) =>
    String(s || "")
        .split(",")
        .map((x) => x.trim())
        .filter(Boolean)
        .map((x) => {
            const i = x.indexOf(":")
            return {
                l: i < 0 ? x : x.slice(0, i).trim(),
                h: i < 0 ? "/" : x.slice(i + 1).trim(),
            }
        })
const listOf = (s: string) =>
    String(s || "")
        .split(";")
        .map((x) => x.trim())
        .filter(Boolean)

// The row a CMS detail page is about: the bound Slug control wins (server render included), else the last URL segment, else the first row.
function useRow(kind: string, fallback: CmsRow[], slug?: string) {
    const rows = useCMS(kind, fallback)
    const [path, setPath] = useState("")
    useEffect(() => {
        try {
            setPath(
                decodeURIComponent(
                    window.location.pathname.split("/").filter(Boolean).pop() ||
                        ""
                )
            )
        } catch (e) {}
    }, [])
    const want = String(slug || "").trim() || path
    const row = rows.find((r) => r.slug === want) || rows[0] || ({} as CmsRow)
    return { row, rows }
}
const crumbs = (s: string) => linkList(s)

// Open now? Open Hours = "1-6 07:00-19:00" (weekday numbers, Mon = 1 … Sun = 7) evaluated in the Site Time Zone.
function openState(
    spec: string,
    tz: string
): { open: boolean; label: string } | null {
    try {
        const m = String(spec || "").match(
            /(\d)\s*-\s*(\d)\s+(\d{1,2}):(\d{2})\s*-\s*(\d{1,2}):(\d{2})/
        )
        if (!m) return null
        const parts = new Intl.DateTimeFormat("en-US", {
            timeZone: tz || "UTC",
            weekday: "short",
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
        }).formatToParts(new Date())
        const g = (t: string) =>
            (parts.find((p) => p.type === t) || { value: "" }).value
        const wd =
            ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].indexOf(
                g("weekday")
            ) + 1
        const mins = (Number(g("hour")) % 24) * 60 + Number(g("minute"))
        const d1 = Number(m[1]),
            d2 = Number(m[2]),
            a = Number(m[3]) * 60 + Number(m[4]),
            b = Number(m[5]) * 60 + Number(m[6])
        const open = wd >= d1 && wd <= d2 && mins >= a && mins < b
        return {
            open,
            label: open
                ? `Open · till ${m[5].padStart(2, "0")}:${m[6]}`
                : `Closed · opens ${m[3].padStart(2, "0")}:${m[4]}`,
        }
    } catch (e) {
        return null
    }
}

// ===== RwServiceGrid =====
export interface ServiceGridProps extends Partial<Pal> {
    customFonts?: boolean
    displayFont?: any
    bodyFont?: any
    monoFont?: any
    bpHint?: string
    eyebrow?: string
    heading?: string
    intro?: string
    button?: string
    buttonLink?: string
    fromLabel?: string
    exploreLabel?: string
    liveLabel?: string
    waitLabel?: string
    replayLabel?: string
    includesCount?: number
    seoQuery?: string
    socialHandle?: string
    socialPhoto?: any
    adsHeadline?: string
    articleTitle?: string
    webUrl?: string
    brandName?: string
    style?: CSSProperties
    [key: string]: any
}
// ---- THE CHANNEL WALL (/services): every Services row as a large card in two offset columns. Each card carries the channel's LIVE mini-UI.
// Scroll mechanic: a card waits in grey ("waiting for signal") until its top crosses 70% of the viewport; then a lime REACH RIPPLE expands out of
// its top-left corner, the stage blooms into colour and the mini-UI starts. Hover: the card lifts, a smaller ripple pings and the mini-UI replays at 2×. ----
const SG_PHOTO =
    "https://framerusercontent.com/images/xbfdpTvZzzafiJOwtXCs0luyp2I.webp"
const SG_TONES = ["fog", "lime", "cloud", "ink", "fog", "lime"]
// step counter: 0 → n over time while `run`, else the final step at once

function useSgStep(n: number, ms: number, run: any, delay = 350) {
    const [s, setS] = useState(run ? 0 : n)
    useEffect(() => {
        if (run === "wait") {
            setS(0)
            return
        }
        if (!run) {
            setS(n)
            return
        }
        setS(0)
        let k = 0,
            iv = 0
        const t = window.setTimeout(() => {
            iv = window.setInterval(() => {
                k++
                setS(k)
                if (k >= n) window.clearInterval(iv)
            }, ms)
        }, delay)
        return () => {
            window.clearTimeout(t)
            window.clearInterval(iv)
        }
    }, [run, n])
    return s
}
// eased count a → b while `run` (final value at once otherwise)
function useSgCount(a: number, b: number, dur: number, run: any, delay = 300) {
    const [v, setV] = useState(run ? a : b)
    useEffect(() => {
        if (run === "wait") {
            setV(a)
            return
        }
        if (!run) {
            setV(b)
            return
        }
        setV(a)
        let raf = 0
        const t0 = performance.now() + delay
        const f = (t: number) => {
            const p = clamp01((t - t0) / dur)
            setV(a + (b - a) * (1 - Math.pow(1 - p, 3)))
            if (p < 1) raf = requestAnimationFrame(f)
        }
        raf = requestAnimationFrame(f)
        return () => cancelAnimationFrame(raf)
    }, [run, a, b])
    return v
}
const SgHeart = () => (
    <svg viewBox="0 0 24 24" aria-hidden>
        <path
            fill="currentColor"
            d="M12 20.5S3.5 15.4 3.5 9.4A4.4 4.4 0 0 1 12 7.3a4.4 4.4 0 0 1 8.5 2.1c0 6-8.5 11.1-8.5 11.1z"
        />
    </svg>
)
const SgMark = ({ s = 26 }: { s?: number }) => (
    <svg width={s} height={s} viewBox="0 0 32 32" aria-hidden>
        <circle cx="16" cy="16" r="15" fill="var(--rw-brass)" />
        <circle cx="16" cy="16" r="3.4" fill="var(--rw-ink)" />
        <path
            d="M10.2 21.8a8.2 8.2 0 0 1 0-11.6M21.8 10.2a8.2 8.2 0 0 1 0 11.6"
            fill="none"
            stroke="var(--rw-ink)"
            strokeWidth="2.4"
            strokeLinecap="round"
        />
    </svg>
)
type SgCfg = {
    seoQuery: string
    socialHandle: string
    photo: string
    adsHeadline: string
    articleTitle: string
    webUrl: string
    brandName: string
}
type SgP = {
    run: any
    spd?: number
    cfg: SgCfg
    M: CSSProperties
    D: CSSProperties
}
// 01. Web Development: Next.js IDE + Live Build & 100/100 Lighthouse Gauge
const SgWebDev = ({ run, M, D, spd = 1 }: SgP) => {
    const step = useSgStep(3, 700 / spd, run, 350);
    const score = useSgCount(88, 100, 1600 / spd, run, 400);
    return (
        <div className="rwsg-ui rwsv-webdev">
            <div className="rwsv-dev-bar" style={M}>
                <div className="rwsv-dev-dots" aria-hidden>
                    <span style={{ background: "#FF5F56" }} />
                    <span style={{ background: "#FFBD2E" }} />
                    <span style={{ background: "#27C93F" }} />
                </div>
                <span className="rwsv-dev-pill">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.65 }}>
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                    optenary.in/app · Next.js 15
                </span>
                <span className="rwsv-dev-badge">● Production</span>
            </div>
            <div className="rwsv-dev-code">
                <div className="rwsv-dev-tab" style={M}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="16 18 22 12 16 6" />
                        <polyline points="8 6 2 12 8 18" />
                    </svg>
                    <span>Page.tsx</span>
                    <span className="rwsv-dev-ts">TSX</span>
                </div>
                <div className="rwsv-dev-lines">
                    <div className="rwsv-dev-ln">
                        <span className="rwsv-dev-num">1</span>
                        <span className="rwsv-dev-c"><span style={{ color: "var(--rw-brass)" }}>import</span> &#123; createEngine &#125; <span style={{ color: "var(--rw-brass)" }}>from</span> <span style={{ color: "#0284C7" }}>'@optenary/web'</span></span>
                    </div>
                    <div className="rwsv-dev-ln">
                        <span className="rwsv-dev-num">2</span>
                        <span className="rwsv-dev-c"><span style={{ color: "var(--rw-brass)" }}>import</span> &#123; Cache, Vitals &#125; <span style={{ color: "var(--rw-brass)" }}>from</span> <span style={{ color: "#0284C7" }}>'@optenary/perf'</span></span>
                    </div>
                    <div className="rwsv-dev-ln">
                        <span className="rwsv-dev-num">3</span>
                        <span className="rwsv-dev-c"><span style={{ color: "var(--rw-brass)" }}>export default async function</span> <span style={{ color: "#2563EB" }}>WebEngine</span>() &#123;</span>
                    </div>
                    <div className="rwsv-dev-ln">
                        <span className="rwsv-dev-num">4</span>
                        <span className="rwsv-dev-c">&nbsp;&nbsp;<span style={{ color: "var(--rw-brass)" }}>const</span> app = <span style={{ color: "var(--rw-brass)" }}>await</span> createEngine(&#123; <span style={{ color: "#0284C7" }}>ttfb</span>: <span style={{ color: "#D97706" }}>'24ms'</span> &#125;)</span>
                    </div>
                    <div className="rwsv-dev-ln">
                        <span className="rwsv-dev-num">5</span>
                        <span className="rwsv-dev-c">&nbsp;&nbsp;<span style={{ color: "var(--rw-brass)" }}>return</span> &lt;<span style={{ color: "#059669" }}>NextApp</span> <span style={{ color: "#0284C7" }}>cache</span>=<span style={{ color: "#D97706" }}>"edge"</span> <span style={{ color: "#0284C7" }}>vitals</span>=&#123;<span style={{ color: "#DB2777" }}>100</span>&#125;&gt;</span>
                    </div>
                    <div className="rwsv-dev-ln">
                        <span className="rwsv-dev-num">6</span>
                        <span className="rwsv-dev-c">&nbsp;&nbsp;&nbsp;&nbsp;&lt;<span style={{ color: "#059669" }}>Shield</span> <span style={{ color: "#0284C7" }}>ssl</span>=<span style={{ color: "#D97706" }}>"tls-1.3"</span> /&gt;</span>
                    </div>
                    <div className="rwsv-dev-ln">
                        <span className="rwsv-dev-num">7</span>
                        <span className="rwsv-dev-c">&nbsp;&nbsp;&lt;/<span style={{ color: "#059669" }}>NextApp</span>&gt;</span>
                    </div>
                    <div className="rwsv-dev-ln">
                        <span className="rwsv-dev-num">8</span>
                        <span className="rwsv-dev-c">&#125;<i className="rwsv-dev-cursor" /></span>
                    </div>
                </div>
                <div className="rwsv-dev-term">
                    <span style={{ color: "#16A34A" }}>✓</span>
                    <span>Ready in 120ms · 100% TypeScript · 0 errors</span>
                </div>
            </div>
            <div className="rwsv-dev-perf">
                <div className="rwsv-dev-gauge">
                    <div className="rwsv-dev-circle">
                        <svg viewBox="0 0 36 36" className="rwsv-dev-circ-svg">
                            <path
                                className="rwsv-dev-circ-bg"
                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            />
                            <path
                                className="rwsv-dev-circ-val"
                                strokeDasharray={`${Math.round(score)}, 100`}
                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            />
                        </svg>
                        <span className="rwsv-dev-score" style={D}>{Math.round(score)}</span>
                    </div>
                    <div className="rwsv-dev-gauge-txt">
                        <strong style={D}>Lighthouse Score</strong>
                        <span style={M}>Performance · 100/100</span>
                    </div>
                </div>
                <div className="rwsv-dev-stats">
                    <div className="rwsv-dev-stat">
                        <span style={M}>TTFB</span>
                        <b style={D}>24 ms</b>
                    </div>
                    <div className="rwsv-dev-stat">
                        <span style={M}>FCP</span>
                        <b style={D}>0.3 s</b>
                    </div>
                    <div className="rwsv-dev-stat">
                        <span style={M}>BUILD</span>
                        <b style={D} style={{ color: "#16A34A" }}>READY</b>
                    </div>
                </div>
            </div>
            <p className={`rwsg-toast rwsv-dev-toast${step >= 2 ? " is-on" : ""}`} style={M}>
                <i />
                ⚡ 100/100 Lighthouse · Sub-second TTFB
            </p>
        </div>
    )
}

// 02. Mobile Applications: Cross-Platform Smartphone UI + 60fps Telemetry
const SgMobile = ({ run, M, D, spd = 1 }: SgP) => {
    const push = useSgStep(1, 400 / spd, run, 600);
    return (
        <div className="rwsg-ui rwsv-mobile">
            <div className="rwsv-mob-phone">
                <div className="rwsv-mob-island">
                    <span style={M}>9:41</span>
                    <i />
                </div>
                <div className="rwsv-mob-screen">
                    <div className="rwsv-mob-header" style={M}>
                        <span>Optenary Mobile</span>
                        <span>iOS & Android</span>
                    </div>
                    <div className="rwsv-mob-hero">
                        <span style={M}>TELEMETRY STREAM</span>
                        <strong style={D}>60 FPS Native UI</strong>
                    </div>
                    <div className="rwsv-mob-grid">
                        <div className="rwsv-mob-card">
                            <span style={M}>OFFLINE SYNC</span>
                            <b style={D}>Ready</b>
                        </div>
                        <div className="rwsv-mob-card">
                            <span style={M}>CRASH RATE</span>
                            <b style={D}>&lt; 0.01%</b>
                        </div>
                    </div>
                    <div className="rwsv-mob-push" style={M}>
                        <span style={{ color: "var(--rw-brass)" }}>●</span>
                        <span>Push: Real-time data synced</span>
                    </div>
                </div>
            </div>
            <p className={`rwsg-toast${push ? " is-on" : ""}`} style={M}>
                <i />
                📱 60fps Native UI · Cross-Platform
            </p>
        </div>
    )
}

// 03. Custom Software & SaaS: Multi-Tenant Architecture & Event Stream
const SgSaaS = ({ run, M, D, spd = 1 }: SgP) => {
    const pop = useSgStep(2, 500 / spd, run, 450);
    return (
        <div className="rwsg-ui rwsv-saas">
            <div className="rwsv-saas-bar" style={M}>
                <span>SaaS Admin Console · Multi-Tenant</span>
                <span style={{ color: "#16A34A", fontWeight: 700 }}>● 99.98% Uptime</span>
            </div>
            <div className="rwsv-saas-body">
                <div className="rwsv-saas-metrics">
                    <div className="rwsv-saas-box">
                        <span style={M}>TENANTS</span>
                        <b style={D}>428 Active</b>
                    </div>
                    <div className="rwsv-saas-box">
                        <span style={M}>THROUGHPUT</span>
                        <b style={D}>14.2k req/s</b>
                    </div>
                    <div className="rwsv-saas-box">
                        <span style={M}>SECURITY</span>
                        <b style={D}>RBAC Valid</b>
                    </div>
                </div>
                <div className="rwsv-saas-feed">
                    <div className="rwsv-saas-row">
                        <b style={{ color: "#16A34A" }}>✓</b>
                        <span>[09:42:15] Tenant_104 auth success · DB isolated</span>
                    </div>
                    <div className="rwsv-saas-row">
                        <b style={{ color: "#0284C7" }}>●</b>
                        <span>[09:42:16] Stripe subscription webhook processed</span>
                    </div>
                    <div className="rwsv-saas-row">
                        <b style={{ color: "#16A34A" }}>✓</b>
                        <span>[09:42:17] Background queue: 0 pending jobs (18ms)</span>
                    </div>
                </div>
            </div>
            <p className={`rwsg-toast${pop >= 1 ? " is-on" : ""}`} style={M}>
                <i />
                🛡️ 99.9% Target Uptime · Multi-Tenant
            </p>
        </div>
    )
}

// 04. AI Agents & Automation: Autonomous Pipeline & Tool Calling
const SgAI = ({ run, M, D, spd = 1 }: SgP) => {
    const step = useSgStep(3, 600 / spd, run, 400);
    return (
        <div className="rwsg-ui rwsv-ai">
            <div className="rwsv-saas-bar" style={M}>
                <span>AI Agent Pipeline · Tool Calling</span>
                <span style={{ color: "var(--rw-brass)", fontWeight: 700 }}>● Agent Active</span>
            </div>
            <div className="rwsv-ai-pipe">
                <div className={`rwsv-ai-step ${step >= 0 ? "is-active" : ""}`}>
                    <i className="rwsv-ai-dot" />
                    <div className="rwsv-ai-content">
                        <strong style={D}>Prompt Received</strong>
                        <span style={M}>"Synthesize quarterly analytics & notify ERP"</span>
                    </div>
                </div>
                <div className={`rwsv-ai-step ${step >= 1 ? "is-active" : ""}`}>
                    <i className="rwsv-ai-dot" />
                    <div className="rwsv-ai-content">
                        <strong style={D}>Tool: db_query() Executed</strong>
                        <span style={M}>Retrieved 24 rows from PostgreSQL in 14ms</span>
                    </div>
                </div>
                <div className={`rwsv-ai-step ${step >= 2 ? "is-active" : ""}`}>
                    <i className="rwsv-ai-dot" />
                    <div className="rwsv-ai-content">
                        <strong style={D}>Vector RAG & Streaming</strong>
                        <span style={M}>Embedded 8 docs · 48 tokens/sec streaming</span>
                    </div>
                </div>
            </div>
            <p className={`rwsg-toast${step >= 2 ? " is-on" : ""}`} style={M}>
                <i />
                🤖 Autonomous Tool Calling · Sub-second
            </p>
        </div>
    )
}

// 05. UI/UX & Design Systems: Interactive Web & Component Prototype
const SgDesign = ({ cfg, M }: SgP) => (
    <div className="rwsg-ui rwsv-web">
        <div className="rwsv-br">
            <div className="rwsv-chrome">
                <i />
                <i />
                <i />
                <span style={M}>Figma to Code 1:1 · Design Tokens</span>
            </div>
            <div className="rwsv-vp">
                <div className="rwsv-page">
                    <span className="rwsv-pg-nav">
                        <i />
                        <i />
                        <i />
                        <i />
                    </span>
                    <span className="rwsv-pg-h">
                        <i />
                        <i />
                        <i />
                    </span>
                    <span className="rwsv-pg-b" />
                    <span className="rwsv-pg-img" />
                    <span className="rwsv-pg-row">
                        <i />
                        <i />
                        <i />
                    </span>
                </div>
                <i className="rwsv-cur" aria-hidden />
            </div>
            <span className="rwsv-conv" style={M}>
                Figma to React 1:1 ▲
            </span>
        </div>
    </div>
)

// 06. Digital Commerce: Real 1-Click Checkout & High-Volume Inventory Sync
const SgCommerce = ({ run, M, D, spd = 1 }: SgP) => {
    const step = useSgStep(3, 750 / spd, run, 450);
    return (
        <div className="rwsg-ui rwsv-commerce">
            <div className="rwsv-com-bar" style={M}>
                <span>store.optenary.in · Headless Commerce</span>
                <span style={{ color: "#16A34A", fontWeight: 700 }}>● 1-Click Pay</span>
            </div>
            <div className="rwsv-com-card">
                <div className="rwsv-com-prod">
                    <div className="rwsv-com-thumb">⚡</div>
                    <div className="rwsv-com-meta">
                        <strong style={D}>Cloud Storefront Tier 1</strong>
                        <span style={M}>Headless Architecture · Shopify Plus</span>
                    </div>
                    <div className="rwsv-com-price" style={D}>$3,200</div>
                </div>
                <div className="rwsv-com-row" style={M}>
                    <span>SUBTOTAL</span>
                    <b>$3,200.00</b>
                </div>
                <div className="rwsv-com-row" style={M}>
                    <span>TAX &amp; MULTI-CURRENCY</span>
                    <b>Auto Calculated ($0.00)</b>
                </div>
                <div className={`rwsv-com-btn ${step >= 2 ? "is-success" : ""}`} style={M}>
                    {step === 0 && " Pay / 1-Click Express Checkout"}
                    {step === 1 && "Processing Tokenized Payment..."}
                    {step >= 2 && "✓ Payment Authorized · Order #8492"}
                </div>
            </div>
            <p className={`rwsg-toast${step >= 2 ? " is-on" : ""}`} style={M}>
                <i />
                ⚡ &lt; 1s Checkout Load · High-Volume Ready
            </p>
        </div>
    )
}

// Master UI Dispatcher
const SgUI = ({ kind, ...p }: SgP & { kind: string }) => {
    const k = String(kind || "").toLowerCase()
    const C =
        k === "web-dev" || k === "seo" || k === "web-development"
            ? SgWebDev
            : k === "mobile" || k === "social" || k === "mobile-development"
              ? SgMobile
              : k === "saas" || k === "content" || k === "custom-software"
                ? SgSaaS
                : k === "ai" || k === "ads" || k === "ai-agents-automation"
                  ? SgAI
                  : k === "commerce" || k === "brand" || k === "custom-ecommerce"
                    ? SgCommerce
                    : SgDesign
    return <C {...p} />
}

export default function RwServiceGrid(props: Partial<ServiceGridProps> = {}) {
    const {
        eyebrow = "(01) Core Services",
        heading = "Pick one capability,|or *an end-to-end stack*.",
        intro = "Every solution below is architected by dedicated engineers, documented with clean architecture, and built with modern tech. Scale seamlessly from MVP to enterprise.",
        button = "Start a project",
        buttonLink = "/contact",
        fromLabel = "From",
        exploreLabel = "Explore",
        liveLabel = "Live",
        waitLabel = "Waiting for signal",
        replayLabel = "Hover a card to replay it",
        includesCount = 3,
        seoQuery = "dentist near me",
        socialHandle = "@optenary",
        socialPhoto,
        adsHeadline = "Free whitening with every new-patient visit",
        articleTitle = "How to rank #1 for “near me” searches",
        webUrl = "yoursite.com/offer",
        brandName = "Optenary",
        bpHint = "auto",
    } = props

    const c = colorsOf(props)
    const { D, B, M } = fontsOf(props)
    useFonts()
    const live = useLive()
    const rm = useReduced()
    const still = useStill()
    const site = useSite()
    const services = useCMS("services", SEED.services || [])
    const k = services.length
    const root = useRef<HTMLElement>(null)
    const grid = useRef<HTMLDivElement>(null)
    const { w } = useSize(root, bpHint)
    const phone = w < 810
    const tab = w >= 810 && w < 1100
    const on = useOn(root, live, rm, 0.05)
    useMagnet(root, live)
    const final = still || rm || !live
    const cfg = {
        seoQuery,
        socialHandle,
        photo: srcOf(socialPhoto, "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=600&q=80"),
        adsHeadline,
        articleTitle,
        webUrl,
        brandName,
    }
    const book = pick(buttonLink, site.book || "/contact")
    const [hits, setHits] = useState<boolean[]>([])
    const hitRef = useRef<boolean[]>([])

    useEffect(() => {
        if (final || !grid.current) return
        const el = grid.current
        let tops: number[] = []
        let vh = 1
        let vis = true
        const io = new IntersectionObserver(
            (entries) => {
                vis = entries[0].isIntersecting
            },
            { rootMargin: "30% 0px 30% 0px" }
        )
        io.observe(el)
        const off = onTick(
            () => {
                if (!vis || !tops.length) return
                let changed = false
                const next = tops.map((top, idx) => {
                    const isHit = !!hitRef.current[idx] || top < vh * 0.7
                    if (isHit !== !!hitRef.current[idx]) changed = true
                    return isHit
                })
                if (changed) {
                    hitRef.current = next
                    setHits(next)
                }
            },
            () => {
                if (vis) {
                    vh = window.innerHeight || 1
                    tops = Array.from(el.querySelectorAll(".rwsg-card")).map(
                        (c: any) => c.getBoundingClientRect().top
                    )
                }
            }
        )
        return () => {
            off()
            io.disconnect()
        }
    }, [final, k])

    const [replays, setReplays] = useState<number[]>([])
    const lastReplay = useRef<number[]>([])
    const replay = (idx: number) => {
        if (final || !hitRef.current[idx]) return
        const now = performance.now()
        if (now - (lastReplay.current[idx] || 0) < 2600) return
        lastReplay.current[idx] = now
        setReplays((prev) => {
            const next = prev.slice()
            next[idx] = (next[idx] || 0) + 1
            return next
        })
    }

    return (
        <section
            ref={root as any}
            className={`rw rw-sec rwsg${phone ? " is-ph" : tab ? " is-tab" : ""}${on ? " is-on" : ""}${final ? " is-fin" : ""}`}
            style={{ ...cssVars(c), ...B, ...(props.style || {}) }}
        >
            <link rel="stylesheet" href={FONTS} />
            <style
                dangerouslySetInnerHTML={{
                    __html: CSS_BASE + CSS_MOTION + CSS_SG + siteFontCss(props),
                }}
            />
            <div className="rw-wrap">
                <header className="rwsg-head">
                    <div className="rwsg-hl">
                        <Eyebrow text={eyebrow} on={on} M={M} />
                        <Head
                            text={heading}
                            on={on}
                            D={D}
                            size={
                                phone
                                    ? "clamp(40px,11vw,48px)"
                                    : "clamp(40px,4.6vw,68px)"
                            }
                            lh={0.95}
                            delay={80}
                        />
                    </div>
                    <div className="rwsg-hr" style={rise(on, 300, 14)}>
                        {intro && <p>{intro}</p>}
                        {button && (
                            <Btn href={book} label={button} kind="ghost" icon="cal" />
                        )}
                    </div>
                </header>
                {k > 0 && (
                    <div ref={grid} className="rwsg-grid">
                        {services.map((s: any, idx: number) => {
                            const hit = final || !!hits[idx]
                            const theme = THEMES[idx % THEMES.length]
                            const inc = (s.f5 || "")
                                .split(";")
                                .map((t: string) => t.trim())
                                .filter(Boolean)
                                .slice(0, Math.max(0, Math.round(includesCount)))
                            const no = String(idx + 1).padStart(2, "0")
                            const run = final ? false : hit ? true : "wait"
                            return (
                                <article
                                    key={s.slug || idx}
                                    className={`rwsg-card t-${theme}${hit ? " is-hit" : ""}`}
                                    onPointerEnter={() => replay(idx)}
                                    style={{ "--i": idx } as any}
                                >
                                    <i className="rwsg-rip" aria-hidden>
                                        <b />
                                        <b />
                                        <b className="rwsg-hov" />
                                    </i>
                                    <div className="rwsg-stage" aria-hidden>
                                        <SgUI
                                            key={`${hit ? "h" : "w"}${replays[idx] || 0}`}
                                            kind={s.f6}
                                            run={run}
                                            spd={replays[idx] ? 2 : 1}
                                            cfg={cfg}
                                            M={M}
                                            D={D}
                                        />
                                        <span className="rwsg-st" style={M}>
                                            <i />
                                            {hit ? liveLabel : waitLabel}
                                            <em>{s.f1}</em>
                                        </span>
                                        <span className="rwsg-no" style={M}>
                                            {no}
                                        </span>
                                    </div>
                                    <div className="rwsg-tx">
                                        <div className="rwsg-tt">
                                            <h2 style={D}>
                                                <a
                                                    href={`/services/${s.slug || ""}`}
                                                    style={{
                                                        color: "inherit",
                                                        textDecoration: "none",
                                                        cursor: "pointer",
                                                    }}
                                                >
                                                    {s.f1}
                                                </a>
                                            </h2>
                                            {s.f7 && (
                                                <span className="rwsg-stat" style={M}>
                                                    <i />
                                                    {s.f7}
                                                </span>
                                            )}
                                        </div>
                                        {s.f2 && <p className="rwsg-short">{s.f2}</p>}
                                        {s.f3 && <p className="rwsg-body">{s.f3}</p>}
                                        {inc.length > 0 && (
                                            <ul className="rwsg-inc">
                                                {inc.map((item: string, j: number) => (
                                                    <li key={j} style={{ "--j": j } as any}>
                                                        <svg viewBox="0 0 24 24" aria-hidden>
                                                            <circle cx="12" cy="12" r="11" />
                                                            <path
                                                                d="M6.5 12.5l3.8 3.8 7.2-8"
                                                                pathLength={1}
                                                            />
                                                        </svg>
                                                        {item}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                        <div className="rwsg-foot">
                                            {s.f4 && (
                                                <p className="rwsg-pr" style={M}>
                                                    <small>{fromLabel}</small>
                                                    <span>{s.f4}</span>
                                                </p>
                                            )}
                                            <Btn
                                                href={`/services/${s.slug || ""}`}
                                                label={exploreLabel}
                                                kind="ghost"
                                                sub={s.f1}
                                            />
                                        </div>
                                    </div>
                                </article>
                            )
                        })}
                    </div>
                )}
                {k > 0 && replayLabel && !phone && (
                    <p className="rwsg-hint" style={{ ...M, ...rise(on, 500, 8) }}>
                        <i aria-hidden />
                        {replayLabel}
                    </p>
                )}
            </div>
        </section>
    )
}

addPropertyControls(RwServiceGrid, {
    eyebrow: { type: ControlType.String, title: "Eyebrow", defaultValue: "(01) All channels" },
    heading: { type: ControlType.String, title: "Heading", defaultValue: "Pick one channel,|or *all six*." },
    intro: {
        type: ControlType.String,
        title: "Intro",
        displayTextArea: true,
        defaultValue: "Every channel below is run by a senior specialist, reported in one dashboard and billed as one monthly retainer. Mix them as you grow.",
    },
    button: { type: ControlType.String, title: "Button", defaultValue: "Book a call" },
    buttonLink: { type: ControlType.String, title: "Button Link", defaultValue: "" },
})
