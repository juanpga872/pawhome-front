import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Arial', sans-serif;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  color: #2c3e50;
  font-size: 2.8rem;
  margin-bottom: 1rem;
  text-align: center;
`;

const Description = styled.p`
  color: #7f8c8d;
  font-size: 1.2rem;
  margin-bottom: 2rem;
  text-align: center;
`;

const SectionTitle = styled.h3`
  color: #34495e;
  font-size: 2.2rem;
  margin-top: 2rem;
  margin-bottom: 1rem;
`;

const SectionDescription = styled.p`
  color: #555;
  font-size: 1.1rem;
  margin-bottom: 1.5rem;
`;

const StyledIframe = styled.iframe`
  width: 100%;
  height: 600px;
  border: none;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  border-radius: 8px;
  margin-top: 20px;
`;


const PsychologicalTest: React.FC = () => {
  return (
    <Container>
      <Title>Psychological Test</Title>
      <Description>
        Here you can find the results of the test that our users can take before or after adopting or sponsoring a pet.
      </Description>
      
      <SectionTitle>Why take a psychological test?</SectionTitle>
      <SectionDescription>
        Psychological tests can provide valuable information about our users thoughts, emotions, and behaviors. They are also useful tools for personal development and decision-making.
      </SectionDescription>

      <SectionTitle>How to interpret the results</SectionTitle>
      <SectionDescription>
        At the end of the test, you will receive an analysis of your answers. Remember that these results are indicative and should be complemented with the opinion of a professional if you are looking for a deeper evaluation.
      </SectionDescription>

      <StyledIframe
        src="https://docs.google.com/spreadsheets/d/e/2PACX-1vS_1wPKkOH-JoKhX8VkYgcje22hRImWCSpkk30SNI6oAZYZK7SENJARrHyVsxMqv7wkJQ0ua1i1x4w3/pubhtml?widget=true&amp;headers=false"
        title="Psychological Test Form"
      />
    </Container>
  );
};

export default PsychologicalTest;
