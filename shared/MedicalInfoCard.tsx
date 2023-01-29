import { Divider, Stack, Typography } from "@mui/material";
import React from "react";
import { MedicalStatement } from "../models/RecordModel";

interface IProps {
  info: MedicalStatement;
}
export default function MedicalInfoCard({ info }: IProps) {
  return (
    <Stack>
      <Typography variant="body1">
        {info.title ? info.title.toUpperCase() : ""}
      </Typography>
      <Stack
        padding={(theme) => theme.spacing(1)}
        boxShadow={(theme) => theme.shadows[1]}
        marginY={0.5}
      >
        <Typography color="primary" variant="caption">
          Patient Statement
        </Typography>
        <Divider />
        <Typography variant="body2">{info.patientStatement}</Typography>
        <Stack marginY={0.5} />
        <Typography color="primary" variant="caption">
          Diagnosis and Findings
        </Typography>
        <Divider />
        <Stack marginY={0.5} />
        <Typography variant="body2">{info.diagnosisAndFindings}</Typography>
        <Stack marginY={0.5} />
        <Typography color="primary" variant="caption">
          Suggestions and Conclusions
        </Typography>
        <Divider />
        <Typography variant="body2">
          {info.suggestionsAndConclusions}
        </Typography>
        <Divider />
        <Stack direction="row" padding={0.5} width="100%">
          <Typography color="secondary" variant="body2">
            {info.userType}
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
}
