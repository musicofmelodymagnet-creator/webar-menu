import { AdminShell } from "@/components/admin-shell";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const restaurants = await prisma.restaurant.findMany({
    orderBy: { createdAt: "desc" },
    include: { _count: { select: { dishes: true } } },
  });

  return (
    <AdminShell>
      <div style={{ padding: "2rem 2.5rem", maxWidth: 900 }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "2rem" }}>
          <div>
            <h1 style={{ color: "oklch(0.95 0.004 252)", fontSize: "1.25rem", fontWeight: 600, letterSpacing: "-0.02em", margin: 0 }}>
              Restaurants
            </h1>
            <p style={{ color: "oklch(0.55 0.007 252)", fontSize: "0.8125rem", marginTop: "0.25rem" }}>
              {restaurants.length} registered
            </p>
          </div>
          <Link
            href="/admin/restaurants/new"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.375rem",
              padding: "0.5rem 0.875rem",
              background: "oklch(0.58 0.22 260)",
              borderRadius: 6,
              textDecoration: "none",
              color: "oklch(0.97 0.003 260)",
              fontSize: "0.875rem",
              fontWeight: 600,
              letterSpacing: "-0.01em",
              transition: "background 120ms ease-out",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path d="M8 2v12M2 8h12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
            Add restaurant
          </Link>
        </div>

        {/* Table */}
        {restaurants.length === 0 ? (
          <div style={{
            border: "1px dashed oklch(0.33 0.006 252)",
            borderRadius: 10,
            padding: "3.5rem 2rem",
            textAlign: "center",
          }}>
            <p style={{ color: "oklch(0.50 0.007 252)", fontSize: "0.875rem", margin: "0 0 1rem" }}>
              No restaurants yet
            </p>
            <Link
              href="/admin/restaurants/new"
              style={{ color: "oklch(0.58 0.22 260)", fontSize: "0.875rem", fontWeight: 500, textDecoration: "none" }}
            >
              Create your first restaurant
            </Link>
          </div>
        ) : (
          <div style={{ border: "1px solid oklch(0.28 0.006 252)", borderRadius: 10, overflow: "hidden" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "oklch(0.19 0.008 252)" }}>
                  {["Restaurant", "Slug", "Dishes", "Status", ""].map(h => (
                    <th key={h} style={{
                      padding: "0.625rem 1rem",
                      textAlign: "left",
                      color: "oklch(0.52 0.007 252)",
                      fontSize: "0.75rem",
                      fontWeight: 600,
                      letterSpacing: "0.04em",
                      textTransform: "uppercase",
                      borderBottom: "1px solid oklch(0.28 0.006 252)",
                    }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {restaurants.map((r, i) => (
                  <tr
                    key={r.id}
                    style={{
                      borderBottom: i < restaurants.length - 1 ? "1px solid oklch(0.25 0.006 252)" : "none",
                      transition: "background 80ms",
                    }}
                  >
                    <td style={{ padding: "0.875rem 1rem" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                        {r.logoUrl ? (
                          <img src={r.logoUrl} alt="" style={{ width: 28, height: 28, borderRadius: 6, objectFit: "cover", background: "oklch(0.28 0.006 252)" }} />
                        ) : (
                          <div style={{ width: 28, height: 28, borderRadius: 6, background: "oklch(0.27 0.007 252)", flexShrink: 0 }} />
                        )}
                        <span style={{ color: "oklch(0.92 0.004 252)", fontSize: "0.875rem", fontWeight: 500 }}>
                          {r.name}
                        </span>
                      </div>
                    </td>
                    <td style={{ padding: "0.875rem 1rem" }}>
                      <code style={{ color: "oklch(0.62 0.010 260)", fontSize: "0.8125rem", background: "oklch(0.24 0.008 260)", padding: "2px 6px", borderRadius: 4 }}>
                        {r.slug}
                      </code>
                    </td>
                    <td style={{ padding: "0.875rem 1rem", color: "oklch(0.65 0.006 252)", fontSize: "0.875rem" }}>
                      {r._count.dishes}
                    </td>
                    <td style={{ padding: "0.875rem 1rem" }}>
                      <span style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 5,
                        padding: "2px 8px",
                        borderRadius: 20,
                        fontSize: "0.75rem",
                        fontWeight: 600,
                        background: r.active ? "oklch(0.60 0.18 145 / 0.15)" : "oklch(0.33 0.006 252)",
                        color: r.active ? "oklch(0.72 0.16 145)" : "oklch(0.52 0.007 252)",
                      }}>
                        <span style={{ width: 5, height: 5, borderRadius: "50%", background: "currentColor", display: "inline-block" }} />
                        {r.active ? "Active" : "Blocked"}
                      </span>
                    </td>
                    <td style={{ padding: "0.875rem 1rem", textAlign: "right" }}>
                      <Link
                        href={`/admin/restaurants/${r.id}`}
                        style={{ color: "oklch(0.58 0.22 260)", fontSize: "0.8125rem", fontWeight: 500, textDecoration: "none" }}
                      >
                        Manage
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminShell>
  );
}
