import type { Metadata } from "next";
import { Space_Grotesk, DM_Sans } from "next/font/google";
import Sidebar from "./components/Sidebar";
import MobileNav from "./components/MobileNav";
import ScrollToTop from "./components/ScrollToTop";
import ParticleBackground from "./components/ParticleBackground";
import SpotlightCursor from "./components/SpotlightCursor";
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
    "Portfolio van Martijn Kort. Process Owner en AI-automatisering specialist uit Utrecht. Gespecialiseerd in procesoptimalisatie, AI en automatisering.",
  metadataBase: new URL("https://martijnkort.nl"),
  openGraph: {
    title: "Martijn Kort — Process Owner & AI-automatisering",
    description:
      "Process Owner en AI-automatisering specialist uit Utrecht. Gespecialiseerd in procesoptimalisatie, AI en automatisering.",
    url: "https://martijnkort.nl",
    siteName: "Martijn Kort",
    locale: "nl_NL",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Martijn Kort — Process Owner & AI-automatisering",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Martijn Kort — Process Owner & AI-automatisering",
    description:
      "Process Owner en AI-automatisering specialist uit Utrecht.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl" className={`${spaceGrotesk.variable} ${dmSans.variable}`}>
      <body className="antialiased">
        <ParticleBackground />
        <SpotlightCursor />
        <div className="mx-auto max-w-screen-xl px-6 md:px-12 lg:px-24">
          <div className="lg:flex lg:gap-4">
            <Sidebar />
            <MobileNav />
            <main className="pt-24 lg:w-1/2 lg:py-24">
              {children}
            </main>
          </div>
          <footer className="pb-8 pt-16 text-center text-xs text-slate/60">
            Ontworpen &amp; gebouwd door Martijn Kort · Next.js &amp; Tailwind CSS
          </footer>
        </div>
        <ScrollToTop />
      </body>
    </html>
  );
}
