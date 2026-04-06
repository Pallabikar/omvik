import type { Metadata } from "next";
import { Inter, Playfair_Display, Cinzel } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import PageTransition from "@/components/PageTransition";
import ScrollProgress from "@/components/ScrollProgress";
import WhatsAppWidget from "@/components/WhatsAppWidget";
import BackToTop from "@/components/BackToTop";
import SectionNavigation from "@/components/SectionNavigation";
import ChakraBackground from "@/components/ChakraBackground";
import { Toaster } from "react-hot-toast";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "OMVIK | Custodians of Odisha's Heritage Real Estate",
    template: "%s | OMVIK"
  },
  description: "As custodians of legacy, OMVIK curates premium real estate in Odisha, blending heritage-inspired design with modern excellence.",
  keywords: ["OMVIK", "Odisha Real Estate", "Heritage Properties", "Luxury Apartments Bhubaneswar", "Bhubaneswar Plots", "Premium Townships Odisha"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${playfair.variable} ${cinzel.variable} antialiased`}
      >
        <Toaster 
          position="top-center" 
          reverseOrder={false} 
          toastOptions={{
            style: {
              background: '#FDFCFB',
              color: '#1A1A1A',
              fontSize: '12px',
              fontFamily: 'var(--font-sans)',
              letterSpacing: '0.05em',
              borderRadius: '12px',
              border: '1px solid rgba(0,0,0,0.05)',
              boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
            }
          }}
        />
        <SmoothScroll>
          <ChakraBackground />
          <ScrollProgress />
          <Navigation />
          <PageTransition>
            {children}
          </PageTransition>
          <Footer />
          <WhatsAppWidget />
          <BackToTop />
          <SectionNavigation />
        </SmoothScroll>
      </body>
    </html>
  );
}
