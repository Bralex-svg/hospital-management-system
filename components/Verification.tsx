import React, { useRouter } from "next/router";
import UserModel, { UserLoginDto } from "../models/UserModel";
import { useEffect, useState } from "react";
import ResponseModel from "../models/ResponseModel";
import ApiRoutes from "../routes/ApiRoutes";
import controller from "../controller";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { AuthThunk } from "../functions";
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
export default function SignIn() {
  const router = useRouter();
  const { user } = useAppSelector((state) => state.UserReducer);
  const { error } = useAppSelector((state) => state.ResponseReducer);
  const dispatch = useAppDispatch();
  const [otp, setOtp] = useState<string>("");

  async function handleLogin() {
    dispatch(
      AuthThunk({
        data: { code: otp },
        url: ApiRoutes.auth.authenticate,
        method: "post",
        token: user?.token,
      })
    );
  }

  useEffect(() => {
    if (user && user.authenticated && user.isLoggedIn) {
      router.push("/dashboard/admin");
    }
  }, [user]);

  return (
    <Stack
      alignItems="center"
      justifyContent="cente"
      marginTop="-50px"
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
          handleChange={(e) => setOtp(e.target.value)}
          label="Verification Code"
          placeholder="enter verification code"
        />

        <PrimaryButton title="Submit" handleClick={handleLogin} />
        <Button
          onClick={() => router.push("/auth/login")}
          style={{ textTransform: "none" }}
          variant="outlined"
          size="small"
          fullWidth
          color="primary"
        >
          back to login
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
