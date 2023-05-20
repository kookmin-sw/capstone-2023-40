import React from 'react';

import styled from 'styled-components';

import { Icons } from '../assets/svg';
import { AuthLabel } from '../types/labels';
import { CertificationType } from '../types/request';

const Kakao = styled(Icons.KAKAO).attrs({
  width: 27,
  height: 27,
})`
  margin-right: 5px;
`;

const Google = styled(Icons.GOOGLE).attrs({
  width: 27,
  height: 27,
})`
  margin-right: 5px;
`;

const Webmail = styled(Icons.WEBMAIL).attrs({
  width: 27,
  height: 27,
})`
  margin-right: 5px;
`;

const Naver = styled(Icons.NAVER).attrs({
  width: 27,
  height: 27,
})`
  margin-right: 5px;
`;

const IdentityCard = styled(Icons.ID).attrs({
  width: 27,
  height: 27,
})`
  margin-right: 5px;
`;

const DriverLicense = styled(Icons.DRIVER_LICENSE).attrs({
  width: 27,
  height: 27,
})`
  margin-right: 5px;
`;

const AuthNone = styled(Icons.FREE).attrs({
  width: 27,
  height: 27,
})`
  margin-right: 5px;
`;

const Label = styled.label``;

interface CertificationProps {
  label?: CertificationType;
  iconOption: boolean;
}

export default function Certification({ label, iconOption }: CertificationProps) {
  let tmpLabel: number | string;
  if (typeof label === 'undefined') {
    tmpLabel = -1;
  } else if (typeof label === 'string') {
    tmpLabel = CertificationType[label];
  } else {
    tmpLabel = label;
  }

  if (iconOption) {
    switch (tmpLabel) {
      case CertificationType.KAKAO:
        return <Kakao key={label} />;
      case CertificationType.NAVER:
        return <Naver key={label} />;
      case CertificationType.GOOGLE:
        return <Google key={label} />;
      case CertificationType.WEBMAIL:
        return <Webmail key={label} />;
      case CertificationType.DRIVER_LICENSE:
        return <DriverLicense key={label} />;
      case CertificationType.IDENTITY_CARD:
        return <IdentityCard key={label} />;
      default:
        return <AuthNone key={label} />;
    }
  }
  switch (tmpLabel) {
    case CertificationType.KAKAO:
      return <Label key={label}>{AuthLabel.KAKAO}</Label>;
    case CertificationType.NAVER:
      return <Label key={label}>{AuthLabel.NAVER}</Label>;
    case CertificationType.GOOGLE:
      return <Label key={label}>{AuthLabel.GOOGLE}</Label>;
    case CertificationType.WEBMAIL:
      return <Label key={label}>{AuthLabel.WEBMAIL}</Label>;
    case CertificationType.DRIVER_LICENSE:
      return <Label key={label}>{AuthLabel.DRIVER_LICENSE}</Label>;
    case CertificationType.IDENTITY_CARD:
      return <Label key={label}>{AuthLabel.IDENTITY_CARD}</Label>;
    default:
      return <Label key={label}>{AuthLabel.NONE}</Label>;
  }
}
