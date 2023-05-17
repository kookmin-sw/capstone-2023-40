import React, { useReducer } from 'react';

import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { Icons } from '../../assets/svg/index';
import Header from '../../components/Header';
import { useTheme } from '../../hooks/useTheme';
import { surveyAuthReducer } from '../../reducers/survey';
import { SurveyAuthState } from '../../types/surveyAuth';

const KakaoImage = styled(Icons.KAKAO).attrs({
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

const DriverLicenseImage = styled(Icons.DRIVER_LICENSE).attrs({
  width: 30,
  height: 30,
})`
  padding: 1.5vh;
  margin-left: 1vh;
  border-radius: 20px;
`;

const WebmailImage = styled(Icons.WEBMAIL).attrs({
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

const AuthListTitle = styled.div`
  flex-direction: row;
  margin-bottom: 4vh;
`;

const MypageText = styled.span`
  text-align: left;
  font-size: calc(2vh + 2vmin);
  font-weight: 900;
  color: ${(props) => props.theme.colors.default};
  cursor: pointer;
`;

const AuthInformationText = styled.span`
  text-align: left;
  font-size: calc(2vh + 2vmin);
  font-weight: 900;
  color: ${(props) => props.theme.colors.default};
`;

const TextType = styled.span`
  border: none;
  text-align: left;
  font-size: calc(1vh + 1.4vmin);
  font-weight: 900;
  min-width: 80px;
  width: fit-content;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const initialState: SurveyAuthState = {
  kakao: false,
  naver: false,
  google: false,
  identityCard: false,
  driverLicense: false,
  webmail: false,
};

export default function MyPage() {
  const [theme, toggleTheme] = useTheme();
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(surveyAuthReducer, initialState);

  // FIXME: To API data
  const surveyAuthState = [
    {
      number: 1,
      image: <KakaoImage />,
      title: '카카오',
      checkAuth: state.kakao,
      pageNavigate: () => navigate('../mypage/authentication'),
    },
    {
      number: 2,
      image: <NaverImage />,
      title: '네이버',
      checkAuth: state.naver,
      pageNavigate: () => navigate('../mypage/auth-list'),
    },
    {
      number: 3,
      image: <GoogleImage />,
      title: '구글',
      checkAuth: state.google,
      pageNavigate: () => navigate('../mypage/auth-list'),
    },
    {
      number: 4,
      image: <IdCardImage />,
      title: '신분증',
      checkAuth: state.identityCard,
      pageNavigate: () => navigate('../mypage/auth-list'),
    },
    {
      number: 5,

      image: <DriverLicenseImage />,
      title: '운전면허',
      checkAuth: state.driverLicense,
      pageNavigate: () => navigate('../mypage/auth-list'),
    },
    {
      number: 6,
      image: <WebmailImage />,
      title: '웹메일',
      checkAuth: state.webmail,
      pageNavigate: () => navigate('../mypage/auth-list'),
    },
  ];

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <Container theme={theme}>
      <Header theme={theme} toggleTheme={toggleTheme} />
      <AuthListContainer theme={theme}>
        <Form onSubmit={handleSubmit}>
          <AuthListTitle theme={theme}>
            <MypageText theme={theme} onClick={() => navigate('../mypage')}>
              마이페이지
            </MypageText>
            <AuthInformationText theme={theme}> &gt; 인증정보 목록</AuthInformationText>
          </AuthListTitle>
          {surveyAuthState.map(({ number, image, title, checkAuth, pageNavigate }) => (
            <ContainerBox key={number} theme={theme} onClick={pageNavigate} disabled={checkAuth}>
              {image}
              <TextType
                theme={theme}
                style={!checkAuth ? { color: theme.colors.default } : { color: theme.colors.btnhover }}
              >
                {title} {!checkAuth ? '본인인증 바로가기 ' : '본인인증 완료'}
              </TextType>
              {!checkAuth ? <ArrowImage /> : <CheckImage />}
            </ContainerBox>
          ))}
        </Form>
      </AuthListContainer>
    </Container>
  );
}
