import React, { useState } from 'react';
import styled from 'styled-components';

const HowItWorksWrapper = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 60px;
  background-color: #e2e2e2;
  border-radius: 30px;

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

const Button = styled.button`
  display: inline-block;
  padding: 10px 30px;
  background-color: #333;
  color: #fff;
  border-radius: 5px;
  border: none;
  font-size: 16px;
  cursor: pointer;
  background-color: #D45BF8E7;

  &:hover {
    background-color: #FF69B4;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  max-width: 500px;
  width: 100%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const CloseButton = styled.button`
  background: #333;
  color: #fff;
  border: none;
  width: 30px;
  height: 30px;
  cursor: pointer;
  float: right;
  font-size: 16px;

  &:hover {
    background: #FF69B4;
  }
`;

export const HowItWorksSection: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
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
          <Button onClick={openModal}>Pet adoption FAQs</Button>
        </ContentWrapper>
      </HowItWorksWrapper>

      {isModalOpen && (
        <ModalOverlay>
          <ModalContent>
            <CloseButton onClick={closeModal}>X</CloseButton>
            <h1>Frequently Asked Questions About Pet Adoption</h1>
      <h3>What is the adoption process on your site?</h3>
      <p>The adoption process on our site is as follows:</p>
      <p><strong>1. Register:</strong> Create an account on our platform to access all features.</p>
      <p><strong>2. Find your preferred pet:</strong> Use our search tool to find the pet that you like the most.</p>
      <p><strong>3. View details:</strong> Check the detailed information about the pet you are interested in, including photos, description, and requirements.</p>
      <p><strong>4. Click Adopt:</strong> Complete the online adoption form to express your interest in the pet.</p>
      <p><strong>5. Wait for a response:</strong> Our team will review your application and contact you with the next steps.</p>
          </ModalContent>
        </ModalOverlay>
      )}
    </>
  );
};
