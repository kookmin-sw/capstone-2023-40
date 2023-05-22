import React from 'react';

import styled, { DefaultTheme } from 'styled-components';

import { CertificationType } from '../types/request';
import Certification from './Certification';

const Container = styled.div<{ width: string; minWidth: string }>`
  min-width: ${(props) => props.minWidth};
  width: ${(props) => props.width};
  overflow: scroll;
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
        ? Certification({ iconOption: true })
        : certificationList.map((label: number) => Certification({ label: label, iconOption: true }))}
    </Container>
  );
}
