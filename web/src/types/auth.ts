export type AuthState = {
  email: string;
  name: string;
  profileImage: string;
};

export type AuthAction =
  | { type: 'EMAIL'; payload: string }
  | { type: 'NAME'; payload: string }
  | { type: 'PROFILE_IMAGE'; payload: string };
