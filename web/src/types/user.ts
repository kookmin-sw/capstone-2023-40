export type UserState = {
  email: string;
  name: string;
  profileImage: string;
};

export type UserAction =
  | { type: 'EMAIL'; payload: string }
  | { type: 'NAME'; payload: string }
  | { type: 'PROFILE_IMAGE'; payload: string };
