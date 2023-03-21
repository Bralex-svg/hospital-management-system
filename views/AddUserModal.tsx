import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import InputGroup from "../components/InputGroup";
import { IconButton, InputAdornment, Stack } from "@mui/material";
import { PrimaryButton } from "../components";
import { CustomDatePicker } from "../shared";
import Typography from "@mui/material/Typography";
import { IoMdClose } from "react-icons/io";
import MenuItem from "@mui/material/MenuItem";
import { CreatePatientDto } from "../models/PatientModel";
import GenderData from "../data/Gender";
import { Gender } from "../enum/Gender";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { PatientThunk } from "../functions";
import ApiRoutes from "../routes/ApiRoutes";
import controller from "../controller";
import ResponseModel from "../models/ResponseModel";
import UserModel, { CreateUserDto } from "../models/UserModel";
import {
  errorResponse,
  pendingResponse,
  successResponse,
} from "../features/ResponseReducer";
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
}
export default function AddPatientModal({ open, handleClose }: IProps) {
  const { error } = useAppSelector((state) => state.ResponseReducer);
  const [info, setInfo] = useState<CreateUserDto>({
    phoneNumber: "",
    password: "",
    email: "",
    firstName: "",
    lastName: "",
    userType: "",
  });
  async function handleRegister() {
    try {
      dispatch(pendingResponse());
      const res = await controller<ResponseModel<UserModel>>({
        data: { ...info, password: info.phoneNumber },
        url: ApiRoutes.auth.register,
        method: "post",
      });
      dispatch(successResponse(res.message));
    } catch (error) {
      dispatch(errorResponse(error));
    }
  }

  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.UserReducer);
  const { message } = useAppSelector((state) => state.ResponseReducer);
  function handleAddPatient() {
    dispatch(
      PatientThunk({
        data: info,
        url: ApiRoutes.patient.add,
        token: user?.token,
        method: "post",
      })
    );
  }
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
          <Typography variant="body1">Add User</Typography>
          <IconButton onClick={handleClose} size="medium">
            <IoMdClose />
          </IconButton>
        </Stack>
      </DialogTitle>
      <DialogContent dividers>
        <Stack alignItems="center" justifyContent="center" spacing={2}>
          <Stack
            width="600px"
            padding={4}
            boxShadow={(theme) =>
              `5px 5px 5px ${theme.palette.action.disabledBackground}`
            }
            borderRadius={(theme) => theme.spacing(0.5)}
            bgcolor={(theme) => theme.palette.background.paper}
            spacing={1.5}
            minHeight="200px"
            sx={(theme) => ({
              [theme.breakpoints.down("sm")]: {
                width: "80%",
              },
            })}
          >
            <InputGroup
              props={{ name: "firstname", type: "text" }}
              label="FirstName"
              placeholder="enter fistname"
              handleChange={(e) =>
                setInfo({ ...info, firstName: e.target.value })
              }
            />
            <InputGroup
              placeholder="enter lastname"
              props={{ name: "lastname", type: "text", autoComplete: "off" }}
              label="LastName"
              handleChange={(e) =>
                setInfo({ ...info, lastName: e.target.value })
              }
            />
            <InputGroup
              label="Email"
              props={{ name: "email", type: "email" }}
              placeholder="enter email address"
              handleChange={(e) => setInfo({ ...info, email: e.target.value })}
            />
            <InputGroup
              handleChange={(e) =>
                setInfo({ ...info, phoneNumber: e.target.value })
              }
              label="PhoneNumber"
              placeholder="enter phone number"
              props={{ type: "tel" }}
            />

            <InputGroup
              handleChange={(e) =>
                setInfo({ ...info, userType: e.target.value })
              }
              label="User Type"
              props={{ select: true }}
            >
              {[
                "Doctor",
                "Nurse",
                "Pharmacist",
                "Accountant",
                "LabTechnician",
                "Cleaner",
                "Electrician",
                "Designer",
                "Physician",
                "Others",
              ].map((userType) => (
                <MenuItem value={userType} key={userType}>
                  {userType}
                </MenuItem>
              ))}
            </InputGroup>

            <PrimaryButton title="Sign Up" handleClick={handleRegister} />
          </Stack>
          {error && (
            <Typography variant="body1" color="error" fontWeight="bold">
              {error}
            </Typography>
          )}
        </Stack>
        {message && (
          <Typography
            textAlign="center"
            fontWeight="bold"
            variant="body1"
            color="success"
          >
            {message}
          </Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Stack padding={2}>
          <PrimaryButton handleClick={handleAddPatient} title="Save Patient" />
        </Stack>
      </DialogActions>
    </Dialog>
  );
}
