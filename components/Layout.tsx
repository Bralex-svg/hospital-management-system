import { Stack } from "@mui/material";
import Navbar from "./Navbar";

export default function Layout({ children }) {
  return (
    <Stack overflow="hidden">
      <Navbar />
      <Stack height="100vh" overflow="hidden" width="100%" marginTop="60px">
        {children}
      </Stack>
    </Stack>
  );
}
