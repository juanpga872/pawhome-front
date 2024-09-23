import React from 'react';
import styled from 'styled-components';

interface DogDonation {
  image: string;
  amount: number;
  href: string;
}

const donations: DogDonation[] = [
  { image: 'https://t2.uc.ltmcdn.com/es/posts/9/5/5/10_cosas_que_los_perros_pueden_predecir_te_sorprenderas_43559_600.jpg', amount: 20000, href: "https://biz.payulatam.com/B0f79bd87F27B36" },
  { image: 'https://www.ngenespanol.com/wp-content/uploads/2023/12/descubren-que-los-humanos-influimos-en-el-color-de-ojos-de-los-perros-770x431.jpg', amount: 50000, href: "https://biz.payulatam.com/B0f79bdAD531DB1" },
  { image: 'https://t1.ea.ltmcdn.com/es/posts/5/9/0/nombres_para_perros_rottweiler_machos_y_hembras_24095_600.jpg', amount: 80000, href: "https://biz.payulatam.com/B0f79bdD0ED523D" },
  { image: 'https://peru21-pe.b-cdn.net/sites/default/efsfiles/2024-06/d5q2f3ipn5bbfgk62axevl6nla.jpg', amount: 100000, href: "https://biz.payulatam.com/B0f79bdFDA8B9B0" },
  { image: 'https://resizer.glanacion.com/resizer/v2/la-raza-maltes-integra-el-grupo-selecto-de-HEEOK5SJBRG3DJP5WJC4KILSV4.jpg?auth=3364527b38e281d0eec376c6fcb8ed87d62aecfc11f5991532fe7f2230ded545&width=768&quality=70&smart=false', amount: 150000, href: "https://biz.payulatam.com/B0f79bd99288FE3" },
  { image: 'https://rovinfood.com/wp-content/uploads/2021/04/vitaminas-para-perros-y-gatos.webp', amount: 200000, href: "https://biz.payulatam.com/B0f79bd2C3F8675" },
  { image: 'https://www.elcomercio.com/wp-content/uploads/2023/05/perro--700x392.jpg', amount: 150000, href: "https://biz.payulatam.com/B0f79bd99288FE3" },
  { image: 'https://doggiesintown.com/wp-content/uploads/2023/08/El-Fascinante-Mundo-del-Perro-Salchicha-Explorando-su-Historia-Crianza-y-Personalidad-Unica-Doggies-in-Town-1200x676-5.jpg', amount: 200000, href: "https://biz.payulatam.com/B0f79bd2C3F8675" }
];

const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 40px 20px;
  font-family: 'Arial', sans-serif;
`;

const Title = styled.h1`
  text-align: center;
  color: #333;
  font-size: 2.5rem;
  margin-bottom: 10px;

  @media (max-width: 1200px) {
    font-size: 2rem;
  }

  @media (max-width: 992px) {
    font-size: 1.75rem;
  }

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }

  @media (max-width: 576px) {
    font-size: 1.25rem;
  }
`;

const Logo = styled.img`
  display: block;
  margin: 20px auto;
  max-width: 120px;
`;

const DonationGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 30px;
  margin-top: 40px;
`;

const DonationButton = styled.a`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  position: relative;
  width: 100%; // Cambiado para ocupar el 100% del contenedor
  aspect-ratio: 1; // Mantiene una proporción cuadrada
  transition: transform 0.3s ease;
  text-decoration: none;
  color: inherit;

  &:hover {
    transform: scale(1.05);
  }
`;

const CircleWrapper = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  overflow: hidden;
  position: relative;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
`;

const DogImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const DonationInfo = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 20px 10px;
  background: linear-gradient(
    to bottom,
    rgba(233, 30, 99, 0.8) 0%,
    rgba(233, 30, 99, 0) 30%,
    rgba(233, 30, 99, 0) 70%,
    rgba(233, 30, 99, 0.8) 100%
  );
  color: white;
  font-weight: bold;
`;

const DonationLabel = styled.span`
  font-size: 1.2rem;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
`;

const DonationAmount = styled.span`
  font-size: 1.1rem;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
`;

const Index = styled.span`
  font-size: 1rem;
  font-weight: bold;
  position: absolute;
  top: 10px;
  left: 10px;
  color: white;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
`;

const DonationComponent: React.FC = () => {
  return (
    <Container id="donation-section">
    <Title>Donar con</Title>
    <Logo src="/icons/payuu.png" alt="PayU Logo" />
    <DonationGrid>
      {donations.map((donation, index) => (
        <DonationButton key={index} href={donation.href}>
          <CircleWrapper>
            <DogImage src={donation.image} alt={`Dog ${index + 1}`} />
            <Index>{index + 1}</Index>
            <DonationInfo>
              <DonationLabel>donate</DonationLabel>
              <DonationAmount>${donation.amount.toLocaleString()} COP</DonationAmount>
            </DonationInfo>
          </CircleWrapper>
        </DonationButton>
      ))}
    </DonationGrid>
  </Container>
  
  );
};

export default DonationComponent;
