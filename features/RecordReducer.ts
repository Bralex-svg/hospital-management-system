import { createSlice } from "@reduxjs/toolkit";
import { RecordReducerState } from "../app/state";
import { RecordsThunk, RecordThunk } from "../functions";
import PatientModel from "../models/PatientModel";
import RecordModel from "../models/RecordModel";

const RecordReducer = createSlice({
  name: "RecordReducer",
  initialState: RecordReducerState,
  reducers: {
    setRecord: (state, action: { payload: RecordModel }) => {
      state.record = action.payload;
    },
    setPatient: (state, action: { payload: PatientModel }) => {
      state.patient = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(RecordThunk.fulfilled, (state, action) => {
        state.record = action.payload.data.record;
        state.patient = action.payload.data.patient;
      })
      .addCase(RecordsThunk.fulfilled, (state, action) => {
        state.records = action.payload.data;
      });
  },
});

export const { setRecord, setPatient } = RecordReducer.actions;
export default RecordReducer.reducer;
