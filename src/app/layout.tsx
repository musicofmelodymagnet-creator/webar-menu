import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "WebAR Menu",
  description: "Interactive 3D menus for restaurants",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full antialiased">{children}</body>
    </html>
  );
}
