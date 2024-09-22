import React, { useState } from 'react';
import styled from 'styled-components';
import { AiOutlineArrowLeft, AiFillHeart } from 'react-icons/ai';

type Pet = {
  id: number;
  name: string;
  imagePath: string;
  breed: string;
  birthDate: string;
  description: string;
  sex: boolean;
  size: string;
  location: string;
  specie: boolean;
};

interface ModaliProps {
  pet: Pet; 
  onClose: () => void;
}

const Modali: React.FC<ModaliProps> = ({ pet, onClose }) => {
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
  const [showAdoptionModal, setShowAdoptionModal] = useState<boolean>(false);
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
  const [adoptionData, setAdoptionData] = useState<{
    id: number;
    name: string;
    address: string;
    phone: string;
    email: string;
  }>({
    id: 0,
    name: '',
    address: '',
    phone: '',
    email: ''
  });

  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite);
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const birthDate = formatDate(pet.birthDate);

  const isLoggedIn = () => {
    const token = localStorage.getItem('token');
    return token !== null;
  };

  const handleAdoptClick = () => {
    if (!isLoggedIn()) {
      setShowLoginModal(true);
      return;
    }
    setShowAdoptionModal(true);
  };

  const handleAdoptionSubmit = async () => {
    try {
      const response = await fetch('https://powhome.azurewebsites.net/api/v1/AdoptionCenter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(adoptionData)
      });
      if (response.ok) {
        setShowAdoptionModal(false);
        setShowSuccessModal(true);
      } else {
        alert('Error al adoptar. Intenta de nuevo.');
      }
    } catch (error) {
      console.error('Error al enviar los datos de adopción:', error);
    }
  };

  return (
    <>
      <ModalOverlay>
        <ModalContent>
          <ImageContainer>
            <PetImage src={pet.imagePath || 'https://via.placeholder.com/300'} alt={pet.name} />
            <IconButton onClick={onClose} style={{ left: '1rem' }}>
              <AiOutlineArrowLeft size={24} />
            </IconButton>
            <HeartIcon onClick={handleFavoriteClick} isFavorite={isFavorite} />
          </ImageContainer>
          <ContentContainer>
            <HeaderRow>
              <PetName>{pet.name}</PetName>
              <Distance>{pet.location}</Distance>
            </HeaderRow>
            <InfoGrid>
              <InfoItem>
                <InfoLabel>Breed</InfoLabel>
                <InfoValue>{pet.breed}</InfoValue>
              </InfoItem>
              <InfoItem>
                <InfoLabel>Birth Date</InfoLabel>
                <InfoValue>{birthDate}</InfoValue>
              </InfoItem>
              <InfoItem>
                <InfoLabel>Size</InfoLabel>
                <InfoValue>{pet.size}</InfoValue>
              </InfoItem>
              <InfoItem>
                <InfoLabel>Sex</InfoLabel>
                <InfoValue>{pet.sex ? 'Male' : 'Female'}</InfoValue>
              </InfoItem>
              <InfoItem>
                <InfoLabel>Description</InfoLabel>
                <InfoValue className="description">{pet.description}</InfoValue>
              </InfoItem>
              <InfoItem>
                <InfoLabel>Specie</InfoLabel>
                <InfoValue>{pet.specie ? 'Dog' : 'Cat'}</InfoValue>
              </InfoItem>
            </InfoGrid>
            <ActionButtons>
              <Button onClick={handleAdoptClick}>Adopt Me</Button>
            </ActionButtons>
          </ContentContainer>
        </ModalContent>
      </ModalOverlay>

      {showLoginModal && (
        <LoginModal>
          <LoginModalContent>
            <h2>Necesitas iniciar sesión</h2>
            <p>Por favor, inicie sesión para adoptar una mascota.</p>
            <Button onClick={() => window.location.href = '/login'}>Iniciar sesión</Button>
            <CloseButton onClick={() => setShowLoginModal(false)}>Cerrar</CloseButton>
          </LoginModalContent>
        </LoginModal>
      )}

      {showAdoptionModal && (
        <AdoptionModal>
          <AdoptionModalContent>
            <h2>Información de Adopción</h2>
            <InputField>
              <Label>Name:</Label>
              <Input type="text" value={adoptionData.name} onChange={(e) => setAdoptionData({ ...adoptionData, name: e.target.value })} required />
            </InputField>
            <InputField>
              <Label>Address:</Label>
              <Input type="text" value={adoptionData.address} onChange={(e) => setAdoptionData({ ...adoptionData, address: e.target.value })} required />
            </InputField>
            <InputField>
              <Label>Phone:</Label>
              <Input type="text" value={adoptionData.phone} onChange={(e) => setAdoptionData({ ...adoptionData, phone: e.target.value })} required />
            </InputField>
            <InputField>
              <Label>Email:</Label>
              <Input type="email" value={adoptionData.email} onChange={(e) => setAdoptionData({ ...adoptionData, email: e.target.value })} required />
            </InputField>
            <ActionButtons>
              <Button onClick={handleAdoptionSubmit}>Submit</Button>
              <StyledCloseButton onClick={() => setShowAdoptionModal(false)}>Cerrar</StyledCloseButton>
            </ActionButtons>
          </AdoptionModalContent>
        </AdoptionModal>
      )}

      {showSuccessModal && (
        <SuccessModal>
          <SuccessModalContent>
            <h2>¡Petición de adopción enviada!</h2>
            <p>Gracias por tu interés en adoptar a {pet.name}. Nos pondremos en contacto contigo pronto.</p>
            <Button onClick={() => setShowSuccessModal(false)}>Cerrar</Button>
          </SuccessModalContent>
        </SuccessModal>
      )}
    </>
  );
};

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(229, 231, 235, 0.8);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding: 1rem;
`;

const ModalContent = styled.div`
  background-color: white;
  border-radius: 1.5rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  max-width: 90%;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;

  @media (min-width: 576px) {
    max-width: 80%;
  }

  @media (min-width: 768px) {
    max-width: 70%; 
  }

  @media (min-width: 992px) {
    max-width: 60%; 
  }

  @media (min-width: 1075px) {
    max-width: 50%; 
  }

  @media (min-width: 1200px) {
    max-width: 40%; 
  }
`;

const ImageContainer = styled.div`
  position: relative;
`;

const PetImage = styled.img`
  width: 100%;
  height: auto;
  max-height: 16rem;
  object-fit: cover;
`;

const IconButton = styled.button`
  position: absolute;
  top: 1rem;
  background-color: white;
  border-radius: 50%;
  padding: 0.5rem;
  border: none;
  cursor: pointer;
`;

const HeartIcon = styled(AiFillHeart)<{ isFavorite: boolean }>`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background-color: ${props => (props.isFavorite ? 'red' : 'white')};
  border: 2px solid ${props => (props.isFavorite ? 'red' : 'transparent')};
  color: ${props => (props.isFavorite ? 'white' : 'black')};
  border-radius: 50%;
  padding: 0.5rem;
  cursor: pointer;
`;

const ContentContainer = styled.div`
  padding: 1.5rem;
`;

const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const PetName = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
`;

const Distance = styled.span`
  font-size: 0.875rem;
  color: #6B7280;
`;

const InfoGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const InfoItem = styled.div`
  display: flex;
  justify-content: space-between;
`;

const InfoLabel = styled.p`
  color: #6B7280;
`;

const InfoValue = styled.p`
  font-weight: bold;
`;

const ActionButtons = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
  gap: 1rem;
`;

const Button = styled.button`
  background-color: #6c63ff;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  padding: 0.75rem 1.5rem;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #5a54d1;
  }
`;

const StyledCloseButton = styled(Button)`
  background-color: #e2e8f0; /* Color de fondo para el botón "Cerrar" */
  color: #4a5568; /* Color del texto para el botón "Cerrar" */
  
  &:hover {
    background-color: #cbd5e1; /* Color de fondo en hover */
  }
`;

const LoginModal = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LoginModalContent = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 1rem;
  text-align: center;
`;

const CloseButton = styled.button`
  background-color: transparent;
  border: none;
  color: #6B7280;
  cursor: pointer;
  margin-top: 1rem;
`;

const AdoptionModal = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AdoptionModalContent = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 1rem;
  width: 90%;
  max-width: 400px;
  text-align: center;
`;

const InputField = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
`;

const Label = styled.label`
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const SuccessModal = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SuccessModalContent = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 1rem;
  width: 90%;
  max-width: 400px;
  text-align: center;
`;

export default Modali;
