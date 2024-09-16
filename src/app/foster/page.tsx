"use client"; // Marca el archivo como componente del lado del cliente

import React, { useState, useEffect } from 'react';
import ClientLayout from '@/app/ClientLayout'; // Asegúrate de ajustar la ruta según tu estructura
import PawPrintLoader from '@/app/componets/preloader/preloader'; // Asegúrate de ajustar la ruta según tu estructura
import PetCard from '@/app/componets/foster-componets/PetCard'; // Ajusta la ruta si es necesario
import Modal from '@/app/componets/foster-componets/Modal'; // Ajusta la ruta si es necesario

// Simulación de datos de mascotas
const petsData = [
  { id: 1, name: 'max', image: '/images-foster/max.jpg', age: '2 años', breed: 'Golden Retriever' },
  { id: 2, name: 'Luna', image: '/images-foster/luna.jpg', age: '3 años', breed: 'Labrador' },
  { id: 3, name: 'max', image: '/images-foster/max.jpg', age: '2 años', breed: 'Golden Retriever' },
  { id: 4, name: 'Luna', image: '/images-foster/luna.jpg', age: '3 años', breed: 'Labrador' },
  { id: 5, name: 'max', image: '/images-foster/max.jpg', age: '2 años', breed: 'Golden Retriever' },
  { id: 6, name: 'Luna', image: '/images-foster/luna.jpg', age: '3 años', breed: 'Labrador' },
  { id: 7, name: 'max', image: '/images-foster/max.jpg', age: '2 años', breed: 'Golden Retriever' },
  { id: 8, name: 'Luna', image: '/images-foster/luna.jpg', age: '3 años', breed: 'Labrador' },
  // Más mascotas...
];

export default function Donate() {
  const [loading, setLoading] = useState(true);
  const [selectedPet, setSelectedPet] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Simula la carga por 2 segundos

    return () => clearTimeout(timer); // Limpia el temporizador si el componente se desmonta
  }, []);

  // Maneja la visualización de más detalles de una mascota
  const handleViewMore = (pet:any) => {
    setSelectedPet(pet);
    setModalOpen(true);
  };

  // Maneja la adopción de una mascota
  const handleAdopt = (petId:any) => {
    alert(`Has adoptado a la mascota con ID: ${petId}`);
  };

  // Cierra el modal
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <ClientLayout isLoaded={!loading}>
      {loading ? (
        <PawPrintLoader />
      ) : (
        <div>
          <h1>Adopta una Mascota</h1>
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
            {petsData.map((pet) => (
              <PetCard
                key={pet.id}
                pet={pet}
                onViewMore={handleViewMore}
                onAdopt={handleAdopt}
              />
            ))}
          </div>

          {modalOpen && selectedPet && (
            <Modal pet={selectedPet} onClose={closeModal} />
          )}
        </div>
      )}
    </ClientLayout>
  );
}

