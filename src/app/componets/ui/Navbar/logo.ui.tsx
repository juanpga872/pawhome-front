import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;

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
