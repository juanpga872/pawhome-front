import React from 'react';
import styled from 'styled-components';
import { HelpingPetItem } from './HelpingPetItem'; // Asegúrate de ajustar la ruta según la ubicación del componente.

const HelpingPetsSectionWrapper = styled.section`
  padding: 60px;
  background-color: #f7f7f7;
  text-align: center;

  @media (max-width: 768px) {
    padding: 30px;
  }
`;

const HelpingPetsTitle = styled.h2`
  font-size: 28px;
  margin-bottom: 40px;
`;

const ItemsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const HelpingPetsSection: React.FC = () => {
  return (
    <HelpingPetsSectionWrapper>
      <HelpingPetsTitle>How you can help pets</HelpingPetsTitle>
      <ItemsGrid>
        <HelpingPetItem
          icon="/icons/usd-circulo.png"
          title="Donate"
          description="Your donations can make a difference in a pet's life."
        />
        <HelpingPetItem
          icon="/img-helpingpets/volunteer-icon.png"
          title="Volunteer"
          description="Help by volunteering at local shelters and rescue centers."
        />
        <HelpingPetItem
          icon="/img-helpingpets/adopt-icon.png"
          title="Adopt"
          description="Give a loving home to a pet in need and change their life."
        />
      </ItemsGrid>
    </HelpingPetsSectionWrapper>
  );
};
