// src/app/layouts/ClientLayout.tsx
'use client'; // Marca el archivo como componente del lado del cliente

import React from 'react';
import { ThemeProvider } from 'styled-components';// Asegúrate de ajustar la ruta según tu estructura
import { Footer } from '@/app/componets/ui/Footer/Footer';
import Header from '@/app/componets/ui/Navbar/Header.ui';



interface ClientLayoutProps {
    children: React.ReactNode;
    isLoaded: boolean; // Añadido para controlar la carga
  }
  
  // Componente de diseño para la página
  const ClientLayout: React.FC<ClientLayoutProps> = ({ children, isLoaded }) => {
    const theme = {}; // Aquí puedes definir un tema predeterminado si es necesario
  
    return (
      <ThemeProvider theme={theme}>
        {isLoaded && <Header />} {/* Renderiza el Header sólo si está cargado */}
        <main>{children}</main>
        {isLoaded && <Footer />} {/* Renderiza el Footer sólo si está cargado */}
      </ThemeProvider>
    );
  };
  
  export default ClientLayout;
  