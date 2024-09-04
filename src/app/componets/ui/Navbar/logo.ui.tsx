import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

const LogoWrapper = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: white; 
  text-decoration: none;
  z-index: 1; 
`;

const Logo = () => {
  return (
    <LogoWrapper>
      <Link href="/"></Link>
    </LogoWrapper>
  );
};

export default Logo;

