import styled from 'styled-components';

export const DogAdoptionButton = styled.a`
  background-color: #FF69B4; /* Intense pink */
  color: #ffffff; /* White text */
  border: none;
  border-radius: 20px; /* Rounded corners */
  padding: 12px 24px; /* Internal spacing */
  font-size: 16px; /* Font size */
  font-weight: bold; /* Bold text */
  cursor: pointer; /* Change cursor to pointer */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.6); /* Soft shadow */
  transition: background-color 0.3s ease, box-shadow 0.3s ease; /* Smooth transition on hover */
  text-decoration: none;
  &:hover {
    background-color: #FF1493; /* Darker pink */
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15); /* More pronounced shadow on hover */
  }
`;
