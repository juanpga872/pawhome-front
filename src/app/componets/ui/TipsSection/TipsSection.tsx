import React from "react";
import styled from "styled-components";
import { TipItem } from './TipItem'; 

const TipsSectionWrapper = styled.section`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 50px;
  background-image: url('');
  background-size: cover;
  background-position: center;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  min-height: 400px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    padding: 20px;
  }
`;

const TipsImage = styled.img`
  width: 300px;
  height: auto;
  border-radius: 10px;

  @media (max-width: 768px) {
    width: 100%;
    max-width: 500px;
    margin-bottom: 20px;
  }
`;

const TipsList = styled.div`
  flex: 1;
  margin-left: 20px;

  @media (max-width: 768px) {
    margin-left: 0;
    text-align: center;
  }
`;

const TipsSectionTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
`;

const SeeAllButton = styled.button`
  background-color: transparent;
  border: 2px solid #000;
  border-radius: 25px;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 20px; 

  &:hover {
    background-color: #000;
    color: #fff;
  }
`;

export const TipsSection: React.FC = () => {
  return (
    <TipsSectionWrapper>
      <TipsImage src="/img-tips/menanddog.jpg" alt="Woman with dogs" />
      <TipsList>
        <TipsSectionTitle>Latest tips and news</TipsSectionTitle>
        <TipItem
          imageSrc="/img-tips/dog1.jpg"
          title="Dog's anxiety"
          description="Learn how to deal with your dog's anxiety and keep them calm."
        />
        <TipItem
          imageSrc="/img-tips/dog2.jpg"
          title="Best beaches for dogs"
          description="Discover the best beaches where your dog can run free."
        />
        <TipItem
          imageSrc="/img-tips/catt.jpg"
          title="Dog health tips"
          description="Tips to ensure your dog's health and well-being."
        />
        <SeeAllButton>See all posts</SeeAllButton>
      </TipsList>
    </TipsSectionWrapper>
  );
};
