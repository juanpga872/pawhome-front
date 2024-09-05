import React from 'react';
import styled from 'styled-components';

interface TipItemProps {
  imageSrc: string;
  title: string;
  description: string;
}

const TipItemWrapper = styled.div`
  margin-top: 20px;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const TipItemImage = styled.img`
  width: 100%;
  height: 100px;
  object-fit: cover;
  border-radius: 10px 10px 0 0;
`;

const TipItemTitle = styled.h3`
  font-size: 18px;
  font-weight: bold;
  margin-top: 10px;
`;

const TipItemDescription = styled.p`
  font-size: 14px;
  margin-top: 10px;
`;

const TipItem = ({ imageSrc, title, description }: TipItemProps) => {
  return (
    <TipItemWrapper>
      <TipItemImage src={imageSrc} alt={title} />
      <TipItemTitle>{title}</TipItemTitle>
      <TipItemDescription>{description}</TipItemDescription>
    </TipItemWrapper>
  );
};

export default TipItem;