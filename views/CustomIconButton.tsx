import {
  IconButton,
  IconButtonProps,
  SvgIconTypeMap,
  Typography,
} from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import React, { MouseEvent } from "react";
import { IconType } from "react-icons";
import { useAppSelector } from "../app/hooks";

interface IProps {
  title: string;
  Icon?: OverridableComponent<SvgIconTypeMap<{}, "svg">> | IconType;
  reverse?: boolean;
  handleClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  props?: IconButtonProps;
  variant?: "text" | "outlined" | "contained";
  size?: "small" | "xsmall" | "medium" | "large";
}
export default function CustomIconButton({
  title,
  Icon,
  reverse,
  handleClick,
  props,
  variant,
  size,
}: IProps) {
  if (size === "small") {
    return (
      <IconButton
        sx={(theme) => ({
          borderRadius: (theme) => theme.spacing(0.5),
          padding: theme.spacing(0.85),
          display: "flex",
          flexDirection: reverse ? "row-reverse" : "row",
          alignItems: "center",
          justifyContent: "center",
          bgcolor:
            variant && variant === "contained"
              ? theme.palette.primary.main
              : theme.palette.action.hover,
          height: "25px",
          border:
            variant && variant === "outlined"
              ? `1px solid ${theme.palette.primary.main}`
              : "none",
          color:
            variant === "outlined"
              ? theme.palette.primary.main
              : variant === "text"
              ? "default"
              : theme.palette.common.white,

          "&:hover": {
            bgcolor:
              variant === "contained" ? theme.palette.primary.dark : "none",
          },
        })}
        size="small"
        onClick={handleClick}
        {...props}
      >
        <Typography variant="caption">{title}</Typography>
        {Icon && <Icon fontSize="small" />}
      </IconButton>
    );
  }
  if (size === "xsmall") {
    return (
      <IconButton
        sx={(theme) => ({
          borderRadius: (theme) => theme.spacing(0.5),
          padding: theme.spacing(0.85),
          display: "flex",
          flexDirection: reverse ? "row-reverse" : "row",
          alignItems: "center",
          justifyContent: "center",
          bgcolor:
            variant && variant === "contained"
              ? theme.palette.primary.main
              : theme.palette.action.hover,
          height: "20px",
          border:
            variant && variant === "outlined"
              ? `1px solid ${theme.palette.primary.main}`
              : "none",
          color:
            variant === "outlined"
              ? theme.palette.primary.main
              : variant === "text"
              ? "default"
              : theme.palette.common.white,

          "&:hover": {
            bgcolor:
              variant === "contained" ? theme.palette.primary.dark : "none",
          },
        })}
        size="small"
        onClick={handleClick}
        {...props}
      >
        <Typography variant="caption">{title}</Typography>
        {Icon && <Icon fontSize="small" />}
      </IconButton>
    );
  }
  return (
    <IconButton
      sx={(theme) => ({
        borderRadius: (theme) => theme.spacing(0.5),
        padding: theme.spacing(0.85),
        display: "flex",
        flexDirection: reverse ? "row-reverse" : "row",
        alignItems: "center",
        justifyContent: "center",
        bgcolor:
          variant && variant === "contained"
            ? theme.palette.primary.main
            : theme.palette.action.hover,
        height: "30px",
        border:
          variant && variant === "outlined"
            ? `1px solid ${theme.palette.primary.main}`
            : "none",
        color:
          variant === "outlined"
            ? theme.palette.primary.main
            : variant === "text"
            ? "default"
            : theme.palette.common.white,

        "&:hover": {
          bgcolor:
            variant === "contained" ? theme.palette.primary.dark : "none",
        },
      })}
      size="small"
      onClick={handleClick}
      {...props}
    >
      <Typography variant="caption">{title}</Typography>
      {Icon && <Icon fontSize="small" />}
    </IconButton>
  );
}
