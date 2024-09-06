"use client";
import { HelpingPetsSection } from "./componets/ui/HelpingPetsSection/HelpingPetsSection";
import { HowItWorksSection } from "./componets/ui/HowItWorksSection/HowItWorksSection";
import  Header  from "./componets/ui/Navbar/Header.ui";
import HeroSection from "./componets/ui/Navbar/Herosection.ui";
import { TipsSection } from "./componets/ui/TipsSection/TipsSection";
import TodaySection from "@/app/componets/ui/TodaySeccion/todayseccion.ui";
import { Footer } from "./componets/ui/Footer/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <TodaySection />
        <HowItWorksSection />
        <HelpingPetsSection />
        <TipsSection />
        <Footer /> 
      </main>

    </>
  );
}
