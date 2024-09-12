// Pagination.tsx
import React from 'react';
import styled from 'styled-components';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const PageButton = styled.button<{ active?: boolean }>`
  background-color: ${props => (props.active ? '#AD57D2FF' : '#ffffff')};
  color: ${props => (props.active ? '#ffffff' : '#000000')};
  border: 1px solid #AD57D2FF;
  padding: 10px;
  margin: 0 5px;
  cursor: pointer;
  border-radius: 5px;
  &:hover {
    background-color: #AD57D2FF;
    color: #ffffff;
  }
`;

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <PaginationContainer>
      {pages.map(page => (
        <PageButton
          key={page}
          active={page === currentPage}
          onClick={() => onPageChange(page)}
        >
          {page}
        </PageButton>
      ))}
    </PaginationContainer>
  );
};

export default Pagination;
