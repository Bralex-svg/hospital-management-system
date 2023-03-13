import ISidebarLink from "../interface/ISidebarLink";
import { IoAccessibilityOutline } from "react-icons/io5";
import { BiMessage, BiMessageEdit } from "react-icons/bi";
import { ImProfile } from "react-icons/im";
import NavigationRoutes from "../routes/NavigationRoutes";
import { AiOutlineProfile } from "react-icons/ai";

export default (): ISidebarLink[] => [
  {
    title: "Users",
    Icon: CiUser,
    route: NavigationRoutes.patientProfile.users,
  },
  {
    title: "Medical Records",
    Icon: AiOutlineProfile,
    route: NavigationRoutes.patientProfile.root,
  },
  {
    title: "Permissions",
    Icon: IoAccessibilityOutline,
    route: NavigationRoutes.patientProfile.recordsPermission,
  },
  {
    title: "Profile Details",
    Icon: ImProfile,
    route: NavigationRoutes.patientProfile.profileDetails,
  },
  {
    title: "Edit Profile",
    Icon: BiMessageEdit,
    route: NavigationRoutes.patientProfile.editInfo,
  },


   
           
];
