import { Stack, Typography } from "@mui/material";
import dayjs from "dayjs";
import React from "react";
import PatientModel from "../models/PatientModel";

interface IProps {
  info: PatientModel;
}
export default function PatientInfoCard({ info }: IProps) {
  return (
    <Stack padding={0.5}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="flex-start"
        spacing={0.5}
      >
        <Typography variant="caption">Name:</Typography>
        <Typography variant="body2">
          {`${info.firstName} ${info.lastName}`}
        </Typography>
      </Stack>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="flex-start"
        spacing={0.5}
      >
        <Typography variant="caption">DateOfBirth:</Typography>
        <Typography variant="body2">
          {dayjs(info.dateOfBirth).format("DD/MM/YYYY")}
        </Typography>
      </Stack>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="flex-start"
        spacing={0.5}
      >
        <Typography variant="caption">Gender:</Typography>
        <Typography variant="body2">{info.gender}</Typography>
      </Stack>
    </Stack>
  );
}
