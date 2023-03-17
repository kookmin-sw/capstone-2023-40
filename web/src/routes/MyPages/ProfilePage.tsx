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
  background-color: ${(props) => props.theme.colors.background};
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
  width: 20vw;
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
  email: string;
  password: string;
  name: string;
  phoneNumber: string;
};

type Action =
  | { type: 'CHANGE_EMAIL'; payload: string }
  | { type: 'CHANGE_PASSWORD'; payload: string }
  | { type: 'CHANGE_NAME'; payload: string }
  | { type: 'CHANGE_PHONE_NUMBER'; payload: string };

const initalState = {
  email: '',
  password: '',
  name: '',
  phoneNumber: '',
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
            <ChangeButton type="submit" theme={theme} />
          </ContainerBox>

          <ContainerBox>
            <FontText theme={theme}>비밀번호</FontText>
            <Input type="password" name="password" value={state.password} onChange={handleInputChange} theme={theme} />
            <ChangeButton type="submit" theme={theme} />
          </ContainerBox>

          <ContainerBox>
            <FontText theme={theme}>이름</FontText>
            <Input type="text" name="name" value={state.name} theme={theme} />
            <ChangeButton type="submit" theme={theme} />
          </ContainerBox>
        </Form>
      </MypageContainer>
    </Container>
  );
}
