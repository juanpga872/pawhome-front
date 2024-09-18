import React, { useState, useRef, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faTimes, faMinus, faPlus, faTrash, faShoppingBasket } from '@fortawesome/free-solid-svg-icons';

const FloatingCartContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
`;

const CartIcon = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #AD57D2FF;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
  }
`;

const CartCount = styled.span`
  background-color: red;
  color: white;
  border-radius: 50%;
  padding: 2px 6px;
  font-size: 12px;
  position: absolute;
  top: 0;
  right: 0;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: black;
  font-size: 20px;
  cursor: pointer;
  align-self: flex-end;
  padding: 5px;
`;

const EmptyCartIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
  color: #731D97FF;
`;

const EmptyCartMessage = styled.p`
  text-align: center;
  font-size: 18px;
  color: #555;
  margin: 10px 0;
`;

const StartShoppingButton = styled.a`
  display: block;
  background-color: #AD57D2FF;
  color: white;
  text-align: center;
  padding: 10px 20px;
  border-radius: 5px;
  text-decoration: none;
  margin: 20px auto;
  max-width: 200px;

  &:hover {
    background-color: #731D97FF;
  }
`;

const CartItemCard = styled.div<{ isHighlighted: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border: 1px solid #eee;
  border-radius: 8px;
  margin: 5px 0;
  background-color: ${({ isHighlighted }) => (isHighlighted ? '#fffbf1' : '#fff')};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: relative;
`;

const CartItemDetails = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;
  flex-grow: 1;
`;

const ProductName = styled.span`
  font-weight: bold;
  font-size: 14px;
  color: #333;
`;

const ProductPrice = styled.span`
  font-size: 14px;
  color: #888;
`;

const ProductWeight = styled.span`
  font-size: 12px;
  color: #bbb;
`;

const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  margin-right: 10px;
`;

const QuantityButton = styled.button`
  background-color: #AD57D2FF;
  color: white;
  border: none;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  cursor: pointer;
  margin: 0 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
`;

const QuantityCounter = styled.span`
  background-color: #AD57D2FF;
  color: white;
  border-radius: 50%;
  padding: 5px 10px;
  font-size: 16px;
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
`;

const CartTotalContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  font-weight: bold;
  font-size: 18px;
`;

const CheckoutButton = styled.button`
  background-color: #AD57D2FF;
  color: white;
  border: none;
  padding: 15px 0;
  border-radius: 10px;
  font-size: 16px;
  cursor: pointer;
  display: inline-block;
  width: 100%;
  margin-top: 10px;
`;

const Modal = styled.div<{ isOpen: boolean }>`
  display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
  flex-direction: column;
  position: fixed;
  top: 0;
  right: 0;
  width: 400px;
  height: 100%;
  background-color: #FFFFFF;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.5);
  z-index: 1000;
  transition: transform 0.3s ease-in-out;

  @media (max-width: 767px) {
    width: 100%;
    height: 100%;
    top: 0;
    right: 0;
  }
`;

const ModalContent = styled.div<{ hasItems: boolean }>`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
`;

const ScrollableContent = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  padding: 20px;
`;

const FixedBottomContent = styled.div`
  position: sticky;
  bottom: 0;
  background-color: #FFFFFF;
  padding: 20px;
  border-top: 1px solid #eee;
`;

const CartItemsList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Message = styled.div`
  color: green;
  font-size: 14px;
  text-align: center;
  margin-top: 10px;
`;

const SavingsMessage = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  padding: 10px;
  background-color: #FFF9E5;
  border: 1px solid #FFD700;
  border-radius: 8px;
  font-size: 14px;
  color: #FF8C00;
`;

const NotificationModal = styled.div<{ isVisible: boolean }>`
  display: ${({ isVisible }) => (isVisible ? 'flex' : 'none')};
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 20px;
  border-radius: 10px;
  z-index: 2000;
  transition: opacity 0.5s;
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
`;

const ConfirmationModal = styled.div<{ isOpen: boolean }>`
  display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  z-index: 2000;
`;

const ConfirmationButton = styled.button`
  background-color: #FF4136;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  margin: 5px;
  cursor: pointer;
`;

type CartItemType = {
  id: number; 
  name: string;
  price: number;
  weight: number; 
  quantity: number;
};

const CartComponent: React.FC<{ 
  cartItems: CartItemType[], 
  onRemoveItem: (index: number) => void, 
  onUpdateQuantity: (id: number, newQuantity: number) => void 
}> = ({ cartItems, onRemoveItem, onUpdateQuantity }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<number | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [discountCode, setDiscountCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);
  const [notificationVisible, setNotificationVisible] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setMessage(null);
    setDiscountCode('');
    setDiscountApplied(false);
  };

  const openConfirmationModal = (itemId: number) => {
    setItemToDelete(itemId);
    setIsConfirmDeleteOpen(true);
  };

  const closeConfirmationModal = () => {
    setIsConfirmDeleteOpen(false);
    setItemToDelete(null);
  };

  const handleDeleteItem = () => {
    if (itemToDelete !== null) {
      onRemoveItem(cartItems.findIndex(item => item.id === itemToDelete));
      setNotificationMessage("¡Producto eliminado!");
      setNotificationVisible(true);
      setTimeout(() => setNotificationVisible(false), 2000);
      closeConfirmationModal();
    }
  };

  const handleQuantityChange = (id: number, delta: number) => {
    const itemIndex = cartItems.findIndex(item => item.id === id);
    
    if (itemIndex === -1) {
      console.error("Item not found in cart");
      return;
    }

    const newQuantity = cartItems[itemIndex].quantity + delta;

    if (newQuantity <= 0) {
      openConfirmationModal(id);
    } else {
      onUpdateQuantity(id, newQuantity);
      setNotificationMessage("¡Producto agregado!");
      setNotificationVisible(true);
      setTimeout(() => setNotificationVisible(false), 2000);
    }
  };

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discountedTotal = discountApplied ? total - 5000 : total;

  const handleApplyDiscount = () => {
    if (discountCode === 'riwi' && total >= 20000 && !discountApplied) {
      setDiscountApplied(true);
      setMessage('Descuento aplicado');
      setTimeout(() => setMessage(null), 2000);
    } else {
      setMessage('Cupón inválido o condiciones no cumplidas');
      setTimeout(() => setMessage(null), 2000);
    }
  };

  const formattedPrice = (price: number) => {
    return price.toLocaleString('es-CO', { style: 'currency', currency: 'COP' });
  };

  return (
    <>
      <FloatingCartContainer>
        <CartIcon onClick={openModal}>
          <FontAwesomeIcon icon={faShoppingCart} size="lg" color="white" />
          {cartItems.length > 0 && <CartCount>{cartItems.reduce((sum, item) => sum + item.quantity, 0)}</CartCount>}
        </CartIcon>
      </FloatingCartContainer>
      
      <Modal isOpen={isModalOpen}>
        <ModalContent hasItems={cartItems.length > 0}>
          <ScrollableContent>
            <CloseButton onClick={closeModal}>
              <FontAwesomeIcon icon={faTimes} />
            </CloseButton>
            {cartItems.length === 0 ? (
              <>
                <EmptyCartIcon>
                  <FontAwesomeIcon icon={faShoppingBasket} size="3x" />
                </EmptyCartIcon>
                <EmptyCartMessage>Tu carrito está vacío.</EmptyCartMessage>
                <StartShoppingButton href="/food">Comienza a Comprar</StartShoppingButton>
              </>
            ) : (
              <>
                <CartItemsList>
                  {cartItems.map((item) => (
                    <CartItemCard key={item.id} isHighlighted={item.quantity > 1}>
                      <CartItemDetails>
                        <ProductName>{item.name}</ProductName>
                        <ProductPrice>{formattedPrice(item.price)}</ProductPrice>
                        <ProductWeight>Weight: {item.weight}kg</ProductWeight>
                      </CartItemDetails>
                      <QuantityControl>
                        <QuantityButton onClick={() => handleQuantityChange(item.id, -1)}>
                          {item.quantity > 1 ? (
                            <FontAwesomeIcon icon={faMinus} />
                          ) : (
                            <FontAwesomeIcon icon={faTrash} />
                          )}
                        </QuantityButton>
                        <QuantityCounter>{item.quantity}</QuantityCounter>
                        <QuantityButton onClick={() => handleQuantityChange(item.id, 1)}>
                          <FontAwesomeIcon icon={faPlus} />
                        </QuantityButton>
                      </QuantityControl>
                    </CartItemCard>
                  ))}
                </CartItemsList>
                {message && <Message>{message}</Message>}
              </>
            )}
          </ScrollableContent>
          {cartItems.length > 0 && (
            <FixedBottomContent>
              <SavingsMessage>
                <input 
                  type="text" 
                  value={discountCode} 
                  onChange={(e) => setDiscountCode(e.target.value)} 
                  placeholder="Código de descuento"
                />
                <button onClick={handleApplyDiscount}>Aplicar</button>
              </SavingsMessage>
              <CartTotalContainer>
                <span>Total:</span>
                <span>{formattedPrice(discountedTotal)}</span>
              </CartTotalContainer>
              <CheckoutButton>
                Continuar al Checkout 
              </CheckoutButton>
            </FixedBottomContent>
          )}
        </ModalContent>
      </Modal>

      <NotificationModal isVisible={notificationVisible}>
        {notificationMessage}
      </NotificationModal>

      <ConfirmationModal isOpen={isConfirmDeleteOpen}>
        <p>¿Estás seguro de que deseas eliminar este producto?</p>
        <ConfirmationButton onClick={handleDeleteItem}>Sí</ConfirmationButton>
        <ConfirmationButton onClick={closeConfirmationModal}>No</ConfirmationButton>
      </ConfirmationModal>
    </>
  );
};

export default CartComponent;
