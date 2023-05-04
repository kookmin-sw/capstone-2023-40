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
  label?: CertificationType;
  iconOption: boolean;
}

export default function CertificationList({ label, iconOption }: CertificationListProps) {
  // FIXME: CertificationType allow both number and string... it makes happen with switch function
  let tmpLabel: any;
  if (typeof label === 'string') {
    tmpLabel = CertificationType[label];
  } else {
    tmpLabel = label;
  }

  if (iconOption) {
    switch (tmpLabel) {
      case CertificationType.KAKAO:
        return <Kakao key={label} />;
      case CertificationType.GOOGLE:
        return <Google key={label} />;
      case CertificationType.WEBMAIL:
        return <Webmail key={label} />;
      case CertificationType.NAVER:
        return <Naver key={label} />;
      case CertificationType.MOBILE_PHONE:
        return <MobilePhone key={label} />;
      case CertificationType.DRIVER_LICENSE:
        return <DriverLicense key={label} />;
      default:
        return <AuthNone key={label} />;
    }
  }
  switch (tmpLabel) {
    case CertificationType.KAKAO:
      return <Label key={label}>{AuthLabel.KAKAO}</Label>;
    case CertificationType.GOOGLE:
      return <Label key={label}>{AuthLabel.GOOGLE}</Label>;
    case CertificationType.WEBMAIL:
      return <Label key={label}>{AuthLabel.WEBMAIL}</Label>;
    case CertificationType.NAVER:
      return <Label key={label}>{AuthLabel.NAVER}</Label>;
    case CertificationType.MOBILE_PHONE:
      return <Label key={label}>{AuthLabel.MOBILE_PHONE}</Label>;
    case CertificationType.DRIVER_LICENSE:
      return <Label key={label}>{AuthLabel.DRIVER_LICENSE}</Label>;
    default:
      return <Label key={label}>{AuthLabel.NULL}</Label>;
  }
}
