import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import counterReducer from "./slices/counter.slice";
import userReducer from "./slices/user.slice";
import sheltersReducer from "./slices/shelters.slice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    users: userReducer,
    shelters: sheltersReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
