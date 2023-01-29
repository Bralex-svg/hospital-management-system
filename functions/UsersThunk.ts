import controller, { IController } from "./../controller/index";
import { createAsyncThunk } from "@reduxjs/toolkit";
import ResponseModel from "../models/ResponseModel";
import UserModel from "../models/UserModel";

export default createAsyncThunk(
  "api/auth/useres",
  async ({ data, method, url, token, params }: IController) => {
    try {
      return await controller<ResponseModel<UserModel[]>>({
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
