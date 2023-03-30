import React, { useReducer } from 'react';

import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { Icons } from '../../assets/svg/index';
import Header from '../../components/Header';
import { useTheme } from '../../hooks/useTheme';

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

const AuthListTitle = styled.div`
  flex-direction: row;
  margin-bottom: 2vh;
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
  max-width: 40vw;
  width: fit-content;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
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

const initialState = {
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

  const [state, dispatch] = useReducer(reducer, initialState);

  // containerBox list
  const authState = [
    {
      number: 1,
      image: <KakaoImage />,
      title: '카카오',
      checkAuth: state.kakao,
      pageNavigate: () => navigate('../mypage/auth-list'),
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
      image: <DriverCardImage />,
      title: '운전면허',
      checkAuth: state.driverCard,
      pageNavigate: () => navigate('../mypage/auth-list'),
    },
    {
      number: 6,
      image: <SchoolImage />,
      title: '웹메일',
      checkAuth: state.schoolMail,
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
          <AuthListTitle theme={theme} style={{ marginBottom: '4vh' }}>
            <MypageText theme={theme} onClick={() => navigate('../mypage')}>
              마이페이지
            </MypageText>
            <AuthInformationText theme={theme}> &gt; 인증정보 목록</AuthInformationText>
          </AuthListTitle>
          {authState.map(({ number, image, title, checkAuth, pageNavigate }) => (
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
