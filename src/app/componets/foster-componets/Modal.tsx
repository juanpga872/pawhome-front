import React from 'react';
import styled from 'styled-components';

interface Pet {
  id: number;
  name: string;
  image: string;
  age: string;
  breed: string;
}

interface ModalProps {
  pet: Pet;
  onClose: () => void;
}

export default function Modal({ pet, onClose }: ModalProps) {
  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <h2>{pet.name}</h2>
        <PetImage src={pet.image} alt={pet.name} />
        <p>Raza: {pet.breed}</p>
        <p>Edad: {pet.age}</p>
        <Button onClick={onClose}>Cerrar</Button>
      </ModalContent>
    </ModalOverlay>
  );
}

// Estilos con Styled Components
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  max-width: 500px;
  width: 90%;
  text-align: center;
  position: relative;
`;

const PetImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 10px;
`;

const Button = styled.button`
  background-color: #6c63ff;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  margin-top: 10px;
  cursor: pointer;

  &:hover {
    background-color: #5a54d1;
  }
`;




