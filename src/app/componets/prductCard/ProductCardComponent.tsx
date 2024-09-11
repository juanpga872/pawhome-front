import React, { useState } from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import { AiOutlineShoppingCart } from 'react-icons/ai';

// Contenedor del ícono del carrito
const CartIconContainer = styled.div`
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  z-index: 1000;

  @media (min-width: 769px) {
    display: none;
  }
`;

// Estilo del ícono del carrito
const StyledCartIcon = styled(AiOutlineShoppingCart)`
  width: 2rem;
  height: 2rem;
  color: #9333ea;
  cursor: pointer;
  transition: color 0.3s;
  background-color: #F7F6F1FF;
  border-radius: 50px;
  position: relative; // Para posicionar el badge correctamente

  &:hover {
    color: #7e22ce;
  }
`;

// Contenedor del badge de notificación
const Badge = styled.span`
  position: absolute;
  top: -0.5rem;
  right: -0.5rem;
  background-color: #ef4444;
  color: white;
  border-radius: 50%;
  padding: 0.25rem 0.5rem;
  font-size: 0.75rem;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
`;

// Contenedor del modal grande
const ModalGrandeCarrito = styled.div<{ visible: boolean }>`
  display: ${({ visible }) => (visible ? 'flex' : 'none')};
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  justify-content: flex-end;
  align-items: center;
  z-index: 1000;
  transition: opacity 0.3s ease;
  opacity: ${({ visible }) => (visible ? '1' : '0')};
`;

// Contenido del modal grande
const ModalContentCarrito = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 0.5rem;
  width: 90%;
  max-width: 400px;
  height: 100%;
  max-height: 100%;
  position: relative;
  overflow-y: auto;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);

  @media (max-width: 768px) {
    width: 100%;
    max-width: 100%;
    border-radius: 0;
    padding: 1rem;
  }
`;

// Botón para cerrar el modal grande
const CloseButtonCarrito = styled.button`
  background: none;
  border: none;
  color: #9333ea;
  font-size: 1.5rem;
  cursor: pointer;
  position: absolute;
  top: 1rem;
  right: 1rem;

  &:hover {
    color: #7e22ce;
  }
`;

// Mini modal
const MiniModal = styled.div<{ visible: boolean }>`
  display: ${({ visible }) => (visible ? 'flex' : 'none')};
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  background-color: rgba(0, 0, 0, 0.8);
  padding: 1rem;
  border-radius: 0.5rem;
  color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  align-items: center;
  z-index: 1000;
  transition: opacity 0.3s;

  @media (max-width: 768px) {
    bottom: 0.5rem;
    right: 0.5rem;
    padding: 0.5rem;
  }
`;

// Imagen del mini modal
const MiniModalImage = styled(Image)`
  border-radius: 0.25rem;
  margin-right: 1rem;
`;

// Mensaje del mini modal
const MiniModalMessage = styled.span`
  font-weight: bold;
`;

// Tarjeta pequeña del producto en el modal grande
const SmallProductCard = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  margin-top: 1rem;
  max-width: 350px;
  width: 100%;
  overflow: hidden;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

// Imagen del producto en la tarjeta pequeña
const SmallProductImage = styled(Image)`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 0.25rem;
  margin-right: 1rem;

  @media (max-width: 768px) {
    margin-right: 0;
    margin-bottom: 1rem;
  }
`;

// Contenido de la tarjeta pequeña
const SmallProductDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

// Nombre del producto en la tarjeta pequeña
const SmallProductName = styled.h4`
  font-size: 1rem;
  font-weight: 600;
  margin: 0;
`;

// Precio del producto en la tarjeta pequeña
const SmallProductPrice = styled.p`
  font-size: 0.875rem;
  color: #ef4444;
  margin: 0;
`;

// Peso del producto en la tarjeta pequeña
const SmallProductWeight = styled.p`
  font-size: 0.75rem;
  color: #6b7280;
  margin: 0;
`;

// Tarjeta del producto
const Card = styled.div`
  width: 16rem;
  padding: 1rem;
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2), 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  margin-bottom: 1.5rem;
  margin-left: 1.5rem;
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.3), 0 6px 12px rgba(0, 0, 0, 0.15);
  }
`;

// Nombre del producto
const ProductName = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

// Contenedor de la calificación
const RatingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 0.5rem;
`;

// Contenedor del precio
const PriceContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
`;

// Precio con descuento
const DiscountedPrice = styled.span`
  color: #ef4444;
  font-weight: bold;
`;

// Precio original
const OriginalPrice = styled.span`
  color: #6b7280;
  text-decoration: line-through;
`;

// Distintivo de membresía
const MembershipBadge = styled.div`
  background-color: #fef3c7;
  color: #92400e;
  font-size: 0.75rem;
  font-weight: 500;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  margin-bottom: 0.5rem;
`;

// Selector de peso
const WeightSelector = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

// Botón de peso
const WeightButton = styled.button<{ selected: boolean }>`
  background-color: ${({ selected }) => (selected ? '#5F00F8FF' : '#9333ea')};
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.3), 0 6px 12px rgba(0, 0, 0, 0.15);

  &:hover {
    background-color: ${({ selected }) => (selected ? '#6600FFFF' : '#7e22ce')};
    transform: scale(1.09);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.3), 0 6px 12px rgba(0, 0, 0, 0.15);
  }
`;

// Botón de añadir al carrito
const AddToCartButton = styled.button`
  background-color: #9333ea;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.3s, transform 0.2s;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.3), 0 6px 12px rgba(0, 0, 0, 0.15);

  &:hover {
    background-color: #7e22ce;
    transform: scale(1.05);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.3), 0 6px 12px rgba(0, 0, 0, 0.15);
  }
`;

// Estilo de la cuadrícula de productos
const ProductGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 2rem 0;
`;

// Contenedor de paginación
const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin: 1rem 0;
`;

// Botón de paginación
const PaginationButton = styled.button<{ active: boolean }>`
  background-color: ${({ active }) => (active ? '#5F00F8FF' : 'white')};
  color: ${({ active }) => (active ? 'white' : '#5F00F8FF')};
  border: 1px solid #5F00F8FF;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  cursor: pointer;
  margin: 0 0.25rem;
  font-weight: bold;
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    background-color: #5F00F8FF;
    color: white;
  }
`;

// Icono de estrella
const StarIcon = styled.div<{ filled: boolean }>`
  width: 1rem;
  height: 1rem;
  background: ${({ filled }) =>
    filled ? 'url(/icons/star-filled.png) no-repeat center center' : 'url(/icons/star-empty.png) no-repeat center center'};
  background-size: contain;
  margin: 0 0.1rem;
`;

const ProductPage: React.FC = () => {
  const [cart, setCart] = useState<{ name: string; imageUrl: string; price: number; weight: string }[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showModalGrande, setShowModalGrande] = useState(false);
  const [showMiniModal, setShowMiniModal] = useState(false);
  const [modalProduct, setModalProduct] = useState<{ name: string; imageUrl: string; price: number; weight: string } | null>(null);
  const itemsPerPage = 12;

  const products = [
    {
      name: 'Producto 1',
      imageUrl: '/icons/product.jpg',
      originalPrice: 99.99,
      discountedPrice: 79.99,
      rating: 4,
      weights: [
        { label: '500g', value: 0 },
        { label: '1kg', value: 10 },
        { label: '2kg', value: 20 }
      ],
      membershipType: 'Miembro Premium'
    },
    // Añadir más productos según sea necesario
  ];

  const totalPages = Math.ceil(products.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleAddToCart = (product: { name: string; imageUrl: string; price: number; weight: string }) => {
    setCart((prevCart) => [...prevCart, product]);
    setModalProduct(product);
    setShowMiniModal(true);
    setTimeout(() => setShowMiniModal(false), 2000); // Ocultar mini modal después de 2 segundos
  };

  const handleOpenModalGrande = () => {
    setShowModalGrande(true);
  };

  const handleCloseModalGrande = () => {
    setShowModalGrande(false);
  };

  const currentProducts = products.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <>
      <ProductGrid>
        {currentProducts.map((product, index) => (
          <Card key={index}>
            <Image src={product.imageUrl} alt={product.name} width={250} height={250} />
            <ProductName>{product.name}</ProductName>
            <RatingContainer>
              {Array.from({ length: 5 }, (_, i) => (
                <StarIcon key={i} filled={i < product.rating} />
              ))}
            </RatingContainer>
            <PriceContainer>
              <DiscountedPrice>${product.discountedPrice.toLocaleString()}</DiscountedPrice>
              <OriginalPrice>${product.originalPrice.toLocaleString()}</OriginalPrice>
            </PriceContainer>
            <MembershipBadge>{product.membershipType}</MembershipBadge>
            <WeightSelector>
              {product.weights.map((weight) => (
                <WeightButton key={weight.label} selected={weight.value === 0}>
                  {weight.label}
                </WeightButton>
              ))}
            </WeightSelector>
            <AddToCartButton onClick={() => handleAddToCart({
              name: product.name,
              imageUrl: product.imageUrl,
              price: product.discountedPrice,
              weight: '500g'
            })}>
              Añadir al Carrito
            </AddToCartButton>
          </Card>
        ))}
      </ProductGrid>
      <Pagination>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <PaginationButton
            key={page}
            active={page === currentPage}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </PaginationButton>
        ))}
      </Pagination>
      <CartIconContainer onClick={handleOpenModalGrande}>
        <StyledCartIcon aria-hidden="true" />
        {cart.length > 0 && <Badge>{cart.length}</Badge>}
      </CartIconContainer>

      {/* Modal Grande del Carrito */}
      <ModalGrandeCarrito visible={showModalGrande}>
        <ModalContentCarrito>
          <CloseButtonCarrito onClick={handleCloseModalGrande}>×</CloseButtonCarrito>
          <h2>Carrito de Compras</h2>
          {cart.length === 0 ? (
            <p>El carrito está vacío.</p>
          ) : (
            cart.map((item, index) => (
              <SmallProductCard key={index}>
                <SmallProductImage src={item.imageUrl} alt={item.name} width={80} height={80} />
                <SmallProductDetails>
                  <SmallProductName>{item.name}</SmallProductName>
                  <SmallProductPrice>${item.price.toLocaleString()}</SmallProductPrice>
                  <SmallProductWeight>Weight: {item.weight}</SmallProductWeight>
                </SmallProductDetails>
              </SmallProductCard>
            ))
          )}
        </ModalContentCarrito>
      </ModalGrandeCarrito>

      {/* Mini Modal */}
      <MiniModal visible={showMiniModal}>
        {modalProduct && (
          <>
            <MiniModalImage src={modalProduct.imageUrl} alt={modalProduct.name} width={50} height={50} />
            <MiniModalMessage>Added to cart: {modalProduct.name}</MiniModalMessage>
          </>
        )}
      </MiniModal>
    </>
  );
};

export default ProductPage;
