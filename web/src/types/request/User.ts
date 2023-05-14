export interface UserUpdateRequest {
  password?: string;
  phoneNumber?: string;
  address?: string;
  profileImage?: string;
}

export interface UserAuthListUpdateRequest {
  isKakaoCertificated: boolean;
  isNaverCertificated: boolean;
  isGoogleCertificated: boolean;
  isWebMailCertificated: boolean;
  isDriverLicenseCertificated: boolean;
  isIdentityCardCertificated: boolean;
}
