import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

const LogoWrapper = styled.div`
  position: absolute; 
  left: 15;
  margin: 10px; 
  display: flex;
  align-items: center;
  z-index: 2;
  @media (max-width: 800px) {
    display: none; 
  }
`;

const Logo = () => {
  return (
    <LogoWrapper>
      <Link href="/">
        <img src="/icons/logo.png" alt="Logo" style={{ height: '50px' }} />
      </Link>
    </LogoWrapper>
  );
};

export default Logo;
