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
    } else {
      config.headers.Authorization =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNhbXBvZG5hdGhAZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzAyOTcwMjcxLCJleHAiOjE3MzQ1MDYyNzF9.zatIAeeSNq-nadQJXcLgQMaTF83bh5M7oSfWQov0nkU";
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
    const responseObject: ResponseSuccessType = {
      // success: response?.data?.success,
      data: response?.data?.data,
      meta: response?.data?.meta,
    };
    return responseObject;
  },
  async function (error) {
    // if (error?.response?.status === 403) {

    // } else {
    const responseObject: any = {
      statusCode: error?.response?.status || 500,
      message: error?.response?.data?.message || "Something went wrong",
      errorMessages: error?.response?.data?.errorMessage,
    };
    // return Promise.reject(responseObject);
    return error.response;
  }

  //   return Promise.reject(error);
  // }
);

export { instance };
