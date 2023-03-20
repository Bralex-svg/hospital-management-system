/* eslint-disable import/no-anonymous-default-export */

export default {
  auth: {
    loging: "auth/login",
    register: "auth/register",
    authenticate: "auth/authenticate",
    users: "auth/users",
    allUsers: "auth/users/all",
    updateRole: "auth/user/role",
    updateUserType: "auth/user/type",
    patientLogin: "auth/patient/login",
    patientProfile: (patientId: string) => `auth/patient/profile/${patientId}`,
    patientAuthenticate: "auth/patient/authenticate",
  },
  patient: {
    add: "patient",
    getAll: "patient",
    update: (patientId: string) => `patient/${patientId}`,
    get: (patientId: string) => `patient/${patientId}`,
    delete: (patientId: string) => `patient/${patientId}`,
    recordPermissionGrant: (patientId: string) =>
      `patient/record/permission/grant/${patientId}`,
    recordPermissionUpdate: (patientId: string) =>
      `patient/record/permission/update/${patientId}`,
    recordPermissionRemove: (patientId: string) =>
      `patient/record/permission/remove/${patientId}`,
  },
  record: {
    add: "record",
    getAll: "record",
    updateStatement: (path: string) => `record/statement/update/${path}`,
    delete: (patientId: string) => `record/${patientId}`,
    update: (recordId: string) => `record/${recordId}`,
    patientRecord: (patientId: string) => `record/patient/${patientId}`,
    active: (patientId: string) => `record/active/${patientId}`,
    requestRecords: (patientId: string) => `record/request/${patientId}`,
    userRecords: (userId: string) => `record/user/accessible/${userId}`,
  },
};
