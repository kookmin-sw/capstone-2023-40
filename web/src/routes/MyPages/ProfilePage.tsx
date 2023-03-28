import React, { useReducer } from 'react';

import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { Icons } from '../../assets/svg/index';
import Header from '../../components/Header';
import { useTheme } from '../../hooks/useTheme';

const PencilImage = styled(Icons.PENCIL).attrs({
  width: 25,
  height: 25,
})`
  border: none;
  width: 25px;
  height: 100%;
  padding: 1.5vh;
  margin-left: 1vh;
  border-radius: 18px;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.colors.inputBackground};
  }
`;

const ArrowImage = styled(Icons.ARROW).attrs({
  width: 30,
  height: 30,
})`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  padding: 1.5vh;
  border-radius: 30px;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.colors.inputBackground};
  }
`;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: ${(props) => props.theme.colors.container};
`;

const MypageContainer = styled.div`
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
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 10vw;
  max-width: 30vw;
  width: 150px;
  padding: 1.3vh;
  margin-top: 10px;
  margin-bottom: 10px;
  border: none;
  border-radius: 10px;
  font-size: 1.6vh;
  font-weight: 700;
  color: ${(props) => props.theme.colors.default};
  background-color: ${(props) => props.theme.colors.inputBackground};
  cursor: text;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const MyPageTitle = styled.span`
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
  margin-right: 3vw;
  min-width: 80px;
  max-width: 20vw;
  width: 140px;
  color: ${(props) => props.theme.colors.default};
`;

const ReplacePagetext = styled.span`
  border: none;
  text-align: left;
  font-size: 2.5vh;
  font-weight: 900;
  width: 170px;
  color: ${(props) => props.theme.colors.default};
`;

const CompleteButton = styled.button`
  margin-left: auto;
  display: flex;
  padding: 1.5vh;
  font-size: 1.8vh;
  font-weight: 700;
  color: white;
  background-color: ${(props) => props.theme.colors.primary};
  border: none;
  border-radius: ${(props) => props.theme.borderRadius};
  cursor: pointer;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  &:hover {
    background-color: ${(props) => props.theme.colors.prhover};
  }
`;

type State = {
  email: string;
  password: string;
  name: string;
  phoneNumber: string;
  address: string;
};

type Action =
  | { type: 'CHANGE_EMAIL'; payload: string }
  | { type: 'CHANGE_PASSWORD'; payload: string }
  | { type: 'CHANGE_NAME'; payload: string }
  | { type: 'CHANGE_PHONE_NUMBER'; payload: string }
  | { type: 'CHANGE_ADDRESS'; payload: string };

const initalState = {
  email: '',
  password: '',
  name: '',
  phoneNumber: '',
  address: '',
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'CHANGE_EMAIL':
      return { ...state, email: action.payload };
    case 'CHANGE_PASSWORD':
      return { ...state, password: action.payload };
    case 'CHANGE_NAME':
      return { ...state, name: action.payload };
    case 'CHANGE_PHONE_NUMBER':
      return { ...state, phoneNumber: action.payload };
    case 'CHANGE_ADDRESS':
      return { ...state, address: action.payload };
    default:
      return state;
  }
};

export default function MyPage() {
  const [theme, toggleTheme] = useTheme();
  const navigate = useNavigate();

  const [state, dispatch] = useReducer(reducer, initalState);

  // Input Data list
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    switch (name) {
      case 'email':
        dispatch({ type: 'CHANGE_EMAIL', payload: value });
        break;
      case 'password':
        dispatch({ type: 'CHANGE_PASSWORD', payload: value });
        break;
      case 'name':
        dispatch({ type: 'CHANGE_NAME', payload: value });
        break;
      case 'phoneNumber':
        dispatch({ type: 'CHANGE_PHONE_NUMBER', payload: value });
        break;
      case 'address':
        dispatch({ type: 'CHANGE_ADDRESS', payload: value });
        break;
      default:
        break;
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <Container theme={theme}>
      <Header theme={theme} toggleTheme={toggleTheme} />
      <MypageContainer theme={theme}>
        <Form onSubmit={handleSubmit}>
          <MyPageTitle theme={theme}>마이페이지</MyPageTitle>
          <ContainerBox>
            <FontText theme={theme}>이메일</FontText>
            <Input type="email" name="email" value={state.email} onChange={handleInputChange} theme={theme} />
            <PencilImage type="submit" theme={theme} />
          </ContainerBox>
          <ContainerBox>
            <FontText theme={theme}>이름</FontText>
            <Input type="text" name="name" value={state.name} onChange={handleInputChange} theme={theme} />
            <PencilImage type="submit" theme={theme} />
          </ContainerBox>
          <ContainerBox>
            <FontText theme={theme}>비밀번호</FontText>
            <Input type="text" name="password" value={state.password} onChange={handleInputChange} theme={theme} />
            <PencilImage type="submit" theme={theme} />
          </ContainerBox>
          <ContainerBox>
            <FontText theme={theme}>휴대폰 번호</FontText>
            <Input
              type="text"
              name="phoneNumber"
              value={state.phoneNumber}
              onChange={handleInputChange}
              maxLength={11}
              theme={theme}
            />
            <PencilImage type="submit" theme={theme} />
          </ContainerBox>
          <ContainerBox>
            <FontText theme={theme}>주소</FontText>
            <Input type="text" name="address" value={state.address} onChange={handleInputChange} theme={theme} />
            <PencilImage type="submit" theme={theme} />
          </ContainerBox>
          <ContainerBox style={{ marginTop: '10vh' }}>
            <ReplacePagetext theme={theme}>인증정보 목록</ReplacePagetext>
            <ArrowImage theme={theme} onClick={() => navigate('../mypage/auth-list')} />
          </ContainerBox>

          <ContainerBox style={{ marginTop: '20px' }}>
            <ReplacePagetext theme={theme}>설문 결과 조회</ReplacePagetext>
            <ArrowImage theme={theme} onClick={() => navigate('../mypage/survey-result/:id')} />
            <CompleteButton onClick={() => navigate('../')}>개인정보 저장하기</CompleteButton>
          </ContainerBox>
        </Form>
      </MypageContainer>
    </Container>
  );
}
