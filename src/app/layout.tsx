import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SaaS App",
  description: "SaaS project",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}