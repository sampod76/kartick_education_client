import { tagTypes } from "@/redux/tag-types";
import { IMeta } from "@/types";
import { baseApi } from "../baseApi";
import { ICartData } from "@/types/cartData";

const CART_URL = "/course-cart";

export const cartApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get all academic departments
    getAllCart: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: CART_URL,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response: ICartData[], meta: IMeta) => {
        return {
          data: response,
          meta,
        };
      },
      providesTags: [tagTypes.cart],
    }),
    // get single academic department
    getSingleCart: build.query({
      query: (id: string | string[] | undefined) => {
        return {
          url: `${CART_URL}/${id}`,
          method: "GET",
        };
      },
      providesTags: [tagTypes.cart],
    }),
    // create a new academic department
    addCart: build.mutation({
      query: (data) => {
        return {
          url: CART_URL,
          method: "POST",
          data,
        };
      },
      invalidatesTags: [tagTypes.cart],
    }),
    // update ac department
    updateCart: build.mutation({
      query: ({ data, id }) => {
        return {
          url: `${CART_URL}/${id}`,
          method: "PATCH",
          data: data,
        };
      },
      invalidatesTags: [tagTypes.cart],
    }),

    // delete ac department
    deleteCart: build.mutation({
      query: (id) => ({
        url: `${CART_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.cart],
    }),
  }),
});

export const {
  useAddCartMutation,
  useDeleteCartMutation,
  useGetAllCartQuery,
  useGetSingleCartQuery,
  useUpdateCartMutation,
} = cartApi;
