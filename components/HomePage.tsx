"use client";

import Hero3D from "@/components/Hero3D";
import CollectionSection from "@/components/CollectionSection";
import FeaturedStory from "@/components/FeaturedStory";
import SignatureSection from "@/components/SignatureSection";
import BrandStory from "@/components/BrandStory";
import RitualSection from "@/components/RitualSection";
import IngredientsSection from "@/components/IngredientsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import JournalSection from "@/components/JournalSection";
import FaqSection from "@/components/FaqSection";
import FinalCta from "@/components/FinalCta";

export default function HomePage() {
  return (
    <>
      <Hero3D />
      <CollectionSection />
      <FeaturedStory />
      <SignatureSection />
      <BrandStory />
      <RitualSection />
      <IngredientsSection />
      <TestimonialsSection />
      <JournalSection />
      <FaqSection />
      <FinalCta />
    </>
  );
}
