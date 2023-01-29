import {
  IAppReducerState,
  IPatientReducerState,
  IRecordReducerState,
  IResponseReducerState,
  IUserReducerState,
} from "./Istate";

export const AppReducerState: IAppReducerState = {
  feed: false,
};

export const UserReducerState: IUserReducerState = {
  user: null,
  users: [],
};

export const ResponseReducerState: IResponseReducerState = {
  loading: false,
  message: null,
  error: null,
};

export const PatientReducerState: IPatientReducerState = {
  patient: null,
  patients: [],
};

export const RecordReducerState: IRecordReducerState = {
  record: null,
  records: [],
  patient: null,
};
