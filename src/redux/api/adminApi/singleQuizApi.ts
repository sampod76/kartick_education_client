import { tagTypes } from "@/redux/tag-types";
import { IMeta } from "@/types";
import { baseApi } from "../baseApi";
import { ISingleQuizData } from "@/types/quiz/singleQuizType";

const SINGLE_QUIZ_URL = "/single-quiz";

export const SingleQuizApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get all academic departments
    getAllSingleQuiz: build.query({
      query: (arg: Record<string, any>) => {
        // console.log(arg,'aa')
        return {
          url: SINGLE_QUIZ_URL,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response: ISingleQuizData[], meta: IMeta) => {
        // console.log(response);

        return {
          data: response,
          meta,
        };
      },
      providesTags: [tagTypes.quiz],
    }),
    // get single academic department
    getSingleOneQuiz: build.query({
      query: (id: string | string[] | undefined) => {
        // console.log(id);

        return {
          url: `${SINGLE_QUIZ_URL}/${id}`,
          method: "GET",
        };
      },
      providesTags: [tagTypes.quiz],
    }),
    // create a new academic department
    addSingleQuiz: build.mutation({
      query: (data) => {
        //

        return {
          url: SINGLE_QUIZ_URL,
          method: "POST",
          data,
        };
      },
      invalidatesTags: [tagTypes.quiz],
    }),
    // update ac department
    updateSingleQuiz: build.mutation({
      query: ({ data, id }) => {
        // console.log(data, "Quiz data");

        return {
          url: `${SINGLE_QUIZ_URL}/${id}`,
          method: "PATCH",
          data: data,
        };
      },
      invalidatesTags: [tagTypes.quiz],
    }),

    // delete ac department
    deleteSingleQuiz: build.mutation({
      query: (id) => {
        
        return {
          url: `${SINGLE_QUIZ_URL}/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: [tagTypes.quiz],
    }),
  }),
});

export const {
  useAddSingleQuizMutation,
  useDeleteSingleQuizMutation,
  useGetAllSingleQuizQuery,
  useGetSingleOneQuizQuery,
  useUpdateSingleQuizMutation,
} = SingleQuizApi;
