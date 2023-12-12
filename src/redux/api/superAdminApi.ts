import {  IMeta } from "@/types";
import { baseApi } from "./baseApi";
import { tagTypes } from "../tag-types";

const SUPER_ADMIN_URL = "/super-admin";

export const adminApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // addAdminWithFormData: build.mutation({
    //   query: (data) => ({
    //     url: "/users/create-admin",
    //     method: "POST",
    //     data,
    //     // contentType: "multipart/form-data",
    //     contentType: "application/json",
    //   }),
    //   invalidatesTags: [tagTypes.admin],
    // }),

    // getMultipleAdmins: build.query({
    //   query: (arg: Record<string, any>) => {
    //     return {
    //       url: SUPER_ADMIN_URL,
    //       method: "GET",
    //       params: arg,
    //     };
    //   },
    //   transformResponse: (response: any[], meta: IMeta) => {
    //     return {
    //       data: response,
    //       meta,
    //     };
    //   },
    //   providesTags: [tagTypes.admin],
    // }),
    getSingleSuperadmin: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `${SUPER_ADMIN_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.user],
    }),
    updateSuperAdmin: build.mutation({
      query: (data) => ({
        url: `${SUPER_ADMIN_URL}/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagTypes.user],
    }),
   
  }),
});

export const {
  useGetSingleSuperadminQuery,
  useUpdateSuperAdminMutation
} = adminApi;
