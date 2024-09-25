import React, { useState, useEffect } from 'react';
import styled from 'styled-components';


const SliderContainer = styled.div`
  position: relative;
  margin: 0 auto;
  overflow: hidden;
  margin-top: 30px;
  max-width: 1200px; /* Ancho máximo para pantallas grandes */
`;


const Slides = styled.div<{ transitioning: boolean }>`
  display: flex;
  transition: transform 0.5s ease-in-out;
  width: 100%;
  transform: ${({ transitioning }) => (transitioning ? 'none' : 'none')};
`;


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
  object-fit: cover;
  margin-bottom: 2rem;
`;


const breakpoints = {
  mobile: '768px',
  tablet: '1024px',
};

const StyledImage = styled(Image)`
  @media (max-width: ${breakpoints.mobile}) {
    /* Estilos específicos para móviles */
    object-fit: cover; /* Ajuste de imagen para móviles */
  }

  @media (min-width: ${breakpoints.mobile}) and (max-width: ${breakpoints.tablet}) {
    /* Estilos específicos para tabletas */
    object-fit: contain; /* Ajuste de imagen para tabletas */
  }

  @media (min-width: ${breakpoints.tablet}) {
    /* Estilos específicos para pantallas grandes */
    object-fit: cover; /* Ajuste de imagen para pantallas grandes */
  }
`;

interface SliderProps {
  images: string[];
}

const Slider: React.FC<SliderProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [transitioning, setTransitioning] = useState(true);
  const [forward, setForward] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      if (forward) {
        setCurrentIndex((prevIndex) => {
          const nextIndex = (prevIndex + 1) % images.length;
          if (nextIndex === images.length - 1) {
            setForward(false);
          }
          return nextIndex;
        });
      } else {
        setCurrentIndex((prevIndex) => {
          const nextIndex = (prevIndex - 1 + images.length) % images.length;
          if (nextIndex === 0) {
            setForward(true);
          }
          return nextIndex;
        });
      }
      setTransitioning(true);
    }, 5000); 

    setTimeout(() => {
      setTransitioning(false);
    }, 500);

    return () => clearInterval(interval);
  }, [forward, images.length]);

  return (
    <SliderContainer>
      <Slides
        transitioning={transitioning}
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((image, index) => (
          <Slide key={index}>
            <StyledImage src={image} alt={`Slide ${index}`} />
          </Slide>
        ))}
      </Slides>
    </SliderContainer>
  );
};

export default Slider;
