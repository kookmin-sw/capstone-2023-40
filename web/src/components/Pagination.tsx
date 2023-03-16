import React, { useState } from 'react';

import styled from 'styled-components';

const PaginationContainer = styled.div``;

const PageButton = styled.button``;

const SelectedPageButton = styled.button`
  background-color: red;
`;

interface PaginationProps {
  currentPage: number;
  totalPage: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export default function Pagination({ currentPage, totalPage, setPage }: PaginationProps) {
  const pageIndex = [];
  for (let i = 1; i <= totalPage; i += 1) {
    pageIndex.push(i);
  }

  return (
    <PaginationContainer>
      {pageIndex.map((index) =>
        index === currentPage ? (
          <SelectedPageButton key={index} onClick={() => setPage(index)}>
            {index}
          </SelectedPageButton>
        ) : (
          <PageButton key={index} onClick={() => setPage(index)}>
            {index}
          </PageButton>
        )
      )}
    </PaginationContainer>
  );
}
