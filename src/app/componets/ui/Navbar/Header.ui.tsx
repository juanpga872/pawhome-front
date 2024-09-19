import React, { useState } from 'react';
import styled from 'styled-components';
import Logo from './logo.ui';
import NavLinks from './Navlinks.ui';
import HamburgerMenu from './HamburguerMenu.ui';

const HeaderWrapper = styled.header`
  position: fixed;
  width: 100%;
  padding: 10px 20px;
  height: 5%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #EAA1F269;
  z-index: 1;
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
`;

const Header = () => {
  const [isOpen] = useState(false);


  return (
    <HeaderWrapper>
      <Nav>
        <HamburgerMenu/>
        <Logo />
        <NavLinks isOpen={isOpen} />
      </Nav>
    </HeaderWrapper>
  );
};

export default Header;
