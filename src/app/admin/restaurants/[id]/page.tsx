import { AdminShell } from "@/components/admin-shell";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { RestaurantEditor } from "./restaurant-editor";

export const dynamic = "force-dynamic";

export default async function RestaurantPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const restaurant = await prisma.restaurant.findUnique({
    where: { id },
    include: { dishes: { orderBy: { order: "asc" } } },
  });
  if (!restaurant) notFound();

  return (
    <AdminShell>
      <div style={{ padding: "2rem 2.5rem", maxWidth: 780 }}>
        <div style={{ marginBottom: "1.75rem" }}>
          <Link href="/admin/dashboard" style={{ color: "oklch(0.52 0.007 252)", fontSize: "0.8125rem", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6 }}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M7 2L3 6l4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
            Restaurants
          </Link>
          <h1 style={{ color: "oklch(0.95 0.004 252)", fontSize: "1.25rem", fontWeight: 600, letterSpacing: "-0.02em", margin: "0.5rem 0 0" }}>
            {restaurant.name}
          </h1>
        </div>

        <RestaurantEditor restaurant={restaurant} dishes={restaurant.dishes} />
      </div>
    </AdminShell>
  );
}
