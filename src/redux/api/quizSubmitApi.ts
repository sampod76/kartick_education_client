import { tagTypes } from "@/redux/tag-types";
import { IMeta } from "@/types";
import { baseApi } from "./baseApi";

const SUBMIT_QUIZ_URL = "/quiz_submit";

export const SubmitQuizApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get all academic departments
    getSubmitAllQuiz: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: SUBMIT_QUIZ_URL,
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
      providesTags: [tagTypes.quiz],
    }),
    // get single academic department
    getSingleQuiz: build.query({
      query: (id: string | string[] | undefined) => {
        // console.log(id);

        return {
          url: `${SUBMIT_QUIZ_URL}/${id}`,
          method: "GET",
        };
      },
      providesTags: [tagTypes.quiz],
    }),
    // create a new academic department
    addQuiz: build.mutation({
      query: (data) => {
        //

        return {
          url: SUBMIT_QUIZ_URL,
          method: "POST",
          data,
        };
      },
      invalidatesTags: [tagTypes.quiz, tagTypes.categoryChildren],
    }),
    // update ac department
    updateQuiz: build.mutation({
      query: ({ data, id }) => {
        return {
          url: `${SUBMIT_QUIZ_URL}/${id}`,
          method: "PATCH",
          data: data,
        };
      },
      invalidatesTags: [tagTypes.quiz, tagTypes.categoryChildren],
    }),

    // delete ac department
    deleteQuiz: build.mutation({
      query: (id) => ({
        url: `${SUBMIT_QUIZ_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.quiz, tagTypes.categoryChildren],
    }),
  }),
});

export const {
  useAddQuizMutation,
  useDeleteQuizMutation,
  useGetAllQuizQuery,
  useGetSingleQuizQuery,
  useUpdateQuizMutation,
} = SubmitQuizApi;
