import React, { useState, useEffect } from 'react';
import PawPrintLoader from '@/app/componets/preloader/preloader';
import PetCard from '@/app/componets/foster-componets/PetCard';
import Modali from '@/app/componets/foster-componets/Modal';
import styled from 'styled-components';
import TypeSelector from '@/app/componets/typeselector/typeselector';
import { FaSearch } from 'react-icons/fa';

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

export default function Pets() {
  const [loading, setLoading] = useState(true);
  const [pets, setPets] = useState<Pet[]>([]);
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [filter, setFilter] = useState<'dog' | 'cat' | 'all'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await fetch('https://powhome.azurewebsites.net/api/Animals');
        const data: Pet[] = await response.json();
        setPets(data);
      } catch (error) {
        console.error('Error fetching pet data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPets();
  }, []);

  const handleViewMore = (pet: Pet) => {
    setSelectedPet(pet);
    setModalOpen(true);
  };

  const handleAdopt = (petId: number) => {
    alert(`Has adoptado a la mascota con ID: ${petId}`);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleFilterChange = (type: 'dog' | 'cat' | 'all') => {
    setFilter(type);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredPets = pets
    .filter(pet =>
      (filter === 'all' || (filter === 'dog' && pet.specie) || (filter === 'cat' && !pet.specie)) &&
      pet.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <>
      {loading ? (
        <PawPrintLoader />
      ) : (
        <Container id="pets-section">
          <Header>
            <h1>Adopt a Pet</h1>
            <TypeSelector onTypeChange={handleFilterChange} />
            <SearchContainer>
              <SearchInput
                type="text"
                placeholder="Search by name..."
                value={searchTerm}
                onChange={handleSearchChange}
              />
              <SearchIcon />
            </SearchContainer>
          </Header>
          <PetsContainer>
            {filteredPets.length > 0 ? (
              filteredPets.map((pet) => (
                <PetCard
                  key={pet.id}
                  pet={pet}
                  onViewMore={() => handleViewMore(pet)}
                />
              ))
            ) : (
              <p>No se encontraron mascotas.</p>
            )}
          </PetsContainer>

          {modalOpen && selectedPet && (
            <Modali pet={selectedPet} onClose={closeModal} />
          )}
        </Container>
      )}
    </>
  );
}

// Estilos con styled-components

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const Header = styled.div`
  margin-bottom: 2rem;
  text-align: center;
`;

const SearchContainer = styled.div`
  position: relative;
  margin: 1rem auto;
  max-width: 600px;
`;

const SearchInput = styled.input`
  padding: 0.75rem;
  border-radius: 5px;
  border: 1px solid #ccc;
  width: 100%;
  padding-left: 2.5rem;
  font-size: 1rem;

  @media (max-width: 600px) {
    width: 80%;
    font-size: 0.875rem;
  }
`;

const SearchIcon = styled(FaSearch)`
  position: absolute;
  top: 50%;
  left: 0.75rem;
  transform: translateY(-50%);
  color: #6c63ff;
`;

const PetsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 2rem;

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
    gap: 15px;
  }
`;
