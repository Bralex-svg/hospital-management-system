import { Stack } from "@mui/material";
import React from "react";
import { PrimaryShades } from "../constants/Colors";
import PatientSidebarRoutes from "../data/PatientSidebarRoutes";
import { SidebarLink } from "../shared";

export default function PatientSidebar() {
  return (
    <Stack
      width="240px"
      height="100vh"
      bgcolor={(theme) => PrimaryShades[500]}
      color={(theme) => theme.palette.common.white}
      paddingTop={2}
    >
      {PatientSidebarRoutes().map((linkInfo) => (
        <SidebarLink info={linkInfo} />
      ))}
    </Stack>
  );
}
