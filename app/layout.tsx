import type { Metadata, Viewport } from "next";
import "./globals.css";
import "@fontsource/cormorant-garamond/400.css";
import "@fontsource/cormorant-garamond/400-italic.css";
import "@fontsource/cormorant-garamond/500.css";
import "@fontsource/cormorant-garamond/500-italic.css";
import "@fontsource/cormorant-garamond/600.css";
import "@fontsource/jost/300.css";
import "@fontsource/jost/400.css";
import "@fontsource/jost/500.css";

import { SiteProvider } from "@/lib/site";
import { CartProvider } from "@/lib/cart";
import Preloader from "@/components/Preloader";
import CustomCursor from "@/components/CustomCursor";
import Navbar from "@/components/Navbar";
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
        <SiteProvider>
          <CartProvider>
            <Preloader />
            <CustomCursor />
            <Navbar />
            {children}
            <Footer />
            <CartDrawer />
            <SearchOverlay />
            <Toast />
          </CartProvider>
        </SiteProvider>
      </body>
    </html>
  );
}
