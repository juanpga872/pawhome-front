"use client";
import { HelpingPetsSection } from "./componets/ui/HelpingPetsSection/HelpingPetsSection";
import  Header  from "./componets/ui/Navbar/Header.ui";
import HeroSection from "./componets/ui/Navbar/Herosection.ui";
import { TipsSection } from "./componets/ui/TipsSection/TipsSection";
import TodaySection from "@/app/componets/ui/TodaySeccion/todayseccion.ui";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <HelpingPetsSection />
        <TodaySection />
        <TipsSection />
      </main>

    </>
  );
}
