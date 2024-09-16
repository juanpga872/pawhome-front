
"use client"; 

import React, { useState, useEffect } from 'react';
import ClientLayout from '@/app/ClientLayout'; // Asegúrate de ajustar la ruta según tu estructura
import PawPrintLoader from '@/app/componets/preloader/preloader'; // Asegúrate de ajustar la ruta según tu estructura

export default function Donate() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer); // Limpia el temporizador si el componente se desmonta
  }, []);

  return (
    <ClientLayout isLoaded={!loading}>
      {loading ? (
        <PawPrintLoader />
      ) : (
        <div>

        </div>
      )}
    </ClientLayout>
  );
}
