import React, { useState } from 'react';

import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled, { DefaultTheme } from 'styled-components';

import axios from '../api/axios';
import { requests } from '../api/request';
import { setLoggedIn } from '../types/header';
import { UserResponse } from '../types/response/User';
import { setUserInformation } from '../utils/UserUtils';
import { isEmptyString } from '../utils/validate';
import { AlertModal } from './Modal';

const SurveyResultContainer = styled.div`
  width: 10vw;
  height: 10vh;
  border-radius: ${(props) => props.theme.borderRadius};
  background-color: ${(props) => props.theme.colors.container};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const SurveyResultTitle = styled.span`
  text-align: left;
  font-size: 5vh;
  font-weight: 900;
  color: ${(props) => props.theme.colors.default};
`;

const FontText = styled.span`
  margin-top: 5px;
  text-align: left;
  font-size: 1.3vh;
  font-weight: 600;
  color: ${(props) => props.theme.colors.default};
`;

interface SurveyResultProps {
  theme: DefaultTheme;
}

export default function SurveyResultBox({ theme }: SurveyResultProps) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <SurveyResultContainer theme={theme}>
      <Form onSubmit={handleSubmit}>
        <FontText theme={theme}>이메일</FontText>
        <FontText theme={theme}>비밀번호</FontText>
        <FontText theme={theme} style={{ display: 'flex', flexDirection: 'row' }}>
          <hr style={{ border: `${theme.colors.default}` }} />
          <FontText theme={theme}>or</FontText>
          <hr style={{ border: `${theme.colors.default}` }} />
        </FontText>
      </Form>
    </SurveyResultContainer>
  );
}
