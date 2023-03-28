import { ReactComponent as Arrow } from './arrow.svg';
import { ReactComponent as Check } from './CheckIcon.svg';
import { ReactComponent as DriverLicense } from './DriverLicense.svg';
import { ReactComponent as Error } from './error-icon.svg';
import { ReactComponent as Favicon } from './favicon.svg';
import { ReactComponent as Google } from './Google.svg';
import { ReactComponent as Id } from './IDCard.svg';
import { ReactComponent as Info } from './info-icon.svg';
import { ReactComponent as Kakao } from './KakaoTalk_logo.svg';
import { ReactComponent as DarkLogo } from './logo-dark.svg';
import { ReactComponent as LightLogo } from './logo-light.svg';
import { ReactComponent as MobilePhone } from './mobile-phone-icon.svg';
import { ReactComponent as Naver } from './naver.svg';
import { ReactComponent as Pencil } from './pencil.svg';
import { ReactComponent as Shortcut } from './shortcut-icon.svg';
import { ReactComponent as TwoArrow } from './twoArrow.svg';
import { ReactComponent as Warn } from './warn-icon.svg';
import { ReactComponent as Webmail } from './webmail-icon.svg';

export type IconType = React.FunctionComponent<React.SVGProps<SVGSVGElement> & { title?: string | undefined }>;

export const Icons: { [src: string]: IconType } = {
  DRIVER_LICENSE: DriverLicense,
  ERROR: Error,
  FAVICON: Favicon,
  GOOGLE: Google,
  ID: Id,
  INFO: Info,
  KAKAO: Kakao,
  DARK_LOGO: DarkLogo,
  LIGHT_LOGO: LightLogo,
  MOBILE_PHONE: MobilePhone,
  NAVER: Naver,
  SHORTCUT: Shortcut,
  WARN: Warn,
  WEBMAIL: Webmail,
  CHECK: Check,
  ARROW: Arrow,
  PENCIL: Pencil,
  TWOARROW: TwoArrow,
};
