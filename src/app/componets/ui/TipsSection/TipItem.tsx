import React from 'react';
import styled from 'styled-components';

interface TipItemProps {
  imageSrc: string;
  title: string;
  description: string;
}

const TipItemWrapper = styled.div`
  display: flex;
  align-items: center;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 15px;
  padding: 15px;
`;

const TipImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 10px;
  object-fit: cover;
  margin-right: 15px;
`;

const TipContent = styled.div`
  flex: 1;
`;

const TipTitle = styled.h3`
  font-size: 16px;
  font-weight: bold;
  margin: 0;
  margin-bottom: 5px;
`;

const TipDescription = styled.p`
  font-size: 14px;
  color: #666;
  margin: 0;
`;

export const TipItem: React.FC<TipItemProps> = ({ imageSrc, title, description }) => {
  return (
    <TipItemWrapper>
      <TipImage src={imageSrc} alt={title} />
      <TipContent>
        <TipTitle>{title}</TipTitle>
        <TipDescription>{description}</TipDescription>
      </TipContent>
    </TipItemWrapper>
  );
};
