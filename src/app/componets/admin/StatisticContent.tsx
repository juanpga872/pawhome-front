import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Swal from 'sweetalert2';

// Definición de tipos para los usuarios
interface User {
  id?: number; // Cambiado a opcional
  name: string;
  phone: string;
  email: string;
  password: string;
  isAdmin: boolean;
}

// Styled components para la tabla
const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
  font-family: 'Arial', sans-serif;
`;

const Th = styled.th`
  background-color: #f4f4f4;
  padding: 16px;
  text-align: left;
`;

const Td = styled.td`
  padding: 16px;
  border-bottom: 1px solid #ddd;
`;

const Button = styled.button`
  background-color: #ff4081;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #e63971;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
`;

const ModalHeader = styled.h2`
  margin: 0;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: #ff4081;
  cursor: pointer;
  font-size: 16px;
  position: absolute;
  top: 20px;
  right: 20px;
`;

const Input = styled.input`
  width: calc(100% - 20px);
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const StatisticContent: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const fetchUsers = async () => {
    try {
      const response = await axios.get<User[]>('https://powhome.azurewebsites.net/api/v1/Users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    fetchUsers(); // Llamar a la API al montar el componente

    const intervalId = setInterval(() => {
      fetchUsers(); // Consultar la API cada 3 segundos
    }, 3000);

    return () => clearInterval(intervalId); // Limpiar el intervalo al desmontar el componente
  }, []);

  const handleAddOrEditUser = async () => {
    if (!currentUser || !currentUser.name || !currentUser.phone || !currentUser.email) {
      Swal.fire({
        title: 'Error',
        text: 'Por favor, completa todos los campos requeridos.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      return;
    }

    try {
      const userData = {
        name: currentUser.name,
        phone: currentUser.phone,
        email: currentUser.email,
        password: currentUser.password,
        isAdmin: currentUser.isAdmin,
      };

      if (currentUser.id) {
        // Intentar actualizar el usuario
        await axios.put('https://powhome.azurewebsites.net/api/v1/Users', { ...userData, id: currentUser.id });
        Swal.fire('Usuario actualizado', '', 'success');
      } else {
        // Agregar nuevo usuario
        await axios.post('https://powhome.azurewebsites.net/api/v1/Users', userData);
        Swal.fire('Usuario agregado', '', 'success');
      }

      fetchUsers(); // Refrescar la lista de usuarios
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.error('Error saving user:', error.response.data);
        Swal.fire({
          title: 'Error',
          text: error.response.data.message || 'No se pudo guardar el usuario',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      } else {
        console.error('Error saving user:', error);
        Swal.fire({
          title: 'Error',
          text: 'No se pudo guardar el usuario',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    }

    setIsModalOpen(false);
    setCurrentUser(null);
  };

  const handleDeleteUser = async (id: number) => {
    try {
      await axios.delete(`https://powhome.azurewebsites.net/api/v1/Users/${id}`);
      setUsers(users.filter(user => user.id !== id));
      Swal.fire('Usuario eliminado', '', 'success');
    } catch (error) {
      console.error('Error deleting user:', error);
      Swal.fire({
        title: 'Error',
        text: 'No se pudo eliminar el usuario',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };

  const openModal = (user: User | null) => {
    setCurrentUser(user ? { ...user } : { name: '', phone: '', email: '', password: '', isAdmin: false });
    setIsModalOpen(true);
  };

  return (
    <div>
      <h2>Statistics</h2>
      <p>View detailed statistics about your products, sales, and customer behavior.</p>
      <Button onClick={() => openModal(null)}>Agregar Usuario</Button>
      <Table>
        <thead>
          <tr>
            <Th>ID</Th>
            <Th>Nombre</Th>
            <Th>Teléfono</Th>
            <Th>Email</Th>
            <Th>Es Admin</Th>
            <Th>Acciones</Th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <Td>{user.id}</Td>
              <Td>{user.name}</Td>
              <Td>{user.phone}</Td>
              <Td>{user.email}</Td>
              <Td>{user.isAdmin ? 'Sí' : 'No'}</Td>
              <Td>
                <Button onClick={() => openModal(user)}>Editar</Button>
                <Button onClick={() => handleDeleteUser(user.id!)}>Eliminar</Button>
              </Td>
            </tr>
          ))}
        </tbody>
      </Table>

      {isModalOpen && (
        <ModalOverlay>
          <ModalContent>
            <ModalHeader>{currentUser?.id ? 'Editar Usuario' : 'Agregar Usuario'}</ModalHeader>
            <CloseButton onClick={() => setIsModalOpen(false)}>✖</CloseButton>
            <Input
              type="text"
              placeholder="Nombre"
              value={currentUser?.name || ''}
              onChange={(e) => setCurrentUser({ ...currentUser!, name: e.target.value })}
            />
            <Input
              type="text"
              placeholder="Teléfono"
              value={currentUser?.phone || ''}
              onChange={(e) => setCurrentUser({ ...currentUser!, phone: e.target.value })}
            />
            <Input
              type="email"
              placeholder="Email"
              value={currentUser?.email || ''}
              onChange={(e) => setCurrentUser({ ...currentUser!, email: e.target.value })}
            />
            <Input
              type="password"
              placeholder="Contraseña"
              value={currentUser?.password || ''}
              onChange={(e) => setCurrentUser({ ...currentUser!, password: e.target.value })}
            />
            <label>
              <input
                type="checkbox"
                checked={currentUser?.isAdmin || false}
                onChange={(e) => setCurrentUser({ ...currentUser!, isAdmin: e.target.checked })}
              />
              Es Admin
            </label>
            <Button onClick={handleAddOrEditUser}>
              {currentUser?.id ? 'Actualizar' : 'Agregar'}
            </Button>
          </ModalContent>
        </ModalOverlay>
      )}
    </div>
  );
};

export default StatisticContent;
