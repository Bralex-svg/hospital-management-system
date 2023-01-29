import { Backdrop, Box } from "@mui/material";
import React from "react";
import { useAppSelector } from "../app/hooks";

export default function Loader() {
  const { loading } = useAppSelector((state) => state.ResponseReducer);
  return (
    <Backdrop open={loading} sx={{ zIndex: 100001 }}>
      <span className="loader"></span>
    </Backdrop>
  );
}
