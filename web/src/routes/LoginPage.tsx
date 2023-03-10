import React from 'react';

import { Navigate, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import BackgroundImage from '../assets/main-page.webp';
import Header from '../components/Header';
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
  min-width: 20vh;
  height: 50vh;
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

export default function MainPage() {
  const [theme, toggleTheme] = useTheme();
  const navigate = useNavigate();

  return (
    <Container>
      <Header theme={theme} toggleTheme={toggleTheme} />
      <LoginContainer theme={theme}>
        <Form>
          <LoginTitle theme={theme}>?????????</LoginTitle>
          <FontText theme={theme}>?????????</FontText>
          <Input type="email" theme={theme} placeholder="???????????? ???????????????." />
          <FontText theme={theme}>????????????</FontText>
          <Input type="password" theme={theme} placeholder="??????????????? ???????????????." />
          <Button onClick={() => navigate('/survey')} theme={theme}>
            ?????????
          </Button>
          <FontText style={{ display: 'flex', flexDirection: 'row' }}>
            <hr style={{ border: `${theme.colors.default}` }} />
            <FontText theme={theme}>or</FontText>
            <hr style={{ border: `${theme.colors.default}` }} />
          </FontText>
          <Button onClick={() => navigate('/register')} theme={theme}>
            ????????????
          </Button>
        </Form>
      </LoginContainer>
    </Container>
  );
}
