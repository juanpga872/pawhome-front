"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import LoginForm from '../componets/Login-componets/LoginForm'; 
import PawPrintLoader from '@/app/componets/preloader/preloader'; 

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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); 

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading ? (
        <PawPrintLoader />
      ) : (
        <SectionWrapper>
          <Link href="/">
            <Logo src="/icons/logo.png" alt="Logo" />
          </Link>
          <Title>Hello, welcome to pawHome</Title>
          <LoginForm />
        </SectionWrapper>
      )}
    </>
  );
};

export default LoginSection;

