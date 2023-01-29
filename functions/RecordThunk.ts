import controller, { IController } from "./../controller/index";
import { createAsyncThunk } from "@reduxjs/toolkit";
import RecordModel from "../models/RecordModel";
import ResponseModel from "../models/ResponseModel";
import PatientModel from "../models/PatientModel";

export default createAsyncThunk(
  "api/record/thunk",
  async ({ data, method, url, params, token }: IController) => {
    try {
      return await controller<
        ResponseModel<{ record: RecordModel; patient: PatientModel }>
      >({
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
