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
import { FcReading } from "react-icons/fc";
import { MdOutlineMoreVert, MdPlaylistAdd } from "react-icons/md";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import Sidebar from "../../components/Sidebar";
import Colors from "../../constants/Colors";
import controller from "../../controller";
import {
  MedicalRecordsTableHeader,
  PatientTableHeader,
} from "../../data/TableHeaders";
import {
  errorResponse,
  pendingResponse,
  successResponse,
} from "../../features/ResponseReducer";
import { PatientsThunk } from "../../functions";
import PatientModel from "../../models/PatientModel";
import RecordModel from "../../models/RecordModel";
import ResponseModel from "../../models/ResponseModel";
import ApiRoutes from "../../routes/ApiRoutes";
import {
  CustomIconButton,
  CustomTableCell,
  NoDataView,
  SearchInput,
} from "../../shared";
import {
  AddMedicalInfoModal,
  ManagePatientModal,
  TableTemplate,
  ViewMedicalDetailsModal,
} from "../../views";
import AddPatientModal from "../../views/AddPatientModal";

export default function MedicalRecords() {
  const { user } = useAppSelector((state) => state.UserReducer);
  const [records, setRecords] = useState<RecordModel[]>([]);
  const [medicalFile, setMedicalFile] = useState<RecordModel | null>(null);

  const dispatch = useAppDispatch();

  async function handleRecords() {
    try {
      dispatch(pendingResponse());
      const res = await controller<ResponseModel<RecordModel[]>>({
        token: user?.token,
        method: "get",
        url: ApiRoutes.record.userRecords(user ? user.userId : ""),
      });
      setRecords(res.data);
      dispatch(successResponse(res.message));
    } catch (error) {
      dispatch(errorResponse(error));
    }
  }

  useEffect(() => {
    handleRecords();
  }, []);

  return (
    <Stack height="100vh" width="100%" overflow="hidden">
      {medicalFile && (
        <ViewMedicalDetailsModal
          record={medicalFile}
          open={Boolean(medicalFile)}
          handleClose={() => setMedicalFile(null)}
        />
      )}
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
              handleClick={handleRecords}
              Icon={BiRefresh}
              title="Refresh"
            />
            <Stack flex={1} />
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
