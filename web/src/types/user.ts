export type UserInformationState = {
  authorId: number;
  email: string;
  name: string;
  point: string;
  password: string;
  phoneNumber: string;
  address: string;
  profileImage: string;
};

export const setUserId = (payload: number) => ({
  type: 'CHANGE_USERID',
  payload: payload,
});

export const setUserPoint = (payload: string) => ({
  type: 'CHANGE_POINT',
  payload: payload,
});

export const setUserEmail = (payload: string) => ({
  type: 'CHANGE_EMAIL',
  payload: payload,
});

export const setUserPassword = (payload: string) => ({
  type: 'CHANGE_PASSWORD',
  payload: payload,
});

export const setUserName = (payload: string) => ({
  type: 'CHANGE_NAME',
  payload: payload,
});

export const setPhoneNumber = (payload: string) => ({
  type: 'CHANGE_PHONE_NUMBER',
  payload: payload,
});

export const setUserAddress = (payload: string) => ({
  type: 'CHANGE_ADDRESS',
  payload: payload,
});

export const setUserProfileImage = (payload: string) => ({
  type: 'CHANGE_PROFILEIMAGE',
  payload: payload,
});

export type UserInformationAction =
  | ReturnType<typeof setUserId>
  | ReturnType<typeof setUserPoint>
  | ReturnType<typeof setUserEmail>
  | ReturnType<typeof setUserPassword>
  | ReturnType<typeof setUserName>
  | ReturnType<typeof setPhoneNumber>
  | ReturnType<typeof setUserAddress>
  | ReturnType<typeof setUserProfileImage>;
