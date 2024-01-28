import { IMeta } from "@/types";
import { baseApi } from "../baseApi";
import { tagTypes } from "../../tag-types";

const ADMIN_URL = "/seller";

export const sellerApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    addSellerWithFormData: build.mutation({
      query: (data) => {
        // 
        return {
          url: "/users/create-seller",
          method: "POST",
          data: data,
          // contentType: "multipart/form-data",
          contentType: "application/json",
        };
      },
      invalidatesTags: [tagTypes.admin],
    }),
    getAllSellers: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: ADMIN_URL,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response: any[], meta: IMeta) => {
        
        return {
          data: response,
          meta,
        };
      },
      providesTags: [tagTypes.admin],
    }),
    getSingleSeller: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `${ADMIN_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.admin],
    }),
    updateSeller: build.mutation({
      query: ({ data, id }) => {
        return {
          url: `${ADMIN_URL}/${id}`,
          method: "PATCH",
          data: data,
        };
      },
      invalidatesTags: [tagTypes.admin],
    }),
    deleteSeller: build.mutation({
      query: (id) => ({
        url: `${ADMIN_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.admin],
    }),
  }),
});

export const {
  useGetAllSellersQuery,
  useGetSingleSellerQuery,
  useAddSellerWithFormDataMutation,
  useUpdateSellerMutation,
  useDeleteSellerMutation,
} = sellerApi;
