// import { tagTypes.courseg-types";
import { IMeta } from "@/types";
import { baseApi } from "../baseApi";
import { tagTypes } from "@/redux/tag-types";
import { ICourseData } from "@/types/courseType";

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
      transformResponse: (response: ICourseData[], meta: IMeta) => {
        // console.log(response);
        return {
          data: response,
          meta,
        };
      },
      providesTags: [tagTypes.course],
    }),
    // get single academic department
    getSingleCourse: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `${COURSE_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.course],
    }),
    getSingleCourseModuleLessonQuizVideoSize: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `${COURSE_URL}/course-modulesize-lessonsize-quizsize/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.course],
    }),
    // create a new academic department
    addCourse: build.mutation({
      query: (data) => ({
        url: COURSE_URL,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.course, tagTypes.categoryChildren],
    }),
    // update ac department
    updateCourse: build.mutation({
      query: ({ data, id }) => ({
        url: `${COURSE_URL}/${id}`,
        method: "PATCH",
        data: data,
      }),
      invalidatesTags: [tagTypes.course],
    }),

    // delete ac department
    deleteCourse: build.mutation({
      query: (id) => ({
        url: `${COURSE_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.course],
    }),
  }),
});

export const {
  useAddCourseMutation,
  useDeleteCourseMutation,
  useGetAllCourseQuery,
  useGetSingleCourseQuery,
  useUpdateCourseMutation,
  useGetSingleCourseModuleLessonQuizVideoSizeQuery
} = courseApi;
