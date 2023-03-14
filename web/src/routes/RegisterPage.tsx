import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import Header from '../components/Header';
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

const ContainerBox = styled.form`
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

const CompleteButton = styled.button`
  margin-top: 1vh;
  border: none;
  padding: 2vh;
  padding-left: 8vw;
  padding-right: 8vw;
  border-radius: ${(props) => props.theme.borderRadius};
  font-size: 2vh;
  font-weight: 700;
  color: white;
  background-color: ${(props) => props.theme.colors.primary};
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.colors.prhover};
  }
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

  &:hover {
    background-color: ${(props) => props.theme.colors.btnhover};
  }
`;

// If Email input data is Empty
const isEmailEmpty = (email: string) => {
  if (email === '') return true;
  return false;
};

// If Email input data meets the email regular expression
const CheckEmail = (email: string) => {
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  return emailRegex.test(email);
};

// If Password input data is Empty
const isPasswordEmpty = (password: string) => {
  if (password === '') return true;
  return false;
};

// If Name input data is Empty
const isNameEmpty = (name: string) => {
  if (name === '') return true;
  return false;
};

// If PhoneNumber input data is Empty
const isPhoneNumberEmpty = (phoneNumber: number) => {
  if (phoneNumber === null) return true;
  return false;
};

// Showing ModalPage because [inputType] is Empty
const ShowModal_isEmpty = (inputType: string) => {
  // Delete alret & setShowModal
  alert(inputType + '을(를) 입력해주세요'.toString());
};

// Showing ModalPage because [inputType] can not checking
const ShowModal_Check = (inputType: string) => {
  // Delete alret & setShowModal
  alert(inputType + '이(가) 올바르지 않습니다'.toString());
};

// Showing ModalPage because [inputType] is requested
const ShowModal_Btn = (inputType: string) => {
  // Delete alret & setShowModal
  alert(inputType + '을 해주세요'.toString());
};

export default function RegisterPage() {
  const [theme, toggleTheme] = useTheme();
  const navigate = useNavigate();

  // Input Data list
  const [inputEmail, setInputEmail] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [checkPassword, setCheckPassword] = useState('');
  const [inputName, setInputName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [authkey, setAuthKey] = useState('');
  // const [showModal, setShowModal] = useState(false);

  // Test AuthKey production(인증번호) = 1234
  const testNumber = 1234;
  let checked_AuthEmail = false;
  let checked_Overlap_Password = false;
  let checked_AuthNumber = false;

  // It will have to Add connect User DataBase - Email
  const AuthEmail = (email: string) => {
    if (isEmailEmpty(email)) {
      ShowModal_isEmpty('이메일');
    } else if (!CheckEmail(email)) {
      ShowModal_Check('이메일');
    } else {
      checked_AuthEmail = true;
      alert('해당 이메일에 인증요청을 보냈습니다(test).');
    }
  };

  // Checking Password - isEmpty, Regex, Correction
  const CheckPassword = (password: string, checkpassword: string) => {
    const PasswordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
    if (isPasswordEmpty(inputPassword)) {
      ShowModal_isEmpty('비밀번호');
      return false;
    }
    if (!PasswordRegex.test(password)) {
      ShowModal_Check('비밀번호');
      return false;
    }
    if (checkPassword === '') {
      ShowModal_isEmpty('중복 확인할 비밀번호');
      return false;
    }
    if (password !== checkPassword) {
      alert('비밀번호가 서로 다릅니다.');
      return false;
    }
    checked_Overlap_Password = true;
    return true;
  };

  // Get a phone number and request an authentication number.
  const PassingNumber = (phoneNum: number) => {
    if (isPhoneNumberEmpty(Number(phoneNum))) {
      ShowModal_isEmpty('전화번호');
    }
  };

  // Check Authentication number matches Requested authentication number
  const CorrespondNumber = () => {
    // Request AuthKey & Compared inputNumber
    if (Number(authkey) !== testNumber) {
      ShowModal_Check('인증번호');
    }
    checked_AuthNumber = true;
  };

  // Clicked Complete UserRegist Button. so We need to do the last check required for registration.
  const handleClick = () => {
    // 애자일 패턴에대한 고찰 필요!
    if (!checked_AuthEmail) {
      ShowModal_Btn('이메일 인증요청');
    } else if (!checked_Overlap_Password) {
      ShowModal_Btn('중복 비밀번호 확인');
    } else if (isNameEmpty(inputName)) {
      ShowModal_isEmpty('이름');
    } else if (checked_AuthNumber) {
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
        <Form>
          <RegisterTitle theme={theme}>회원가입</RegisterTitle>

          <FontText theme={theme}>이메일</FontText>
          <ContainerBox>
            <Input
              type="email"
              value={inputEmail}
              onChange={(e) => setInputEmail(e.target.value)}
              theme={theme}
              placeholder="이메일을 입력하세요."
            />
            <RequestButton onClick={() => AuthEmail(inputEmail)} type="submit" theme={theme}>
              인증요청
            </RequestButton>
          </ContainerBox>

          <FontText theme={theme}>비밀번호</FontText>
          <Input
            type="password"
            value={inputPassword}
            onChange={(e) => setInputPassword(e.target.value)}
            theme={theme}
            placeholder="비밀번호를 입력하세요."
          />

          <FontText theme={theme}>비밀번호 확인</FontText>
          <ContainerBox>
            <Input
              type="password"
              value={checkPassword}
              onChange={(e) => setCheckPassword(e.target.value)}
              theme={theme}
              placeholder="비밀번호를 한번 더 입력하세요."
            />
            <RequestButton onClick={() => CheckPassword(inputPassword, checkPassword)} type="submit" theme={theme}>
              중복확인
            </RequestButton>
          </ContainerBox>

          <FontText theme={theme}>이름</FontText>
          <Input
            type="text"
            value={inputName}
            onChange={(e) => setInputName(e.target.value)}
            theme={theme}
            placeholder="이름을 입력하세요."
          />

          <FontText theme={theme}>휴대폰 번호</FontText>
          <ContainerBox>
            <PhoneNumberBox theme={theme}>+82</PhoneNumberBox>
            <Input
              type="tel"
              value={phoneNumber}
              theme={theme}
              onChange={(e) => setPhoneNumber(e.target.value)}
              pattern="[0-9]{11}"
              maxLength={11}
              placeholder="-빼고 입력해주세요."
            />
            <RequestButton onClick={() => PassingNumber(Number(phoneNumber))} type="submit" theme={theme}>
              인증요청
            </RequestButton>
          </ContainerBox>

          <FontText theme={theme}>인증코드</FontText>
          <ContainerBox>
            <Input
              type="tel"
              value={authkey}
              theme={theme}
              onChange={(e) => setAuthKey(e.target.value)}
              pattern="[0-9]{6}"
              maxLength={6}
              placeholder="인증코드를 입력해주세요.(1234)"
            />
            <RequestButton onClick={CorrespondNumber} type="submit" theme={theme}>
              인증하기
            </RequestButton>
          </ContainerBox>

          <CompleteButton onClick={handleClick} theme={theme}>
            회원가입 완료하기
          </CompleteButton>
        </Form>
      </RegistContainer>
    </Container>
  );
}
