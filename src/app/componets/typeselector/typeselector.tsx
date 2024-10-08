import React, { useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image'; // Importa el componente Image de Next.js

// Contenedor del selector
const SelectorContainer = styled.div`
  display: flex;
  flex-direction: column; // Cambio a columna para centrar el ícono de búsqueda
  align-items: center;
  margin-bottom: 1rem;
`;

// Contenedor del botón de selector
const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row; // Mantener en fila por defecto
  flex-wrap: wrap; // Permitir envoltura en pantallas pequeñas
  justify-content: center; // Centrar botones
  gap: 1rem; // Espacio entre botones
`;

// Contenedor del botón de selector
const SelectorButton = styled.button<{ active: boolean }>`
  background-color: ${({ active }) => (active ? '#5F00F8FF' : '#9333ea')};
  color: white;
  border: none;
  padding: 1rem;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center; // Centrar contenido dentro del botón
  font-size: 1rem;
  width: 8rem;
  height: 4rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

  &:hover {
    background-color: ${({ active }) => (active ? '#6600FFFF' : '#7e22ce')};
    transform: scale(1.05);
  }

  img {
    width: 2.5rem; // Ajusta el tamaño del ícono según sea necesario
    height: auto;
    margin-right: 0.75rem;
  }

  span {
    font-size: 1rem;
  }
`;

// Tipo de selector
type TypeSelectorProps = {
  onTypeChange: (type: 'dog' | 'cat' | 'all') => void;
};

// Componente del selector
const TypeSelector: React.FC<TypeSelectorProps> = ({ onTypeChange }) => {
  const [selectedType, setSelectedType] = useState<'dog' | 'cat' | 'all'>('all');

  const handleTypeChange = (type: 'dog' | 'cat' | 'all') => {
    setSelectedType(type);
    onTypeChange(type);
  };

  return (
    <SelectorContainer>
      <ButtonContainer>
        <SelectorButton active={selectedType === 'all'} onClick={() => handleTypeChange('all')}>
          <span>All</span>
        </SelectorButton>
        <SelectorButton active={selectedType === 'dog'} onClick={() => handleTypeChange('dog')}>
          <Image 
            src="/icons/icon-dog.avif" 
            alt="dog" 
            width={40} // Ajusta el tamaño según sea necesario
            height={40} // Ajusta el tamaño según sea necesario
          />
          <span>Dog</span>
        </SelectorButton>
        <SelectorButton active={selectedType === 'cat'} onClick={() => handleTypeChange('cat')}>
          <Image 
            src="/icons/icon-cat.avif" 
            alt="cat" 
            width={40} // Ajusta el tamaño según sea necesario
            height={40} // Ajusta el tamaño según sea necesario
          />
          <span>Cat</span>
        </SelectorButton>
      </ButtonContainer>
    </SelectorContainer>
  );
};

export default TypeSelector;
