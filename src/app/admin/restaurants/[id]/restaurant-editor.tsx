"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import type { Restaurant, Dish } from "@prisma/client";

export function RestaurantEditor({ restaurant, dishes }: { restaurant: Restaurant; dishes: Dish[] }) {
  const router = useRouter();
  const [name, setName] = useState(restaurant.name);
  const [slug, setSlug] = useState(restaurant.slug);
  const [active, setActive] = useState(restaurant.active);
  const [logoPreview, setLogoPreview] = useState(restaurant.logoUrl ?? "");
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState("");

  function toSlug(v: string) {
    return v.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  }

  async function saveRestaurant() {
    setSaving(true);
    setSaveMsg("");
    let logoUrl = restaurant.logoUrl;
    if (logoFile) {
      const fd = new FormData();
      fd.append("file", logoFile);
      fd.append("type", "logo");
      const up = await fetch("/api/admin/upload", { method: "POST", body: fd });
      if (up.ok) { const j = await up.json(); logoUrl = j.url; }
    }
    const res = await fetch(`/api/admin/restaurants/${restaurant.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, slug, active, logoUrl }),
    });
    setSaving(false);
    if (res.ok) { setSaveMsg("Saved"); setTimeout(() => setSaveMsg(""), 2000); router.refresh(); }
  }

  async function toggleDish(dish: Dish) {
    await fetch(`/api/admin/dishes/${dish.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ visible: !dish.visible }),
    });
    router.refresh();
  }

  async function deleteDish(dishId: string) {
    if (!confirm("Delete this dish?")) return;
    await fetch(`/api/admin/dishes/${dishId}`, { method: "DELETE" });
    router.refresh();
  }

  async function deleteRestaurant() {
    if (!confirm(`Delete "${restaurant.name}" and all its dishes?`)) return;
    await fetch(`/api/admin/restaurants/${restaurant.id}`, { method: "DELETE" });
    router.push("/admin/dashboard");
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      {/* General settings */}
      <section style={{
        background: "oklch(0.23 0.007 252)",
        border: "1px solid oklch(0.28 0.006 252)",
        borderRadius: 10,
        padding: "1.5rem",
      }}>
        <h2 style={{ color: "oklch(0.85 0.005 252)", fontSize: "0.875rem", fontWeight: 600, margin: "0 0 1.25rem", letterSpacing: "-0.01em" }}>
          General
        </h2>
        <div style={{ display: "grid", gap: "1.25rem" }}>
          {/* Logo */}
          <div>
            <label style={{ display: "block", color: "oklch(0.65 0.007 252)", fontSize: "0.8125rem", fontWeight: 500, marginBottom: "0.5rem" }}>Logo</label>
            <div style={{ display: "flex", alignItems: "center", gap: "0.875rem" }}>
              <div style={{ width: 48, height: 48, borderRadius: 8, background: "oklch(0.27 0.007 252)", border: "1px solid oklch(0.33 0.006 252)", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                {logoPreview ? <img src={logoPreview} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : <svg width="16" height="16" viewBox="0 0 20 20" fill="none"><rect x="2" y="4" width="16" height="12" rx="2" stroke="oklch(0.40 0.006 252)" strokeWidth="1.4"/></svg>}
              </div>
              <label style={{ cursor: "pointer" }}>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "0.375rem 0.625rem", background: "oklch(0.27 0.007 252)", border: "1px solid oklch(0.33 0.006 252)", borderRadius: 5, color: "oklch(0.65 0.007 252)", fontSize: "0.8125rem", fontWeight: 500 }}>
                  <svg width="11" height="11" viewBox="0 0 12 12" fill="none"><path d="M6 1v8M2 5l4-4 4 4M1 10h10" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  Change
                </span>
                <input type="file" accept="image/*" style={{ display: "none" }} onChange={e => { const f = e.target.files?.[0]; if (f) { setLogoFile(f); setLogoPreview(URL.createObjectURL(f)); }}} />
              </label>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div>
              <label style={{ display: "block", color: "oklch(0.65 0.007 252)", fontSize: "0.8125rem", fontWeight: 500, marginBottom: "0.375rem" }}>Name</label>
              <input className="field" value={name} onChange={e => setName(e.target.value)} />
            </div>
            <div>
              <label style={{ display: "block", color: "oklch(0.65 0.007 252)", fontSize: "0.8125rem", fontWeight: 500, marginBottom: "0.375rem" }}>Slug</label>
              <input className="field" value={slug} onChange={e => setSlug(toSlug(e.target.value))} />
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <div style={{ color: "oklch(0.78 0.005 252)", fontSize: "0.875rem", fontWeight: 500 }}>Active</div>
              <div style={{ color: "oklch(0.50 0.007 252)", fontSize: "0.75rem", marginTop: 2 }}>Guests can access this restaurant's menu</div>
            </div>
            <label className="toggle">
              <input type="checkbox" checked={active} onChange={e => setActive(e.target.checked)} />
              <div className="toggle-track" />
              <div className="toggle-thumb" />
            </label>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <button onClick={saveRestaurant} disabled={saving} style={{ padding: "0.5rem 1rem", background: saving ? "oklch(0.44 0.15 260)" : "oklch(0.58 0.22 260)", border: "none", borderRadius: 6, color: "oklch(0.97 0.003 260)", fontSize: "0.8125rem", fontWeight: 600, cursor: saving ? "not-allowed" : "pointer" }}>
              {saving ? "Saving…" : "Save changes"}
            </button>
            {saveMsg && <span style={{ color: "oklch(0.65 0.16 145)", fontSize: "0.8125rem" }}>✓ {saveMsg}</span>}
          </div>
        </div>
      </section>

      {/* Dishes */}
      <section>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
          <h2 style={{ color: "oklch(0.85 0.005 252)", fontSize: "0.875rem", fontWeight: 600, margin: 0, letterSpacing: "-0.01em" }}>
            Dishes <span style={{ color: "oklch(0.48 0.006 252)", fontWeight: 400 }}>({dishes.length})</span>
          </h2>
          <Link href={`/admin/restaurants/${restaurant.id}/dishes/new`} style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "0.4375rem 0.75rem", background: "oklch(0.58 0.22 260)", borderRadius: 6, textDecoration: "none", color: "oklch(0.97 0.003 260)", fontSize: "0.8125rem", fontWeight: 600 }}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
            Add dish
          </Link>
        </div>

        {dishes.length === 0 ? (
          <div style={{ border: "1px dashed oklch(0.33 0.006 252)", borderRadius: 10, padding: "2.5rem 2rem", textAlign: "center" }}>
            <p style={{ color: "oklch(0.48 0.007 252)", fontSize: "0.875rem", margin: "0 0 0.875rem" }}>No dishes yet</p>
            <Link href={`/admin/restaurants/${restaurant.id}/dishes/new`} style={{ color: "oklch(0.58 0.22 260)", fontSize: "0.875rem", fontWeight: 500, textDecoration: "none" }}>
              Add first dish
            </Link>
          </div>
        ) : (
          <div style={{ border: "1px solid oklch(0.28 0.006 252)", borderRadius: 10, overflow: "hidden" }}>
            {dishes.map((dish, i) => (
              <div key={dish.id} style={{
                display: "flex",
                alignItems: "center",
                padding: "0.875rem 1rem",
                borderBottom: i < dishes.length - 1 ? "1px solid oklch(0.25 0.006 252)" : "none",
                background: "oklch(0.23 0.007 252)",
                gap: "0.875rem",
              }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ color: "oklch(0.88 0.004 252)", fontSize: "0.875rem", fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {dish.name}
                  </div>
                  <div style={{ color: "oklch(0.50 0.006 252)", fontSize: "0.75rem", marginTop: 2 }}>
                    <code style={{ color: "oklch(0.55 0.08 260)" }}>/{dish.slug}</code>
                    {dish.modelUrl && <span style={{ marginLeft: 8, color: "oklch(0.50 0.006 252)" }}>· GLB</span>}
                    {dish.usdzUrl && <span style={{ marginLeft: 4 }}>· USDZ</span>}
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexShrink: 0 }}>
                  <label className="toggle" title={dish.visible ? "Visible (click to hide)" : "Hidden (click to show)"}>
                    <input type="checkbox" checked={dish.visible} onChange={() => toggleDish(dish)} />
                    <div className="toggle-track" />
                    <div className="toggle-thumb" />
                  </label>
                  <Link href={`/admin/restaurants/${restaurant.id}/dishes/${dish.id}`} style={{ color: "oklch(0.52 0.008 252)", fontSize: "0.8125rem", textDecoration: "none", fontWeight: 500 }}>
                    Edit
                  </Link>
                  <button onClick={() => deleteDish(dish.id)} style={{ background: "none", border: "none", cursor: "pointer", padding: "4px", color: "oklch(0.50 0.007 252)", display: "flex" }}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 3.5h10M5 3.5V2.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v1M5.5 6v4M8.5 6v4M3 3.5l.667 7.5A1 1 0 0 0 4.663 12h4.674a1 1 0 0 0 .996-.914L11 3.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Danger zone */}
      <section style={{ border: "1px solid oklch(0.62 0.22 27 / 0.2)", borderRadius: 10, padding: "1.25rem 1.5rem" }}>
        <h2 style={{ color: "oklch(0.72 0.15 27)", fontSize: "0.8125rem", fontWeight: 600, margin: "0 0 0.75rem", letterSpacing: "-0.01em" }}>Danger zone</h2>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <div style={{ color: "oklch(0.72 0.005 252)", fontSize: "0.875rem" }}>Delete restaurant</div>
            <div style={{ color: "oklch(0.48 0.007 252)", fontSize: "0.75rem", marginTop: 2 }}>This will delete all dishes. Cannot be undone.</div>
          </div>
          <button onClick={deleteRestaurant} style={{ padding: "0.4375rem 0.875rem", background: "oklch(0.62 0.22 27 / 0.12)", border: "1px solid oklch(0.62 0.22 27 / 0.3)", borderRadius: 6, color: "oklch(0.72 0.18 27)", fontSize: "0.8125rem", fontWeight: 600, cursor: "pointer" }}>
            Delete
          </button>
        </div>
      </section>
    </div>
  );
}
