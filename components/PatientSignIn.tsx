import React, { useRouter } from "next/router";
import UserModel, { UserLoginDto } from "../models/UserModel";
import { useEffect, useState } from "react";
import ResponseModel from "../models/ResponseModel";
import ApiRoutes from "../routes/ApiRoutes";
import controller from "../controller";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { AuthThunk, PatientThunk } from "../functions";
import PrimaryButton from "./PrimaryButton";
import {
  Button,
  IconButton,
  InputAdornment,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import InputGroup from "./InputGroup";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { PatientLoginDto } from "../models/PatientModel";
export default function SignIn() {
  const router = useRouter();
  const { patient } = useAppSelector((state) => state.PatientReducer);
  const [isPassword, setIsPassword] = useState<boolean>(true);
  const { error } = useAppSelector((state) => state.ResponseReducer);
  const dispatch = useAppDispatch();
  const [info, setInfo] = useState<PatientLoginDto>({
    patientId: "",
    password: "",
  });

  async function handleLogin() {
    dispatch(
      PatientThunk({
        data: info,
        url: ApiRoutes.auth.patientLogin,
        method: "post",
      })
    );
  }

  useEffect(() => {
    if (patient) {
      router.push("/patient/profile");
    }
  }, [patient]);

  return (
    <Stack
      alignItems="center"
      justifyContent="cente"
      marginTop="-25%"
      width="100%"
      height="100%"
      spacing={2}
    >
      <Stack
        width="450px"
        padding={3}
        boxShadow={(theme) => `5px 5px 5px ${theme.palette.action.hover}`}
        borderRadius={(theme) => theme.spacing(0.5)}
        bgcolor={(theme) => theme.palette.background.paper}
        spacing={1.5}
        minHeight="200px"
      >
        <InputGroup
          handleChange={(e) => setInfo({ ...info, patientId: e.target.value })}
          label="PatientId"
          placeholder="patientId"
        />
        <InputGroup
          handleChange={(e) => setInfo({ ...info, password: e.target.value })}
          label="Password"
          placeholder="enter password"
          props={{
            type: isPassword ? "password" : "text",
            InputProps: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setIsPassword(!isPassword)}
                    size="small"
                  >
                    {isPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />
        <PrimaryButton title="Sign In" handleClick={handleLogin} />
        <Button
          onClick={() => router.push("/auth/patient/authenticate")}
          style={{ textTransform: "none" }}
          variant="outlined"
          size="small"
          fullWidth
          color="primary"
        >
          Authenticate Account
        </Button>
      </Stack>
      {error && (
        <Typography variant="body1" color="error" fontWeight="bold">
          {error}
        </Typography>
      )}
    </Stack>
  );
}
