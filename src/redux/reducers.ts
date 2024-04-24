import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { User, LoginInfo, SignUpInfo } from "../../types/types";
import { jwtDecode } from "jwt-decode";

const initialInfo = {
  current_user: {
    token: "",
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
  },
};

export const login = createAsyncThunk(
  "auth/login",
  async (loginData: LoginInfo, thunkAPI) => {
    console.log(loginData);
    try {
      const response = await fetch("", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: loginData.email,
          password: loginData.password,
        }),
      });
      if (response) {
        const data = await response.json();
        return data.access_token;
      }
    } catch {}
  }
);
export const signup = createAsyncThunk(
  "auth/signup",
  async (signupData: SignUpInfo, thunkAPI) => {
    console.log(signupData);
    try {
      const response = await fetch("", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: signupData.username,
          email: signupData.email,
          password: signupData.password,
        }),
      });
      if (response) {
        return response;
      }
    } catch {}
  }
);

const authSlice_Loi = createSlice({
  name: "auth",
  initialState: initialInfo,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.current_user.token = action.payload;
    });
  },
});
export default authSlice_Loi.reducer;
