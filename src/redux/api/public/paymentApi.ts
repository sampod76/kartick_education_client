import { tagTypes } from "@/redux/tag-types";
import { ICategory, IMeta } from "@/types";
import { baseApi } from "../baseApi";

const PAYMENT_URL = "/payment";
// const PURCHASE_URL = "/purchase_packages";
export const paymentApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // create a new academic department

    addStripePayment: build.mutation({
      query: (data) => {
        // console.log(data, "cacccc");
        return {
          url: `${PAYMENT_URL}/stripe/create-payment-intent`,
          method: "POST",
          data,
        };
      },
    }),

    addPaypalPayment: build.mutation({
      query: (data) => {
        // console.log(data, "cacccc");
        return {
          url: `${PAYMENT_URL}/paypal`,
          method: "POST",
          data,
        };
      },
    }),
    addPaypalPaymentByCourse: build.mutation({
      query: (data) => {
        // console.log(data, "cacccc");
        return {
          url: `${PAYMENT_URL}/paypal/buy_course`,
          method: "POST",
          data,
        };
      },
    }),
    addPaypalCheckPayment: build.mutation({
      query: (data) => {
        // console.log(data, "cacccc");
        return {
          url: `${PAYMENT_URL}/paypal/check`,
          method: "POST",
          data,
        };
      },
    }),
    getCheckPaypalPayment: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: `${PAYMENT_URL}/paypal/check`,
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
      providesTags: [tagTypes.userPurchaseCourse],
    }),

    // update ac department
  }),
  overrideExisting: true,
})



export const {
  useAddStripePaymentMutation,
  useAddPaypalPaymentMutation,
  useGetCheckPaypalPaymentQuery,
  useAddPaypalPaymentByCourseMutation,
} = paymentApi;
