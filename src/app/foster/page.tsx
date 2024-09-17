"use client"; 
import React, { useState, useEffect } from 'react';
import ClientLayout from '@/app/ClientLayout'; 
import PawPrintLoader from '@/app/componets/preloader/preloader'; 
import Pets from '@/app/componets/foster-componets/pets'; 

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
        <div>
          <Pets />
        </div>
      )}
    </ClientLayout>
  );
}
