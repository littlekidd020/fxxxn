import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

export const runtime = "edge";
import Navbar from "../components/layout/Navbar";
import ConciergeBar from "../components/layout/ConciergeBar";
import Footer from "../components/layout/Footer";
import { LanguageProvider } from "../context/LanguageContext";
import AgeGate from "../components/common/AgeGate";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata = {
  title: "Fxxxn | High-End Service",
  description: "A premium, editorial collection of sophisticated relaxation services.",
};

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;700;900&family=Noto+Serif+SC:wght@400;700;900&display=swap" rel="stylesheet" />
      </head>
      <body suppressHydrationWarning className={`${inter.variable} ${playfair.variable} font-sans antialiased bg-noir text-[#2A2A2A]`}>
        <LanguageProvider>
          <AgeGate>
            <Navbar />
            {children}
            <Footer />
            <ConciergeBar />
          </AgeGate>
        </LanguageProvider>
      </body>
    </html>
  );
}
