import React from 'react';
import styled from 'styled-components';


import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';
const FooterWrapper = styled.footer`
  background-color: #333;
  color: #fff;
  padding: 40px 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const FooterInfo = styled.div`
  flex: 1;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    margin-bottom: 40px;
  }
`;

const FooterNav = styled.nav`
  flex: 1;
  display: flex;
  justify-content: center;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    margin-bottom: 40px;
  }

  a {
    color: #fff;
    text-decoration: none;
    margin: 0 15px;
    font-size: 16px;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const SocialIcons = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;

  @media (max-width: 768px) {
    justify-content: center;
  }

  a {
    color: #fff;
    font-size: 20px;
    margin-left: 20px;

    &:hover {
      color: #aaa;
    }
  }
`;

const FooterCopy = styled.div`
  width: 100%;
  text-align: center;
  padding-top: 20px;
  border-top: 1px solid #444;
  font-size: 14px;
  color: #aaa;
`;

export const Footer: React.FC = () => {
  return (
    <FooterWrapper>
      <FooterInfo>
        <p>1234 Pet Street, City, Country</p>
        <p>Phone: +123 456 789</p>
        <p>Email: contact@petadoption.com</p>
      </FooterInfo>

      <FooterNav>
        <a href="#">Home</a>
        <a href="#">About Us</a>
        <a href="#">Adoption</a>
        <a href="#">Contact</a>
      </FooterNav>

      <SocialIcons>
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
          <FaFacebookF />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          <FaTwitter />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
          <FaInstagram />
        </a>
      </SocialIcons>

      <FooterCopy>
        &copy; 2024 Pet Adoption. All rights reserved.
      </FooterCopy>
    </FooterWrapper>
  );
};
