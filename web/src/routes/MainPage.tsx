import React from 'react';

import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { isMobile } from 'react-device-detect';

import BackgroundImage from '../assets/main-page.webp';
import Header from '../components/Header';
import { useTheme } from '../hooks/useTheme';
import { RootState } from '../reducers';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: url(${BackgroundImage}) no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
`;

const Introduction = styled.div`
  padding-top: 25vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  color: white;
  font-size: 5vh;
  font-weight: 500;
`;

const MobileIntroduction = styled.div`
  padding-top: 20vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  color: white;
  font-size: 3vh;
  font-weight: 500;
`;

const Description = styled.p`
  word-break: break-word;
  word-break: keep-all;
  line-height: 8vh;
`;

const AppTitle = styled.span`
  font-weight: 700;
`;

const Button = styled.button`
  margin-top: 5vh;
  border: none;
  padding: 2vh;
  padding-left: 4vw;
  padding-right: 4vw;
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

const FadeInUp = keyframes`
  0% {
    opacity: 0;
    transform: translate3d(0, 100%, 0);
  }
  to {
    opacity: 1;
    transform: translateZ(0);
  }
`;

const FadeInUpAnimationText = styled.span`
  animation: ${FadeInUp} 2s ease-in-out;
`;


export default function MainPage() {
    const [theme, toggleTheme] = useTheme();
    const navigate = useNavigate();
    const isLoggedIn = useSelector((state: RootState) => state.header.isLoggedIn);

    return (
        <div>
            <Container>
                <Header theme={theme} toggleTheme={toggleTheme}/>
                {!isMobile ? (
                    <Introduction>
                        <Description>
                            <FadeInUpAnimationText>
                                설문의 모든 것
                                <br/>
                                <AppTitle>더 서베이</AppTitle>
                                에서 쉽고 간편하게</FadeInUpAnimationText>
                        </Description>
                        <Button
                            onClick={() => navigate(isLoggedIn ? '/survey' : '/login')}
                            theme={theme}>
                            바로 설문하기
                        </Button>
                    </Introduction>
                ) : (
                    <MobileIntroduction>
                        <Description>
                            <FadeInUpAnimationText>
                                설문의 모든 것
                                <br/>
                                <AppTitle>더 서베이</AppTitle>
                                에서 쉽고 간편하게</FadeInUpAnimationText>
                        </Description>
                        <Button
                            onClick={() => navigate(isLoggedIn ? '/survey' : '/login')}
                            theme={theme}>
                            바로 설문하기
                        </Button>
                    </MobileIntroduction>
                )}
            </Container>
            <Container>
                {!isMobile ? (
                    <Introduction>
                        <Description>
                            <AppTitle>더 서베이</AppTitle>에서는 웹, 모바일 어디서나 설문조사를 만들거나 참여할 수 있어요
                            <br/>
                            여러 인증을 통해서 보다 <AppTitle>믿을 수 있는</AppTitle> 설문조사를 만들 수 있어요
                            <br/>
                            설문조사를 참여해서 얻은 포인트로 <AppTitle>기프티콘</AppTitle>을 교환할 수 있어요
                        </Description>
                    </Introduction>) : (
                    <MobileIntroduction>
                        <Description>
                            <AppTitle>더 서베이</AppTitle>에서는 웹, 모바일 어디서나 설문조사를 만들거나 참여할 수 있어요
                            <br/>
                            여러 인증을 통해서 보다 <AppTitle>믿을 수 있는</AppTitle> 설문조사를 만들 수 있어요
                            <br/>
                            설문조사를 참여해서 얻은 포인트로 <AppTitle>기프티콘</AppTitle>을 교환할 수 있어요
                        </Description>
                    </MobileIntroduction>
                    )
                }
            </Container>
        </div>
    );
}
