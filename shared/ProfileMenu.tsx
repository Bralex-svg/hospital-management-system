import { Menu, MenuItem } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { userLogout } from "../features/UserReducer";

interface IProps {
  anchorEl: HTMLElement | null;
  handleClose: () => void;
}
export default function ProfileMenu({ anchorEl, handleClose }: IProps) {
  const { user } = useAppSelector((state) => state.UserReducer);
  const router = useRouter();
  const dispatch = useAppDispatch();

  function handleLogout() {
    dispatch(userLogout());
    handleClose();
    router.push("/");
  }

  return (
    <Menu anchorEl={anchorEl} onClose={handleClose} open={Boolean(anchorEl)}>
      {!user && (
        <MenuItem
          onClick={() => {
            router.push("/auth/login");
            handleClose();
          }}
        >
          Sign In
        </MenuItem>
      )}
      {user && (
        <MenuItem
          onClick={() => {
            router.push("/dashboard/admin");
            handleClose();
          }}
        >
          Profile
        </MenuItem>
      )}
      {user && (
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
