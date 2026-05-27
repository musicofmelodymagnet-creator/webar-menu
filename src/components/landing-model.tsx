"use client";
import { useEffect } from "react";

export function LandingModel({ src }: { src: string }) {
  useEffect(() => {
    import("@google/model-viewer");
  }, []);

  return (
    // @ts-expect-error model-viewer custom element
    <model-viewer
      src={src}
      auto-rotate
      auto-rotate-delay="800"
      rotation-per-second="16deg"
      camera-orbit="0deg 82deg auto"
      disable-zoom
      interaction-prompt="none"
      environment-image="neutral"
      exposure="1.8"
      shadow-intensity="0"
      style={{ width: "100%", height: "100%", background: "transparent" }}
    />
  );
}
