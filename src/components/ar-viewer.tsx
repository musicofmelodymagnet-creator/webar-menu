"use client";
import { useEffect, useRef, useState } from "react";

interface Props {
  modelUrl: string;
  usdzUrl?: string | null;
  dishName: string;
}

interface ModelViewerElement extends HTMLElement {
  activateAR: () => void;
  canActivateAR: boolean;
  exposure: number;
}

declare global {
  interface Window { __mvLoaded?: boolean; }
}

export function ArViewer({ modelUrl, usdzUrl, dishName }: Props) {
  const ref = useRef<ModelViewerElement | null>(null);
  const [mode, setMode] = useState<"ar" | "3d">("3d");
  const [arHint, setArHint] = useState<"none" | "unsupported" | "https">("none");

  // Load model-viewer client-side only (npm bundle, no CDN needed)
  useEffect(() => {
    if (window.__mvLoaded) return;
    window.__mvLoaded = true;
    import("@google/model-viewer");
  }, []);

  // Boost exposure in AR — real-world lighting is dimmer than neutral HDR env
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    function onArStatus(e: Event) {
      const el = ref.current;
      if (!el) return;
      const status = (e as CustomEvent<{ status: string }>).detail.status;
      if (status === "session-started") el.exposure = 1.8;
      else if (status === "not-presenting") el.exposure = 1.0;
    }
    el.addEventListener("ar-status", onArStatus);
    return () => el.removeEventListener("ar-status", onArStatus);
  }, []);

  function handleToggle(next: "ar" | "3d") {
    if (next === mode) return;

    if (next === "ar") {
      const el = ref.current;
      // HTTPS is required for WebXR / camera on mobile
      const isSecure = location.protocol === "https:" || location.hostname === "localhost";
      if (!isSecure) {
        setArHint("https");
        setTimeout(() => setArHint("none"), 5000);
        return;
      }
      if (el && el.canActivateAR) {
        el.activateAR();
        setMode("ar");
      } else {
        setArHint("unsupported");
        setTimeout(() => setArHint("none"), 4000);
      }
    } else {
      setMode("3d");
    }
    setArHint("none");
  }

  const hint =
    arHint === "https"
      ? "AR requires HTTPS. Open the site over a secure connection."
      : arHint === "unsupported"
      ? "AR is not supported on this device or browser."
      : null;

  return (
    <div style={{
      position: "relative",
      width: "100%",
      flex: 1,
      minHeight: 0,     // critical: allows flex child to shrink on mobile
      overflow: "hidden",
    }}>
      {/* @ts-expect-error model-viewer is a custom element */}
      <model-viewer
        ref={ref}
        src={modelUrl}
        ios-src={usdzUrl ?? undefined}
        alt={dishName}
        ar=""
        ar-modes="webxr scene-viewer quick-look"
        ar-scale="fixed"
        camera-controls=""
        auto-rotate=""
        auto-rotate-delay="500"
        tone-mapping="commerce"
        shadow-intensity="0"
        exposure="1.0"
        environment-image="neutral"
        style={{
          display: "block",
          width: "100%",
          height: "100%",
          background: "transparent",
          "--progress-bar-color": "oklch(0.67 0.19 48)",
          "--progress-mask": "transparent",
        } as React.CSSProperties}
      />

      {/* AR hint */}
      {hint && (
        <div style={{
          position: "absolute",
          top: "1rem",
          left: "50%",
          transform: "translateX(-50%)",
          background: "oklch(0.14 0.006 35 / 0.92)",
          backdropFilter: "blur(10px)",
          border: "1px solid oklch(0.25 0.006 35)",
          borderRadius: 12,
          padding: "0.75rem 1rem",
          maxWidth: "85vw",
          textAlign: "center",
          zIndex: 30,
          pointerEvents: "none",
        }}>
          <p style={{ color: "oklch(0.78 0.008 48)", fontSize: "0.8rem", margin: 0, lineHeight: 1.5 }}>
            {hint}
          </p>
        </div>
      )}

      {/* AR / 3D toggle — onPointerDown to beat model-viewer's touch capture */}
      <div style={{
        position: "absolute",
        bottom: "1.5rem",
        left: "50%",
        transform: "translateX(-50%)",
        display: "flex",
        background: "oklch(0.14 0.006 35 / 0.88)",
        backdropFilter: "blur(12px)",
        borderRadius: 100,
        padding: "3px",
        border: "1px solid oklch(0.25 0.006 35)",
        zIndex: 20,
        touchAction: "none",
      }}>
        {(["ar", "3d"] as const).map(m => (
          <button
            key={m}
            onPointerDown={e => { e.stopPropagation(); e.preventDefault(); handleToggle(m); }}
            style={{
              padding: "0.4rem 1.25rem",
              minWidth: 60,
              minHeight: 38,
              borderRadius: 100,
              border: "none",
              background: mode === m ? "oklch(0.67 0.19 48)" : "transparent",
              color: mode === m ? "oklch(0.10 0.005 35)" : "oklch(0.60 0.008 48)",
              fontSize: "0.8125rem",
              fontWeight: 700,
              letterSpacing: "0.04em",
              cursor: "pointer",
              transition: "background 150ms ease-out, color 150ms ease-out",
              textTransform: "uppercase",
              WebkitTapHighlightColor: "transparent",
              userSelect: "none",
              touchAction: "none",
            }}
          >
            {m}
          </button>
        ))}
      </div>
    </div>
  );
}
