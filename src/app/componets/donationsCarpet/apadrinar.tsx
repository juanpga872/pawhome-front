import React from 'react';
import Image from 'next/image';
import styled from 'styled-components';

// Import the font in your global CSS
// Example in _app.js or _document.js for Next.js
// import 'https://fonts.googleapis.com/css2?family=Lora:wght@700&display=swap';

// Main container with gray background
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  max-width: 100%;
  margin: 0 auto;
  background-color: #FFFFFFFF; 
`;

// Section that organizes content into columns
const Section = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 2rem;

  &:last-of-type {
    margin-bottom: 0;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

// Text section
const TextSection = styled.div`
  flex: 1;
  padding: 1rem;

  @media (max-width: 768px) {
    order: 2;
  }
`;

// Image section
const ImageSection = styled.div`
  flex: 1;
  text-align: center;

  @media (max-width: 768px) {
    order: 1;
  }
`;

// Title with custom style
const Title = styled.h1`
  font-size: 2rem;  // Adjusted font size
  font-weight: 700;
  font-family: 'Lora', serif; // Custom font
  margin-bottom: 1rem;
  color: #8e2de2; 
  padding: 0.5rem;
  border-radius: 8px;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 1.5rem; // Adjusted size for smaller screens
  }
`;

// Paragraph with custom style
const Paragraph = styled.p`
  font-size: 1rem;
  line-height: 1.5;
  margin-bottom: 1rem;
`;

// Styled list
const List = styled.ul`
  list-style: disc;
  margin-left: 2rem;
  text-align: left;

  @media (max-width: 768px) {
    margin-left: 0;
  }
`;

// List item
const ListItem = styled.li`
  margin-bottom: 0.5rem;
  font-size: 1rem; /* Adjusted font size */
`;

const SponsorADog = () => {
  return (
    <Container>
      <Section>
        <ImageSection>
          <Image
            src="/icons/perro.jpg"
            alt="Dog"
            width={500}
            height={300}
          />
        </ImageSection>
        <TextSection>
          <Title>Sponsor a Dog or Cat</Title>
          <Paragraph>
            If you can’t adopt, you can sponsor one of our furry friends to ensure their stay at our shelter is optimal.
          </Paragraph>
          <Paragraph>
            We offer various sponsorship plans where you can make a monthly contribution. If you are interested in sponsoring a Tepiano, contact us, and we will provide more details.
          </Paragraph>
        </TextSection>
      </Section>

      <Section>
        <TextSection>
          <Title>Why Sponsor a Dog at Pawhome?</Title>
          <List>
            <ListItem>
              Because you can’t have a dog at home, but still want a furry friend to cuddle with, even if it's only on weekends! It can become a reason to take walks with your loved ones.
            </ListItem>
            <ListItem>
              Because there are too many dogs here. Due to the sale of dogs in stores and unsterilized breeders, the high density of them on the streets, and their uncontrolled reproduction, many dogs spend years here without knowing what human love is.
            </ListItem>
            <ListItem>
              Because by sponsoring a dog, you establish an emotional bond with another sentient being, who will eagerly wait for you when you visit. Especially if you bring food and spend some time with them.
            </ListItem>
            <ListItem>
              Because the bonds you form with a dog are physically and emotionally positive for you. And you will have the right to visit them whenever you want and receive updates about them.
            </ListItem>
            <ListItem>
              Because it is more economical than having a dog at home and here they are already sterilized.
            </ListItem>
          </List>
        </TextSection>
        <ImageSection>
          <Image
            src="/icons/niño.avif"
            alt="Children"
            width={600}
            height={400}
          />
        </ImageSection>
      </Section>
    </Container>
  );
};

export default SponsorADog;
