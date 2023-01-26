import React, { useState } from "react";
import Link from "next/link";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
// import Logo from "../assets/logo (2).png";
import { useRouter } from "next/router";
const Navbar = () => {
  const router = useRouter();

  const push = (e) => {
    e.preventDefault();
    router.push("/auth/login");
  };
  const [nav, setNav] = useState(false);
  const handleNav = () => {
    setNav(!nav);
  };
  return (
    <>
      <div className="flex mt-[0px] w-full md:mt-[1px] bg-[#ffffff] justify-between items-center px-4 h-20 max-w-[1240px] mx-auto text-[#10204B]">
        {/* <img className="lg:w-[3%] w-[10%] " src={Logo} alt="logo" />{" "} */}

        <Link href="/">
          <h1 className="w-[150%] md:translate-x-[10%] px-3 font-bold text-3xl text-[#10204B]">
            EBI HEALTH
          </h1>
        </Link>

        <ul className="hidden w-full ml-[50%] md:flex ">
          <a href="/">
            <li className="p-4">HOME</li>
          </a>
          <a href="Patients/patientLogin">
            <li className="p-4">PATEINT</li>
          </a>

          <button
            onClick={push}
            className="bg-[#10204B]  text-white ml-8 rounded-md font-medium w-[180px]  mx-auto my-2 px-4 py-3"
          >
            Admin Login
          </button>
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
          {/* <h1 className="w-full font-bold text-3xl m-4 text-white">
            EBI HEALTH
          </h1> */}

          <ul className=" md:hidden p-4 uppercase">
            <li className="p-6 text-black border-b border-gray-600 ">HOME</li>
            <a href="Patients/patientLogin">
              <li className="p-6 text-black border-b border-gray-600 ">
                Patient
              </li>
            </a>
            <button className="bg-black  text-white mt-7 ml-2 rounded-md font-medium w-[180px]  mx-auto my-2 px-4 py-3">
              ADMIN LOGIN
            </button>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;
