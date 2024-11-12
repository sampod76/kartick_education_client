import { IMeta } from '@/types';
import { baseApi } from '../baseApi';
import { tagTypes } from '../../tag-types';

const ADMIN_URL = '/seller';

export const sellerApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    addSellerWithFormData: build.mutation({
      query: (data) => {
        //
        return {
          url: '/users/create-seller',
          method: 'POST',
          data: data,
          // contentType: "multipart/form-data",
          contentType: 'application/json',
        };
      },
      invalidatesTags: [tagTypes.seller],
    }),
    getAllSellers: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: ADMIN_URL,
          method: 'GET',
          params: arg,
        };
      },
      transformResponse: (response: any[], meta: IMeta) => {
        return {
          data: response,
          meta,
        };
      },
      providesTags: [tagTypes.seller],
    }),
    getSingleSeller: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `${ADMIN_URL}/${id}`,
        method: 'GET',
      }),
      providesTags: [tagTypes.seller],
    }),
    updateSeller: build.mutation({
      query: ({ data, id }) => {
        return {
          url: `${ADMIN_URL}/${id}`,
          method: 'PATCH',
          data: data,
        };
      },
      invalidatesTags: [tagTypes.seller],
    }),
    addCatagoriesByAdminToSeller: build.mutation({
      query: ({ data, id }) => {
        return {
          url: `${ADMIN_URL}/add-categories/${id}`,
          method: 'PATCH',
          data: data,
        };
      },
      invalidatesTags: [tagTypes.seller],
    }),
    deleteSeller: build.mutation({
      query: (id) => ({
        url: `${ADMIN_URL}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [tagTypes.seller],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetAllSellersQuery,
  useGetSingleSellerQuery,
  useAddSellerWithFormDataMutation,
  useUpdateSellerMutation,
  useDeleteSellerMutation,
  useAddCatagoriesByAdminToSellerMutation,
} = sellerApi;
