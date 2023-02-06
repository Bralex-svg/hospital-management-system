import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { IconButton, MenuItem, Stack, Typography } from "@mui/material";
import { IoMdClose } from "react-icons/io";
import { PrimaryButton } from "../components";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import InputGroup from "../components/InputGroup";
import Divider from "@mui/material/Divider";
import { MedicalInfoCard, NoDataView } from "../shared";
import { PatientsThunk, RecordThunk } from "../functions";
import ApiRoutes from "../routes/ApiRoutes";
import RecordModel, {
  MedicalStatement,
  RecordRequestModel,
} from "../models/RecordModel";
import { generateId } from "../utils";
import { RecordStatus } from "../enum/RecordStatus";
import PatientModel from "../models/PatientModel";
import dayjs from "dayjs";
import {
  errorResponse,
  pendingResponse,
  successResponse,
} from "../features/ResponseReducer";
import controller from "../controller";
import ResponseModel from "../models/ResponseModel";
import { RecordPermissionTypes } from "../data";
import RecordPermissionModel from "../models/RecordPermissionModel";
import { PermissionType } from "../enum/PermissionType";
import { UserRole } from "../enum/UserRole";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface IProps {
  handleClose: () => void;
  open: boolean;
  patient: PatientModel;
}
export default function ManagePatientModal({
  handleClose,
  open,
  patient,
}: IProps) {
  const dispatch = useAppDispatch();
  const [records, setRecords] = useState<RecordRequestModel[]>([]);
  const { user } = useAppSelector((state) => state.UserReducer);
  const [permission, setPermission] = useState<RecordPermissionModel>({
    userId: "",
    documentId: "",
    permissionType: PermissionType.Single,
    status: false,
    note: "",
    id: "",
  });
  async function getPatientRecords() {
    try {
      dispatch(pendingResponse());
      const res = await controller<ResponseModel<RecordRequestModel[]>>({
        token: user?.token,
        url: ApiRoutes.record.requestRecords(patient.patientId),
        method: "get",
      });
      dispatch(successResponse(null));
      console.log(res.data);
      setRecords(res.data);
    } catch (error) {
      dispatch(errorResponse(error));
    }
  }

  async function handleRequest() {
    try {
      dispatch(pendingResponse());
      const res = await controller<ResponseModel<any>>({
        data: { ...permission, userId: user?.userId },
        url: ApiRoutes.patient.recordPermissionGrant(patient.patientId),
        token: user?.token,
        method: "put",
      });
      dispatch(successResponse(null));
    } catch (error) {
      dispatch(errorResponse(error));
    }
  }

  function handleDelete() {
    dispatch(
      PatientsThunk({
        url: ApiRoutes.patient.delete(patient.patientId),
        token: user?.token,
        method: "delete",
      })
    );
  }

  useEffect(() => {
    getPatientRecords();
  }, []);
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      aria-describedby="alert-dialog-slide-description"
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>
        <Stack
          direction="row"
          width="100%"
          alignItems="center"
          justifyContent="space-between"
        >
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="flex-start"
          >
            <Typography variant="body1">Manage Patient</Typography>
          </Stack>
          <IconButton onClick={handleClose} size="medium">
            <IoMdClose />
          </IconButton>
        </Stack>
      </DialogTitle>
      <DialogContent dividers>
        <Stack spacing={1} direction="row">
          <Stack
            padding={1}
            marginRight={(theme) =>
              `1px solid ${theme.palette.action.disabledBackground}`
            }
            flex={1}
          >
            <InputGroup
              label="Name"
              props={{ value: `${patient.firstName} ${patient.lastName}` }}
            />
            <InputGroup label="Contact" props={{ value: patient.contact }} />
            <InputGroup
              label="DateOfBirth"
              props={{
                value: dayjs(patient.dateOfBirth).format("dd,DD/MM/YYYY"),
              }}
            />
            <InputGroup label="Gender" props={{ value: patient.gender }} />
          </Stack>
          <Stack spacing={1} flex={1} padding={(theme) => theme.spacing(1, 0)}>
            <Typography variant="body1">Request Record Permission</Typography>
            <Divider />
            <InputGroup
              handleChange={(e) =>
                setPermission({ ...permission, documentId: e.target.value })
              }
              props={{ select: true }}
              label="Record"
            >
              {records.map((r) => (
                <MenuItem key={r.recordId} value={r.recordId}>
                  {`${r.date}`}
                </MenuItem>
              ))}
            </InputGroup>
            <InputGroup
              handleChange={(e) =>
                setPermission({
                  ...permission,
                  permissionType: e.target.value as any,
                })
              }
              label="Permission Type"
              props={{ select: true }}
            >
              {RecordPermissionTypes.map((rp) => (
                <MenuItem value={rp.value} key={rp.value}>
                  {rp.title}
                </MenuItem>
              ))}
            </InputGroup>
            <InputGroup
              handleChange={(e) =>
                setPermission({ ...permission, note: e.target.value })
              }
              label="Request Note/Description"
              props={{ multiline: true }}
            />
          </Stack>
        </Stack>
      </DialogContent>
      <DialogActions>
        <PrimaryButton
          props={{
            sx: (theme) => ({ bgcolor: theme.palette.error.main }),
            disabled: user ? !Boolean(user.role === UserRole.Admin) : false,
          }}
          handleClick={handleDelete}
          title="Delete Patient"
        />
        <PrimaryButton handleClick={handleRequest} title="Send Request" />
      </DialogActions>
    </Dialog>
  );
}
