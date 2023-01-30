import ITableCell from "../interface/ITableCell";

export const PatientTableHeader: ITableCell[] = [
  { children: "No." },
  { children: "PatientId" },
  { children: "Name" },
  { children: "Date Of Birth" },
  { children: "Contact" },
  { children: "Date Attended" },
  { children: "More" },
];

export const UsersTableHeader: ITableCell[] = [
  { children: "No." },
  { children: "FirstName" },
  { children: "LastName" },
  { children: "PhoneNumber" },
  { children: "Email" },
  { children: "UserType" },
  { children: "UserRole" },
];

export const MedicalRecordsTableHeader: ITableCell[] = [
  { children: "No." },
  { children: "RecordId" },
  { children: "DateCreated" },
  { children: "ServiceDuration" },
  { children: "MedicalReports" },
  { children: "More" },
];

export const MedicalRecordsPermissionHeader: ITableCell[] = [
  { children: "No." },
  { children: "Permission Type" },
  { children: "Record Id" },
  { children: "Status" },
  { children: "User" },
  { children: "UserType" },
  { children: "More" },
];
