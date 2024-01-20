import { tagTypes } from "../../tag-types";
import { baseApi } from "../baseApi";

const AUTH_URL = "/auth";

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    userLogin: build.mutation({
      query: (loginData) => ({
        url: `${AUTH_URL}/login`,
        method: "POST",
        data: loginData,
      }),
      invalidatesTags:[tagTypes.student]
    }),
    getProfile: build.query({
      query: () => ({
        url: `${AUTH_URL}/profile`,
        method: "GET",
      }),
      providesTags: [tagTypes.student],
    }),
    updateRole: build.mutation({
      query: (data) => ({
        url: `/users/update-role/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagTypes.student],
    }),
      forgetPassword: build.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/forgot-password`,
        method: "POST",
        data: data,
      }),
      invalidatesTags:[tagTypes.student]
    }),
  }),
});

export const {
  useUserLoginMutation,
  useGetProfileQuery,
  useUpdateRoleMutation,
  useForgetPasswordMutation
} = authApi;
