import React from 'react';

import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import BackgroundImage from '../assets/main-page.webp';
import Header from '../components/Header';
import { useTheme } from '../hooks/useTheme';

// 회원가입 페이지 모르는 점
// 1. 회원가입 제목이 더 굵게 안됨.
// 2. <FontText>의 font-color가 바뀌지 않음.
// 3. Register컨테이너의 최소폭을 설정하고 싶은데 모름.
// 4. <ContainerBox>의 폭을 항상 <RegistContainer>와 맞추고 싶은데 안됨.
// 6. Input type이 number일 경우 박스 오른쪽에 Count버튼 생기는데 다른 유형을 찾지 못함.
// 핸드폰 번호 + 인증코드 제약 걸기
// 이메일 regex

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

const RegistContainer = styled.div`
padding: 9vw;
margin-left: 20vw;
margin-right: 20vw;
min-width : 20vh;
height: 70vh;
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
  padding: 1.7vh;
  margin-top: 10px;
  margin-bottom: 10px;
  border: 3px solid #ebeff7;
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
  color: ${(props) => props.theme.colors.default};
`;

const FontText = styled.span`
  margin-top: 5px;
  text-align: left;
  font-size: 1.3vh;
  font-weight: 600;
  color: ${(props) => props.theme.colors.default};
`;

const PhoneNumberBox = styled.button`
  border: 3px solid #ebeff7;
  padding: 1.7vh;
  font-size: 1.5vh;
  font-weight: 700;
  margin-right: 1vh;
  color: ${(props) => props.theme.colors.text};
  background-color: white;
  border-radius: ${(props) => props.theme.borderRadius};
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
  color: ${(props) => props.theme.colors.opposite};
  background-color: ${(props) => props.theme.colors.primary};
  cursor: pointer;
`;

const CertifyButton = styled.button`
  border: none;
  min-width: 20px;
  width: 10vw;
  height: 100%;
  padding: 1.9vh;
  margin-left: 1vh;
  font-size: 1.3vh;
  font-weight: 700;
  color: ${(props) => props.theme.colors.text};
  background-color: ${(props) => props.theme.colors.button};
  border-radius: ${(props) => props.theme.borderRadius};
`;

export default function MainPage() {
  const [theme, toggleTheme] = useTheme();
  const navigate = useNavigate();

  return (
    <Container>
      <Header theme={theme} toggleTheme={toggleTheme} />
      <RegistContainer theme={theme}>
        <Form>
          <RegisterTitle theme={theme}>회원가입</RegisterTitle>

          <FontText theme={theme}>이메일</FontText>
          <ContainerBox>
            <Input type="email" theme={theme} placeholder="이메일을 입력해주세요." />
            <CertifyButton type="submit" theme={theme}>
              인증요청
            </CertifyButton>
          </ContainerBox>

          <FontText theme={theme}>비밀번호</FontText>
          <Input type="password" theme={theme} placeholder="비밀번호를 입력해주세요." />

          <FontText theme={theme}>비밀번호 확인</FontText>
          <Input type="password" theme={theme} placeholder="비밀번호를 한번더 입력해주세요." />

          <FontText theme={theme}>이름</FontText>
          <Input type="text" theme={theme} placeholder="이름을 입력해주세요." />

          <FontText theme={theme}>휴대폰 번호</FontText>
          <ContainerBox>
            <PhoneNumberBox theme={theme}>+82</PhoneNumberBox>
            <Input type="tel" theme={theme} pattern="[0-9]{11}" placeholder=" - 빼고 입력해주세요." />
            <CertifyButton type="submit" theme={theme}>
              인증요청
            </CertifyButton>
          </ContainerBox>

          <FontText theme={theme}>인증코드</FontText>
          <ContainerBox>
            <Input type="tel" theme={theme} placeholder="인증코드를 입력해주세요." />
            <CertifyButton type="submit" theme={theme}>
              인증하기
            </CertifyButton>
          </ContainerBox>

          <Button onClick={() => navigate('/login')} theme={theme}>
            회원가입 완료하기
          </Button>
        </Form>
      </RegistContainer>
    </Container>
  );
}
