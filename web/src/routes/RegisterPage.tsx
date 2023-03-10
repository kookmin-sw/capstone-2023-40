import React from 'react';

import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import Header from '../components/Header';
import { useTheme } from '../hooks/useTheme';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: ${(props) => props.theme.colors.background};
`;

const RegistContainer = styled.div`
  padding: 7vw;
  margin-left: calc(20vw - 5vmin);
  margin-right: calc(20vw - 5vmin);
  min-width: 30vh;
  height: 80vh;
  background-color: ${(props) => props.theme.colors.container};
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.3);
`;

const ContainerBox = styled.form`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  min-width: 5vh;
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

const RegisterTitle = styled.span`
  text-align: left;
  font-size: 3vh;
  font-weight: 1000;
  margin-bottom: 2vh;
  color: ${(props) => props.theme.colors.default};
`;

const FontText = styled.span`
  margin-top: 5px;
  text-align: left;
  font-size: 1.3vh;
  font-weight: 600;
  color: ${(props) => props.theme.colors.default};
`;

const PhoneNumberBox = styled.div`
  padding: 1.7vh;
  font-size: 1.5vh;
  font-weight: 700;
  margin-right: 1vh;
  background-color: white;
  border: ${(props) => props.theme.border};
  border-color: ${(props) => props.theme.borderRadius};
  border-radius: ${(props) => props.theme.borderRadius};
`;

const CompleteButton = styled.button`
  margin-top: 1vh;
  border: none;
  padding: 2vh;
  padding-left: 8vw;
  padding-right: 8vw;
  border-radius: ${(props) => props.theme.borderRadius};
  font-size: 2vh;
  font-weight: 700;
  color: white;
  background-color: ${(props) => props.theme.colors.primary};
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.colors.prhover};
  }
`;

const RequestButton = styled.button`
  border: none;
  min-width: 70px;
  width: 10vw;
  height: 100%;
  padding: 1.9vh;
  margin-left: 1vh;
  font-size: 1.3vh;
  font-weight: 700;
  color: ${(props) => props.theme.colors.text};
  background-color: ${(props) => props.theme.colors.button};
  border-radius: ${(props) => props.theme.borderRadius};

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
      <RegistContainer theme={theme}>
        <Form>
          <RegisterTitle theme={theme}>????????????</RegisterTitle>

          <FontText theme={theme}>?????????</FontText>
          <ContainerBox>
            <Input type="email" theme={theme} placeholder="???????????? ??????????????????." />
            <RequestButton onClick={() => alert('?????????')} type="submit" theme={theme}>
              ????????????
            </RequestButton>
          </ContainerBox>

          <FontText theme={theme}>????????????</FontText>
          <Input type="password" theme={theme} placeholder="??????????????? ??????????????????." />

          <FontText theme={theme}>???????????? ??????</FontText>
          <Input type="password" theme={theme} placeholder="??????????????? ?????? ??? ??????????????????." />

          <FontText theme={theme}>??????</FontText>
          <Input type="text" theme={theme} placeholder="????????? ??????????????????." />

          <FontText theme={theme}>????????? ??????</FontText>
          <ContainerBox>
            <PhoneNumberBox theme={theme}>+82</PhoneNumberBox>
            <Input type="tel" theme={theme} pattern="[0-9]{11}" maxLength={11} placeholder=" - ?????? ??????????????????." />
            <RequestButton onClick={() => alert('?????????')} type="submit" theme={theme}>
              ????????????
            </RequestButton>
          </ContainerBox>

          <FontText theme={theme}>????????????</FontText>
          <ContainerBox>
            <Input type="tel" theme={theme} maxLength={4} placeholder="??????????????? ??????????????????." />
            <RequestButton onClick={() => alert('?????????')} type="submit" theme={theme}>
              ????????????
            </RequestButton>
          </ContainerBox>

          <CompleteButton onClick={() => navigate('/login')} theme={theme}>
            ???????????? ????????????
          </CompleteButton>
        </Form>
      </RegistContainer>
    </Container>
  );
}
