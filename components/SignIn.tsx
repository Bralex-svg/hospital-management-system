import React, { useRouter } from "next/router";
import UserModel, { UserLoginDto } from "../models/UserModel";
import { useEffect, useState } from "react";
import ResponseModel from "../models/ResponseModel";
import ApiRoutes from "../routes/ApiRoutes";
import controller from "../controller";
export default function SignIn() {
  const router = useRouter();

  const [user, setUser] = useState<UserModel | null>(null);
  const [info, setInfo] = useState<UserLoginDto>({
    username: "",
    password: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  async function handleLogin() {
    try {
      const res = await controller<ResponseModel<UserModel>>({
        data: info,
        url: ApiRoutes.auth.loging,
      });
      setUser(res.data);
    } catch (error) {
      console.log(error);
      alert(error);
    }
  }

  // const push = () => {
  //   router.push("/dashboard/admin");
  // };

  useEffect(() => {
    if (user) {
      console.log(user);
      //navigate
      router.push("/dashboard/admin");
    }
  }, [user]);

  return (
    <>
      <div className="z-100">
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="max-w-[550px] absolute top-[40%] ml-[70%]  "
        >
          <div className="mb-3 xl:w-96">
            <select
              // id="countries"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 
                   

                focus:border-blue-500 block w-[70%] ml-[8%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option selected>Choose your hospital</option>
              <option value="NH1">War Memorial</option>
              <option value="VCR">Ckt Clinic</option>
              <option value="NH2">Tamale TH</option>
            </select>
            <label
              htmlFor="exampleFormControlInput1"
              className="form-label text-2xl ml-[7%] inline-block mb-2 text-white"
            >
              ID
            </label>
            <input
              type="text"
              className="
              
        form-control
        block
        w-[70%]
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
      bg-[#1023b200] 
        border border-solid border-white
        rounded-[20px]
        transition
        ease-in-out
        ml-[8%]
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
      "
              id="exampleFormControlInput1"
              placeholder="Enter role id"
              value={info.username}
              onChange={(e) => setInfo({ ...info, username: e.target.value })}
            />
          </div>
          <div className="mb-3 xl:w-96">
            <label
              htmlFor="exampleFormControlInput1"
              className="form-label text-2xl ml-[7%] inline-block mb-2 text-white"
            >
              PASSWORD:
            </label>
            <input
              type="password"
              className="
        form-control
     w-[70%]
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
 
        bg-[#1023b200] 
        border border-solid border-white
        rounded-[20px]
        transition
        ease-in-out
            ml-[8%]
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
      "
              id="exampleFormControlInput1"
              placeholder="Enter password"
              value={info.password}
              onChange={(e) => setInfo({ ...info, password: e.target.value })}
            />
          </div>

          <div>
            <p className=" text-white ml-[30%]">Forgot Passwprd</p>
          </div>
          <button
            onClick={handleLogin}
            // onClick={push}
            className="bg-[#ffffff] text-[#10204B] my-[15%] ml-[35%] font-medium rounded-[20px] py-2 px-8 "
          >
            Sign In
          </button>
        </form>
      </div>
    </>
  );
}
