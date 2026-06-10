"use client";
import { useRouter } from "next/navigation";
import { useState, useRef } from "react";
import type { Dish } from "@prisma/client";

type DishWithPhoto = Dish & { photoUrl?: string | null };

interface Props {
  dishes: DishWithPhoto[];
  activeDishSlug: string;
  restaurantSlug: string;
}

export function DishSlider({ dishes, activeDishSlug, restaurantSlug }: Props) {
  const router = useRouter();
  const [expanded, setExpanded] = useState(false);
  const drag = useRef({ startY: 0, moved: false });

  function onHandlePointerDown(e: React.PointerEvent) {
    drag.current = { startY: e.clientY, moved: false };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    e.preventDefault();
  }
  function onHandlePointerMove(e: React.PointerEvent) {
    if (Math.abs(e.clientY - drag.current.startY) > 8) drag.current.moved = true;
  }
  function onHandlePointerUp(e: React.PointerEvent) {
    const dy = drag.current.startY - e.clientY; // positive = swiped up
    if (drag.current.moved) {
      if (dy > 24) setExpanded(true);
      else if (dy < -18) setExpanded(false);
    } else {
      setExpanded(v => !v);
    }
  }

  return (
    <div style={{
      background: "oklch(0.12 0.005 35)",
      borderTop: "1px solid oklch(0.18 0.005 35)",
      paddingBottom: "env(safe-area-inset-bottom, 0)",
      overflow: "hidden",
      transition: "max-height 300ms cubic-bezier(0.4, 0, 0.2, 1)",
      maxHeight: expanded ? "62vh" : "148px",
      display: "flex",
      flexDirection: "column",
      flexShrink: 0,
    }}>
      {/* Drag handle — full-width tap zone, min 44px tall */}
      <div
        onPointerDown={onHandlePointerDown}
        onPointerMove={onHandlePointerMove}
        onPointerUp={onHandlePointerUp}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "0.3rem",
          padding: "0.625rem 1rem 0.375rem",
          minHeight: 44,
          cursor: "ns-resize",
          flexShrink: 0,
          touchAction: "none",
          userSelect: "none",
          WebkitUserSelect: "none",
        }}
      >
        <div style={{
          width: 36,
          height: 4,
          borderRadius: 2,
          background: expanded ? "oklch(0.42 0.005 35)" : "oklch(0.32 0.005 35)",
          transition: "background 200ms",
        }} />
        <span style={{
          fontSize: "0.625rem",
          fontWeight: 500,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          color: expanded ? "oklch(0.42 0.008 48)" : "oklch(0.48 0.010 48)",
          transition: "color 200ms",
          lineHeight: 1,
        }}>
          {expanded ? "close" : "all dishes"}
        </span>
      </div>

      {/* Collapsed: horizontal scroll */}
      {!expanded && (
        <div
          className="dish-slider no-scrollbar"
          style={{ padding: "0 0.75rem 0.75rem", gap: "0.5rem" }}
        >
          {dishes.map(dish => {
            const active = dish.slug === activeDishSlug;
            return (
              <button
                key={dish.id}
                className="dish-slide"
                onClick={() => router.push(`/r/${restaurantSlug}/${dish.slug}`)}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "0.3rem",
                  padding: "0.4rem",
                  background: active ? "oklch(0.67 0.19 48 / 0.12)" : "transparent",
                  border: `1px solid ${active ? "oklch(0.67 0.19 48 / 0.45)" : "oklch(0.20 0.005 35)"}`,
                  borderRadius: 10,
                  cursor: "pointer",
                  width: 78,
                  flexShrink: 0,
                  transition: "border-color 150ms, background 150ms",
                }}
              >
                <div style={{
                  width: 58, height: 44,
                  borderRadius: 6,
                  background: active ? "oklch(0.67 0.19 48 / 0.18)" : "oklch(0.17 0.006 35)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  overflow: "hidden",
                  flexShrink: 0,
                }}>
                  {dish.photoUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={dish.photoUrl} alt={dish.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <path d="M9 2L16 5.5V12.5L9 16L2 12.5V5.5L9 2Z" stroke={active ? "oklch(0.67 0.19 48)" : "oklch(0.38 0.006 35)"} strokeWidth="1.2" strokeLinejoin="round"/>
                      <circle cx="9" cy="9" r="2.5" stroke={active ? "oklch(0.67 0.19 48)" : "oklch(0.38 0.006 35)"} strokeWidth="1.2"/>
                    </svg>
                  )}
                </div>
                <span style={{
                  color: active ? "oklch(0.67 0.19 48)" : "oklch(0.52 0.008 48)",
                  fontSize: "0.625rem",
                  fontWeight: active ? 600 : 400,
                  textAlign: "center",
                  lineHeight: 1.25,
                  width: "100%",
                  display: "-webkit-box",
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: 2,
                  overflow: "hidden",
                  wordBreak: "break-word",
                }}>
                  {dish.name}
                </span>
              </button>
            );
          })}
        </div>
      )}

      {/* Expanded: scrollable grid */}
      {expanded && (
        <div
          className="no-scrollbar"
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "0.25rem 0.75rem 0.75rem",
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "0.5rem",
            alignContent: "start",
          }}
        >
          {dishes.map(dish => {
            const active = dish.slug === activeDishSlug;
            return (
              <button
                key={dish.id}
                onClick={() => router.push(`/r/${restaurantSlug}/${dish.slug}`)}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "stretch",
                  gap: "0.3rem",
                  padding: "0.375rem",
                  background: active ? "oklch(0.67 0.19 48 / 0.12)" : "oklch(0.16 0.006 35)",
                  border: `1px solid ${active ? "oklch(0.67 0.19 48 / 0.45)" : "oklch(0.22 0.005 35)"}`,
                  borderRadius: 10,
                  cursor: "pointer",
                  transition: "border-color 150ms, background 150ms",
                  textAlign: "left",
                }}
              >
                <div style={{
                  width: "100%",
                  aspectRatio: "4/3",
                  borderRadius: 6,
                  background: active ? "oklch(0.67 0.19 48 / 0.18)" : "oklch(0.20 0.006 35)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  overflow: "hidden",
                  flexShrink: 0,
                }}>
                  {dish.photoUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={dish.photoUrl} alt={dish.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <path d="M9 2L16 5.5V12.5L9 16L2 12.5V5.5L9 2Z" stroke={active ? "oklch(0.67 0.19 48)" : "oklch(0.38 0.006 35)"} strokeWidth="1.2" strokeLinejoin="round"/>
                      <circle cx="9" cy="9" r="2.5" stroke={active ? "oklch(0.67 0.19 48)" : "oklch(0.38 0.006 35)"} strokeWidth="1.2"/>
                    </svg>
                  )}
                </div>
                <span style={{
                  color: active ? "oklch(0.67 0.19 48)" : "oklch(0.72 0.008 48)",
                  fontSize: "0.6875rem",
                  fontWeight: active ? 600 : 400,
                  lineHeight: 1.3,
                  display: "-webkit-box",
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: 3,
                  overflow: "hidden",
                  wordBreak: "break-word",
                }}>
                  {dish.name}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
