"use client";
import React from 'react';
import styled from 'styled-components';
import { DogAdoptionButton } from '@/app/componets/ui/Button/button.ui';

const Section = styled.section`
  background: url('https://www.fundaciontepa.org/wp-content/uploads/2020/09/fonddo-cabecera-adopta.jpg') no-repeat center center;
  background-size: cover;
  padding: 100px 0;
  position: relative;
  border-top-left-radius: 50px; 
  border-bottom-right-radius: 50px; 
  overflow: hidden;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  text-align: center;
  position: relative;
  z-index: 1;
`;

const Title = styled.div`
  margin-bottom: 40px;
  color: white;
`;

const Buttons = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  z-index: 2; 

`;

const ContainerInformation = styled.div`
  display: flex;
  flex-direction: column; 
  align-items: center;
  gap: 20px;
  position: relative; 
  z-index: 2; 

  /* Reduce z-index on hover */
  &:hover {
    z-index: 1; /* Lower the z-index when hovered */
  }
`;

export default function Header() {
  return (
    <Section>
      <Container>
        <ContainerInformation>
          <Title>
            <h1>Adoptions</h1>
            <p>Find your soulmate</p>
          </Title>
          <Buttons>
            <DogAdoptionButton href='/donate'>Donate</DogAdoptionButton>
          </Buttons>
        </ContainerInformation>
      </Container>
    </Section>
  );
}
