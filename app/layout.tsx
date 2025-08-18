import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Toaster } from "@/components/ui/sonner";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/app-sidebar";

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
    <html
      lang="fr-FR"
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body className="min-h-screen bg-background text-base antialiased font-sans">
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset className="">
            <div className="flex flex-col min-h-screen">
              <Header />
              <main
                role="main"
                className="flex flex-1 flex-col gap-4 p-4 pt-0 "
              >
                {children}
              </main>
              {/* <footer className="py-4 text-center text-sm text-gray-500 border-t">
                © 2025 BOBW STUDIO. Tous droits réservés.
              </footer> */}
              <Toaster />
            </div>
          </SidebarInset>
        </SidebarProvider>
      </body>
    </html>
  );
}
