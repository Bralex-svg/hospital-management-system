import SignIn from "../public/images/sign.jpg";
import Back from "../public/images/backgroundImg.jpg";
import Image from "next/image";
export default function Login() {
  return (
    <>
      <div>
        <div className="bg-gradient-to-tr   from-gray-900 to-gray-900 h-[40rem] w-full ">
          <div className="w-[100%] object-cover h-0  mix-blend-overlay">
            <Image
              className="h-[40rem]"
              width="1500"
              height="1100"
              src={Back}
              alt=""
            />
          </div>

          <div>
            <div className=" translate-y-[0%] ">
              <Image width="800" height="1000" src={SignIn} alt="sign" />
            </div>

            <div className=" -translate-y-[450px] font-bold text-4xl text-white ml-[75%]">
              <h2>SIGN IN</h2>
            </div>
          </div>
        </div>

        {/* FORM */}
      </div>
    </>
  );
}
