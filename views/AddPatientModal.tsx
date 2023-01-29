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
import { IconButton, Stack } from "@mui/material";
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
  const [info, setInfo] = useState<CreatePatientDto>({
    firstName: "",
    lastName: "",
    contact: "",
    gender: Gender.Male,
    address: "",
    dateOfBirth: "",
  });

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
          <Typography variant="body1">Add Patient</Typography>
          <IconButton onClick={handleClose} size="medium">
            <IoMdClose />
          </IconButton>
        </Stack>
      </DialogTitle>
      <DialogContent dividers>
        <Stack spacing={1}>
          <InputGroup
            handleChange={(e) =>
              setInfo({ ...info, firstName: e.target.value })
            }
            label="First Name"
            placeholder="enter fistname"
            props={{ value: info.firstName }}
          />
          <InputGroup
            handleChange={(e) => setInfo({ ...info, lastName: e.target.value })}
            label="Last Name"
            placeholder="enter last name"
            props={{ value: info.lastName }}
          />
          <InputGroup
            label="Contact/PhoneNumber"
            placeholder="contact or phone number"
            handleChange={(e) => setInfo({ ...info, contact: e.target.value })}
            props={{ value: info.contact }}
          />
          <InputGroup
            handleChange={(e) => setInfo({ ...info, address: e.target.value })}
            label="Address"
            placeholder="enter address"
            props={{ value: info.address }}
          />

          <InputGroup
            label="Gender"
            placeholder="select gender"
            props={{ value: info.gender, select: true }}
            handleChange={(e) =>
              setInfo({ ...info, gender: e.target.value as Gender })
            }
          >
            {GenderData.map((gender) => (
              <MenuItem key={gender.value} value={gender.value}>
                {gender.title}
              </MenuItem>
            ))}
          </InputGroup>

          <Stack />
          <CustomDatePicker
            handleChange={(e) => setInfo({ ...info, dateOfBirth: e })}
            placeholder="Date Of Birth"
          />
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
