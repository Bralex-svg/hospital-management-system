import React from "react";
import Back from "../public/images/backgroundImg.jpg";
import Image from "next/image";

export default function Banner() {
  return (
    <div>
      <div className="bg-gradient-to-tr   from-gray-900 to-gray-900 h-[40rem] w-full ">
        <div className="w-[100%] object-cover h-0  mix-blend-overlay">
          <Image
            className="h-[40rem]"
            width="1500"
            height="900"
            src={Back}
            alt=""
          />
        </div>
      </div>
    </div>
  );
}
