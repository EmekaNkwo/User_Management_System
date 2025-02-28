import { combineReducers, configureStore } from "@reduxjs/toolkit";
import stepSlice from "./slices/stepSlice";
import { userApi } from "./api/userApi";

const rootReducer = combineReducers({
  stepData: stepSlice,
  [userApi.reducerPath]: userApi.reducer,
});
const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat([userApi.middleware]),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
