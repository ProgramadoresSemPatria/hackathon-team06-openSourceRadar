import { HeroSection } from "./HeroSection";
import SearchSection from "@/pages/public/LandingPage/SearchSection";
import { PageLayout } from "@/components/PageLayout";
import { motion } from "framer-motion";

export function LandingPage() {
  return (
    <PageLayout>
      <motion.div
        className="[&>section]:py-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <HeroSection />
        <SearchSection />
      </motion.div>
    </PageLayout>
  );
}
