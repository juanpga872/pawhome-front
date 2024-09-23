import React, { useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';

const Container = styled.div`
  text-align: center;
  padding: 50px;
  border: 1px solid #ddd;
  width: 400px;
  margin: 100px auto;
`;

const Title = styled.h2`
  font-size: 24px;
`;

const Description = styled.p`
  font-size: 16px;
  margin: 10px 0;
`;

const Input = styled.input`
  margin: 20px 0;
  padding: 10px;
  font-size: 16px;
  width: 100%;
  box-sizing: border-box;
`;

const Button = styled.button`
  background-color: #ffc439;
  color: black;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
  margin: 20px 0;
  display: inline-block;

  &:hover {
    background-color: #e0b833;
  }
`;

const Preloader = styled.p<{ show: boolean }>`
  display: ${(props) => (props.show ? 'block' : 'none')};
  font-size: 18px;
  margin-top: 20px;
  color: #555;
`;

const Donation: React.FC = () => {
  const [amount, setAmount] = useState<string>('0'); // Manejamos el valor de la donación
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleDonateClick = () => {
    if (parseFloat(amount) <= 0) {
      alert('Please enter a valid donation amount.');
      return;
    }
    
    setLoading(true);

    // Simulamos una espera antes de redirigir
    setTimeout(() => {
      // Redirigir a PayPal con el monto como parámetro en la URL
      router.push(`https://www.paypal.com/donate?amount=${amount}`);
    }, 2000);
  };

  return (
    <Container>
      <Title>Donate to Fundación Tepa</Title>
      <Description>Help us rescue abandoned dogs and cats. Ayúdanos a rescatar perros y gatos en estado de abandono.</Description>
      
      <Input 
        type="number" 
        min="0" 
        value={amount} 
        onChange={(e) => setAmount(e.target.value)} 
        placeholder="Enter donation amount (USD)" 
      />

      <Button onClick={handleDonateClick}>Donate with PayPal</Button>
      <Preloader show={loading}>Please wait...</Preloader>
    </Container>
  );
};

export default Donation;
