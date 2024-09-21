import axios from 'axios';
import React, { useState } from 'react';
import styled, { createGlobalStyle, keyframes } from 'styled-components';
import { FaFacebookF, FaGooglePlusG, FaArrowLeft } from 'react-icons/fa';
import jwtDecode from 'jwt-decode';
import LoginButton from './buttonGoogle'; // Asegúrate de tener el botón de Google
import FacebookLoginButton from './buttonfacebook'; // Asegúrate de crear un botón para Facebook

// const GlobalStyle = createGlobalStyle`
//   @import url('https://fonts.googleapis.com/css?family=Montserrat:400,800');
  
//   * {
//     box-sizing: border-box;
//   }
  
//   body {
//     background: #FFFFFFFF;
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     flex-direction: column;
//     font-family: 'Montserrat', sans-serif;
//     height: 100vh;
//   }
// `;

// Keyframes for animations
const slideInFromRight = keyframes`
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
`;

const slideOutToLeft = keyframes`
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-100%);
  }
`;

const slideInFromLeft = keyframes`
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
`;

const slideOutToRight = keyframes`
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(100%);
  }
`;

// Styled Components
const StyledIcon = styled(FaArrowLeft)<{ rightPanelActive: boolean }>`
  color: #FF416C;
  font-size: 24px;
  position: absolute;
  top: 20px;
  left: 20px; 
  cursor: pointer;
  z-index: 1100;
  transition: transform 0.3s ease;

  transform: ${props => props.rightPanelActive ? 'rotate(180deg)' : 'rotate(0deg)'};

  &:hover {
    color: #d74d6b;
  }
`;

const Container = styled.div<{ rightPanelActive: boolean }>`
  background-color: #FF7897D8;
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
    transition: transform 0.6s ease-in-out;
  }

  .sign-in-container {
    left: 0;
    width: 50%;
    z-index: 2;
    transform: ${props => props.rightPanelActive ? 'translateX(100%)' : 'translateX(0)'};
    animation: ${props => props.rightPanelActive ? slideOutToLeft : slideInFromRight} 0.6s ease-in-out;
  }

  .sign-up-container {
    left: 0;
    width: 50%;
    opacity: ${props => props.rightPanelActive ? '1' : '0'};
    z-index: ${props => props.rightPanelActive ? '5' : '1'};
    transform: ${props => props.rightPanelActive ? 'translateX(100%)' : 'translateX(0)'};
    animation: ${props => props.rightPanelActive ? slideInFromRight : slideOutToLeft} 0.6s ease-in-out;
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
    transform: ${props => props.rightPanelActive ? 'translateX(-100%)' : 'translateX(0)'};
  }

  .overlay {
    background: linear-gradient(to right, #E0BAFCFF, #EE597CFF);
    color: #FFFFFF;
    position: relative;
    left: -100%;
    height: 100%;
    width: 200%;
    transform: ${props => props.rightPanelActive ? 'translateX(50%)' : 'translateX(0)'};
    transition: transform 0.6s ease-in-out;
  }

  .overlay-panel {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    text-align: center;
    top: 0;
    height: 100%;
    width: 50%;
    transition: transform 0.6s ease-in-out;
  }

  .overlay-left {
    transform: ${props => props.rightPanelActive ? 'translateX(0)' : 'translateX(-20%)'};
  }

  .overlay-right {
    right: 0;
    transform: ${props => props.rightPanelActive ? 'translateX(20%)' : 'translateX(0)'};
  }

  @media (max-width: 768px) {
    width: 100%;
    height: 100%;
    overflow: hidden;

    .form-container {
      position: absolute;
      width: 100%;
      height: 100%;
      transition: none;
    }

    .sign-in-container, .sign-up-container {
      left: 0;
      opacity: 1;
      z-index: 1;
      transform: translateX(0);
    }

    .sign-in-container {
      animation: ${props => props.rightPanelActive ? slideOutToRight : slideInFromLeft} 0.6s ease-in-out;
      display: ${props => props.rightPanelActive ? 'none' : 'block'};
    }

    .sign-up-container {
      animation: ${props => props.rightPanelActive ? slideInFromLeft : slideOutToRight} 0.6s ease-in-out;
      display: ${props => props.rightPanelActive ? 'block' : 'none'};
    }

    .overlay-container {
      display: none;
    }
  }
    
`;

const Title = styled.h1`
  font-weight: bold;
  margin: 0;
`;

const Paragraph = styled.p`
  font-size: 23px;
  font-weight: 100;
  line-height: 20px;
  letter-spacing: 0.5px;
  margin: 20px 0 30px;
  color: white;
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

const Button = styled.button<{ $ghost?: boolean }>`
  border-radius: 20px;
  border: 1px solid ${({ $ghost }) => $ghost ? '#F8F8F8FF' : 'white'};
  background-color: ${({ $ghost }) => $ghost ? 'transparent' : '#FF416C'};
  color: ${({ $ghost }) => $ghost ? '#FFFFFFFF' : '#FFFFFF'};
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

const ToggleButton = styled(Button)`
  display: none; // Oculta el botón por defecto

  @media (max-width: 768px) {
    display: block; // Muestra el botón en dispositivos móviles
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    background-color: #FF416C;
    color: #FFFFFF;
    border: none;
    z-index: 1000;
    margin: 0;
  }
`;

const Form = styled.form`
  background-color: #FFFFFFFF;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 50px;
  height: 100%;
  text-align: center;

  @media (max-width: 768px) {
    background: linear-gradient(to right, #F79BB0FF, #FFB6C1);
  }
`;

const Input = styled.input`
  background-color: #eee;
  border: none;
  border-radius: 15px;
  padding: 12px 15px;
  margin: 8px 0;
  width: 100%;
`;

const SocialContainer = styled.div`
  margin: 20px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  gap:2rem
`;

const SocialLink = styled.a`
  border: 1px solid #FFFFFFFF;
  border-radius: 50%;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin: 0 5px;
  height: 40px;
  width: 40px;
  color: #000000FF;
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
  
  a {
    color: #3c97bf;
    text-decoration: none;
  }
`; 


  interface DecodedToken {
    sub: string;
    role: string;
  }
  
  const LoginForm: React.FC = () => {
    const [rightPanelActive, setRightPanelActive] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [registerMessage, setRegisterMessage] = useState('');


    const decodeJwtToken = (token: string) => {
      try {
        // Divide el token en sus partes
        const base64Url = token.split('.')[1];
        // Reemplaza caracteres especiales
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        // Decodifica base64 a una cadena JSON
        const jsonPayload = decodeURIComponent(
          atob(base64)
            .split('')
            .map(function (c) {
              return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            })
            .join('')
        );
        // Parsear JSON y devolver
        return JSON.parse(jsonPayload);
      } catch (error) {
        console.error('Error decoding JWT:', error);
        return null;
      }
    };
  
    // Función para manejar el login
    const handleSignIn = async (e: React.FormEvent) => {
      e.preventDefault();
    
      try {
        const response = await axios.post('https://powhome.azurewebsites.net/api/Auth/login', {
          email,
          password
        });
    
        if (response.status === 200) {
          const { token } = response.data;
    
          const decodedToken = decodeJwtToken(token);
          if (decodedToken) {
            const { sub: userEmail, role } = decodedToken;
    
            // Store token in localStorage
            localStorage.setItem('token', token);
    
            if (role === 'Admin') {
              // Store email if the user is an admin
              localStorage.setItem('adminEmail', userEmail);
              window.location.href = '/admin';
            } else {
              window.location.href = '/';
            }
          } else {
            setErrorMessage('Invalid token');
          }
        } else {
          setErrorMessage('Invalid email or password');
        }
      } catch (error) {
        console.error('Error during sign-in:', error);
        setErrorMessage('An error occurred while trying to sign in');
      }
    };
    
  

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('https://powhome.azurewebsites.net/api/v1/Users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          phone,
          email,
          password,
          isAdmin: false, // Aquí debes manejar la lógica de si el usuario debe ser admin
        }),
      });

      if (response.ok) {
        setRegisterMessage('Registration successful! Please log in.');
        setErrorMessage('');
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || 'Failed to register');
      }
    } catch (error) {
      setErrorMessage('An error occurred while trying to register');
    }
  };

  const parseJwt = (token: string) => {
    const parts = token.split('.');
    if (parts.length !== 3) {
      throw new Error('Invalid JWT token');
    }
    const payload = parts[1];
    return JSON.parse(decodeBase64(payload));
  };

  const decodeBase64 = (str: string) => {
    return Buffer.from(str, 'base64').toString('utf8');
  };

  const toggleForm = () => {
    setRightPanelActive(!rightPanelActive);
  };

  return (
    <>
      {/* <GlobalStyle /> */}
      <Container rightPanelActive={rightPanelActive}>
        <div className="form-container sign-up-container">
          <Form onSubmit={handleRegister}>
            <Title>Create Account</Title>
            <SocialContainer>
              <LoginButton />
              <FacebookLoginButton /> {/* Asegúrate de tener un botón para Facebook */}
            </SocialContainer>
            <Span>or use your email for registration</Span>
            <Input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
            <Input type="text" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} required />
            <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <Button type="submit">Sign Up</Button>
            <br />
            <br />
            <ToggleButton onClick={toggleForm}>
          {rightPanelActive ? 'Sign In' : 'Sign Up'}
        </ToggleButton>
          </Form>
        </div>

        <div className="form-container sign-in-container">
          <Form onSubmit={handleSignIn}>
            <Title>Sign in</Title>
            <SocialContainer>
              <LoginButton />
              <FacebookLoginButton /> 
            </SocialContainer>
            <Span>or use your account</Span>
            <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <Anchor href="#">Forgot your password?</Anchor>
            <Button type="submit">Sign In</Button>
            <ToggleButton onClick={toggleForm}>
          {rightPanelActive ? 'Sign In' : 'Sign Up'}
        </ToggleButton>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
          </Form>
        </div>

        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <Title>Welcome Back!</Title>
              <Paragraph>To keep connected with us please login with your personal info</Paragraph>
              <Button onClick={() => setRightPanelActive(false)}>Sign In</Button>
            </div>
            <div className="overlay-panel overlay-right">
              <Title>Hello, Friend!</Title>
              <Paragraph>Enter your personal details and start your journey with us</Paragraph>
              <Button onClick={() => setRightPanelActive(true)}>Sign Up</Button>
              
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default LoginForm;
