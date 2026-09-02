import type { Metadata } from "next";
import JournalPage from "@/components/JournalPage";

export default function Page() {
  return <JournalPage />;
}

export const metadata: Metadata = {
  title: "Journal — AFRIESSENCE"
};
