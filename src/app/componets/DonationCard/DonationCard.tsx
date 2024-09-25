import React from 'react';
import styled from 'styled-components';

// Defines the props the DonationCard component will accept
interface DonationCardProps {
  title: string;
  description: string;
  imgUrl: string;
}

// Main container for the card with hover effect
const Card = styled.div`
  background-color: #f8f9fa;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  text-align: center;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

// Styles for the circular image
const CardImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 50%;
  margin-bottom: 10px;
`;

// Styles for the title
const CardTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 10px;
`;

// Styles for the description
const CardDescription = styled.p`
  font-size: 1rem;
  color: #555;
`;

// Main DonationCard component
const DonationCard: React.FC<DonationCardProps> = ({ title, description, imgUrl }) => {
  return (
    <Card>
      <CardImage src={imgUrl} alt={title} />
      <CardTitle>{title}</CardTitle>
      <CardDescription>{description}</CardDescription>
    </Card>
  );
};

export default DonationCard;
