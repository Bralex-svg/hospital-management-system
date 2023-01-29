import React, { useRouter } from "next/router";
export default function medical() {
  const router = useRouter();

  const push = (e) => {
    e.preventDefault();
    router.push("patientRecord");
  };
  return (
    <>
      <div className="ml-[20%] mt-[10%]">
        <div className="grid grid-cols-3">
          <div className="mb-3  xl:w-96">
            <label
              htmlFor="exampleFormControlInput1"
              className="form-label text-xl ml-[7%] inline-block mb-2 text-black"
            >
              Weight
            </label>
            <input
              type="text"
              className="
        form-control
     w-[70%]
        px-3
        py-1.5
        text-base
        font-normal
        text-black-700
 
        bg-[#1023b200] 
        border border-solid border-black
        rounded-[20px]
        transition
        ease-in-out
            ml-[8%]
        focus:text-black-900 focus:bg-black focus:border-black-900 focus:outline-none
      "
              id="exampleFormControlInput1"
              placeholder="Enter Weight"
            />
          </div>

          <div>
            <label
              htmlFor="exampleFormControlInput1"
              className="form-label text-xl ml-[7%] inline-block mb-2 text-black"
            >
              Blood Presure
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
        text-black-900
 
        bg-[#1023b200] 
        border border-solid border-black
        rounded-[20px]
        transition
        ease-in-out 
            ml-[8%]
        focus:text-black-900 focus:bg-black focus:border-blue-600 focus:outline-none
      "
              id="exampleFormControlInput1"
              placeholder="Enter Height"
            />
          </div>
        </div>

        <div className="grid grid-cols-3">
          <div className="mb-3  xl:w-96">
            <label
              htmlFor="exampleFormControlInput1"
              className="form-label text-xl ml-[7%] inline-block mb-2 text-black"
            >
              Respiration
            </label>
            <input
              type="text"
              className="
        form-control
     w-[70%]
        px-3
        py-1.5
        text-base
        font-normal
        text-black-700
 
        bg-[#1023b200] 
        border border-solid border-black
        rounded-[20px]
        transition
        ease-in-out
            ml-[8%]
        focus:text-black-900 focus:bg-black focus:border-black-900 focus:outline-none
      "
              id="exampleFormControlInput1"
              placeholder="Enter Res"
            />
          </div>

          <div className="mb-3  xl:w-96">
            <label
              htmlFor="exampleFormControlInput1"
              className="form-label text-xl ml-[7%] inline-block mb-2 text-black"
            >
              Height
            </label>
            <input
              type="text"
              className="
        form-control
     w-[70%]
        px-3
        py-1.5
        text-base
        font-normal
        text-black-700
 
        bg-[#1023b200] 
        border border-solid border-black
        rounded-[20px]
        transition
        ease-in-out
            ml-[8%]
        focus:text-black-900 focus:bg-black focus:border-black-900 focus:outline-none
      "
              id="exampleFormControlInput1"
              placeholder="Enter Height"
            />
          </div>
        </div>

        <div className="inline-flex mt-[5%] ml-[15%] rounded-md shadow-sm">
          <a
            onClick={push}
            href="#"
            aria-current="page"
            className="px-4 py-2 text-sm font-medium text-blue-700 bg-blue-900 border border-gray-200 rounded-l-lg hover:bg-green-100 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 green:bg-green-700 green:border-green-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
          >
            Save
          </a>
          <a
            href="#"
            className="px-4 py-2 text-sm font-medium text-gray-900 bg-green-900 border-t border-b border-green-900 hover:bg-green-900 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-green-900 green:bg-green-900 green:border-green-900 dark:text-white dark:hover:text-white green:hover:bg-green-900 dark:focus:ring-blue-500 dark:focus:text-white"
          >
            Reset
          </a>
          <a
            href="#"
            className="px-4 py-2 text-sm font-medium text-gray-900 bg-red-900 border border-red-900 rounded-r-md hover:bg-red-900 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-red-900 red:bg-red-900 dark:border-gray-600 dark:text-white dark:hover:text-white red:hover:bg-red-900 dark:focus:ring-blue-500 dark:focus:text-white"
          >
            Cancel
          </a>
        </div>
      </div>
    </>
  );
}
