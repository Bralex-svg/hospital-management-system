import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { IconButton, Stack, Typography } from "@mui/material";
import { IoMdClose } from "react-icons/io";
import { PrimaryButton } from "../components";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import InputGroup from "../components/InputGroup";
import Divider from "@mui/material/Divider";
import { MedicalInfoCard, NoDataView } from "../shared";
import { RecordThunk } from "../functions";
import ApiRoutes from "../routes/ApiRoutes";
import RecordModel, { MedicalStatement } from "../models/RecordModel";
import { generateId } from "../utils";
import { RecordStatus } from "../enum/RecordStatus";

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
  record: RecordModel;
}
export default function AddMedicalInfoModal({
  handleClose,
  open,
  record,
}: IProps) {
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      aria-describedby="alert-dialog-slide-description"
      fullWidth
      maxWidth="md"
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
            <Typography variant="body1">Medical Details</Typography>
          </Stack>
          <IconButton onClick={handleClose} size="medium">
            <IoMdClose />
          </IconButton>
        </Stack>
      </DialogTitle>
      <DialogContent dividers>
        <Stack padding={1} spacing={1}>
          {record &&
            record.statements.length > 0 &&
            record.statements.map((statement) => (
              <MedicalInfoCard key={statement.id} info={statement} />
            ))}
          {!record && <NoDataView text="No Medical Details" />}
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
