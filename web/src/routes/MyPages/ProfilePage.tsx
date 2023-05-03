import React, { useState, useEffect, SyntheticEvent } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import axios from '../../api/axios';
import { requests } from '../../api/request';
import { Icons } from '../../assets/svg/index';
import Header from '../../components/Header';
import { AlertModal } from '../../components/Modal';
import { useTheme } from '../../hooks/useTheme';
import { RootState } from '../../reducers';
import { UserResponse } from '../../types/response/User';
import { validatePassword, validatePhoneNumber } from '../../utils/validate';

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
  min-width: 5vw;
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

const changePhoneNumber = (value: string): string => {
  const phone = value.replace(/[^0-9]/g, '');
  if (phone.length >= 10 && phone.length < 13) {
    return phone.replace(/(\d{3})(\d{3,4})(\d{4})/, '$1-$2-$3');
  }
  return phone;
};

export default function MyPage() {
  const [theme, toggleTheme] = useTheme();
  const navigate = useNavigate();
  const [passwordDisabled, setPasswordDisabled] = useState(false);
  const [phoneNumberDisabled, setPhoneNumberDisabled] = useState(false);
  const [addressDisabled, setAddressDisabled] = useState(false);
  const [titleAlert, setTitleAlert] = useState('');
  const [textAlert, setTextAlert] = useState('');
  const [isAlertModal, setIsAlertModal] = useState(false);
  const userState = useSelector((state: RootState) => state.userInformation);
  const dispatch = useDispatch();

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
          dispatch({ type: 'CHANGE_PHONE_NUMBER', payload: value.replace(/-/g, '') });
          break;
        case 'address':
          dispatch({ type: 'CHANGE_ADDRESS', payload: value });
          break;
        default:
          break;
      }
    }
  };

  // Change Editable profile text [password, phoneNumber, address]
  const handleEditTextClick = (text: string) => {
    if (text === 'password') {
      if (!validatePassword(userState.password) && passwordDisabled) {
        setTitleAlert('개인정보 수정오류');
        setTextAlert('비밀번호를 다시 확인해주세요.');
        setIsAlertModal(true);
      } else {
        setPasswordDisabled(!passwordDisabled);
      }
    } else if (text === 'phoneNumber') {
      if (!validatePhoneNumber(userState.phoneNumber) && phoneNumberDisabled) {
        setTitleAlert('개인정보 수정오류');
        setTextAlert('전화번호를 다시 확인해주세요.');
        setIsAlertModal(true);
      } else {
        setPhoneNumberDisabled(!phoneNumberDisabled);
      }
    } else if (text === 'address') {
      setAddressDisabled(!addressDisabled);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const closeAlertModal = () => {
    setIsAlertModal(false);
  };

  useEffect(() => {
    const res = axios.get<UserResponse>(requests.getUserProfile);
    // setUserProfile(res);
    console.log(res);
  }, []); // 여기에 dependency를 넣는데, 이걸 (원래는 별로 안 좋은 습관이지만) 일단 userProfile로 설정

  // containerBox list
  const myProfileInformation = [
    {
      number: 1,
      title: '포인트',
      name: 'point',
      type: 'point',
      information: userState.point,
      isDisabled: false,
    },
    {
      number: 2,
      title: '이메일',
      name: 'email',
      type: 'email',
      information: userState.email,
      isDisabled: false,
    },
    {
      number: 3,
      title: '이름',
      name: 'name',
      type: 'text',
      information: userState.name,
      disabled: false,
    },
    {
      number: 4,
      title: '비밀번호',
      name: 'password',
      type: 'password',
      information: userState.password,
      isDisabled: passwordDisabled,
    },
    {
      number: 5,
      title: '전화번호',
      name: 'phoneNumber',
      type: 'text',
      information: changePhoneNumber(userState.phoneNumber),
      isDisabled: phoneNumberDisabled,
    },
    {
      number: 6,
      title: '주소',
      name: 'address',
      type: 'text',
      information: userState.address,
      isDisabled: addressDisabled,
    },
  ];

  return (
    <Container theme={theme}>
      <Header theme={theme} toggleTheme={toggleTheme} />
      <MypageContainer theme={theme}>
        <Form onSubmit={handleSubmit}>
          <MyPageTitle theme={theme}>마이페이지</MyPageTitle>
          {isAlertModal && (
            <AlertModal
              theme={theme}
              title={titleAlert}
              level="INFO"
              text={textAlert}
              buttonText="확인"
              onClose={closeAlertModal}
            />
          )}
          {myProfileInformation.map(({ number, title, name, type, information, isDisabled }) => (
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
                maxLength={title === '전화번호' ? 13 : undefined}
                style={{ width: `${(information.length + 1) * 10}px` }}
              />
              {title === '포인트' ? <PurchaseButton theme={theme}>기프티콘 구매</PurchaseButton> : undefined}
              {!(title === '포인트' || title === '이메일' || title === '이름') ? (
                <PencilImage
                  type="submit"
                  theme={theme}
                  title={!isDisabled ? '수정하기' : '수정완료'}
                  onClick={() => handleEditTextClick(name)}
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
