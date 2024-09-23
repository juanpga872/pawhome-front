import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

import { MdShoppingCart, MdDelete } from 'react-icons/md'; // Import icons from react-icons


const FloatingCartContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;

  @media (max-width: 768px) {
    bottom: 10px;
    right: 10px;
  }
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

const ModalOverlay = styled.div<{ isOpen: boolean }>`
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

const Modal = styled.div`
  display: flex;
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

  @media (max-width: 768px) {
    width: 90%;
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


const CouponContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 15px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const CouponInput = styled.input`
  padding: 10px;
  border: 1px solid #ad57d2;
  border-radius: 5px;
  outline: none;
  transition: border-color 0.3s;


  &:focus {
    border-color: #731d97;
  }

  &::placeholder {
    color: #bbb;
  }
`;

const ApplyButton = styled.button`
  background-color: #ad57d2;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 10px;
  transition: background-color 0.3s, transform 0.3s;

  &:hover {
    background-color: #731d97;
    transform: scale(1.05);
  }
`;

// Tipo para los ítems del carrito
export type CartItemType = {
  id: number;
  name: string;
  price: number;
  weight: number;
  quantity: number;
  imagePath: string;
};


const CartComponent: React.FC<{
  cartItems: CartItemType[];
  onRemoveItem: (index: number) => void;
  onUpdateQuantity: (id: number, newQuantity: number) => void;
}> = ({ cartItems, onRemoveItem, onUpdateQuantity }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [discountCode, setDiscountCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discountedTotal = discountApplied ? total * 0.9 : total; // 10% de descuento
  const hasItems = cartItems.length > 0;

  const handleRemoveItem = (index: number) => {
    onRemoveItem(index);
  };

  const applyDiscount = () => {
    if (discountCode === 'riwi') {
      setDiscountApplied(true);
    }
  };

  const checkLogin = () => {
    const token = localStorage.getItem('token'); // Verifica el token en localStorage
    if (!token) {
      alert('Por favor, inicia sesión para continuar.');
      return;
    }
    closeModal(); // Cierra el modal del carrito si todo está bien
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      closeModal();
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      window.addEventListener('click', handleClickOutside);
    } else {
      window.removeEventListener('click', handleClickOutside);
    }
    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, [isModalOpen]);


  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discountedTotal = discountApplied ? total * 0.9 : total; // 10% discount
  const hasItems = cartItems.length > 0;

  const handleRemoveItem = (index: number) => {
    if (cartItems.length === 1) {
      setIsConfirmDeleteOpen(true);
    } else {
      onRemoveItem(index);
      setIsProductRemovedOpen(true);
      setTimeout(() => setIsProductRemovedOpen(false), 2000);
    }
  };

  const confirmDeleteAll = () => {
    cartItems.forEach((_, index) => onRemoveItem(index));
    setIsConfirmDeleteOpen(false);
  };

  const applyDiscount = () => {
    if (discountCode === 'riwi') {
      setDiscountApplied(true);
    }
  };


  return (
    <FloatingCartContainer>
      <CartIcon onClick={openModal}>
        <MdShoppingCart size="24" color="white" />
        {hasItems && <CartCount>{cartItems.length}</CartCount>}
      </CartIcon>


      <Modal ref={modalRef} isOpen={isModalOpen}>
        <ModalContent hasItems={hasItems}>
          <CartTitle>Your Cart</CartTitle>
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
                        <ProductWeight>Weight: {item.weight} KG</ProductWeight>
                      </CartItemDetails>
                    </ProductImageContainer>
                    <QuantityControl>
                      <QuantityButton onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}>
                        +
                      </QuantityButton>
                      <QuantityCounter>{item.quantity}</QuantityCounter>
                      <RemoveButton onClick={() => handleRemoveItem(index)}>
                        <MdDelete size="16" />
                      </RemoveButton>
                    </QuantityControl>
                  </CartItemCard>
                ))}
              </CartItemsList>
            ) : (
              <EmptyCartMessageContainer>
                <EmptyCartIcon size="3x" />
                <EmptyCartText>Your cart is empty!</EmptyCartText>
                <StartShoppingButton onClick={() => window.location.href = '/products'}>
                  Start Shopping
                </StartShoppingButton>
              </EmptyCartMessageContainer>
            )}
          </ScrollableContent>

          {hasItems && (
            <FixedBottomContent>
              <CartTotalContainer>
                <span>Total:</span>
                <span>${discountedTotal.toFixed(2)}</span>
              </CartTotalContainer>
              <input
                type="text"
                value={discountCode}
                onChange={(e) => setDiscountCode(e.target.value)}
                placeholder="Discount Code"
              />
              <button onClick={applyDiscount}>Apply</button>
              <CheckoutButton onClick={closeModal}>Checkout</CheckoutButton>
            </FixedBottomContent>
          )}
        </ModalContent>
      </Modal>

      {isProductRemovedOpen && (
        <CenteredModal isOpen={isProductRemovedOpen}>
          <ModalContent hasItems={true}>
            <CartTitle>Product Removed</CartTitle>
            <ScrollableContent>
              <p>The product has been removed from the cart.</p>

      <ModalOverlay isOpen={isModalOpen}>
        <Modal ref={modalRef}>
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
                        <RemoveButton onClick={() => handleRemoveItem(index)}>
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


      {isConfirmDeleteOpen && (
        <CenteredModal isOpen={isConfirmDeleteOpen}>
          <ModalContent hasItems={true}>
            <CartTitle>Attention!</CartTitle>
            <ScrollableContent>
              <p>Are you sure you want to remove all items from your cart?</p>
            </ScrollableContent>
            <FixedBottomContent>
              <button onClick={confirmDeleteAll} style={{ marginRight: '10px', padding: '10px', backgroundColor: '#ff4136', color: 'white', border: 'none', borderRadius: '5px' }}>
                Yes, remove all
              </button>
              <button onClick={() => setIsConfirmDeleteOpen(false)} style={{ padding: '10px', backgroundColor: '#ad57d2', color: 'white', border: 'none', borderRadius: '5px' }}>
                No, go back
              </button>
            </FixedBottomContent>

            {hasItems && (
              <FixedBottomContent>
                <CartTotalContainer>
                  <span>Total:</span>
                  <span>${discountedTotal.toFixed(2)}</span>
                </CartTotalContainer>
                <CouponContainer>
                  <CouponInput
                    type="text"
                    value={discountCode}
                    onChange={(e) => setDiscountCode(e.target.value)}
                    placeholder="Código de descuento"
                  />
                  <ApplyButton onClick={applyDiscount}>Aplicar</ApplyButton>
                </CouponContainer>
                <CheckoutButton onClick={checkLogin}>Finalizar compra</CheckoutButton>
              </FixedBottomContent>
            )}

          </ModalContent>
        </Modal>
      </ModalOverlay>
    </FloatingCartContainer>
  );
};

export default CartComponent;

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


const StartShoppingLink = styled.a`
  color: #ad57d2;
  text-decoration: underline;
  font-size: 16px;
  transition: color 0.3s;

  &:hover {
    color: #731d97; /* Color on hover */
  }
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
