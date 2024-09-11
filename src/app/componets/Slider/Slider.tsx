import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const SliderContainer = styled.div`
  position: relative;
  margin: 0 auto; 
  overflow: hidden;
  margin-top: 30px;
`;

const Slides = styled.div`
  display: flex;
  transition: transform 0.5s ease-in-out;
  width: 100%; 


  @media (max-width: 412px) and (max-height: 915px) {
    width: 100%; 
  }
`;




// este
const Slide = styled.div`   
  min-width: 100%;
  box-sizing: border-box;
  display: flex;
  align-items: center; 
  justify-content: center;
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover; /* Ajusta la imagen para cubrir el área del slide */

  /* Media query para pantallas pequeñas */
  @media (max-width: 412px) and (max-height: 915px) {
    width: 100%; /* Ajusta el ancho de la imagen al 100% del contenedor */
    height: auto; /* Ajusta la altura de la imagen automáticamente para mantener la proporción */
  }
`;


interface SliderProps {
  images: string[];
}

const Slider: React.FC<SliderProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); 
    return () => clearInterval(interval); 
  }, [images.length]);
  return (
    <SliderContainer>
      <Slides style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {images.map((image, index) => (
          <Slide key={index}>
            <Image src={image} alt={`Slide ${index}`} />
          </Slide>
        ))}
      </Slides>
    </SliderContainer>
  );
};

export default Slider;
