import React from 'react';
import styled from 'styled-components';

const HowItWorksWrapper = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 60px;
  background-color: #f9f9f9;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 30px;
  }
`;

const ImageWrapper = styled.div`
  flex: 1;
  img {
    width: 100%;
    border-radius: 10px;
  }
`;

const ContentWrapper = styled.div`
  flex: 1;
  padding-left: 40px;

  @media (max-width: 768px) {
    padding-left: 0;
    margin-top: 20px;
  }
`;

const Title = styled.h2`
  font-size: 28px;
  margin-bottom: 20px;
  color: #333;
`;

const StepList = styled.ul`
  list-style: none;
  padding: 0;
  margin-bottom: 30px;
`;

const StepItem = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  font-size: 16px;
  color: #666;

  &:before {
    content: '';
    display: block;
    width: 20px;
    height: 20px;
    margin-right: 15px;
    border: 2px solid #333;
    border-radius: 50%;
  }
`;

const Button = styled.a`
  display: inline-block;
  padding: 10px 30px;
  background-color: #333;
  color: #fff;
  border-radius: 5px;
  text-decoration: none;
  font-size: 16px;

  &:hover {
    background-color: #FF69B4;
  }
`;

export const HowItWorksSection: React.FC = () => {
  return (
    <HowItWorksWrapper>
      <ImageWrapper>
        <img src="/img-howitworks/how1.jpg" alt="Person with dogs" />
      </ImageWrapper>
      <ContentWrapper>
        <Title>How adoption works</Title>
        <StepList>
          <StepItem>Find a pet you wish to take home</StepItem>
          <StepItem>Go through our adoption requirements and checklist</StepItem>
          <StepItem>Schedule a visit with the shelter</StepItem>
          <StepItem>Meet the pet and complete procedure</StepItem>
        </StepList>
        <Button href="#">Pet adoption FAQs</Button>
      </ContentWrapper>
    </HowItWorksWrapper>
  );
};
