import React, { useState, useReducer } from 'react';

import { AxiosError, AxiosResponse } from 'axios';
import { useNavigate } from 'react-router-dom';
import styled, { DefaultTheme } from 'styled-components';

import axios from '../api/axios';
import requests from '../api/request';
import { formReducer } from '../reducers';
import { FormState } from '../types/form';
import { UserRegisterRequest } from '../types/request/Authentication';
import { UserResponse } from '../types/response/User';
import { isEmptyString, validateEmail, validatePassword, validatePhoneNumber } from '../utils/validate';
import InputContainer from './InputContainer';
import AlertModal from './Modal/AlertModal';

const Container = styled.div`
  padding: 7vw;
  margin-left: calc(20vw - 5vmin);
  margin-right: calc(20vw - 5vmin);
  margin-top: calc(2vh - 2vmin);
  min-width: 30vh;
  height: 80vh;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const RegisterTitle = styled.span`
  text-align: left;
  font-size: 3vh;
  font-weight: 1000;
  margin-bottom: 2vh;
  color: ${(props) => props.theme.colors.default};
`;

const AgreementCheckBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 1vh;
`;

const FontText = styled.span`
  text-align: left;
  font-size: 1.3vh;
  font-weight: 600;
  color: ${(props) => props.theme.colors.default};
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

interface RegisterFormProps {
  theme: DefaultTheme;
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

export default function RegisterForm(props: RegisterFormProps) {
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(formReducer, initialFormState);
  const [isAlertModal, setIsAlertModal] = useState<boolean>(false);
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');

  const setInputValue = (name: string, value: string) => {
    switch (name) {
      case 'email':
        dispatch({ type: 'SET_EMAIL', payload: value });
        break;
      case 'password':
        dispatch({ type: 'SET_PASSWORD', payload: value });
        break;
      case 'confirmPassword':
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
  const sendEmailAuthentication = (email: string): void => {
    setTitle('회원가입 오류');
    if (isEmptyString(email)) {
      setText('이메일을 입력해주세요.');
    } else if (!validateEmail(email)) {
      setText('이메일을 다시 확인해주세요.');
    } else {
      dispatch({ type: 'AUTH_EMAIL', payload: true });
      setTitle('회원가입');
      setText('해당 이메일에 인증요청을 보냈습니다.');
    }
    setIsAlertModal(true);
  };

  const checkPassword = (password: string, confirmPassword: string) => {
    setTitle('회원가입 오류');
    if (isEmptyString(password)) {
      setText('비밀번호를 입력해주세요.');
      setIsAlertModal(true);
      return false;
    }

    if (!validatePassword(password)) {
      setText('비밀번호를 다시 확인해주세요.');
      setIsAlertModal(true);
      return false;
    }

    if (isEmptyString(confirmPassword)) {
      setText('비밀번호를 한 번 더 입력해주세요.');
      setIsAlertModal(true);
      return false;
    }

    if (password !== confirmPassword) {
      setText('비밀번호가 일치하지 않습니다.');
      setIsAlertModal(true);
      return false;
    }
    setTitle('회원가입');
    dispatch({ type: 'CONFIRM_PASSWORD', payload: true });
    setText('비밀번호가 일치합니다!');
    setIsAlertModal(true);
    return true;
  };

  const checkUserInput = () => {
    setTitle('회원가입 오류');
    if (!state.isEmailChecked || !state.isPasswordChecked) {
      setText('이메일 또는 비밀번호를 다시 확인해주세요');
      setIsAlertModal(true);
      return false;
    }

    if (!checkPassword(state.password, state.confirmPassword)) {
      setText('비밀번호를 확인해주세요.');
      setIsAlertModal(true);
      return false;
    }

    if (isEmptyString(state.name)) {
      setText('이름을 입력해주세요.');
      setIsAlertModal(true);
      return false;
    }

    if (!validatePhoneNumber(state.phoneNumber)) {
      setText('휴대폰 번호를 입력해주세요');
      setIsAlertModal(true);
      return false;
    }

    return true;
  };

  const sendAuthenticationNumber = () => {
    dispatch({ type: 'AUTH_KEY', payload: true });
    setTitle('회원가입 알림');
    setText('해당 번호에 인증번호를 보냈습니다! (ex. 1234)');
    setIsAlertModal(true);
  };

  const authenticatePhoneNumber = () => {
    setTitle('회원가입 오류');
    if (!state.key) {
      setText('먼저 인증번호를 보내주세요.');
    } else if (Number(state.key) !== testNumber) {
      setText('인증번호가 일치하지 않습니다');
    } else {
      dispatch({ type: 'AUTH_KEY', payload: true });
      setTitle('회원가입 알림');
      setText('인증되었습니다!');
    }
    setIsAlertModal(true);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const handleOnSubmit = async () => {
    if (checkUserInput()) {
      const body: UserRegisterRequest = {
        name: state.name,
        email: state.email,
        password: state.password,
        role: 'USER',
        phoneNumber: state.phoneNumber,
      };

      const response: AxiosResponse<UserResponse> = await axios.post<UserResponse>(requests.register, body);
      if (response.status === 200) {
        alert('회원가입이 완료되었습니다.');
        navigate('../login');
      } else {
        // TODO: would this be necessary?
      }
    }
  };

  const closeAlertModal = () => {
    setIsAlertModal(false);
  };

  return (
    <Container theme={props.theme}>
      <Form onSubmit={handleSubmit}>
        <RegisterTitle theme={props.theme}>회원가입</RegisterTitle>
        <InputContainer
          title="이메일"
          inputOptions={{
            theme: props.theme,
            type: 'email',
            name: 'email',
            value: state.email,
            onChange: handleInputChange,
            placeholder: '이메일을 입력하세요.',
          }}
          buttonOptions={{
            theme: props.theme,
            title: '인증요청',
            type: 'submit',
            onClick: () => sendEmailAuthentication(state.email),
          }}
        />
        <InputContainer
          title="비밀번호"
          inputOptions={{
            theme: props.theme,
            type: 'password',
            name: 'password',
            value: state.password,
            onChange: handleInputChange,
            placeholder: '비밀번호를 입력해주세요.',
          }}
        />
        <InputContainer
          title="비밀번호 확인"
          inputOptions={{
            theme: props.theme,
            type: 'password',
            name: 'confirmPassword',
            value: state.confirmPassword,
            onChange: handleInputChange,
            placeholder: '비밀번호를 한 번 더 입력해주세요.',
          }}
          buttonOptions={{
            title: '비밀번호 확인',
            theme: props.theme,
            type: 'submit',
            onClick: () => checkPassword(state.password, state.confirmPassword),
          }}
        />
        {isAlertModal && (
          <AlertModal
            theme={props.theme}
            title={title}
            level="INFO"
            text={text}
            buttonText="확인"
            onClose={closeAlertModal}
          />
        )}
        <InputContainer
          title="이름"
          inputOptions={{
            theme: props.theme,
            type: 'text',
            name: 'name',
            value: state.name,
            onChange: handleInputChange,
            placeholder: '이름을 입력해주세요.',
          }}
        />
        <InputContainer
          title="휴대폰 번호"
          prefixOptions={{
            theme: props.theme,
            title: '+82',
          }}
          inputOptions={{
            theme: props.theme,
            type: 'tel',
            name: 'phoneNumber',
            value: state.phoneNumber,
            onChange: handleInputChange,
            placeholder: '- 빼고 입력하세요.',
            maxLength: 11,
          }}
          buttonOptions={{
            theme: props.theme,
            title: '인증요청',
            type: 'submit',
            onClick: sendAuthenticationNumber,
          }}
        />
        <InputContainer
          title="인증코드"
          inputOptions={{
            theme: props.theme,
            type: 'tel',
            name: 'key',
            value: state.key,
            onChange: handleInputChange,
            placeholder: '인증코드 4 자리를 입력해주세요.',
            pattern: '[0-9]{4}',
            maxLength: 4,
          }}
          buttonOptions={{
            theme: props.theme,
            title: '인증하기',
            type: 'submit',
            onClick: authenticatePhoneNumber,
          }}
        />
        <AgreementCheckBox>
          <CheckBox
            type="checkbox"
            name="agreeService"
            onChange={() => dispatch({ type: 'AGREE_SERVICE', payload: !state.isServiceAgreementChecked })}
          />
          <FontText theme={props.theme}>[필수] 서비스 이용약관 </FontText>
        </AgreementCheckBox>
        <AgreementCheckBox>
          <CheckBox
            type="checkbox"
            name="agreeInformation"
            onChange={() => dispatch({ type: 'AGREE_INFORMATION', payload: !state.isUserInfoConsentChecked })}
          />
          <FontText theme={props.theme}>[필수] 개인정보 수집동의</FontText>
        </AgreementCheckBox>
        <FontText theme={props.theme}>※ 서비스 이용약관 및 개인정보 수집에 동의해주세요.</FontText>
        <CompleteButton
          onClick={handleOnSubmit}
          type="submit"
          theme={props.theme}
          disabled={!(state.isServiceAgreementChecked && state.isUserInfoConsentChecked)}
        >
          회원가입 완료하기
        </CompleteButton>
      </Form>
    </Container>
  );
}
