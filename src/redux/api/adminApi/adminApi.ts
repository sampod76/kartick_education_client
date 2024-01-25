import { IMeta } from "@/types";
import { baseApi } from "../baseApi";
import { tagTypes } from "../../tag-types";

const ADMIN_URL = "/admin";

export const AdminApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    addAdminWithFormData: build.mutation({
      query: (data) => {
        // console.log(data, "Admin");
        return {
          url: "/users/create-admin",

          method: "POST",
          data: data,
          // contentType: "multipart/form-data",
          contentType: "application/json",
        };
      },
      invalidatesTags: [tagTypes.admin],
    }),
    getAllAdmins: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: ADMIN_URL,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response: any[], meta: IMeta) => {
        // console.log(response);
        return {
          data: response,
          meta,
        };
      },
      providesTags: [tagTypes.admin],
    }),
    getSingleAdmin: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `${ADMIN_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.admin],
    }),
    updateAdmin: build.mutation({
      query: ({ data, id }) => {
        return {
          url: `${ADMIN_URL}/${id}`,
          method: "PATCH",
          data: data,
        };
      },
      invalidatesTags: [tagTypes.admin],
    }),
    deleteAdmin: build.mutation({
      query: (id) => ({
        url: `${ADMIN_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.admin],
    }),
  }),
});

export const {
  useGetAllAdminsQuery,
  useGetSingleAdminQuery,
  useAddAdminWithFormDataMutation,
  useUpdateAdminMutation,
  useDeleteAdminMutation,
} = AdminApi;
