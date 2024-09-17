import React from 'react';
import { DogAdoptionButton } from '@/app/componets/ui/Button/button.ui';
import styled from 'styled-components';

const Information = () => {
  return (
    <Section>
      <Content>
        <Title>
          <h1>TÚ BUSCAS A UN PELUDITO</h1>
          <h2>En Tepa tenemos a muchos buscando un hogar</h2>
          <img src="heart.png" alt="heart" />
          <Description>
            <p>
              Nos alegra saber que estás pensando en adoptar, todos nuestros peludos están a la espera de una familia y son entregados en óptimas condiciones de salud y belleza a adoptantes responsables y amorosos. En esta página conocerás nuestro proceso de adopción y requisitos, pero lo primero es conocer al peludo que deseas adoptar. Si ya tienes su nombre sigue leyendo nuestras condiciones, de lo contrario puedes conocer todos nuestros peluditos en los siguientes links.
            </p>
          </Description>
          <ButtonContainer>
            <DogAdoptionButton>peluditos adoptables</DogAdoptionButton>
          </ButtonContainer>
        </Title>
        <VideoWrapper>
          <iframe
            width="100%"
            height="80%"
            src="https://www.youtube.com/embed/your_video_id"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          />
        </VideoWrapper>
      </Content>
    </Section>
  );
};

export default Information;


export const Section = styled.section`
  display: flex;
  justify-content: center;
  padding: 20px;
  background-color: #f5f5f5; /* Optional: Add a background color if needed */
`;

export const Content = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  max-width: 1200px; /* Adjust to the desired max width */
  width: 100%;
  gap: 20px;
`;

export const Title = styled.div`
  flex: 1;
  max-width: 50%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  text-align: center; /* Center text inside the Title */
`;

export const Description = styled.div`
  margin-bottom: 20px;
`;

export const VideoWrapper = styled.div`
  flex: 1;
  max-width: 50%;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;

  button {
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    border: none;
    border-radius: 5px;
    background-color: #007bff;
    color: white;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #0056b3;
    }
  }
`;
