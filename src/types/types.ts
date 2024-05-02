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

export enum APIName {
  Loi = "Loi",
  Bach = "Bach",
  Ha = "Ha",
}

//Loi's API
export type ProfileResponseLoi = {
  id: string;
  email: string;
  username: string;
  role: string;
};
export type LoginTokenLoi = {
  sub: string;
  username: string;
  iat: number;
  exp: number;
};

//Bach's API
export type LoginResponseBach = {
  accountId: string;
  email: string;
  roleName: string;
  accessToken: string;
  refreshToken: string;
};
export type ProfileResponseBach = {
  id: number;
  email: string;
  status: string;
  address: string;
  gender: string;
  role: string;
  dob: string;
  avatar: string;
};
export type TokenDecodeBach = {
  email: string;
  sid: string;
  Role: string;
  jti: string;
  nbf: number;
  exp: number;
  iat: number;
};

//Ha's API
export type LoginResponseHa = {
  access_token: string;
  refresh_token: string;
  expires_in: number;
};
export type ProfileResponseHa = {
  username: string;
  email: string;
};
