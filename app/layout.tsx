import type { Metadata } from "next";
import { Space_Grotesk, DM_Sans } from "next/font/google";
import Sidebar from "./components/Sidebar";
import MobileNav from "./components/MobileNav";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Martijn Kort — Process Owner & AI-automatisering",
  description:
    "Portfolio van Martijn Kort. Process Owner en AI-automatisering specialist uit Utrecht.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl" className={`${spaceGrotesk.variable} ${dmSans.variable}`}>
      <body className="antialiased">
        <div className="mx-auto max-w-screen-xl px-6 md:px-12 lg:px-24">
          <div className="lg:flex lg:gap-4">
            <Sidebar />
            <MobileNav />
            <main className="pt-24 lg:w-1/2 lg:py-24">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
