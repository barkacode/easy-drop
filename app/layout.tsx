import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Layout/header";
import { Toaster } from "@/components/ui/sonner"


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "BOBW STUDIO",
  description: "A simple tool to create BOBW",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr-FR" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="min-h-screen bg-background text-base antialiased font-sans">
        <div className="flex flex-col min-h-screen">
          <Header />

          <main role="main" className="flex-1 px-4 sm:px-6 lg:px-8 ">
            <div className="max-w-7xl mx-auto w-full">{children}</div>
          </main>

          <footer className="py-4 text-center text-sm text-gray-500 border-t">
            © 2025 BOBW STUDIO. Tous droits réservés.
          </footer>
          <Toaster />
        </div>
      </body>
    </html>
  );
}
