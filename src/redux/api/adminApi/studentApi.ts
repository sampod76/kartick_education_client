import { IMeta } from "@/types";
import { baseApi } from "../baseApi";
import { tagTypes } from "../../tag-types";

const GENERAL_USER_URL = "/student";

export const studentApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    addStudentWithFormData: build.mutation({
      query: (data) => ({
        url: "/user/create-student",
        method: "POST",
        data,
        // contentType: "multipart/form-data",
        contentType: "application/json",
      }),
      invalidatesTags: [tagTypes.student],
    }),
    getAllStudents: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: GENERAL_USER_URL,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response: any) => {
        // console.log(response, "from getAllStudents");
        return {
          data: response.data,
          meta: response.meta,
        };
      },
      providesTags: [tagTypes.student],
    }),
    getSingleStudent: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `${GENERAL_USER_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.student],
    }),
    updateStudent: build.mutation({
      query: (data) => ({
        url: `${GENERAL_USER_URL}/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagTypes.student, tagTypes.student],
    }),
    deleteStudent: build.mutation({
      query: (id) => ({
        url: `${GENERAL_USER_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.student],
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
