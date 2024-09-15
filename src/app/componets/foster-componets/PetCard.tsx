import React from 'react';
import styled from 'styled-components';

interface Pet {
  id: number;
  name: string;
  image: string;
  age: string;
  breed: string;
}

interface PetCardProps {
  pet: Pet;
  onViewMore: (pet: Pet) => void; // Función para ver más detalles
  onAdopt: (petId: number) => void; // Función para adoptar la mascota
}

export default function PetCard({ pet, onViewMore, onAdopt }: PetCardProps) {
  return (
    <Card>
      <PetImage src={pet.image} alt={pet.name} />
      <h2>{pet.name}</h2>
      <p>Raza: {pet.breed}</p>
      <p>Edad: {pet.age}</p>
      <Button onClick={() => onViewMore(pet)}>Ver más</Button>
      <Button onClick={() => onAdopt(pet.id)}>Adoptar</Button>
    </Card>
  );
}

const Card = styled.div`
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 15px;
  width: 300px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const PetImage = styled.img`
  width: 100%;
  height: 200px; /* Altura fija para asegurar consistencia */
  object-fit: cover; /* Asegura que la imagen mantenga sus proporciones y se ajuste al contenedor */
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
  width: 100%;

  &:hover {
    background-color: #5a54d1;
  }
`;


