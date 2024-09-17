
'use client'; 

import React from 'react';
import { ThemeProvider } from 'styled-components';
import { Footer } from '@/app/componets/ui/Footer/Footer';
import Header from '@/app/componets/ui/Navbar/Header.ui';




interface ClientLayoutProps {
    children: React.ReactNode;
    isLoaded: boolean; 
  }
  

  const ClientLayout: React.FC<ClientLayoutProps> = ({ children, isLoaded }) => {
    const theme = {}; 
  
    return (
      <ThemeProvider theme={theme}>
        {isLoaded && <Header />} 
        <main>{children}</main>
        {isLoaded && <Footer />} 
      </ThemeProvider>
    );
  };
  
  export default ClientLayout;
  