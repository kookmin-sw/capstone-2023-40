import React, { useReducer } from 'react';

import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import Header from '../../components/Header';
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

  return (
    <Container theme={theme}>
      <Header theme={theme} toggleTheme={toggleTheme} />
      <MypageContainer theme={theme}>
        <Form onSubmit={handleSubmit}>
          <MyPageTitle theme={theme}>마이페이지</MyPageTitle>

          <ContainerBox>
            <FontText theme={theme}>이메일</FontText>
            <Input type="email" name="Email" value={state.Email} onChange={handleInputChange} theme={theme} />
            <ChangeButton type="submit" theme={theme} />
          </ContainerBox>

          <ContainerBox>
            <FontText theme={theme}>비밀번호</FontText>
            <Input type="password" name="Password" value={state.Password} onChange={handleInputChange} theme={theme} />
            <ChangeButton type="submit" theme={theme} />
          </ContainerBox>

          <ContainerBox>
            <FontText theme={theme}>인증코드</FontText>
            <Input
              type="tel"
              name="Key"
              value={state.Key}
              theme={theme}
              onChange={handleInputChange}
              pattern="[0-9]{4}"
              maxLength={4}
            />
            <ChangeButton type="submit" theme={theme} />
          </ContainerBox>
        </Form>
      </MypageContainer>
    </Container>
  );
}
