import { Stack } from "@mui/material";
import React from "react";
import { BsSearch } from "react-icons/bs";

interface IProps {
  placeholder?: string;
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export default function SearchInput({ handleChange, placeholder }: IProps) {
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="flex-start"
      padding={(theme) => theme.spacing(0.5)}
      spacing={0.5}
      borderRadius={(theme) => theme.spacing(0.5)}
      border={(theme) => `1px solid ${theme.palette.action.disabledBackground}`}
    >
      <BsSearch />
      <input
        placeholder={placeholder ? placeholder : "search..."}
        style={{ outline: "none", borderStyle: "none", flex: 1 }}
      />
    </Stack>
  );
}
