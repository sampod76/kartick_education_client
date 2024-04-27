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
      providesTags: [tagTypes.submitQuiz],
    }),
    getAnalyticsSubmitAllQuiz: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: `${SUBMIT_QUIZ_URL}/analytics`,
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
      providesTags: [tagTypes.submitQuiz],
    }),
    // get single academic department
    getSubmitUserQuiz: build.query({
      query: (id: string | string[] | undefined) => {
        // console.log(id,'getSubmitUserQuizgetSubmitUserQuizgetSubmitUserQuizgetSubmitUserQuiz');

        return {
          url: `${SUBMIT_QUIZ_URL}/verify/quizId/${id}?delete=no`,
          method: "GET",
        };
      },
      providesTags: [tagTypes.submitQuiz],
    }),
    // create a new academic department
    submitQuiz: build.mutation({
      query: (data) => {
        //

        return {
          url: SUBMIT_QUIZ_URL,
          method: "POST",
          data,
        };
      },
      invalidatesTags: [tagTypes.submitQuiz],
    }),
  }),
});

export const {
  useSubmitQuizMutation,
  useGetSubmitAllQuizQuery,
  useGetSubmitUserQuizQuery,
  useGetAnalyticsSubmitAllQuizQuery
} = SubmitQuizApi;
