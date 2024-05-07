import { createSlice } from "@reduxjs/toolkit";

const loginStateSlice = createSlice({
  name: "loginState",
  initialState: {
    showPassword: false,
    inputPassword: false,
  },
  reducers: {
    setShowPassword: (state) => {
      return { ...state, showPassword: !state.showPassword };
    },
    setInputPassword: (state) => {
      return { ...state, inputPassword: !state.inputPassword };
    },
  },
});
export const { setShowPassword, setInputPassword } = loginStateSlice.actions;
export default loginStateSlice.reducer;
