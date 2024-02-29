// import { tagTypes.addPackageAndcourseg-types";
import { IMeta } from "@/types";
import { baseApi } from "../baseApi";
import { tagTypes } from "@/redux/tag-types";
import { ICourseData } from "@/types/courseType";

const ADD_PACKAGE_COURSE_URL = "/student_purchase_packages_course";

export const addPackageAndCourse = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get all academic departments
    getAllPackageAndCourse: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: ADD_PACKAGE_COURSE_URL,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response: ICourseData[], meta: IMeta) => {
        // console.log(response);
        return {
          data: response,
          meta,
        };
      },
      providesTags: [tagTypes.addPackageAndcourseTag],
    }),
    // get single academic department
    getSinglePackageAndCourse: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `${ADD_PACKAGE_COURSE_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.addPackageAndcourseTag],
    }),
    // create a new academic department
    addPackageAndCourse: build.mutation({
      query: (data) => ({
        url: ADD_PACKAGE_COURSE_URL,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.addPackageAndcourseTag],
    }),
    // update ac department
    updatePackageAndCourse: build.mutation({
      query: ({ data, id }) => ({
        url: `${ADD_PACKAGE_COURSE_URL}/${id}`,
        method: "PATCH",
        data: data,
      }),
      invalidatesTags: [tagTypes.addPackageAndcourseTag],
    }),

    // delete ac department
    deletePackageAndCourse: build.mutation({
      query: (id) => ({
        url: `${ADD_PACKAGE_COURSE_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.addPackageAndcourseTag],
    }),
  }),
});

export const {
  useAddPackageAndCourseMutation,
  useUpdatePackageAndCourseMutation,
  useDeletePackageAndCourseMutation,
  useGetAllPackageAndCourseQuery,
  useGetSinglePackageAndCourseQuery,
} = addPackageAndCourse;
