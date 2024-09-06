import React from 'react';
import styled from 'styled-components';
import NavLink from './Navlink.ui';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faUser } from '@fortawesome/free-solid-svg-icons';

interface NavLinksProps {
  isOpen: boolean;
}

const NavLinksList = styled.ul<NavLinksProps>`
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
  justify-content: center;
  flex-grow: 1;
  z-index: 1;

  @media (max-width: 768px) {
    display: ${props => (props.isOpen ? 'block' : 'none')};
  }
`;

const NavLinks: React.FC<NavLinksProps> = ({ isOpen }) => {
  return (
    <NavLinksList isOpen={isOpen}>
      <NavLink href="/adopt-a-pet">Donate</NavLink>
      <NavLink href="/how-it-works">Foster</NavLink>
      <NavLink href="/help-us">Food</NavLink>
      <NavLink href="/cart">
        <FontAwesomeIcon icon={faShoppingCart} /> {/* Carrito */}
      </NavLink>
      <NavLink href="/Login">
        <FontAwesomeIcon icon={faUser} /> {/* Usuario */}
      </NavLink>
    </NavLinksList>
  );
};

export default NavLinks;
