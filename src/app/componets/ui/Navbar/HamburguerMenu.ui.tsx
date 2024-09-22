import React, { useState, useEffect, MouseEvent } from 'react';
import styled, { keyframes } from 'styled-components';
import { MdPerson } from 'react-icons/md'; // Importa el ícono de usuario de react-icons
import Image from 'next/image';

// Animaciones
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

// Estilos
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
  animation: ${({ isOpen }) => (isOpen ? slideIn : slideOut)} 0.3s ease-in-out;
  z-index: 2;
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

interface HamburgerMenuProps {
  onClick: () => void;
}

const HamburgerMenu: React.FC<HamburgerMenuProps> = ({ onClick }) => (
  <HamburgerWrapper onClick={onClick}>
    <HamburgerIcon>&#9776;</HamburgerIcon>
  </HamburgerWrapper>
);

const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

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

  const handleLogout = () => {
    localStorage.removeItem('token');
    // Aquí puedes redirigir a la página de inicio o hacer otra acción
  };

  return (
    <div>
      <HamburgerMenu onClick={() => setIsMenuOpen(!isMenuOpen)} />
      <MenuWrapper isOpen={isMenuOpen} onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={() => setIsMenuOpen(false)}>&#10005;</CloseButton>
        <MenuItems>
          <MenuItem href="/">
            <Image src="/icons/logo.png" alt="Logo" width={100} height={100} />
          </MenuItem>
          <MenuItem href="/donate">Donate</MenuItem>
          <MenuItem href="/foster">Foster</MenuItem>
          <MenuItem href="/food">Food</MenuItem>
        </MenuItems>
        <IconContainer>
          {!token ? (
            <MenuItem href="/login">
              <MdPerson />
              Login
            </MenuItem>
          ) : (
            <MenuItem href="#" onClick={handleLogout}>
              <MdPerson />
              Logout
            </MenuItem>
          )}
        </IconContainer>
      </MenuWrapper>
    </div>
  );
};

export default App;

