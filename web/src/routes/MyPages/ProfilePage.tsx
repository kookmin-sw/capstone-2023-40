import React, { useReducer, SyntheticEvent } from 'react';

import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { Icons } from '../../assets/svg/index';
import Header from '../../components/Header';
import { useTheme } from '../../hooks/useTheme';

const PencilImage = styled(Icons.PENCIL).attrs({
  width: 30,
  height: 30,
})`
  border: none;
  width: 25px;
  height: 100%;
  padding: 1vh;
  margin-left: 1vh;
  border-radius: 14px;
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
  max-width: 50vw;
  padding: 1.3vh;
  margin-top: 10px;
  margin-bottom: 10px;
  border: none;
  border-radius: 10px;
  font-size: 1.8vh;
  font-weight: 600;
  color: ${(props) => props.theme.colors.default};
  background-color: ${(props) => props.theme.colors.inputBackground};
  cursor: auto;
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
  font-size: 2.4vh;
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

type State = {
  point: string;
  email: string;
  password: string;
  name: string;
  phoneNumber: string;
  address: string;
  emailDisabled: boolean;
  passwordDisabled: boolean;
  nameDisabled: boolean;
  phoneNumberDisabled: boolean;
  addressDisabled: boolean;
};

type Action =
  | { type: 'CHANGE_POINT'; payload: string }
  | { type: 'CHANGE_EMAIL'; payload: string }
  | { type: 'CHANGE_PASSWORD'; payload: string }
  | { type: 'CHANGE_NAME'; payload: string }
  | { type: 'CHANGE_PHONE_NUMBER'; payload: string }
  | { type: 'CHANGE_ADDRESS'; payload: string }
  | { type: 'SET_CHANGE_EMAIL'; payload: boolean }
  | { type: 'SET_CHANGE_PASSWORD'; payload: boolean }
  | { type: 'SET_CHANGE_NAME'; payload: boolean }
  | { type: 'SET_CHANGE_PHONE_NUMBER'; payload: boolean }
  | { type: 'SET_CHANGE_ADDRESS'; payload: boolean };

const initalState = {
  point: '0P',
  email: 'test@gmail.com',
  password: 'asdf1234!',
  name: 'jsontest',
  phoneNumber: '010-1234-5678',
  address: '서울특별시 성북구 정릉동 국민대학교 기숙사',
  emailDisabled: false,
  passwordDisabled: false,
  nameDisabled: false,
  phoneNumberDisabled: false,
  addressDisabled: false,
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'CHANGE_POINT':
      return { ...state, point: action.payload };
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
    case 'SET_CHANGE_EMAIL':
      return { ...state, emailDisabled: action.payload };
    case 'SET_CHANGE_PASSWORD':
      return { ...state, passwordDisabled: action.payload };
    case 'SET_CHANGE_NAME':
      return { ...state, nameDisabled: action.payload };
    case 'SET_CHANGE_PHONE_NUMBER':
      return { ...state, phoneNumberDisabled: action.payload };
    case 'SET_CHANGE_ADDRESS':
      return { ...state, addressDisabled: action.payload };
    default:
      return state;
  }
};

const formatPhoneNumber = (value: string): string => {
  const phone = value.replace(/[^0-9]/g, '');
  if (phone.length >= 10) {
    return phone.replace(/(\d{3})(\d{3,4})(\d{4})/, '$1-$2-$3');
  }
  return phone;
};

export default function MyPage() {
  const [theme, toggleTheme] = useTheme();
  const navigate = useNavigate();

  const [state, dispatch] = useReducer(reducer, initalState);

  // Input Data list
  const handleInputChange = (e: SyntheticEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    if (e.type === 'change' || e.type === 'Enter' || e.type === 'blur') {
      switch (name) {
        case 'password':
          dispatch({ type: 'CHANGE_PASSWORD', payload: value });
          break;
        case 'phoneNumber':
          dispatch({ type: 'CHANGE_PHONE_NUMBER', payload: formatPhoneNumber(value) });
          break;
        case 'address':
          dispatch({ type: 'CHANGE_ADDRESS', payload: value });
          break;
        default:
          break;
      }
    }
  };

  const pencilClick = (text: string) => {
    if (text === 'password') {
      dispatch({ type: 'SET_CHANGE_PASSWORD', payload: !state.passwordDisabled });
    } else if (text === 'phoneNumber') {
      dispatch({ type: 'SET_CHANGE_PHONE_NUMBER', payload: !state.phoneNumberDisabled });
    } else if (text === 'address') {
      dispatch({ type: 'SET_CHANGE_ADDRESS', payload: !state.addressDisabled });
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  // containerBox list
  const myProfileInformation = [
    {
      number: 1,
      title: '포인트',
      name: 'point',
      type: 'point',
      information: state.point,
      isdisabled: false,
    },
    {
      number: 2,
      title: '이메일',
      name: 'email',
      type: 'email',
      information: state.email,
      isdisabled: state.emailDisabled,
    },
    { number: 3, title: '이름', name: 'name', type: 'text', information: state.name, disabled: state.nameDisabled },
    {
      number: 4,
      title: '비밀번호',
      name: 'password',
      type: state.passwordDisabled ? 'text' : 'password',
      information: state.password,
      isdisabled: state.passwordDisabled,
    },

    {
      number: 5,
      title: '전화번호',
      name: 'phoneNumber',
      type: 'text',
      information: state.phoneNumber,
      isdisabled: state.phoneNumberDisabled,
    },
    {
      number: 6,
      title: '주소',
      name: 'address',
      type: 'text',
      information: state.address,
      isdisabled: state.addressDisabled,
    },
  ];

  return (
    <Container theme={theme}>
      <Header theme={theme} toggleTheme={toggleTheme} />
      <MypageContainer theme={theme}>
        <Form onSubmit={handleSubmit}>
          <MyPageTitle theme={theme}>마이페이지</MyPageTitle>
          {myProfileInformation.map(({ number, title, name, type, information, isdisabled }) => (
            <ContainerBox key={number} theme={theme}>
              <FontText theme={theme}>{title}</FontText>
              <Input
                type={type}
                name={name}
                value={information}
                onChange={handleInputChange}
                onKeyDown={handleInputChange}
                onBlur={handleInputChange}
                theme={theme}
                disabled={!isdisabled}
                style={{ width: `${(information.length + 1) * 10}px` }}
              />
              {!(title === '포인트' || title === '이메일' || title === '이름') ? (
                <PencilImage
                  type="submit"
                  theme={theme}
                  title={!isdisabled ? '수정하기' : '수정완료'}
                  onClick={() => pencilClick(name)}
                />
              ) : undefined}
            </ContainerBox>
          ))}
          <ContainerBox style={{ marginTop: '10vh' }}>
            <ReplacePagetext theme={theme}>인증정보 목록</ReplacePagetext>
            <ArrowImage theme={theme} onClick={() => navigate('../mypage/auth-list')} />
          </ContainerBox>

          <ContainerBox style={{ marginTop: '20px' }}>
            <ReplacePagetext theme={theme}>설문 결과 조회</ReplacePagetext>
            <ArrowImage theme={theme} onClick={() => navigate('../mypage/survey-result/:id')} />
          </ContainerBox>
        </Form>
      </MypageContainer>
    </Container>
  );
}
