// Mise en page racine de l'application
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FMT e.V. — Fondation Mefo Tuèbu",
  description:
    "Fondation internationale pour la prévention, l'éducation et l'intégration sociale. Enregistrée en Allemagne.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      {/* Évite flex/grid sur <body> pour ne pas perturber les éléments fixed/sticky. */}
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
