import React, { useState } from 'react';

import styled, { DefaultTheme } from 'styled-components';

import { NumberUtils } from '../utils/NumberUtils';

const Container = styled.nav`
  text-align: center;
`;

const ButtonList = styled.ul`
  text-align: center;
  padding: 1px;
`;

const Button = styled.li`
  display: inline-flex;
  font-size: 13px;
  font-weight: 700;
  align-items: center;
  border-radius: 10px;
  border-style: none;
  box-sizing: border-box;
  height: 25px;
  padding: 2px 18px;
  margin: 5px;
  color: ${(props) => props.theme.colors.default};
  cursor: pointer;
  transition: 200ms background ease;
`;

const PageButton = styled(Button)`
  background-color: transparent;

  &:hover {
    background-color: ${(props) => props.theme.colors.prhover};
  }
`;

const SelectedPageButton = styled(Button)`
  background-color: ${(props) => props.theme.colors.primary};
`;

const ArrowButton = styled(Button)`
  background-color: transparent;

  &:hover {
    background-color: ${(props) => props.theme.colors.prhover};
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
    <Container>
      <ButtonList>
        <ArrowButton theme={theme} onClick={() => leftButtonClicked()}>
          &lt;
        </ArrowButton>
        {NumberUtils.range(1, numOfTotalPage + 1)
          .slice(pageListIndex * numOfPageToShow, pageListIndex * numOfPageToShow + numOfPageToShow)
          .map((index: number) =>
            index === currentPage ? (
              <SelectedPageButton theme={theme} key={index}>
                {index}
              </SelectedPageButton>
            ) : (
              <PageButton theme={theme} key={index} onClick={() => setPage(index)}>
                {index}
              </PageButton>
            )
          )}
        <ArrowButton theme={theme} onClick={() => rightButtonClicked()}>
          &gt;
        </ArrowButton>
      </ButtonList>
    </Container>
  );
}
