import React from 'react';
import styled from 'styled-components';

// Define el tipo Pet con todas las propiedades necesarias
type Pet = {
  id: number;
  name: string;
  image: string;
  age: string;
  breed: string;
  weight: string;
  color: string;
  distance: string;
};

interface PetCardProps {
  pet: Pet;
  onViewMore: (pet: Pet) => void;
  onAdopt: (petId: number) => void;
}

export default function PetCard({ pet, onViewMore}: PetCardProps) {
  return (
    <Card>
      <PetImage src={pet.image} alt={pet.name} />
      <Content>
        <PetName>{pet.name}</PetName>
        <PetBreed>Breed: {pet.breed}</PetBreed>
        <PetAge>Age: {pet.age}</PetAge>
        <ButtonContainer>
          <Button onClick={() => onViewMore(pet)}>View Details</Button>
        </ButtonContainer>
      </Content>
    </Card>
  );
}

const Card = styled.div`
  background-color: #ffffff;
  border-radius: 1.5rem;
  overflow: hidden;
  width: 300px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
`;

const PetImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-bottom: 1px solid #e5e7eb;
`;

const Content = styled.div`
  padding: 1.5rem;
  text-align: center;
`;

const PetName = styled.h2`
  font-size: 1.75rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 0.5rem;
`;

const PetBreed = styled.p`
  font-size: 1.125rem;
  color: #6b7280;
  margin-bottom: 0.25rem;
`;

const PetAge = styled.p`
  font-size: 1.125rem;
  color: #6b7280;
  margin-bottom: 1rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
`;

const Button = styled.button`
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
