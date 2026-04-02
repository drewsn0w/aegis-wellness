import type { Metadata } from "next";
import "./globals.css";

import { CartProvider } from "@/state/cart-context";
import { SiteHeader } from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "Aegis Wellness",
  description: "Professional peptide wellness service. Browse catalog and request a quote.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <div className="campaignBar">The Premier Provider for Research Peptides</div>
          <SiteHeader />
          <main style={{ flex: 1 }}>{children}</main>
          <footer
            style={{
              padding: "28px 24px",
              color: "var(--muted)",
              borderTop: "1px solid var(--border)",
            }}
          >
            <div style={{ maxWidth: 1120, margin: "0 auto" }}>
              © {new Date().getFullYear()} Aegis Wellness. Request quote flow for
              confirmed catalog details.
            </div>
          </footer>
        </CartProvider>
      </body>
    </html>
  );
}
