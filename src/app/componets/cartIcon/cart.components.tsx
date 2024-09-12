import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faTimes, faMinus, faPlus, faTrash, faShoppingBasket } from '@fortawesome/free-solid-svg-icons';

const CartIcon = styled.div`
  cursor: pointer;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #AD57D2FF;
`;

const CartCount = styled.span`
  background-color: red;
  color: white;
  border-radius: 50%;
  padding: 2px 6px;
  font-size: 12px;
  position: absolute;
  top: -5px;
  right: -5px;
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
  position: relative; /* Necesario para el contador en la tarjeta */
`;

const ProductImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 5px;
  object-fit: cover;
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
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 150px;
`;

const ProductPrice = styled.span`
  font-size: 14px;
  color: #888;
  margin-top: 4px;
`;

const ProductWeight = styled.span`
  font-size: 12px;
  color: #bbb;
`;

const QuantityControl = styled.div`
  display: flex;
  align-items: center;
`;

const QuantityButton = styled.button`
  background-color: #AD57D2FF;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 50%; /* Hace los botones redondos */
  cursor: pointer;
  margin: 0 5px;
  &:hover {
    background-color: #731D97FF;
  }
`;

const RemoveButton = styled.button`
  background-color: #FF4136;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 50%; /* Hace el botón redondo */
  cursor: pointer;
  &:hover {
    background-color: #C82333;
  }
`;

const SavingsButton = styled.button`
  background-color: #FFD700;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #FFA500;
  }
`;

const Message = styled.div`
  color: green;
  font-size: 14px;
  text-align: center;
  margin-top: 10px;
`;

const QuantityCounter = styled.span`
  background-color: #AD57D2FF;
  color: white;
  border-radius: 50%;
  padding: 5px 10px; /* Ajusta el padding para hacerlo más redondo */
  font-size: 16px; /* Aumenta el tamaño del texto para mejor visibilidad */
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%); /* Centra verticalmente el contador */
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
  &:hover {
    background-color: #731D97FF;
  }
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
  transform: translateX(${({ isOpen }) => (isOpen ? '0' : '100%')});
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

type CartItemType = {
  id: number;
  name: string;
  price: number;
  weight: string;
  imageUrl: string;
  quantity: number;
};

const CartComponent: React.FC<{ cartItems: CartItemType[], onRemoveItem: (index: number) => void, onUpdateQuantity: (index: number, delta: number) => void }> = ({ cartItems = [], onRemoveItem, onUpdateQuantity }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setMessage(null); // Clear message when closing modal
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      closeModal();
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isModalOpen]);

  const handleQuantityChange = (index: number, delta: number) => {
    const newQuantity = cartItems[index].quantity + delta;
    if (newQuantity <= 0) {
      onRemoveItem(index);
      setMessage("Producto eliminado");
      setTimeout(() => setMessage(null), 2000);
    } else {
      onUpdateQuantity(index, delta);
    }
  };

  // Calcula el total del carrito
  const total = cartItems.reduce((sum, item) => {
    const price = Number(item.price) || 0; // Asegúrate de que price sea un número
    const quantity = Number(item.quantity) || 0; // Asegúrate de que quantity sea un número
    return sum + price * quantity;
  }, 0);

  return (
    <>
      <CartIcon onClick={openModal}>
        <FontAwesomeIcon icon={faShoppingCart} size="lg" color="white" />
        {cartItems.length > 0 && <CartCount>{cartItems.length}</CartCount>}
      </CartIcon>
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
                <StartShoppingButton href="/">Comienza a Comprar</StartShoppingButton>
              </>
            ) : (
              <>
                <CartItemsList>
                  {cartItems.map((item, index) => (
                    <CartItemCard key={item.id} isHighlighted={item.quantity > 1}>
                      <ProductImage src={item.imageUrl} alt={item.name} />
                      <CartItemDetails>
                        <ProductName>{item.name}</ProductName>
                        <ProductPrice>${item.price.toFixed(2)}</ProductPrice>
                        <ProductWeight>{item.weight}</ProductWeight>
                      </CartItemDetails>
                      <QuantityControl>
                        <QuantityButton onClick={() => handleQuantityChange(index, -1)}>
                          <FontAwesomeIcon icon={faMinus} />
                        </QuantityButton>
                        <QuantityCounter>{item.quantity}</QuantityCounter>
                        <QuantityButton onClick={() => handleQuantityChange(index, 1)}>
                          <FontAwesomeIcon icon={faPlus} />
                        </QuantityButton>
                      </QuantityControl>
                      {item.quantity === 1 && (
                        <RemoveButton onClick={() => {
                          onRemoveItem(index);
                          setMessage("Producto eliminado");
                          setTimeout(() => setMessage(null), 2000);
                        }}>
                          <FontAwesomeIcon icon={faTrash} />
                        </RemoveButton>
                      )}
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
                <span>¿Quieres ahorrar $869 en este pedido?</span>
                <SavingsButton>Ahorra</SavingsButton>
              </SavingsMessage>
              <CartTotalContainer>
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </CartTotalContainer>
              <CheckoutButton>
                Continuar al Checkout 
              </CheckoutButton>
            </FixedBottomContent>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default CartComponent;
