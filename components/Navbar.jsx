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
          <li className="p-4">HOME</li>
          <li className="p-4">ABOUT US</li>

          <button
            onClick={push}
            className="bg-[#10204B]  text-white ml-8 rounded-md font-medium w-[180px]  mx-auto my-2 px-4 py-3"
          >
            Login
          </button>
        </ul>
        <div onClick={handleNav} className="block md:hidden">
          {/* {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />} */}
        </div>
        <div
          className={
            nav
              ? "fixed top-0 left-0 bg-[#F73D27]  w-[60%] h-full border-r border-r-gray-900 ease-in-out duration-500"
              : "fixed left-[-100%]"
          }
        >
          <h1 className="w-full font-bold text-3xl m-4 text-white">KFC</h1>

          <ul className=" md:hidden p-4 uppercase">
            <li className="p-6 border-b border-gray-600 ">ABOUT US</li>

            <button className="bg-[#ffffff]  text-black mt-7 ml-2 rounded-md font-medium w-[180px]  mx-auto my-2 px-4 py-3">
              Contact
            </button>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;
