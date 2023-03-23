import { ReactComponent as DriverLicense } from './driver-license-icon.svg';
import { ReactComponent as Error } from './error-icon.svg';
import { ReactComponent as Google } from './google-icon.svg';
import { ReactComponent as Id } from './id-icon.svg';
import { ReactComponent as Info } from './info-icon.svg';
import { ReactComponent as Kakao } from './kakao-icon.svg';
import { ReactComponent as DarkLogo } from './logo-dark.svg';
import { ReactComponent as LightLogo } from './logo-light.svg';
import { ReactComponent as MobilePhone } from './mobile-phone-icon.svg';
import { ReactComponent as Naver } from './naver-icon.svg';
import { ReactComponent as Warn } from './warn-icon.svg';
import { ReactComponent as Webmail } from './webmail-icon.svg';

export const Icons: {
  [src: string]: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & {
      title?: string | undefined;
    }
  >;
} = {
  Kakao: Kakao,
  Naver: Naver,
  Google: Google,
  Id: Id,
  Webmail: Webmail,
  DriverLicense: DriverLicense,
  MobilePhone: MobilePhone,
  Error: Error,
  Info: Info,
  Warn: Warn,
  DarkLogo: DarkLogo,
  LightLogo: LightLogo,
};
