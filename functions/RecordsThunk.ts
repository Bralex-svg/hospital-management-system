import controller, { IController } from "./../controller/index";
import { createAsyncThunk } from "@reduxjs/toolkit";
import RecordModel from "../models/RecordModel";
import ResponseModel from "../models/ResponseModel";

export default createAsyncThunk(
  "api/records/thunk",
  async ({ data, method, url, params, token }: IController) => {
    try {
      return await controller<ResponseModel<RecordModel[]>>({
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
