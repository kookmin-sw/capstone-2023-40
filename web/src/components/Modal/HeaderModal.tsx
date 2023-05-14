import React, { useRef } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled, { DefaultTheme } from 'styled-components';

import axios from '../../api/axios';
import { requests } from '../../api/request';
import { useOnClickOutside } from '../../hooks/useOnClickOutside';
import { RootState } from '../../reducers';
import { setLoggedIn, setSubPageOpen } from '../../types/header';
import { UserResponse } from '../../types/response/User';
import { clearUserInformation } from '../../utils/UserUtils';

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
  const isLoggedIn = useSelector((state: RootState) => state.header.isLoggedIn);
  const isSubPageOpen = useSelector((state: RootState) => state.header.isSubPageOpen);
  const dispatch = useDispatch();

  const logoutClick = () => {
    dispatch(setLoggedIn(!isLoggedIn));
    dispatch(setSubPageOpen(!isSubPageOpen));
    clearUserInformation(dispatch);
    navigate('../../../');
  };

  const navigateMypage = async () => {
    navigate('../../../mypage');
    dispatch(setSubPageOpen(!isSubPageOpen));

    const res = await axios.get<UserResponse>(requests.getUserProfile);
    if (res.status === 200) {
      console.log('getUserData Success!');
      console.log(res.data);
    } else if (res.status === 401) {
      console.log('failed to get userdata');
    }
  };

  const subPageRef = useRef<HTMLDivElement>(null);
  useOnClickOutside({
    ref: subPageRef,
    handler: () => {
      dispatch(setSubPageOpen(false));
    },
  });

  return (
    <SubPageContainer theme={theme} ref={subPageRef}>
      <SubPageButton onClick={navigateMypage} theme={theme}>
        마이페이지
      </SubPageButton>
      <SubPageButton onClick={logoutClick} theme={theme}>
        로그아웃
      </SubPageButton>
    </SubPageContainer>
  );
}
