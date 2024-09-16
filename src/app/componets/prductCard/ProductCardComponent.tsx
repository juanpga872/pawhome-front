import React, { useState } from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import TypeSelector from '@/app/componets/typeselector/typeselector';
import CartComponent from '@/app/componets/cartIcon/cart.components';

// Estilos
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

const ProductName = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const PriceContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const DiscountedPrice = styled.span`
  color: #ef4444;
  font-weight: bold;
`;

const OriginalPrice = styled.span`
  color: #6b7280;
  text-decoration: line-through;
`;

const WeightSelector = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

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
  }
`;

const AddToCartButton = styled.button`
  background-color: #9333ea;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s, transform 0.2s;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.3), 0 6px 12px rgba(0, 0, 0, 0.15);

  &:hover {
    background-color: #7e22ce;
    transform: scale(1.05);
  }
`;

const ProductGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 2rem 0;
`;

// Productos
const products = {
  dog: [
    {
      name: 'Producto Perro 1',
      imageUrl: '/icons/product.jpg',
      originalPrice: 40.00,
      weights: [
        { label: '500g', value: 0, priceIncrement: 0 },
        { label: '1kg', value: 1, priceIncrement: 5 },
        { label: '2kg', value: 2, priceIncrement: 15 }
      ],
      rating: 4,
      membershipType: 'Miembro Premium'
    },
    {
      name: 'Producto Perro 2',
      imageUrl: '/icons/product.jpg',
      originalPrice: 80.00,
      weights: [
        { label: '500g', value: 0, priceIncrement: 0 },
        { label: '1kg', value: 1, priceIncrement: 10 },
        { label: '2kg', value: 2, priceIncrement: 20 }
      ],
      rating: 5,
      membershipType: 'Miembro Premium'
    },
  ],
  cat: [
    {
      name: 'Producto Gato 1',
      imageUrl: '/icons/comida-gato.jpg',
      originalPrice: 60.00,
      weights: [
        { label: '200g', value: 0, priceIncrement: 0 },
        { label: '500g', value: 1, priceIncrement: 10 },
        { label: '1kg', value: 2, priceIncrement: 20 }
      ],
      rating: 5,
      membershipType: 'Miembro Básico'
    },
    {
      name: 'Producto Gato 2',
      imageUrl: '/icons/comida-gato.jpg',
      originalPrice: 120.00,
      weights: [
        { label: '200g', value: 0, priceIncrement: 0 },
        { label: '500g', value: 1, priceIncrement: 20 },
        { label: '1kg', value: 2, priceIncrement: 40 }
      ],
      rating: 4,
      membershipType: 'Miembro Básico'
    },
  ]
};

interface CartItem {
  id: string; // Change this to `number`
  name: string;
  imageUrl: string;
  price: number;
  weight: string;
  quantity: number;
}

const  ProductPage: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [productType, setProductType] = useState<'dog' | 'cat'>('dog');
  const [selectedWeight, setSelectedWeight] = useState<{ [key: string]: number }>({});

  const handleAddToCart = (product: Omit<CartItem, 'id' | 'quantity'>) => {
    const newItem: CartItem = {
      ...product,
      id: Date.now().toString(), 
      quantity: 1
    };
    setCart(prevCart => [...prevCart, newItem]);
  };
  

  const handleWeightSelect = (productName: string, weight: { label: string; value: number; priceIncrement: number }) => {
    setSelectedWeight(prevState => ({
      ...prevState,
      [productName]: weight.value
    }));
  };

  const handleRemoveFromCart = (index: number) => {
    setCart(prevCart => prevCart.filter((_, i) => i !== index));
  };

  const handleUpdateQuantity = (index: number, delta: number) => {
    setCart(prevCart => {
      const newCart = [...prevCart];
      const newQuantity = newCart[index].quantity + delta;
      if (newQuantity <= 0) {
        newCart.splice(index, 1);
      } else {
        newCart[index].quantity = newQuantity;
      }
      return newCart;
    });
  };

  const currentProducts = products[productType];

  return (
    <>
      <CartComponent
        cartItems={cart}
        onRemoveItem={handleRemoveFromCart}
        onUpdateQuantity={handleUpdateQuantity} // Pass this function
      />
      <TypeSelector onTypeChange={setProductType} />
      <ProductGrid>
        {currentProducts.map((product, index) => {
          const selectedWeightValue = selectedWeight[product.name] || 0;
          const weight = product.weights.find(weight => weight.value === selectedWeightValue);
          const productPrice = product.originalPrice + (weight ? weight.priceIncrement : 0);

          return (
            <Card key={index}>
              <Image src={product.imageUrl} alt={product.name} width={250} height={250} />
              <ProductName>{product.name}</ProductName>
              <PriceContainer>
                <DiscountedPrice>${productPrice.toLocaleString()}</DiscountedPrice>
                <OriginalPrice>${product.originalPrice.toLocaleString()}</OriginalPrice>
              </PriceContainer>
              <WeightSelector>
                {product.weights.map((weight, idx) => (
                  <WeightButton
                    key={idx}
                    selected={selectedWeight[product.name] === weight.value}
                    onClick={() => handleWeightSelect(product.name, weight)}
                  >
                    {weight.label}
                  </WeightButton>
                ))}
              </WeightSelector>
              <AddToCartButton onClick={() => handleAddToCart({ 
                name: product.name, 
                imageUrl: product.imageUrl, 
                price: productPrice, 
                weight: weight?.label || '' 
              })}>
                Add to Cart
              </AddToCartButton>
            </Card>
          );
        })}
      </ProductGrid>
    </>
  );
};


export default ProductPage