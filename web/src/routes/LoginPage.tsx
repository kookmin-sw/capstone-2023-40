import React from 'react';

import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import Header from '../components/Header';
import { useTheme } from '../hooks/useTheme';


// 로그인 페이지 모르는 점 
// 1. 가로 짝대기 어떻게 생성하는지
// 2. 로그인 제목이 더 굵게 안됨.
// 3. 이메일과 비밀번호 font-color가 바뀌지 않음.
// 4. 로그인컨테이너의 최소폭을 설정하고 싶은데 모름.

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  border : 
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
`;

const LoginContainer = styled.div`  
  padding : 9vw;
  margin-left : 20vw;
  margin-right : 20vw;
  weight : 50vh;
  height: 50vh;
  background-color : #FFFFFF;
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.3);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  padding: 10px;
  margin-top : 10px;
  margin-bottom: 10px;
  border: none;
  border-radius: 5px;
  font-size : 1.5vh;
  font-weight : 600;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
`;

const LoginTitle = styled.h1`
  text-align : left;
  font-size : 2.3vh;
  font-weight: 1000;
`;

const FontText = styled.span`
  margin-top : 5px;
  text-align : left;
  font-size : 1.3vh;
  font-weight : 600;
  font-color : #EBEFF7;
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
  color: gray;
  background-color: #EBEFF7;
  cursor: pointer;
`;

export default function MainPage() {
  const [theme, toggleTheme] = useTheme();
  const navigate = useNavigate();

  return (
    <Container>
      <Header theme={theme} toggleTheme={toggleTheme} />
      <LoginContainer>
      <Form>
        <LoginTitle> 로그인 </LoginTitle>
        <FontText> 이메일 </FontText>
        <Input
          type="email"
          placeholder="이메일을 입력하세요."
        />
        <FontText> 비밀번호 </FontText>
        <Input
          type="password"
          placeholder="비밀번호를 입력하세요."
        />
        <Button onClick={() => navigate('/survey')} theme={theme}>
          로그인
        </Button>
        <FontText> ---------- or ----------</FontText>
        <Button onClick={() => navigate('/register')} theme={theme}>
          회원가입
        </Button>
      </Form>
      </LoginContainer>
    </Container>
  );
}
