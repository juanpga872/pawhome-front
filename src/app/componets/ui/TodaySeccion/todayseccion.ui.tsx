import React from 'react';
import styled from 'styled-components';
import {DogAdoptionButton} from'@/app/componets/ui/Button/button.ui'

const TodaySectionWrapper = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  background-color: #f7f7f7;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  height: 600px; /* altura fija */
`;

const TodayImage = styled.img`
  flex-basis: 40%; 
  width: 400px; 
  height: 400px; 
  border-radius: 10px;
  object-fit: cover;
  margin-left: auto; 
  @media (max-width: 1920px) {
    width: 350px; 
    height: 350px; 
    margin-top: 7%;
      margin-right: 10%;
  }
  @media (max-width: 768px) {
    width: 100%;
    height: 100%;
    margin: 20px auto;
  }
  @media (max-width: 500px) {
    width: 50%; 
    height: auto; 
    margin: 20px auto;
    margin-left: 25%; 
  }
  @media (max-width: 412px) and (max-height: 915px) {
    width: 50%; 
    height: auto; 
    margin: 20px 0;
    
  }
  @media (max-width: 915px) and (max-height: 412px) {
    margin-top: 9%;
  }
`;

const TodayContent = styled.div`
  flex-basis: 30%; 
  display: flex;
  flex-direction: column;
  padding: 10%;
  @media (max-width: 1920px) {
    flex-basis: 20%;
  }
  @media (max-width: 768px) {
    flex-basis: 70%;
  }
  @media (max-width: 412px) {
    flex-basis: 100%; 
    margin-left: 0; 
    padding: 20px; 
    
  }
`;

const TodayTitle = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const TodayDescription = styled.p`
  font-size: 16px;
  color: #666;
  margin-bottom: 20px;
`;

const TodaySection: React.FC = () => {
  const defaultProps = { 
    title: 'why adopt today?', 
    imageSrc: 'https://wonderphotoshop.es/wp-content/uploads/2023/10/mascotas-4-wps.jpg',
    description: 'Discover the unconditional love of a loyal friend. Adopt today and make a difference in an animals life.',
  };

  return (
    <TodaySectionWrapper>
      <TodayContent>
        <TodayTitle>{defaultProps.title}</TodayTitle>
        <TodayDescription>{defaultProps.description}</TodayDescription>
        <DogAdoptionButton href="/foster" >Adopt a pet</DogAdoptionButton>
      </TodayContent>
      <TodayImage src={defaultProps.imageSrc} alt={defaultProps.title} />
    </TodaySectionWrapper>
  );
};

export default TodaySection;