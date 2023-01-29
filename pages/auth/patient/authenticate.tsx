import React from "react";
import {
  PatientAuth,
  PatientAuthentication,
  PatientLogin,
  PatientSignIn,
} from "../../../components";

function authenticate() {
  return (
    <div>
      <PatientAuth />
      <PatientAuthentication />
    </div>
  );
}

export default authenticate;
