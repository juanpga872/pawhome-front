import React from 'react';
import styled from 'styled-components';

interface HelpingPetItemProps {
  icon: string;
  title: string;
  description: string;
}

const ItemWrapper = styled.div`
  text-align: center;
  padding: 20px;
  transition: transform 0.3s ease;
  background: white;
  border-radius: 8px;
  max-width: 100%; /* Asegura que el contenedor no se extralimite */
  box-sizing: border-box; /* Incluye el padding y border en el ancho total */
  overflow: hidden; /* Previene el desbordamiento del contenido */

  &:hover {
    transform: translateY(-10px);
  }
`;

const ItemIcon = styled.img`
  width: 60px;
  height: 60px;
  margin-bottom: 15px;
  object-fit: contain; 
`;

const ItemTitle = styled.h3`
  font-size: 18px;
  margin: 0;
  margin-bottom: 10px;
`;

const ItemDescription = styled.p`
  font-size: 14px;
  color: #666;
  margin: 0;
`;

export const HelpingPetItem: React.FC<HelpingPetItemProps> = ({ icon, title, description }) => {
  return (
    <ItemWrapper>
      <ItemIcon src={icon} alt={title} />
      <ItemTitle>{title}</ItemTitle>
      <ItemDescription>{description}</ItemDescription>
    </ItemWrapper>
  );
};
