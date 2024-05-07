import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  CurrentUser,
  LoginTokenLoi,
  ProfileResponseLoi,
  Token,
} from "../../types/types";
import { jwtDecode } from "jwt-decode";

export const initialUser: CurrentUser = {
  token: {
    accessToken: "",
    refreshToken: "",
  },
  userInfo: {
    id: "",
    fullname: "",
    username: "",
    email: "",
    password: "",
    address: "",
    gender: "",
    role: "",
    DOB: "",
  },
};

//helper func
const decode_token_Loi = (state: CurrentUser, token: Token) => {
  const decode_token: LoginTokenLoi = jwtDecode(token.accessToken);
  return {
    ...state,
    token: {
      accessToken: token.accessToken,
      refreshToken: token.refreshToken,
    },
    userInfo: {
      ...state.userInfo,
      id: decode_token.sub,
      username: decode_token.username,
    },
  };
};

const authSliceLoi = createSlice({
  name: "auth",
  initialState: initialUser,
  reducers: {
    handle_login_Loi: (state, action: PayloadAction<Token>) => {
      return decode_token_Loi(state, action.payload);
    },
    fetch_userData_Loi: (state, action: PayloadAction<ProfileResponseLoi>) => {
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          email: action.payload.email,
          role: action.payload.role,
        },
      };
    },
    fetch_UserData_Loi: (state, action: PayloadAction<ProfileResponseLoi>) => {
      if (action.payload) {
        console.log("set user");
        return {
          ...state,
          userInfo: {
            ...state.userInfo,
            email: action.payload.email,
            role: action.payload.role,
            id: action.payload.id,
            username: action.payload.username,
          },
        };
      }
    },
    logout_Loi: () => {
      return initialUser;
    },
  },
});
export const {
  handle_login_Loi,
  fetch_UserData_Loi,
  logout_Loi,
} = authSliceLoi.actions;
export default authSliceLoi.reducer;
