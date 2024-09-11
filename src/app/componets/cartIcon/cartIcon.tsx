import React from 'react';
import styled from 'styled-components';
import { AiOutlineShoppingCart } from 'react-icons/ai';

// Contenedor del ícono del carrito
const CartIconContainer = styled.div`
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  z-index: 1000; 

  @media (min-width: 769px) {
    display: none;
  }
`;

// Estilo del ícono del carrito
const StyledCartIcon = styled(AiOutlineShoppingCart)`
  width: 2rem;
  height: 2rem;
  color: #9333ea;
  cursor: pointer;
  transition: color 0.3s;
  background-color: #F7F6F1FF;
  border-radius: 50px;
  position: relative; // Para posicionar el badge correctamente

  &:hover {
    color: #7e22ce;
  }
`;

// Contenedor del badge de notificación
const Badge = styled.span`
  position: absolute;
  top: -0.5rem;
  right: -0.5rem;
  background-color: #ef4444;
  color: white;
  border-radius: 50%;
  padding: 0.25rem 0.5rem;
  font-size: 0.75rem;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface ShoppingCartProps {
  itemCount: number;
  onOpenCartModal: () => void;
}

const ShoppingCart: React.FC<ShoppingCartProps> = ({ itemCount, onOpenCartModal }) => (
  <CartIconContainer onClick={onOpenCartModal}>
    <StyledCartIcon aria-hidden="true" />
    {itemCount > 0 && <Badge>{itemCount}</Badge>}
  </CartIconContainer>
);

export default ShoppingCart;
