import { tagTypes } from '@/redux/tag-types';
import { IMeta } from '@/types';
import { baseApi } from '../baseApi';

const URL = '/members';

export const memberApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get all academic departments
    getAllMember: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: URL,
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
      providesTags: [tagTypes.Member],
    }),
    // get single academic department
    getSingleMember: build.query({
      query: (id: string | string[] | undefined) => {
        //// console.log(id);
        return {
          url: `${URL}/${id}`,
          method: 'GET',
        };
      },
      providesTags: [tagTypes.Member],
    }),

    // create a new academic department
    addMember: build.mutation({
      query: (data) => {
        //// console.log(data, "cacccc");

        return {
          url: URL,
          method: 'POST',
          data,
          contentType: 'multipart/form-data',
        };
      },
      invalidatesTags: [tagTypes.Member],
    }),
    // update ac department
    updateMember: build.mutation({
      query: ({ data, id }) => {
        //// console.log(data, "Member data");
        return {
          url: `${URL}/${id}`,
          method: 'PATCH',
          data: data,
          contentType: 'multipart/form-data',
        };
      },
      invalidatesTags: [tagTypes.Member],
    }),

    // delete ac department
    deleteMember: build.mutation({
      query: (id) => ({
        url: `${URL}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [tagTypes.Member],
    }),
  }),
  overrideExisting: true,
});

export const {
  useAddMemberMutation,
  useDeleteMemberMutation,
  useGetAllMemberQuery,
  useGetSingleMemberQuery,
  useUpdateMemberMutation,
} = memberApi;
