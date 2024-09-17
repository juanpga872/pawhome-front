import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2em;
  padding: 2em;
  font-family: sans-serif;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-around;
  }
`;

const Language = styled.h2`
  color: pink;
`;

const Title = styled.h1`
  font-size: 2em;
  margin-bottom: 1em;
`;

const Text = styled.p`
  margin-bottom: 1em;
`;

const Section = styled.div`
  padding: 2em;
  background-color: #f5f5f5;
  border-radius: 2rem;
  text-align: left;

  @media (max-width: 768px) {
    text-align: center;
  }
`;

const Donations = () => (
  <Container>
    <Section>
      <Language>ESPAÑOL</Language>
      <Title>Donaciones</Title>
      <Text>Puedes donar insumos desde alimentos y medicinas hasta cobijas o tejas para la adecuación del espacio de la fundación.</Text>
      <Text>También puedes compartir tiempo con los peluditos y ayudarnos en la fundación o hacer donaciones en dinero.</Text>
      <Text>Puedes donar en línea a través de PayU de forma segura y rápida seleccionando el botón del valor que deseas aportar.</Text>
      <Text>Estos aportes serán invertidos en alimentos, medicinas y la adecuación de los espacios para nuestros peludos.</Text>
    </Section>
    <Section>
      <Language>ENGLISH</Language>
      <Title>Donations</Title>
      <Text>You can donate many different things, from food to medicine.</Text>
      <Text>However, since you are probably reading this from abroad, the way you can help us the most is donating money.</Text>
      <Text>Donations can be made through the next buttons in a safe way, just choosing the value you want to give to the foundation.</Text>
      <Text>This money will be invested in food, medicines, veterinarian treatments, farm adequation, farm staff, etc.</Text>
    </Section>
  </Container>
);

export default Donations;
