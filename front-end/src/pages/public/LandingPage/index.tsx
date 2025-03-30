import { HeroSection } from "./HeroSection";
import SearchSection from "@/pages/public/LandingPage/SearchSection";
import { PageLayout } from "@/components/PageLayout";

export function LandingPage() {
  return (
    <PageLayout>
      <div className="[&>section]:py-20">
        <HeroSection />
        <SearchSection />
      </div>
    </PageLayout>
  );
}
