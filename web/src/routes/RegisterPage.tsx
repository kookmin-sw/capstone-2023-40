import React, { useReducer } from 'react';

import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import Header from '../components/Header';
import {
  isEmailEmpty,
  isNameEmpty,
  isPasswordEmpty,
  isPhoneNumberEmpty,
  ShowModal_Btn,
  ShowModal_Check,
  ShowModal_isEmpty,
  CheckEmail,
} from '../components/RegistCheck';
import { useTheme } from '../hooks/useTheme';

const Container = styled.div`
  width: 100vw;
  height: 130vh;
  background-color: ${(props) => props.theme.colors.background};
`;

const RegistContainer = styled.div`
  padding: 7vw;
  margin-left: calc(20vw - 5vmin);
  margin-right: calc(20vw - 5vmin);
  margin-top: calc(7vw - 2vmin);
  min-width: 30vh;
  height: 80vh;
  border-radius: 20px;
  background-color: ${(props) => props.theme.colors.container};
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.3);
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
  margin-bottom: 2vh;
  color: ${(props) => props.theme.colors.default};
`;

const FontText = styled.span`
  margin-top: 5px;
  text-align: left;
  font-size: 1.3vh;
  font-weight: 600;
  color: ${(props) => props.theme.colors.default};
`;

const PhoneNumberBox = styled.div`
  padding: 1.7vh;
  font-size: 1.5vh;
  font-weight: 700;
  margin-right: 1vh;
  background-color: white;
  border: ${(props) => props.theme.border};
  border-color: ${(props) => props.theme.borderRadius};
  border-radius: ${(props) => props.theme.borderRadius};
`;

const RequestButton = styled.button`
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

const CompleteButton = styled.button`
  margin-top: 1vh;
  padding: 2vh;
  padding-left: 8vw;
  padding-right: 8vw;
  font-size: 2vh;
  font-weight: 700;
  color: white;
  background-color: ${(props) => props.theme.colors.primary};
  border: none;
  border-radius: ${(props) => props.theme.borderRadius};
  cursor: pointer;

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
  | { type: 'AUTH_KEY'; payload: boolean };

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
    default:
      return state;
  }
};

export default function RegisterPage() {
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

  // Test AuthKey production(인증번호) = 1234
  const testNumber = 1234;

  // It will have to Add connect User DataBase - Email
  const Email_Auth = (email: string) => {
    if (isEmailEmpty(email)) {
      ShowModal_isEmpty('이메일');
    } else if (!CheckEmail(email)) {
      ShowModal_Check('이메일');
    } else {
      dispatch({ type: 'AUTH_EMAIL', payload: true });
      alert('해당 이메일에 인증요청을 보냈습니다(test).');
    }
  };

  // Checking Password - isEmpty, Regex, Correction
  const Password_Checked = (password: string, checkpassword: string) => {
    const PasswordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
    if (isPasswordEmpty(password)) {
      ShowModal_isEmpty('비밀번호');
    } else if (!PasswordRegex.test(password)) {
      ShowModal_Check('비밀번호');
    } else if (checkpassword === '') {
      ShowModal_isEmpty('중복 확인할 비밀번호');
    } else if (password !== checkpassword) {
      alert('비밀번호가 서로 다릅니다.');
    } else {
      dispatch({ type: 'OVERLAP_PASSWORD', payload: true });
      alert('비밀번호가 일치합니다!');
    }
  };

  // Get a phone number and request an authentication number.
  const PassingNumber = (phoneNum: string) => {
    if (isPhoneNumberEmpty(phoneNum)) {
      ShowModal_isEmpty('전화번호');
    } else if (!state.Email_Auth || !state.Password_Overlap) {
      ShowModal_isEmpty('이메일 또는 비밀번호');
    } else if (isNameEmpty(state.Name)) {
      ShowModal_isEmpty('이름');
    } else {
      dispatch({ type: 'REQUEST_KEY', payload: true });
      alert('해당 번호에 인증번호를 보냈습니다! (1234)');
    }
  };

  // Check Authentication number matches Requested authentication number
  const CorrespondNumber = () => {
    // Request AuthKey & Compared inputNumber
    if (!state.Key_Request) {
      alert('인증번호를 먼저 보내세요');
    } else if (Number(state.Key) !== testNumber) {
      ShowModal_Check('인증번호');
    } else {
      dispatch({ type: 'AUTH_KEY', payload: true });
      alert('인증되었습니다!');
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  // Clicked Complete UserRegist Button. so We need to do the last check required for registration.
  const handleClick = () => {
    console.log('이메일 인증 여부: ', state.Email_Auth);
    console.log('중복 비밀번호 확인 여부 : ', state.Password_Overlap);
    console.log('이름 빈칸 확인여부 : ', !isNameEmpty(state.Name));
    console.log('인증번호 요청여부 확인 : ', state.Key_Request);
    console.log('인증번호 인증여부 : ', state.Key_Auth);
    if (!state.Email_Auth) {
      ShowModal_Btn('이메일 인증요청');
    } else if (!state.Password_Overlap) {
      ShowModal_Btn('중복 비밀번호 확인');
    } else if (isNameEmpty(state.Name)) {
      ShowModal_isEmpty('이름');
    } else if (!state.Key_Auth) {
      ShowModal_Btn('인증번호로 인증');
    } else {
      alert('회원가입이 완료되었습니다.');
      navigate('../login');
    }
  };

  return (
    <Container theme={theme}>
      <Header theme={theme} toggleTheme={toggleTheme} />
      <RegistContainer theme={theme}>
        <Form onSubmit={handleSubmit}>
          <RegisterTitle theme={theme}>회원가입</RegisterTitle>

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
            <RequestButton onClick={() => Email_Auth(state.Email)} type="submit" theme={theme}>
              인증요청
            </RequestButton>
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

          <FontText theme={theme}>비밀번호 확인</FontText>
          <ContainerBox>
            <Input
              type="password"
              name="Password2"
              value={state.Password2}
              onChange={handleInputChange}
              theme={theme}
              placeholder="비밀번호를 한번 더 입력하세요."
            />
            <RequestButton
              onClick={() => Password_Checked(state.Password, state.Password2)}
              type="submit"
              theme={theme}
            >
              중복확인
            </RequestButton>
          </ContainerBox>

          <FontText theme={theme}>이름</FontText>
          <Input
            type="text"
            name="Name"
            value={state.Name}
            onChange={handleInputChange}
            theme={theme}
            placeholder="이름을 입력하세요."
          />

          <FontText theme={theme}>휴대폰 번호</FontText>
          <ContainerBox>
            <PhoneNumberBox theme={theme}>+82</PhoneNumberBox>
            <Input
              type="tel"
              name="PhNumber"
              value={state.PhNumber}
              theme={theme}
              onChange={handleInputChange}
              pattern="[0-9]{11}"
              maxLength={11}
              placeholder="- 빼고 입력하세요."
            />
            <RequestButton onClick={() => PassingNumber(state.PhNumber)} type="submit" theme={theme}>
              인증요청
            </RequestButton>
          </ContainerBox>

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
            <RequestButton onClick={CorrespondNumber} type="submit" theme={theme}>
              인증하기
            </RequestButton>
          </ContainerBox>

          <CompleteButton onClick={handleClick} type="submit" theme={theme}>
            회원가입 완료하기
          </CompleteButton>
        </Form>
      </RegistContainer>
    </Container>
  );
}
