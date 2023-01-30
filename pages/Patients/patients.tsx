import {
  Divider,
  IconButton,
  Stack,
  Typography,
  TableRow,
} from "@mui/material";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { BiRefresh, BiUserPlus } from "react-icons/bi";
import { MdOutlineMoreVert, MdPlaylistAdd } from "react-icons/md";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import Sidebar from "../../components/Sidebar";
import Colors from "../../constants/Colors";
import { PatientTableHeader } from "../../data/TableHeaders";
import { PatientsThunk } from "../../functions";
import ApiRoutes from "../../routes/ApiRoutes";
import { CustomIconButton, CustomTableCell, SearchInput } from "../../shared";
import { AddMedicalInfoModal, TableTemplate } from "../../views";
import AddPatientModal from "../../views/AddPatientModal";

export default function Patients() {
  const { user } = useAppSelector((state) => state.UserReducer);
  const [addPatient, setAddPatient] = useState<boolean>(false);
  const [addMedical, setAddMedical] = useState<boolean>(false);
  const { patients } = useAppSelector((state) => state.PatientReducer);
  const dispatch = useAppDispatch();

  function handleGetPatients() {
    dispatch(
      PatientsThunk({
        url: ApiRoutes.patient.getAll,
        token: user.token,
        method: "get",
      })
    );
  }

  useEffect(() => {
    handleGetPatients();
  }, []);

  return (
    <Stack height="100vh" width="100%" overflow="hidden">
      <AddPatientModal
        handleClose={() => setAddPatient(false)}
        open={addPatient}
      />{" "}
      <AddMedicalInfoModal
        open={addMedical}
        handleClose={() => setAddMedical(false)}
      />
      <Stack direction="row">
        <Stack width="240px">
          <Sidebar />
        </Stack>
        <Stack height="100%" width="100%">
          <Stack
            direction="row"
            width="100%"
            alignItems="center"
            justifyContent="flex-end"
            spacing={1.5}
            padding={1}
          >
            <CustomIconButton
              handleClick={handleGetPatients}
              Icon={BiRefresh}
              title="Refresh"
            />
            <Stack flex={1} />
            <SearchInput />
            <CustomIconButton
              Icon={BiUserPlus}
              title="Add Patient"
              handleClick={() => setAddPatient(true)}
            />

            <CustomIconButton
              Icon={MdPlaylistAdd}
              title="Add Medical Info"
              handleClick={() => setAddMedical(true)}
            />
          </Stack>
          <Divider />
          <Stack padding={2}>
            <TableTemplate header={PatientTableHeader}>
              {patients.map((p, i) => (
                <TableRow
                  sx={(theme) => ({
                    bgcolor:
                      i % 2 === 0
                        ? theme.palette.common.white
                        : theme.palette.action.hover,
                  })}
                >
                  <CustomTableCell>{i + 1}</CustomTableCell>
                  <CustomTableCell>{p.patientId}</CustomTableCell>
                  <CustomTableCell>{`${p.firstName} ${p.lastName}`}</CustomTableCell>
                  <CustomTableCell>
                    {dayjs(p.dateOfBirth).format("DD/MM/YYYY")}
                  </CustomTableCell>
                  <CustomTableCell>{p.contact}</CustomTableCell>
                  <CustomTableCell>
                    {dayjs(p.createdAt).format("DD/MM/YYYY")}
                  </CustomTableCell>
                  <CustomTableCell>
                    <IconButton size="small">
                      <MdOutlineMoreVert />
                    </IconButton>
                  </CustomTableCell>
                </TableRow>
              ))}
            </TableTemplate>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
}
