import { tagTypes } from "@/redux/tag-types";
import { ICategory, IMeta } from "@/types";
import { baseApi } from "../baseApi";


const PAYMENT_URL = "/payment";

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
    // update ac department
  }),
  overrideExisting: true
});

export const { useAddStripePaymentMutation,useAddPaypalPaymentMutation } = paymentApi;
