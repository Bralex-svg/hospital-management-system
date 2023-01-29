import React, { ReactNode } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import ITableCell from "../interface/ITableCell";
import { CustomTableCell } from "../shared";
import { generateId } from "../utils";

interface IProps {
  children: ReactNode;
  header: ITableCell[];
}
export default function TableTemplate({ children, header }: IProps) {
  return (
    <TableContainer component={Stack}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {header.map((h) => (
              <CustomTableCell key={generateId()} props={h.props}>
                {h.children}
              </CustomTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>{children}</TableBody>
      </Table>
    </TableContainer>
  );
}
