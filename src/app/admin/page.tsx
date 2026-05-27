"use client";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AdminLoginPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (status === "authenticated") router.replace("/admin/dashboard");
  }, [status, router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    setLoading(false);
    if (res?.error) {
      setError("Invalid email or password");
    } else {
      router.replace("/admin/dashboard");
    }
  }

  if (status === "loading" || status === "authenticated") {
    return <div className="h-full bg-bg" />;
  }

  return (
    <div className="min-h-full flex items-center justify-center bg-bg px-4">
      <div className="w-full max-w-sm">
        <div className="mb-10 text-center">
          <div className="inline-flex items-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 1L14.5 4.5V11.5L8 15L1.5 11.5V4.5L8 1Z" stroke="white" strokeWidth="1.5" strokeLinejoin="round"/>
                <circle cx="8" cy="8" r="2" fill="white"/>
              </svg>
            </div>
            <span style={{ color: "oklch(0.95 0.004 252)", fontWeight: 600, fontSize: "1rem", letterSpacing: "-0.01em" }}>
              WebAR Menu
            </span>
          </div>
          <h1 style={{ color: "oklch(0.95 0.004 252)", fontSize: "1.375rem", fontWeight: 600, letterSpacing: "-0.02em", margin: 0 }}>
            Admin access
          </h1>
          <p style={{ color: "oklch(0.55 0.007 252)", fontSize: "0.875rem", marginTop: "0.375rem" }}>
            Platform management
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div>
            <label style={{ display: "block", color: "oklch(0.72 0.006 252)", fontSize: "0.8125rem", fontWeight: 500, marginBottom: "0.375rem" }}>
              Email
            </label>
            <input
              className="field"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="admin@webarmenu.com"
              required
              autoFocus
            />
          </div>

          <div>
            <label style={{ display: "block", color: "oklch(0.72 0.006 252)", fontSize: "0.8125rem", fontWeight: 500, marginBottom: "0.375rem" }}>
              Password
            </label>
            <input
              className="field"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          {error && (
            <p style={{ color: "oklch(0.62 0.22 27)", fontSize: "0.8125rem", margin: 0 }}>
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              marginTop: "0.5rem",
              width: "100%",
              padding: "0.625rem 1rem",
              background: loading ? "oklch(0.44 0.15 260)" : "oklch(0.58 0.22 260)",
              border: "none",
              borderRadius: "6px",
              color: "oklch(0.97 0.003 260)",
              fontSize: "0.875rem",
              fontWeight: 600,
              cursor: loading ? "not-allowed" : "pointer",
              transition: "background 120ms ease-out",
              letterSpacing: "-0.01em",
            }}
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
