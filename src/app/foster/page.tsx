// src/app/donate/page.tsx
"use client"; // Marca el archivo como componente del lado del cliente

import React, { useState, useEffect } from 'react';
import ClientLayout from '@/app/ClientLayout'; // Asegúrate de ajustar la ruta según tu estructura
import PawPrintLoader from '@/app/componets/preloader/preloader'; // Asegúrate de ajustar la ruta según tu estructura

export default function Donate() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Simula la carga por 4 segundos

    return () => clearTimeout(timer); // Limpia el temporizador si el componente se desmonta
  }, []);

  return (
    <ClientLayout isLoaded={!loading}>
      {loading ? (
        <PawPrintLoader />
      ) : (
        <div>
          <h1>Hola foster</h1>
          {/* Aquí puedes agregar más contenido relacionado con la página de donación */}
        </div>
      )}
    </ClientLayout>
  );
}
