import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

const StyledNavLink = styled.li`
  margin: 0 15px;
  
  a {
    color: Black; 
    text-decoration: none;
    font-size: 1rem;
    padding: 10px 15px;
    border-radius: 5px;
    transition: background 0.3s ease;

    &:hover {
      background: rgba(255, 255, 255, 0.3);
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
