import { Menu, MenuItem } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { patientLogout } from "../features/PatientReducer";
import { userLogout } from "../features/UserReducer";
import { PatientThunk } from "../functions";

interface IProps {
  anchorEl: HTMLElement | null;
  handleClose: () => void;
}
export default function ProfileMenu({ anchorEl, handleClose }: IProps) {
  const { patient } = useAppSelector((state) => state.PatientReducer);
  const router = useRouter();
  const dispatch = useAppDispatch();

  function handleLogout() {
    dispatch(patientLogout());
    handleClose();
    router.push("/");
  }

  return (
    <Menu anchorEl={anchorEl} onClose={handleClose} open={Boolean(anchorEl)}>
      {(!patient || !patient.token) && (
        <MenuItem
          onClick={() => {
            router.push("/auth/patient/login");
            handleClose();
          }}
        >
          Sign In
        </MenuItem>
      )}
      {patient && patient.token && (
        <MenuItem
          onClick={() => {
            router.push("/patient/profile");
            handleClose();
          }}
        >
          Profile
        </MenuItem>
      )}
      {patient && patient.token && (
        <MenuItem
          onClick={handleLogout}
          sx={(theme) => ({ color: theme.palette.error.main })}
        >
          Logout
        </MenuItem>
      )}
    </Menu>
  );
}
