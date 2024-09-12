import React, { useState, useEffect, MouseEvent } from 'react';
import styled, { keyframes } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import CartComponent from '@/app/componets/cartIcon/cart.components'; // Importa el componente del carrito

// Animations
const slideIn = keyframes`
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
`;

const slideOut = keyframes`
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-100%);
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

// Styles
const Overlay = styled.div<{ isOpen: boolean }>`
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  z-index: 10;
  animation: ${({ isOpen }) => (isOpen ? fadeIn : fadeOut)} 0.3s ease-in-out;
  transition: opacity 0.3s ease-in-out;
`;

const MenuWrapper = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 250px;
  height: 100%;
  background: #fff;
  box-shadow: 4px 0 12px rgba(0, 0, 0, 0.5);
  transform: translateX(${({ isOpen }) => (isOpen ? '0' : '-100%')});
  transition: transform 0.3s ease-in-out;
  animation: ${({ isOpen }) => (isOpen ? slideIn : slideOut)} 0.10s ease-in-out;
  z-index: 20;
  display: flex;
  flex-direction: column;
  padding: 16px;
  box-sizing: border-box;
`;

const MenuItems = styled.div`
  flex: 1; 
`;

const IconContainer = styled.div`
  margin-top: auto; 
  display: flex;
  flex-direction: column;
  gap: 16px; 
`;

const MenuItem = styled.a`
  padding: 16px;
  border-bottom: 1px solid #ddd;
  cursor: pointer;
  text-decoration: none;
  color: #333;
  display: flex;
  align-items: center;
  gap: 10px; 
  transition: background-color 0.2s ease, color 0.2s ease;
  &:hover {
    background-color: #f0f0f0;
    color: pink;
  }

  svg {
    font-size: 20px; 
  }
`;

const CloseButton = styled.div`
  align-self: flex-end;
  font-size: 24px;
  cursor: pointer;
  padding: 16px;
  transition: color 0.2s ease;

  &:hover {
    color: #ff0000;
  }
`;

const HamburgerWrapper = styled.div`
  display: none;
  cursor: pointer;
  position: fixed;
  top: 5px;
  left: 16px;
  z-index: 30;

  @media (max-width: 800px) {
    display: block;
  }
`;

const HamburgerIcon = styled.span`
  font-size: 24px;
  color: #333;
`;

const HamburgerMenu: React.FC<{ onClick: () => void }> = ({ onClick }) => (
  <HamburgerWrapper onClick={onClick}>
    <HamburgerIcon>&#9776;</HamburgerIcon>
  </HamburgerWrapper>
);

const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as Node;
    const currentTarget = event.currentTarget as Node;

    if (currentTarget && !currentTarget.contains(target)) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside as any);
    return () => document.removeEventListener('mousedown', handleClickOutside as any);
  }, []);
  
  return (
    <div>
      <HamburgerMenu onClick={() => setIsMenuOpen(!isMenuOpen)} />
      <Overlay isOpen={isMenuOpen} />
      <MenuWrapper isOpen={isMenuOpen} onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={() => setIsMenuOpen(false)}>&#10005;</CloseButton>
        <MenuItems>
          <MenuItem href="/">
            <img src="/icons/logo.png" alt="Logo" style={{ height: '100px' }} />
          </MenuItem>
          <MenuItem href="/donate">Donate</MenuItem>
          <MenuItem href="/foster">Foster</MenuItem>
          <MenuItem href="/food">Food</MenuItem>
        </MenuItems>
        <IconContainer>
          <MenuItem href="/login">
            <FontAwesomeIcon icon={faUser} />
            Login
          </MenuItem>
        </IconContainer>
      </MenuWrapper>
    </div>
  );
};

export default App;
