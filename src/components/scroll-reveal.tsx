"use client";
import { useEffect, useRef, type ReactNode, type CSSProperties } from "react";

export function ScrollReveal({
  children,
  delay = 0,
  className,
  style,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.setAttribute("data-srd", "");
          obs.unobserve(el);
        }
      },
      { threshold: 0.08, rootMargin: "-24px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      data-sr=""
      className={className}
      style={{ "--sr-delay": `${delay}ms`, ...style } as CSSProperties}
    >
      {children}
    </div>
  );
}
