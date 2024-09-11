import React from 'react';
import styled from 'styled-components';
import { FaTimes } from 'react-icons/fa';

// Estilos para el menú hamburguesa
const MenuContainer = styled.div<{ visible: boolean }>`
  display: ${({ visible }) => (visible ? 'flex' : 'none')};
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  justify-content: flex-end;
  align-items: center;
  z-index: 1000;
  transition: opacity 0.3s ease;
  opacity: ${({ visible }) => (visible ? '1' : '0')};
`;

const MenuContent = styled.div`
  background-color: white;
  padding: 2rem;
  width: 80%;
  max-width: 400px;
  height: auto;
  border-radius: 0.5rem;
  position: relative;
  overflow-y: auto;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: #9333ea;
  font-size: 1.5rem;
  cursor: pointer;
  position: absolute;
  top: 1rem;
  right: 1rem;

  &:hover {
    color: #7e22ce;
  }
`;

interface MenuProps {
  visible: boolean;
  onClose: () => void;
  children?: React.ReactNode; // Añadido para permitir que se pasen hijos al componente
}

const Menu: React.FC<MenuProps> = ({ visible, onClose, children }) => (
  <MenuContainer visible={visible}>
    <MenuContent>
      <CloseButton onClick={onClose}>
        <FaTimes />
      </CloseButton>
      {children}
    </MenuContent>
  </MenuContainer>
);

export default Menu;
