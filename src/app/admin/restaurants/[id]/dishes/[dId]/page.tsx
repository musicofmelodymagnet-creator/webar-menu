import { AdminShell } from "@/components/admin-shell";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { DishEditor } from "./dish-editor";

export const dynamic = "force-dynamic";

export default async function EditDishPage({ params }: { params: Promise<{ id: string; dId: string }> }) {
  const { id, dId } = await params;
  const dish = await prisma.dish.findUnique({ where: { id: dId, restaurantId: id } });
  if (!dish) notFound();

  return (
    <AdminShell>
      <div style={{ padding: "2rem 2.5rem", maxWidth: 560 }}>
        <div style={{ marginBottom: "1.75rem" }}>
          <Link href={`/admin/restaurants/${id}`} style={{ color: "oklch(0.52 0.007 252)", fontSize: "0.8125rem", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6 }}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M7 2L3 6l4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
            Restaurant
          </Link>
          <h1 style={{ color: "oklch(0.95 0.004 252)", fontSize: "1.25rem", fontWeight: 600, letterSpacing: "-0.02em", margin: "0.5rem 0 0" }}>
            Edit: {dish.name}
          </h1>
        </div>
        <DishEditor dish={dish} restaurantId={id} />
      </div>
    </AdminShell>
  );
}
