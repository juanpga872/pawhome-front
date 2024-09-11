
"use client"; 
import React, { useState, useEffect } from 'react';
import { HelpingPetsSection } from "./componets/ui/HelpingPetsSection/HelpingPetsSection";
import HeroSection from "./componets/ui/Navbar/Herosection.ui";
import { TipsSection } from "./componets/ui/TipsSection/TipsSection";
import TodaySection from "@/app/componets/ui/TodaySeccion/todayseccion.ui";
import PawPrintLoader from '@/app/componets/preloader/preloader';
import { HowItWorksSection } from "./componets/ui/HowItWorksSection/HowItWorksSection";
import ClientLayout from '@/app/ClientLayout';


export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 4000); 

    return () => clearTimeout(timer);
  }, []);

  return (
    <ClientLayout isLoaded={!loading}>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      {loading ? (
        <PawPrintLoader />
      ) : (
        <>
          <HeroSection />
          <TodaySection />
          <HowItWorksSection />
          <HelpingPetsSection />
          <TipsSection />
        </>
      )}
    </ClientLayout>
  );
}
