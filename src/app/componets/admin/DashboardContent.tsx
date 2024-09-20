import React, { useEffect, useState } from 'react';

interface AdoptionCenter {
  id: number;
  name: string;
  address: string;
  phone: string;
  email: string;
}

const AdoptionTable: React.FC = () => {
  const [adoptions, setAdoptions] = useState<AdoptionCenter[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAdoptions = async () => {
      try {
        const response = await fetch('https://powhome.azurewebsites.net/api/v1/AdoptionCenter');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setAdoptions(data); // Ajusta según la estructura real de la respuesta
      } catch (error) {
        setError('Error fetching data: ' + error);
      } finally {
        setLoading(false);
      }
    };

    fetchAdoptions();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Adoption Centers</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Address</th>
            <th>Phone</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {adoptions.map((adoption) => (
            <tr key={adoption.id}>
              <td>{adoption.id}</td>
              <td>{adoption.name}</td>
              <td>{adoption.address}</td>
              <td>{adoption.phone}</td>
              <td>{adoption.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdoptionTable;
