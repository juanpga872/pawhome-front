import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import TypeSelector from '@/app/componets/typeselector/typeselector';
import CartComponent from '@/app/componets/cartIcon/cart.components';
import Image from 'next/image';

// Styled components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
`;

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

const SearchBar = styled.input`
  padding: 0.75rem;
  margin: 1rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  width: 300px;
  max-width: 100%;

  @media (min-width: 768px) {
    width: 400px;
  }
`;

const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1rem;
`;

const Notification = styled.div<{ isVisible: boolean }>`
  display: ${({ isVisible }) => (isVisible ? 'flex' : 'none')};
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #4caf50;
  color: white;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transition: opacity 0.3s ease;
`;

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  weightKG: number;
  quantity: number;
  typeOfProduct: boolean; 
  imagePath: string; 
}

interface CartItem {
  id: number;
  name: string;
  price: number;
  description: string;
  weight: number;
  quantity: number;
  typeOfProduct: boolean; 
  imagePath: string; 
}

const ProductPage: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [productType, setProductType] = useState<'dog' | 'cat' | 'all'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedWeight, setSelectedWeight] = useState<{ [key: string]: number }>({});
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [notificationVisible, setNotificationVisible] = useState(false);
  const [notificationProduct, setNotificationProduct] = useState<CartItem | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://powhome.azurewebsites.net/api/v1/Products', {
          method: 'GET',
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
      id: Date.now(),
      quantity: 1,
    };
    setCart(prevCart => [...prevCart, newItem]);
    setNotificationProduct(newItem); // Guardar el producto agregado
    setNotificationVisible(true); // Mostrar el mensaje de confirmación
    setTimeout(() => {
      setNotificationVisible(false); // Ocultar el mensaje después de 3 segundos
    }, 3000);
  };

  const handleWeightSelect = (productName: string, weight: number) => {
    setSelectedWeight(prevState => ({
      ...prevState,
      [productName]: weight,
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

  const filteredProducts = products.filter(product => {
    const matchesType = productType === 'all' ||
      (productType === 'dog' && product.typeOfProduct) ||
      (productType === 'cat' && !product.typeOfProduct);
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesSearch;
  });

  return (
    <>
      {error && <div>{error}</div>}
      <CartComponent
        cartItems={cart}
        onRemoveItem={handleRemoveFromCart}
        onUpdateQuantity={handleUpdateQuantity}
      />
      <Container>
        <SearchContainer>
          <TypeSelector onTypeChange={setProductType} />
          <SearchBar 
            type="text" 
            placeholder="Buscar producto..." 
            value={searchTerm} 
            onChange={e => setSearchTerm(e.target.value)} 
          />
        </SearchContainer>
        <ProductGrid>
          {filteredProducts.map(product => {
            const selectedWeightValue = selectedWeight[product.name] || product.weightKG;

            return (
              <Card key={product.id}>
                <Image 
                  src={product.imagePath.startsWith('/') ? product.imagePath : `/${product.imagePath}`} 
                  alt={product.name}
                  width={400} 
                  height={300} 
                  layout="responsive" 
                />
                <ProductName>{product.name}</ProductName>
                <PriceContainer>
                  <DiscountedPrice>${product.price.toLocaleString()}</DiscountedPrice>
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
                  weight: product.weightKG, 
                  imagePath: product.imagePath,
                  typeOfProduct: product.typeOfProduct 
                })}>
                  Añadir al Carrito
                </AddToCartButton>
              </Card>
            );
          })}
        </ProductGrid>
      </Container>
      
      <Notification isVisible={notificationVisible}>
        Producto agregado: {notificationProduct?.name}
      </Notification>
    </>
  );
};

export default ProductPage;
