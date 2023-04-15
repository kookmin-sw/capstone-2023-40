import React, { useReducer, SyntheticEvent } from 'react';

import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { Icons } from '../../assets/svg/index';
import Header from '../../components/Header';
import { useTheme } from '../../hooks/useTheme';
import { userInfoReducer } from '../../reducers/userInfo';

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

const PurchaseButton = styled.div`
  margin: 2vw;
  display: flex;
  padding: 1.3vh;
  border: none;
  border-radius: 10px;
  font-size: 1.8vh;
  font-weight: 600;
  color: white;
  background-color: ${(props) => props.theme.colors.primary};
  border: none;
  border-radius: ${(props) => props.theme.borderRadius};
  cursor: pointer;
  align-items: center;

  &:hover {
    background-color: ${(props) => props.theme.colors.prhover};
  }
`;

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

  const [state, dispatch] = useReducer(userInfoReducer, initalState);

  // Input Data list
  const handleInputChange = (e: SyntheticEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    if (e.type === 'change' || e.type === 'Enter' || e.type === 'blur') {
      switch (name) {
        case 'point':
          dispatch({ type: 'CHANGE_POINT', payload: value });
          break;
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
      isDisabled: false,
      isPointComponent: true,
    },
    {
      number: 2,
      title: '이메일',
      name: 'email',
      type: 'email',
      information: state.email,
      isDisabled: state.emailDisabled,
      isPointComponent: false,
    },
    {
      number: 3,
      title: '이름',
      name: 'name',
      type: 'text',
      information: state.name,
      disabled: state.nameDisabled,
      isPointComponent: false,
    },
    {
      number: 4,
      title: '비밀번호',
      name: 'password',
      type: state.passwordDisabled ? 'text' : 'password',
      information: state.password,
      isDisabled: state.passwordDisabled,
      isPointComponent: false,
    },
    {
      number: 5,
      title: '전화번호',
      name: 'phoneNumber',
      type: 'text',
      information: state.phoneNumber,
      isDisabled: state.phoneNumberDisabled,
      isPointComponent: false,
    },
    {
      number: 6,
      title: '주소',
      name: 'address',
      type: 'text',
      information: state.address,
      isDisabled: state.addressDisabled,
      isPointComponent: false,
    },
  ];

  return (
    <Container theme={theme}>
      <Header theme={theme} toggleTheme={toggleTheme} />
      <MypageContainer theme={theme}>
        <Form onSubmit={handleSubmit}>
          <MyPageTitle theme={theme}>마이페이지</MyPageTitle>
          {myProfileInformation.map(({ number, title, name, type, information, isDisabled, isPointComponent }) => (
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
                disabled={!isDisabled}
                style={{ width: `${(information.length + 1) * 10}px` }}
              />
              {title === '포인트' ? <PurchaseButton theme={theme}>기프티콘 구매</PurchaseButton> : undefined}
              {!(title === '포인트' || title === '이메일' || title === '이름') ? (
                <PencilImage
                  type="submit"
                  theme={theme}
                  title={!isDisabled ? '수정하기' : '수정완료'}
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
