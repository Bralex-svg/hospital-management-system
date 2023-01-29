import PatientModel from "../models/PatientModel";
import ResponseModel from "../models/ResponseModel";
import controller, { IController } from "./../controller/index";
import { createAsyncThunk } from "@reduxjs/toolkit";

export default createAsyncThunk(
  "api/patient/thunk",
  async ({ data, token, url, method, params }: IController) => {
    try {
      return await controller<ResponseModel<PatientModel>>({
        data,
        method,
        url,
        token,
        params,
      });
    } catch (error) {
      throw error;
    }
  }
);
