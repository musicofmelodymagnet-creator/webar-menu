import Link from "next/link";
import { LandingModel } from "@/components/landing-model";
import { ScrollReveal } from "@/components/scroll-reveal";
import { ThemeToggle } from "@/components/theme-toggle";

// Update this to any active dish GLB on the server
const DEMO_GLB = "/uploads/models/350b84c910b32ff7ee35966d.glb";
// Update this before going live
const CONTACT_EMAIL = "admin@verunsky.pp.ua";

const c = {
  bg:        "var(--c-bg)",
  surf:      "var(--c-surf)",
  surf2:     "var(--c-surf2)",
  border:    "var(--c-border)",
  borderHi:  "var(--c-borderHi)",
  text:      "var(--c-text)",
  sub:       "var(--c-sub)",
  muted:     "var(--c-muted)",
  dim:       "var(--c-dim)",
  accent:    "var(--c-accent)",
  accentLo:  "var(--c-accentLo)",
  accentMid: "var(--c-accentMid)",
  accentBrd: "var(--c-accentBrd)",
  base:      "var(--c-base)",
} as const;

const fd = "var(--font-display, system-ui, sans-serif)";
const fb = "var(--font-body, system-ui, sans-serif)";

const PhoneIcon = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
    <rect x="6.5" y="2" width="9" height="18" rx="2.5" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M9.5 5.5h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="11" cy="17.25" r="0.9" fill="currentColor"/>
  </svg>
);

const GearIcon = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
    <circle cx="11" cy="11" r="3" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M11 4v1.5M11 16.5V18M4 11h1.5M16.5 11H18M5.93 5.93l1.06 1.06M14.94 14.94l1.06 1.06M5.93 16.07l1.06-1.06M14.94 7.06l1.06-1.06" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const PlusIcon = () => (
  <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
    <path d="M6.5 2v9M2 6.5h9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
  </svg>
);

const marqueeItems = [
  "No app download",
  "AR Quick Look",
  "WebXR on Android",
  "GLB upload",
  "USDZ auto-generated",
  "iOS Safari",
  "Android Chrome",
  "QR per dish",
  "Zero install",
  "3D on the table",
];

const steps = [
  {
    n: "01",
    title: "Upload your 3D models",
    body: "Add dishes in the admin panel. Drop a GLB file, give the dish a name. USDZ for iOS is generated automatically from the same file.",
  },
  {
    n: "02",
    title: "Print the QR codes",
    body: "Every dish gets its own unique URL and QR code, ready for table cards, menus, or any printed material.",
  },
  {
    n: "03",
    title: "Guests scan and see",
    body: "Point the phone at the QR. The dish appears floating on the table in 3D. Tap to switch to AR and place it on the actual surface.",
  },
];

const tiers = [
  {
    tier: "Starter",
    desc: "Single restaurant trying AR menus for the first time.",
    features: ["1 restaurant", "Up to 10 dishes", "Admin panel", "QR per dish", "iOS and Android AR"],
    cta: "Get in touch",
    highlight: false,
  },
  {
    tier: "Pro",
    desc: "Growing restaurants that need more dishes and locations.",
    features: ["Up to 5 restaurants", "Unlimited dishes", "All Starter features", "Priority support", "Custom slugs"],
    cta: "Get in touch",
    highlight: true,
  },
  {
    tier: "Enterprise",
    desc: "Restaurant chains and hospitality groups with custom needs.",
    features: ["Unlimited restaurants", "Dedicated instance", "SLA and uptime", "Custom domain", "Onboarding"],
    cta: "Contact us",
    highlight: false,
  },
];

export default function LandingPage() {
  return (
    <div style={{ background: c.bg, minHeight: "100vh", color: c.text, fontFamily: fb }}>
      <style>{`
        /* ── Theme: dark (default) ──────────────────────────────── */
        :root {
          --c-bg:        oklch(0.09 0.005 35);
          --c-surf:      oklch(0.13 0.006 35);
          --c-surf2:     oklch(0.18 0.006 35);
          --c-border:    oklch(0.22 0.006 35);
          --c-borderHi:  oklch(0.30 0.005 35);
          --c-text:      oklch(0.95 0.004 48);
          --c-sub:       oklch(0.76 0.006 48);
          --c-muted:     oklch(0.52 0.008 48);
          --c-dim:       oklch(0.34 0.005 48);
          --c-accent:    oklch(0.67 0.19 48);
          --c-accentLo:  oklch(0.67 0.19 48 / 0.08);
          --c-accentMid: oklch(0.67 0.19 48 / 0.20);
          --c-accentBrd: oklch(0.67 0.19 48 / 0.35);
          --c-accentHi:  oklch(0.67 0.19 48 / 0.55);
          --c-base:      oklch(0.06 0.003 35);
          --c-nav:       oklch(0.09 0.005 35 / 0.90);
          --c-sect:      oklch(0.095 0.005 35);
          --c-mq:        oklch(0.10 0.005 35);
          --c-glow-a:    oklch(0.67 0.19 48 / 0.065);
          --c-glow-b:    oklch(0.67 0.19 48 / 0.04);
          --c-glow-ph:   oklch(0.67 0.19 48 / 0.15);
          --c-ph-shadow: oklch(0.04 0.002 35 / 0.8);
          --c-ph-ring:   oklch(0.27 0.006 35 / 0.5);
        }
        /* ── Theme: light ───────────────────────────────────────── */
        html.light {
          --c-bg:        oklch(0.965 0.005 48);
          --c-surf:      oklch(0.915 0.006 48);
          --c-surf2:     oklch(0.87 0.007 48);
          --c-border:    oklch(0.80 0.007 48);
          --c-borderHi:  oklch(0.68 0.009 48);
          --c-text:      oklch(0.14 0.006 35);
          --c-sub:       oklch(0.32 0.007 35);
          --c-muted:     oklch(0.50 0.009 48);
          --c-dim:       oklch(0.68 0.007 48);
          --c-accent:    oklch(0.60 0.21 48);
          --c-accentLo:  oklch(0.60 0.21 48 / 0.08);
          --c-accentMid: oklch(0.60 0.21 48 / 0.15);
          --c-accentBrd: oklch(0.60 0.21 48 / 0.30);
          --c-accentHi:  oklch(0.60 0.21 48 / 0.50);
          --c-base:      oklch(0.98 0.003 35);
          --c-nav:       oklch(0.965 0.005 48 / 0.92);
          --c-sect:      oklch(0.945 0.005 48);
          --c-mq:        oklch(0.955 0.005 48);
          --c-glow-a:    oklch(0.60 0.21 48 / 0.10);
          --c-glow-b:    oklch(0.60 0.21 48 / 0.06);
          --c-glow-ph:   oklch(0.60 0.21 48 / 0.20);
          --c-ph-shadow: oklch(0.55 0.005 48 / 0.20);
          --c-ph-ring:   oklch(0.75 0.005 48 / 0.50);
        }

        html { scroll-behavior: smooth; }

        /* ── Hero entrance animations ─────────────────────────── */
        @keyframes heroIn {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: none; }
        }
        @keyframes phoneIn {
          from { opacity: 0; transform: translateX(34px); }
          to   { opacity: 1; transform: none; }
        }
        .ha1 { animation: heroIn 0.65s cubic-bezier(0.23,1,0.32,1) both 0ms; }
        .ha2 { animation: heroIn 0.65s cubic-bezier(0.23,1,0.32,1) both 80ms; }
        .ha3 { animation: heroIn 0.65s cubic-bezier(0.23,1,0.32,1) both 160ms; }
        .ha4 { animation: heroIn 0.65s cubic-bezier(0.23,1,0.32,1) both 240ms; }
        .ha5 { animation: heroIn 0.65s cubic-bezier(0.23,1,0.32,1) both 310ms; }
        .ha-phone { animation: phoneIn 0.8s cubic-bezier(0.16,1,0.3,1) both 120ms; }

        /* ── Scroll-driven parallax (Chrome 115+, Edge, Safari 18+) */
        @supports (animation-timeline: scroll()) {
          @keyframes phonescroll {
            from { transform: translateY(0); opacity: 1; }
            to   { transform: translateY(-65px); opacity: 0.12; }
          }
          .ha-phone-scroll {
            animation: phonescroll linear both;
            animation-timeline: scroll(root block);
            animation-range: 15vh 65vh;
          }
        }

        /* ── AR badge pulse ───────────────────────────────────── */
        @keyframes dotPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%      { opacity: 0.3; transform: scale(0.7); }
        }
        .ar-dot { animation: dotPulse 1.9s ease-in-out infinite; }
        @keyframes markerFade {
          0%, 100% { opacity: 0.75; }
          50%      { opacity: 0.22; }
        }
        .ar-marker { animation: markerFade 2.8s ease-in-out infinite; }

        /* ── Marquee ─────────────────────────────────────────── */
        .mq-wrap { overflow: hidden; }
        @keyframes mq { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .mq-track {
          display: flex; width: max-content; align-items: center;
          animation: mq 34s linear infinite;
        }
        .mq-track:hover { animation-play-state: paused; }

        /* ── Scroll reveal ───────────────────────────────────── */
        [data-sr] {
          opacity: 0;
          transform: translateY(22px);
          transition:
            opacity  0.65s cubic-bezier(0.23,1,0.32,1) var(--sr-delay, 0ms),
            transform 0.65s cubic-bezier(0.23,1,0.32,1) var(--sr-delay, 0ms);
        }
        [data-sr][data-srd] { opacity: 1; transform: none; }

        /* ── Interactive states ──────────────────────────────── */
        .btn-p { transition: transform 130ms ease-out, box-shadow 130ms ease-out; }
        .btn-p:hover { box-shadow: 0 0 0 3px var(--c-accentMid); }
        .btn-p:active { transform: scale(0.97); }
        .btn-g { transition: transform 130ms ease-out, border-color 130ms ease-out, color 130ms ease-out; }
        .btn-g:hover { border-color: var(--c-accentHi) !important; color: var(--c-sub) !important; }
        .btn-g:active { transform: scale(0.97); }
        .nav-lnk { transition: color 140ms ease-out; }
        .nav-lnk:hover { color: var(--c-sub) !important; }
        .tag-lnk { transition: color 140ms ease-out, background 140ms ease-out; }

        /* ── Theme toggle ────────────────────────────────────── */
        .tt-sun { display: none; }
        .tt-moon { display: flex; }
        html.light .tt-sun { display: flex; }
        html.light .tt-moon { display: none; }
        .theme-toggle { transition: color 140ms ease-out; }
        .theme-toggle:hover { color: var(--c-sub) !important; }

        /* ── Grain ───────────────────────────────────────────── */
        .grain { opacity: 0.028; mix-blend-mode: screen; }
        html.light .grain { opacity: 0.018; mix-blend-mode: multiply; }

        /* ── Layout ──────────────────────────────────────────── */
        .hero-grid  { display: grid; grid-template-columns: 1fr 1fr; gap: 5rem; align-items: center; }
        .feat-grid  { display: grid; grid-template-columns: 1fr 1fr; }
        .price-row  { display: grid; grid-template-columns: 230px 1fr 190px; gap: 2.5rem; align-items: start; }
        .nav-links-d { display: flex; align-items: center; gap: 1.75rem; }
        .ha-phone-wrap { display: flex; justify-content: center; align-items: center; }

        @media (max-width: 920px) {
          .nav-links-d { display: none; }
          .hero-grid   { grid-template-columns: 1fr; gap: 3rem; }
          .ha-phone-wrap { display: none; }
          .feat-grid   { grid-template-columns: 1fr; }
          .price-row   { grid-template-columns: 1fr; gap: 1.25rem; }
        }

        /* ── Reduced motion ──────────────────────────────────── */
        @media (prefers-reduced-motion: reduce) {
          .ha1,.ha2,.ha3,.ha4,.ha5,.ha-phone,.ha-phone-scroll {
            animation: none; opacity: 1; transform: none;
          }
          .ar-dot { animation: none; }
          .ar-marker { animation: none; opacity: 0.65; }
          .mq-track { animation-duration: 90s; }
          [data-sr] { opacity: 1; transform: none; transition: none; }
        }
      `}</style>

      {/* Grain texture — fixed, pointer-none */}
      <div
        aria-hidden
        className="grain"
        style={{
          position: "fixed", inset: 0, zIndex: 9999, pointerEvents: "none",
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* ── NAV ───────────────────────────────────────────────── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
        borderBottom: `1px solid ${c.border}`,
        background: "var(--c-nav)",
        backdropFilter: "blur(20px) saturate(1.5)",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 2rem", height: 56,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
          <div style={{
            width: 26, height: 26, background: c.accent, borderRadius: 5,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <span style={{ color: c.base, fontSize: "0.6875rem", fontWeight: 800, letterSpacing: "-0.01em", fontFamily: fd }}>AR</span>
          </div>
          <span style={{ color: c.text, fontWeight: 700, fontSize: "0.9375rem", letterSpacing: "-0.03em", fontFamily: fd }}>WebAR Menu</span>
        </div>

        <div className="nav-links-d">
          {(["#how-it-works|How it works", "#features|Features", "#pricing|Pricing"] as const).map(s => {
            const [href, label] = s.split("|");
            return (
              <a key={href} href={href} className="nav-lnk" style={{ color: c.muted, fontSize: "0.875rem", textDecoration: "none", letterSpacing: "-0.01em" }}>
                {label}
              </a>
            );
          })}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
          <ThemeToggle />
          <Link href="/r/test" className="btn-p" style={{
            padding: "0.4375rem 1.125rem", background: c.accent, borderRadius: 6,
            color: c.base, fontSize: "0.875rem", fontWeight: 700,
            textDecoration: "none", letterSpacing: "-0.015em",
            display: "inline-flex", alignItems: "center", gap: 6,
          }}>
            Try demo
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>
      </nav>

      {/* ── HERO ──────────────────────────────────────────────── */}
      <section style={{
        minHeight: "100dvh", paddingTop: 56,
        display: "flex", alignItems: "center",
        position: "relative", overflow: "hidden",
      }}>
        {/* Ambient glow orbs */}
        <div aria-hidden style={{
          position: "absolute", top: "8%", right: "3%",
          width: 720, height: 720,
          background: "radial-gradient(ellipse at center, var(--c-glow-a) 0%, transparent 62%)",
          pointerEvents: "none",
        }} />
        <div aria-hidden style={{
          position: "absolute", bottom: "0%", left: "4%",
          width: 480, height: 480,
          background: "radial-gradient(ellipse at center, var(--c-glow-b) 0%, transparent 65%)",
          pointerEvents: "none",
        }} />

        <div style={{ maxWidth: 1180, margin: "0 auto", padding: "5rem 2rem", width: "100%" }}>
          <div className="hero-grid">

            {/* ── Hero text ── */}
            <div>
              <div className="ha1" style={{
                display: "inline-flex", alignItems: "center", gap: 7,
                padding: "0.3125rem 0.75rem",
                background: c.accentLo, border: `1px solid ${c.accentBrd}`,
                borderRadius: 100, marginBottom: "1.875rem",
              }}>
                <div className="ar-dot" style={{ width: 5, height: 5, background: c.accent, borderRadius: "50%", flexShrink: 0 }} />
                <span style={{ color: c.accent, fontSize: "0.6875rem", fontWeight: 700, letterSpacing: "0.09em", textTransform: "uppercase", fontFamily: fd }}>
                  WebAR for restaurants
                </span>
              </div>

              <h1 className="ha2" style={{
                fontSize: "clamp(2.75rem, 5vw, 4.625rem)",
                fontWeight: 800, letterSpacing: "-0.045em", lineHeight: 1.01,
                color: c.text, margin: "0 0 1.5rem", fontFamily: fd,
              }}>
                Your dishes,<br />
                <span style={{ color: c.accent }}>seen in 3D.</span>
              </h1>

              <p className="ha3" style={{
                fontSize: "1.0625rem", lineHeight: 1.7, color: c.muted,
                maxWidth: "45ch", margin: "0 0 2.5rem",
              }}>
                Guests point their phone at a QR code and your dishes appear floating on the table. No app, no plugin. Works in Safari and Chrome on any modern phone.
              </p>

              <div className="ha4" style={{ display: "flex", gap: "0.875rem", flexWrap: "wrap", alignItems: "center" }}>
                <Link href="/r/test" className="btn-p" style={{
                  padding: "0.75rem 1.625rem", background: c.accent, borderRadius: 8,
                  color: c.base, fontWeight: 700, fontSize: "0.9375rem",
                  textDecoration: "none", letterSpacing: "-0.02em",
                  display: "inline-flex", alignItems: "center", gap: 8,
                }}>
                  See it live
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2.5 7h9M8 3.5l3.5 3.5L8 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
                <a href={`mailto:${CONTACT_EMAIL}`} className="btn-g" style={{
                  padding: "0.75rem 1.5rem", border: `1px solid ${c.borderHi}`, borderRadius: 8,
                  color: c.sub, fontWeight: 600, fontSize: "0.9375rem",
                  textDecoration: "none", letterSpacing: "-0.015em",
                }}>
                  Get in touch
                </a>
              </div>

              <div className="ha5" style={{ marginTop: "2.5rem", display: "flex", alignItems: "center", gap: "1.5rem", flexWrap: "wrap" }}>
                {[
                  { label: "iOS Safari", detail: "AR Quick Look" },
                  { label: "Android Chrome", detail: "WebXR" },
                  { label: "No app required", detail: "Pure browser" },
                ].map(({ label, detail }) => (
                  <div key={label} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <div style={{ width: 4, height: 4, background: c.accent, borderRadius: "50%", opacity: 0.55, flexShrink: 0 }} />
                    <span style={{ fontSize: "0.75rem", color: c.muted, letterSpacing: "-0.01em" }}>
                      {label} <span style={{ color: c.dim }}>/ {detail}</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Phone mockup ── */}
            <div className="ha-phone-wrap">
              {/* scroll-driven wrapper: outer element gets parallax */}
              <div className="ha-phone-scroll" style={{ position: "relative" }}>
                {/* entrance animation: inner element slides from right */}
                <div className="ha-phone" style={{ position: "relative" }}>
                  {/* Glow behind phone */}
                  <div aria-hidden style={{
                    position: "absolute", inset: -70,
                    background: "radial-gradient(ellipse at center, var(--c-glow-ph) 0%, transparent 60%)",
                    pointerEvents: "none",
                  }} />

                  {/* Phone frame */}
                  <div style={{
                    width: 252, height: 506,
                    background: c.surf, border: `1.5px solid ${c.border}`,
                    borderRadius: 38, position: "relative", overflow: "hidden",
                    boxShadow: "0 48px 96px var(--c-ph-shadow), 0 0 0 1px var(--c-ph-ring)",
                  }}>
                    {/* Dynamic island — always dark, lives on a dark screen */}
                    <div style={{
                      position: "absolute", top: 13, left: "50%", transform: "translateX(-50%)",
                      zIndex: 10, width: 80, height: 7, background: "oklch(0.06 0.003 35)", borderRadius: 4,
                    }} />

                    {/* Screen — always dark, simulates camera/AR view */}
                    <div style={{
                      position: "absolute", inset: 0,
                      background: "linear-gradient(162deg, oklch(0.108 0.005 35) 0%, oklch(0.082 0.004 35) 100%)",
                      display: "flex", flexDirection: "column",
                    }}>
                      {/* Status bar — hardcoded dark, sits on dark screen */}
                      <div style={{
                        padding: "10px 20px 0", display: "flex",
                        justifyContent: "space-between", alignItems: "center",
                        flexShrink: 0, zIndex: 5,
                      }}>
                        <span style={{ fontSize: "0.5625rem", color: "oklch(0.34 0.005 48)", letterSpacing: "-0.01em", fontFamily: fd }}>9:41</span>
                        <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
                          {[0, 1, 2].map(i => (
                            <div key={i} style={{ width: 3, height: 3 + i * 1.5, background: "oklch(0.34 0.005 48)", borderRadius: 1 }} />
                          ))}
                          <div style={{ width: 10, height: 5, border: "1px solid oklch(0.34 0.005 48)", borderRadius: 1, marginLeft: 3 }}>
                            <div style={{ width: "70%", height: "100%", background: "oklch(0.34 0.005 48)", borderRadius: 1 }} />
                          </div>
                        </div>
                      </div>

                      {/* 3D model area */}
                      <div style={{ flex: 1, position: "relative" }}>
                        {/* AR corner markers */}
                        {([
                          { top: "18%", left: "14%" },
                          { top: "18%", right: "14%" },
                          { bottom: "16%", left: "14%" },
                          { bottom: "16%", right: "14%" },
                        ] as const).map((pos, i) => {
                          const isLeft = "left" in pos;
                          const isTop  = "top"  in pos;
                          return (
                            <div key={i} className="ar-marker" style={{
                              position: "absolute", ...pos,
                              width: 16, height: 16, zIndex: 5, pointerEvents: "none",
                              borderTop:    isTop  ? `1.5px solid ${c.accent}` : "none",
                              borderBottom: !isTop ? `1.5px solid ${c.accent}` : "none",
                              borderLeft:   isLeft ? `1.5px solid ${c.accent}` : "none",
                              borderRight:  !isLeft ? `1.5px solid ${c.accent}` : "none",
                            }} />
                          );
                        })}
                        <LandingModel src={DEMO_GLB} />
                      </div>

                      {/* AR badge */}
                      <div style={{
                        position: "absolute", bottom: "11%", left: "50%", transform: "translateX(-50%)",
                        padding: "0.25rem 0.625rem",
                        background: c.accentMid, border: `1px solid ${c.accentBrd}`,
                        borderRadius: 100, zIndex: 10,
                        display: "flex", alignItems: "center", gap: 5, whiteSpace: "nowrap",
                      }}>
                        <div className="ar-dot" style={{ width: 5, height: 5, background: c.accent, borderRadius: "50%", flexShrink: 0 }} />
                        <span style={{ color: c.accent, fontSize: "0.5625rem", fontWeight: 700, letterSpacing: "0.07em", fontFamily: fd }}>AR READY</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── MARQUEE STRIP ─────────────────────────────────────── */}
      <div className="mq-wrap" style={{
        borderTop: `1px solid ${c.border}`,
        borderBottom: `1px solid ${c.border}`,
        background: "var(--c-mq)",
        padding: "0.875rem 0",
      }}>
        <div className="mq-track">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} style={{
              padding: "0 1.5rem", display: "inline-flex", alignItems: "center", gap: "1.5rem",
              whiteSpace: "nowrap", flexShrink: 0,
            }}>
              <span style={{
                fontSize: "0.6875rem", fontWeight: 600, letterSpacing: "0.08em",
                textTransform: "uppercase", color: c.muted, fontFamily: fd,
              }}>
                {item}
              </span>
              <span aria-hidden style={{
                display: "block", width: 3, height: 3,
                background: c.accent, borderRadius: "50%", opacity: 0.45, flexShrink: 0,
              }} />
            </span>
          ))}
        </div>
      </div>

      {/* ── HOW IT WORKS ──────────────────────────────────────── */}
      <section id="how-it-works" style={{ padding: "7rem 2rem" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>

          <ScrollReveal style={{ marginBottom: "4.5rem" }}>
            <p style={{ fontSize: "0.6875rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: c.accent, marginBottom: "0.875rem", fontFamily: fd }}>
              How it works
            </p>
            <h2 style={{ fontSize: "clamp(1.875rem, 3.5vw, 2.875rem)", fontWeight: 800, letterSpacing: "-0.045em", color: c.text, margin: 0, lineHeight: 1.06, fontFamily: fd }}>
              Three steps to AR menus.
            </h2>
          </ScrollReveal>

          <div>
            {steps.map(({ n, title, body }) => (
              <ScrollReveal key={n}>
                <div style={{
                  borderTop: `1px solid ${c.border}`,
                  padding: "2.875rem 0",
                  display: "grid", gridTemplateColumns: "5rem 1fr", gap: "2rem", alignItems: "start",
                }}>
                  <span style={{
                    fontSize: "0.6875rem", fontWeight: 700, letterSpacing: "0.08em",
                    color: c.accent, paddingTop: 5, fontFamily: fd, textTransform: "uppercase",
                  }}>
                    {n}
                  </span>
                  <div>
                    <h3 style={{ fontSize: "clamp(1.25rem, 2.2vw, 1.75rem)", fontWeight: 700, letterSpacing: "-0.03em", color: c.text, margin: "0 0 0.875rem", fontFamily: fd, lineHeight: 1.12 }}>
                      {title}
                    </h3>
                    <p style={{ fontSize: "0.9375rem", lineHeight: 1.7, color: c.muted, margin: 0, maxWidth: "52ch" }}>
                      {body}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
            <div style={{ borderTop: `1px solid ${c.border}` }} />
          </div>

        </div>
      </section>

      {/* ── FEATURES ──────────────────────────────────────────── */}
      <section id="features" style={{ borderTop: `1px solid ${c.border}`, padding: "7rem 2rem", background: "var(--c-sect)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>

          <ScrollReveal style={{ marginBottom: "4.5rem" }}>
            <p style={{ fontSize: "0.6875rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: c.accent, marginBottom: "0.875rem", fontFamily: fd }}>
              Why AR menus
            </p>
            <h2 style={{ fontSize: "clamp(1.875rem, 3.5vw, 2.875rem)", fontWeight: 800, letterSpacing: "-0.045em", color: c.text, margin: 0, lineHeight: 1.06, fontFamily: fd }}>
              Built to disappear.<br />
              <span style={{ color: c.sub }}>The tech, not the dish.</span>
            </h2>
          </ScrollReveal>

          <ScrollReveal>
            <div className="feat-grid" style={{ border: `1px solid ${c.border}` }}>

              {/* Works on any phone */}
              <div style={{ padding: "3rem 2.5rem", borderRight: `1px solid ${c.border}`, borderBottom: `1px solid ${c.border}` }}>
                <div style={{ color: c.accent, marginBottom: "1.375rem", opacity: 0.8 }}>
                  <PhoneIcon />
                </div>
                <h3 style={{ fontSize: "clamp(1.375rem, 2.2vw, 1.75rem)", fontWeight: 800, letterSpacing: "-0.035em", color: c.text, margin: "0 0 0.875rem", lineHeight: 1.12, fontFamily: fd }}>
                  Works on<br />any phone.
                </h3>
                <p style={{ fontSize: "0.9375rem", lineHeight: 1.68, color: c.muted, margin: 0, maxWidth: "30ch" }}>
                  No app install. No QR scanner app. Just the camera and a browser. Tested on iOS 15+ and Android 10+.
                </p>
              </div>

              {/* iOS and Android */}
              <div style={{ padding: "3rem 2.5rem", borderBottom: `1px solid ${c.border}` }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: "1.375rem" }}>
                  <div style={{ width: 34, height: 34, background: c.accentLo, border: `1px solid ${c.accentBrd}`, borderRadius: 7, display: "flex", alignItems: "center", justifyContent: "center", color: c.accent, flexShrink: 0 }}>
                    <PlusIcon />
                  </div>
                  <h3 style={{ fontSize: "0.9375rem", fontWeight: 700, letterSpacing: "-0.02em", color: c.text, margin: 0, fontFamily: fd }}>
                    iOS and Android both covered
                  </h3>
                </div>
                <p style={{ fontSize: "0.9375rem", lineHeight: 1.68, color: c.muted, margin: "0 0 1.125rem", maxWidth: "38ch" }}>
                  On iPhone and iPad, dishes open in Apple&apos;s native AR Quick Look (USDZ). On Android Chrome, WebXR places them on real surfaces using the camera.
                </p>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {["AR Quick Look", "WebXR", "USDZ auto-generated"].map(t => (
                    <span key={t} style={{ padding: "0.25rem 0.625rem", background: c.surf2, border: `1px solid ${c.border}`, borderRadius: 100, fontSize: "0.6875rem", fontWeight: 600, color: c.muted, letterSpacing: "0.01em" }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Live in minutes */}
              <div style={{ padding: "3rem 2.5rem", borderRight: `1px solid ${c.border}` }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: "1.375rem" }}>
                  <div style={{ width: 34, height: 34, background: c.accentLo, border: `1px solid ${c.accentBrd}`, borderRadius: 7, display: "flex", alignItems: "center", justifyContent: "center", color: c.accent, flexShrink: 0 }}>
                    <PlusIcon />
                  </div>
                  <h3 style={{ fontSize: "0.9375rem", fontWeight: 700, letterSpacing: "-0.02em", color: c.text, margin: 0, fontFamily: fd }}>
                    Live in minutes
                  </h3>
                </div>
                <p style={{ fontSize: "0.9375rem", lineHeight: 1.68, color: c.muted, margin: "0 0 1.125rem", maxWidth: "38ch" }}>
                  Upload a GLB file, set a name and slug, save. The dish is immediately live at a permanent URL. Print the QR, put it on the table, done.
                </p>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {["GLB upload", "Auto QR", "Instant live"].map(t => (
                    <span key={t} style={{ padding: "0.25rem 0.625rem", background: c.surf2, border: `1px solid ${c.border}`, borderRadius: 100, fontSize: "0.6875rem", fontWeight: 600, color: c.muted, letterSpacing: "0.01em" }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Full control */}
              <div style={{ padding: "3rem 2.5rem" }}>
                <div style={{ color: c.accent, marginBottom: "1.375rem", opacity: 0.8 }}>
                  <GearIcon />
                </div>
                <h3 style={{ fontSize: "clamp(1.375rem, 2.2vw, 1.75rem)", fontWeight: 800, letterSpacing: "-0.035em", color: c.text, margin: "0 0 0.875rem", lineHeight: 1.12, fontFamily: fd }}>
                  Full control,<br />always.
                </h3>
                <p style={{ fontSize: "0.9375rem", lineHeight: 1.68, color: c.muted, margin: 0, maxWidth: "30ch" }}>
                  Toggle dishes on and off, reorder the slider, update models and names. Changes go live immediately, no redeploy.
                </p>
              </div>

            </div>
          </ScrollReveal>

        </div>
      </section>

      {/* ── PRICING ───────────────────────────────────────────── */}
      <section id="pricing" style={{ borderTop: `1px solid ${c.border}`, padding: "7rem 2rem" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>

          <ScrollReveal style={{ marginBottom: "4.5rem" }}>
            <p style={{ fontSize: "0.6875rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: c.accent, marginBottom: "0.875rem", fontFamily: fd }}>
              Pricing
            </p>
            <h2 style={{ fontSize: "clamp(1.875rem, 3.5vw, 2.875rem)", fontWeight: 800, letterSpacing: "-0.045em", color: c.text, margin: "0 0 1rem", lineHeight: 1.06, fontFamily: fd }}>
              One format, any scale.
            </h2>
            <p style={{ fontSize: "1rem", lineHeight: 1.65, color: c.muted, margin: 0, maxWidth: "46ch" }}>
              Write to us and we will find the right plan for your restaurant or network.
            </p>
          </ScrollReveal>

          <div>
            {tiers.map(({ tier, desc, features, cta, highlight }, i) => (
              <ScrollReveal key={tier} delay={i * 75}>
                <div style={{ borderTop: `1px solid ${highlight ? c.accentBrd : c.border}` }}>
                  <div className="price-row" style={{
                    padding: "2.625rem 0",
                    background: highlight ? c.accentLo : "transparent",
                    borderRadius: highlight ? 6 : 0,
                    paddingLeft: highlight ? "1.25rem" : 0,
                    paddingRight: highlight ? "1.25rem" : 0,
                  }}>

                    {/* Name + desc */}
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.625rem", marginBottom: "0.5rem", flexWrap: "wrap" }}>
                        <h3 style={{ fontSize: "1.25rem", fontWeight: 700, letterSpacing: "-0.03em", color: c.text, margin: 0, fontFamily: fd }}>
                          {tier}
                        </h3>
                        {highlight && (
                          <span style={{ padding: "0.1875rem 0.5625rem", background: c.accentMid, border: `1px solid ${c.accentBrd}`, borderRadius: 100, fontSize: "0.5625rem", fontWeight: 700, color: c.accent, letterSpacing: "0.07em", fontFamily: fd }}>
                            POPULAR
                          </span>
                        )}
                      </div>
                      <p style={{ fontSize: "0.8125rem", lineHeight: 1.55, color: c.muted, margin: 0 }}>{desc}</p>
                    </div>

                    {/* Feature list */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                      {features.map(f => (
                        <span key={f} style={{ display: "inline-flex", alignItems: "center", gap: 7, fontSize: "0.8125rem", color: c.sub, letterSpacing: "-0.01em" }}>
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ flexShrink: 0 }}>
                            <path d="M2 6L4.5 8.5L10 3.5" stroke={c.accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          {f}
                        </span>
                      ))}
                    </div>

                    {/* CTA */}
                    <div>
                      <a href={`mailto:${CONTACT_EMAIL}`} className={highlight ? "btn-p" : "btn-g"} style={{
                        padding: "0.625rem 1.25rem",
                        background: highlight ? c.accent : "transparent",
                        border: `1px solid ${highlight ? c.accent : c.borderHi}`,
                        borderRadius: 7, textAlign: "center",
                        color: highlight ? c.base : c.sub,
                        fontSize: "0.875rem", fontWeight: 700, textDecoration: "none",
                        letterSpacing: "-0.015em", whiteSpace: "nowrap",
                        display: "inline-flex", alignItems: "center", gap: 6,
                      }}>
                        {cta}
                        <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                          <path d="M2 5.5h7M6.5 2.5l3 3-3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </a>
                    </div>

                  </div>
                </div>
              </ScrollReveal>
            ))}
            <div style={{ borderTop: `1px solid ${c.border}` }} />
          </div>

        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────────────────── */}
      <footer style={{ borderTop: `1px solid ${c.border}`, padding: "3rem 2rem" }}>
        <div style={{
          maxWidth: 1100, margin: "0 auto",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          flexWrap: "wrap", gap: "1.5rem",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
            <div style={{ width: 22, height: 22, background: c.accent, borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ color: c.base, fontSize: "0.5625rem", fontWeight: 800, fontFamily: fd }}>AR</span>
            </div>
            <div>
              <span style={{ color: c.text, fontWeight: 700, fontSize: "0.875rem", letterSpacing: "-0.025em", fontFamily: fd }}>WebAR Menu</span>
              <span style={{ color: c.dim, fontSize: "0.75rem", marginLeft: 10 }}>3D menus for restaurants</span>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
            <Link href="/r/test" className="nav-lnk" style={{ color: c.muted, fontSize: "0.8125rem", textDecoration: "none", letterSpacing: "-0.01em" }}>
              Live demo
            </Link>
            <a href={`mailto:${CONTACT_EMAIL}`} className="nav-lnk" style={{ color: c.muted, fontSize: "0.8125rem", textDecoration: "none", letterSpacing: "-0.01em" }}>
              {CONTACT_EMAIL}
            </a>
          </div>
        </div>
      </footer>

    </div>
  );
}
