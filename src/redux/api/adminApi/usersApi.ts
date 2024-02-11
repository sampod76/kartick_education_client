import { IMeta } from "@/types";
import { baseApi } from "../baseApi";
import { tagTypes } from "../../tag-types";

const User_URL = "/users";

export const UserApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    addUserWithFormData: build.mutation({
      query: (data) => {
        // 
        return {
          url: "/users/create-User",
          method: "POST",
          data: data,
          // contentType: "multipart/form-data",
          contentType: "application/json",
        };
      },
      invalidatesTags: [tagTypes.user],
    }),
    getAllUsers: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: User_URL,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response: any, meta: IMeta) => {

        // console.log(response);


        return {
          data: response.data,
          meta: response.meta,
        };
      },

      providesTags: [tagTypes.user],
    }),
    getSingleUser: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `${User_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.user],
    }),
    updateUser: build.mutation({
      query: (data) => ({
        url: `${User_URL}/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagTypes.user, tagTypes.user],
    }),
    deleteUser: build.mutation({
      query: (id: string) => ({
        url: `${User_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.user],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetSingleUserQuery,
  useAddUserWithFormDataMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = UserApi;
