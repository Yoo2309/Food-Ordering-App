export type User = {
  id: string;
  fullname?: string;
  username?: string;
  email: string;
  password: string;
  address?: string;
  gender?: string;
  role?: string;
  DOB?: string;
};

export type Token = {
  accessToken: string;
  refreshToken: string;
};

export type CurrentUser = {
  token: Token;
  userInfo: User;
};

export type LoginInfo = {
  username: string;
  password: string;
};
export type SignUpInfo = {
  username: string;
  email: string;
  password: string;
};
export type ProfileResponse = {
  id: string;
  email: string;
  username: string;
  role: string;
};
export type LoginToken = {
  sub: string;
  username: string;
  iat: number;
  exp: number;
};
