import { Button, ButtonProps } from "@mui/material";
import React from "react";
import { useAppSelector } from "../app/hooks";

interface IProps {
  props?: ButtonProps;
  title: string;
  handleClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}
export default function PrimaryButton({ title, props, handleClick }: IProps) {
  const { loading } = useAppSelector((state) => state.ResponseReducer);
  return (
    <Button
      variant="contained"
      size="small"
      color="primary"
      disabled={loading}
      onClick={handleClick}
      fullWidth
      {...props}
    >
      {title}
    </Button>
  );
}
