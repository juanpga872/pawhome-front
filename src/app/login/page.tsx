"use client";
import Link from 'next/link';
import styled from 'styled-components';
import LoginForm from '@/app/componets/Login-componets/LoginForm';
import Head from 'next/head';

const SectionWrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 50px 20px;
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
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Link href="/">
        <Logo src="/icons/logo.png" alt="Logo" />
      </Link>
      <Title>Hello, welcome to pawHome</Title>
      <LoginForm />
    </SectionWrapper>
  );
};

export default LoginSection;
