import styled from 'styled-components';

export const DogAdoptionButton = styled.a`
  background-color: #FF69B4; /* Rosa intenso */
  color: #ffffff; /* Texto blanco */
  border: none;
  border-radius: 20px; /* Bordes redondeados */
  padding: 12px 24px; /* Espacio interno */
  font-size: 16px; /* Tamaño de fuente */
  font-weight: bold; /* Texto en negrita */
  cursor: pointer; /* Cambiar cursor a manita */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.6); /* Sombra suave */
  transition: background-color 0.3s ease, box-shadow 0.3s ease; /* Transición suave al pasar el mouse */
  text-decoration: none;
  &:hover {
    background-color: #FF1493; /* Rosa más oscuro */
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15); /* Sombra más pronunciada al pasar el mouse */
  }
`;
