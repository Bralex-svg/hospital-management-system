/* eslint-disable import/no-anonymous-default-export */
import Axios from "axios";

export interface IController {
  method?: "post" | "get" | "put" | "delete" | "patch";
  token?: string;
  url?: string;
  data?: any;
  isFile?: boolean;
  params?: any;
}

export const baseUrl: string = "http://localhost:2222/";
// export const baseUrl: string = "https://hmstan-api.herokuapp.com/";

export default function <T>({
  data,
  token,
  params,
  url,
  method,
  isFile,
}: IController) {
  return new Promise<T>(function (resolve, reject) {
    try {
      Axios({
        baseURL: baseUrl,
        url,
        data,
        params,
        method: method ? method : "post",
        headers: {
          authorization: `Bearer ${token}`,
          contentType: isFile ? "mutlipart/form-data" : "application/json",
        },
      })
        .then((response) => {
          if (response.status === 200 || response.status === 201) {
            resolve(response.data as T);
          } else {
            reject(response.statusText);
          }
        })
        .catch((error) =>
          reject(
            error?.response?.data?.message ||
              error?.response?.message ||
              error?.message ||
              error
          )
        );
    } catch (error) {
      reject(error);
    }
  });
}
