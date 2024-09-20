import React, { useState } from 'react';
import styled from 'styled-components';
import { LayoutGrid, ShoppingCart, BarChart2, Package, Archive, Tag } from 'lucide-react';

const SidebarContainer = styled.div`
  width: 256px;
  background-color: #2563eb;
  color: white;
  padding: 24px;
  display: flex;
  flex-direction: column;
  border-top-right-radius: 40px;
  border-bottom-right-radius: 40px;
  box-shadow: 4px 0 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 40px;
`;

const Navigation = styled.nav`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const MenuItem = styled.div<{ isActive: boolean }>`
  display: flex;
  align-items: center;
  padding: 12px;
  cursor: pointer;
  transition: background-color 0.2s;
  border-top-left-radius: 9999px;
  border-bottom-left-radius: 9999px;

  ${({ isActive }) =>
    isActive
      ? `
    background-color: white;
    color: #2563eb;
    font-weight: 600;
  `
      : `
    &:hover {
      background-color: #3b82f6;
    }
  `}
`;

const MenuItemLabel = styled.span`
  margin-left: 12px;
  font-size: 14px;
`;



const ContentArea = styled.div`
  flex-grow: 1;
  background-color: #f3f4f6;
  padding: 24px;
`;

interface MenuItemProps {
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const MenuItemComponent: React.FC<MenuItemProps> = ({ icon, label, isActive, onClick }) => (
  <MenuItem isActive={isActive} onClick={onClick}>
    {React.cloneElement(icon as React.ReactElement, { size: 24 })}
    <MenuItemLabel>{label}</MenuItemLabel>
  </MenuItem>
);

const Sidebar: React.FC = () => {
  const [activeItem, setActiveItem] = useState('Order');

  const menuItems = [
    { icon: <LayoutGrid />, label: 'Dashboard' },
    { icon: <ShoppingCart />, label: 'Order' },
    { icon: <BarChart2 />, label: 'Statistic' },
    { icon: <Package />, label: 'Product' },
    { icon: <Archive />, label: 'Stock' },
    { icon: <Tag />, label: 'Offer' },
  ];

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <SidebarContainer>
        <Title>PAW HOME</Title>
        <Navigation>
          {menuItems.map((item) => (
            <MenuItemComponent
              key={item.label}
              icon={item.icon}
              label={item.label}
              isActive={activeItem === item.label}
              onClick={() => setActiveItem(item.label)}
            />
          ))}
        </Navigation>
      </SidebarContainer>
      <ContentArea>
        <h2>{activeItem}</h2>
        <p>This is the content area for {activeItem}. It changes dynamically based on the selected menu item.</p>
      </ContentArea>
    </div>
  );
};

export default Sidebar;