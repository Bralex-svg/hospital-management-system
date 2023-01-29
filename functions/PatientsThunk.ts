import { createAsyncThunk } from "@reduxjs/toolkit";
import PatientModel from "../models/PatientModel";
import ResponseModel from "../models/ResponseModel";
import controller, { IController } from "./../controller/index";

export default createAsyncThunk(
  "api/patients/thunk",
  async ({ data, token, url, method, params }: IController) => {
    try {
      return await controller<ResponseModel<PatientModel[]>>({
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
