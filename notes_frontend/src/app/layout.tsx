import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Notes — Minimal Manager",
  description: "Create, edit, search, and manage notes in a minimal, modern UI.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased bg-[var(--color-bg)] text-[var(--color-fg)]">
        {children}
      </body>
    </html>
  );
}
