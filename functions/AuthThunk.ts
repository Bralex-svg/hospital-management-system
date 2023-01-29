import controller, { IController } from "./../controller/index";
import { createAsyncThunk } from "@reduxjs/toolkit";
import ResponseModel from "../models/ResponseModel";
import UserModel from "../models/UserModel";

export default createAsyncThunk(
  "api/auth/login_register",
  async ({ method, token, url, data, params }: IController) => {
    try {
      return await controller<ResponseModel<UserModel>>({
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
