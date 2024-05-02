import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { CurrentUser, LoginResponseHa, Token } from "../../types/types";
import { initialUser } from "./authSliceLoi";

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
    refresh_login_Ha:(state, action: PayloadAction<Token>) => {
      return {
        ...state,
        token: {
          accessToken: action.payload.accessToken,
          refreshToken: action.payload.refreshToken,
        },
      };
    },
  },
  extraReducers(builder) {},
});
export const { handle_login_Ha, refresh_login_Ha } = authSliceHa.actions;
export default authSliceHa.reducer;
