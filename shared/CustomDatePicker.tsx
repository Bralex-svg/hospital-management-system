import React from "react";
import dayjs, { Dayjs } from "dayjs";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers";

interface IProps {
  handleChange?: (val: any) => void;
  placeholder?: string;
}
export default function CustomDatePicker({
  handleChange,
  placeholder,
}: IProps) {
  const [value, setValue] = React.useState<Dayjs | null>(
    dayjs("2014-08-18T21:11:54")
  );

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack spacing={3}>
        <DesktopDatePicker
          label={placeholder ? placeholder : "Choose Date"}
          inputFormat="DD/MM/YYYY"
          value={value}
          onChange={(newValue: Dayjs | null) => {
            setValue(newValue);
            handleChange && handleChange(newValue);
          }}
          renderInput={(params) => (
            <TextField variant="outlined" fullWidth size="small" {...params} />
          )}
        />
      </Stack>
    </LocalizationProvider>
  );
}
