import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Aya (ඇය) — Menstrual Cycle & Reproductive Wellness",
  description: "Personalized cycle predictions, daily mood & symptom logging, and reproductive health guidance.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-[#F4F5FA] font-sans text-[#1B1E28] antialiased">
        {children}
      </body>
    </html>
  );
}
