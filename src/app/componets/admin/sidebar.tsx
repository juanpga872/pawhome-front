import React, { useState, lazy, Suspense } from 'react';
import styled from 'styled-components';
import { LayoutGrid, ShoppingCart, BarChart2, Package, Archive, UserCheck } from 'lucide-react'; // Changed to UserCheck for psychology

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

const SocialLinks = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: auto;
  font-size: 12px;
`;

const SocialLink = styled.a`
  color: white;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const ContentArea = styled.div`
  flex-grow: 1;
  background-color: #f3f4f6;
  padding: 24px;
  overflow-y: auto;
`;

// Dynamically imported content components
const DashboardContent = lazy(() => import('./DashboardContent'));
const OrderContent = lazy(() => import('./petsContent'));
const StatisticContent = lazy(() => import('./StatisticContent'));
const ProductContent = lazy(() => import('./ProductContent'));
const StockContent = lazy(() => import('./StockContent'));
const PsychologicalTestContent = lazy(() => import('./test')); // Assuming you have this component

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
  const [activeItem, setActiveItem] = useState('Dashboard');

  const menuItems = [
    { icon: <LayoutGrid />, label: 'Dashboard', component: DashboardContent },
    { icon: <ShoppingCart />, label: 'Order', component: OrderContent },
    { icon: <BarChart2 />, label: 'Statistic', component: StatisticContent },
    { icon: <Package />, label: 'Product', component: ProductContent },
    { icon: <Archive />, label: 'Stock', component: StockContent },
    { icon: <UserCheck />, label: 'Psychological Test', component: PsychologicalTestContent }, // Updated
  ];

  const ActiveComponent = menuItems.find(item => item.label === activeItem)?.component || DashboardContent;

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <SidebarContainer>
        <Title>eProduct</Title>
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
        <Suspense fallback={<div>Loading...</div>}>
          <ActiveComponent />
        </Suspense>
      </ContentArea>
    </div>
  );
};

export default Sidebar;
