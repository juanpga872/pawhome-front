
"use client";

import React, { useState, useEffect } from 'react';
import ClientLayout from '@/app/ClientLayout'; // Adjust path according to your structure
import PawPrintLoader from '@/app/componets/preloader/preloader'; // Adjust path according to your structure
import styled from 'styled-components';
import DonationCard from '../componets/DonationCard/DonationCard';
import Modal from '../componets/DonationCard/Modal'; // Create this modal component separately
import DonationPage from '../componets/Headers/headerDonate';
import Donations from '../componets/donationsCarpet/donationseccion';
import ApadrinaUnPerrito from '../componets/donationsCarpet/apadrinar';
import RightsAndDuties from '../componets/donationsCarpet/derechosYdeberes'; // Import the RightsAndDuties component
import PlanPage from '../componets/donationsCarpet/plans';
import DonationComponent from '@/app/componets/donationsCarpet/payu'



export default function Donate() {
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);



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

          <DonationPage />
          <Donations />
          <DonationComponent/>
          <ApadrinaUnPerrito />
          <RightsAndDuties /> 
          <PlanPage/> 
            
        </div>
      )}
    </ClientLayout>
  );
}
