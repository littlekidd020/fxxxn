import { Inter, Playfair_Display, Noto_Sans_SC, Noto_Serif_SC } from "next/font/google";
import "./globals.css";

export const runtime = "edge";
import Navbar from "../components/layout/Navbar";
import ConciergeBar from "../components/layout/ConciergeBar";
import Footer from "../components/layout/Footer";
import { LanguageProvider } from "../context/LanguageContext";
import AgeGate from "../components/common/AgeGate";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });
const notoSansCN = Noto_Sans_SC({ 
  subsets: ["latin"], 
  weight: ["400", "700", "900"],
  variable: "--font-noto-sans-cn",
  display: 'swap',
});
const notoSerifCN = Noto_Serif_SC({ 
  subsets: ["latin"], 
  weight: ["400", "700", "900"],
  variable: "--font-noto-serif-cn",
  display: 'swap',
});

export const metadata = {
  title: "Fxxxn | High-End Service",
  description: "A premium, editorial collection of sophisticated relaxation services.",
};

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning className={`${inter.variable} ${playfair.variable} ${notoSansCN.variable} ${notoSerifCN.variable} font-sans antialiased bg-noir text-white/90`}>
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
