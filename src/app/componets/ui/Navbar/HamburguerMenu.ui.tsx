import React from 'react';
import styled from 'styled-components';

const HamburgerWrapper = styled.div`
  display: none; 
  cursor: pointer;

  @media (max-width: 800px) { 
    display: block; 
  }
`;

const HamburgerIcon = styled.span`
  font-size: 24px;
`;

const HamburgerMenu: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <HamburgerWrapper onClick={onClick}>
      <HamburgerIcon>&#9776;</HamburgerIcon>
    </HamburgerWrapper>
  );
};

export default HamburgerMenu;
