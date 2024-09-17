import React from 'react';
import styled from 'styled-components';
import { DogAdoptionButton } from '@/app/componets/ui/Button/button.ui';
import { FaHeart } from 'react-icons/fa';

// Styled components for the previous section
const Section = styled.section`
  display: flex;
  justify-content: center;
  padding: 20px;
  background: linear-gradient(to bottom right, #ff9a9e, #fad0c4)
`;

const Content = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  max-width: 1200px;
  width: 100%;
  gap: 20px;
`;

const Title = styled.div`
  flex: 1;
  max-width: 50%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  text-align: center; 
`;

const Description = styled.div`
  margin-bottom: 20px;
`;

const IconWrapper = styled.div`
  flex: 1;
  max-width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const Icon = styled(FaHeart)`
  width: 150px;
  height: auto;
  color: yellow;
  filter: drop-shadow(0px 0px 5px rgba(0, 0, 0, 0.3));
`;

// Styled components for the new section
const RequirementsSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 20px;
  background-color: #F7CAD9FF;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  color: black
`;

const RequirementsTitle = styled.h2`
  font-family: 'Roboto', sans-serif;
  font-size: 28px;
  font-weight: bold;
  color: black;
  margin-bottom: 30px;
  text-align: center;
`;

const RequirementsList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
  max-width: 700px;
  width: 100%;
  color: black;
`;

const RequirementItem = styled.li`
  margin: 15px 0;
  color: black;
  font-size: 18px;
  font-family: 'Open Sans', sans-serif;
  display: flex;
  align-items: flex-start;

  &::before {
    content: '💛';
    margin-right: 15px;
    font-size: 22px;
  }

  &.warning::before {
    content: '🚫';
    color: #d9534f;
  }

  &.alert::before {
    content: '⚠️';
    color: #f0ad4e;
  }
`;

// Component
const Information = () => {
  return (
    <>
      <Section>
  <Content>
    <Title>
      <h1>ARE YOU LOOKING FOR A FURRY FRIEND?</h1>
      <h2>At Tepa, we have many looking for a home</h2>
      <Description>
        <p>
          We are glad to know that you are thinking about adopting. All our furry friends are waiting for a family and are given in optimal health and beauty to responsible and loving adopters. On this page, you will learn about our adoption process and requirements. But first, you need to meet the furry friend you want to adopt. If you already know their name, continue reading our conditions. Otherwise, you can meet all our furry friends through the following links.
        </p>
      </Description>
      <DogAdoptionButton href="#pets-section" >Adoptable Furry Friends</DogAdoptionButton>
    </Title>
  </Content>
</Section>
<RequirementsSection>
  <RequirementsTitle>Requirements for Adopters</RequirementsTitle>
  <RequirementsList>
    <RequirementItem>
      The person responsible for the furry friend must be over 25 years old.
    </RequirementItem>
    <RequirementItem>
      This little one will be a member of the family for around 15 years.
    </RequirementItem>
    <RequirementItem>
      Complete the Adoption Pre-Form.
    </RequirementItem>
    <RequirementItem>
      The entered data will be verified by Foundation officials (this verification takes 3 business days).
    </RequirementItem>
    <RequirementItem>
      If your application and everything is in order, we will contact you to coordinate the day when the furry friend you chose will arrive at your home.
    </RequirementItem>
    <RequirementItem>
      Due to the Coronavirus, we cannot do the home visit, so we ask you to record a video of the place where the furry friend will live.
    </RequirementItem>
    <RequirementItem>
      It is important to have the time and space for both you and them to be very well.
    </RequirementItem>
    <RequirementItem>
      It is important to have economic stability. From the moment they arrive in your hands, it will be a great responsibility and will require a lot of care and affection to be happy. Remember, all have been rescued.
    </RequirementItem>
    <RequirementItem className="warning">
      🚫 If you live in an area of canine or feline overpopulation, we ask that you adopt one from the street yourself. Be the savior of that furry friend so that together we can save more lives!!
    </RequirementItem>
    <RequirementItem className="alert">
      ⚠️ You must fulfill the commitments and obligations stated in the Adoption Contract.
    </RequirementItem>
    <RequirementItem>
      We continue with constant follow-up and communication to know how everything is going. They will always be our little ones.
    </RequirementItem>
  </RequirementsList>
</RequirementsSection>
    </>
  );
};

export default Information;
