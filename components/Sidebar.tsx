import Link from "next/link";
import React from "react";
import { CiUser } from "react-icons/ci";
import { AiOutlineIdcard } from "react-icons/ai";
import { MdLocalPharmacy } from "react-icons/md";
import { FaUserNurse } from "react-icons/fa";
import { useAppSelector } from "../app/hooks";
import { UserRole } from "../enum/UserRole";
export default function Sidebar() {
  const { user } = useAppSelector((state) => state.UserReducer);
  return (
    <>
      <div className="flex">
        <div
          className="flex flex-col h-screen p-3
       bg-[#10204B]   shadow w-60"
        >
          <div className="space-y-3">
            <div className="flex items-center">
              <h2 className="text-xl font-bold text-white">Dashboard</h2>
            </div>

            <div className="flex-1">
              <ul className="pt-2 pb-4 space-y-1 text-sm">
                <li className="rounded-sm">
                  <Link
                    href="/Patients/medicalInfo"
                    className="flex items-center p-2 space-x-3 rounded-md"
                  >
                    <AiOutlineIdcard className="text-white text-2xl" />
                    <span className="text-gray-100">Out Patient Dept</span>
                  </Link>
                </li>
                <li className="rounded-sm">
                  <Link
                    href="/dashboard/records"
                    className="flex items-center p-2 space-x-3 rounded-md"
                  >
                    <AiOutlineIdcard className="text-white text-2xl" />
                    <span className="text-gray-100">Medical Records</span>
                  </Link>
                </li>
                <li className="rounded-sm">
                  <Link
                    href="/Patients/newPatient"
                    className="flex items-center p-2 space-x-3 rounded-md"
                  >
                    <CiUser className="text-white text-2xl" />
                    <span className="text-gray-100">Patients</span>
                  </Link>
                </li>
                {user && user.role === UserRole.Admin && (
                  <li className="rounded-sm">
                    <Link
                      href="/Doctors/newDoctor"
                      className="flex items-center p-2 space-x-3 rounded-md"
                    >
                      <CiUser className="text-white text-2xl" />
                      <span className="text-gray-100">Users</span>
                    </Link>
                  </li>
                )}
                <li className="rounded-sm">
                  <Link
                    href="/Pharmacy/newPharmacy"
                    className="flex items-center p-2 space-x-3 rounded-md"
                  >
                    <MdLocalPharmacy className="text-white text-2xl" />
                    <span className="text-gray-100">Pharmacy</span>
                  </Link>
                </li>

                <li className="rounded-sm">
                  <a
                    href="#"
                    className="flex items-center p-2 space-x-3 rounded-md"
                  >
                    <AiOutlineIdcard className="text-white text-2xl" />
                    <span className="text-gray-100">ID CARDS</span>
                  </a>
                </li>

                <li className="rounded-sm">
                  <a
                    href="#"
                    className="flex items-center p-2 space-x-3 rounded-md"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6 text-gray-100"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <span className="text-gray-100">Settings</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
