import { tagTypes } from "@/redux/tag-types";
import {  IMeta } from "@/types";
import { baseApi } from "./baseApi";

const RATING_FEEDBACK = "/rating-feedback";

export const ratingFeedbackApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get all academic departments
    getAllRatingFeedback: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: RATING_FEEDBACK,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response: any, meta: IMeta) => {
        return {
          data: response,
          meta,
        };
      },
      providesTags: [tagTypes.rating],
    }),
    // get single academic department
    getSingleRatingFeedback: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `${RATING_FEEDBACK}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.rating],
    }),
    // create a new academic department
    addRatingFeedback: build.mutation({
      query: (data) => ({
        url: RATING_FEEDBACK,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.rating,tagTypes.booking],
    }),
    // update ac department
    updateRatingFeedback: build.mutation({
      query: (data) => ({
        url: `${RATING_FEEDBACK}/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagTypes.rating,tagTypes.booking],
    }),

    // delete ac department
    deleteRatingFeedback: build.mutation({
      query: (id) => ({
        url: `${RATING_FEEDBACK}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.rating],
    }),
  }),
});

export const {
  useAddRatingFeedbackMutation,
  useDeleteRatingFeedbackMutation,
  useGetAllRatingFeedbackQuery,
  useGetSingleRatingFeedbackQuery,
  useUpdateRatingFeedbackMutation,
} = ratingFeedbackApi;
