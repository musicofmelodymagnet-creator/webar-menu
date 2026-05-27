import Link from "next/link";
import { LandingModel } from "@/components/landing-model";

// Update this to any active dish GLB on the server
const DEMO_GLB = "/uploads/models/350b84c910b32ff7ee35966d.glb";
// Update this before going live
const CONTACT_EMAIL = "admin@verunsky.pp.ua";

const c = {
  bg:        "oklch(0.09 0.005 35)",
  surf:      "oklch(0.13 0.006 35)",
  surf2:     "oklch(0.18 0.006 35)",
  border:    "oklch(0.22 0.006 35)",
  borderHi:  "oklch(0.30 0.005 35)",
  text:      "oklch(0.95 0.004 48)",
  sub:       "oklch(0.76 0.006 48)",
  muted:     "oklch(0.52 0.008 48)",
  dim:       "oklch(0.34 0.005 48)",
  accent:    "oklch(0.67 0.19 48)",
  accentLo:  "oklch(0.67 0.19 48 / 0.10)",
  accentMid: "oklch(0.67 0.19 48 / 0.22)",
  accentBrd: "oklch(0.67 0.19 48 / 0.38)",
  base:      "oklch(0.06 0.003 35)",
} as const;

const PlusIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M7 2v10M2 7h10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
  </svg>
);

export default function LandingPage() {
  return (
    <div style={{ background: c.bg, minHeight: "100vh", color: c.text, fontFamily: "system-ui, -apple-system, sans-serif" }}>
      <style>{`
        html { scroll-behavior: smooth; }
        .landing-nav-links { display: flex; align-items: center; gap: 1.75rem; }
        .landing-hero { display: grid; grid-template-columns: 1fr 1fr; gap: 5rem; align-items: center; }
        .landing-phone { display: flex; justify-content: center; align-items: center; }
        .landing-steps { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 0; }
        .landing-step-divider { display: block; }
        .landing-features { display: grid; grid-template-columns: 1fr 1fr; gap: 1px; }
        .landing-pricing { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 1.5rem; }
        @media (max-width: 900px) {
          .landing-nav-links { display: none; }
          .landing-hero { grid-template-columns: 1fr; gap: 3rem; }
          .landing-phone { display: none; }
          .landing-steps { grid-template-columns: 1fr; gap: 0; }
          .landing-step-divider { display: none !important; }
          .landing-features { grid-template-columns: 1fr; }
          .landing-pricing { grid-template-columns: 1fr; }
        }
      `}</style>

      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
        borderBottom: `1px solid ${c.border}`,
        background: `oklch(0.09 0.005 35 / 0.88)`,
        backdropFilter: "blur(16px)",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 2rem", height: 56,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
          <div style={{ width: 26, height: 26, background: c.accent, borderRadius: 5, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ color: c.base, fontSize: "0.6875rem", fontWeight: 800, letterSpacing: "-0.01em" }}>AR</span>
          </div>
          <span style={{ color: c.text, fontWeight: 700, fontSize: "0.9375rem", letterSpacing: "-0.025em" }}>WebAR Menu</span>
        </div>

        <div className="landing-nav-links">
          <a href="#how-it-works" style={{ color: c.muted, fontSize: "0.875rem", textDecoration: "none", letterSpacing: "-0.01em" }}>How it works</a>
          <a href="#features" style={{ color: c.muted, fontSize: "0.875rem", textDecoration: "none", letterSpacing: "-0.01em" }}>Features</a>
          <a href="#pricing" style={{ color: c.muted, fontSize: "0.875rem", textDecoration: "none", letterSpacing: "-0.01em" }}>Pricing</a>
        </div>

        <Link href="/r/test" style={{
          padding: "0.4375rem 1.125rem",
          background: c.accent,
          borderRadius: 6,
          color: c.base,
          fontSize: "0.875rem",
          fontWeight: 700,
          textDecoration: "none",
          letterSpacing: "-0.015em",
          display: "inline-flex", alignItems: "center", gap: 6,
        }}>
          Try demo
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
            <path d="M2.5 6.5h8M7 3l3.5 3.5L7 10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Link>
      </nav>

      {/* HERO */}
      <section style={{
        minHeight: "100vh",
        paddingTop: 56,
        display: "flex", alignItems: "center",
        position: "relative", overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", top: "10%", right: "5%",
          width: 700, height: 700,
          background: `radial-gradient(ellipse at center, oklch(0.67 0.19 48 / 0.09) 0%, transparent 65%)`,
          pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", bottom: "5%", left: "10%",
          width: 400, height: 400,
          background: `radial-gradient(ellipse at center, oklch(0.67 0.19 48 / 0.05) 0%, transparent 65%)`,
          pointerEvents: "none",
        }} />

        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "5rem 2rem", width: "100%" }}>
          <div className="landing-hero">
            {/* Text */}
            <div>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: 7,
                padding: "0.3125rem 0.75rem",
                background: c.accentLo,
                border: `1px solid ${c.accentBrd}`,
                borderRadius: 100,
                marginBottom: "1.75rem",
              }}>
                <div style={{ width: 5, height: 5, background: c.accent, borderRadius: "50%" }} />
                <span style={{ color: c.accent, fontSize: "0.6875rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>WebAR for restaurants</span>
              </div>

              <h1 style={{
                fontSize: "clamp(2.75rem, 5vw, 4.375rem)",
                fontWeight: 800,
                letterSpacing: "-0.04em",
                lineHeight: 1.03,
                color: c.text,
                margin: "0 0 1.375rem",
              }}>
                Your dishes,<br />
                <span style={{ color: c.accent }}>seen in 3D.</span>
              </h1>

              <p style={{
                fontSize: "1.125rem",
                lineHeight: 1.65,
                color: c.muted,
                maxWidth: "46ch",
                margin: "0 0 2.5rem",
              }}>
                Guests point their phone at a QR code and your dishes appear floating on the table. No app, no plugin. Works in Safari and Chrome on any modern phone.
              </p>

              <div style={{ display: "flex", gap: "0.875rem", flexWrap: "wrap", alignItems: "center" }}>
                <Link href="/r/test" style={{
                  padding: "0.75rem 1.625rem",
                  background: c.accent,
                  borderRadius: 8,
                  color: c.base,
                  fontWeight: 700,
                  fontSize: "1rem",
                  textDecoration: "none",
                  letterSpacing: "-0.02em",
                  display: "inline-flex", alignItems: "center", gap: 8,
                }}>
                  See it live
                  <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                    <path d="M3 7.5h9M8 3.5l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
                <a href={`mailto:${CONTACT_EMAIL}`} style={{
                  padding: "0.75rem 1.5rem",
                  border: `1px solid ${c.borderHi}`,
                  borderRadius: 8,
                  color: c.sub,
                  fontWeight: 600,
                  fontSize: "1rem",
                  textDecoration: "none",
                  letterSpacing: "-0.015em",
                }}>
                  Get in touch
                </a>
              </div>

              <div style={{ marginTop: "2.5rem", display: "flex", alignItems: "center", gap: "1.5rem" }}>
                {[
                  { label: "iOS Safari", detail: "AR Quick Look" },
                  { label: "Android Chrome", detail: "WebXR" },
                  { label: "No app required", detail: "Pure browser" },
                ].map(({ label, detail }) => (
                  <div key={label} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <div style={{ width: 5, height: 5, background: c.accent, borderRadius: "50%", opacity: 0.7 }} />
                    <span style={{ fontSize: "0.75rem", color: c.muted, letterSpacing: "-0.01em" }}>
                      {label} <span style={{ color: c.dim }}>/ {detail}</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Phone mockup with model-viewer */}
            <div className="landing-phone">
              <div style={{ position: "relative" }}>
                {/* Glow behind phone */}
                <div style={{
                  position: "absolute", inset: -60,
                  background: `radial-gradient(ellipse at center, oklch(0.67 0.19 48 / 0.18) 0%, transparent 65%)`,
                  pointerEvents: "none",
                }} />

                {/* Phone frame */}
                <div style={{
                  width: 250, height: 500,
                  background: c.surf,
                  border: `1.5px solid ${c.border}`,
                  borderRadius: 38,
                  position: "relative",
                  overflow: "hidden",
                  boxShadow: `0 40px 80px oklch(0.04 0.003 35 / 0.7), 0 0 0 1px oklch(0.27 0.006 35 / 0.5)`,
                }}>
                  {/* Dynamic island */}
                  <div style={{
                    position: "absolute", top: 12, left: "50%", transform: "translateX(-50%)",
                    zIndex: 10, width: 80, height: 7,
                    background: c.base, borderRadius: 4,
                  }} />

                  {/* Screen content */}
                  <div style={{
                    position: "absolute", inset: 0,
                    background: `linear-gradient(170deg, oklch(0.10 0.005 35) 0%, oklch(0.08 0.004 35) 100%)`,
                    display: "flex", flexDirection: "column",
                  }}>
                    {/* Status bar */}
                    <div style={{
                      padding: "10px 20px 0", display: "flex",
                      justifyContent: "space-between", alignItems: "center",
                      flexShrink: 0, zIndex: 5,
                    }}>
                      <span style={{ fontSize: "0.5625rem", color: c.dim, letterSpacing: "-0.01em" }}>9:41</span>
                      <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
                        {[3, 3, 3].map((_, i) => (
                          <div key={i} style={{ width: 3, height: 3 + i * 1.5, background: c.dim, borderRadius: 1 }} />
                        ))}
                        <div style={{ width: 10, height: 5, border: `1px solid ${c.dim}`, borderRadius: 1, marginLeft: 3 }}>
                          <div style={{ width: "70%", height: "100%", background: c.dim, borderRadius: 1 }} />
                        </div>
                      </div>
                    </div>

                    {/* Model area */}
                    <div style={{ flex: 1, position: "relative" }}>
                      {/* AR corner markers */}
                      {[
                        { top: "18%", left: "15%" },
                        { top: "18%", right: "15%" },
                        { bottom: "18%", left: "15%" },
                        { bottom: "18%", right: "15%" },
                      ].map((pos, i) => {
                        const isLeft = "left" in pos;
                        const isTop = "top" in pos;
                        return (
                          <div key={i} style={{
                            position: "absolute", ...pos, width: 16, height: 16, zIndex: 5, pointerEvents: "none",
                            borderTop: isTop ? `1.5px solid ${c.accent}` : "none",
                            borderBottom: !isTop ? `1.5px solid ${c.accent}` : "none",
                            borderLeft: isLeft ? `1.5px solid ${c.accent}` : "none",
                            borderRight: !isLeft ? `1.5px solid ${c.accent}` : "none",
                            opacity: 0.8,
                          }} />
                        );
                      })}

                      <LandingModel src={DEMO_GLB} />
                    </div>

                    {/* AR badge */}
                    <div style={{
                      position: "absolute", bottom: "12%", left: "50%", transform: "translateX(-50%)",
                      padding: "0.25rem 0.625rem",
                      background: c.accentMid,
                      border: `1px solid ${c.accentBrd}`,
                      borderRadius: 100, zIndex: 10,
                      display: "flex", alignItems: "center", gap: 5, whiteSpace: "nowrap",
                    }}>
                      <div style={{ width: 5, height: 5, background: c.accent, borderRadius: "50%" }} />
                      <span style={{ color: c.accent, fontSize: "0.5625rem", fontWeight: 700, letterSpacing: "0.07em" }}>AR READY</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" style={{ borderTop: `1px solid ${c.border}`, padding: "6rem 2rem" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ marginBottom: "4rem" }}>
            <p style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: c.accent, marginBottom: "0.75rem" }}>
              How it works
            </p>
            <h2 style={{ fontSize: "clamp(1.875rem, 3.5vw, 2.75rem)", fontWeight: 800, letterSpacing: "-0.035em", color: c.text, margin: 0 }}>
              Three steps to AR menus.
            </h2>
          </div>

          <div className="landing-steps" style={{ border: `1px solid ${c.border}` }}>
            {[
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
            ].map(({ n, title, body }, i) => (
              <div key={n} style={{
                padding: "3rem 2.5rem",
                borderRight: i < 2 ? `1px solid ${c.border}` : "none",
                borderBottom: `1px solid ${c.border}`,
                position: "relative",
              }}>
                <div style={{
                  fontSize: "4rem", fontWeight: 800, letterSpacing: "-0.06em",
                  color: c.accentMid,
                  lineHeight: 1, marginBottom: "1.5rem",
                  fontVariantNumeric: "tabular-nums",
                }}>
                  {n}
                </div>
                <h3 style={{ fontSize: "1.125rem", fontWeight: 700, letterSpacing: "-0.025em", color: c.text, margin: "0 0 0.75rem" }}>
                  {title}
                </h3>
                <p style={{ fontSize: "0.9375rem", lineHeight: 1.65, color: c.muted, margin: 0, maxWidth: "34ch" }}>
                  {body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" style={{ borderTop: `1px solid ${c.border}`, padding: "6rem 2rem", background: `oklch(0.095 0.005 35)` }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ marginBottom: "4rem" }}>
            <p style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: c.accent, marginBottom: "0.75rem" }}>
              Why AR menus
            </p>
            <h2 style={{ fontSize: "clamp(1.875rem, 3.5vw, 2.75rem)", fontWeight: 800, letterSpacing: "-0.035em", color: c.text, margin: 0 }}>
              Built to disappear.<br />
              <span style={{ color: c.sub }}>The tech, not the dish.</span>
            </h2>
          </div>

          <div className="landing-features" style={{ border: `1px solid ${c.border}` }}>
            {/* Feature 1: large typography */}
            <div style={{ padding: "3rem 2.5rem", borderRight: `1px solid ${c.border}`, borderBottom: `1px solid ${c.border}` }}>
              <div style={{ fontSize: "2.5rem", marginBottom: "1.25rem" }}>
                <span style={{ fontSize: "2rem" }}>📱</span>
              </div>
              <h3 style={{ fontSize: "1.5rem", fontWeight: 800, letterSpacing: "-0.03em", color: c.text, margin: "0 0 0.875rem", lineHeight: 1.15 }}>
                Works on<br />any phone.
              </h3>
              <p style={{ fontSize: "0.9375rem", lineHeight: 1.65, color: c.muted, margin: 0, maxWidth: "30ch" }}>
                No app install. No QR scanner app. Just the camera and a browser. Tested on iOS 15+ and Android 10+.
              </p>
            </div>

            {/* Feature 2: text-heavy */}
            <div style={{ padding: "3rem 2.5rem", borderBottom: `1px solid ${c.border}` }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: "1.25rem" }}>
                <div style={{ width: 36, height: 36, background: c.accentLo, border: `1px solid ${c.accentBrd}`, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", color: c.accent }}>
                  <PlusIcon />
                </div>
                <h3 style={{ fontSize: "1rem", fontWeight: 700, letterSpacing: "-0.02em", color: c.text, margin: 0 }}>
                  iOS and Android both covered
                </h3>
              </div>
              <p style={{ fontSize: "0.9375rem", lineHeight: 1.65, color: c.muted, margin: "0 0 1rem", maxWidth: "38ch" }}>
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

            {/* Feature 3: text-heavy */}
            <div style={{ padding: "3rem 2.5rem", borderRight: `1px solid ${c.border}` }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: "1.25rem" }}>
                <div style={{ width: 36, height: 36, background: c.accentLo, border: `1px solid ${c.accentBrd}`, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", color: c.accent }}>
                  <PlusIcon />
                </div>
                <h3 style={{ fontSize: "1rem", fontWeight: 700, letterSpacing: "-0.02em", color: c.text, margin: 0 }}>
                  Live in minutes
                </h3>
              </div>
              <p style={{ fontSize: "0.9375rem", lineHeight: 1.65, color: c.muted, margin: "0 0 1rem", maxWidth: "38ch" }}>
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

            {/* Feature 4: large typography */}
            <div style={{ padding: "3rem 2.5rem" }}>
              <div style={{ fontSize: "2rem", marginBottom: "1.25rem" }}>
                <span>⚙️</span>
              </div>
              <h3 style={{ fontSize: "1.5rem", fontWeight: 800, letterSpacing: "-0.03em", color: c.text, margin: "0 0 0.875rem", lineHeight: 1.15 }}>
                Full control,<br />always.
              </h3>
              <p style={{ fontSize: "0.9375rem", lineHeight: 1.65, color: c.muted, margin: 0, maxWidth: "30ch" }}>
                Toggle dishes on and off, reorder the slider, update models and names. Changes go live immediately, no redeploy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" style={{ borderTop: `1px solid ${c.border}`, padding: "6rem 2rem" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ marginBottom: "4rem", maxWidth: 560 }}>
            <p style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: c.accent, marginBottom: "0.75rem" }}>
              Pricing
            </p>
            <h2 style={{ fontSize: "clamp(1.875rem, 3.5vw, 2.75rem)", fontWeight: 800, letterSpacing: "-0.035em", color: c.text, margin: "0 0 1rem" }}>
              One format, any scale.
            </h2>
            <p style={{ fontSize: "1rem", lineHeight: 1.65, color: c.muted, margin: 0 }}>
              Write to us and we will find the right plan for your restaurant or network.
            </p>
          </div>

          <div className="landing-pricing">
            {[
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
                features: ["Unlimited restaurants", "Dedicated instance", "SLA and uptime guarantee", "Custom domain", "Onboarding and setup"],
                cta: "Contact us",
                highlight: false,
              },
            ].map(({ tier, desc, features, cta, highlight }) => (
              <div key={tier} style={{
                padding: "2.5rem",
                background: highlight ? c.surf : "transparent",
                border: `1px solid ${highlight ? c.accentBrd : c.border}`,
                borderRadius: 12,
                display: "flex", flexDirection: "column",
                outline: highlight ? `1px solid ${c.accentBrd}` : "none",
                outlineOffset: -1,
              }}>
                <div style={{ marginBottom: "auto" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.625rem" }}>
                    <h3 style={{ fontSize: "1.125rem", fontWeight: 700, letterSpacing: "-0.025em", color: c.text, margin: 0 }}>{tier}</h3>
                    {highlight && (
                      <span style={{ padding: "0.1875rem 0.5625rem", background: c.accentMid, border: `1px solid ${c.accentBrd}`, borderRadius: 100, fontSize: "0.625rem", fontWeight: 700, color: c.accent, letterSpacing: "0.05em" }}>
                        POPULAR
                      </span>
                    )}
                  </div>
                  <p style={{ fontSize: "0.875rem", lineHeight: 1.55, color: c.muted, margin: "0 0 2rem" }}>{desc}</p>

                  <ul style={{ listStyle: "none", padding: 0, margin: "0 0 2.5rem", display: "flex", flexDirection: "column", gap: "0.625rem" }}>
                    {features.map(f => (
                      <li key={f} style={{ display: "flex", alignItems: "center", gap: 9, fontSize: "0.875rem", color: c.sub, letterSpacing: "-0.01em" }}>
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0 }}>
                          <path d="M2.5 7L5.5 10L11.5 4" stroke={c.accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>

                <a href={`mailto:${CONTACT_EMAIL}`} style={{
                  padding: "0.625rem 1.25rem",
                  background: highlight ? c.accent : "transparent",
                  border: `1px solid ${highlight ? c.accent : c.borderHi}`,
                  borderRadius: 7,
                  color: highlight ? c.base : c.sub,
                  fontSize: "0.9375rem",
                  fontWeight: 700,
                  textDecoration: "none",
                  letterSpacing: "-0.015em",
                  textAlign: "center" as const,
                  display: "block",
                }}>
                  {cta}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: `1px solid ${c.border}`, padding: "3rem 2rem" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
            <div style={{ width: 22, height: 22, background: c.accent, borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ color: c.base, fontSize: "0.5625rem", fontWeight: 800 }}>AR</span>
            </div>
            <div>
              <span style={{ color: c.text, fontWeight: 700, fontSize: "0.875rem", letterSpacing: "-0.02em" }}>WebAR Menu</span>
              <span style={{ color: c.dim, fontSize: "0.75rem", marginLeft: 10 }}>3D menus for restaurants</span>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
            <Link href="/r/test" style={{ color: c.muted, fontSize: "0.8125rem", textDecoration: "none", letterSpacing: "-0.01em" }}>Live demo</Link>
            <a href={`mailto:${CONTACT_EMAIL}`} style={{ color: c.muted, fontSize: "0.8125rem", textDecoration: "none", letterSpacing: "-0.01em" }}>{CONTACT_EMAIL}</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
