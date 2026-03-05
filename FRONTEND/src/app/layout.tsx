import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "pawops | Intelligence Dashboard",
  description: "Operational management and predictive analytics for animal welfare.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}

