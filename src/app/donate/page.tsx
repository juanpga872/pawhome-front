
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

const DonationSection = styled.section`
  position: relative; /* Establece el contexto para el video */
  padding: 50px 20px;
  background-color: #e9ecef;
  text-align: center;
  overflow: hidden; /* Asegura que el video no se salga de los bordes */
  z-index: -1;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 20px;
  color: white; /* El color blanco para que el texto sea visible sobre el video */
  position: relative;
  z-index: 1; /* Eleva el título por encima del video */
`;

const CardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  position: relative;
  z-index: 1; /* Asegúrate de que las tarjetas estén sobre el video */
`;

const DonateButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #ff1493;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  position: relative;
  z-index: 1; /* Botón también por encima del video */

  &:hover {
    background-color: #FF69B4;
  }
`;

export default function Donate() {
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDonateClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

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
        <DonationSection>
            <SectionTitle>Donate to Help Our Pets</SectionTitle>
            <CardsContainer>
              <DonationCard
                title="Food Donation"
                description="Donate food to help keep our pets healthy."
                imgUrl="/images-donate/cat2.jpg"
              />
              <DonationCard
                title="Toy Donation"
                description="Donate toys to keep our pets entertained."
                imgUrl="/images-donate/pldog.jpg"
              />
              <DonationCard
                title="Bedding Donation"
                description="Donate bedding to make our pets comfortable."
                imgUrl="/images-donate/dog2.jpg"
              />
            </CardsContainer>
            <DonateButton onClick={handleDonateClick}>
              Donate Now
            </DonateButton>
          </DonationSection>

          {isModalOpen && (
            <Modal onClose={handleCloseModal}>
              <h2>Choose What You Want to Donate</h2>
              <ul>
                <li>
                  <a href="https://example.com/food" target="_blank" rel="noopener noreferrer">
                    Food Donations
                  </a>
                </li>
                <li>
                  <a href="https://example.com/toys" target="_blank" rel="noopener noreferrer">
                    Toy Donations
                  </a>
                </li>
                <li>
                  <a href="https://example.com/bedding" target="_blank" rel="noopener noreferrer">
                    Bedding Donations
                  </a>
                </li>
              </ul>
            </Modal>
          )}
        </div>
      )}
    </ClientLayout>
  );
}
