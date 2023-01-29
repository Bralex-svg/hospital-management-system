import React from "react";
import { PatientLogin, PatientSignIn } from "../../../components";

function login() {
  return (
    <div>
      <PatientLogin />
      <PatientSignIn />
    </div>
  );
}

export default login;
