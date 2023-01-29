import { createSlice } from "@reduxjs/toolkit";
import { UserReducerState } from "../app/state";
import { AuthThunk, UsersThunk } from "../functions";

const UserReducer = createSlice({
  name: "UserReducer",
  initialState: UserReducerState,
  reducers: {
    userLogout: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(AuthThunk.fulfilled, (state, action) => {
        state.user = action.payload.data;
      })
      .addCase(UsersThunk.fulfilled, (state, action) => {
        state.users = action.payload.data;
      });
  },
});

export default UserReducer.reducer;
export const { userLogout } = UserReducer.actions;
