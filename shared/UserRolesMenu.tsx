import {
  Checkbox,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { TbSend } from "react-icons/tb";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { UserRoles } from "../data";
import { UsersThunk } from "../functions";
import { IUserRole } from "../interface";
import UserModel from "../models/UserModel";
import ApiRoutes from "../routes/ApiRoutes";

interface IProps {
  anchorEl: HTMLElement | null;
  handleClose: () => void;
  user: UserModel;
}
export default function UserRolesMenu({ anchorEl, handleClose, user }: IProps) {
  const [utype, setUType] = useState<IUserRole>({ title: "", value: "" });
  const state = useAppSelector((state) => state.UserReducer);
  const dispatch = useAppDispatch();
  function handleUpdate(u: IUserRole) {
    setUType(u);
    dispatch(
      UsersThunk({
        url: ApiRoutes.auth.updateRole,
        data: { value: u.value, userId: user.userId },
        token: state?.user?.token,
        method: "put",
      })
    );
  }
  return (
    <Menu
      elevation={1}
      onClose={handleClose}
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
    >
      {UserRoles.map((u) => (
        <Stack
          sx={(theme) => ({
            padding: theme.spacing(0.5),
            fontSize: theme.spacing(1.5),
            color: user.role === u.value ? theme.palette.primary.dark : "",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            height: "25px",
          })}
          key={u.value}
        >
          <Checkbox
            onChange={() => {
              setUType(u);
            }}
            color={user.role === u.value ? "primary" : "default"}
            size="xs"
            checked={utype.value === u.value}
          />
          <Typography variant="caption">{u.title}</Typography>
          <Stack flex={1} />
          <IconButton onClick={() => handleUpdate(u)} size="small">
            <TbSend fontSize="small" />
          </IconButton>
        </Stack>
      ))}
    </Menu>
  );
}
