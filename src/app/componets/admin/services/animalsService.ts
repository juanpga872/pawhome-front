
const API_URL = 'https://powhome.azurewebsites.net/api/Animals';

export const deleteAnimal = async (id: number) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Error deleting animal');
    }

    return response;
  } catch (error) {
    console.error('Error deleting animal:', error);
    throw error;
  }
};


export const createAnimal = async (formData: FormData) => {
    const response = await fetch(`${API_URL}`, {
      method: 'POST',
      body: formData,
    });
  
    if (!response.ok) {
      const errorData = await response.json(); // Obtener más detalles del error
      throw new Error(`Error: ${response.status} - ${errorData.message || 'Unknown error'}`);
    }
  
    return await response.json();
  };