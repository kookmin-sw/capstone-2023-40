import React from 'react';

import styled, { DefaultTheme } from 'styled-components';

import RectangleButton from './Button/RectangleButton';

const Item = styled.div`
  margin-top: 15px;
  padding: 1vh 2vw 1vh 2vw;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  background-color: ${(props) => props.theme.colors.container};
  border-radius: ${(props) => props.theme.borderRadius};
  border: ${(props) => props.theme.border};
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  @media screen and (max-width: 900px) {
    width: 100%;
  }
`;

const ItemImg = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin: 5px;

  @media screen and (max-width: 500px) {
    width: 70px;
    height: 70px;
  }
`;

const ItemLabel = styled.label<{ width: string }>`
  width: ${(props) => props.width};
  text-align: center;
  display: inline-block;
  color: ${(props) => props.theme.colors.default};
  font-size: 20px;
  font-weight: 600;
  padding: 1.2vh 1.5vw 1.2vh 1.5vw;

  @media screen and (max-width: 500px) {
    font-size: 15px;
  }
`;

interface GifticonItemProps {
  name: string;
  price: number;
  imgUrl: string;
  handleClick: () => void;
  disabled: boolean;
  theme: DefaultTheme;
}

export default function GifticonItem({ name, price, imgUrl, theme, handleClick, disabled }: GifticonItemProps) {
  return (
    <Item key={name} theme={theme}>
      <ItemImg src={imgUrl} alt={name} />
      <ItemLabel width="40%" theme={theme}>
        {name}
      </ItemLabel>
      <ItemLabel width="10%" theme={theme}>{`${price} pt`}</ItemLabel>
      <ButtonContainer>
        <RectangleButton
          text="구매하기"
          textColor={theme.colors.text}
          width="150px"
          backgroundColor={theme.colors.button}
          hoverColor={theme.colors.btnhover}
          handleClick={handleClick}
          disabled={disabled}
          theme={theme}
        />
      </ButtonContainer>
    </Item>
  );
}
