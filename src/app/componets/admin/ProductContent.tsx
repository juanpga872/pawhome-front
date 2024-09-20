import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Swal from 'sweetalert2'; // Importa SweetAlert2 para alertas

// Definición de tipos para los productos
interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  weightKG: number;
  quantity: number;
  typeOfProduct: boolean; // true = Perro, false = Gato
  imagePath: string;
}

// Styled components
const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
  font-family: 'Arial', sans-serif;
`;

const Th = styled.th`
  background-color: #f4f4f4;
  padding: 16px;
  text-align: left;
  font-size: 18px;
  text-transform: uppercase;
`;

const Td = styled.td`
  padding: 16px;
  border-bottom: 1px solid #ddd;
  font-size: 16px;
`;

const Image = styled.img`
  width: 50px;
  height: auto;
`;

const Status = styled.span<{ typeOfProduct: boolean }>`
  color: ${props => (props.typeOfProduct ? 'green' : 'blue')}; 
  font-weight: bold;
`;

const Row = styled.tr`
  &:hover {
    background-color: #ffe4e1;
  }
`;

const FloatingButton = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #ff4081;
  color: white;
  border: none;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  font-size: 30px;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
`;

const ModalHeader = styled.h2`
  margin: 0;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: #ff4081;
  cursor: pointer;
  font-size: 16px;
  position: absolute;
  top: 20px;
  right: 20px;
`;

const Input = styled.input`
  width: calc(100% - 20px);
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const Label = styled.label`
  font-weight: bold;
  margin-top: 10px;
  display: block;
`;

const Button = styled.button`
  background-color: #ff4081;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #e63971;
  }
`;

const ProductTable: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get<Product[]>('https://powhome.azurewebsites.net/api/v1/Products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCurrentProduct({ ...currentProduct!, [name]: value });
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCurrentProduct({ ...currentProduct!, [name]: value === 'true' });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const handleAddOrEditProduct = async () => {
    if (!currentProduct || !currentProduct.name || currentProduct.price <= 0 || !currentProduct.description || currentProduct.weightKG <= 0 || currentProduct.quantity <= 0) {
      Swal.fire({
        title: 'Error',
        text: 'Por favor, completa todos los campos requeridos.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      return;
    }

    const imagePath = selectedImage ? URL.createObjectURL(selectedImage) : '';
    const productToSave = { ...currentProduct, imagePath };

    try {
      if (currentProduct.id) {
        // Editar producto existente
        await axios.put(`https://powhome.azurewebsites.net/api/v1/Products/${currentProduct.id}`, productToSave);
        setProducts(products.map(product => (product.id === currentProduct.id ? productToSave : product)));
        Swal.fire('Producto actualizado', '', 'success');
      } else {
        // Agregar nuevo producto
        await axios.post('https://powhome.azurewebsites.net/api/v1/Products', productToSave);
        setProducts([...products, { ...productToSave, id: products.length + 1 }]);
        Swal.fire('Producto agregado', '', 'success');
      }
    } catch (error) {
      console.error('Error saving product:', error);
      Swal.fire({
        title: 'Error',
        text: 'No se pudo guardar el producto',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }

    setIsModalOpen(false);
    setCurrentProduct(null);
    setSelectedImage(null);
  };

  const handleDeleteProduct = async (id: number) => {
    try {
      await axios.delete(`https://powhome.azurewebsites.net/api/v1/Products/${id}`);
      setProducts(products.filter(product => product.id !== id));

      Swal.fire('Producto eliminado', '', 'success');
    } catch (error) {
      console.error('Error deleting product:', error);
      Swal.fire({
        title: 'Error',
        text: 'No se pudo eliminar el producto',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };

  const openModal = (product: Product | null) => {
    setCurrentProduct(product ? { ...product } : { id: 0, name: '', price: 0, description: '', weightKG: 0, quantity: 0, typeOfProduct: true, imagePath: '' });
    setSelectedImage(null);
    setIsModalOpen(true);
  };

  return (
    <>
      <Table>
        <thead>
          <tr>
            <Th>ID</Th>
            <Th>Nombre</Th>
            <Th>Precio</Th>
            <Th>Descripción</Th>
            <Th>Peso (KG)</Th>
            <Th>Cantidad</Th>
            <Th>Tipo</Th>
            <Th>Imagen</Th>
            <Th>Acciones</Th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <Row key={product.id}>
              <Td>{product.id}</Td>
              <Td>{product.name}</Td>
              <Td>${product.price}</Td>
              <Td>{product.description}</Td>
              <Td>{product.weightKG} kg</Td>
              <Td>{product.quantity}</Td>
              <Td>
                <Status typeOfProduct={product.typeOfProduct}>
                  {product.typeOfProduct ? 'Perro' : 'Gato'}
                </Status>
              </Td>
              <Td><Image src={product.imagePath} alt={product.name} /></Td>
              <Td>
                <Button onClick={() => handleDeleteProduct(product.id)}>Eliminar</Button>
                <Button onClick={() => openModal(product)}>Editar</Button>
              </Td>
            </Row>
          ))}
        </tbody>
      </Table>

      <FloatingButton onClick={() => openModal(null)}>+</FloatingButton>

      {isModalOpen && (
        <ModalOverlay>
          <ModalContent>
            <ModalHeader>{currentProduct?.id ? 'Editar Producto' : 'Agregar Producto'}</ModalHeader>
            <CloseButton onClick={() => setIsModalOpen(false)}>✖</CloseButton>

            <Label htmlFor="name">Nombre</Label>
            <Input
              type="text"
              name="name"
              id="name"
              value={currentProduct?.name || ''}
              onChange={handleInputChange}
            />

            <Label htmlFor="price">Precio</Label>
            <Input
              type="number"
              name="price"
              id="price"
              value={currentProduct?.price || ''}
              onChange={handleInputChange}
            />

            <Label htmlFor="description">Descripción</Label>
            <Input
              type="text"
              name="description"
              id="description"
              value={currentProduct?.description || ''}
              onChange={handleInputChange}
            />

            <Label htmlFor="weightKG">Peso (KG)</Label>
            <Input
              type="number"
              name="weightKG"
              id="weightKG"
              value={currentProduct?.weightKG || ''}
              onChange={handleInputChange}
            />

            <Label htmlFor="quantity">Cantidad</Label>
            <Input
              type="number"
              name="quantity"
              id="quantity"
              value={currentProduct?.quantity || ''}
              onChange={handleInputChange}
            />

            <Label htmlFor="typeOfProduct">Tipo de Producto</Label>
            <select
              name="typeOfProduct"
              value={currentProduct?.typeOfProduct ? 'true' : 'false'}
              onChange={handleSelectChange}
            >
              <option value="false">Gato</option>
              <option value="true">Perro</option>
            </select>

            <Label htmlFor="image">Imagen</Label>
            <Input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
            />

            <Button onClick={handleAddOrEditProduct}>{currentProduct?.id ? 'Guardar Cambios' : 'Agregar'}</Button>
          </ModalContent>
        </ModalOverlay>
      )}
    </>
  );
}

export default ProductTable;
