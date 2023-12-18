import { tagTypes } from "@/redux/tag-types";
import {  IMeta } from "@/types";
import { baseApi } from "../baseApi";

const COURSE_URL = "/course";

export const courseApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get all academic departments
    getAllCourse: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: COURSE_URL,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response: { data:any, meta: IMeta }) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
      // providesTags: [tagTypes.academicDepartment],
    }),
    // get single academic department
    getSingleCourse: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `${COURSE_URL}/${id}`,
        method: "GET",
      }),
      // providesTags: [tagTypes.academicDepartment],
    }),
    // create a new academic department
    addCourse: build.mutation({
      query: (data) => ({
        url: COURSE_URL,
        method: "POST",
        data,
      }),
      // invalidatesTags: [tagTypes.academicDepartment],
    }),
    // update ac department
    updateCourse: build.mutation({
      query: (data) => ({
        url: `${COURSE_URL}/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      // invalidatesTags: [tagTypes.academicDepartment],
    }),

    // delete ac department
    deleteCourse: build.mutation({
      query: (id) => ({
        url: `${COURSE_URL}/${id}`,
        method: "DELETE",
      }),
      // invalidatesTags: [tagTypes.academicDepartment],
    }),
  }),
});

export const {
  useAddCourseMutation,
  useDeleteCourseMutation,
  useGetAllCourseQuery,
  useGetSingleCourseQuery,
  useUpdateCourseMutation,
} = courseApi;
