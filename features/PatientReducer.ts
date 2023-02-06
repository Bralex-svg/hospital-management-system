import { createSlice } from "@reduxjs/toolkit";
import { PatientReducerState } from "../app/state";
import { PatientsThunk, PatientThunk } from "../functions";
import PatientModel from "../models/PatientModel";

const PatientReducer = createSlice({
  name: "PatientReducer",
  initialState: PatientReducerState,
  reducers: {
    patientLogout: (state) => {
      state.patient = null;
    },
    setPatient: (state, action: { payload: PatientModel }) => {
      state.patient = action.payload;
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

export const { patientLogout, setPatient } = PatientReducer.actions;
export default PatientReducer.reducer;
