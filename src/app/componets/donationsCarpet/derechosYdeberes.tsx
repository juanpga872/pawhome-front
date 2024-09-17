import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const Box = styled.div`
  flex: 1;
  background: linear-gradient(135deg, #ffb6c1, #ff69b4);
  padding: 2rem;
  border-radius: 10px;
  color: black;
  text-align: left;

  h2 {
    margin-top: 0;
  }

  ul {
    padding-left: 1.5rem;
  }
`;

const RightsAndDuties: React.FC = () => {
  return (
    <Container>
      <Box>
        <h1>Foster Parents Rights and Duties</h1>
        <h2>Rights</h2>
        <ul>
          <li>You can visit your fostered pet whenever you want.</li>
          <li>You can spend an afternoon bathing, pampering, and walking your pet.</li>
          <li>You will receive updates and photos about your fostered pets well-being.</li>
        </ul>
      </Box>
      <Box>
        <h2>Duties</h2>
        <ul>
          <li>Act in accordance with the provisions of Law 1774 of January 6, 2016, and assume the responsibility and commitment of fostering the canine or feline.</li>
          <li>Deposit the assigned amount into the Bancolombia savings account No: 013165026-24 in the name of Fundación Tepa, NIT: 900.669.514-0, and send a copy of the deposit to the email Pawhome@gmail.com</li>
        </ul>
      </Box>
    </Container>
  );
};

export default RightsAndDuties;
