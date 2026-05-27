"use client";
import { AdminShell } from "@/components/admin-shell";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

export default function NewRestaurantPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [slugManual, setSlugManual] = useState(false);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function toSlug(v: string) {
    return v.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  }

  function handleName(v: string) {
    setName(v);
    if (!slugManual) setSlug(toSlug(v));
  }

  function handleSlug(v: string) {
    setSlugManual(true);
    setSlug(toSlug(v));
  }

  function handleLogo(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setLogoFile(file);
    setLogoPreview(URL.createObjectURL(file));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !slug) return;
    setSaving(true);
    setError("");
    try {
      let logoUrl: string | null = null;
      if (logoFile) {
        const fd = new FormData();
        fd.append("file", logoFile);
        fd.append("type", "logo");
        const up = await fetch("/api/admin/upload", { method: "POST", body: fd });
        if (!up.ok) throw new Error("Logo upload failed");
        const j = await up.json();
        logoUrl = j.url;
      }
      const res = await fetch("/api/admin/restaurants", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, slug, logoUrl }),
      });
      if (!res.ok) {
        const j = await res.json();
        throw new Error(j.error ?? "Failed to create");
      }
      const data = await res.json();
      router.push(`/admin/restaurants/${data.id}`);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setSaving(false);
    }
  }

  return (
    <AdminShell>
      <div style={{ padding: "2rem 2.5rem", maxWidth: 560 }}>
        <div style={{ marginBottom: "1.75rem" }}>
          <Link href="/admin/dashboard" style={{ color: "oklch(0.52 0.007 252)", fontSize: "0.8125rem", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6 }}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M7 2L3 6l4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
            Restaurants
          </Link>
          <h1 style={{ color: "oklch(0.95 0.004 252)", fontSize: "1.25rem", fontWeight: 600, letterSpacing: "-0.02em", margin: "0.5rem 0 0" }}>
            New restaurant
          </h1>
        </div>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          {/* Logo */}
          <div>
            <label style={{ display: "block", color: "oklch(0.72 0.006 252)", fontSize: "0.8125rem", fontWeight: 500, marginBottom: "0.5rem" }}>
              Logo
            </label>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <div style={{
                width: 56, height: 56, borderRadius: 10,
                background: "oklch(0.25 0.007 252)",
                border: "1px solid oklch(0.33 0.006 252)",
                overflow: "hidden", flexShrink: 0,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                {logoPreview ? (
                  <img src={logoPreview} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                ) : (
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <rect x="2" y="4" width="16" height="12" rx="2" stroke="oklch(0.40 0.006 252)" strokeWidth="1.4"/>
                    <circle cx="7" cy="8.5" r="1.5" stroke="oklch(0.40 0.006 252)" strokeWidth="1.4"/>
                    <path d="M2 13l4-3 3 2.5 3-4 6 4.5" stroke="oklch(0.40 0.006 252)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </div>
              <label style={{ cursor: "pointer" }}>
                <span style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "0.4375rem 0.75rem",
                  background: "oklch(0.25 0.007 252)",
                  border: "1px solid oklch(0.33 0.006 252)",
                  borderRadius: 6,
                  color: "oklch(0.72 0.006 252)",
                  fontSize: "0.8125rem",
                  fontWeight: 500,
                }}>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M6 1v8M2 5l4-4 4 4M1 10h10" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  {logoFile ? "Change" : "Upload"}
                </span>
                <input type="file" accept="image/*" onChange={handleLogo} style={{ display: "none" }} />
              </label>
            </div>
          </div>

          <div>
            <label style={{ display: "block", color: "oklch(0.72 0.006 252)", fontSize: "0.8125rem", fontWeight: 500, marginBottom: "0.375rem" }}>
              Name <span style={{ color: "oklch(0.62 0.22 27)" }}>*</span>
            </label>
            <input className="field" value={name} onChange={e => handleName(e.target.value)} placeholder="Sakura Restaurant" required />
          </div>

          <div>
            <label style={{ display: "block", color: "oklch(0.72 0.006 252)", fontSize: "0.8125rem", fontWeight: 500, marginBottom: "0.375rem" }}>
              Slug <span style={{ color: "oklch(0.62 0.22 27)" }}>*</span>
            </label>
            <input className="field" value={slug} onChange={e => handleSlug(e.target.value)} placeholder="sakura-restaurant" required />
            <p style={{ color: "oklch(0.48 0.006 252)", fontSize: "0.75rem", marginTop: "0.375rem" }}>
              Guest URL: <code style={{ color: "oklch(0.58 0.10 260)" }}>/r/{slug || "your-slug"}/…</code>
            </p>
          </div>

          {error && (
            <p style={{ color: "oklch(0.62 0.22 27)", fontSize: "0.8125rem", margin: 0 }}>{error}</p>
          )}

          <div style={{ display: "flex", gap: "0.75rem", paddingTop: "0.25rem" }}>
            <button
              type="submit"
              disabled={saving}
              style={{
                padding: "0.5625rem 1.125rem",
                background: saving ? "oklch(0.44 0.15 260)" : "oklch(0.58 0.22 260)",
                border: "none",
                borderRadius: 6,
                color: "oklch(0.97 0.003 260)",
                fontSize: "0.875rem",
                fontWeight: 600,
                cursor: saving ? "not-allowed" : "pointer",
                letterSpacing: "-0.01em",
              }}
            >
              {saving ? "Creating…" : "Create restaurant"}
            </button>
            <Link href="/admin/dashboard" style={{
              display: "inline-flex", alignItems: "center",
              padding: "0.5625rem 1rem",
              border: "1px solid oklch(0.33 0.006 252)",
              borderRadius: 6,
              color: "oklch(0.65 0.007 252)",
              fontSize: "0.875rem",
              textDecoration: "none",
            }}>
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </AdminShell>
  );
}
