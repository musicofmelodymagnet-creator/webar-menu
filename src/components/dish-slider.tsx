"use client";
import { useRouter } from "next/navigation";
import type { Dish } from "@prisma/client";

interface Props {
  dishes: Dish[];
  activeDishSlug: string;
  restaurantSlug: string;
}

export function DishSlider({ dishes, activeDishSlug, restaurantSlug }: Props) {
  const router = useRouter();

  return (
    <div style={{
      background: "oklch(0.12 0.005 35)",
      borderTop: "1px solid oklch(0.18 0.005 35)",
      paddingBottom: "env(safe-area-inset-bottom, 0)",
    }}>
      <div
        className="dish-slider no-scrollbar"
        style={{ padding: "0.75rem 1rem", gap: "0.625rem" }}
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
                gap: "0.375rem",
                padding: "0.5rem",
                background: active ? "oklch(0.67 0.19 48 / 0.12)" : "transparent",
                border: `1px solid ${active ? "oklch(0.67 0.19 48 / 0.45)" : "oklch(0.20 0.005 35)"}`,
                borderRadius: 10,
                cursor: "pointer",
                width: 80,
                flexShrink: 0,
                transition: "border-color 150ms, background 150ms",
              }}
            >
              {/* Placeholder visual for 3D preview */}
              <div style={{
                width: 56, height: 42,
                borderRadius: 6,
                background: active ? "oklch(0.67 0.19 48 / 0.18)" : "oklch(0.17 0.006 35)",
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0,
                overflow: "hidden",
              }}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M9 2L16 5.5V12.5L9 16L2 12.5V5.5L9 2Z" stroke={active ? "oklch(0.67 0.19 48)" : "oklch(0.38 0.006 35)"} strokeWidth="1.2" strokeLinejoin="round"/>
                  <circle cx="9" cy="9" r="2.5" stroke={active ? "oklch(0.67 0.19 48)" : "oklch(0.38 0.006 35)"} strokeWidth="1.2"/>
                </svg>
              </div>
              <span style={{
                color: active ? "oklch(0.67 0.19 48)" : "oklch(0.52 0.008 48)",
                fontSize: "0.6875rem",
                fontWeight: active ? 600 : 400,
                textAlign: "center",
                lineHeight: 1.2,
                width: "100%",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}>
                {dish.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
