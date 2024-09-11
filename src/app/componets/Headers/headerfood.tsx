import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  height: 300px;
  background-image: url('https://png.pngtree.com/background/20210710/original/pngtree-pet-simple-pink-banner-picture-image_1010389.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  align-items: center; 
  justify-content: center; 
  padding: 0 20px;
  

  @media (max-width: 600px) {
    height: 200px; 
    padding: 0 10px; 
  }

  @media (max-width: 400px) {
    height: 150px; 
    padding: 0 5px; 
`;

const Title = styled.h1`
  margin: 0;
  color: black; 
  font-size: 2rem;

  @media (max-width: 600px) {
    font-size: 1.2rem; 
    text-align: right;
  }
  
  @media (max-width: 400px) {
    font-size: 1.2rem; 
  }
`;

const Header: React.FC = () => {
  return (
    <HeaderContainer>
      <Title>Hello, welcome to shop</Title>
    </HeaderContainer>
  );
};

export default Header;
