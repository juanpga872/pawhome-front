import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import Image from 'next/image';

const LogoWrapper = styled.div`
  position: absolute; 
  left: 15px; /* Added 'px' for consistency */
  margin: 10px; 
  display: flex;
  align-items: center;

  @media (max-width: 800px) {
    display: none; 
  }
`;

const Logo = () => {
  return (
    <LogoWrapper>
      <Link href="/" passHref>
        <Image 
          src="/icons/logo.png" 
          alt="Logo" 
          height={50} 
          width={50} 
          style={{ cursor: 'pointer' }} 
        />
      </Link>
    </LogoWrapper>
  );
};

export default Logo;
