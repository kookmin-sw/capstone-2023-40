import React from 'react';

import styled from 'styled-components';

import { Icons } from '../assets/svg';
import { AuthLabel } from '../types/labels';

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

const NAVER = styled(Icons.NAVER).attrs({
  width: 27,
  height: 27,
})`
  margin-right: 5px;
`;

const MobilePhone = styled(Icons.MOBILE_PHONE).attrs({
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

interface CertificationListProps {
  label: string;
  iconOption: boolean;
}

export default function CertificationList({ label, iconOption }: CertificationListProps) {
  if (iconOption) {
    switch (label) {
      case 'KAKAO':
        return <Kakao key={label}>{AuthLabel.KAKAO}</Kakao>;
      case 'GOOGLE':
        return <Google key={label}>{AuthLabel.GOOGLE}</Google>;
      case 'WEBMAIL':
        return <Webmail key={label}>{AuthLabel.WEBMAIL}</Webmail>;
      case 'NAVER':
        return <NAVER key={label}>{AuthLabel.NAVER}</NAVER>;
      case 'MOBILE_PHONE':
        return <MobilePhone key={label}>{AuthLabel.MOBILE_PHONE}</MobilePhone>;
      case 'DRIVER_LICENSE':
        return <DriverLicense key={label}>{AuthLabel.DRIVER_LICENSE}</DriverLicense>;
      default:
        return <AuthNone key={label}>{AuthLabel.NULL}</AuthNone>;
    }
  }
  switch (label) {
    case 'KAKAO':
      return <Label>{AuthLabel.KAKAO}</Label>;
    case 'GOOGLE':
      return <Label key={label}>{AuthLabel.GOOGLE}</Label>;
    case 'WEBMAIL':
      return <Label key={label}>{AuthLabel.WEBMAIL}</Label>;
    case 'NAVER':
      return <Label key={label}>{AuthLabel.NAVER}</Label>;
    case 'MOBILE_PHONE':
      return <Label key={label}>{AuthLabel.MOBILE_PHONE}</Label>;
    case 'DRIVER_LICENSE':
      return <Label key={label}>{AuthLabel.DRIVER_LICENSE}</Label>;
    default:
      return <Label key={label}>{AuthLabel.NULL}</Label>;
  }
}
