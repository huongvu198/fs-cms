export interface ILoginRequest {
  email: string;
  password: string;
}

export interface IUser {
  email: string;
  role: string;
}

export interface IAuthResponse {
  token: string;
  refreshToken: string;
  tokenExpires: number;
  user: IUser;
}
