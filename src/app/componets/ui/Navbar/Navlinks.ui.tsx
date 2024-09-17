import React from 'react';
import styled from 'styled-components';
import NavLink from './Navlink.ui';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

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
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  @media (max-width: 768px) {
    display: ${props => (props.isOpen ? 'block' : 'none')};
    position: absolute;
    top: 60px; // Ajustar según la altura del navbar
    left: 0;
    right: 0;
    background: white;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
    border-radius: 0;
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
