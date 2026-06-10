import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArViewer } from "@/components/ar-viewer";
import { DishSlider } from "@/components/dish-slider";
import Image from "next/image";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string; dish_slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, dish_slug } = await params;
  const restaurant = await prisma.restaurant.findUnique({ where: { slug } });
  return {
    title: `${dish_slug.replace(/-/g, " ")} | ${restaurant?.name ?? "Menu"}`,
    viewport: "width=device-width, initial-scale=1, viewport-fit=cover",
  };
}

export default async function DishViewerPage({ params }: Props) {
  const { slug, dish_slug } = await params;

  const restaurant = await prisma.restaurant.findUnique({
    where: { slug, active: true },
    include: {
      dishes: { where: { visible: true }, orderBy: { order: "asc" } },
    },
  });
  if (!restaurant) notFound();

  const dish = restaurant.dishes.find(d => d.slug === dish_slug);
  if (!dish) notFound();

  return (
    <div style={{
      height: "100dvh",
      display: "flex",
      flexDirection: "column",
      background: "oklch(0.10 0.005 35)",
      overflow: "hidden",
    }}>
      {/* Header */}
      <header style={{
        display: "flex",
        alignItems: "center",
        gap: "0.625rem",
        padding: "0.75rem 1rem",
        paddingTop: "calc(0.75rem + env(safe-area-inset-top, 0))",
        borderBottom: "1px solid oklch(0.15 0.005 35)",
        background: "oklch(0.12 0.005 35)",
        flexShrink: 0,
        zIndex: 10,
      }}>
        {restaurant.logoUrl ? (
          <Image
            src={restaurant.logoUrl}
            alt={restaurant.name}
            width={32}
            height={32}
            style={{ borderRadius: 8, objectFit: "cover" }}
          />
        ) : (
          <div style={{ width: 32, height: 32, borderRadius: 8, background: "oklch(0.67 0.19 48 / 0.18)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 1L14.5 4.5V11.5L8 15L1.5 11.5V4.5L8 1Z" stroke="oklch(0.67 0.19 48)" strokeWidth="1.3" strokeLinejoin="round"/>
              <circle cx="8" cy="8" r="2" fill="oklch(0.67 0.19 48)"/>
            </svg>
          </div>
        )}
        <span style={{
          color: "oklch(0.92 0.004 48)",
          fontSize: "0.9375rem",
          fontWeight: 600,
          letterSpacing: "-0.015em",
          flex: 1,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}>
          {restaurant.name}
        </span>
      </header>

      {/* AR Viewport */}
      <ArViewer key={dish.id} modelUrl={dish.modelUrl} usdzUrl={dish.usdzUrl} dishName={dish.name} />

      {/* Dish name */}
      <div style={{
        padding: "0.875rem 1.25rem 0.625rem",
        background: "oklch(0.10 0.005 35)",
        flexShrink: 0,
      }}>
        <h1 style={{
          color: "oklch(0.96 0.004 48)",
          fontSize: "1.5rem",
          fontWeight: 700,
          letterSpacing: "-0.025em",
          margin: 0,
          lineHeight: 1.1,
        }}>
          {dish.name}
        </h1>
      </div>

      {/* Dish slider */}
      {restaurant.dishes.length > 1 && (
        <DishSlider
          dishes={restaurant.dishes}
          activeDishSlug={dish_slug}
          restaurantSlug={slug}
        />
      )}
    </div>
  );
}
