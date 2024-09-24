import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { MdShoppingCart, MdDelete, MdClose } from 'react-icons/md'; // Importa los iconos

// Tipo para los ítems del carrito
export type CartItemType = {
  id: number;
  name: string;
  price: number;
  weight: number;
  quantity: number;
  imagePath: string;
};

// Estilos
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
  background-color: #ad57d2;
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

const Modal = styled.div<{ isOpen: boolean }>`
  display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
  flex-direction: column;
  position: fixed;
  top: 0;
  right: 0;
  width: 400px;
  height: 100%;
  background-color: #ffffff;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.5);
  z-index: 1000;
  transition: transform 0.3s ease-in-out;
  padding: 20px;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  position: absolute;
  top: 20px;
  right: 20px;
  font-size: 24px;
  color: #ad57d2;

  &:hover {
    color: #731d97;
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
  background-color: #ffffff;
  padding: 20px;
  border-top: 1px solid #eee;
`;

const CartTitle = styled.h2`
  text-align: center;
  margin: 0;
  padding: 10px;
  color: #333;
`;

const CartItemsList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const CartItemCard = styled.div<{ isHighlighted: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  border: 1px solid #eee;
  border-radius: 8px;
  margin: 5px 0;
  background-color: ${({ isHighlighted }) => (isHighlighted ? '#fffbf1' : '#fff')};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const CartItemDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 10px;
  flex-grow: 1;
`;

const ProductImageContainer = styled.div`
  display: flex;
  align-items: center;
`;

const ProductImage = styled.img`
  width: 80px;
  height: 80px;
  margin-right: 10px;
`;

const ProductName = styled.span`
  font-weight: bold;
  font-size: 16px;
  color: #333;
  margin-bottom: 4px;
`;

const ProductPrice = styled.span`
  font-size: 14px;
  color: #888;
`;

const ProductWeight = styled.span`
  font-size: 12px;
  color: #bbb;
  margin-top: 2px;
`;

const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  margin-right: 5px;
`;

const QuantityButton = styled.button`
  background-color: #ad57d2;
  color: white;
  border: none;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  margin-right: 4px;

  &:hover {
    background-color: #731d97;
  }
`;

const RemoveButton = styled.button`
  background-color: #ff4136;
  color: white;
  border: none;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  margin-left: 5px;

  &:hover {
    background-color: #c82333;
  }
`;

const QuantityCounter = styled.span`
  background-color: #ad57d2;
  color: white;
  border-radius: 50%;
  padding: 3px 7px;
  font-size: 14px;
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
  background-color: #ad57d2;
  color: white;
  border: none;
  padding: 10px 0;
  border-radius: 10px;
  font-size: 16px;
  cursor: pointer;
  display: inline-block;
  width: 100%;
  margin-top: 10px;

  &:hover {
    background-color: #731d97;
  }
`;

// Componente del carrito
const CartComponent: React.FC<{
  cartItems: CartItemType[];
  onRemoveItem: (index: number) => void;
  onUpdateQuantity: (id: number, newQuantity: number) => void;
}> = ({ cartItems = [], onRemoveItem, onUpdateQuantity }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
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

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const hasItems = cartItems.length > 0;

  return (
    <FloatingCartContainer>
      <CartIcon onClick={openModal}>
        <MdShoppingCart size="24" color="white" />
        {hasItems && <CartCount>{cartItems.length}</CartCount>}
      </CartIcon>

      <Modal ref={modalRef} isOpen={isModalOpen}>
        <CloseButton onClick={closeModal}>
          <MdClose />
        </CloseButton>
        <ModalContent hasItems={hasItems}>
          <CartTitle>Tu carrito</CartTitle>
          <ScrollableContent>
            {hasItems ? (
              <CartItemsList>
                {cartItems.map((item, index) => (
                  <CartItemCard key={item.id} isHighlighted={index % 2 === 0}>
                    <ProductImageContainer>
                      <ProductImage src={item.imagePath} alt={item.name} />
                      <CartItemDetails>
                        <ProductName>{item.name}</ProductName>
                        <ProductPrice>${item.price.toFixed(2)}</ProductPrice>
                        <ProductWeight>Peso: {item.weight} KG</ProductWeight>
                      </CartItemDetails>
                    </ProductImageContainer>
                    <QuantityControl>
                      <QuantityButton onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}>
                        +
                      </QuantityButton>
                      <QuantityCounter>{item.quantity}</QuantityCounter>
                      <RemoveButton onClick={() => onRemoveItem(index)}>
                        <MdDelete size="16" />
                      </RemoveButton>
                    </QuantityControl>
                  </CartItemCard>
                ))}
              </CartItemsList>
            ) : (
              <EmptyCartMessageContainer>
                <EmptyCartIcon size="3x" />
                <EmptyCartText>¡Tu carrito está vacío!</EmptyCartText>
                <StartShoppingButton onClick={() => window.location.href = '/products'}>
                  Comienza a comprar
                </StartShoppingButton>
              </EmptyCartMessageContainer>
            )}
          </ScrollableContent>

          {hasItems && (
            <FixedBottomContent>
              <CartTotalContainer>
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </CartTotalContainer>
              <CheckoutButton onClick={closeModal}>Finalizar compra</CheckoutButton>
            </FixedBottomContent>
          )}
        </ModalContent>
      </Modal>
    </FloatingCartContainer>
  );
};

export default CartComponent;

// Estilos adicionales para mensajes vacíos
const EmptyCartMessageContainer = styled.div`
  text-align: center;
  padding: 40px 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  margin: 20px 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const EmptyCartIcon = styled(MdShoppingCart)`
  color: #ad57d2; 
`;

const EmptyCartText = styled.p`
  font-size: 18px; 
  color: #333;
  margin: 10px 0;
`;

const StartShoppingButton = styled.button`
  background-color: #ad57d2;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #731d97; 
  }
`;
