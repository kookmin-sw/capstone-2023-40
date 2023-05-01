import React, { useRef } from 'react';

import { useNavigate } from 'react-router-dom';
import styled, { DefaultTheme } from 'styled-components';

import { useOnClickOutside } from '../../hooks/useOnClickOutside';
import { RectanglePrimaryButton } from '../Button/Buttons';
import { DeleteImage } from '../Button/ImageButtons';
import CertificationList from '../CertificationList';

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
  margin-left: 15px;
  color: ${(props) => props.theme.colors.text};

  @media screen and (max-width: 960px) {
    display: none;
  }
`;

const Subtitle = styled(Label)`
  font-size: 20px;
  font-weight: 600;
  width: 30vw;
  padding: 1.2vh 1.5vw 1.2vh 1.5vw;
  text-decoration: underline;
  text-decoration-color: currentColor;
  text-underline-offset: 5px;

  @media screen and (max-width: 960px) {
    width: 35vw;
  }
`;

const Description = styled.span`
  color: ${(props) => props.theme.colors.default};
  padding: 1.2vh 1.5vw 1.2vh 1.5vw;
`;

const SubmitButton = styled(RectanglePrimaryButton)`
  width: 30vw;
  margin-top: 10px;
`;

interface SurveyItem {
  survey_id: string;
  author: number;
  title: string;
  description: string;
  created_date: string;
  ended_date: string;
  required_authentications: Array<string>;
}

interface ModalProps {
  surveyItem: SurveyItem;
  setEnterModalOpen: (arg: boolean) => void;
  theme: DefaultTheme;
}

export default function SurveyPreviewModal({ surveyItem, setEnterModalOpen, theme }: ModalProps) {
  const navigate = useNavigate();
  const modalRef = useRef<HTMLDivElement>(null);
  useOnClickOutside({
    ref: modalRef,
    handler: () => {
      setEnterModalOpen(false);
    },
  });

  return (
    <Container>
      <ModalContainer ref={modalRef} theme={theme}>
        <EndButtonContainer>
          <DeleteImage
            data-testid="closeModal"
            name="closeModal"
            onClick={() => setEnterModalOpen(false)}
            theme={theme}
          />
        </EndButtonContainer>
        <TitleContainer theme={theme}>
          <Title theme={theme}>{surveyItem.title}</Title>
          <EndDate theme={theme}>~ {surveyItem.ended_date.substring(0, 10)}</EndDate>
        </TitleContainer>
        <BodyContainer theme={theme}>
          <Subtitle theme={theme}>설문조사 상세내용</Subtitle>
          <Description theme={theme}>{surveyItem.description}</Description>
          <Subtitle theme={theme}>필수인증 목록</Subtitle>
          <CertificationContainer>
            {surveyItem.required_authentications.length === 0
              ? CertificationList({ label: '', iconOption: true })
              : surveyItem.required_authentications.map((label) =>
                  CertificationList({ label: label, iconOption: true })
                )}
          </CertificationContainer>
        </BodyContainer>
        <ButtonContainer>
          <SubmitButton type="submit" onClick={() => navigate(`/survey/${surveyItem.survey_id}`)} theme={theme}>
            설문 조사 시작하기
          </SubmitButton>
        </ButtonContainer>
      </ModalContainer>
    </Container>
  );
}
