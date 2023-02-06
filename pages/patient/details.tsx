import { Paper, Stack, TextField } from "@mui/material";
import dayjs from "dayjs";
import React from "react";
import { useAppSelector } from "../../app/hooks";
import InputGroup from "../../components/InputGroup";
import { PatientSidebar } from "../../views";

export default function details() {
  const { patient } = useAppSelector((state) => state.PatientReducer);
  return (
    <Stack width="100%">
      <Stack width="100%" direction="row">
        <PatientSidebar />
        <Stack padding={2} spacing={1.5} width="100%" alignItems="center">
          <Paper
            sx={(theme) => ({
              width: "100%",
            })}
          >
            <Stack padding={3} spacing={1}>
              <InputGroup
                props={{ value: patient?.patientId }}
                label="Patient Id"
              />

              <InputGroup
                props={{ value: patient?.firstName }}
                label="First Name"
              />
              <InputGroup
                props={{ value: patient?.lastName }}
                label="First Name"
              />
              <InputGroup
                props={{ value: patient?.email ? patient.email : "------" }}
                label="Email Address"
              />
              <InputGroup props={{ value: patient?.contact }} label="Contact" />
              <InputGroup
                props={{
                  value: dayjs(patient?.dateOfBirth).format("dd, DD/MM/YYYY"),
                }}
                label="Date Of Birth"
              />
              <InputGroup
                props={{
                  value: patient?.address ? patient?.address : "------",
                }}
                label="Address"
              />
            </Stack>
          </Paper>
        </Stack>
      </Stack>
    </Stack>
  );
}
