import { Paper, Stack } from "@mui/material";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { PrimaryButton } from "../../../components";
import InputGroup from "../../../components/InputGroup";
import controller from "../../../controller";
import {
  errorResponse,
  pendingResponse,
  successResponse,
} from "../../../features/ResponseReducer";
import PatientModel, {
  UpdatePatientInfoDto,
} from "../../../models/PatientModel";
import ResponseModel from "../../../models/ResponseModel";
import { CustomDatePicker } from "../../../shared";
import { PatientSidebar } from "../../../views";
import ApiRoutes from "../../../routes/ApiRoutes";
import { setPatient } from "../../../features/PatientReducer";
export default function edit() {
  const { patient } = useAppSelector((state) => state.PatientReducer);
  const dispatch = useAppDispatch();
  const [info, setInfo] = useState<UpdatePatientInfoDto>({
    firstName: "",
    lastName: "",
    address: "",
    contact: "",
    dateOfBirth: "",
    email: "",
  });

  async function handleUpdate() {
    try {
      dispatch(pendingResponse());
      const res = await controller<ResponseModel<PatientModel>>({
        data: info,
        method: "put",
        url: ApiRoutes.patient.update(patient ? patient.patientId : ""),
        token: patient?.token,
      });
      dispatch(successResponse(res.message));
      dispatch(setPatient({ ...res.data, token: patient?.token }));
    } catch (error) {
      dispatch(errorResponse(error));
    }
  }

  useEffect(() => {
    if (patient) {
      setInfo({
        firstName: patient.firstName,
        lastName: patient.lastName,
        address: patient.address,
        dateOfBirth: patient.dateOfBirth,
        contact: patient.contact,
        email: patient?.email ? patient.email : "",
      });
    }
  }, []);
  return (
    <Stack>
      <Stack direction="row">
        <PatientSidebar />
        <Stack padding={2} spacing={1.5} width="100%" alignItems="center">
          <Paper
            sx={(theme) => ({
              width: "100%",
            })}
          >
            <Stack padding={3} spacing={1}>
              <InputGroup
                props={{ value: info?.firstName }}
                handleChange={(e) =>
                  setInfo({ ...info, firstName: e.target.value })
                }
                label="First Name"
              />
              <InputGroup
                props={{ value: info?.lastName }}
                label="Last Name"
                handleChange={(e) =>
                  setInfo({ ...info, lastName: e.target.value })
                }
              />
              <InputGroup
                props={{ value: info?.email }}
                label="Email Address"
                handleChange={(e) =>
                  setInfo({ ...info, email: e.target.value })
                }
              />
              <InputGroup props={{ value: info?.contact }} label="Contact" />
              <Stack alignItems="center" direction="row" spacing={1.5}>
                <InputGroup
                  props={{
                    value: dayjs(info?.dateOfBirth).format("dd, DD/MM/YYYY"),
                  }}
                  label="Date Of Birth"
                />
                <Stack paddingTop={2.5}>
                  <CustomDatePicker
                    placeholder="Select Date Of Birth"
                    handleChange={(e) => setInfo({ ...info, dateOfBirth: e })}
                  />
                </Stack>
              </Stack>
              <InputGroup
                props={{
                  value: patient?.address ? info?.address : "------",
                }}
                handleChange={(e) =>
                  setInfo({ ...info, address: e.target.value })
                }
                label="Address"
              />
              <Stack padding={(theme) => theme.spacing(1, 0)}>
                <PrimaryButton
                  handleClick={handleUpdate}
                  props={{ disableElevation: true }}
                  title="Save Changes"
                />
              </Stack>
            </Stack>
          </Paper>
        </Stack>
      </Stack>
    </Stack>
  );
}
