import authReducerLoi from "./slices/authSliceLoi";
import authReducerBach from "./slices/authSliceBach";
import authReducerHa from "./slices/authSliceHa";
import authReducerNhuY from "./slices/authSliceNhuY";
import LoginStateSlice from "./slices/LoginStateSlice";
import { configureStore, combineReducers } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
  userLoi: authReducerLoi,
  userBach: authReducerBach,
  userHa: authReducerHa,
  userNhuY: authReducerNhuY,
  loginState: LoginStateSlice,
  // Thêm các slice khác nếu cần
});

export const store = configureStore({
  reducer: { rootReducer },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
