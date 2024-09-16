"use client"; // Marca el archivo como componente del lado del cliente

import React, { useState, useEffect } from 'react';
import ClientLayout from '@/app/ClientLayout'; // Asegúrate de ajustar la ruta según tu estructura
import PawPrintLoader from '@/app/componets/preloader/preloader'; // Asegúrate de ajustar la ruta según tu estructura
import PetCard from '@/app/componets/foster-componets/PetCard'; // Ajusta la ruta si es necesario
import Modal from '@/app/componets/foster-componets/Modal'; // Ajusta la ruta si es necesario
import styled from 'styled-components';
import TypeSelector from '@/app/componets/typeselector/typeselector'; // Asegúrate de ajustar la ruta
import { FaSearch } from 'react-icons/fa'; // Asegúrate de que esta importación esté presente

// Define el tipo Pet con todas las propiedades necesarias
type Pet = {
  id: number;
  name: string;
  image: string;
  age: string;
  breed: string;
  weight: string;
  color: string;
  distance: string;
  specie: string; // Especie puede ser 'cat' o 'dog'
};

// Datos de ejemplo para las mascotas
const petsData: Pet[] = [
  {
    id: 1,
    name: 'Max',
    image: '/images-foster/max.jpg',
    age: '2 años',
    breed: 'Golden Retriever',
    weight: '30 kg',
    color: 'Golden',
    distance: '5 miles',
    specie: 'dog',
  },
  {
    id: 2,
    name: 'Bella',
    image: '/images-foster/bella.jpg',
    age: '1 año',
    breed: 'Labrador Retriever',
    weight: '25 kg',
    color: 'Black',
    distance: '10 miles',
    specie: 'dog',
  },
  {
    id: 3,
    name: 'Lucy',
    image: '/images-foster/lucy.jpg',
    age: '3 años',
    breed: 'Beagle',
    weight: '20 kg',
    color: 'Brown',
    distance: '8 miles',
    specie: 'dog',
  },
  {
    id: 4,
    name: 'Charlie',
    image: '/images-foster/charlie.jpg',
    age: '4 años',
    breed: 'Bulldog',
    weight: '25 kg',
    color: 'White',
    distance: '12 miles',
    specie: 'dog',
  },
  {
    id: 5,
    name: 'Milo',
    image: '/images-foster/milo.jpg',
    age: '5 años',
    breed: 'Poodle',
    weight: '15 kg',
    color: 'Gray',
    distance: '7 miles',
    specie: 'dog',
  },
  {
    id: 6,
    name: 'Luna',
    image: '/images-foster/luna.jpg',
    age: '2 años',
    breed: 'Siamese',
    weight: '4 kg',
    color: 'Cream',
    distance: '6 miles',
    specie: 'cat',
  },
  {
    id: 7,
    name: 'Oliver',
    image: '/images-foster/oliver.jpg',
    age: '3 años',
    breed: 'Maine Coon',
    weight: '8 kg',
    color: 'Brown',
    distance: '9 miles',
    specie: 'cat',
  },
  {
    id: 8,
    name: 'Nala',
    image: '/images-foster/nala.jpg',
    age: '4 años',
    breed: 'Persian',
    weight: '5 kg',
    color: 'White',
    distance: '5 miles',
    specie: 'cat',
  },
  {
    id: 9,
    name: 'Leo',
    image: '/images-foster/leo.jpg',
    age: '1 año',
    breed: 'Bengal',
    weight: '6 kg',
    color: 'Spotted',
    distance: '8 miles',
    specie: 'cat',
  },
  {
    id: 10,
    name: 'Chloe',
    image: '/images-foster/chloe.jpg',
    age: '2 años',
    breed: 'Scottish Fold',
    weight: '4 kg',
    color: 'Gray',
    distance: '7 miles',
    specie: 'cat',
  },
  {
    id: 11,
    name: 'Rocky',
    image: '/images-foster/rocky.jpg',
    age: '6 años',
    breed: 'Boxer',
    weight: '35 kg',
    color: 'Brindle',
    distance: '10 miles',
    specie: 'dog',
  },
  {
    id: 12,
    name: 'Daisy',
    image: '/images-foster/daisy.jpg',
    age: '2 años',
    breed: 'Cocker Spaniel',
    weight: '20 kg',
    color: 'Tan',
    distance: '6 miles',
    specie: 'dog',
  },
  {
    id: 13,
    name: 'Toby',
    image: '/images-foster/toby.jpg',
    age: '4 años',
    breed: 'Chihuahua',
    weight: '3 kg',
    color: 'Tan',
    distance: '4 miles',
    specie: 'dog',
  },
  {
    id: 14,
    name: 'Simba',
    image: '/images-foster/simba.jpg',
    age: '3 años',
    breed: 'Abyssinian',
    weight: '5 kg',
    color: 'Orange',
    distance: '7 miles',
    specie: 'cat',
  },
  {
    id: 15,
    name: 'Mittens',
    image: '/images-foster/mittens.jpg',
    age: '2 años',
    breed: 'Ragdoll',
    weight: '7 kg',
    color: 'Blue',
    distance: '6 miles',
    specie: 'cat',
  },
];

export default function Donate() {
  const [loading, setLoading] = useState(true);
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [filter, setFilter] = useState('all'); // Filtro inicial para todas las mascotas
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Simulación de carga de datos
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Simula la carga por 2 segundos

    return () => clearTimeout(timer);
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

  const handleFilterChange = (type: 'dog' | 'cat') => {
    setFilter(type);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredPets = petsData
    .filter(pet => (filter === 'all' || pet.specie === filter) && pet.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <ClientLayout isLoaded={!loading}>
      {loading ? (
        <PawPrintLoader />
      ) : (
        <Container>
          <Header>
            <h1>Adopta una Mascota</h1>
            <TypeSelector onTypeChange={handleFilterChange} />
            <SearchContainer>
              <SearchInput
                type="text"
                placeholder="Buscar por nombre..."
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
                  onAdopt={() => handleAdopt(pet.id)}
                />
              ))
            ) : (
              <p>No se encontraron mascotas.</p>
            )}
          </PetsContainer>

          {modalOpen && selectedPet && (
            <Modal pet={selectedPet} onClose={closeModal} onAdopt={() => handleAdopt(selectedPet.id)} />
          )}
        </Container>
      )}
    </ClientLayout>
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
  max-width: 600px; /* Limita el ancho de la barra de búsqueda */
`;

const SearchInput = styled.input`
  padding: 0.75rem;
  border-radius: 5px;
  border: 1px solid #ccc;
  width: 100%;
  padding-left: 2.5rem; /* Espacio para el ícono */
  font-size: 1rem;

  @media (max-width: 600px) {
    width: 80%;
    font-size: 0.875rem; /* Tamaño de fuente más pequeño en pantallas pequeñas */
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
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-top: 1rem;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;
