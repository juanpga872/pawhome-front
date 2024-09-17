
"use client"; 

import React, { useState, useEffect } from 'react';
import ClientLayout from '@/app/ClientLayout'; // Ajusta la ruta según tu estructura
import PawPrintLoader from '@/app/componets/preloader/preloader'; // Ajusta la ruta según tu estructura
import styled from 'styled-components';
import DonationCard from '../componets/DonationCard/DonationCard';
import Modal from '../componets/DonationCard/Modal'; // Crea este componente modal por separado

const DonationSection = styled.section`
  padding: 50px 20px;
  background-color: #e9ecef;
  text-align: center;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 20px;
`;

const CardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
`;

const DonateButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #ff1493;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;

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

    return () => clearTimeout(timer); // Limpia el temporizador si el componente se desmonta
  }, []);

  return (
    <ClientLayout isLoaded={!loading}>
      {loading ? (
        <PawPrintLoader />
      ) : (
        <div>
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
