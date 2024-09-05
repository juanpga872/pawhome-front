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
  background-color: white;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-10px);
  }
`;

const ItemIcon = styled.img`
  width: 60px;
  height: 60px;
  margin-bottom: 15px;
`;

const ItemTitle = styled.h3`
  font-size: 18px;
  margin-bottom: 10px;
`;

const ItemDescription = styled.p`
  font-size: 14px;
  color: #666;
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
