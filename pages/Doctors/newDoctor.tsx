import {
  Divider,
  IconButton,
  Stack,
  Typography,
  TableRow,
} from "@mui/material";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { BiRefresh, BiUserPlus } from "react-icons/bi";
import {
  MdOutlineExpandMore,
  MdOutlineMoreVert,
  MdPlaylistAdd,
} from "react-icons/md";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import Sidebar from "../../components/Sidebar";
import Colors from "../../constants/Colors";
import { PatientTableHeader, UsersTableHeader } from "../../data/TableHeaders";
import { UserRole } from "../../enum/UserRole";
import { PatientsThunk, UsersThunk } from "../../functions";
import UserModel from "../../models/UserModel";
import ApiRoutes from "../../routes/ApiRoutes";
import {
  CustomIconButton,
  CustomTableCell,
  NoDataView,
  SearchInput,
  UserRolesMenu,
  UserTypesMenu,
} from "../../shared";
import { AddMedicalInfoModal, AddUserModal, TableTemplate } from "../../views";
import AddPatientModal from "../../views/AddPatientModal";
import { HiOutlineUserAdd } from "react-icons/hi";

export default function Admin() {
  const { user, users } = useAppSelector((state) => state.UserReducer);
  const [role, setRole] = useState<HTMLElement | null>(null);
  const [userType, setUserType] = useState<HTMLElement | null>(null);
  const dispatch = useAppDispatch();
  const [userInfo, setUserInfo] = useState<UserModel | null>(null);
  const [addUser, setAddUser] = useState<boolean>(false);

  function handleGetUsers() {
    dispatch(
      UsersThunk({
        url: ApiRoutes.auth.users,
        token: user.token,
        method: "get",
      })
    );
  }

  useEffect(() => {
    if (user && user.role === UserRole.Admin) {
      handleGetUsers();
    }
  }, []);

  return (
    <Stack height="100vh" width="100%" overflow="hidden">
      {userInfo && (
        <UserTypesMenu
          anchorEl={userType}
          handleClose={() => setUserType(null)}
          user={userInfo}
        />
      )}
      {userInfo && (
        <UserRolesMenu
          user={userInfo}
          anchorEl={role}
          handleClose={() => setRole(null)}
        />
      )}
      <AddUserModal open={addUser} handleClose={() => setAddUser(false)} />
      <Stack direction="row">
        <Stack width="240px">
          <Sidebar />
        </Stack>
        <Stack height="100%" width="100%">
          <Stack
            direction="row"
            width="100%"
            alignItems="center"
            justifyContent="flex-end"
            spacing={1.5}
            padding={1}
          >
            <CustomIconButton
              handleClick={handleGetUsers}
              Icon={BiRefresh}
              title="Refresh"
            />
            <Stack flex={1} />

            <CustomIconButton
              handleClick={() => setAddUser(true)}
              title="Add User"
              Icon={HiOutlineUserAdd}
            />
            <SearchInput />
          </Stack>
          <Divider />
          <Stack padding={2}>
            {users && users.length > 0 && (
              <TableTemplate header={UsersTableHeader}>
                {users.map((u, i) => (
                  <TableRow
                    sx={(theme) => ({
                      bgcolor:
                        i % 2 === 0
                          ? theme.palette.common.white
                          : theme.palette.action.hover,
                    })}
                  >
                    <CustomTableCell>{i + 1}</CustomTableCell>
                    <CustomTableCell>{u.firstName}</CustomTableCell>
                    <CustomTableCell>{u.lastName}</CustomTableCell>
                    <CustomTableCell>{u.phoneNumber}</CustomTableCell>
                    <CustomTableCell>
                      {u.email ? u.email : "----"}
                    </CustomTableCell>
                    <CustomTableCell>
                      <Stack alignItems="center" direction="row">
                        {u.userType}
                        <IconButton
                          onClick={(e) => {
                            setUserInfo(u);
                            setUserType(e.currentTarget);
                          }}
                          size="small"
                        >
                          <MdOutlineExpandMore />
                        </IconButton>
                      </Stack>
                    </CustomTableCell>
                    <CustomTableCell>
                      <Stack alignItems="center" direction="row">
                        {u.role}
                        <IconButton
                          onClick={(e) => {
                            setUserInfo(u);
                            setRole(e.currentTarget);
                          }}
                          size="small"
                        >
                          <MdOutlineExpandMore />
                        </IconButton>
                      </Stack>
                    </CustomTableCell>
                  </TableRow>
                ))}
              </TableTemplate>
            )}
            {!users || (users.length <= 0 && <NoDataView />)}
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
}
