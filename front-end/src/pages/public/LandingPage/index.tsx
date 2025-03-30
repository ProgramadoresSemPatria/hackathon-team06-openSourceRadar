import { HeroSection } from "./HeroSection";
import SearchSection from "@/pages/public/LandingPage/SearchSection";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export function LandingPage() {
  return (
    <div className="max-w-[96rem] w-full mx-auto">
      <Navbar />
      <div className="[&>section]:px-8 [&>section]:lg:px-24 [&>section]:py-20">
        <HeroSection />
        <SearchSection />
      </div>
      <Footer />
    </div>
  );
}
