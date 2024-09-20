import React from 'react';
import styled from 'styled-components';

// Define el tipo Pet con las propiedades necesarias
type Pet = {
  id: number;
  name: string;
  imagePath: string; // Cambiado a 'imagePath'
  breed: string;
  location: string;
  specie: boolean; // true for dog, false for cat
};

interface PetCardProps {
  pet: Pet;
  onViewMore: () => void;
}

const PetCard: React.FC<PetCardProps> = ({ pet, onViewMore }) => {
  return (
    <Card>
      <PetImage src={pet.imagePath || 'https://via.placeholder.com/300'} alt={pet.name} />
      <PetDetails>
        <PetName>{pet.name}</PetName>
        <PetInfo>{pet.specie ? '🐶 Dog' : '🐱 Cat'} - {pet.breed}</PetInfo>
        <Location>{pet.location}</Location>
        <ViewMoreButton onClick={onViewMore}>View Details</ViewMoreButton>
      </PetDetails>
    </Card>
  );
};

const Card = styled.div`
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  max-width: 300px;
  margin: 1rem auto;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 600px) {
    max-width: 90%;
    margin: 0.5rem;
  }
`;

const PetImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-bottom: 4px solid #6c63ff;

  @media (max-width: 600px) {
    height: 150px;
  }
`;

const PetDetails = styled.div`
  padding: 1rem;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const PetName = styled.h3`
  font-size: 1.5rem;
  margin: 0;
  color: #333;
`;

const PetInfo = styled.p`
  color: #777;
  font-size: 1rem;
  margin: 0.5rem 0;

  @media (max-width: 600px) {
    font-size: 0.875rem;
  }
`;

const Location = styled.p`
  color: #999;
  font-size: 0.875rem;
  margin-bottom: 1rem;

  @media (max-width: 600px) {
    font-size: 0.75rem;
  }
`;

const ViewMoreButton = styled.button`
  background-color: #6c63ff;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  padding: 0.75rem 1.5rem;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: #5a54d1;
    transform: scale(1.05);
  }

  @media (max-width: 600px) {
    font-size: 0.875rem;
    padding: 0.5rem 1rem;
  }
`;

export default PetCard;
