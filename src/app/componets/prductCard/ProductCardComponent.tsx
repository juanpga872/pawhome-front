import React, { useState, useEffect } from 'react';
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

// Tipos para la respuesta de la API

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  weightKG: number;
  quantity: number;
}

interface CartItem {
  id: number;
  name: string;
  price: number;
  description: string;
  weight: number;
  quantity: number;
}

const ProductPage: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [productType, setProductType] = useState<'dog' | 'cat'>('dog');
  const [selectedWeight, setSelectedWeight] = useState<{ [key: string]: number }>({});
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Fetch products from the API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://powhome.azurewebsites.net/api/v1/Products', {
          method: 'GET', // Explicitly specify the method
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data: Product[] = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('Error al obtener los productos');
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product: Omit<CartItem, 'id' | 'quantity'>) => {
    const newItem: CartItem = {
      ...product,
      id: Date.now(), // Use a number ID
      quantity: 1
    };
    setCart(prevCart => [...prevCart, newItem]);
  };

  const handleWeightSelect = (productName: string, weight: number) => {
    setSelectedWeight(prevState => ({
      ...prevState,
      [productName]: weight
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

  return (
    <>
      {error && <div>{error}</div>}
      <CartComponent
        cartItems={cart}
        onRemoveItem={handleRemoveFromCart}
        onUpdateQuantity={handleUpdateQuantity}
      />
      <TypeSelector onTypeChange={setProductType} />
      <ProductGrid>
        {products.map((product) => {
          const selectedWeightValue = selectedWeight[product.name] || product.weightKG;
          const productPrice = product.price; // Asumiendo que el precio ya está descontado

          return (
            <Card key={product.id}>
              <ProductName>{product.name}</ProductName>
              <PriceContainer>
                <DiscountedPrice>${productPrice.toLocaleString()}</DiscountedPrice>
                <OriginalPrice>${product.price.toLocaleString()}</OriginalPrice>
              </PriceContainer>
              <WeightSelector>
                <WeightButton
                  selected={selectedWeightValue === product.weightKG}
                  onClick={() => handleWeightSelect(product.name, product.weightKG)}
                >
                  {product.weightKG} KG
                </WeightButton>
              </WeightSelector>
              <AddToCartButton onClick={() => handleAddToCart({ 
                name: product.name, 
                price: product.price, 
                description: product.description, 
                weight: product.weightKG 
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

export default ProductPage;
