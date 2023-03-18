import React from 'react';

import styled, { DefaultTheme } from 'styled-components';

const ListTable = styled.table`
  display: flex;
  flex-direction: column;
  padding: 3vh 5vw 1vh 5vw;
  background-color: ${(props) => props.theme.colors.container};
`;

const ListHead = styled.thead``;

const ListBody = styled.tbody``;

const ListRow = styled.tr`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const Item = styled.td`
  height: 22px;
  margin: 2px;
  padding: 2vh;
  font-size: 1.7vh;
  font-weight: bold;
  border-radius: 5px;
  background-color: ${(props) => props.theme.colors.header};
`;

const HeadItem = styled.th`
  margin: 2px;
  padding: 2vh;
  font-size: 2vh;
  font-weight: bold;
  text-align: center;
  color: ${(props) => props.theme.colors.default};
`;

const Title = styled(Item)`
  min-width: 15vh;
  flex: 1;
`;

const Authlist = styled(Item)`
  min-width: 160px;
  width: 20vw;
`;

const EndDate = styled(Item)`
  min-width: 150px;
  width: 13vw;
  text-align: center;

  @media screen and (max-width: 900px) {
    display: none;
    }
  } 
`;

const HeadTitle = styled(HeadItem)`
  min-width: 15vh;
  flex: 1;
`;

const HeadAuthList = styled(HeadItem)`
  min-width: 160px;
  width: 20vw;
`;

const HeadEndDate = styled(HeadItem)`
  min-width: 150px;
  width: 13vw;
  
  @media screen and (max-width: 900px) {
    display: none;
    }
  } 
`;

interface SkeletonProps {
  theme: DefaultTheme;
}
export default function SurveyListSkeleton({ theme }: SkeletonProps) {
  const surveyIndex = [1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <ListTable theme={theme}>
      <ListHead>
        <ListRow>
          <HeadTitle theme={theme}>설문 제목</HeadTitle>
          <HeadAuthList theme={theme}>필수인증</HeadAuthList>
          <HeadEndDate theme={theme}>설문 종료일</HeadEndDate>
        </ListRow>
      </ListHead>

      <ListBody>
        {surveyIndex.map((index: number) => (
          <ListRow key={index} theme={theme}>
            <Title theme={theme} />
            <Authlist theme={theme} />
            <EndDate theme={theme} />
          </ListRow>
        ))}
      </ListBody>
    </ListTable>
  );
}
