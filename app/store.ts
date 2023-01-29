import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import reducer from "./reducer";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["UserReducer", "PatientReducer"],
};

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV === "production",
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
