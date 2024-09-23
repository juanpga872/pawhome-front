import React from 'react';
import styled from 'styled-components';
import NavLink from './Navlink.ui';
import { MdPerson } from 'react-icons/md'; // Importa el ícono de usuario de react-icons

interface NavLinksProps {
  isOpen: boolean;
}

const NavbarWrapper = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.8); /* Fondo semitransparente */
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 3; /* Asegura que esté encima de todo */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Sombra para un efecto más elevado */
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const NavLinksList = styled.ul<NavLinksProps>`
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
  justify-content: center;
  flex-grow: 1;

  @media (max-width: 768px) {
    display: ${props => (props.isOpen ? 'block' : 'none')};
    text-align: center;
  }
`;

const NavLinks: React.FC<NavLinksProps> = ({ isOpen }) => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  // Función para manejar el cierre de sesión
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user'); // Si guardas más datos en localStorage, los puedes eliminar aquí
    window.location.reload(); // Recarga la página para reflejar el cambio
  };

  return (
    <NavLinksList isOpen={isOpen}>
      <NavLink href="/donate">donate and sponsor</NavLink>
      <NavLink href="/foster">adopt</NavLink>
      <NavLink href="/food">Food</NavLink>
      <NavLink href="/post">post</NavLink>
      
      {/* Si no hay token en localStorage, muestra el enlace de login */}
      {!token && (
        <NavLink href="/login">
          <MdPerson /> {/* Usando el ícono de usuario de react-icons */}
        </NavLink>
      )}

      {/* Si hay token, muestra el botón para cerrar sesión */}
      {token && (
        <NavLink href="#">
          <button onClick={handleLogout} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}>
            log out
          </button>
        </NavLink>
      )}
    </NavLinksList>
  );
};

export default NavLinks;
