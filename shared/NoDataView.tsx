import { Stack } from "@mui/material";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import React from "react";
import { useAppSelector } from "../app/hooks";
import resources from "../resources";

interface IProps {
  text?: string;
}
export default function NoDataView({ text }: IProps) {
  const { loading } = useAppSelector((state) => state.ResponseReducer);
  return (
    <Stack padding={2}>
      <Stack width="240px" height="240px" alignSelf="center">
        <Image src={resources.nodata} alt="no-data" />
      </Stack>
      {loading ? (
        <Typography variant="h5" textAlign="center" color="primary">
          loading....
        </Typography>
      ) : (
        <Typography textAlign="center" variant="h5">
          {text ? text : "No Data"}
        </Typography>
      )}
    </Stack>
  );
}
