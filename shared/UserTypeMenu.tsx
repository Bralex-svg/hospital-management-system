import { Checkbox, IconButton, Menu, MenuItem, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { UserTypesData } from "../data";
import { UserRole } from "../enum/UserRole";
import { IUserType } from "../interface";
import UserModel from "../models/UserModel";
import { TbSend } from "react-icons/tb";
import Typography from "@mui/material/Typography";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { UsersThunk } from "../functions";
import ApiRoutes from "../routes/ApiRoutes";
interface IProps {
  anchorEl: HTMLElement | null;
  handleClose: () => void;
  user: UserModel;
}
export default function UserTypeMenu({ anchorEl, handleClose, user }: IProps) {
  const [utype, setUType] = useState<IUserType>({ title: "", value: "" });
  const state = useAppSelector((state) => state.UserReducer);
  const dispatch = useAppDispatch();
  function handleUpdate(u: IUserType) {
    setUType(u);
    dispatch(
      UsersThunk({
        url: ApiRoutes.auth.updateUserType,
        data: { value: u.value, userId: user.userId },
        token: state?.user?.token,
        method: "put",
      })
    );
  }

  return (
    <Menu onClose={handleClose} open={Boolean(anchorEl)} anchorEl={anchorEl}>
      {UserTypesData.map((u) => (
        <Stack
          sx={(theme) => ({
            padding: theme.spacing(0.5),
            fontSize: theme.spacing(1.5),
            color: user.userType === u.value ? theme.palette.primary.dark : "",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            height: "25px",
          })}
          key={u.value}
        >
          <Checkbox
            size="xs"
            onChange={() => {
              setUType(u);
            }}
            color={user.userType === u.value ? "default" : "primary"}
            checked={utype.value === u.value}
          />
          <Typography variant="caption">{u.title}</Typography>
          <Stack flex={1} />
          <IconButton
            onClick={() => handleUpdate(u)}
            color={user.userType === u.value ? "primary" : "default"}
            size="small"
          >
            <TbSend fontSize="small" />
          </IconButton>
        </Stack>
      ))}
    </Menu>
  );
}
