import { tagTypes } from "@/redux/tag-types";
import {   IMeta } from "@/types";
import { baseApi } from "./baseApi";
import { IBooking } from "@/schemas/booking";

const BOOKING_URL = "/booking";

export const bookingApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get all academic departments
    getAllBooking: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: BOOKING_URL,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response: IBooking[], meta: IMeta) => {
        return {
          data: response,
          meta,
        };
      },
      providesTags: [tagTypes.booking],
    }),
    // get single academic department
    getSingleBooking: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `${BOOKING_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.booking],
    }),
    // create a new academic department
    addBooking: build.mutation({
      query: (data) => ({
        url: BOOKING_URL,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.booking],
    }),
    // update ac department
    updateBooking: build.mutation({
      query: (data) => ({
        url: `${BOOKING_URL}/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagTypes.booking],
    }),

    // delete ac department
    deleteBooking: build.mutation({
      query: (id) => ({
        url: `${BOOKING_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.booking],
    }),
  }),
});

export const {
  useAddBookingMutation,
  useDeleteBookingMutation,
  useGetAllBookingQuery,
  useGetSingleBookingQuery,
  useUpdateBookingMutation,
} = bookingApi;
