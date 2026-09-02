import type { Metadata } from "next";
import CheckoutClient from "@/components/CheckoutClient";

export default function CheckoutPage() {
  return <CheckoutClient />;
}

export const metadata: Metadata = {
  title: "Checkout — AFRIESSENCE"
};
