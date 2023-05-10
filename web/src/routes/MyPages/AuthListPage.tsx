import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { Icons } from '../../assets/svg/index';
import Header from '../../components/Header';
import { useTheme } from '../../hooks/useTheme';
import { RootState } from '../../reducers';
import { setAuthService } from '../../types/surveyAuth';

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

export default function AuthListPage() {
  const [theme, toggleTheme] = useTheme();
  const navigate = useNavigate();
  const surveyAuthState = useSelector((state: RootState) => state.surveyAuth);
  const dispatch = useDispatch();

  // FIXME: To API data
  const surveyAuthList = [
    {
      number: 1,
      image: <KakaoImage />,
      title: '카카오',
      checkAuth: surveyAuthState.kakao,
    },
    {
      number: 2,
      image: <NaverImage />,
      title: '네이버',
      checkAuth: surveyAuthState.naver,
    },
    {
      number: 3,
      image: <GoogleImage />,
      title: '구글',
      checkAuth: surveyAuthState.google,
    },
    {
      number: 4,
      image: <IdCardImage />,
      title: '신분증',
      checkAuth: surveyAuthState.identityCard,
    },
    {
      number: 5,

      image: <DriverLicenseImage />,
      title: '운전면허',
      checkAuth: surveyAuthState.driverLicense,
    },
    {
      number: 6,
      image: <WebmailImage />,
      title: '웹메일',
      checkAuth: surveyAuthState.webmail,
    },
  ];

  // 인증서비스 확인 및 변경
  const handleClick = (title: string) => {
    dispatch(setAuthService(title));
    navigate('../mypage/authentication', { state: { title } });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  // FIXME: 인증과정 구현 후에 인증완료 버튼을 disabled 하기.
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
          {surveyAuthList.map(({ number, image, title, checkAuth }) => (
            <ContainerBox key={number} theme={theme} onClick={() => handleClick(title)}>
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
