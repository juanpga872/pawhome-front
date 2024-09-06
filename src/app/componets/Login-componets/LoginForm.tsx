import React, { useState } from 'react';
import styled, { createGlobalStyle, keyframes, css } from 'styled-components';
import { FaFacebookF, FaGooglePlusG, FaLinkedinIn } from 'react-icons/fa';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Montserrat:400,800');
  
  * {
    box-sizing: border-box;
  }
  
  body {
    background: #f6f5f7;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    font-family: 'Montserrat', sans-serif;
    height: 100vh;
    margin: -20px 0 50px;
  }
`;

const show = keyframes`
  0%, 49.99% {
    opacity: 0;
    z-index: 1;
  }
  
  50%, 100% {
    opacity: 1;
    z-index: 5;
  }
`;

const Container = styled.div<{ rightPanelActive: boolean }>`
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
  position: relative;
  overflow: hidden;
  width: 768px;
  max-width: 100%;
  min-height: 480px;

  .form-container {
    position: absolute;
    top: 0;
    height: 100%;
    transition: all 0.6s ease-in-out;
  }

  .sign-in-container {
    left: 0;
    width: 50%;
    z-index: 2;
    ${props => props.rightPanelActive && css`transform: translateX(100%);`}
  }

  .sign-up-container {
    left: 0;
    width: 50%;
    opacity: 0;
    z-index: 1;
    ${props => props.rightPanelActive && css`
      transform: translateX(100%);
      opacity: 1;
      z-index: 5;
      animation: ${show} 0.6s;
    `}
  }

  .overlay-container {
    position: absolute;
    top: 0;
    left: 50%;
    width: 50%;
    height: 100%;
    overflow: hidden;
    transition: transform 0.6s ease-in-out;
    z-index: 100;
    ${props => props.rightPanelActive && css`transform: translateX(-100%);`}
  }

  .overlay {
    background: #FF416C;
    background: -webkit-linear-gradient(to right, #F3EDF7, #FF416C);
    background: linear-gradient(to right, #F3EDF7, #FF416C);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 0 0;
    color: #FFFFFF;
    position: relative;
    left: -100%;
    height: 100%;
    width: 200%;
    transform: translateX(0);
    transition: transform 0.6s ease-in-out;
    ${props => props.rightPanelActive && css`transform: translateX(50%);`}
  }

  .overlay-panel {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 0 40px;
    text-align: center;
    top: 0;
    height: 100%;
    width: 50%;
    transform: translateX(0);
    transition: transform 0.6s ease-in-out;
  }

  .overlay-left {
    transform: translateX(-20%);
    ${props => props.rightPanelActive && css`transform: translateX(0);`}
  }

  .overlay-right {
    right: 0;
    transform: translateX(0);
    ${props => props.rightPanelActive && css`transform: translateX(20%);`}
  }
`;

const Title = styled.h1`
  font-weight: bold;
  margin: 0;
`;

const Paragraph = styled.p`
  font-size: 14px;
  font-weight: 100;
  line-height: 20px;
  letter-spacing: 0.5px;
  margin: 20px 0 30px;
`;

const Span = styled.span`
  font-size: 12px;
`;

const Anchor = styled.a`
  color: #333;
  font-size: 14px;
  text-decoration: none;
  margin: 15px 0;
`;

const Button = styled.button<{ ghost?: boolean }>`
  border-radius: 20px;
  border: 1px solid white;
  background-color: ${({ ghost }) => ghost ? 'transparent' : '#F3ED'};
  color: #FFFFFF;
  font-size: 12px;
  font-weight: bold;
  padding: 12px 45px;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: transform 80ms ease-in;
  cursor: pointer;
  
  &:active {
    transform: scale(0.95);
  }
  
  &:focus {
    outline: none;
  }
`;

const Form = styled.form`
  background-color: #FFFFFF;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 50px;
  height: 100%;
  text-align: center;
`;

const Input = styled.input`
  background-color: #eee;
  border: none;
  padding: 12px 15px;
  margin: 8px 0;
  width: 100%;
`;

const SocialContainer = styled.div`
  margin: 20px 0;
`;

const SocialLink = styled.a`
  border: 1px solid #DDDDDD;
  border-radius: 50%;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin: 0 5px;
  height: 40px;
  width: 40px;
  color: #333;
`;

const Footer = styled.footer`
  background-color: #222;
  color: #fff;
  font-size: 14px;
  bottom: 0;
  position: fixed;
  left: 0;
  right: 0;
  text-align: center;
  z-index: 999;
  
  p {
    margin: 10px 0;
  }
  
  i {
    color: red;
  }
  
  a {
    color: #3c97bf;
    text-decoration: none;
  }
`;

const LoginForm: React.FC = () => {
  const [rightPanelActive, setRightPanelActive] = useState(false);

  return (
    <>
      <GlobalStyle />
      <Container rightPanelActive={rightPanelActive}>
        <div className="form-container sign-up-container">
          <Form>
            <Title>Create Account</Title>
            <SocialContainer>
              <SocialLink href="#"><FaFacebookF /></SocialLink>
              <SocialLink href="#"><FaGooglePlusG /></SocialLink>
              <SocialLink href="#"><FaLinkedinIn /></SocialLink>
            </SocialContainer>
            <Span>or use your email for registration</Span>
            <Input type="text" placeholder="Name" />
            <Input type="email" placeholder="Email" />
            <Input type="password" placeholder="Password" />
            <Button>Sign Up</Button>
          </Form>
        </div>
        <div className="form-container sign-in-container">
          <Form>
            <Title>Sign in</Title>
            <SocialContainer>
              <SocialLink href="#"><FaFacebookF /></SocialLink>
              <SocialLink href="#"><FaGooglePlusG /></SocialLink>
              <SocialLink href="#"><FaLinkedinIn /></SocialLink>
            </SocialContainer>
            <Span>or use your account</Span>
            <Input type="email" placeholder="Email" />
            <Input type="password" placeholder="Password" />
            <Anchor href="#">Forgot your password?</Anchor>
            <Button>Sign In</Button>
          </Form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <Title>Welcome Back!</Title>
              <Paragraph>To keep connected with us please login with your personal info</Paragraph>
              <Button ghost onClick={() => setRightPanelActive(false)}>Sign In</Button>
            </div>
            <div className="overlay-panel overlay-right">
              <Title>Hello, Friend!</Title>
              <Paragraph>Enter your personal details and start journey with us</Paragraph>
              <Button ghost onClick={() => setRightPanelActive(true)}>Sign Up</Button>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default LoginForm;