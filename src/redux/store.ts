import authReducer from "./slices/authSlice";
import LoginStateSlice from "./slices/LoginStateSlice";
import { configureStore, combineReducers } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
  user: authReducer,
  loginState: LoginStateSlice,
  // Thêm các slice khác nếu cần
});

export const store = configureStore({
  reducer: { rootReducer },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
