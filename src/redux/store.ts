import authReducerLoi from "./slices/authSliceLoi";
import authReducerBach from "./slices/authSliceBach";
import authReducerHa from "./slices/authSliceHa";
import authReducerNhuY from "./slices/authSliceNhuY";
import LoginStateSlice from "./slices/LoginStateSlice";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import persistStore from "redux-persist/es/persistStore";

// const rootReducer = combineReducers({
//   userLoi: authReducerLoi,
//   userBach: authReducerBach,
//   userHa: authReducerHa,
//   userNhuY: authReducerNhuY,
//   loginState: LoginStateSlice,
//   // Thêm các slice khác nếu cần
// });

const persistedAuthReducerLoi = persistReducer(
  {
    key: "LoiToken",
    storage: storage,
    whitelist: ["token"],
  },
  authReducerLoi
);
const persistedAuthReducerBach = persistReducer(
  {
    key: "BachToken",
    storage: storage,
    whitelist: ["token", "userInfo.id"],
  },
  authReducerBach
);
const persistedAuthReducerHa = persistReducer(
  {
    key: "HaToken",
    storage: storage,
    whitelist: ["token"],
  },
  authReducerHa
);
const persistedAuthReducerNhuY = persistReducer(
  {
    key: "YToken",
    storage: storage,
    whitelist: ["token"],
  },
  authReducerNhuY
);

const rootReducer = combineReducers({
  userLoi: persistedAuthReducerLoi,
  userBach: persistedAuthReducerBach,
  userHa: persistedAuthReducerHa,
  userNhuY: persistedAuthReducerNhuY,
  loginState: LoginStateSlice,
});
export const store = configureStore({
  reducer: { rootReducer },
});
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
