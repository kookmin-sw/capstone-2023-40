import React, { useState } from 'react';

import styled, { DefaultTheme } from 'styled-components';

const PaginationContainer = styled.div`
  text-align: center;
`;

const Button = styled.button`
  align-items: center;
  border-radius: 10px;
  border-style: none;
  box-sizing: border-box;
  cursor: pointer;
  display: inline-flex;
  font-family: 'Google Sans', Roboto, Arial, sans-serif;
  font-size: 13px;
  font-weight: 700;
  height: 25px;
  padding: 2px 18px;
  transition: box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1), opacity 15ms linear 30ms,
    transform 270ms cubic-bezier(0, 0, 0.2, 1) 0ms;
  margin: 5px;
  color: ${(props) => props.theme.colors.default};
`;
const PageButton = styled(Button)`
  background-color: ${(props) => props.theme.colors.button};

  &:hover {
    background-color: ${(props) => props.theme.colors.btnhover};
  }
`;

const SelectedPageButton = styled(Button)`
  background-color: ${(props) => props.theme.colors.header};

  &:hover {
    background-color: ${(props) => props.theme.colors.header};
  }
`;

const NavButton = styled(Button)`
  background-color: ${(props) => props.theme.colors.container};

  &:hover {
    background-color: ${(props) => props.theme.colors.header};
  }
`;

interface PaginationProps {
  currentPage: number;
  numOfTotalPage: number;
  numOfPageToShow: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  theme: DefaultTheme;
}

export default function Pagination({ currentPage, numOfTotalPage, numOfPageToShow, setPage, theme }: PaginationProps) {
  const [pageListIndex, setPageListIndex] = useState<number>(Math.floor((currentPage - 1) / numOfPageToShow));
  const pageListLength = Math.floor(numOfTotalPage / numOfPageToShow);
  const pageIndex = [];

  for (let i = 1; i <= numOfTotalPage; i += 1) {
    pageIndex.push(i);
  }

  const leftButtonClicked = () => {
    if (pageListIndex > 0) {
      setPageListIndex(pageListIndex - 1);
    }
  };

  const rightButtonClicked = () => {
    if (pageListIndex < pageListLength) {
      setPageListIndex(pageListIndex + 1);
    }
  };

  return (
    <PaginationContainer>
      <NavButton theme={theme} onClick={() => leftButtonClicked()}>
        &lt;
      </NavButton>
      {pageIndex
        .slice(pageListIndex * numOfPageToShow, pageListIndex * numOfPageToShow + numOfPageToShow)
        .map((index: number) =>
          index === currentPage ? (
            <SelectedPageButton theme={theme} key={index} onClick={() => setPage(index)}>
              {index}
            </SelectedPageButton>
          ) : (
            <PageButton theme={theme} key={index} onClick={() => setPage(index)}>
              {index}
            </PageButton>
          )
        )}
      <NavButton theme={theme} onClick={() => rightButtonClicked()}>
        &gt;
      </NavButton>
    </PaginationContainer>
  );
}
