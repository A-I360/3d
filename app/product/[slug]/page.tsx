import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PdpClient from "@/components/PdpClient";
import { PRODUCTS } from "@/lib/products";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const p = PRODUCTS.find((x) => x.slug === params.slug);
  if (!p) return { title: "Not Found — AFRIESSENCE" };
  return {
    title: `${p.name} — AFRIESSENCE`,
    description: p.blurb
  };
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = PRODUCTS.find((x) => x.slug === params.slug);
  if (!product) notFound();
  return <PdpClient product={product} />;
}
