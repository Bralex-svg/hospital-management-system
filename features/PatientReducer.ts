import { createSlice } from "@reduxjs/toolkit";
import { PatientReducerState } from "../app/state";
import { PatientsThunk, PatientThunk } from "../functions";

const PatientReducer = createSlice({
  name: "PatientReducer",
  initialState: PatientReducerState,
  reducers: {
    patientLogout: (state) => {
      state.patient = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(PatientThunk.fulfilled, (state, action) => {
        state.patient = action.payload.data;
      })
      .addCase(PatientsThunk.fulfilled, (state, action) => {
        state.patients = action.payload.data;
      });
  },
});

export const { patientLogout } = PatientReducer.actions;
export default PatientReducer.reducer;
