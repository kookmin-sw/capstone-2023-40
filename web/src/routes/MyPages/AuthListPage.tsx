import React, { useReducer } from 'react';

import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { Icons } from '../../assets/svg/index';
import Header from '../../components/Header';
import { useTheme } from '../../hooks/useTheme';

const KakaoTalk = styled(Icons.KAKAO).attrs({
  width: 30,
  height: 30,
})`
  padding: 1.5vh;
  margin-left: 1vh;
  border-radius: 30px;
`;

const NaverImage = styled(Icons.NAVER).attrs({
  width: 30,
  height: 30,
})`
  padding: 1.5vh;
  margin-left: 1vh;
  border-radius: 30px;
`;

const GoogleImage = styled(Icons.GOOGLE).attrs({
  width: 30,
  height: 30,
})`
  padding: 1.5vh;
  margin-left: 1vh;
  border-radius: 30px;
`;

const IdCardImage = styled(Icons.ID).attrs({
  width: 30,
  height: 30,
})`
  padding: 1.5vh;
  margin-left: 1vh;
  border-radius: 20px;
`;

const DriverCardImage = styled(Icons.DRIVER_LICENSE).attrs({
  width: 30,
  height: 30,
})`
  padding: 1.5vh;
  margin-left: 1vh;
  border-radius: 20px;
`;

const SchoolImage = styled(Icons.WEBMAIL).attrs({
  width: 30,
  height: 30,
})`
  padding: 1.5vh;
  margin-left: 1vh;
  border-radius: 30px;
`;

const ArrowImage = styled(Icons.ARROW).attrs({
  width: 30,
  height: 30,
})`
  padding: 1.5vh;
  margin-left: 1vh;
  border-radius: 30px;
`;

const CheckImage = styled(Icons.CHECK).attrs({
  width: 30,
  height: 30,
})`
  padding: 1.5vh;
  margin-left: 1vh;
  border-radius: 30px;
`;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: ${(props) => props.theme.colors.container};
`;

const AuthListContainer = styled.div`
  padding: 5vw;
  margin-left: calc(10vh - 5vmin);
  margin-right: calc(10vh - 5vmin);
  margin-top: calc(3vw - 2vmin);
  min-width: 40vh;
  height: 80vh;
  background-color: ${(props) => props.theme.colors.container};
`;

const ContainerBox = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: left;
  width: fit-content;
  margin-bottom: 1vh;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  background-color: ${(props) => props.theme.colors.container};

  &:hover {
    background-color: ${(props) => (!props.disabled ? props.theme.colors.background : props.theme.colors.container)};
    cursor: ${(props) => (!props.disabled ? 'pointer' : 'auto')};
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const AuthListTitle = styled.span`
  text-align: left;
  font-size: calc(2vh + 2vmin);
  font-weight: 900;
  margin-bottom: 2vh;
  color: ${(props) => props.theme.colors.default};
`;

const BeforeText = styled.span`
  text-align: left;
  font-size: calc(1vh + 1.4vmin);
  font-weight: 900;
  min-width: 80px;
  max-width: 40vw;
  width: fit-content;
  color: ${(props) => props.theme.colors.default};
`;

const AfterText = styled.span`
  text-align: left;
  font-size: calc(1vh + 1.4vmin);
  font-weight: 900;
  min-width: 80px;
  max-width: 40vw;
  width: fit-content;
  color: ${(props) => props.theme.colors.btnhover};
`;

type State = {
  kakao: boolean;
  naver: boolean;
  google: boolean;
  identityCard: boolean;
  driverCard: boolean;
  schoolMail: boolean;
};

type Action =
  | { type: 'AUTH_KAKAO'; payload: boolean }
  | { type: 'AUTH_NAVER'; payload: boolean }
  | { type: 'AUTH_GOOGLE'; payload: boolean }
  | { type: 'AUTH_IDENTITY'; payload: boolean }
  | { type: 'AUTH_DRIVER'; payload: boolean }
  | { type: 'AUTH_SCHOOLMAIL'; payload: boolean };

// test
const initialState = {
  kakao: true,
  naver: false,
  google: true,
  identityCard: false,
  driverCard: false,
  schoolMail: false,
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'AUTH_KAKAO':
      return { ...state, kakao: action.payload };
    case 'AUTH_NAVER':
      return { ...state, naver: action.payload };
    case 'AUTH_GOOGLE':
      return { ...state, google: action.payload };
    case 'AUTH_IDENTITY':
      return { ...state, identityCard: action.payload };
    case 'AUTH_DRIVER':
      return { ...state, driverCard: action.payload };
    case 'AUTH_SCHOOLMAIL':
      return { ...state, schoolMail: action.payload };
    default:
      return state;
  }
};

export default function MyPage() {
  const [theme, toggleTheme] = useTheme();
  const navigate = useNavigate();

  const [state, dispatch] = useReducer(reducer, initialState);

  // Input Data list

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <Container theme={theme}>
      <Header theme={theme} toggleTheme={toggleTheme} />
      <AuthListContainer theme={theme}>
        <Form onSubmit={handleSubmit}>
          <AuthListTitle theme={theme}>마이페이지 &gt; 인증정보 목록 </AuthListTitle>
          <ContainerBox theme={theme} onClick={() => navigate('../mypage/auth-list')} disabled={state.kakao}>
            <KakaoTalk type="submit" />
            {!state.kakao ? (
              <BeforeText theme={theme}>카카오 본인인증 바로가기</BeforeText>
            ) : (
              <AfterText theme={theme}>카카오 본인인증 완료</AfterText>
            )}
            {!state.kakao ? <ArrowImage /> : <CheckImage />}
          </ContainerBox>

          <ContainerBox theme={theme} onClick={() => navigate('../mypage/auth-list')} disabled={state.naver}>
            <NaverImage type="submit" theme={theme} />
            {!state.naver ? (
              <BeforeText theme={theme}>네이버 본인인증 바로가기</BeforeText>
            ) : (
              <AfterText theme={theme}>네이버 본인인증 완료</AfterText>
            )}
            {!state.naver ? <ArrowImage /> : <CheckImage />}
          </ContainerBox>

          <ContainerBox theme={theme} onClick={() => navigate('../mypage/auth-list')} disabled={state.google}>
            <GoogleImage type="submit" theme={theme} />
            {!state.google ? (
              <BeforeText theme={theme}>구글 본인인증 바로가기</BeforeText>
            ) : (
              <AfterText theme={theme}>구글 본인인증 완료</AfterText>
            )}
            {!state.google ? <ArrowImage /> : <CheckImage />}
          </ContainerBox>

          <ContainerBox theme={theme} onClick={() => navigate('../mypage/auth-list')} disabled={state.identityCard}>
            <IdCardImage type="submit" theme={theme} />
            {!state.identityCard ? (
              <BeforeText theme={theme}>신분증 본인인증 바로가기</BeforeText>
            ) : (
              <AfterText theme={theme}>신분증 본인인증 완료</AfterText>
            )}
            {!state.identityCard ? <ArrowImage /> : <CheckImage />}
          </ContainerBox>

          <ContainerBox theme={theme} onClick={() => navigate('../mypage/auth-list')} disabled={state.driverCard}>
            <DriverCardImage type="submit" theme={theme} />
            {!state.driverCard ? (
              <BeforeText theme={theme}>운전면허 본인인증 바로가기</BeforeText>
            ) : (
              <AfterText theme={theme}>운전면허 본인인증 완료</AfterText>
            )}
            {!state.driverCard ? <ArrowImage /> : <CheckImage />}
          </ContainerBox>

          <ContainerBox theme={theme} onClick={() => navigate('../mypage/auth-list')} disabled={state.schoolMail}>
            <SchoolImage type="submit" theme={theme} />
            {!state.schoolMail ? (
              <BeforeText theme={theme}>학교 웹메일 본인인증 바로가기</BeforeText>
            ) : (
              <AfterText theme={theme}>학교 웹메일 본인인증 완료</AfterText>
            )}
            {!state.schoolMail ? <ArrowImage /> : <CheckImage />}
          </ContainerBox>
        </Form>
      </AuthListContainer>
    </Container>
  );
}
