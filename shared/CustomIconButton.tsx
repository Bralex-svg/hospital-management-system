import { IconButton, Typography } from "@mui/material";
import { IconButtonProps } from "@mui/material/IconButton";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { SvgIconTypeMap } from "@mui/material/SvgIcon";
import React from "react";
import { IconType } from "react-icons/lib";
import Colors from "../constants/Colors";

interface IProps {
  props?: IconButtonProps;
  handleClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  title: string;
  Icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> | IconType;
}
export default function CustomIconButton({
  handleClick,
  props,
  title,
  Icon,
}: IProps) {
  return (
    <IconButton
      onClick={handleClick}
      sx={(theme) => ({
        bgcolor: Colors.primary,
        color: theme.palette.common.white,
        borderRadius: theme.spacing(0.45),
        padding: theme.spacing(0.85),
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        "&:hover": {
          bgcolor: theme.palette.primary.main,
        },
      })}
      size="small"
      {...props}
    >
      <Typography variant="body2">{title}</Typography>
      <Icon style={{ marginRight: "5px" }} />
    </IconButton>
  );
}
