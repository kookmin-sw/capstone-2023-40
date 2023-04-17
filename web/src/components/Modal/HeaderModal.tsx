import React, { useEffect, useRef } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled, { DefaultTheme } from 'styled-components';

import { useOnClickOutside } from '../../hooks/useOnClickOutside';
import { RootState } from '../../reducers';
import { setLogin, setSubPageOpen } from '../../reducers/header';

const SubPageContainer = styled.div`
  display: flex;
  transition: opacity 0.4s ease-in-out;
  position: absolute;
  top: 100%;
  right: 1%;
  flex-direction: column;
  background-color: ${(props) => props.theme.colors.header};
  z-index: 10;
  padding: 10px;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2);
  height: auto;
  overflow-y: auto;
  border: ${(props) => props.theme.borderResultList};
  border-radius: ${(props) => props.theme.borderRadius};
  & > * {
    margin-bottom: 10px;
  }
`;

const SubPageButton = styled.button`
  margin-top: 1vh;
  border: none;
  padding: 1.5vh;
  border-radius: ${(props) => props.theme.borderRadius};
  font-size: 2vh;
  font-weight: 700;
  color: ${(props) => props.theme.colors.text};
  background-color: ${(props) => props.theme.colors.button};
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.colors.btnhover};
  }
`;

interface HeaderProps {
  theme: DefaultTheme;
}

export default function Header({ theme }: HeaderProps) {
  const navigate = useNavigate();
  const isLogin = useSelector((state: RootState) => state.header.isLogin);
  const isSubPageOpen = useSelector((state: RootState) => state.header.isSubPageOpen);
  const dispatch = useDispatch();

  const logoutClick = () => {
    dispatch(setLogin(!isLogin));
    dispatch(setSubPageOpen(!isSubPageOpen));
    navigate('../../../');
  };

  const navigateMypage = () => {
    navigate('../../../mypage');
    dispatch(setSubPageOpen(!isSubPageOpen));
  };

  const subPageRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (subPageRef.current && !subPageRef.current.contains(event.target as Node)) {
        return;
      }
      dispatch(setSubPageOpen(false));
    };
    window.addEventListener('mousedown', listener);
    return () => {
      window.removeEventListener('mousedown', listener);
    };
  }, []);

  return (
    <SubPageContainer theme={theme}>
      <SubPageButton onClick={navigateMypage} theme={theme}>
        마이페이지
      </SubPageButton>
      <SubPageButton onClick={logoutClick} theme={theme}>
        로그아웃
      </SubPageButton>
    </SubPageContainer>
  );
}
