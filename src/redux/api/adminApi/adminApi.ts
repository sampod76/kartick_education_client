import { IMeta } from '@/types';
import { baseApi } from '../baseApi';
import { tagTypes } from '../../tag-types';

const ADMIN_URL = '/admin';

export const AdminApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    addAdminWithFormData: build.mutation({
      query: (data) => ({
        url: '/users/create-admin',
        method: 'POST',
        data: data,
        contentType: 'application/json',
      }),
      invalidatesTags: [tagTypes.admin],
    }),
    getAllAdmins: build.query({
      query: (arg: Record<string, any>) => ({
        url: ADMIN_URL,
        method: 'GET',
        params: arg,
      }),
      transformResponse: (response: any[], meta: IMeta) => ({
        data: response,
        meta,
      }),
      providesTags: [tagTypes.admin],
    }),
    getSingleAdmin: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `${ADMIN_URL}/${id}`,
        method: 'GET',
      }),
      providesTags: [tagTypes.admin],
    }),
    updateAdmin: build.mutation({
      query: ({ data, id }) => ({
        url: `${ADMIN_URL}/${id}`,
        method: 'PATCH',
        data: data,
      }),
      invalidatesTags: [tagTypes.admin],
    }),
    deleteAdmin: build.mutation({
      query: (id) => ({
        url: `${ADMIN_URL}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [tagTypes.admin],
    }),
  }),
  overrideExisting: true, // This ensures you override the existing endpoints
});

export const {
  useGetAllAdminsQuery,
  useGetSingleAdminQuery,
  useAddAdminWithFormDataMutation,
  useUpdateAdminMutation,
  useDeleteAdminMutation,
} = AdminApi;
