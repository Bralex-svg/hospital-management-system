import { Stack, TextField, TextFieldProps, Typography } from "@mui/material";
import React, { ReactNode } from "react";

interface IProps {
  label?: string;
  placeholder?: string;
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  props?: TextFieldProps;
  children?: ReactNode;
}
export default function InputGroup({
  label,
  placeholder,
  handleChange,
  props,
  children,
}: IProps) {
  return (
    <Stack>
      {label && <Typography variant="body2">{label}</Typography>}
      <TextField
        variant="outlined"
        size="small"
        fullWidth
        placeholder={placeholder}
        onChange={handleChange}
        {...props}
      >
        {children}
      </TextField>
    </Stack>
  );
}
