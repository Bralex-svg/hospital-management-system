import React from "react";
import Image from "next/image";
import Home from "../public/images/home.png";
import Car from "../public/images/car.png";
import Clock from "../public/images/clock.png";
import Calling from "../public/images/calling.png";
import Location from "../public/images/location.png";
import { useRouter } from "next/router";
const BannerContent = () => {
  const router = useRouter();

  const push = (e) => {
    e.preventDefault();
    router.push("/auth/login");
  };
  return (
    <>
      <div className="w-full -mt-[90%] md:-mt-[40%]  flex flex-col justify-between">
        <div className="grid md:grid-cols-2 w-full m-auto">
          {/* Content */}
          <div className="flex flex-col justify-center md:items-start w-full px-2 ">
            <h1 className="text-3xl  md:ml-[15%] md:text-5xl md:w-[90%] md:text-start text-center   py-3 w-[100%] xl font-bold text-white ">
              A Decentralized software for health care management.
            </h1>
            <p className=" md:w-[60%] -translate-y-[20%] sm:translate-y-[0] md:ml-[15%]   py-3 text-white ">
              We provide you with a state of the art software to streamline your
              health care process.
            </p>
            <button
              onClick={push}
              className="border-[3px] mx-auto md:mx-0 my-5 text-[#10204B] -translate-y-[100%] sm:translate-y-[0] rounded-[30px] md:ml-[15%] font-medium py-2 w-[50%] bg-[#ffffff] sm:text-xl  md:w-[30%] md:px-[30px]"
            >
              Get Started
            </button>
          </div>

          {/* END OF CONTENT */}
          <div className="-mt-[10%]">
            <Image
              width="2000"
              height="15000"
              className=" w-[2500%] h-[100%]   -translate-y-[20%] sm:translate-y-[0]"
              src={Home}
              alt="home"
            />
          </div>
        </div>
        <div className="w-full h-[10rem] bg-white">
          <div className=" max-w-[100%] mx-[10%] grid mt-[5%] grid-cols-4">
            <div className="ml-[20%]">
              <Image src={Clock} alt="clock" />
              <h3 className="mt-[7%]">Monday-Friday</h3>
            </div>
            <div className="ml-[20%]">
              <Image src={Calling} alt="clock" />
              <h3 className="mt-[7%]">+233558170078</h3>
            </div>
            <div className="ml-[20%]">
              <Image src={Car} alt="clock" />
              <h3 className="mt-[7%]">+222507510973</h3>
            </div>
            <div className=" ml-[20%] -mt-[5%]">
              <Image src={Location} alt="clock" />
              <h3 className="-translate-y-[100%]">Navrongo, Upper East</h3>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BannerContent;
