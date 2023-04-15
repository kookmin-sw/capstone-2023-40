import React, { useState, useEffect } from 'react';

import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import BackgroundImage from '../assets/main-page.webp';
import Header from '../components/Header';
import AlertModal from '../components/Modal/AlertModal';
import { useTheme } from '../hooks/useTheme';
import { RootState } from '../reducers';
import { setLogin } from '../reducers/header';
import { isEmptyString } from '../utils/validate';

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
  margin-top: 2vw;
  min-width: 20vh;
  height: 50vh;
  border-radius: ${(props) => props.theme.borderRadius};
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

export default function LoginPage() {
  const [theme, toggleTheme] = useTheme();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAlertModal, setIsAlertModal] = useState<boolean>(false);
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const isLogin = useSelector((state: RootState) => state.header.isLogin);
  const dispatch = useDispatch();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  // TODO: It will have to Add connect User DataBase - Email & Password
  const loginFunction = () => {
    // Check isEmpty Email or Password
    if (isEmptyString(email) || isEmptyString(password)) {
      setTitle('로그인 오류');
      setText('아이디 또는 비밀번호를 확인해주세요.');
    } else {
      // const loginRequestBody = {
      //   email,
      //   password,
      // };
      // axios.post(`https://capstone-mock-api.fly.dev/api/auth/login`, loginRequestBody).then((res) => {
      //   console.log(res.data.message);
      //   // TODO: add to other response [ 존재하지 않는 email, Password가 틀림 ]
      //   if (res.data.code === 200) {
      //     setTitle('로그인 성공');
      //     setText('로그인에 성공했습니다!');
      //     dispatch(setLogin(!isLogin));
      //     navigate('../../');
      //   } else {
      //     setTitle('로그인 오류');
      //     setText('아이디 또는 비밀번호를 확인해주세요.');
      //   }
      // });
      setTitle('로그인 성공');
      setText('로그인에 성공했습니다!');
      dispatch(setLogin(!isLogin));
      navigate('../../');
    }
    setIsAlertModal(true);
  };

  const closeAlertModal = () => {
    setIsAlertModal(false);
  };

  return (
    <Container>
      <Header theme={theme} toggleTheme={toggleTheme} />
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
          <Button onClick={() => loginFunction()} theme={theme}>
            로그인
          </Button>
          {isAlertModal && (
            <AlertModal
              theme={theme}
              title={title}
              level="INFO"
              text={text}
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
    </Container>
  );
}
