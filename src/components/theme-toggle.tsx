"use client";

const SunIcon = () => (
  <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
    <circle cx="8.5" cy="8.5" r="3.25" stroke="currentColor" strokeWidth="1.4"/>
    <path d="M8.5 2v1.5M8.5 13.5V15M2 8.5h1.5M13.5 8.5H15M3.98 3.98l1.06 1.06M11.96 11.96l1.06 1.06M3.98 13.02l1.06-1.06M11.96 5.04l1.06-1.06" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
  </svg>
);

const MoonIcon = () => (
  <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
    <path d="M14.5 11.5A7 7 0 0 1 5.5 2.5a7 7 0 0 0 9 9z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export function ThemeToggle() {
  const toggle = () => {
    const isLight = document.documentElement.classList.toggle("light");
    try { localStorage.setItem("theme", isLight ? "light" : "dark"); } catch {}
  };

  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      className="theme-toggle"
      style={{
        background: "none", border: "none", cursor: "pointer",
        color: "var(--c-muted)", padding: "0.3125rem",
        borderRadius: 6, lineHeight: 0, flexShrink: 0,
        display: "flex", alignItems: "center", justifyContent: "center",
      }}
    >
      <span className="tt-sun"><SunIcon /></span>
      <span className="tt-moon"><MoonIcon /></span>
    </button>
  );
}
