import styled from "styled-components";
import { FaHeart } from "react-icons/fa";

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 60vh;
  color: white;
  text-align: center;
  padding: 2rem;


  @media (max-width: 768px) {
    height: auto;
    padding: 1rem;
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }

  video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: -2;
  }
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);

  @media (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 1rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.5rem;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    font-size: 1.2rem;
    margin-bottom: 1.5rem;
  }
`;

const DonateOptions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const Button = styled.button`
  padding: 1rem 2rem;
  background-color: #ff69b4;
  border: none;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-size: 1rem;
  

  &:hover {
    background-color: #ff5287;
  }

  @media (max-width: 768px) {
    width: 100%;
    font-size: 0.9rem;
  }
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
  

  @media (max-width: 768px) {
    margin-bottom: 1.5rem;
  }
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
  

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const HeartIcon = styled(FaHeart)`
  color: #ff69b4;
  font-size: 1.5rem;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const DonationPage = () => {
  return (
    <Container>
      <video autoPlay loop muted>
        <source src="/video/donate.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <Title>Adopt and Donate</Title>
      <Subtitle>Our official donation channels</Subtitle>
      <ContactInfo>
        <ContactItem>
          <HeartIcon />
          <span>Bancolombia savings account No. 01316502624 - Pawhome Foundation</span>
        </ContactItem>
        <ContactItem>
          <HeartIcon />
          <span>NIT. 900.669.514 - 1</span>
        </ContactItem>
        <ContactItem>
          <HeartIcon />
          <span>Daviplata 310 854 0203</span>
        </ContactItem>
        <ContactItem>
          <HeartIcon />
          <span>Nequi 302 284 1585</span>
        </ContactItem>
      </ContactInfo>
      <DonateOptions>
        <Button>DONATE WITH PAYU</Button>
        <Button>DONATE WITH PAYPAL</Button>
      </DonateOptions>
    </Container>
  );
};

export default DonationPage;
