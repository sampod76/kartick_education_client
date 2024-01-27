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
      invalidatesTags: [tagTypes.LoginHistory],
    }),
    userLogOut: build.mutation({
      query: ({ id, data }) => ({
        url: `${AUTH_URL}/log-out-history/${id}`,
        method: "POST",
        data: {},
        withCredentials: true,
      }),
      invalidatesTags: [tagTypes.LoginHistory],
    }),
    getProfile: build.query({
      query: () => ({
        url: `${AUTH_URL}/profile`,
        method: "GET",
      }),
      providesTags: [tagTypes.profile],
    }),
    updateRole: build.mutation({
      query: (data) => ({
        url: `/users/update-role/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagTypes.profile],
    }),
    forgetPassword: build.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/forgot-password`,
        method: "POST",
        data: data,
      }),
      invalidatesTags: [tagTypes.profile],
    }),
  }),
  overrideExisting: true
});

export const {
  useUserLoginMutation,
  useGetProfileQuery,
  useUpdateRoleMutation,
  useForgetPasswordMutation,
  useUserLogOutMutation,
} = authApi;
