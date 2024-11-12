import { tagTypes } from '@/redux/tag-types';
import { IMeta } from '@/types';
interface DonationFormValues {
  userName: string;
  email: string;
  phoneNumber: string;
  description: string;
  currency: string;
  amount: number;
  paymentMethod: string;
  donationCategory: string;
}

import { baseApi } from '../baseApi';

const URL = '/donations';

export const donationsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get all academic departments
    getAllDonation: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: URL,
          method: 'GET',
          params: arg,
        };
      },
      transformResponse: (response: DonationFormValues[], meta: IMeta) => {
        return {
          data: response,
          meta,
        };
      },
      // providesTags: [tagTypes.academicDepartment],
    }),
    // get single academic department
    getSingleDonation: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `${URL}/${id}`,
        method: 'GET',
      }),
      transformResponse: (response: DonationFormValues[]) => {
        return {
          data: response,
        };
      },
      // providesTags: [tagTypes.academicDepartment],
    }),
    // create a new academic department
    addDonation: build.mutation({
      query: (data) => ({
        url: URL,
        method: 'POST',
        data,
      }),
      // invalidatesTags: [tagTypes.academicDepartment],
    }),
    // update ac department
    updateDonation: build.mutation({
      query: (data) => ({
        url: `${URL}/${data.id}`,
        method: 'PATCH',
        data: data.body,
      }),
      // invalidatesTags: [tagTypes.academicDepartment],
    }),

    // delete ac department
    deleteDonation: build.mutation({
      query: (id) => ({
        url: `${URL}/${id}`,
        method: 'DELETE',
      }),
      // invalidatesTags: [tagTypes.academicDepartment],
    }),
  }),
  overrideExisting: true,
});

export const {
  useAddDonationMutation,
  useDeleteDonationMutation,
  useGetAllDonationQuery,
  useGetSingleDonationQuery,
  useUpdateDonationMutation,
} = donationsApi;
