import React from 'react';
import styled from 'styled-components';
import NavLink from './Navlink.ui';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

interface NavLinksProps {
  isOpen: boolean;
}

const NavbarWrapper = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.8); /* Fondo semitransparente */
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1000; /* Asegura que esté encima de todo */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Sombra para un efecto más elevado */

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const NavLinksList = styled.ul<NavLinksProps>`
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
  justify-content: center;
  flex-grow: 1;

  @media (max-width: 768px) {
    display: ${props => (props.isOpen ? 'block' : 'none')};
    text-align: center;
  }
`;

const NavLinks: React.FC<NavLinksProps> = ({ isOpen }) => {
  return (
    <NavLinksList isOpen={isOpen}>
      <NavLink href="/donate">Donate</NavLink>
      <NavLink href="/foster">Foster</NavLink>
      <NavLink href="/food">Food</NavLink>
      <NavLink href="/login">
        <FontAwesomeIcon icon={faUser} />
      </NavLink>
    </NavLinksList>
  );
};

export default NavLinks;