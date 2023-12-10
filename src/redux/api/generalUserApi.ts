import {  IMeta } from "@/types";
import { baseApi } from "./baseApi";
import { tagTypes } from "../tag-types";

const GENERAL_USER_URL = "/general-user";

export const generalUserApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    addGeneralUserWithFormData: build.mutation({
      query: (data) => ({
        url: "/users/create-general-user",
        method: "POST",
        data,
        // contentType: "multipart/form-data",
        contentType: "application/json",
      }),
      invalidatesTags: [tagTypes.general_user],
    }),

    getMultipleGeneralUsers: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: GENERAL_USER_URL,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response: any[], meta: IMeta) => {
        return {
          data: response,
          meta,
        };
      },
      providesTags: [tagTypes.general_user],
    }),
    getSingleGeneralUser: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `${GENERAL_USER_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.general_user],
    }),
    updateGeneralUser: build.mutation({
      query: (data) => ({
        url: `${GENERAL_USER_URL}/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagTypes.general_user,tagTypes.user],
    }),
    deleteGeneralUser: build.mutation({
      query: (id) => ({
        url: `${GENERAL_USER_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.general_user],
    }),
  }),
});

export const {
  useGetMultipleGeneralUsersQuery,
  useGetSingleGeneralUserQuery,
  useAddGeneralUserWithFormDataMutation,
  useUpdateGeneralUserMutation,
  useDeleteGeneralUserMutation,
} = generalUserApi;
