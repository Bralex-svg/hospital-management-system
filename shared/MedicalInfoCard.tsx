import { Divider, IconButton, Stack, Typography } from "@mui/material";
import React from "react";
import { BsCheck2Circle } from "react-icons/bs";
import { useAppSelector } from "../app/hooks";
import { currency } from "../constants";
import { MedicalStatement } from "../models/RecordModel";

interface IProps {
  info: MedicalStatement;
  handlePaymentUpdate: () => void;
}
export default function MedicalInfoCard({ info, handlePaymentUpdate }: IProps) {
  const { user } = useAppSelector((state) => state.UserReducer);
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
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          padding={0.5}
          width="100%"
        >
          <Typography color="secondary" variant="body2">
            {info.userType.toUpperCase()}
          </Typography>
          <Stack direction="row" alignItems="center" justifyContent="center">
            <small style={{ marginRight: "8px" }}>charge:</small>
            <Typography
              color={info.paid ? "green" : "error"}
              variant="caption"
              sx={(theme) => ({
                marginTop: "5px",
              })}
            >
              {`${currency}${info.medicalCost}`}
            </Typography>

            {!info.paid && user.userId === info.userId && (
              <IconButton
                onClick={handlePaymentUpdate}
                color="primary"
                size="small"
              >
                <BsCheck2Circle />
              </IconButton>
            )}
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
}
