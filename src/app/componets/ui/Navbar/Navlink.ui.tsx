import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

const StyledNavLink = styled.li`
  margin: 0 20px;
  
  a {
    color: #fff;
    text-decoration: none;
    font-size: 1rem;
    padding: 12px 20px;
    border-radius: 25px;
    transition: background 0.3s ease, color 0.3s ease;
    display: flex;
    align-items: center;

    &:hover, &:focus {
      background: rgba(255, 255, 255, 0.2);
      color: #FF69B4;
    }

    svg {
      margin-right: 8px;
    }
  }
`;

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  onClick?: () => void; // Agregar onClick opcional
}

const NavLink: React.FC<NavLinkProps> = ({ href, children, onClick }) => {
  return (
    <StyledNavLink>
      <Link href={href} passHref>
        <a onClick={onClick}>{children}</a> {/* Pasar el onClick aquí */}
      </Link>
    </StyledNavLink>
  );
};

export default NavLink;

