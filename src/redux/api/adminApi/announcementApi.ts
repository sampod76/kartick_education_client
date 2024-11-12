import { tagTypes } from '@/redux/tag-types';
import { IMeta } from '@/types';
import { baseApi } from '../baseApi';

const URL = '/announcement';

export const announcementApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get all academic departments
    getAllAnnouncement: build.query({
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
      providesTags: [tagTypes.announcement],
    }),
    // get single academic department
    getSingleAnnouncement: build.query({
      query: (id: string | string[] | undefined) => {
        return {
          url: `${URL}/${id}`,
          method: 'GET',
        };
      },
      providesTags: [tagTypes.announcement],
    }),

    // create a new academic department
    addAnnouncement: build.mutation({
      query: (data) => {
        return {
          url: URL,
          method: 'POST',
          data,
        };
      },
      invalidatesTags: [tagTypes.announcement],
    }),
    // update ac department
    updateAnnouncement: build.mutation({
      query: ({ data, id }) => {
        return {
          url: `${URL}/${id}`,
          method: 'PATCH',
          data: data,
        };
      },
      invalidatesTags: [tagTypes.announcement],
    }),

    // delete ac department
    deleteAnnouncement: build.mutation({
      query: (id) => ({
        url: `${URL}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [tagTypes.announcement],
    }),
  }),
  overrideExisting: true,
});

export const {
  useAddAnnouncementMutation,
  useDeleteAnnouncementMutation,
  useGetAllAnnouncementQuery,
  useGetSingleAnnouncementQuery,
  useUpdateAnnouncementMutation,
} = announcementApi;
