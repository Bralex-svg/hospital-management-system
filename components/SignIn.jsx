import { useRouter } from "next/router";

export default function SignIn() {
  const router = useRouter();

  const push = (e) => {
    e.preventDefault();
    router.push("/dashboard/admin");
  };
  return (
    <>
      <div className="z-100">
        <form className="max-w-[550px] absolute top-[40%] ml-[70%]  ">
          <div className="mb-3 xl:w-96">
            <label
              for="exampleFormControlInput1"
              class="form-label text-2xl ml-[7%] inline-block mb-2 text-white"
            >
              ID:
            </label>
            <input
              type="text"
              class="
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
              placeholder="Enter your department's name"
            />
          </div>
          <div class="mb-3 xl:w-96">
            <label
              for="exampleFormControlInput1"
              class="form-label text-2xl ml-[7%] inline-block mb-2 text-white"
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
            />
          </div>

          <div>
            <p className=" text-white ml-[30%]">Forgot Passwprd</p>
          </div>
          <button
            onClick={push}
            className="bg-[#ffffff] text-[#10204B] my-[15%] ml-[35%] font-medium rounded-[20px] py-2 px-8 "
          >
            Sign In
          </button>
        </form>
      </div>
    </>
  );
}
