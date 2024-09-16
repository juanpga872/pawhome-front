import React, { useState } from 'react';
import styled from 'styled-components';
import { AiOutlineSearch } from 'react-icons/ai'; // Importa el ícono de búsqueda

// Contenedor del selector
const SelectorContainer = styled.div`
  display: flex;
  flex-direction: column; // Cambio a columna para centrar el ícono de búsqueda
  align-items: center;
  margin-bottom: 1rem;
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
  margin: 0 0.5rem;
  margin-top: 2rem;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-size: 1rem;
  width: 8rem; 
  height: 4rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  background-color: ${({ active }) => (active ? '#5F00F8FF' : '#9333ea')};
  color: white;

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


const SearchIconContainer = styled.div`
  margin-top: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  
  svg {
    width: 2.5rem; // Ajusta el tamaño del ícono según sea necesario
    height: auto;
    color: #5F00F8FF; // Ajusta el color según sea necesario
  }

  &:hover svg {
    color: #6600FFFF; // Cambia el color al pasar el ratón
  }
`;

// Tipo de selector
type TypeSelectorProps = {
  onTypeChange: (type: 'dog' | 'cat') => void;
};

// Componente del selector
const TypeSelector: React.FC<TypeSelectorProps> = ({ onTypeChange }) => {
  const [selectedType, setSelectedType] = useState<'dog' | 'cat'>('dog');

  const handleTypeChange = (type: 'dog' | 'cat') => {
    setSelectedType(type);
    onTypeChange(type);
  };

  return (
    <SelectorContainer>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <SelectorButton active={selectedType === 'dog'} onClick={() => handleTypeChange('dog')}>
          <img src="/icons/icon-dog.avif" alt="dog" />
          <span>Perro</span>
        </SelectorButton>
        <SelectorButton active={selectedType === 'cat'} onClick={() => handleTypeChange('cat')}>
          <img src="/icons/icon-cat.avif" alt="cat" />
          <span>Gato</span>
        </SelectorButton>
      </div>
      <SearchIconContainer>
        <AiOutlineSearch />
      </SearchIconContainer>
    </SelectorContainer>
  );
};

export default TypeSelector;
