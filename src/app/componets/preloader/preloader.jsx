// src/components/PawPrintLoader.jsx
import React from 'react';
import styled, { keyframes } from 'styled-components';

// Animación de rebote
const bounce = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
`;

// Animación de pulso
const pulse = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
`;

const PawLoader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #f7f7f7;
`;


const Paw = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  margin: 0 10px;
  
  &::before,
  &::after {
    content: '';
    position: absolute;
    background-color: #e91e63; 
    border-radius: 50%;
    animation: ${bounce} 1.5s infinite ease-in-out, ${pulse} 1.5s infinite ease-in-out;
  }
  
  &::before {
    width: 60px;
    height: 60px;
    top: 0;
    left: 0;
  }
  
  &::after {
    width: 40px;
    height: 40px;
    background-color: #9c27b0; // Morado
    top: 20px;
    left: 10px;
  }
`;

const PawPrintLoader = () => (
  <PawLoader>
    <Paw />
    <Paw />
    <Paw />
    <Paw />
  </PawLoader>
);

export default PawPrintLoader;
