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
      color: #FF69B4; // Cambiar color al hacer hover
    }

    svg {
      margin-right: 8px;
    }
  }
`;

const NavLink: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => {
  return (
    <StyledNavLink>
      <Link href={href}>{children}</Link>
    </StyledNavLink>
  );
};

export default NavLink;

