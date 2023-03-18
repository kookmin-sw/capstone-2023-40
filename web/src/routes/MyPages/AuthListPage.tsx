import React, { useReducer } from 'react';

import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { ReactComponent as Arrow } from '../../assets/svg/arrow.svg';
import { ReactComponent as Kakao } from '../../assets/svg/KakaoTalk_logo.svg';
import Header from '../../components/Header';
import { useTheme } from '../../hooks/useTheme';

const KakaoTalk = styled(Kakao).attrs({
  width: 30,
  height: 30,
})`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  width: 30px;
  height: 100%;
  padding: 1.5vh;
  margin-left: 1vh;
  border-radius: 30px;
  cursor: pointer;
`;

const ArrowImage = styled(Arrow).attrs({
  width: 30,
  height: 30,
})`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  width: 30px;
  height: 100%;
  padding: 1.5vh;
  margin-left: 1vh;
  border-radius: 30px;
  cursor: pointer;
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

const ContainerBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: left;
  width: fit-content;
  margin-bottom: 1vh;
  border-radius: 30px;
  &:hover {
    background-color: ${(props) => props.theme.colors.background};
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

const FontText = styled.span`
  text-align: left;
  font-size: calc(1vh + 1.4vmin);
  font-weight: 900;
  min-width: 80px;
  max-width: 40vw;
  width: fit-content;
  color: ${(props) => props.theme.colors.default};
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

const initalState = {
  kakao: false,
  naver: false,
  google: false,
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

  const [state, dispatch] = useReducer(reducer, initalState);

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
          <ContainerBox onClick={() => navigate('../mypage/auth-list')}>
            <KakaoTalk type="submit" theme={theme} />
            <FontText theme={theme}>카카오 본인인증 바로가기</FontText>
            <ArrowImage theme={theme} />
          </ContainerBox>

          <ContainerBox onClick={() => navigate('../mypage/auth-list')}>
            <KakaoTalk type="submit" theme={theme} />
            <FontText theme={theme}>네이버 본인인증 바로가기</FontText>
            <ArrowImage theme={theme} />
          </ContainerBox>

          <ContainerBox onClick={() => navigate('../mypage/auth-list')}>
            <KakaoTalk type="submit" theme={theme} />
            <FontText theme={theme}>구글 본인인증 바로가기</FontText>
            <ArrowImage theme={theme} />
          </ContainerBox>

          <ContainerBox onClick={() => navigate('../mypage/auth-list')}>
            <KakaoTalk type="submit" theme={theme} />
            <FontText theme={theme}>신분증 본인인증 바로가기</FontText>
            <ArrowImage theme={theme} />
          </ContainerBox>

          <ContainerBox onClick={() => navigate('../mypage/auth-list')}>
            <KakaoTalk type="submit" theme={theme} />
            <FontText theme={theme}>운전면허 본인인증 바로가기</FontText>
            <ArrowImage theme={theme} />
          </ContainerBox>

          <ContainerBox onClick={() => navigate('../mypage/auth-list')}>
            <KakaoTalk type="submit" theme={theme} />
            <FontText theme={theme}>학교 웹메일 본인인증 바로가기</FontText>
            <ArrowImage theme={theme} />
          </ContainerBox>
        </Form>
      </AuthListContainer>
    </Container>
  );
}
