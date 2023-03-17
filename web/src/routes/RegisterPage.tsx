import React, { useReducer } from 'react';

import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import Header from '../components/Header';
import {
  isEmptyString,
  checkEmail,
  checkPassword,
  checkPhoneNumber,
  modalReuest,
  modalCheck,
  modalIsEmpty,
  modalAll,
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

const RegisterTitle = styled.span`
  text-align: left;
  font-size: 3vh;
  font-weight: 1000;
  margin-bottom: 2vh;
  color: ${(props) => props.theme.colors.default};
`;

const FontText = styled.span`
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
  email: string;
  password: string;
  passwordConfirm: string;
  name: string;
  phoneNumber: string;
  key: string;
  emailAuth: boolean;
  passwordOverlap: boolean;
  keyRequest: boolean;
  keyAuth: boolean;
  agreeService: boolean;
  agreeInformation: boolean;
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
  email: '',
  password: '',
  passwordConfirm: '',
  name: '',
  phoneNumber: '',
  key: '',
  emailAuth: false,
  passwordOverlap: false,
  keyRequest: false,
  keyAuth: false,
  agreeService: false,
  agreeInformation: false,
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_EMAIL':
      return { ...state, email: action.payload };
    case 'SET_PASSWORD':
      return { ...state, password: action.payload };
    case 'SET_CONFIRM_PASSWORD':
      return { ...state, passwordConfirm: action.payload };
    case 'SET_NAME':
      return { ...state, name: action.payload };
    case 'SET_PHONE_NUMBER':
      return { ...state, phoneNumber: action.payload };
    case 'SET_AUTH_KEY':
      return { ...state, key: action.payload };
    case 'AUTH_EMAIL':
      return {
        ...state,
        emailAuth: action.payload,
      };
    case 'OVERLAP_PASSWORD':
      return {
        ...state,
        passwordOverlap: action.payload,
      };
    case 'REQUEST_KEY':
      return {
        ...state,
        keyRequest: action.payload,
      };
    case 'AUTH_KEY':
      return {
        ...state,
        keyAuth: action.payload,
      };
    case 'AGREE_SERVICE':
      return {
        ...state,
        agreeService: action.payload,
      };
    case 'AGREE_INFORMATION':
      return {
        ...state,
        agreeInformation: action.payload,
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
      case 'email':
        dispatch({ type: 'SET_EMAIL', payload: value });
        break;
      case 'password':
        dispatch({ type: 'SET_PASSWORD', payload: value });
        break;
      case 'passwordConfirm':
        dispatch({ type: 'SET_CONFIRM_PASSWORD', payload: value });
        break;
      case 'name':
        dispatch({ type: 'SET_NAME', payload: value });
        break;
      case 'phoneNumber':
        dispatch({ type: 'SET_PHONE_NUMBER', payload: value });
        break;
      case 'key':
        dispatch({ type: 'SET_AUTH_KEY', payload: value });
        break;
      default:
        break;
    }
  };

  // Test AuthKey production(인증번호) = 1234
  const testNumber = 1234;

  // It will have to Add connect User DataBase - Email
  const emailAuth = (email: string) => {
    if (isEmptyString(email)) {
      modalIsEmpty('이메일');
    } else if (!checkEmail(email)) {
      modalCheck('이메일');
    } else {
      dispatch({ type: 'AUTH_EMAIL', payload: true });
      modalAll('해당 이메일에 인증요청을 보냈습니다(test).');
    }
  };

  // Checking Password - isEmpty, Regex, Correction
  const passwordChecked = (password: string, checkpassword: string) => {
    if (isEmptyString(password)) {
      modalIsEmpty('비밀번호');
    } else if (!checkPassword(password)) {
      modalCheck('비밀번호');
    } else if (isEmptyString(checkpassword)) {
      modalIsEmpty('중복 확인할 비밀번호');
    } else if (password !== checkpassword) {
      modalAll('비밀번호가 서로 다릅니다.');
    } else {
      dispatch({ type: 'OVERLAP_PASSWORD', payload: true });
      modalAll('비밀번호가 일치합니다!');
    }
  };

  // Get a phone number and request an authentication number.
  const passingNumber = (phoneNum: string) => {
    if (isEmptyString(phoneNum)) {
      modalIsEmpty('전화번호');
    } else if (!state.emailAuth || !state.passwordOverlap) {
      modalIsEmpty('이메일 또는 비밀번호');
    } else if (isEmptyString(state.name)) {
      modalIsEmpty('이름');
    } else if (!checkPhoneNumber(phoneNum)) {
      modalCheck('전화번호');
    } else {
      dispatch({ type: 'REQUEST_KEY', payload: true });
      modalAll('해당 번호에 인증번호를 보냈습니다! (1234)');
    }
  };

  // Check Authentication number matches Requested authentication number
  const correspondNumber = () => {
    // Request AuthKey & Compared inputNumber
    if (!state.keyRequest) {
      modalAll('인증번호를 먼저 보내세요');
    } else if (Number(state.key) !== testNumber) {
      modalCheck('인증번호');
    } else {
      dispatch({ type: 'AUTH_KEY', payload: true });
      modalAll('인증되었습니다!');
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  // Last Checking Web flow for Complete UserRegist.
  const handleClick = () => {
    if (!state.emailAuth) {
      modalReuest('이메일 인증요청');
    } else if (!state.passwordOverlap) {
      modalReuest('중복 비밀번호 확인');
    } else if (isEmptyString(state.name)) {
      modalIsEmpty('이름');
    } else if (!state.keyAuth) {
      modalReuest('인증번호로 인증');
    } else if (isEmptyString(state.phoneNumber)) {
      modalIsEmpty('휴대폰번호');
    } else {
      modalAll('회원가입이 완료되었습니다.');
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
              name="email"
              value={state.email}
              onChange={handleInputChange}
              theme={theme}
              placeholder="이메일을 입력하세요."
            />
            <RequestButton onClick={() => emailAuth(state.email)} type="submit" theme={theme}>
              인증요청
            </RequestButton>
          </ContainerBox>

          <FontText theme={theme}>비밀번호</FontText>
          <Input
            type="password"
            name="password"
            value={state.password}
            onChange={handleInputChange}
            theme={theme}
            placeholder="비밀번호를 입력하세요."
          />

          <FontText theme={theme}>비밀번호 확인</FontText>
          <ContainerBox>
            <Input
              type="password"
              name="passwordConfirm"
              value={state.passwordConfirm}
              onChange={handleInputChange}
              theme={theme}
              placeholder="비밀번호를 한번 더 입력하세요."
            />
            <RequestButton
              onClick={() => passwordChecked(state.password, state.passwordConfirm)}
              type="submit"
              theme={theme}
            >
              중복확인
            </RequestButton>
          </ContainerBox>

          <FontText theme={theme}>이름</FontText>
          <Input
            type="text"
            name="name"
            value={state.name}
            onChange={handleInputChange}
            theme={theme}
            placeholder="이름을 입력하세요."
          />

          <FontText theme={theme}>휴대폰 번호</FontText>
          <ContainerBox>
            <PhoneNumberBox theme={theme}>+82</PhoneNumberBox>
            <Input
              type="tel"
              name="phoneNumber"
              value={state.phoneNumber}
              theme={theme}
              onChange={handleInputChange}
              maxLength={11}
              placeholder="- 빼고 입력하세요."
            />
            <RequestButton onClick={() => passingNumber(state.phoneNumber)} type="submit" theme={theme}>
              인증요청
            </RequestButton>
          </ContainerBox>

          <FontText theme={theme}>인증코드</FontText>
          <ContainerBox>
            <Input
              type="tel"
              name="key"
              value={state.key}
              theme={theme}
              onChange={handleInputChange}
              pattern="[0-9]{4}"
              maxLength={4}
              placeholder="인증코드 4 자리를 입력하세요."
            />
            <RequestButton onClick={correspondNumber} type="submit" theme={theme}>
              인증하기
            </RequestButton>
          </ContainerBox>

          <AgreeBox>
            <UserAgree
              type="checkbox"
              name="agree_Service"
              onChange={() => dispatch({ type: 'AGREE_SERVICE', payload: !state.agreeService })}
            />
            <FontText theme={theme}>[필수] 서비스 이용약관 </FontText>
          </AgreeBox>
          <AgreeBox>
            <UserAgree
              type="checkbox"
              name="agree_Information"
              onChange={() => dispatch({ type: 'AGREE_INFORMATION', payload: !state.agreeInformation })}
            />
            <FontText theme={theme}>[필수] 개인정보 수집동의</FontText>
          </AgreeBox>
          <FontText theme={theme}>※ 서비스 이용약관 및 개인정보 수집에 동의해주세요.</FontText>

          <CompleteButton
            onClick={handleClick}
            type="submit"
            theme={theme}
            disabled={!(state.agreeService && state.agreeInformation)}
          >
            회원가입 완료하기
          </CompleteButton>
        </Form>
      </RegistContainer>
    </Container>
  );
}
