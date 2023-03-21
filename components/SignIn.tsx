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
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
export default function SignIn() {
  const router = useRouter();
  const { user } = useAppSelector((state) => state.UserReducer);
  const [isPassword, setIsPassword] = useState<boolean>(true);
  const { error } = useAppSelector((state) => state.ResponseReducer);
  const dispatch = useAppDispatch();
  const [info, setInfo] = useState<UserLoginDto>({
    username: "",
    password: "",
  });

  async function handleLogin() {
    dispatch(
      AuthThunk({ data: info, url: ApiRoutes.auth.loging, method: "post" })
    );
  }

  useEffect(() => {
    if (user && user.authenticated) {
      router.push("/dashboard/admin");
    } else if (user && !user.authenticated) {
      router.push("/auth/verify");
    }
  }, [user]);

  return (
    <Stack
      alignItems="center"
      justifyContent="cente"
      marginTop="-290px"
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
        minHeight="100px"
      >
        <InputGroup
          handleChange={(e) => setInfo({ ...info, username: e.target.value })}
          label="PhoneNumber"
          placeholder="enter phone number"
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
      </Stack>
      {error && (
        <Typography variant="body1" color="error" fontWeight="bold">
          {error}
        </Typography>
      )}
    </Stack>
  );
}
