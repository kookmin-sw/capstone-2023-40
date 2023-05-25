import React, { useEffect, useMemo, useRef, useState } from 'react';

import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled, { DefaultTheme } from 'styled-components';

import { useOnClickOutside } from '../../hooks/useOnClickOutside';
import { RootState } from '../../reducers';
import { SurveyAbstractResponse } from '../../types/response/Survey';
import { dateFormatUpToMinute, getDDay, getTimeRemaining } from '../../utils/dateFormat';
import { validateStartDate } from '../../utils/validate';
import { DeleteImage } from '../Button/ImageButtons';
import RectangleButton from '../Button/RectangleButton';
import CertificationIconList from '../CertificationIconList';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: 100;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContainer = styled.div`
  padding: 3vh 3vw 5vh 3vw;
  width: 80vw;
  height: 60vh;
  border-radius: ${(props) => props.theme.borderRadius};
  background-color: ${(props) => props.theme.colors.container};
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  overflow: auto;

  @media screen and (max-width: 960px) {
    padding: 3vh 3vw 5vh 3vw;
    width: 80vw;
    height: 60vh;
  }
`;

const TitleContainer = styled.div`
  padding: 1vh 1vw 1vh 1vw;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: baseline;
  flex-wrap: wrap;
`;

const BodyContainer = styled.div`
  margin-top: 15px;
  padding: 1vh 1vw 1vh 1vw;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: ${(props) => props.theme.colors.background};
  border-radius: ${(props) => props.theme.borderRadius};
  border: ${(props) => props.theme.border};
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const EndButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

const CertificationContainer = styled.div`
  padding: 1.2vh 1.5vw 1.2vh 1.5vw;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`;

const Label = styled.label`
  display: inline-block;
  color: ${(props) => props.theme.colors.default};
`;

const Title = styled(Label)`
  font-size: 35px;
  font-weight: 600;
`;

const EndDate = styled(Label)`
  font-size: 17px;
  font-weight: 600;
  margin-left: 5px;
  color: ${(props) => props.theme.colors.text};
`;

const Subtitle = styled(Label)`
  font-size: 20px;
  font-weight: 600;
  padding: 1.2vh 1.5vw 1.2vh 1.5vw;
  text-decoration: underline;
  text-decoration-color: currentColor;
  text-underline-offset: 5px;
`;

const Description = styled.span`
  color: ${(props) => props.theme.colors.default};
  padding: 1.2vh 1.5vw 1.2vh 1.5vw;
`;

interface ModalProps {
  surveyItem: SurveyAbstractResponse;
  setPreviewModalOpen: (arg: boolean) => void;
  theme: DefaultTheme;
}

export default function SurveyPreviewModal({ surveyItem, setPreviewModalOpen, theme }: ModalProps) {
  const date = new Date();
  const remainDate = useMemo(() => getDDay(surveyItem.endedDate), [surveyItem.endedDate]);
  const navigate = useNavigate();
  const modalRef = useRef<HTMLDivElement>(null);
  const [isSurveyStart, setIsSurveyStart] = useState<boolean>(true);
  const [isAuthor, setIsAuthor] = useState<boolean>(false);
  const userState = useSelector((state: RootState) => state.userInformation);
  const [buttonText, setButtonText] = useState('설문 조사 참여하기');

  useOnClickOutside({
    ref: modalRef,
    handler: () => {
      setPreviewModalOpen(false);
    },
  });

  const updateButtonText = () => {
    if (isSurveyStart) {
      setButtonText('설문 조사 참여하기');
    } else {
      const { days, hours, minutes, seconds } = getTimeRemaining(surveyItem.startedDate.toString());

      if (days === 0 && hours === 0 && minutes === 0 && seconds === 0) {
        setIsSurveyStart(true);
        setButtonText('설문 조사 참여하기');
      } else {
        setButtonText(
          `${days > 0 ? `${days}일 ` : ''}${hours > 0 ? `${hours}시간 ` : ''}${minutes > 0 ? `${minutes}분 ` : ''}${
            seconds > 0 ? `${seconds}초 ` : ''
          }이후 참여가능`
        );
      }
    }
  };

  useEffect(() => {
    // Check survey is start
    if (validateStartDate(new Date(surveyItem.startedDate), date)) {
      setIsSurveyStart(false);
    }
    // TODO: 본인이 만든 설문이면 수정 페이지로 이동 시켜주기
  }, [surveyItem.surveyId]);

  useEffect(() => {
    let timer: number;
    const update = () => {
      updateButtonText();
      if (!isSurveyStart) {
        timer = window.setTimeout(update, 1000);
      }
    };
    update();

    return () => {
      if (timer) window.clearTimeout(timer);
    };
  }, [surveyItem.startedDate, isSurveyStart]);

  return (
    <Container>
      <ModalContainer ref={modalRef} theme={theme}>
        <EndButtonContainer>
          <DeleteImage
            data-testid="closeModal"
            name="closeModal"
            onClick={() => setPreviewModalOpen(false)}
            theme={theme}
          />
        </EndButtonContainer>
        <TitleContainer theme={theme}>
          <Title theme={theme}>{surveyItem.title}</Title>
          <EndDate theme={theme}>
            ~ {dateFormatUpToMinute(`${surveyItem.endedDate}`)} (D-{remainDate})
          </EndDate>
        </TitleContainer>
        <BodyContainer theme={theme}>
          <Subtitle theme={theme}>설문조사 상세내용</Subtitle>
          <Description theme={theme}>{surveyItem.description}</Description>
          <Subtitle theme={theme}>필수인증 목록</Subtitle>
          <CertificationContainer>
            <CertificationIconList
              width="100%"
              minWidth="100px"
              certificationList={surveyItem.certificationTypes}
              theme={theme}
            />
          </CertificationContainer>
        </BodyContainer>
        <ButtonContainer>
          <RectangleButton
            textColor="white"
            backgroundColor={theme.colors.primary}
            hoverColor={theme.colors.prhover}
            text={buttonText}
            theme={theme}
            handleClick={() => navigate(`/survey/${surveyItem.surveyId}`)}
            width="50%"
            disabled={!isSurveyStart}
          />
        </ButtonContainer>
      </ModalContainer>
    </Container>
  );
}
