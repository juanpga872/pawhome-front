import React, { useEffect, useState } from 'react';
import emailjs from 'emailjs-com';
import styled from 'styled-components';
import { FaPaw, FaTrash } from 'react-icons/fa';
import Swal from 'sweetalert2';

// Interface defining the structure for adoption data
interface AdoptionCenter {
  id: number;
  name: string;
  address: string;
  phone: string;
  email: string;
}

// Styled components for layout and presentation
const Container = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: auto;
  background-color: #ffeef8;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  text-align: center;
  color: #d5006d;
`;

const Button = styled.button<{ disabled?: boolean }>`
  margin-bottom: 20px;
  padding: 10px 15px;
  background-color: ${(props) => (props.disabled ? '#ff80ab' : '#d5006d')};
  color: white;
  border: none;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  border-radius: 5px;
  font-size: 1rem;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${(props) => (props.disabled ? '#ff80ab' : '#c51162')};
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.th`
  background-color: #d5006d;
  color: white;
  padding: 10px;
  text-align: left;
`;

const TableCell = styled.td`
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
`;

const TableRow = styled.tr`
  &:hover {
    background-color: #ffe4f1;
  }
`;

const CheckIcon = styled(FaPaw)`
  color: #d5006d;
  cursor: pointer;
  font-size: 1.5rem;
`;

const DeleteIcon = styled(FaTrash)`
  color: #d5006d;
  cursor: pointer;
  font-size: 1.5rem;
`;

const AdoptionTable: React.FC = () => {
  const [adoptions, setAdoptions] = useState<AdoptionCenter[]>([]); // Stores the fetched adoptions
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error handling
  const [selectedAdoptions, setSelectedAdoptions] = useState<number[]>([]); // Tracks selected adoptions

  // Fetch adoption data from API on component mount
  useEffect(() => {
    const fetchAdoptions = async () => {
      try {
        const response = await fetch('https://powhome.azurewebsites.net/api/v1/AdoptionCenter');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data: AdoptionCenter[] = await response.json();
        setAdoptions(data);
      } catch (error) {
        setError('Error fetching data: ' + (error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchAdoptions();
  }, []);

  // Handles selecting/deselecting adoption requests
  const handleSelect = (id: number) => {
    setSelectedAdoptions((prev) =>
      prev.includes(id) ? prev.filter((adoptionId) => adoptionId !== id) : [...prev, id]
    );
  };

  // Sends an email for each selected adoption
  const handleAccept = async () => {
    const uniqueSelected = Array.from(new Set(selectedAdoptions));

    // Display loader

    Swal.fire({
      title: 'Enviando correos...',
      text: 'Por favor, espera un momento.',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    for (const id of uniqueSelected) {
      const adoption = adoptions.find(adoption => adoption.id === id);
      
      if (adoption) {
        const templateParams = {
          email_to_send: adoption.email,
          from_name: adoption.name,
          message: `¡Hola ${adoption.name}! Tu solicitud ha sido aceptada.`,
        };

        try {
          await emailjs.send('service_2jv15nb', 'template_rmm9ils', templateParams, 'YR5J8VoxemSVTIQtW');
          console.log('Correo enviado');
          await Swal.fire({
            icon: 'success',
            title: '¡Éxito!',
            text: `Correo enviado a ${adoption.email}`,
          });
        } catch (error) {
          console.error('Error al enviar correo', error);
          await Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Error al enviar correo: ' + (error as Error).message,
          });
        }
      }
    }

    setSelectedAdoptions([]); // Clear selection after email sending
    Swal.close(); // Close loader
  };

  // Handles deleting an adoption request
  const handleDelete = async (id: number) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta solicitud?')) {
      try {
        const response = await fetch(`https://powhome.azurewebsites.net/api/v1/AdoptionCenter/${id}`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          const errorMessage = await response.text();
          throw new Error(`Error al eliminar la solicitud: ${errorMessage}`);
        }

        setAdoptions(adoptions.filter(adoption => adoption.id !== id)); // Remove deleted adoption from state
        alert(`Solicitud de adopción con ID ${id} eliminada.`);
      } catch (error) {
        console.error('Error al eliminar la solicitud', error);
        alert('Error al eliminar la solicitud: ' + (error as Error).message);
      }
    }
  };

  // Loading or error state display
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Container>
      <Title>Adoption requests</Title>
      {/* Disable the button if no adoptions are selected */}
      <Button onClick={handleAccept} disabled={selectedAdoptions.length === 0}>
        Aceptar Selección
      </Button>
      <Table>
        <thead>
          <tr>
            <TableHeader>Seleccionar</TableHeader>
            <TableHeader>ID</TableHeader>
            <TableHeader>Name</TableHeader>
            <TableHeader>Address</TableHeader>
            <TableHeader>Phone</TableHeader>
            <TableHeader>Email</TableHeader>
            <TableHeader>Eliminar</TableHeader>
          </tr>
        </thead>
        <tbody>
          {adoptions.map((adoption) => (
            <TableRow key={adoption.id}>
              <TableCell onClick={() => handleSelect(adoption.id)}>
                {selectedAdoptions.includes(adoption.id) && <CheckIcon />}
              </TableCell>
              <TableCell>{adoption.id}</TableCell>
              <TableCell>{adoption.name}</TableCell>
              <TableCell>{adoption.address}</TableCell>
              <TableCell>{adoption.phone}</TableCell>
              <TableCell>{adoption.email}</TableCell>
              <TableCell>
                <DeleteIcon onClick={() => handleDelete(adoption.id)} />
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default AdoptionTable;
