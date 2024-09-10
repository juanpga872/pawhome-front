"use client"

import styled from 'styled-components';
import LoginForm from '../componets/Login-componets/LoginForm';

const SectionWrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 50px 20px;
  min-height: 100vh;
  background-color: #f9f9f9;
`;

const Logo = styled.img`
  width: 120px;
  margin-bottom: 20px;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  margin-bottom: 30px;
  text-align: center;
`;

const LoginSection = () => {
  return (
    <SectionWrapper>
      <Logo src="/images/logo.png" alt="Logo" />
      <Title>Hello, welcome to pawHome</Title>
      <LoginForm />
    </SectionWrapper>
  );
};

export default LoginSection;
