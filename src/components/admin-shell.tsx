"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const nav = [
  {
    href: "/admin/dashboard",
    label: "Restaurants",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <rect x="1" y="2" width="6" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.4"/>
        <rect x="9" y="2" width="6" height="4" rx="1.5" stroke="currentColor" strokeWidth="1.4"/>
        <rect x="9" y="9" width="6" height="5" rx="1.5" stroke="currentColor" strokeWidth="1.4"/>
        <rect x="1" y="11" width="6" height="3" rx="1.5" stroke="currentColor" strokeWidth="1.4"/>
      </svg>
    ),
  },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <div className="flex h-full" style={{ background: "oklch(0.21 0.008 252)" }}>
      {/* Sidebar */}
      <aside
        style={{
          width: 220,
          flexShrink: 0,
          background: "oklch(0.17 0.010 252)",
          borderRight: "1px solid oklch(0.26 0.007 252)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Brand */}
        <div style={{ padding: "1.25rem 1rem 1rem", borderBottom: "1px solid oklch(0.24 0.007 252)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <div style={{
              width: 28, height: 28,
              background: "oklch(0.58 0.22 260)",
              borderRadius: 6,
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0,
            }}>
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M8 1L14.5 4.5V11.5L8 15L1.5 11.5V4.5L8 1Z" stroke="white" strokeWidth="1.5" strokeLinejoin="round"/>
                <circle cx="8" cy="8" r="2" fill="white"/>
              </svg>
            </div>
            <span style={{ color: "oklch(0.92 0.005 252)", fontWeight: 600, fontSize: "0.875rem", letterSpacing: "-0.01em" }}>
              WebAR Menu
            </span>
          </div>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: "0.75rem 0.5rem", display: "flex", flexDirection: "column", gap: 2 }}>
          {nav.map(item => {
            const active = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.625rem",
                  padding: "0.5rem 0.625rem",
                  borderRadius: 6,
                  textDecoration: "none",
                  fontSize: "0.875rem",
                  fontWeight: active ? 600 : 400,
                  color: active ? "oklch(0.92 0.005 252)" : "oklch(0.62 0.008 252)",
                  background: active ? "oklch(0.24 0.008 252)" : "transparent",
                  transition: "background 100ms, color 100ms",
                }}
              >
                <span style={{ color: active ? "oklch(0.58 0.22 260)" : "oklch(0.50 0.006 252)" }}>
                  {item.icon}
                </span>
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div style={{ padding: "0.75rem 0.5rem", borderTop: "1px solid oklch(0.24 0.007 252)" }}>
          <div style={{ padding: "0.5rem 0.625rem", marginBottom: 4 }}>
            <div style={{ fontSize: "0.75rem", color: "oklch(0.55 0.006 252)", fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {session?.user?.email}
            </div>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: "/admin" })}
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.5rem 0.625rem",
              borderRadius: 6,
              border: "none",
              background: "transparent",
              color: "oklch(0.50 0.008 252)",
              fontSize: "0.8125rem",
              cursor: "pointer",
              textAlign: "left",
              transition: "color 100ms, background 100ms",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path d="M6 2H3a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h3M11 11l3-3-3-3M14 8H6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Sign out
          </button>
        </div>
      </aside>

      {/* Content */}
      <main style={{ flex: 1, overflow: "auto", minWidth: 0 }}>
        {children}
      </main>
    </div>
  );
}
