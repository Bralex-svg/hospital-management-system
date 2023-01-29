import TableCell, { TableCellProps } from "@mui/material/TableCell";
import React, { ReactNode } from "react";

interface IProps {
  children: ReactNode | string;
  props?: TableCellProps;
}
export default function CustomTableCell({ children, props }: IProps) {
  return (
    <TableCell
      sx={(theme) => ({
        padding: theme.spacing(0.5),
      })}
      {...props}
    >
      {children}
    </TableCell>
  );
}
