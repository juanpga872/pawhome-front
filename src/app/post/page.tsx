'use client';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ClientLayout from '@/app/ClientLayout';
import PawPrintLoader from '@/app/componets/preloader/preloader';
import InstagramPost from '@/app/componets/admin/StockContent';

const Background = styled.div`
  background: linear-gradient(to bottom right, #ff9a9e, #fad0c4);
`;

export default function Page() {
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
          <InstagramPost />
        </Background>
      )}
    </ClientLayout>
  );
}
