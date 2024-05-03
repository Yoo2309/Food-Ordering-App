import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import {
  CurrentUser,
  LoginResponseNhuY,
  ProfileResponseHaNhuY,
  Token,
} from "../../types/types";
import { initialUser } from "./authSliceLoi";

//helper func
const decode_token_NhuY = (state: CurrentUser, access_token: string) => {
  localStorage.setItem("NhuY_accessToken", JSON.stringify(access_token));

  return {
    ...state,
    token: {
      ...state.token,
      accessToken: access_token,
    },
  };
};

const authSliceNhuY = createSlice({
  name: "auth",
  initialState: initialUser,
  reducers: {
    handle_login_NhuY: (state, action: PayloadAction<LoginResponseNhuY>) => {
      return decode_token_NhuY(state, action.payload.access_token);
    },
    refresh_login_NhuY: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        token: {
          ...state.token,
          accessToken: action.payload,
        },
      };
    },
    fetch_UserData_NhuY: (
      state,
      action: PayloadAction<ProfileResponseHaNhuY>
    ) => {
      console.log(action.payload);
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          id: action.payload.id.toString(),
          fullname: action.payload.fullname,
          username: action.payload.username,
          email: action.payload.email,
          address: action.payload.address,
          gender: action.payload.gender,
          DOB: action.payload.DOB,
          role: action.payload.role,
        },
      };
    },
    logout_NhuY: () => {
      return initialUser;
    },
  },
  extraReducers(builder) {},
});
export const {
  handle_login_NhuY,
  refresh_login_NhuY,
  fetch_UserData_NhuY,
  logout_NhuY,
} = authSliceNhuY.actions;
export default authSliceNhuY.reducer;
