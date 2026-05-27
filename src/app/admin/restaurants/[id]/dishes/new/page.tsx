"use client";
import { AdminShell } from "@/components/admin-shell";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function NewDishPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [slugManual, setSlugManual] = useState(false);
  const [glbFile, setGlbFile] = useState<File | null>(null);
  const [usdzFile, setUsdzFile] = useState<File | null>(null);
  const [order, setOrder] = useState("0");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function toSlug(v: string) {
    return v.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  }
  function handleName(v: string) { setName(v); if (!slugManual) setSlug(toSlug(v)); }
  function handleSlug(v: string) { setSlugManual(true); setSlug(toSlug(v)); }

  async function uploadFile(file: File, type: "model" | "usdz") {
    const fd = new FormData();
    fd.append("file", file);
    fd.append("type", type);
    const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
    if (!res.ok) throw new Error("Upload failed");
    return (await res.json()).url as string;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!glbFile) { setError("A .glb model file is required"); return; }
    setSaving(true); setError("");
    try {
      const modelUrl = await uploadFile(glbFile, "model");
      const usdzUrl = usdzFile ? await uploadFile(usdzFile, "usdz") : null;
      const res = await fetch(`/api/admin/restaurants/${id}/dishes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, slug, modelUrl, usdzUrl, order: Number(order) }),
      });
      if (!res.ok) { const j = await res.json(); throw new Error(j.error ?? "Failed"); }
      router.push(`/admin/restaurants/${id}`);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setSaving(false);
    }
  }

  const FileUploadField = ({ label, accept, file, onChange, hint }: { label: string; accept: string; file: File | null; onChange: (f: File) => void; hint?: string }) => (
    <div>
      <label style={{ display: "block", color: "oklch(0.65 0.007 252)", fontSize: "0.8125rem", fontWeight: 500, marginBottom: "0.5rem" }}>{label}</label>
      <label style={{ display: "block" }}>
        <div style={{
          border: `1px dashed ${file ? "oklch(0.58 0.22 260)" : "oklch(0.33 0.006 252)"}`,
          borderRadius: 8,
          padding: "1.25rem",
          textAlign: "center",
          cursor: "pointer",
          background: file ? "oklch(0.58 0.22 260 / 0.06)" : "oklch(0.23 0.007 252)",
          transition: "border-color 120ms, background 120ms",
        }}>
          {file ? (
            <div>
              <div style={{ color: "oklch(0.70 0.15 260)", fontSize: "0.875rem", fontWeight: 500 }}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ display: "inline", marginRight: 6, verticalAlign: -2 }}><path d="M2 2h6l3 3v7H2V2z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/><path d="M8 2v3h3" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/></svg>
                {file.name}
              </div>
              <div style={{ color: "oklch(0.50 0.006 252)", fontSize: "0.75rem", marginTop: 4 }}>
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </div>
            </div>
          ) : (
            <div>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ margin: "0 auto 0.5rem", display: "block" }}>
                <path d="M10 3v11M5 8l5-5 5 5" stroke="oklch(0.48 0.007 252)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M3 15h14" stroke="oklch(0.40 0.006 252)" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              <div style={{ color: "oklch(0.55 0.007 252)", fontSize: "0.8125rem" }}>Click to upload</div>
              {hint && <div style={{ color: "oklch(0.44 0.006 252)", fontSize: "0.75rem", marginTop: 3 }}>{hint}</div>}
            </div>
          )}
        </div>
        <input type="file" accept={accept} style={{ display: "none" }} onChange={e => { const f = e.target.files?.[0]; if (f) onChange(f); }} />
      </label>
    </div>
  );

  return (
    <AdminShell>
      <div style={{ padding: "2rem 2.5rem", maxWidth: 560 }}>
        <div style={{ marginBottom: "1.75rem" }}>
          <Link href={`/admin/restaurants/${id}`} style={{ color: "oklch(0.52 0.007 252)", fontSize: "0.8125rem", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6 }}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M7 2L3 6l4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
            Restaurant
          </Link>
          <h1 style={{ color: "oklch(0.95 0.004 252)", fontSize: "1.25rem", fontWeight: 600, letterSpacing: "-0.02em", margin: "0.5rem 0 0" }}>
            Add dish
          </h1>
        </div>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <div>
            <label style={{ display: "block", color: "oklch(0.65 0.007 252)", fontSize: "0.8125rem", fontWeight: 500, marginBottom: "0.375rem" }}>
              Dish name <span style={{ color: "oklch(0.62 0.22 27)" }}>*</span>
            </label>
            <input className="field" value={name} onChange={e => handleName(e.target.value)} placeholder="Salmon Nigiri" required />
          </div>

          <div>
            <label style={{ display: "block", color: "oklch(0.65 0.007 252)", fontSize: "0.8125rem", fontWeight: 500, marginBottom: "0.375rem" }}>
              Slug <span style={{ color: "oklch(0.62 0.22 27)" }}>*</span>
            </label>
            <input className="field" value={slug} onChange={e => handleSlug(e.target.value)} placeholder="salmon-nigiri" required />
          </div>

          <div>
            <label style={{ display: "block", color: "oklch(0.65 0.007 252)", fontSize: "0.8125rem", fontWeight: 500, marginBottom: "0.375rem" }}>
              Slider order
            </label>
            <input className="field" type="number" value={order} onChange={e => setOrder(e.target.value)} style={{ maxWidth: 120 }} />
          </div>

          <FileUploadField
            label="3D Model (.glb) *"
            accept=".glb"
            file={glbFile}
            onChange={setGlbFile}
            hint=".glb format, recommended &lt;15 MB"
          />

          <FileUploadField
            label="iOS Model (.usdz) — optional"
            accept=".usdz"
            file={usdzFile}
            onChange={setUsdzFile}
            hint="Enables native iOS Quick Look AR"
          />

          {error && <p style={{ color: "oklch(0.62 0.22 27)", fontSize: "0.8125rem", margin: 0 }}>{error}</p>}

          <div style={{ display: "flex", gap: "0.75rem", paddingTop: "0.25rem" }}>
            <button type="submit" disabled={saving} style={{ padding: "0.5625rem 1.125rem", background: saving ? "oklch(0.44 0.15 260)" : "oklch(0.58 0.22 260)", border: "none", borderRadius: 6, color: "oklch(0.97 0.003 260)", fontSize: "0.875rem", fontWeight: 600, cursor: saving ? "not-allowed" : "pointer", letterSpacing: "-0.01em" }}>
              {saving ? "Uploading…" : "Save dish"}
            </button>
            <Link href={`/admin/restaurants/${id}`} style={{ display: "inline-flex", alignItems: "center", padding: "0.5625rem 1rem", border: "1px solid oklch(0.33 0.006 252)", borderRadius: 6, color: "oklch(0.65 0.007 252)", fontSize: "0.875rem", textDecoration: "none" }}>
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </AdminShell>
  );
}
