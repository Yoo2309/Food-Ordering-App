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

export type CurrentUser = {
    userIfo: User,
    token: string
}

export type LoginInfo = {
  email: string;
  password: string;
};
export type SignUpInfo = {
  email: string;
  password: string;
  username: string;
};
