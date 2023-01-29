import { createTheme } from "@mui/material";
import { PrimaryShades } from "../constants/Colors";

export default createTheme({
  palette: {
    primary: {
      main: PrimaryShades[500],
    },
  },
});
