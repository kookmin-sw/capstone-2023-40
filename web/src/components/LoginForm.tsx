import React, { useState } from 'react';

import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled, { DefaultTheme } from 'styled-components';

import axios from '../api/axios';
import { requests } from '../api/request';
import { setLoggedIn } from '../types/header';
import { UserResponse } from '../types/response/User';
import { setUserInformation } from '../utils/UserUtils';
import { isEmptyString } from '../utils/validate';
import { AlertModal } from './Modal';

const LoginContainer = styled.div`
  padding: 9vw;
  margin-left: 20vw;
  margin-right: 20vw;
  margin-top: 2vw;
  height: 50vh;
  border-radius: ${(props) => props.theme.borderRadius};
  background-color: ${(props) => props.theme.colors.container};
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.3);

  @media screen and (max-width: 800px) {
    margin-left: 10vw;
    margin-right: 10vw;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  padding: 1.7vh;
  margin-top: 10px;
  margin-bottom: 10px;
  border: ${(props) => props.theme.border};
  border-radius: ${(props) => props.theme.borderRadius};
  color: ${(props) => props.theme.colors.text};
  background-color: ${(props) => props.theme.colors.container};
  font-size: 1.5vh;
  font-weight: 600;
  flex: 1;

  &:focus {
    outline: none;
  }
  ::placeholder,
  ::-webkit-input-placeholder {
    opacity: 0.4;
  }
  :-ms-input-placeholder {
    opacity: 0.4;
  }
`;

const LoginTitle = styled.span`
  text-align: left;
  font-size: 5vh;
  font-weight: 900;
  color: ${(props) => props.theme.colors.default};
`;

const FontText = styled.span`
  margin-top: 5px;
  text-align: left;
  font-size: 1.3vh;
  font-weight: 600;
  color: ${(props) => props.theme.colors.default};
`;

const Button = styled.button`
  margin-top: 1vh;
  border: none;
  padding: 2vh;
  padding-left: 8vw;
  padding-right: 8vw;
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

interface LoginFormProps {
  theme: DefaultTheme;
}

export default function LoginForm({ theme }: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAlertModal, setIsAlertModal] = useState<boolean>(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertText, setAlertText] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const checkLoginInput = (): boolean => {
    if (isEmptyString(email) || isEmptyString(password)) {
      setAlertTitle('로그인 오류');
      setAlertText('아이디 또는 비밀번호를 확인해주세요.');
      setIsAlertModal(true);
      return false;
    }
    return true;
  };

  const handleLogin = async () => {
    if (!checkLoginInput()) {
      // FIXME: to logger
      throw new Error('Login failed');
    }

    const loginRequestBody = { email, password };
    const res = await axios.post<UserResponse>(requests.login, loginRequestBody);
    if (res.status === 200) {
      setUserInformation(res.data, password, dispatch);
      dispatch(setLoggedIn(true));
      navigate('../../');
    }
  };

  const closeAlertModal = () => {
    setIsAlertModal(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <LoginContainer theme={theme}>
      <Form onSubmit={handleSubmit}>
        <LoginTitle theme={theme}>로그인</LoginTitle>
        <FontText theme={theme}>이메일</FontText>
        <Input
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          theme={theme}
          placeholder="이메일을 입력하세요."
        />
        <FontText theme={theme}>비밀번호</FontText>
        <Input
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          theme={theme}
          placeholder="비밀번호를 입력하세요."
        />
        <Button onClick={() => handleLogin()} theme={theme}>
          로그인
        </Button>
        {isAlertModal && (
          <AlertModal
            theme={theme}
            title={alertTitle}
            level="INFO"
            text={alertText}
            buttonText="확인"
            onClose={closeAlertModal}
          />
        )}
        <FontText theme={theme} style={{ display: 'flex', flexDirection: 'row' }}>
          <hr style={{ border: `${theme.colors.default}` }} />
          <FontText theme={theme}>or</FontText>
          <hr style={{ border: `${theme.colors.default}` }} />
        </FontText>
        <Button onClick={() => navigate('/register')} theme={theme}>
          회원가입
        </Button>
      </Form>
    </LoginContainer>
  );
}
