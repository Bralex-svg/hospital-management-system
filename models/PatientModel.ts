import { Gender } from "../enum/Gender";

export default interface PatientModel extends CreatePatientDto {
  _id: string;
  patientId: string;
  createdAt: string;
  updatedAt: string;
  email?: string;
  createdBy: string;
  token?: string;
}

export interface CreatePatientDto {
  firstName: string;
  lastName: string;
  address: string;
  contact: string;
  dateOfBirth: string;
  gender: Gender;
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
