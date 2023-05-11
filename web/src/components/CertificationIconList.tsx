import React from 'react';

import styled, { DefaultTheme } from 'styled-components';

import { CertificationType } from '../types/request';
import Certification from './Certification';

const Container = styled.div`
  min-width: 100px;
  width: 20vw;
`;

interface CertificationIconListProps {
  certificationList: Array<CertificationType>;
  theme: DefaultTheme;
}

export default function CertificationIconList({ certificationList, theme }: CertificationIconListProps) {
  return (
    <Container theme={theme}>
      {certificationList.length === 0
        ? Certification({ iconOption: true })
        : certificationList.map((label: number) => Certification({ label: label, iconOption: true }))}
    </Container>
  );
}
