import type { Metadata } from "next";
import { DM_Sans, Outfit } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";

const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: "AgroFlourish – Fresh, Pesticide-Free Hydroponic Vegetables",
  description: "We grow plants smartly without soil, using nutrient-rich water and coco peat for a sustainable future. Grown locally in Nagpur, Maharashtra.",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "AgroFlourish – Fresh, Pesticide-Free Hydroponic Vegetables",
    description: "We grow plants smartly without soil, using nutrient-rich water and coco peat for a sustainable future.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${dmSans.variable} ${outfit.variable}`}>
      <body className="font-sans antialiased">
        <LanguageProvider>
          <ScrollToTop />
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow flex flex-col">{children}</main>
            <Footer />
          </div>
        </LanguageProvider>
      </body>
    </html>
  );
}
