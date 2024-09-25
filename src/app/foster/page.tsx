"use client"; 
import React, { useState, useEffect } from 'react';
import styled from 'styled-components'; // Import styled-components
import ClientLayout from '@/app/ClientLayout'; 
import PawPrintLoader from '@/app/componets/preloader/preloader'; 
import Pets from '@/app/componets/foster-componets/pets'; 
import Video from '@/app/componets/foster-componets/information'; 
import Header from '@/app/componets/foster-componets/header'; 
import AdoptionFAQ from '@/app/componets/foster-componets/fromseccion'; 

const Background = styled.div`
  background: linear-gradient(to bottom right, #ff9a9e, #fad0c4);
`;

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); 

    return () => clearTimeout(timer); 
  }, []);

  return (
    <ClientLayout isLoaded={!loading}>
      {loading ? (
        <PawPrintLoader />
      ) : (
        <Background>
          <Header /> 
          <Video />
          <AdoptionFAQ />
          <Pets />
        </Background>
      )}
    </ClientLayout>
  );
}
