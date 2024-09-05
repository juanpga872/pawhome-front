import React from 'react';
import styled from 'styled-components';

interface HowItWorksStepProps {
  icon: string;
  stepNumber: number;
  title: string;
  description: string;
}

const StepWrapper = styled.div`
  text-align: center;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-10px);
  }
`;

const StepIcon = styled.img`
  width: 80px;
  height: 80px;
  margin-bottom: 20px;
`;

const StepNumber = styled.div`
  font-size: 24px;
  color: #999;
  margin-bottom: 10px;
`;

const StepTitle = styled.h3`
  font-size: 18px;
  margin-bottom: 10px;
`;

const StepDescription = styled.p`
  font-size: 14px;
  color: #666;
`;

export const HowItWorksStep: React.FC<HowItWorksStepProps> = ({ icon, stepNumber, title, description }) => {
  return (
    <StepWrapper>
      <StepIcon src={icon} alt={title} />
      <StepNumber>Step {stepNumber}</StepNumber>
      <StepTitle>{title}</StepTitle>
      <StepDescription>{description}</StepDescription>
    </StepWrapper>
  );
};
