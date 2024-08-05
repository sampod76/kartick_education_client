import { authKey } from "@/constants/storageKey";
import { removeUserInfo } from "@/services/auth.service";

import { IGenericErrorResponse, ResponseSuccessType } from "@/types";
import {
  getFromLocalStorage,
  getRefreshToken,
  setToLocalStorage,
} from "@/utils/local-storage";
import axios from "axios";
import { getBaseUrl } from "../config/envConfig";
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
    //// console.log("🚀 ~ response:", response)
    const responseObject: ResponseSuccessType = {
      data: response?.data?.data,
      meta: response?.data?.meta,
      // success:response?.data?.success,
    };
    return responseObject;
  },

  async function (error) {
    const config = error?.config;

    if (error?.response?.status === 403 && !config?._retry) {
      config._retry = true;
      try {
        // const response = await getRefreshToken();
        // const accessToken = response?.data?.accessToken;
        const response = await axios.post(
          `${getBaseUrl()}/auth/refresh-token`,
          {},
          { withCredentials: true }
        );
        const accessToken = response?.data?.data?.accessToken;
        // axios.defaults.headers.common['Authorization'] = accessToken;
        config.headers["Authorization"] = accessToken;
        setToLocalStorage(authKey, accessToken);
        return instance(config);
      } catch (error: any) {
        // removeUserInfo(authKey);
        localStorage.clear();
        window.location.href = "/login";
        return Promise.reject(error?.response?.data);
      }
    } else {
      /*
       if (
        error?.response?.status === 403 ||
        error?.response?.data?.message ===
          "Validation Error:-> refreshToken : Refresh Token is required"
      ) {
        removeUserInfo(authKey);
        window.location.href = "/login";
      } 
    */
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
      return Promise.reject(responseObject);
      // return responseObject;
    }

    // return Promise.reject(error);
  }
);

export { instance };
