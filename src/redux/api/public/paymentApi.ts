import { tagTypes } from '@/redux/tag-types';
import { IMeta } from '@/types';
import { baseApi } from '../baseApi';

const PAYMENT_URL = '/payment';
const PAYMENT_URL2 = '/payment-v2';
// const PURCHASE_URL = "/purchase_packages";
export const paymentApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // create a new academic department

    addDonateStripePayment: build.mutation({
      query: (data) => {
        return {
          url: `${PAYMENT_URL2}/stripe/donation-create-payment-link`,
          method: 'POST',
          data,
        };
      },
    }),
    addStripeCoursePayment: build.mutation({
      query: (data) => {
        return {
          url: `${PAYMENT_URL2}/stripe/course-create-payment-link`,
          method: 'POST',
          data,
        };
      },
    }),

    addPaypalPayment: build.mutation({
      query: (data) => {
        return {
          url: `${PAYMENT_URL}/paypal`,
          method: 'POST',
          data,
        };
      },
    }),
    addPaypalPaymentByCourse: build.mutation({
      query: (data) => {
        return {
          url: `${PAYMENT_URL}/paypal/buy_course`,
          method: 'POST',
          data,
        };
      },
    }),
    addPaypalCheckPayment: build.mutation({
      query: (data) => {
        return {
          url: `${PAYMENT_URL}/paypal/check`,
          method: 'POST',
          data,
        };
      },
    }),
    getCheckPaypalPayment: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: `${PAYMENT_URL}/paypal/check`,
          method: 'GET',
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
});

export const {
  useAddDonateStripePaymentMutation,
  useAddPaypalPaymentMutation,
  useGetCheckPaypalPaymentQuery,
  useAddPaypalPaymentByCourseMutation,
  useAddStripeCoursePaymentMutation,
} = paymentApi;
