import { RecordStatus } from "../enum/RecordStatus";

export default interface RecordModel extends CreateRecordDto {
  _id: string;
  recordId: string;
  status: RecordStatus;
  createdAt: string;
}

export interface CreateRecordDto {
  statements: MedicalStatement[];
  status: string;
  duration: number;
  patientId: string;
}

export interface MedicalStatement {
  patientStatement: string;
  userId: string;
  userType: string;
  diagnosisAndFindings: string;
  suggestionsAndConclusions: string;
  id: string;
  title: string;
}

export interface RecordRequestModel {
  date: string;
  recordId: string;
}
