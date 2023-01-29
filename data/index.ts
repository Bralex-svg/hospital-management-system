import { IUserRole, IUserType } from "../interface";

export const UserRoles: IUserRole[] = [
  { title: "Admin", value: "admin" },
  { title: "User", value: "user" },
];

export const UserTypesData: IUserType[] = [
  { title: "Doctor", value: "doctor" },
  { title: "Nurse", value: "nurse" },
  { title: "Pharmacist", value: "pharmacist" },
  { title: "LabTechnician", value: "labTechnician" },
  { title: "Casual", value: "casual" },
  { title: "Others", value: "others" },
];
