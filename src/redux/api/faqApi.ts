import { tagTypes } from "@/redux/tag-types";
import {   IMeta } from "@/types";
import { baseApi } from "./baseApi";
import { IFaq } from "@/schemas/faq";


const FAQ_URL = "/faq";

export const faqApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get all academic departments
    getAllFaq: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: FAQ_URL,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response: IFaq[], meta: IMeta) => {
        return {
          data: response,
          meta,
        };
      },
      providesTags: [tagTypes.faq],
    }),
    // get single academic department
    getSingleFaq: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `${FAQ_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.faq],
    }),
    // create a new academic department
    addFaq: build.mutation({
      query: (data) => ({
        url: FAQ_URL,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.faq],
    }),
    // update ac department
    updateFaq: build.mutation({
      query: (data) => ({
        url: `${FAQ_URL}/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagTypes.faq],
    }),

    // delete ac department
    deleteFaq: build.mutation({
      query: (id) => ({
        url: `${FAQ_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.faq],
    }),
  }),
});

export const {
  useAddFaqMutation,
  useDeleteFaqMutation,
  useGetAllFaqQuery,
  useGetSingleFaqQuery,
  useUpdateFaqMutation,
} = faqApi;
