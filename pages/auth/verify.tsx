import React from "react";
import { OtpVerifcation, Verification } from "../../components";
import Login from "../../components/Login";
import SignIn from "../../components/SignIn";

function login() {
  return (
    <div>
      <OtpVerifcation />
      <Verification />
    </div>
  );
}

export default login;
