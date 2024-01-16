import { tagTypes } from "@/redux/tag-types";
import { ICategory, IMeta } from "@/types";
import { baseApi } from "../baseApi";

const PAYMENT_URL = "/payment";

export const categoryApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get all academic departments
   
    getSingleCategory: build.query({
      query: (id: string | string[] | undefined) => {
        // console.log(id);
        return {
          url: `${PAYMENT_URL}/${id}`,
          method: "GET",
        };
      },
      providesTags: [tagTypes.category],
    }),
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
      invalidatesTags: [tagTypes.category,tagTypes.categoryChildren],
    }),
    // update ac department
   

  
  }),
});

export const {
  useAddStripePaymentMutation,
  useGetSingleCategoryQuery,
 
} = categoryApi;
