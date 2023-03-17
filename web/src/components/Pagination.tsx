import React, { useState } from 'react';

import styled, { DefaultTheme } from 'styled-components';

const PaginationContainer = styled.div`
  text-align: center;
`;

const Button = styled.button`
  align-items: center;
  border-radius: 10px;
  border-style: none;
  box-shadow: rgba(213, 217, 217, 0.5) 0 2px 5px 0;
  box-sizing: border-box;
  cursor: pointer;
  display: inline-flex;
  font-family: 'Google Sans', Roboto, Arial, sans-serif;
  font-size: 13px;
  font-weight: 700;
  height: 25px;
  padding: 2px 24px;
  transition: box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1), opacity 15ms linear 30ms,
    transform 270ms cubic-bezier(0, 0, 0.2, 1) 0ms;
  margin: 5px;
  color: ${(props) => props.theme.colors.default};
  background-color: ${(props) => props.theme.colors.button};

  &:hover {
    background-color: ${(props) => props.theme.colors.btnhover};
  }
`;
const PageButton = styled(Button)``;

const SelectedPageButton = styled(Button)`
  background-color: ${(props) => props.theme.colors.opposite};
`;

const NavButton = styled(Button)``;

interface PaginationProps {
  currentPage: number;
  numOfPage: number;
  numOfPageToShow: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  theme: DefaultTheme;
}

export default function Pagination({ currentPage, numOfPage, numOfPageToShow, setPage, theme }: PaginationProps) {
  const [pageListIndex, setPageListIndex] = useState(0);
  const pageIndex = [];
  const numOfPageList = numOfPage / numOfPageToShow;

  for (let i = 1; i <= numOfPage; i += 1) {
    pageIndex.push(i);
  }

  const leftButtonClicked = () => {
    if (pageListIndex > 0) {
      setPageListIndex(pageListIndex - 1);
    }
  };

  const rightButtonClicked = () => {
    if (pageListIndex < numOfPageList - 1) {
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
