import { IMeta } from "@/types";
import { baseApi } from "../baseApi";
import { tagTypes } from "../../tag-types";

const STUDENT_URL = "/student";

export const moderatorsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    addStudentWithFormData: build.mutation({
      query: (data) => {
        // console.log(data, "student");
        return {
          url: "/users/create-student",
          method: "POST",
          data: data,
          // contentType: "multipart/form-data",
          contentType: "application/json",
        };
      },
      invalidatesTags: [tagTypes.student],
    }),
    getAllStudents: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: STUDENT_URL,
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
      providesTags: [tagTypes.student],
    }),
    getSingleStudent: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `${STUDENT_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.student],
    }),
    updateStudent: build.mutation({
      query: (data) => ({
        url: `${STUDENT_URL}/${data.id}?stat`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagTypes.student, tagTypes.student],
    }),
    deleteStudent: build.mutation({
      query: (id) => ({
        url: `${STUDENT_URL}/${id}`,
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
} = moderatorsApi;
