// src/components/CheckoutModal.tsx
import React from 'react';
import styled from 'styled-components';
import Swal from 'sweetalert2';

// Modal Container
const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  width: 400px;
  max-width: 90%;
  text-align: center;
`;

const PayPalButton = styled.button`
  background-color: #ffc439;
  border: none;
  border-radius: 5px;
  color: black;
  font-size: 16px;
  padding: 10px 20px;
  margin-top: 20px;
  cursor: pointer;

  &:hover {
    background-color: #ffb600;
  }
`;

const CloseButton = styled.button`
  background-color: #e74c3c;
  border: none;
  border-radius: 5px;
  color: white;
  font-size: 14px;
  padding: 8px 16px;
  margin-top: 20px;
  cursor: pointer;

  &:hover {
    background-color: #c0392b;
  }
`;

interface CheckoutModalProps {
  total: number;
  onClose: () => void;
}

const CheckoutModal: React.FC<CheckoutModalProps> = ({ total, onClose }) => {
  const handleFakePayPal = () => {
    const token = localStorage.getItem('token');

    if (!token) {
      Swal.fire({
        title: 'Error',
        text: 'No puedes proceder con el pago porque no has iniciado sesión.',
        icon: 'error',
        confirmButtonText: 'Cerrar',
      });
      return;
    }

    Swal.fire({
      title: 'Pago Simulado',
      text: `Simulaste un pago de $${total.toFixed(2)} con PayPal.`,
      icon: 'success',
      confirmButtonText: 'Cerrar',
    }).then(() => {
      // Clear cart from localStorage
      localStorage.removeItem('cart');
      onClose(); // Close the modal
    });
  };

  return (
    <ModalBackdrop>
      <ModalContent>
        <h2>Finalizar compra</h2>
        <p>Total a pagar: ${total.toFixed(2)}</p>
        <PayPalButton onClick={handleFakePayPal}>Pagar con PayPal</PayPalButton>
        <CloseButton onClick={onClose}>Cancelar</CloseButton>
      </ModalContent>
    </ModalBackdrop>
  );
};

export default CheckoutModal;

