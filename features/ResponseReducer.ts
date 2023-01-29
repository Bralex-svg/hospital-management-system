import { createSlice } from "@reduxjs/toolkit";
import { ResponseReducerState } from "../app/state";
import {
  AuthThunk,
  PatientsThunk,
  PatientThunk,
  RecordsThunk,
  RecordThunk,
  UsersThunk,
} from "../functions";

const ResponseReducer = createSlice({
  name: "ResponseReducer",
  initialState: ResponseReducerState,
  reducers: {
    clearResponse: (state) => {
      state.error = null;
      state.loading = false;
      state.message = null;
    },
    pendingResponse: (state) => {
      state.loading = true;
      state.message = null;
      state.error = null;
    },
    errorResponse: (state, action) => {
      state.error = action.payload;
      state.message = null;
      state.loading = false;
    },
    successResponse: (state, action) => {
      state.error = null;
      state.loading = false;
      state.message = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(AuthThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(AuthThunk.fulfilled, (state, action) => {
        state.error = null;
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(AuthThunk.rejected, (state, action) => {
        state.error = action.error.message || action.payload;
        state.message = null;
        state.loading = false;
      })
      //
      .addCase(PatientThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(PatientThunk.fulfilled, (state, action) => {
        state.error = null;
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(PatientThunk.rejected, (state, action) => {
        state.error = action.error.message || action.payload;
        state.message = null;
        state.loading = false;
      })

      //
      .addCase(PatientsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(PatientsThunk.fulfilled, (state, action) => {
        state.error = null;
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(PatientsThunk.rejected, (state, action) => {
        state.error = action.error.message || action.payload;
        state.message = null;
        state.loading = false;
      })
      //
      .addCase(RecordsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(RecordsThunk.fulfilled, (state, action) => {
        state.error = null;
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(RecordsThunk.rejected, (state, action) => {
        state.error = action.error.message || action.payload;
        state.message = null;
        state.loading = false;
      })
      //
      .addCase(RecordThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(RecordThunk.fulfilled, (state, action) => {
        state.error = null;
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(RecordThunk.rejected, (state, action) => {
        state.error = action.error.message || action.payload;
        state.message = null;
        state.loading = false;
      })
      //
      .addCase(UsersThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(UsersThunk.fulfilled, (state, action) => {
        state.error = null;
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(UsersThunk.rejected, (state, action) => {
        state.error = action.error.message || action.payload;
        state.message = null;
        state.loading = false;
      });
  },
});

export default ResponseReducer.reducer;
export const {
  clearResponse,
  successResponse,
  errorResponse,
  pendingResponse,
} = ResponseReducer.actions;
