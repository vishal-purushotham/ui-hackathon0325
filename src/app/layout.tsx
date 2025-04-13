import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Forum",
  description: "A modern, responsive text-based forum",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-secondary">
        {children}
      </body>
    </html>
  );
}
