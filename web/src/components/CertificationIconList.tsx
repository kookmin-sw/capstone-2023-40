import React from 'react';

import { Tooltip } from 'react-tooltip';
import styled, { DefaultTheme } from 'styled-components';

import { CertificationType } from '../types/request';
import Certification from './Certification';

const Container = styled.div<{ width: string; minWidth: string }>`
  min-width: ${(props) => props.minWidth};
  width: ${(props) => props.width};
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

interface CertificationIconListProps {
  certificationList: Array<CertificationType>;
  width: string;
  minWidth: string;
  theme: DefaultTheme;
}

export default function CertificationIconList({
  certificationList,
  width,
  minWidth,
  theme,
}: CertificationIconListProps) {
  return (
    <Container width={width} minWidth={minWidth} theme={theme}>
      {certificationList.length === 0
        ? Certification({ iconOption: true, theme })
        : certificationList.map((label: number) => Certification({ label: label, iconOption: true, theme }))}
      <Tooltip id="kakao" place="top">
        카카오 계정
      </Tooltip>
      <Tooltip id="naver" place="top">
        네이버 계정
      </Tooltip>
      <Tooltip id="google" place="top">
        구글 계정
      </Tooltip>
      <Tooltip id="webmail" place="top">
        학교 웹메일
      </Tooltip>
      <Tooltip id="driver-license" place="top">
        운전면허
      </Tooltip>
      <Tooltip id="identification-card" place="top">
        신분증
      </Tooltip>
      <Tooltip id="none" place="top">
        제한없음
      </Tooltip>
    </Container>
  );
}
