import type { Metadata } from "next";
import { Inter, Playfair_Display, Cinzel } from "next/font/google";
import Script from "next/script";
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
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
import WakeUpBackend from "@/components/WakeUpBackend";

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
  icons: {
    icon: "https://res.cloudinary.com/dqlmblh5i/image/upload/v1776057855/favicon_dy05ya.png",
  },
  other: {
    "facebook-domain-verification": "457536vhdtkadrnfoekkddiuxd3e3i",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${playfair.variable} ${cinzel.variable} antialiased`}
        suppressHydrationWarning
      >
        <Script
          id="meta-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '1505635627892467');
              fbq('track', 'PageView');
            `,
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1505635627892467&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
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
          <Testimonials />
          <Footer />
          <WhatsAppWidget />
          <BackToTop />
          <SectionNavigation />
          <WakeUpBackend />
        </SmoothScroll>
      </body>
    </html>
  );
}
