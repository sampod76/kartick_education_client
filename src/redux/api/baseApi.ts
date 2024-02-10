import { axiosBaseQuery } from "@/helpers/axios/axiosBaseQuery";
import { getBaseUrl } from "@/helpers/config/envConfig";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { tagTypesList } from "../tag-types";

// Define a service using a base URL and expected endpoints
export const baseApi = createApi({
  reducerPath: "api",
  // baseQuery: axiosBaseQuery({ baseUrl: "http://api.iblossomlearn.org/api/v1" }),
  baseQuery: axiosBaseQuery({ baseUrl: getBaseUrl() }),
  // baseQuery: fetchBaseQuery({ baseUrl: "http://api.iblossomlearn.org/api/v1" }),
  endpoints: () => ({}),
  tagTypes: tagTypesList,
});

