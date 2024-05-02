import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import {
  CurrentUser,
  LoginResponseHa,
  ProfileResponseHa,
  Token,
} from "../../types/types";
import { initialUser } from "./authSliceLoi";

export const refresh_token_Ha = createAsyncThunk<LoginResponseHa, string>(
  "auth/refreshTokenHa",
  async (token: string) => {
    try {
      const response = await fetch(
        `https://ha-food-api.zenslab.com/api/refreshAccessToken`,
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
  localStorage.setItem("Ha_accessToken", JSON.stringify(access_token));
  localStorage.setItem("Ha_refreshToken", JSON.stringify(refresh_token));

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
      decode_token_Ha(
        state,
        action.payload.access_token,
        action.payload.refresh_token
      );
    },
    refresh_login_Ha: (state, action: PayloadAction<Token>) => {
      return {
        ...state,
        token: {
          accessToken: action.payload.accessToken,
          refreshToken: action.payload.refreshToken,
        },
      };
    },
    fetch_UserData_Ha: (state, action: PayloadAction<ProfileResponseHa>) => {
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
export const {
  handle_login_Ha,
  refresh_login_Ha,
  fetch_UserData_Ha,
  logout_Ha,
} = authSliceHa.actions;
export default authSliceHa.reducer;
