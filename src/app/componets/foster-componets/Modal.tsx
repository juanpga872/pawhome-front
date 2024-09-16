import React, { useState } from 'react';
import styled from 'styled-components';
import { ArrowLeft, Heart } from 'lucide-react';

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

interface ModalProps {
  pet: Pet;
  onClose: () => void;
  onAdopt: (petId: number) => void;
}

export default function Modal({ pet, onClose, onAdopt }: ModalProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <ModalOverlay>
      <ModalContent>
        <ImageContainer>
          <PetImage src={pet.image} alt={pet.name} />
          <IconButton onClick={onClose} style={{ left: '1rem' }}>
            <ArrowLeft size={24} />
          </IconButton>
          <HeartIcon
            onClick={handleFavoriteClick}
            isFavorite={isFavorite}
          />
        </ImageContainer>
        <ContentContainer>
          <HeaderRow>
            <PetName>{pet.name}</PetName>
            <Distance>{pet.distance} miles away</Distance>
          </HeaderRow>
          <InfoGrid>
            <InfoItem>
              <InfoLabel>Age</InfoLabel>
              <InfoValue>{pet.age}</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>Weight</InfoLabel>
              <InfoValue>{pet.weight}</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>Color</InfoLabel>
              <InfoValue>{pet.color}</InfoValue>
            </InfoItem>
          </InfoGrid>
          <ActionButtons>
            <Button onClick={() => onAdopt(pet.id)}>Adopt Me</Button>
          </ActionButtons>
        </ContentContainer>
      </ModalContent>
    </ModalOverlay>
  );
}

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(229, 231, 235, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
`;

const ModalContent = styled.div`
  background-color: white;
  border-radius: 1.5rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  max-width: 24rem;
  width: 100%;
  overflow: hidden;
`;

const ImageContainer = styled.div`
  position: relative;
`;

const PetImage = styled.img`
  width: 100%;
  height: 16rem;
  object-fit: cover;
`;

const IconButton = styled.button`
  position: absolute;
  top: 1rem;
  background-color: white;
  border-radius: 50%;
  padding: 0.5rem;
  border: none;
  cursor: pointer;
`;

const HeartIcon = styled(Heart)<{ isFavorite: boolean }>`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background-color: ${props => (props.isFavorite ? 'red' : 'white')};
  border: 2px solid ${props => (props.isFavorite ? 'red' : 'transparent')};
  color: ${props => (props.isFavorite ? 'white' : 'black')};
  border-radius: 50%;
  padding: 0.5rem;
  cursor: pointer;
`;

const ContentContainer = styled.div`
  padding: 1.5rem;
`;

const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const PetName = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
`;

const Distance = styled.span`
  font-size: 0.875rem;
  color: #6B7280;
`;

const InfoGrid = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.5rem;
`;

const InfoItem = styled.div`
  text-align: center;
`;

const InfoLabel = styled.p`
  color: #6B7280;
  font-size: 0.875rem;
`;

const InfoValue = styled.p`
  font-weight: 600;
`;

const ActionButtons = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
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
