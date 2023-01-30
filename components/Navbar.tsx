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
          </Stack>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}

{
  /* <div className="flex mt-[0px] w-full md:mt-[1px] bg-[#ffffff] justify-between items-center px-4 h-20 max-w-[1240px] mx-auto text-[#10204B]">
  <img className="lg:w-[3%] w-[10%] " src={Logo} alt="logo" />{" "}

  <ul className="hidden w-full ml-[50%] md:flex ">
    <Link href="/">
      <li className="p-4">HOME</li>
    </Link>
    <Link href="Patients/patientLogin">
            <li className="p-4">PATEINT</li>
          </Link>

    {!user && (
      <button
        onClick={push}
        className="bg-[#10204B]  text-white ml-8 rounded-md font-medium w-[180px]  mx-auto my-2 px-4 py-3"
      >
        Admin Login
      </button>
    )}
  </ul>
  <div onClick={handleNav} className="block md:hidden">
    {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
  </div>
  <div
    className={
      nav
        ? "fixed top-20 left-0 z-9999  bg-[#fff]  w-[60%] h-full border-r border-r-gray-900 ease-in-out duration-500"
        : "fixed left-[-100%] z-9999 bg-[#fff]"
    }
  >
    <h1 className="w-full font-bold text-3xl m-4 text-white">
            EBI HEALTH
          </h1>

    <ul className=" md:hidden p-4 uppercase">
      <li className="p-6 text-black border-b border-gray-600 ">HOME</li>
      <a href="Patients/patientLogin">
        <li className="p-6 text-black border-b border-gray-600 ">Patient</li>
      </a>
      {!user && (
        <button className="bg-black  text-white mt-7 ml-2 rounded-md font-medium w-[180px]  mx-auto my-2 px-4 py-3">
          ADMIN LOGIN
        </button>
      )}
    </ul>
  </div>
</div>; */
}
