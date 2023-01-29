import PatientModel from "../models/PatientModel";
import RecordModel from "../models/RecordModel";
import UserModel from "../models/UserModel";

export interface IAppReducerState {
  feed: boolean;
}

export interface IUserReducerState {
  user: UserModel | null;
  users: UserModel[];
}

export interface IResponseReducerState {
  loading: boolean;
  message: any;
  error: any;
}

export interface IPatientReducerState {
  patient: PatientModel | null;
  patients: PatientModel[];
}

export interface IRecordReducerState {
  record: RecordModel | null;
  records: RecordModel[];
  patient: PatientModel | null;
}
