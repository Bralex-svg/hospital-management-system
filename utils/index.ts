import { v4 } from "uuid";
import PatientModel from "../models/PatientModel";
import UserModel from "../models/UserModel";

export function generateId() {
  const idParts = v4().toString().split("-");
  let id = "";
  idParts.forEach((i) => {
    id += i;
  });

  return id;
}

export function getUserById(
  users: UserModel[],
  userId: string
): UserModel | null {
  const user = users.find((u) => u.userId === userId);
  return user ? user : null;
}

export function getPatientById(
  patients: PatientModel[],
  patientId: string
): PatientModel | null {
  const patient = patients.find((p) => p.patientId === patientId);
  return patient ? patient : null;
}
