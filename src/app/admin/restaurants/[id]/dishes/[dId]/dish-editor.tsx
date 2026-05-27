"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import type { Dish } from "@prisma/client";

export function DishEditor({ dish, restaurantId }: { dish: Dish; restaurantId: string }) {
  const router = useRouter();
  const [name, setName] = useState(dish.name);
  const [slug, setSlug] = useState(dish.slug);
  const [order, setOrder] = useState(String(dish.order));
  const [visible, setVisible] = useState(dish.visible);
  const [glbFile, setGlbFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const [savingStatus, setSavingStatus] = useState("");
  const [saveMsg, setSaveMsg] = useState("");
  const [error, setError] = useState("");

  function toSlug(v: string) {
    return v.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  }

  async function uploadFile(file: File, type: "model" | "logo") {
    const fd = new FormData();
    fd.append("file", file);
    fd.append("type", type);
    const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
    if (!res.ok) throw new Error("Upload failed");
    return (await res.json()).url as string;
  }

  async function save() {
    setSaving(true); setError(""); setSaveMsg(""); setSavingStatus("");
    try {
      let modelUrl = dish.modelUrl;
      let usdzUrl = dish.usdzUrl;

      if (glbFile) {
        setSavingStatus("Uploading 3D model…");
        modelUrl = await uploadFile(glbFile, "model");

        setSavingStatus("Converting for iOS AR…");
        const { convertGlbToUsdz } = await import("@/lib/glb-to-usdz");
        const usdzBuffer = await convertGlbToUsdz(glbFile);
        if (usdzBuffer) {
          const usdzFile = new File(
            [usdzBuffer],
            glbFile.name.replace(/\.glb$/i, ".usdz"),
            { type: "model/vnd.usdz+zip" }
          );
          usdzUrl = await uploadFile(usdzFile, "model");
        }
      }

      setSavingStatus("Saving…");
      const res = await fetch(`/api/admin/dishes/${dish.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, slug, order: Number(order), visible, modelUrl, usdzUrl }),
      });
      if (!res.ok) throw new Error("Update failed");
      setSaveMsg("Saved"); setTimeout(() => setSaveMsg(""), 2000);
      router.refresh();
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Error");
    } finally {
      setSaving(false);
      setSavingStatus("");
    }
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
      <div>
        <label style={{ display: "block", color: "oklch(0.65 0.007 252)", fontSize: "0.8125rem", fontWeight: 500, marginBottom: "0.375rem" }}>Name</label>
        <input className="field" value={name} onChange={e => setName(e.target.value)} />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 120px", gap: "1rem" }}>
        <div>
          <label style={{ display: "block", color: "oklch(0.65 0.007 252)", fontSize: "0.8125rem", fontWeight: 500, marginBottom: "0.375rem" }}>Slug</label>
          <input className="field" value={slug} onChange={e => setSlug(toSlug(e.target.value))} />
        </div>
        <div>
          <label style={{ display: "block", color: "oklch(0.65 0.007 252)", fontSize: "0.8125rem", fontWeight: 500, marginBottom: "0.375rem" }}>Order</label>
          <input className="field" type="number" value={order} onChange={e => setOrder(e.target.value)} />
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.75rem 1rem", background: "oklch(0.23 0.007 252)", borderRadius: 8, border: "1px solid oklch(0.28 0.006 252)" }}>
        <div>
          <div style={{ color: "oklch(0.78 0.005 252)", fontSize: "0.875rem", fontWeight: 500 }}>Visible</div>
          <div style={{ color: "oklch(0.50 0.007 252)", fontSize: "0.75rem", marginTop: 2 }}>Show on guest menu</div>
        </div>
        <label className="toggle">
          <input type="checkbox" checked={visible} onChange={e => setVisible(e.target.checked)} />
          <div className="toggle-track" />
          <div className="toggle-thumb" />
        </label>
      </div>

      <div>
        <label style={{ display: "block", color: "oklch(0.65 0.007 252)", fontSize: "0.8125rem", fontWeight: 500, marginBottom: "0.375rem" }}>3D Model (.glb)</label>
        {dish.modelUrl && !glbFile && (
          <div style={{ fontSize: "0.75rem", color: "oklch(0.55 0.008 260)", marginBottom: 6 }}>
            Current: <code>{dish.modelUrl.split("/").pop()}</code>
            {dish.usdzUrl && <span style={{ color: "oklch(0.55 0.14 145)", marginLeft: 8 }}>+ USDZ</span>}
          </div>
        )}
        {glbFile && (
          <div style={{ fontSize: "0.75rem", color: "oklch(0.55 0.14 145)", marginBottom: 6 }}>
            {glbFile.name} — USDZ will be auto-generated
          </div>
        )}
        <label style={{ cursor: "pointer" }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "0.4375rem 0.75rem", background: "oklch(0.25 0.007 252)", border: "1px solid oklch(0.33 0.006 252)", borderRadius: 6, color: glbFile ? "oklch(0.70 0.15 260)" : "oklch(0.65 0.007 252)", fontSize: "0.8125rem", fontWeight: 500 }}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M6 1v8M2 5l4-4 4 4M1 10h10" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
            {glbFile ? glbFile.name : (dish.modelUrl ? "Replace file" : "Upload")}
          </span>
          <input type="file" accept=".glb" style={{ display: "none" }} onChange={e => { const f = e.target.files?.[0]; if (f) setGlbFile(f); }} />
        </label>
      </div>

      {error && <p style={{ color: "oklch(0.62 0.22 27)", fontSize: "0.8125rem", margin: 0 }}>{error}</p>}

      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
        <button onClick={save} disabled={saving} style={{ padding: "0.5rem 1rem", background: saving ? "oklch(0.44 0.15 260)" : "oklch(0.58 0.22 260)", border: "none", borderRadius: 6, color: "oklch(0.97 0.003 260)", fontSize: "0.875rem", fontWeight: 600, cursor: saving ? "not-allowed" : "pointer" }}>
          {saving ? savingStatus || "Saving…" : "Save"}
        </button>
        {saveMsg && <span style={{ color: "oklch(0.65 0.16 145)", fontSize: "0.8125rem" }}>✓ {saveMsg}</span>}
        <Link href={`/admin/restaurants/${restaurantId}`} style={{ display: "inline-flex", alignItems: "center", padding: "0.5rem 1rem", border: "1px solid oklch(0.33 0.006 252)", borderRadius: 6, color: "oklch(0.65 0.007 252)", fontSize: "0.875rem", textDecoration: "none" }}>
          Cancel
        </Link>
      </div>
    </div>
  );
}
