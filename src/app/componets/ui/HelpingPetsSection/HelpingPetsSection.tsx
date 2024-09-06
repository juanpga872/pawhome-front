import React from 'react';
import styled from 'styled-components';
import { HelpingPetItem } from './HelpingPetItem';

const HelpingPetsSectionWrapper = styled.section`
  padding: 60px;
  background-color: #f7f7f7;
  text-align: center;
  box-sizing: border-box; 
  @media (max-width: 768px) {
    padding: 30px;
  }
`;

const HelpingPetsTitle = styled.h2`
  font-size: 28px;
  margin-bottom: 40px;

  @media (max-width: 768px) {
    font-size: 24px; 
    margin-bottom: 30px;
  }
`;

const ItemsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  max-width: 100%; 
  margin: 0 auto; 

  @media (max-width: 768px) {
    grid-template-columns: 1fr; 
  }
`;

const StyledHelpingPetItem = styled.div`
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 11); 
  text-align: center;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 100%;
  height: auto; 

  img {
    max-width: 80%; 
    height: auto; 
    margin-bottom: 15px;
  }

  h3 {
    margin: 10px 0;
  }

  p {
    color: #555;
  }
`;

export const HelpingPetsSection: React.FC = () => {
  return (
    <HelpingPetsSectionWrapper>
      <HelpingPetsTitle>How you can help pets</HelpingPetsTitle>
      <ItemsGrid>
        <StyledHelpingPetItem>
          <HelpingPetItem
            icon="/icons/usd-circulo.png"
            title="Donate"
            description="Your donations can make a difference in a pet's life."
          />
        </StyledHelpingPetItem>
        <StyledHelpingPetItem>
          <HelpingPetItem
            icon="/img-helpingpets/volunteer-icon.png"
            title="Volunteer"
            description="Help by volunteering at local shelters and rescue centers."
          />
        </StyledHelpingPetItem>
        <StyledHelpingPetItem>
          <HelpingPetItem
            icon="/img-helpingpets/adopt-icon.png"
            title="Adopt"
            description="Give a loving home to a pet in need and change their life."
          />
        </StyledHelpingPetItem>
      </ItemsGrid>
    </HelpingPetsSectionWrapper>
  );
};
