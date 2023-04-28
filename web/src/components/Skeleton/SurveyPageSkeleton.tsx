import React from 'react';

import styled, { DefaultTheme } from 'styled-components';

import { NumberUtils } from '../../utils/NumberUtils';
import { skeletonItem } from '../Styled/Animation';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: ${(props) => props.theme.colors.container};
`;

const HeadContainer = styled.div`
  height: 50px;
  padding: 6vh 8vw 0vh 8vw;
  background-color: ${(props) => props.theme.colors.container};
`;

const BodyContainer = styled.div`
  width: 84vw;
  padding: 1vh 8vw 1vh 8vw;
  background-color: ${(props) => props.theme.colors.container};
`;

const QuestionContainer = styled(skeletonItem)`
  height: 150px;
  margin-top: 23px;
  border-radius: ${(props) => props.theme.borderRadius};
  border-left: 10px solid ${(props) => props.theme.colors.primary};
  padding: 1.2vh 2vw 1.2vh 2vw;
  color: ${(props) => props.theme.colors.default};
  background-color: ${(props) => props.theme.colors.background};
`;

const QuestionTitle = styled.div`
  height: 30px;
  width: 76vw;
  padding: 1.2vh 1.5vw 1.2vh 1.5vw;
  margin-top: 7px;
  margin-bottom: 25px;
  border-radius: ${(props) => props.theme.borderRadius};
  color: ${(props) => props.theme.colors.default};
  background-color: ${(props) => props.theme.colors.container};
`;

interface SkeletonProps {
  theme: DefaultTheme;
}

export default function SurveyPageSkeleton({ theme }: SkeletonProps) {
  return (
    <Container theme={theme}>
      <HeadContainer theme={theme} />

      <BodyContainer theme={theme}>
        {NumberUtils.range(9).map((index: number) => (
          <QuestionContainer key={index} theme={theme}>
            <QuestionTitle theme={theme} />
          </QuestionContainer>
        ))}
      </BodyContainer>
    </Container>
  );
}
