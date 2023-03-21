import {
  Checkbox,
  Divider,
  IconButton,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { AiOutlineCloudUpload, AiOutlineEdit } from "react-icons/ai";
import { BsCheck2Circle } from "react-icons/bs";
import { IoMdClose } from "react-icons/io";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import InputGroup from "../components/InputGroup";
import { currency } from "../constants";
import controller from "../controller";
import { setPatient, setRecord } from "../features/RecordReducer";
import {
  errorResponse,
  pendingResponse,
  successResponse,
} from "../features/ResponseReducer";
import PatientModel from "../models/PatientModel";
import RecordModel, { MedicalStatement } from "../models/RecordModel";
import ResponseModel from "../models/ResponseModel";
import ApiRoutes from "../routes/ApiRoutes";

interface IProps {
  info: MedicalStatement;
  handlePaymentUpdate: () => void;
  patientId: string;
  recordId: string;
  isEdit?: boolean;
}
export default function MedicalInfoCard({
  info,
  handlePaymentUpdate,
  patientId,
  recordId,
  isEdit,
}: IProps) {
  const { user } = useAppSelector((state) => state.UserReducer);
  const [edit, setEdit] = useState<boolean>(false);
  const [data, setData] = useState<MedicalStatement>({ ...info });
  const dispatch = useAppDispatch();
  const [resMessage, setResMessage] = useState<string>("");
  async function updateMedicalStatement() {
    try {
      dispatch(pendingResponse());
      var res = await controller<
        ResponseModel<{ record: RecordModel; patient: PatientModel }>
      >({
        method: "put",
        url: ApiRoutes.record.updateStatement(`${patientId}/${recordId}`),
        token: user?.token,
        data,
      });
      setResMessage(res.message);
      dispatch(setRecord(res.data.record));
      dispatch(setPatient(res.data.patient));
      dispatch(successResponse(""));
    } catch (error) {
      dispatch(errorResponse(error));
    }
  }

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
        <Stack
          direction="row"
          width="100%"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography color="primary" variant="caption">
            Patient Statement
          </Typography>

          {isEdit && (
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="flex-end"
            >
              {!edit && (
                <IconButton onClick={() => setEdit(true)} size="small">
                  <AiOutlineEdit />
                </IconButton>
              )}
              {edit && (
                <>
                  <IconButton onClick={() => setEdit(false)} size="small">
                    <IoMdClose color="firebrick" fontSize="small" />
                  </IconButton>
                  {edit && info !== data && (
                    <IconButton size="small">
                      <AiOutlineCloudUpload
                        onClick={updateMedicalStatement}
                        fontSize="small"
                        color="seagreen"
                      />
                    </IconButton>
                  )}
                </>
              )}
            </Stack>
          )}
        </Stack>
        <Divider />
        <Typography variant="body2">{info.patientStatement}</Typography>
        <Stack marginY={0.5} />
        <Typography color="primary" variant="caption">
          Diagnosis and Findings
        </Typography>
        <Divider />
        <Stack marginY={0.5} />
        {!edit && (
          <Typography variant="body2">{info.diagnosisAndFindings}</Typography>
        )}
        {edit && (
          <InputGroup
            handleChange={(e) =>
              setData({ ...data, diagnosisAndFindings: e.target.value })
            }
            props={{ multiline: true, value: data.diagnosisAndFindings }}
          />
        )}
        <Stack marginY={0.5} />
        <Typography color="primary" variant="caption">
          Suggestions and Conclusions
        </Typography>
        <Divider />
        {!edit && (
          <Typography variant="body2">
            {info.suggestionsAndConclusions}
          </Typography>
        )}
        {edit && (
          <InputGroup
            handleChange={(e) =>
              setData({ ...data, suggestionsAndConclusions: e.target.value })
            }
            props={{ multiline: true, value: data.suggestionsAndConclusions }}
          />
        )}
        <Divider />
        {edit && (
          <Stack
            alignItems="center"
            justifyContent="center"
            spacing={1}
            direction="row"
            width="100%"
            marginY={1}
          >
            <InputGroup
              props={{
                fullWidth: true,
                size: "small",
                sx: (theme) => ({
                  flex: 1,
                }),
                value:
                  data.medicalCost !== 0 ? data.medicalCost.toString() : "",
                type: "number",
              }}
              label="Medical Charge"
              placeholder="enter medical charge"
              handleChange={(e) => {
                if (!isNaN(parseFloat(e.target.value))) {
                  setData({
                    ...data,
                    medicalCost: parseFloat(e.target.value),
                  });
                }
              }}
            />
            <InputGroup
              props={{
                fullWidth: true,
                size: "small",
                sx: (theme) => ({
                  flex: 1,
                }),
                value:
                  data.medicalCost !== 0 ? data.medicalCost.toString() : "",
                type: "number",
              }}
              label="Amount Paid"
              placeholder="enter amount paid"
              handleChange={(e) => {
                if (!isNaN(parseFloat(e.target.value))) {
                  setData({
                    ...data,
                    medicalCost: parseFloat(e.target.value),
                  });
                }
              }}
            />
            <Stack
              alignItems="center"
              justifyContent="flex-start"
              direction="row"
              spacing={1}
              sx={(theme) => ({
                flex: 1,
                paddingTop: "15px",
              })}
            >
              <Checkbox
                checked={data.paid}
                onChange={() => setData({ ...data, paid: !info.paid })}
              />
              <Typography variant="caption">Paid</Typography>
            </Stack>
          </Stack>
        )}
        {edit && resMessage && (
          <MenuItem
            sx={{ padding: 0, fontSize: "11px", color: "seagreen" }}
            onClick={() => setResMessage("")}
          >
            {resMessage}
          </MenuItem>
        )}
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

          {!edit && (
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

              {!info.paid && user && user.userId === info.userId && (
                <IconButton
                  onClick={handlePaymentUpdate}
                  color="primary"
                  size="small"
                >
                  <BsCheck2Circle />
                </IconButton>
              )}
            </Stack>
          )}
        </Stack>
      </Stack>
    </Stack>
  );
}
