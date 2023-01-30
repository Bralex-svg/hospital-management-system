import { IconButton, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
import { PrimaryShades } from "../constants/Colors";
import ISidebarLink from "../interface/ISidebarLink";

interface IProps {
  info: ISidebarLink;
}
export default function SidebarLink({ info }: IProps) {
  const router = useRouter();
  return (
    <IconButton
      sx={(theme) => ({
        display: "flex",
        flexDirection: "row",
        width: "100%",
        alignItems: "center",
        justifyContent: "flex-start",
        padding: theme.spacing(0.5),
        color:
          info.route === router.pathname
            ? PrimaryShades[500]
            : theme.palette.common.white,
        borderRadius: theme.spacing(0),
        bgcolor:
          info.route === router.pathname
            ? theme.palette.common.white
            : "inherit",
        "&:hover": {
          bgcolor:
            info.route === router.pathname
              ? theme.palette.common.white
              : "inherit",
          color:
            info.route === router.pathname
              ? PrimaryShades[500]
              : theme.palette.common.white,
        },
      })}
      size="small"
      onClick={() => {
        info.route ? router.push(info.route) : () => {};
      }}
    >
      <info.Icon fontSize="small" />
      <Typography
        sx={(theme) => ({
          fontWeight: info.route === router.pathname ? "bold" : "normal",
        })}
        style={{ marginLeft: "10px" }}
        variant="body2"
      >
        {info.title}
      </Typography>
    </IconButton>
  );
}
