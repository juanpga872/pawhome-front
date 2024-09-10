import React from 'react';
import styled, { keyframes } from 'styled-components';

const spiralAndSpin = keyframes`
  0% {
    opacity: 0;
    transform: rotate(0deg) translateX(0px) translateY(0px);
  }
  100% {
    opacity: 1;
    transform: rotate(360deg) translateX(calc(100px * cos(360deg))) translateY(calc(-100px * sin(360deg)));
  }
`;

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #f7f7f7;
`;

const SpinningCircle = styled.div`
  position: relative;
  width: 200px;
  height: 200px;
`;

const Paw = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 50px;
  height: 50px;
  opacity: 0;
  animation: ${spiralAndSpin} 2s linear infinite;
  animation-delay: ${props => props.delay};
  transform-origin: center center;
`;

const PawImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const PawPrintLoader = () => {
  const pawCount = 8;
  const paws = Array.from({ length: pawCount }, (_, index) => ({
    delay: `${(index * 2) / pawCount}s`,  // Ajusta el retraso para distribuir la animación
  }));

  return (
    <LoaderContainer>
      <SpinningCircle>
        {paws.map((paw, index) => (
          <Paw
            key={index}
            delay={paw.delay}
            style={{
              transform: `rotate(${index * (360 / pawCount)}deg) translateX(100px)`,
            }}
          >
            <PawImage src="/icons/preloader.png" alt="Huella" />
          </Paw>
        ))}
      </SpinningCircle>
    </LoaderContainer>
  );
};

export default PawPrintLoader;
