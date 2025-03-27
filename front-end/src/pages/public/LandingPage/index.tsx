import { HeroSection } from "./HeroSection";
import SearchSection from "@/pages/public/LandingPage/SearchSection";

export function LandingPage() {
  return (
    <div className="max-w-[96rem] w-full mx-auto [&>section]:px-8 [&>section]:md:px-24 [&>section]:py-20">
      <HeroSection />
      <SearchSection />
    </div>
  );
}
