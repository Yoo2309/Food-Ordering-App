import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import {
  CurrentUser,
  LoginToken,
  ProfileResponse,
  Token,
} from "../../../types/types";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

const initialUser: CurrentUser = {
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

export const fetchUserData = createAsyncThunk(
  "userData/fetchUserData",
  async (token: string) => {
    try {
      const response = await fetch(
        `https://back-end-zens-training.vercel.app/api/profile`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = response.json();
      return data;
    } catch {}
  }
);
export const refreshToken = createAsyncThunk(
  "userData/refreshToken",
  async (refresh_token: string) => {
    console.log(refresh_token);
    try {
      const response = await fetch(
        `https://back-end-zens-training.vercel.app/api/refresh-token`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${refresh_token}`,
          },
        }
      );
      const data = response.json();
      return data;
    } catch {}
  }
);

//helper func
const decode_token = (state: CurrentUser, token: Token) => {
  const decode_token: LoginToken = jwtDecode(token.accessToken);
  const currentTime = Math.floor(Date.now() / 1000);
  const expireTime = decode_token?.exp - currentTime;
  Cookies.set("accessToken", JSON.stringify(token.accessToken), {
    expires: expireTime,
  });
  Cookies.set("refreshToken", JSON.stringify(token.refreshToken));
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
    handle_login: (state, action: PayloadAction<Token>) => {
      return decode_token(state, action.payload);
    },
    refresh_login: (state, action: PayloadAction<Token>) => {
      const decode_token: LoginToken = jwtDecode(action.payload.accessToken);
      return {
        ...state,
        token: {
          accessToken: action.payload.accessToken,
          refreshToken: action.payload.refreshToken,
        },
        userInfo: {
          ...state.userInfo,
          id: decode_token.sub,
          username: decode_token.username,
        },
      };
    },
  },
  extraReducers(builder) {
    builder.addCase(
      fetchUserData.fulfilled,
      (state, action: PayloadAction<ProfileResponse>) => {
        if (action.payload) {
          return {
            ...state,
            userInfo: {
              ...state.userInfo,
              email: action.payload.email,
              role: action.payload.role,
            },
          };
        }
      }
    );
    builder.addCase(
      refreshToken.fulfilled,
      (state, action: PayloadAction<Token>) => {
        return decode_token(state, action.payload);
      }
    );
  },
});
export const { handle_login, refresh_login } = authSliceLoi.actions;
export default authSliceLoi.reducer;
