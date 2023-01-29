import { combineReducers } from "@reduxjs/toolkit";
import {
  ResponseReducer,
  UserReducer,
  PatientReducer,
  RecordReducer,
} from "../features";

////
export default combineReducers({
  ResponseReducer,
  UserReducer,
  PatientReducer,
  RecordReducer,
});
