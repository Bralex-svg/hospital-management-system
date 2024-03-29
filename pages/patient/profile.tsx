import { Divider, IconButton, Stack, TableRow } from "@mui/material";
import Typography from "@mui/material/Typography";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { BiRefresh } from "react-icons/bi";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { PrimaryShades } from "../../constants/Colors";
import { MedicalRecordsTableHeader } from "../../data/TableHeaders";
import { RecordsThunk, RecordThunk } from "../../functions";
import ApiRoutes from "../../routes/ApiRoutes";
import { CustomTableCell, NoDataView } from "../../shared";
import {
  CustomIconButton,
  PatientSidebar,
  TableTemplate,
  ViewMedicalDetailsModal,
} from "../../views";
import { FcReading } from "react-icons/fc";
import RecordModel from "../../models/RecordModel";
export default function Profile() {
  const dispatch = useAppDispatch();
  const { patient } = useAppSelector((state) => state.PatientReducer);
  const { records } = useAppSelector((state) => state.RecordReducer);
  const [medicalFile, setMedicalFile] = useState<RecordModel | null>(null);

  function getRecords() {
    dispatch(
      RecordsThunk({
        token: patient?.token,
        method: "get",
        url: ApiRoutes.record.patientRecord(patient ? patient.patientId : ""),
      })
    );
  }

  useEffect(() => {
    getRecords();
  }, []);
  return (
    <Stack width="100%" height="100%">
      {medicalFile && (
        <ViewMedicalDetailsModal
          record={medicalFile}
          open={Boolean(medicalFile)}
          handleClose={() => setMedicalFile(null)}
        />
      )}
      <Stack direction="row">
        <PatientSidebar />
        <Stack width="100%">
          <Stack
            direction="row"
            width="100$"
            alignItems="center"
            justifyContent="flex-end"
            padding={1}
          >
            <Typography variant="body1" color="primary">
              Medical History
            </Typography>
            <Stack flex={1} />
            <CustomIconButton
              handleClick={getRecords}
              Icon={BiRefresh}
              title="Refresh"
              variant="outlined"
            />
          </Stack>
          <Divider />
          <Stack padding={2}>
            {records && records.length > 0 && (
              <TableTemplate header={MedicalRecordsTableHeader}>
                {records.map((r, i) => {
                  return (
                    <TableRow>
                      <CustomTableCell>{i + 1}</CustomTableCell>
                      <CustomTableCell>{r.recordId}</CustomTableCell>
                      <CustomTableCell>
                        {dayjs(r.createdAt).format("dd, DD/MM/YYYY")}
                      </CustomTableCell>
                      <CustomTableCell>{r.duration}</CustomTableCell>
                      <CustomTableCell>{r.statements.length}</CustomTableCell>
                      <CustomTableCell>
                        <CustomIconButton
                          handleClick={() =>
                            dispatch(
                              RecordThunk({
                                url: `record/patient/${r.patientId}/${
                                  r.recordId
                                }/${r.status === "open" ? "closed" : "open"}`,
                                method: "put",
                                token: patient?.token,
                              })
                            )
                          }
                          title={r.status === "open" ? "Close" : "Open"}
                          variant="outlined"
                          size="xsmall"
                        />
                      </CustomTableCell>
                      <CustomTableCell>
                        <IconButton
                          onClick={() => {
                            setMedicalFile(r);
                          }}
                          size="small"
                        >
                          <FcReading />
                        </IconButton>
                      </CustomTableCell>
                    </TableRow>
                  );
                })}
              </TableTemplate>
            )}
            {!records ||
              (records.length <= 0 && (
                <NoDataView text="No Medical Records Found!" />
              ))}
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
}
