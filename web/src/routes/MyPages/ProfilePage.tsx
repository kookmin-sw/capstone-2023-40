import React, { useReducer } from 'react';

import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import Header from '../../components/Header';
import { logConsole } from '../../components/RegistCheck';
import { useTheme } from '../../hooks/useTheme';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: ${(props) => props.theme.colors.container};
`;

const MypageContainer = styled.div`
  padding: 5vw;
  margin-left: calc(10vh - 5vmin);
  margin-right: calc(10vh - 5vmin);
  margin-top: calc(7vw - 2vmin);
  min-width: 40vh;
  height: 80vh;
  background-color: ${(props) => props.theme.colors.container};
`;

const ContainerBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const AgreeBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 1vh;
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

const MyPageTitle = styled.span`
  text-align: left;
  font-size: 3vh;
  font-weight: 900;
  margin-bottom: 2vh;
  color: ${(props) => props.theme.colors.default};
`;

const FontText = styled.span`
  text-align: left;
  font-size: 2vh;
  font-weight: 700;
  color: ${(props) => props.theme.colors.default};
`;

const ChangeButton = styled.button`
  border: none;
  min-width: 70px;
  width: 10vw;
  height: 100%;
  padding: 1.9vh;
  margin-left: 1vh;
  font-size: 1.4vh;
  font-weight: 700;
  color: ${(props) => props.theme.colors.text};
  background-color: ${(props) => props.theme.colors.button};
  border-radius: ${(props) => props.theme.borderRadius};
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.colors.btnhover};
  }
`;

const UserAgree = styled.input`
appearance: none;
border: 1.5px solid gainsboro;
border-radius: 0.35rem;
width: 1.5rem;
height: 1.5rem;
cursor: pointer;

&:checked {
  border-color: transparent;
  background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e");
  background-size: 100% 100%;
  background-position: 50%;
  background-repeat: no-repeat;
  background-color: limegreen;
`;

const CompleteButton = styled.button`
  margin-top: 1vh;
  padding: 2vh;
  padding-left: 8vw;
  padding-right: 8vw;
  font-size: 2vh;
  font-weight: 700;
  color: white;
  background-color: ${(props) => (props.disabled ? props.theme.colors.prhover : props.theme.colors.primary)};
  border: none;
  border-radius: ${(props) => props.theme.borderRadius};
  cursor: ${(props) => (props.disabled ? 'auto' : 'pointer')};

  &:hover {
    background-color: ${(props) => props.theme.colors.prhover};
  }
`;

type State = {
  Email: string;
  Password: string;
  Password2: string;
  Name: string;
  PhNumber: string;
  Key: string;
  Email_Auth: boolean;
  Password_Overlap: boolean;
  Key_Request: boolean;
  Key_Auth: boolean;
  AgreeService: boolean;
  AgreeInfor: boolean;
};

type Action =
  | { type: 'SET_EMAIL'; payload: string }
  | { type: 'SET_PASSWORD'; payload: string }
  | { type: 'SET_CONFIRM_PASSWORD'; payload: string }
  | { type: 'SET_NAME'; payload: string }
  | { type: 'SET_PHONE_NUMBER'; payload: string }
  | { type: 'SET_AUTH_KEY'; payload: string }
  | { type: 'AUTH_EMAIL'; payload: boolean }
  | { type: 'OVERLAP_PASSWORD'; payload: boolean }
  | { type: 'REQUEST_KEY'; payload: boolean }
  | { type: 'AUTH_KEY'; payload: boolean }
  | { type: 'AGREE_SERVICE'; payload: boolean }
  | { type: 'AGREE_INFORMATION'; payload: boolean };

const initalState = {
  Email: '',
  Password: '',
  Password2: '',
  Name: '',
  PhNumber: '',
  Key: '',
  Email_Auth: false,
  Password_Overlap: false,
  Key_Request: false,
  Key_Auth: false,
  AgreeService: false,
  AgreeInfor: false,
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_EMAIL':
      return { ...state, Email: action.payload };
    case 'SET_PASSWORD':
      return { ...state, Password: action.payload };
    case 'SET_CONFIRM_PASSWORD':
      return { ...state, Password2: action.payload };
    case 'SET_NAME':
      return { ...state, Name: action.payload };
    case 'SET_PHONE_NUMBER':
      return { ...state, PhNumber: action.payload };
    case 'SET_AUTH_KEY':
      return { ...state, Key: action.payload };
    case 'AUTH_EMAIL':
      return {
        ...state,
        Email_Auth: action.payload,
      };
    case 'OVERLAP_PASSWORD':
      return {
        ...state,
        Password_Overlap: action.payload,
      };
    case 'REQUEST_KEY':
      return {
        ...state,
        Key_Request: action.payload,
      };
    case 'AUTH_KEY':
      return {
        ...state,
        Key_Auth: action.payload,
      };
    case 'AGREE_SERVICE':
      return {
        ...state,
        AgreeService: action.payload,
      };
    case 'AGREE_INFORMATION':
      return {
        ...state,
        AgreeInfor: action.payload,
      };
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
      case 'Email':
        dispatch({ type: 'SET_EMAIL', payload: value });
        break;
      case 'Password':
        dispatch({ type: 'SET_PASSWORD', payload: value });
        break;
      case 'Password2':
        dispatch({ type: 'SET_CONFIRM_PASSWORD', payload: value });
        break;
      case 'Name':
        dispatch({ type: 'SET_NAME', payload: value });
        break;
      case 'PhNumber':
        dispatch({ type: 'SET_PHONE_NUMBER', payload: value });
        break;
      case 'Key':
        dispatch({ type: 'SET_AUTH_KEY', payload: value });
        break;
      default:
        break;
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  // Clicked Complete UserRegist Button. so We need to do the last check required for registration.
  const handleClick = () => {
    logConsole('이메일 인증 여부: ', state.Email_Auth);
    logConsole('중복 비밀번호 확인 여부 : ', state.Password_Overlap);
    logConsole('인증번호 요청여부 확인 : ', state.Key_Request);
    logConsole('인증번호 인증여부 : ', state.Key_Auth);
    logConsole('서비스 이용약관여부 : ', state.AgreeService);
    logConsole('개인정보 수집동의 여부 : ', state.AgreeInfor);
  };

  return (
    <Container theme={theme}>
      <Header theme={theme} toggleTheme={toggleTheme} />
      <MypageContainer theme={theme}>
        <Form onSubmit={handleSubmit}>
          <MyPageTitle theme={theme}>마이페이지</MyPageTitle>

          <FontText theme={theme}>이메일</FontText>
          <ContainerBox>
            <Input
              type="email"
              name="Email"
              value={state.Email}
              onChange={handleInputChange}
              theme={theme}
              placeholder="이메일을 입력하세요."
            />
            <ChangeButton type="submit" theme={theme}>
              인증요청
            </ChangeButton>
          </ContainerBox>

          <FontText theme={theme}>비밀번호</FontText>
          <Input
            type="password"
            name="Password"
            value={state.Password}
            onChange={handleInputChange}
            theme={theme}
            placeholder="비밀번호를 입력하세요."
          />

          <FontText theme={theme}>인증코드</FontText>
          <ContainerBox>
            <Input
              type="tel"
              name="Key"
              value={state.Key}
              theme={theme}
              onChange={handleInputChange}
              pattern="[0-9]{4}"
              maxLength={4}
              placeholder="인증코드 4 자리를 입력하세요.(1234)"
            />
            <ChangeButton type="submit" theme={theme}>
              인증하기
            </ChangeButton>
          </ContainerBox>

          <AgreeBox>
            <UserAgree
              type="checkbox"
              name="AgreeServ"
              onChange={() => dispatch({ type: 'AGREE_SERVICE', payload: !state.AgreeService })}
            />
            <FontText theme={theme}>[필수] 서비스 이용약관 </FontText>
          </AgreeBox>
          <AgreeBox>
            <UserAgree
              type="checkbox"
              name="AgreeInfor"
              onChange={() => dispatch({ type: 'AGREE_INFORMATION', payload: !state.AgreeInfor })}
            />
            <FontText theme={theme}>[필수] 개인정보 수집동의</FontText>
          </AgreeBox>
        </Form>
      </MypageContainer>
    </Container>
  );
}
