import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { deleteAnimal, createAnimal } from './services/animalsService';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';

const API_URL = 'https://powhome.azurewebsites.net/api/Animals';

// Fetch animals
export const getAnimals = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Error fetching animals');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching animals:', error);
    throw error;
  }
};

// Styled Components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f0f0f0;
  min-height: 100vh;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #333;
`;

const AnimalList = styled.ul`
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  width: 100%;
  max-width: 1200px;
`;

const AnimalCard = styled.li`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  text-align: center;

  &:hover {
    transform: translateY(-5px);
  }
`;

const AnimalImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 15px;
`;

const AnimalName = styled.h2`
  font-size: 1.5rem;
  color: #0070f3;
`;

const AnimalDetail = styled.p`
  font-size: 1rem;
  color: #555;
`;

const DeleteButton = styled.button`
  background-color: #ff4d4d;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background-color: #ff1a1a;
  }
`;

const FloatingButton = styled.button`
  position: fixed;
  bottom: 30px;
  right: 30px;
  background-color: #0070f3;
  color: white;
  padding: 15px;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  font-size: 2rem;

  &:hover {
    background-color: #005bb5;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
  max-width: 500px;
  margin: 20px auto;
`;

const Input = styled.input`
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ddd;
`;

const TextArea = styled.textarea`
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ddd;
  resize: none;
  height: 100px;
`;

const FileInput = styled.input`
  padding: 5px;
`;

const CreateButton = styled.button`
  background-color: #28a745;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #218838;
  }
`;

const LoadingText = styled.p`
  font-size: 1.2rem;
  color: #0070f3;
`;

const ErrorMessage = styled.p`
  font-size: 1rem;
  color: red;
`;

interface NewAnimal {
  name: string;
  breed: string;
  birthDate: string; // Formato 'YYYY-MM-DD'
  description: string;
  sex: boolean; // true = macho, false = hembra
  size: string; // Pequeño, mediano, grande
  location: string; // Ubicación
  specie: boolean; // true = perro, false = gato
  imagePath: string; // URL o path de la imagen
  adoptionCenterID: number; // ID del centro de adopción
}

const AnimalsPage: React.FC = () => {
  const [animals, setAnimals] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [newAnimal, setNewAnimal] = useState<NewAnimal>({
    name: '',
    breed: '',
    birthDate: '',
    description: '',
    sex: true,
    size: '',
    location: '',
    specie: true,
    imagePath: '',
    adoptionCenterID: 0,
  });
  
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    const fetchAnimals = async () => {
      try {
        const data = await getAnimals();
        setAnimals(data);
      } catch (error) {
        setError('Error fetching animals');
      } finally {
        setLoading(false);
      }
    };

    fetchAnimals();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await deleteAnimal(id);
      setAnimals((prevAnimals) => prevAnimals.filter((animal) => animal.id !== id));
    } catch (error) {
      console.error('Error deleting animal:', error);
      setError('Error deleting animal');
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('name', newAnimal.name);
    formData.append('breed', newAnimal.breed);
    formData.append('birthDate', newAnimal.birthDate);
    formData.append('description', newAnimal.description);
    formData.append('sex', newAnimal.sex ? 'true' : 'false'); // Enviando como string
    formData.append('size', newAnimal.size);
    formData.append('location', newAnimal.location);
    formData.append('specie', newAnimal.specie ? 'true' : 'false'); // Enviando como string
    formData.append('adoptionCenterID', newAnimal.adoptionCenterID.toString());
  
    if (imageFile) {
      formData.append('image', imageFile);
    }
  
    try {
      await createAnimal(formData);
      const updatedAnimals = await getAnimals();
      setAnimals(updatedAnimals);
      setShowForm(false);
      setNewAnimal({
        name: '',
        breed: '',
        birthDate: '',
        description: '',
        sex: true,
        size: '',
        location: '',
        specie: true,
        imagePath: '',
        adoptionCenterID: 0,
      });
      setImageFile(null);
    } catch (error) {
      console.error('Error creating animal:', error); // Muestra más detalles sobre el error
      setError('Error creating animal');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    let newValue: any = value;

    if (e.target instanceof HTMLInputElement && e.target.type === 'checkbox') {
      newValue = e.target.checked;
    }

    // Convertir los valores de los select a booleanos
    if (name === 'sex' || name === 'specie') {
      newValue = value === 'true';
    }

    setNewAnimal((prevAnimal) => ({
      ...prevAnimal,
      [name]: newValue,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleBirthDateChange = (date: Date | null) => {
    if (date) {
      const formattedDate = date.toISOString().split('T')[0];
      setNewAnimal((prev) => ({ ...prev, birthDate: formattedDate }));
    }
  };

  if (loading) {
    return <LoadingText>Loading...</LoadingText>;
  }

  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>;
  }

  return (
    <Container>
      <Title>Animals List</Title>

      {showForm && (
        <Form onSubmit={handleCreate}>
          <Input
            name="name"
            placeholder="Name"
            value={newAnimal.name}
            onChange={handleChange}
            required
          />
          <Input
            name="breed"
            placeholder="Breed"
            value={newAnimal.breed}
            onChange={handleChange}
            required
          />
          <label>Birth Date:</label>
          <DatePicker selected={newAnimal.birthDate ? new Date(newAnimal.birthDate) : null} onChange={handleBirthDateChange} dateFormat="yyyy-MM-dd" />
          <TextArea
            name="description"
            placeholder="Description"
            value={newAnimal.description}
            onChange={handleChange}
            required
          />
          <Input
            name="size"
            placeholder="Size (small, medium, large)"
            value={newAnimal.size}
            onChange={handleChange}
            required
          />
          <Input
            name="location"
            placeholder="Location"
            value={newAnimal.location}
            onChange={handleChange}
            required
          />
          <FileInput type="file" accept="image/*" onChange={handleFileChange} />
          <CreateButton type="submit">Create Animal</CreateButton>
        </Form>
      )}

      <FloatingButton onClick={() => setShowForm((prev) => !prev)}>
        {showForm ? '-' : '+'}
      </FloatingButton>

      <AnimalList>
        {animals.map((animal) => (
          <AnimalCard key={animal.id}>
            <AnimalImage src={animal.imagePath} alt={animal.name} />
            <AnimalName>{animal.name}</AnimalName>
            <AnimalDetail>Breed: {animal.breed}</AnimalDetail>
            <AnimalDetail>Description: {animal.description}</AnimalDetail>
            <AnimalDetail>Location: {animal.location}</AnimalDetail>
            <DeleteButton onClick={() => handleDelete(animal.id)}>
              Delete
            </DeleteButton>
          </AnimalCard>
        ))}
      </AnimalList>
    </Container>
  );
};

export default AnimalsPage;
