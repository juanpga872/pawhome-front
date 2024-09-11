
"use client"; 
import React, { useState, useEffect } from 'react';
import ClientLayout from '@/app/ClientLayout'; 
import PawPrintLoader from '@/app/componets/preloader/preloader'; 
import ProductCard from '@/app/componets/prductCard/ProductCardComponent';
import Slider from '@/app/componets/Slider/Slider'
import Header from '@/app/componets/Headers/headerfood'



export default function Donate() {
  const images = [
    'https://laikapp.s3.amazonaws.com/dev_images_banners/1725671756DOG-CHOW-BANNER-WEB.jpg',
    'https://laikapp.s3.amazonaws.com/dev_images_banners/1725671120BANNER%20Web%20%2817%29.jpg',
    'https://laikapp.s3.amazonaws.com/dev_images_banners/1725671301EXCELLENT%20WEB.jpg',
  ];
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
           <Header />
          <Slider images={images} />
          <ProductCard/>
        </div>
      )}
    </ClientLayout>
  );
}
