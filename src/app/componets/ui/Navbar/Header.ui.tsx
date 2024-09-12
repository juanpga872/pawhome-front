"use client";
import React, { useState } from 'react';
import styled from 'styled-components';
import Logo from './logo.ui';
import NavLinks from './Navlinks.ui';
import HamburgerMenu from './HamburguerMenu.ui';

const HeaderWrapper = styled.header`
  position: fixed;
  width: 100%;
  padding: 10px 20px;
  z-index: 10;
  height: 2%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #EAA1F269;
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
`;

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <HeaderWrapper>
      <Nav>
        <HamburgerMenu onClick={toggleMenu} />
        <Logo />
        <NavLinks isOpen={isOpen} />
      </Nav>
    </HeaderWrapper>
  );
};

export default Header;
