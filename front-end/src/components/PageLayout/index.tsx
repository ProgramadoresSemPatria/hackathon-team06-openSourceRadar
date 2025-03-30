import { ReactNode } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

interface PageLayoutProps {
  children: ReactNode;
}

export const PageLayout = ({ children }: PageLayoutProps) => {
  return (
    <>
      <Navbar />
      <main className="max-w-[96rem] w-full mx-auto px-6 sm:px-12">{children}</main>
      <Footer />
    </>
  );
};
