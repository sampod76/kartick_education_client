import { tagTypes } from "@/redux/tag-types";
import { IMeta } from "@/types";
import { baseApi } from "../baseApi";
import { ICourseLevelData } from "@/types/courseLevelDataType";

const COURSE_LEVEL_URL = "/course_label";

export const Course_labelApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get all academic departments
    getAllCourse_label: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: COURSE_LEVEL_URL,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response: ICourseLevelData[], meta: IMeta) => {
        // console.log(response);
        return {
          data: response,
          meta,
        };
      },
      providesTags: [tagTypes.course_label],
    }),
    // get single academic department
    getSingleCourse_label: build.query({
      query: (id: string | string[] | undefined) => {
        // console.log(id);
        return {
          url: `${COURSE_LEVEL_URL}/${id}`,
          method: "GET",
        };
      },
      providesTags: [tagTypes.course_label],
    }),
    // create a new academic department
    addCourse_label: build.mutation({
      query: (data) => {
        // console.log(data, "cacccc");

        return {
          url: COURSE_LEVEL_URL,
          method: "POST",
          data,
        };
      },
      invalidatesTags: [tagTypes.course_label],
    }),
    // update ac department
    updateCourse_label: build.mutation({
      query: ({ data, id }) => {
        // console.log(data, "Course_label data");
        return {
          url: `${COURSE_LEVEL_URL}/${id}`,
          method: "PATCH",
          data: data,
        };
      },
      invalidatesTags: [tagTypes.course_label],
    }),

    // delete ac department
    deleteCourse_label: build.mutation({
      query: (id) => ({
        url: `${COURSE_LEVEL_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.course_label],
    }),
  }),
});

export const {
  useAddCourse_labelMutation,
  useDeleteCourse_labelMutation,
  useGetAllCourse_labelQuery,
  useGetSingleCourse_labelQuery,
  useUpdateCourse_labelMutation,
} = Course_labelApi;
