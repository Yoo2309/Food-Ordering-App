import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import {
  CurrentUser,
  LoginResponseHa,
  ProfileResponseHaNhuY,
  Token,
} from "../../types/types";
import { initialUser } from "./authSliceLoi";

export const refresh_token_Ha = createAsyncThunk<LoginResponseHa, string>(
  "auth/refreshTokenHa",
  async (token: string) => {
    try {
      const response = await fetch(
        `https://ha-food-api.zenslab.com/api/refresh-token`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      return data;
    } catch {}
  }
);

//helper func
const decode_token_Ha = (
  state: CurrentUser,
  access_token: string,
  refresh_token: string
) => {
  return {
    ...state,
    token: {
      accessToken: access_token,
      refreshToken: refresh_token,
    },
  };
};

const authSliceHa = createSlice({
  name: "auth",
  initialState: initialUser,
  reducers: {
    handle_login_Ha: (state, action: PayloadAction<LoginResponseHa>) => {
      return decode_token_Ha(
        state,
        action.payload.access_token,
        action.payload.refresh_token
      );
    },
    fetch_UserData_Ha: (
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
    logout_Ha: () => {
      return initialUser;
    },
  },
  extraReducers(builder) {
    builder.addCase(
      refresh_token_Ha.fulfilled,
      (state, action: PayloadAction<LoginResponseHa>) => {
        return decode_token_Ha(
          state,
          action.payload.access_token,
          action.payload.refresh_token
        );
      }
    );
  },
});
export const { handle_login_Ha, fetch_UserData_Ha, logout_Ha } =
  authSliceHa.actions;
export default authSliceHa.reducer;
