import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { Checkbox, IconButton, Stack, Typography } from "@mui/material";
import { IoMdClose } from "react-icons/io";
import { PrimaryButton } from "../components";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import InputGroup from "../components/InputGroup";

import Divider from "@mui/material/Divider";
import { useRouter } from "next/router";

import { Menu, MenuItem } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
import InputLabel from "@mui/material/InputLabel";
import Box from "@mui/material/Box";
import {
  MedicalInfoCard,
  NoDataView,
  PatientInfoCard,
  SearchInput,
} from "../shared";
import { RecordThunk } from "../functions";
import ApiRoutes from "../routes/ApiRoutes";
import { MedicalStatement } from "../models/RecordModel";
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
}
export default function AddMedicalInfoModal({ handleClose, open }: IProps) {
  const { message } = useAppSelector((state) => state.ResponseReducer);
  const { record, patient } = useAppSelector((state) => state.RecordReducer);
  //   const { patient } = useAppSelector((state) => state.PatientReducer);
  const [info, setInfo] = useState<MedicalStatement>({
    patientStatement: "",
    diagnosisAndFindings: "",
    suggestionsAndConclusions: "",
    userId: "",
    userType: "",
    id: "",
    title: "",
    paid: false,
    medicalCost: 0,
  });
  const { user } = useAppSelector((state) => state.UserReducer);
  const dispatch = useAppDispatch();
  const [patientId, setPatientId] = useState<string>("");
  function handleAddMedicalInfo() {
    if (record) {
      info.id = generateId();
      dispatch(
        RecordThunk({
          data: {
            statements: [
              ...record.statements,
              {
                ...info,
                userId: user?.userId,
                userType: user?.userType,
              },
            ],
            patientId: patient?.patientId,
            status: record.status,
            duration: record.duration,
          },
          method: "put",
          url: ApiRoutes.record.update(record.recordId),
          token: user?.token,
        })
      );
    } else {
      info.id = generateId();
      dispatch(
        RecordThunk({
          data: {
            statements: [
              {
                ...info,
                userId: user?.userId,
                userType: user?.userType,
              },
            ],
            patientId: patient?.patientId,
            status: RecordStatus.Open,
            duration: 1,
          },
          method: "post",
          url: ApiRoutes.record.add,
          token: user?.token,
        })
      );
    }
    setInfo({
      patientStatement: "",
      diagnosisAndFindings: "",
      suggestionsAndConclusions: "",
      userId: "",
      userType: "",
      id: "",
      title: "",
      paid: false,
      medicalCost: 0,
    });
  }

  function handleUpdatePaymentStatus(recordId: string, paid: boolean) {
    dispatch(
      RecordThunk({
        data: {
          statements: record.statements.map((rs) => {
            if (rs.id === recordId) {
              return {
                ...rs,
                paid,
              };
            } else {
              return rs;
            }
          }),
          patientId: patient?.patientId,
          status: record.status,
          duration: record.duration,
        },
        method: "put",
        url: ApiRoutes.record.update(record.recordId),
        token: user?.token,
      })
    );
  }

  function handleGetPatientRecord() {
    dispatch(
      RecordThunk({
        url: ApiRoutes.record.active(patientId),
        method: "get",
        token: user?.token,
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
      maxWidth="lg"
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
            <Typography variant="body1">Add Medical Info</Typography>
            <Stack marginLeft={2} />
            <InputGroup
              handleChange={(e) => setPatientId(e.target.value)}
              placeholder="Enter Patient Id"
              props={{ value: patientId }}
            />
            <Stack marginX={1} />
            <Button
              onClick={handleGetPatientRecord}
              color="primary"
              variant="outlined"
              size="small"
            >
              Get
            </Button>
          </Stack>
          <IconButton onClick={handleClose} size="medium">
            <IoMdClose />
          </IconButton>
        </Stack>
      </DialogTitle>
      <DialogContent dividers>
        <Stack
          direction="row"
          width="100%"
          spacing={1}
          alignItems="center"
          height="550px"
        >
          <Stack
            overflow="hidden"
            height="100%"
            flex={1}
            padding={2}
            spacing={1}
          >
            <Stack
              position="sticky"
              bgcolor={(theme) => theme.palette.common.white}
              top={0}
            >
              <Typography variant="body1">Patient Details</Typography>
              <Divider />
            </Stack>
            <Stack overflow="hidden">
              {patient && <PatientInfoCard info={patient} />}
              <Divider />
              <Stack paddingTop={1.5} />
              <Stack overflow="hidden" spacing={1}>
                <Stack
                  position="sticky"
                  bgcolor={(theme) => theme.palette.common.white}
                  top={0}
                >
                  <Typography variant="body1">
                    Add Medical Information
                  </Typography>
                  <Divider />
                </Stack>
                <Stack
                  padding={(theme) => theme.spacing(1.5, 1)}
                  height="100%"
                  spacing={0.5}
                  overflow="auto"
                >
                  <InputGroup
                    handleChange={(e) =>
                      setInfo({ ...info, title: e.target.value })
                    }
                    label="Title"
                    placeholder="enter title "
                    props={{ value: info.title }}
                  />
                  <InputGroup
                    label="Patient Statement"
                    placeholder="enter patient statement"
                    props={{
                      multiline: true,
                      minRows: 2,
                      value: info.patientStatement,
                    }}
                    handleChange={(e) =>
                      setInfo({ ...info, patientStatement: e.target.value })
                    }
                  />

                  <InputGroup
                    label="Diagnosis and Findings"
                    placeholder="diagnosis and findings"
                    props={{
                      multiline: true,
                      minRows: 2,
                      value: info.diagnosisAndFindings,
                    }}
                    handleChange={(e) =>
                      setInfo({ ...info, diagnosisAndFindings: e.target.value })
                    }
                  />

                  <InputGroup
                    label="Suggestions and Conclusions"
                    placeholder="suggestions and conclusions"
                    props={{
                      multiline: true,
                      minRows: 2,
                      value: info.suggestionsAndConclusions,
                    }}
                    handleChange={(e) =>
                      setInfo({
                        ...info,
                        suggestionsAndConclusions: e.target.value,
                      })
                    }
                  />

                  <Stack
                    alignItems="center"
                    justifyContent="center"
                    spacing={1}
                    direction="row"
                    width="100%"
                  >
                    <InputGroup
                      props={{
                        fullWidth: true,
                        size: "small",
                        sx: (theme) => ({
                          flex: 1,
                        }),
                        value:
                          info.medicalCost !== 0
                            ? info.medicalCost.toString()
                            : "",
                        type: "number",
                      }}
                      label="Medical Charge"
                      placeholder="enter medical charge"
                      handleChange={(e) => {
                        if (!isNaN(parseFloat(e.target.value))) {
                          setInfo({
                            ...info,
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
                          info.medicalCost !== 0
                            ? info.medicalCost.toString()
                            : "",
                        type: "number",
                      }}
                      label="Amount Paid"
                      placeholder="enter amount paid"
                      handleChange={(e) => {
                        if (!isNaN(parseFloat(e.target.value))) {
                          setInfo({
                            ...info,
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
                        checked={info.paid}
                        onChange={() => setInfo({ ...info, paid: !info.paid })}
                      />
                      <Typography variant="caption">Paid</Typography>
                    </Stack>
                  </Stack>
                </Stack>
                <Box sx={{ minWidth: 50 }}>
                  <FormControl fullWidth>
                    <InputLabel
                      variant="standard"
                      htmlFor="uncontrolled-native"
                    >
                      Issue
                    </InputLabel>
                    <NativeSelect
                      defaultValue={30}
                      inputProps={{
                        name: "age",
                        id: "uncontrolled-native",
                      }}
                    >
                      <option value={10}>Yes</option>
                      <option value={20}>No</option>
                    </NativeSelect>
                  </FormControl>
                </Box>

                <PrimaryButton
                  handleClick={handleAddMedicalInfo}
                  title="Save Medical Report"
                />
              </Stack>
            </Stack>
          </Stack>
          <Stack
            position="relative"
            height="100%"
            flex={1}
            padding={2}
            spacing={1}
            overflow="hidden"
          >
            <Stack
              position="sticky"
              bgcolor={(theme) => theme.palette.common.white}
              top={0}
            >
              <Typography variant="body1">Medical Information</Typography>
              <Divider />
            </Stack>
            <Stack overflow="auto" padding={1.5}>
              {record &&
                record.statements.length > 0 &&
                record.statements.map((statement) => (
                  <MedicalInfoCard
                    handlePaymentUpdate={() =>
                      handleUpdatePaymentStatus(statement.id, !statement.paid)
                    }
                    patientId={patientId}
                    recordId={record.recordId}
                    isEdit
                    key={statement.id}
                    info={statement}
                  />
                ))}
              {!record && <NoDataView text="No Medical Details" />}
            </Stack>
          </Stack>
        </Stack>
      </DialogContent>
      <DialogActions>
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
        <Stack flex={1} />
        <Stack padding={1}></Stack>
      </DialogActions>
    </Dialog>
  );
}
