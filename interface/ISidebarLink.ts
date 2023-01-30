import { SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { IconType } from "react-icons/lib";

export default interface ISidebarLink {
  title: string;
  Icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> | IconType;
  route?: string;
}
