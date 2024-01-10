import { authKey } from "@/constants/storageKey";

import { IGenericErrorResponse, ResponseSuccessType } from "@/types";
import { getFromLocalStorage, setToLocalStorage } from "@/utils/local-storage";
import axios from "axios";
// import { message } from 'antd';

const instance = axios.create();
instance.defaults.headers.post["Content-Type"] = "application/json";
instance.defaults.headers["Accept"] = "application/json";
instance.defaults.timeout = 60000;

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    const accessToken = getFromLocalStorage(authKey);
    if (accessToken) {
      config.headers.Authorization = accessToken;
    }

    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  //@ts-ignore
  function (response) {
    console.log("🚀 ~ response:", response)
    const responseObject: ResponseSuccessType = {
      data: response?.data?.data,
      meta: response?.data?.meta,
      // success:response?.data?.success,
    };
    return responseObject;
  },

  async function (error) {
    if (error?.response?.status === 403) {
    } else {
      console.log(error);

      let responseObject: any = {
        statusCode: error?.response?.status || 500,
        message: "Something went wrong",
        success: false,
        errorMessages: [],
      };
      // Check if the error response has the expected structure
      if (error?.response?.data) {
        responseObject.message =
          error?.response?.data?.message || responseObject.message;
        responseObject.success =
          error?.response?.data?.success || responseObject.success;

        if (error?.response?.data?.errorMessage) {
          responseObject.errorMessages.push(
            error?.response?.data?.errorMessage
            );
          }
        }
        console.log("🚀 ~ responseObject:", responseObject)
      
      return Promise.reject(responseObject);
      // return responseObject;
    }

    // return Promise.reject(error);
  }
);

export { instance };
