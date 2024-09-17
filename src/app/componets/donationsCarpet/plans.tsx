import styled from 'styled-components';
import Image from 'next/image';
import { FC } from 'react';

// Container for the layout
const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  font-family: 'Roboto', sans-serif; /* Apply the custom font directly here */
  
  @media (min-width: 768px) {
    flex-direction: row;
    padding: 40px;
  }
`;

// Container for the image
const ImageContainer = styled.div`
  width: 100%;
  max-width: 400px;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;

  @media (min-width: 768px) {
    width: 50%;
    margin-bottom: 0;
  }
`;

// Container for the content
const ContentContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  @media (min-width: 768px) {
    width: 50%;
    padding-left: 40px;
  }
`;

// Title styling
const Title = styled.h2`
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 20px;
  
  @media (min-width: 768px) {
    font-size: 32px;
  }
`;

// Grid for the plans
const PlanGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 20px;
  margin-bottom: 20px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr); /* Ensures 2 columns on larger screens */
  }
`;

// Container for each plan item
const PlanContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  border-radius: 5px;
  background-color: #f5f5f5;
`;

// Styling for the star icon
const StarIcon = styled.span`
  color: hotpink;
  font-size: 24px;
  margin-right: 10px;
`;

// Styling for the plan text
const PlanText = styled.p`
  font-size: 16px;
  line-height: 1.5;
`;

// Call to action styling
const CallToAction = styled.p`
  font-size: 20px;
  font-weight: bold;
  color: hotpink;
  text-align: center;
  margin-top: 20px;

  @media (min-width: 768px) {
    font-size: 24px;
  }
`;

// Plan item component
const PlanItem: FC<{ title: string; text: string }> = ({
  title,
  text,
}) => {
  return (
    <PlanContainer>
      <StarIcon>★</StarIcon>
      <PlanText>
        <strong>{title}</strong> {text}
      </PlanText>
    </PlanContainer>
  );
};

// Main page component
const PlanPage: FC = () => {
  return (
    <Container>
      <ImageContainer>
        <Image
          src="/icons/catfond.jpg"
          alt="Black cat"
          width={400}
          height={400}
          layout="responsive"
        />
      </ImageContainer>
      <ContentContainer>
        <Title>Foster Plans</Title>
        <PlanGrid>
          <PlanItem
            title="PLAN T"
            text="Includes accommodation of a pet at Tepa = $80,000."
          />
          <PlanItem
            title="PLAN E"
            text="Includes accommodation of a small pet at Tepa + one bag of food per month = $110,000."
          />
          <PlanItem
            title="PLAN P"
            text="Includes accommodation of a small pet at Tepa + one bag of food per month + annual vaccine = $150,000."
          />
          <PlanItem
            title="PLAN A"
            text="Includes accommodation of a large pet at Tepa + one bag of food per month = $160,000."
          />
        </PlanGrid>
        <CallToAction>
          TOGETHER WE CAN HELP MORE PETS!
        </CallToAction>
      </ContentContainer>
    </Container>
  );
};

export default PlanPage;
