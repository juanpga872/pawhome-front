import React from 'react';
import styled from 'styled-components';
import { DogAdoptionButton } from '@/app/componets/ui/Button/button.ui';
const HeroSectionWrapper = styled.section`
  background: url('https://gacetinmadrid.com/wp-content/uploads/2019/03/mascota.jpg') no-repeat center center;
  background-size: cover; 
  object-fit: contain;
  height: 400px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: flex-start; 
  padding-top: 60px;
  overflow: hidden; 
`;

const HeroText = styled.div`
  text-align: left; 
  padding: 20px;
  border-radius: 10px;
  position: relative; 
  z-index: 0; 
  font-size: 3vh;
  display: flex;
  flex-direction: column; 
  align-items: flex-start; 
  background-color: #75747452;
`;


const HeroSection = () => {
  return (
    <HeroSectionWrapper>
      <HeroText>
        <h4>You can make a difference in their lives</h4>
        <DogAdoptionButton href="/donate" >Donate</DogAdoptionButton>
      </HeroText>
    </HeroSectionWrapper>
  );
};

export default HeroSection;
