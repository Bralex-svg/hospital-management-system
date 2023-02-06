import React, { useState } from "react";
import Link from "next/link";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { useRouter } from "next/router";
import { useAppSelector } from "../app/hooks";
import { AppBar, IconButton, Stack, Toolbar, Typography } from "@mui/material";
import Colors from "../constants/Colors";
import { BiUserPin } from "react-icons/bi";
import { PatientProfileMenu, ProfileMenu } from "../shared";
import { MdOutlineHealthAndSafety } from "react-icons/md";
//
export default function Navbar() {
  const { user } = useAppSelector((state) => state.UserReducer);
  const router = useRouter();
  const { patient } = useAppSelector((state) => state.PatientReducer);
  const [profile, setProfile] = useState<HTMLElement | null>(null);
  const [patientMenu, setPatientMenu] = useState<HTMLElement | null>(null);
  const [nav, setNav] = useState(false);
  const handleNav = () => {
    setNav(!nav);
  };
  return (
    <AppBar
      sx={(theme) => ({
        bgcolor: theme.palette.common.white,
        height: "60px",
      })}
      variant="outlined"
      position="fixed"
    >
      {!patient && (
        <ProfileMenu anchorEl={profile} handleClose={() => setProfile(null)} />
      )}
      {!user && (
        <PatientProfileMenu
          anchorEl={patientMenu}
          handleClose={() => setPatientMenu(null)}
        />
      )}
      <Toolbar>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          width="100%"
        >
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="flex-start"
          >
            <Link href="/">
              <h1 className="w-[150%] md:translate-x-[10%] px-3 font-bold text-3xl text-[#10204B]">
                EBI HEALTH
              </h1>
            </Link>
          </Stack>
          <Stack
            direction="row"
            spacing={1.5}
            alignItems="center"
            justifyContent="flex-end"
          >
            {!user && (
              <IconButton
                onClick={(e) => setPatientMenu(e.currentTarget)}
                size="small"
                sx={(theme) => ({
                  color: theme.palette.primary.main,
                  borderRadius: theme.spacing(0.25),
                })}
              >
                <Typography color="primary" variant="body2">
                  Patient
                </Typography>
                <MdOutlineHealthAndSafety />
              </IconButton>
            )}
            {!patient && (
              <React.Fragment>
                {user && user.userType && user.authenticated && (
                  <Typography color="primary" variant="body1">
                    {`[${user.userType.toUpperCase()}]`}
                  </Typography>
                )}
                <IconButton
                  color="primary"
                  onClick={(e) => setProfile(e.currentTarget)}
                >
                  <BiUserPin />
                </IconButton>
              </React.Fragment>
            )}
          </Stack>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
