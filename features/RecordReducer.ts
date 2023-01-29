import { createSlice } from "@reduxjs/toolkit";
import { RecordReducerState } from "../app/state";
import { RecordsThunk, RecordThunk } from "../functions";

const RecordReducer = createSlice({
  name: "RecordReducer",
  initialState: RecordReducerState,
  reducers: {},
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

export const {} = RecordReducer.actions;
export default RecordReducer.reducer;
