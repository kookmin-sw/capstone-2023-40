import React from 'react';

import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import Header from '../components/Header';
import { useTheme } from '../hooks/useTheme';

const Container = styled.div`
  width: 100vw;
  height: 130vh;
  background-color: ${(props) => props.theme.colors.background};
`;

const RegistContainer = styled.div`
  padding: 7vw;
  margin-left: calc(20vw - 5vmin);
  margin-right: calc(20vw - 5vmin);
  margin-top: calc(7vw - 2vmin);
  min-width: 30vh;
  height: 80vh;
  border-radius: 20px;
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
    <Container theme={theme}>
      <Header theme={theme} toggleTheme={toggleTheme} />
      <RegistContainer theme={theme}>
        <Form>
          <RegisterTitle theme={theme}>회원가입</RegisterTitle>

          <FontText theme={theme}>이메일</FontText>
          <ContainerBox>
            <Input type="email" theme={theme} placeholder="이메일을 입력해주세요." />
            <RequestButton onClick={() => alert('클릭됨')} type="submit" theme={theme}>
              인증요청
            </RequestButton>
          </ContainerBox>

          <FontText theme={theme}>비밀번호</FontText>
          <Input type="password" theme={theme} placeholder="비밀번호를 입력해주세요." />

          <FontText theme={theme}>비밀번호 확인</FontText>
          <Input type="password" theme={theme} placeholder="비밀번호를 한번 더 입력해주세요." />

          <FontText theme={theme}>이름</FontText>
          <Input type="text" theme={theme} placeholder="이름을 입력해주세요." />

          <FontText theme={theme}>휴대폰 번호</FontText>
          <ContainerBox>
            <PhoneNumberBox theme={theme}>+82</PhoneNumberBox>
            <Input type="tel" theme={theme} pattern="[0-9]{11}" maxLength={11} placeholder=" - 빼고 입력해주세요." />
            <RequestButton onClick={() => alert('클릭됨')} type="submit" theme={theme}>
              인증요청
            </RequestButton>
          </ContainerBox>

          <FontText theme={theme}>인증코드</FontText>
          <ContainerBox>
            <Input type="tel" theme={theme} maxLength={4} placeholder="인증코드를 입력해주세요." />
            <RequestButton onClick={() => alert('클릭됨')} type="submit" theme={theme}>
              인증하기
            </RequestButton>
          </ContainerBox>

          <CompleteButton onClick={() => navigate('/login')} theme={theme}>
            회원가입 완료하기
          </CompleteButton>
        </Form>
      </RegistContainer>
    </Container>
  );
}
