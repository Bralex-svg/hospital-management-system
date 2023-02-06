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
import { RecordThunk } from "../functions";
import ApiRoutes from "../routes/ApiRoutes";
import RecordModel, {
  MedicalStatement,
  RecordRequestModel,
} from "../models/RecordModel";
import { generateId, getUserById } from "../utils";
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
import UserModel from "../models/UserModel";

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
  permission: RecordPermissionModel;
}
export default function ReviewPermissions({
  handleClose,
  open,
  permission,
}: IProps) {
  const dispatch = useAppDispatch();
  const { users } = useAppSelector((state) => state.UserReducer);
  const { patient } = useAppSelector((state) => state.PatientReducer);
  const [user, setUser] = useState<UserModel | null>(null);

  ///
  async function handleRequest() {
    try {
      dispatch(pendingResponse());
      const res = await controller<ResponseModel<string>>({
        data: { ...permission, status: !permission.status },
        url: ApiRoutes.patient.recordPermissionUpdate(
          patient ? patient.patientId : ""
        ),
        token: patient.token,
        method: "put",
      });
      dispatch(successResponse(res.message));
    } catch (error) {
      dispatch(errorResponse(error));
    }
  }

  async function handleDeleteRequest() {
    try {
      dispatch(pendingResponse());
      const res = await controller<ResponseModel<string>>({
        data: { ...permission, status: !permission.status },
        url: ApiRoutes.patient.recordPermissionRemove(
          patient ? patient.patientId : ""
        ),
        token: patient.token,
        method: "put",
      });
      dispatch(successResponse(res.message));
    } catch (error) {
      dispatch(errorResponse(error));
    }
  }

  useEffect(() => {
    setUser(getUserById(users, permission.userId));
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
        <Stack spacing={1} flex={1} padding={(theme) => theme.spacing(1, 0)}>
          <InputGroup
            label="Personnel Name"
            props={{ value: user?.firstName + " " + user?.lastName }}
          />
          <InputGroup
            label="Personnel Type"
            props={{ value: user?.userType.toUpperCase() }}
          />

          <InputGroup
            label="Permission Type"
            props={{ value: permission.permissionType.toUpperCase() }}
          />
          <Divider />

          <Stack spacing={1} direction="row">
            <PrimaryButton
              handleClick={handleRequest}
              title="Approve Request"
              props={{ disabled: permission.status }}
            />{" "}
            <PrimaryButton
              props={{ color: "secondary" }}
              handleClick={handleDeleteRequest}
              title="Delete Request"
            />
          </Stack>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
