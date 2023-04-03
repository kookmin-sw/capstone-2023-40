import React, { useReducer } from 'react';

import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import Header from '../components/Header';
import { useTheme } from '../hooks/useTheme';
import { isEmptyString, validateEmail, validatePassword, validatePhoneNumber } from '../utils/validate';

const Container = styled.div`
  width: 100vw;
  height: 130vh;
  background-color: ${(props) => props.theme.colors.container};
`;

const RegistContainer = styled.div`
  padding: 7vw;
  margin-left: calc(20vw - 5vmin);
  margin-right: calc(20vw - 5vmin);
  margin-top: calc(2vh - 2vmin);
  min-width: 30vh;
  height: 80vh;
`;

const ContainerBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const AgreementCheckBox = styled.div`
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
  min-width: 4vh;
  padding: 1.7vh;
  margin-top: 10px;
  margin-bottom: 10px;
  border: ${(props) => props.theme.border};
  border-radius: ${(props) => props.theme.borderRadius};
  color: ${(props) => props.theme.colors.default};
  background-color: ${(props) => props.theme.colors.container};
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
  color: ${(props) => props.theme.colors.default};
  background-color: ${(props) => props.theme.colors.container};
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

const CheckBox = styled.input`
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
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};

  &:hover {
    background-color: ${(props) => props.theme.colors.prhover};
  }
`;

interface FormState {
  /**
   * Initial state for inputs.
   */
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
  phoneNumber: string;
  key: string;
  /**
   * Markers for inputs if filled and checked.
   */
  isEmailChecked: boolean;
  isPasswordChecked: boolean;
  isKeyChecked: boolean;
  isServiceAgreementChecked: boolean;
  isUserInfoConsentChecked: boolean;
}

const initialFormState: FormState = {
  /**
   * Initial state for inputs.
   */
  email: '',
  password: '',
  confirmPassword: '',
  name: '',
  phoneNumber: '',
  key: '',
  /**
   * Markers for inputs if filled and checked.
   */
  isEmailChecked: false,
  isPasswordChecked: false,
  isKeyChecked: false,
  isServiceAgreementChecked: false,
  isUserInfoConsentChecked: false,
};

type FormAction =
  | { type: 'SET_EMAIL'; payload: string }
  | { type: 'SET_PASSWORD'; payload: string }
  | { type: 'SET_CONFIRM_PASSWORD'; payload: string }
  | { type: 'SET_NAME'; payload: string }
  | { type: 'SET_PHONE_NUMBER'; payload: string }
  | { type: 'SET_AUTH_KEY'; payload: string }
  | { type: 'AUTH_EMAIL'; payload: boolean }
  | { type: 'CONFIRM_PASSWORD'; payload: boolean }
  | { type: 'AUTH_KEY'; payload: boolean }
  | { type: 'AGREE_SERVICE'; payload: boolean }
  | { type: 'AGREE_INFORMATION'; payload: boolean };

const reducer = (state: FormState, action: FormAction): FormState => {
  switch (action.type) {
    case 'SET_EMAIL':
      return { ...state, email: action.payload };
    case 'SET_PASSWORD':
      return { ...state, password: action.payload };
    case 'SET_CONFIRM_PASSWORD':
      return { ...state, confirmPassword: action.payload };
    case 'SET_NAME':
      return { ...state, name: action.payload };
    case 'SET_PHONE_NUMBER':
      return { ...state, phoneNumber: action.payload };
    case 'SET_AUTH_KEY':
      return { ...state, key: action.payload };
    case 'AUTH_EMAIL':
      return { ...state, isEmailChecked: action.payload };
    case 'CONFIRM_PASSWORD':
      return { ...state, isPasswordChecked: action.payload };
    case 'AUTH_KEY':
      return { ...state, isKeyChecked: action.payload };
    case 'AGREE_SERVICE':
      return { ...state, isServiceAgreementChecked: action.payload };
    case 'AGREE_INFORMATION':
      return { ...state, isUserInfoConsentChecked: action.payload };
    default:
      return state;
  }
};

export default function RegisterPage() {
  const [theme, toggleTheme] = useTheme();
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(reducer, initialFormState);

  const setInputValue = (name: string, value: string) => {
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputValue(name, value);
  };

  // FIXME: Test AuthKey production(인증번호) = 1234
  const testNumber = 1234;

  // FIXME: It will have to Add connect User DataBase - Email
  const emailAuth = (email: string): void => {
    if (isEmptyString(email)) {
      alert('이메일을 입력해주세요.');
    } else if (!validateEmail(email)) {
      alert('이메일을 다시 확인해주세요.');
    } else {
      dispatch({ type: 'AUTH_EMAIL', payload: true });
      alert('해당 이메일에 인증요청을 보냈습니다.');
    }
  };

  // Checking Password - isEmpty, Regex, Correction
  const checkPassword = (password: string, confirmPassword: string) => {
    if (isEmptyString(password)) {
      alert('비밀번호를 입력해주세요.');
      return false;
    }

    if (!validatePassword(password)) {
      alert('비밀번호를 다시 확인해주세요.');
      return false;
    }

    if (isEmptyString(confirmPassword)) {
      alert('비밀번호를 한 번 더 입력해주세요.');
      return false;
    }

    if (password !== confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return false;
    }

    dispatch({ type: 'CONFIRM_PASSWORD', payload: true });
    alert('비밀번호가 일치합니다!');
    return true;
  };

  const checkUserInput = () => {
    if (!state.isEmailChecked || !state.isPasswordChecked) {
      alert('이메일 또는 비밀번호를 다시 확인해주세요');
      return false;
    }

    if (!checkPassword(state.password, state.confirmPassword)) {
      alert('## 비번 체크하셈!');
      return false;
    }

    if (isEmptyString(state.name)) {
      alert('이름을 입력해주세요.');
      return false;
    }

    if (!validatePhoneNumber(state.phoneNumber)) {
      alert('휴대폰 번호를 입력해주세요');
      return false;
    }

    return true;
  };

  // Get a phone number and request an authentication number.
  const passingNumber = () => {
    dispatch({ type: 'AUTH_KEY', payload: true });
    alert('해당 번호에 인증번호를 보냈습니다! (ex. 1234)');
  };

  // Check Authentication number matches Requested authentication number
  const correspondNumber = () => {
    if (!state.key) {
      alert('먼저 인증번호를 보내주세요.');
    } else if (Number(state.key) !== testNumber) {
      alert('인증번호가 일치하지 않습니다');
    } else {
      dispatch({ type: 'AUTH_KEY', payload: true });
      alert('인증되었습니다!');
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const handleOnSubmit = () => {
    if (checkUserInput()) {
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
              value={state.confirmPassword}
              onChange={handleInputChange}
              theme={theme}
              placeholder="비밀번호를 한번 더 입력하세요."
            />
            <RequestButton
              onClick={() => checkPassword(state.password, state.confirmPassword)}
              type="submit"
              theme={theme}
            >
              비밀번호 확인
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
            <RequestButton onClick={() => passingNumber()} type="submit" theme={theme}>
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
          <AgreementCheckBox>
            <CheckBox
              type="checkbox"
              name="agree_Service"
              onChange={() => dispatch({ type: 'AGREE_SERVICE', payload: !state.isServiceAgreementChecked })}
            />
            <FontText theme={theme}>[필수] 서비스 이용약관 </FontText>
          </AgreementCheckBox>
          <AgreementCheckBox>
            <CheckBox
              type="checkbox"
              name="agree_information"
              onChange={() => dispatch({ type: 'AGREE_INFORMATION', payload: !state.isUserInfoConsentChecked })}
            />
            <FontText theme={theme}>[필수] 개인정보 수집동의</FontText>
          </AgreementCheckBox>
          <FontText theme={theme}>※ 서비스 이용약관 및 개인정보 수집에 동의해주세요.</FontText>
          <CompleteButton
            onClick={handleOnSubmit}
            type="submit"
            theme={theme}
            disabled={!(state.isServiceAgreementChecked && state.isUserInfoConsentChecked)}
          >
            회원가입 완료하기
          </CompleteButton>
        </Form>
      </RegistContainer>
    </Container>
  );
}
