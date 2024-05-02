import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import {
  CurrentUser,
  TokenDecodeBach,
  ProfileResponseBach,
  LoginResponseBach,
  Token,
} from "../../types/types";
import { jwtDecode } from "jwt-decode";
import { initialUser } from "./authSliceLoi";

//helper func
const decode_token_Bach = (state: CurrentUser, token: Token) => {
  localStorage.setItem("Bach_accessToken", JSON.stringify(token.accessToken));
  localStorage.setItem("Bach_refreshToken", JSON.stringify(token.refreshToken));

  const decode_token: TokenDecodeBach = jwtDecode(token.accessToken);
  return {
    ...state,
    token: {
      accessToken: token.accessToken,
      refreshToken: token.refreshToken,
    },
    userInfo: {
      ...state.userInfo,
      id: decode_token.sid,
      email: decode_token.email,
      role: decode_token.Role,
    },
  };
};

const authSliceBach = createSlice({
  name: "auth",
  initialState: initialUser,
  reducers: {
    handle_login_Bach: (state, action: PayloadAction<LoginResponseBach>) => {
      return decode_token_Bach(state, action.payload);
    },
    refresh_login_Bach: (state, action: PayloadAction<Token>) => {
      const decode_token: TokenDecodeBach = jwtDecode(
        action.payload.accessToken
      );
      return {
        ...state,
        token: {
          accessToken: action.payload.accessToken,
          refreshToken: action.payload.refreshToken,
        },
        userInfo: {
          ...state.userInfo,
          id: decode_token.sid,
          email: decode_token.email,
          role: decode_token.Role,
        },
      };
    },
    fetch_UserData_Bach: (
      state,
      action: PayloadAction<ProfileResponseBach>
    ) => {
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          id: action.payload.id.toString(),
          email: action.payload.email,
          address: action.payload.address,
          gender: action.payload.gender,
          role: action.payload.role,
          DOB: action.payload.dob,
        },
      };
    },
    logout_Bach: () => {
      return initialUser;
    },
  },
});
export const {
  handle_login_Bach,
  refresh_login_Bach,
  fetch_UserData_Bach,
  logout_Bach,
} = authSliceBach.actions;
export default authSliceBach.reducer;
