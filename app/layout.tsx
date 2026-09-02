import type { Metadata, Viewport } from "next";
import { MotionConfig } from "framer-motion";
import "./globals.css";
import "@fontsource/cormorant-garamond/400.css";
import "@fontsource/cormorant-garamond/400-italic.css";
import "@fontsource/cormorant-garamond/500.css";
import "@fontsource/cormorant-garamond/500-italic.css";
import "@fontsource/jost/300.css";
import "@fontsource/jost/400.css";
import "@fontsource/jost/500.css";

import { SiteProvider } from "@/lib/site";
import { CartProvider } from "@/lib/cart";
import ErrorBoundary from "@/components/ErrorBoundary";
import Preloader from "@/components/Preloader";
import CustomCursor from "@/components/CustomCursor";
import Navbar from "@/components/Navbar";
import SocialDock from "@/components/SocialDock";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import SearchOverlay from "@/components/SearchOverlay";
import Toast from "@/components/Toast";

export const metadata: Metadata = {
  title: {
    default: "AFRIESSENCE — Where Beauty Meets Radiance",
    template: "%s | AFRIESSENCE"
  },
  description:
    "Thoughtfully crafted beauty rituals inspired by nature, created to nourish, elevate and reveal your natural radiance. Seven rituals. One philosophy of radiance.",
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg"
  },
  openGraph: {
    title: "AFRIESSENCE — Where Beauty Meets Radiance",
    description:
      "Thoughtfully crafted beauty rituals inspired by nature — nourish, elevate and reveal your natural radiance.",
    type: "website",
    siteName: "AFRIESSENCE"
  }
};

export const viewport: Viewport = {
  themeColor: "#241812",
  width: "device-width",
  initialScale: 1
};

export default function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <ErrorBoundary>
          <SiteProvider>
            <CartProvider>
              <MotionConfig reducedMotion="user">
                <Preloader />
                <CustomCursor />
                <Navbar />
                <SocialDock />
                {children}
                <Footer />
                <CartDrawer />
                <SearchOverlay />
                <Toast />
              </MotionConfig>
            </CartProvider>
          </SiteProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
