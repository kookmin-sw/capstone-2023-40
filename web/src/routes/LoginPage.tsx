import React, { useState } from 'react';

import { Navigate, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import BackgroundImage from '../assets/main-page.webp';
import Header from '../components/Header';
import { isEmailEmpty, isPasswordEmpty } from '../components/RegistCheck';
import { useTheme } from '../hooks/useTheme';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url(${BackgroundImage}) no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
`;

const LoginContainer = styled.div`
  padding: 9vw;
  margin-left: 20vw;
  margin-right: 20vw;
  margin-top: calc(5vw - 1vmin);
  min-width: 20vh;
  height: 50vh;
  border-radius: 20px;
  background-color: ${(props) => props.theme.colors.container};
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.3);
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
  border-radius: 16px;
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

export default function LoginPage() {
  const [theme, toggleTheme] = useTheme();
  const navigate = useNavigate();
  // const [showModal, setShowModal] = useState(false);
  const [inputEmail, setInputEmail] = useState('');
  const [inputPassword, setInputPassword] = useState('');

  const handleClick = () => {
    alert('아이디 또는 비밀번호를 입력해주세요');
    // setShowModal(true);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  // It will have to Add connect User DataBase - Email & Password
  const CheckLogin = (email: string, password: string) => {
    if (isEmailEmpty(email) || isPasswordEmpty(password)) {
      handleClick();
    } else {
      alert('로그인에 성공했습니다.');
      navigate('./survey');
    }
  };

  return (
    <Container>
      <Header theme={theme} toggleTheme={toggleTheme} />
      <LoginContainer theme={theme}>
        <Form onSubmit={handleSubmit}>
          <LoginTitle theme={theme}>로그인</LoginTitle>
          <FontText theme={theme}>이메일</FontText>
          <Input
            type="email"
            value={inputEmail}
            onChange={(e) => setInputEmail(e.target.value)}
            theme={theme}
            placeholder="이메일을 입력하세요."
          />
          <FontText theme={theme}>비밀번호</FontText>

          <Input
            type="password"
            value={inputPassword}
            onChange={(e) => setInputPassword(e.target.value)}
            theme={theme}
            placeholder="비밀번호를 입력하세요."
          />
          <Button onClick={() => CheckLogin(inputEmail, inputPassword)} theme={theme}>
            로그인
          </Button>

          <FontText style={{ display: 'flex', flexDirection: 'row' }}>
            <hr style={{ border: `${theme.colors.default}` }} />
            <FontText theme={theme}>or</FontText>
            <hr style={{ border: `${theme.colors.default}` }} />
          </FontText>
          <Button onClick={() => navigate('/register')} theme={theme}>
            회원가입
          </Button>
        </Form>
      </LoginContainer>
    </Container>
  );
}
