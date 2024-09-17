import React from 'react';
import styled from 'styled-components';

// Define el tipo Pet con las propiedades necesarias
type Pet = {
  id: number;
  name: string;
  image: string;
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
      <PetImage src={pet.image || 'https://via.placeholder.com/300'} alt={pet.name} />
      <PetDetails>
        <PetName>{pet.name}</PetName>
        <PetInfo>{pet.specie ? 'Dog' : 'Cat'} - {pet.breed}</PetInfo>
        <Location>{pet.location}</Location>
        <ViewMoreButton onClick={onViewMore}>View Details</ViewMoreButton>
      </PetDetails>
    </Card>
  );
};

const Card = styled.div`
  border: 1px solid #ddd;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const PetImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const PetDetails = styled.div`
  padding: 1rem;
`;

const PetName = styled.h3`
  font-size: 1.25rem;
  margin: 0;
`;

const PetInfo = styled.p`
  color: #666;
  font-size: 0.875rem;
`;

const Location = styled.p`
  color: #999;
  font-size: 0.75rem;
`;

const ViewMoreButton = styled.button`
  margin-top: 1rem;
  background-color: #6c63ff;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  padding: 0.75rem 1.5rem;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #5a54d1;
  }
`;

export default PetCard;
