import { PermissionType } from "../enum/PermissionType";

export default interface RecordPermissionModel {
  status: boolean;
  documentId: string;
  permissionType: PermissionType;
  userId: string;
  note: string;
  id:string
}
