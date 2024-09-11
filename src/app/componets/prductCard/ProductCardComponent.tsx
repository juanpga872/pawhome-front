import React, { useState } from 'react';
import Image from 'next/image';
import styled from 'styled-components';

// Definición de la interfaz para las propiedades del componente
interface ProductCardProps {
  name: string;
  imageUrl: string;
  originalPrice: number;
  discountedPrice: number;
  rating: number;
  weights: { label: string, value: number }[];
  membershipType?: string;
}

// Estilos del componente Card
const Card = styled.div`
  width: 16rem;
  padding: 1rem;
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  text-align: center;
  margin-bottom: 1.5rem; /* Espacio debajo de cada tarjeta */
`;

// Estilo para el nombre del producto
const ProductName = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

// Contenedor para la calificación
const RatingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 0.5rem;
`;

// Contenedor para los precios
const PriceContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
`;

// Estilo para el precio con descuento
const DiscountedPrice = styled.span`
  color: #ef4444;
  font-weight: bold;
`;

// Estilo para el precio original
const OriginalPrice = styled.span`
  color: #6b7280;
  text-decoration: line-through;
`;

// Estilo para la insignia de membresía
const MembershipBadge = styled.div`
  background-color: #fef3c7;
  color: #92400e;
  font-size: 0.75rem;
  font-weight: 500;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  margin-bottom: 0.5rem;
`;

// Estilo para la información del peso
const WeightInfo = styled.div`
  color: #4b5563;
  font-size: 0.875rem;
  margin-bottom: 1rem;
`;

// Estilo para el selector de peso
const WeightSelector = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

// Estilo para cada botón de peso
const WeightButton = styled.button<{ selected: boolean }>`
  background-color: ${({ selected }) => (selected ? '#6d28d9' : '#9333ea')};
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${({ selected }) => (selected ? '#4c1d95' : '#7e22ce')};
  }
`;

// Estilo para el botón de agregar al carrito
const AddToCartButton = styled.button`
  width: 100%;
  background-color: #9333ea;
  color: white;
  padding: 0.5rem 0;
  border-radius: 0.5rem;
  transition: background-color 0.3s;
  cursor: pointer;

  &:hover {
    background-color: #7e22ce;
  }
`;

// Estilo para la cuadrícula de productos
const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
  justify-content: center;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

// Estilo para la imagen del producto
const ProductImage = styled(Image)`
  width: 100%;
  height: auto;
  object-fit: contain;
  margin-bottom: 1rem;
`;

// Componente para el icono de estrella
const StarIcon: React.FC<{ filled: boolean }> = ({ filled }) => (
  <svg
    width="1rem"
    height="1rem"
    fill={filled ? '#facc15' : '#d1d5db'}
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

// Componente principal ProductCard
const ProductCard: React.FC<ProductCardProps> = ({
  name,
  imageUrl,
  originalPrice,
  discountedPrice,
  rating,
  weights,
  membershipType
}) => {
  const [selectedWeight, setSelectedWeight] = useState(weights[0].label);
  const [price, setPrice] = useState(discountedPrice + weights[0].value);

  // Actualiza el precio y el peso en función del botón seleccionado
  const handleWeightChange = (weight: { label: string, value: number }) => {
    setSelectedWeight(weight.label);
    setPrice(discountedPrice + weight.value);
  };

  return (
    <Card>
      <ProductImage src={imageUrl} alt={name} width={200} height={200} />
      <ProductName>{name}</ProductName>
      <RatingContainer>
        {[...Array(5)].map((_, i) => (
          <StarIcon key={i} filled={i < rating} />
        ))}
      </RatingContainer>
      <PriceContainer>
        <DiscountedPrice>${price.toLocaleString()}</DiscountedPrice>
        <OriginalPrice>${originalPrice.toLocaleString()}</OriginalPrice>
      </PriceContainer>
      {membershipType && (
        <MembershipBadge>{membershipType}</MembershipBadge>
      )}
      <WeightInfo>Selected Weight: {selectedWeight}</WeightInfo>
      <WeightSelector>
        {weights.map((weight) => (
          <WeightButton
            key={weight.label}
            selected={weight.label === selectedWeight}
            onClick={() => handleWeightChange(weight)}
          >
            {weight.label}
          </WeightButton>
        ))}
      </WeightSelector>
      <AddToCartButton aria-label="Add to cart">Add to cart</AddToCartButton>
    </Card>
  );
};

// Estilo para la paginación
const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
`;

// Estilo para el botón de paginación
const PaginationButton = styled.button<{ active?: boolean }>`
  background-color: ${({ active }) => (active ? '#6d28d9' : '#9333ea')};
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  margin: 0 0.25rem;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${({ active }) => (active ? '#4c1d95' : '#7e22ce')};
  }
`;

// Componente principal de la página
const ProductPage: React.FC = () => {
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
      },{
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
        },{
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
            },{
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
                },{
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
                    },{
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
                        },{
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
                            }
  ];

  const itemsPerPage = 12;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(products.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const currentProducts = products.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <>
      <ProductGrid>
        {currentProducts.map((product, index) => (
          <ProductCard
            key={index}
            name={product.name}
            imageUrl={product.imageUrl}
            originalPrice={product.originalPrice}
            discountedPrice={product.discountedPrice}
            rating={product.rating}
            weights={product.weights}
            membershipType={product.membershipType}
          />
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
    </>
  );
};

export default ProductPage;
