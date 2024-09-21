import React from 'react';
import styled from 'styled-components';
import NavLink from './Navlink.ui';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

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
  z-index: 1;

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
  z-index: 1;

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
      <NavLink href="/donate">donar and sponsor</NavLink>
      <NavLink href="/foster">adopt</NavLink>
      <NavLink href="/food">Food</NavLink>
      
      {/* Si no hay token en localStorage, muestra el enlace de login */}
      {!token && (
        <NavLink href="/login">
          <FontAwesomeIcon icon={faUser} />
        </NavLink>
      )}

      {/* Si hay token, muestra el botón para cerrar sesión */}
      {token && (
        <NavLink href='#'>
          <button onClick={handleLogout} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}>
            Cerrar sesión
          </button>
        </NavLink>
      )}
    </NavLinksList>
  );
};

export default NavLinks;
