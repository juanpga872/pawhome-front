import React from 'react';
import styled from 'styled-components';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { FaGoogle } from 'react-icons/fa';
import Swal from 'sweetalert2';

const provider = new GoogleAuthProvider();

const Button = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  padding: 0;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.1);
  }

  svg {
    width: 100%;
    height: 100%;
    color: #4285F4; 
  }
`;

const LoginButton: React.FC = () => {
  const firebaseConfig = {
    apiKey: "AIzaSyB4c7FpScGrs4F2n1Z9uzpAaGBwyVPkaJA",
    authDomain: "pawhome-ba1cd.firebaseapp.com",
    projectId: "pawhome-ba1cd",
    storageBucket: "pawhome-ba1cd.appspot.com",
    messagingSenderId: "580367349831",
    appId: "1:580367349831:web:82fa2da311ffa13089d962",
    measurementId: "G-EBX3ENQ2WM"
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  const callLoginGoogle = async () => {
    Swal.fire({
      title: 'Cargando...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
    try {
      console.log('antes de entrar');
      
      const result = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
            
      if (credential) {
        console.log('entra con google'+ credential);
        
        const token = credential.accessToken;
        const user = result.user;
        const displayName = user.displayName;

        console.log('Token:', token);
        console.log('Nombre:', displayName);

   

        Swal.close();
        Swal.fire({
          title: `Bienvenido a PawHome, ${displayName}!`,
          imageUrl: '/icons/logo.png',
          imageWidth: 100,
          imageHeight: 100,
          icon: 'success',
          willClose: () => {
          
            window.location.href = '/'; 
          },
          background: 'linear-gradient(to right, #F25FFFFF, #CE7BFEFF)',
          customClass: {
            popup: 'custom-popup'
          }
        });
      }
    } catch (error) {
      console.error('Error:', error);
      Swal.close();
      Swal.fire({
        title: 'Error',
        text: 'Hubo un problema con el inicio de sesión.',
        icon: 'error',
      });
    }
  };

  return (
    <Button onClick={callLoginGoogle}>
      <FaGoogle />
    </Button>
  );
};

export default LoginButton;
