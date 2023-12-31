import { IMeta } from "@/types";
import { baseApi } from "../baseApi";
import { tagTypes } from "../../tag-types";

const ADMIN_URL = "/admin";

export const studentApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    addStudentWithFormData: build.mutation({
      query: (data) => {
        // console.log(data, "student");
        return {
          url: "/user/create-admin",
          method: "POST",
          data: data,
          // contentType: "multipart/form-data",
          contentType: "application/json",
        };
      },
      invalidatesTags: [tagTypes.admin],
    }),
    getAllStudents: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: ADMIN_URL,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response: any[], meta: IMeta) => {
        console.log(response);
        return {
          data: response,
          meta,
        };
      },
      providesTags: [tagTypes.admin],
    }),
    getSingleStudent: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `${ADMIN_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.admin],
    }),
    updateStudent: build.mutation({
      query: ({ data, id }) => {
        return {
          url: `${ADMIN_URL}/${id}`,
          method: "PATCH",
          data: data,
        };
      },
      invalidatesTags: [tagTypes.admin],
    }),
    deleteStudent: build.mutation({
      query: (id) => ({
        url: `${ADMIN_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.admin],
    }),
  }),
});

export const {
  useGetAllStudentsQuery,
  useGetSingleStudentQuery,
  useAddStudentWithFormDataMutation,
  useUpdateStudentMutation,
  useDeleteStudentMutation,
} = studentApi;
