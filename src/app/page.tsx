// src/app/page.tsx
"use client"; // Agrega esto para marcar el archivo como Client Component

import React, { useState, useEffect } from 'react';
import { HelpingPetsSection } from "./componets/ui/HelpingPetsSection/HelpingPetsSection";

import Header from "./componets/ui/Navbar/Header.ui";
import HeroSection from "./componets/ui/Navbar/Herosection.ui";
import { TipsSection } from "./componets/ui/TipsSection/TipsSection";
import TodaySection from "@/app/componets/ui/TodaySeccion/todayseccion.ui";
import PawPrintLoader from '@/app/componets/preloader/preloader';
import { HowItWorksSection } from "./componets/ui/HowItWorksSection/HowItWorksSection";
import { Footer } from "./componets/ui/Footer/Footer";


export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
   
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); 

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
 <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      {loading ? (
        <PawPrintLoader />
      ) : (
        <>
          <Header />
            <HeroSection />
            <TodaySection />
            <HowItWorksSection/>
            <HelpingPetsSection />
            <TipsSection />
            <Footer/>
        </>
      )}

    </>
  );
}