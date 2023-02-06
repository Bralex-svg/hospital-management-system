import { Gender } from "../enum/Gender";
import RecordPermissionModel from "./RecordPermissionModel";

export default interface PatientModel extends CreatePatientDto {
  _id: string;
  patientId: string;
  createdAt: string;
  updatedAt: string;
  email?: string;
  createdBy: string;
  token?: string;
  recordPermissions: RecordPermissionModel[];
}

export interface PatientRecordPermission {
  userId: string;
  permissionType: "single" | "all";
  documentId?: string;
  status: boolean;
}

export interface CreatePatientDto {
  firstName: string;
  lastName: string;
  address: string;
  contact: string;
  dateOfBirth: string;
  gender: Gender;
}

export interface UpdatePatientInfoDto {
  firstName: string;
  lastName: string;
  address: string;
  contact: string;
  dateOfBirth: string;
  email: string;
}

export interface PatientLoginDto {
  patientId: string;
  password: string;
}

export interface AuthenticatePatientDto {
  patientId: string;
  password: string;
  code: string;
}
