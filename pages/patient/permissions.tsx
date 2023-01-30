import { Divider, IconButton, Stack, TableRow } from "@mui/material";
import React, { useEffect, useState } from "react";
import { BiRefresh } from "react-icons/bi";
import { MdOutlineRateReview } from "react-icons/md";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { PatientAuth } from "../../components";
import { MedicalRecordsPermissionHeader } from "../../data/TableHeaders";
import { PatientThunk, UsersThunk } from "../../functions";
import RecordPermissionModel from "../../models/RecordPermissionModel";
import ApiRoutes from "../../routes/ApiRoutes";
import { CustomIconButton, CustomTableCell, NoDataView } from "../../shared";
import { generateId, getUserById } from "../../utils";
import {
  PatientSidebar,
  ReviewPermissionModal,
  TableTemplate,
} from "../../views";

export default function permissions() {
  const { patient } = useAppSelector((state) => state.PatientReducer);
  const [permission, setPermission] = useState<RecordPermissionModel | null>(
    null
  );
  const dispatch = useAppDispatch();
  const { users } = useAppSelector((state) => state.UserReducer);

  function getUsers() {
    dispatch(
      UsersThunk({
        token: patient?.token,
        url: ApiRoutes.auth.allUsers,
        method: "get",
      })
    );
  }

  function handleRefresh() {
    dispatch(
      PatientThunk({
        url: ApiRoutes.auth.patientProfile(patient ? patient.patientId : ""),
        method: "get",
        token: patient?.token,
      })
    );
  }

  useEffect(() => {
    getUsers();
  }, []);
  return (
    <Stack>
      {permission && (
        <ReviewPermissionModal
          permission={permission}
          open={Boolean(permission)}
          handleClose={() => setPermission(null)}
        />
      )}
      <Stack direction="row">
        <PatientSidebar />
        <Stack width="100%" spacing={1.5} padding={2}>
          <Stack
            padding={1}
            direction="row"
            alignItems="center"
            justifyContent="flex-end"
            width="100%"
          >
            <CustomIconButton
              handleClick={handleRefresh}
              title="Refresh"
              Icon={BiRefresh}
            />
          </Stack>
          <Divider />
          {patient?.recordPermissions &&
          patient.recordPermissions.length > 0 ? (
            <TableTemplate header={MedicalRecordsPermissionHeader}>
              {patient.recordPermissions.map((p, i) => (
                <TableRow key={generateId()}>
                  <CustomTableCell>{i + 1}</CustomTableCell>
                  <CustomTableCell>{p.permissionType}</CustomTableCell>
                  <CustomTableCell>{p.documentId}</CustomTableCell>
                  <CustomTableCell>
                    {p.status ? "Approved" : "Pending"}
                  </CustomTableCell>
                  <CustomTableCell>
                    {getUserById(users, p.userId)?.firstName}
                  </CustomTableCell>
                  <CustomTableCell>
                    {getUserById(users, p.userId)?.userType.toUpperCase()}
                  </CustomTableCell>
                  <CustomTableCell>
                    <IconButton onClick={() => setPermission(p)} size="small">
                      <MdOutlineRateReview fontSize="small" />
                    </IconButton>
                  </CustomTableCell>
                </TableRow>
              ))}
            </TableTemplate>
          ) : (
            <NoDataView text="No Record Permissions" />
          )}
        </Stack>
      </Stack>
    </Stack>
  );
}
