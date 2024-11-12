import { tagTypes } from '@/redux/tag-types';
import { IMeta } from '@/types';
import { ICourseLevelData } from '@/types/courseLevelDataType';
import { baseApi } from '../baseApi';

const COURSE_LEVEL_URL = '/paly-video';

export const Home_Video_Play_Api = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get all academic departments
    getAllVideo: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: COURSE_LEVEL_URL,
          method: 'GET',
          params: arg,
        };
      },
      transformResponse: (response: ICourseLevelData[], meta: IMeta) => {
        // console.log(response);
        return {
          data: response,
          meta,
        };
      },
      providesTags: [tagTypes.course_label],
    }),
    // get single academic department
    PlayVideo: build.query({
      query: (id: string | string[] | undefined) => {
        // console.log(id);
        return {
          url: `${COURSE_LEVEL_URL}/${id}`,
          method: 'GET',
        };
      },
      providesTags: [tagTypes.course_label],
    }),
    // create a new academic department
    addHome_Video: build.mutation({
      query: (data) => {
        // console.log(data, "cacccc");

        return {
          url: COURSE_LEVEL_URL,
          method: 'POST',
          contentType: 'multipart/form-data',
          data,
        };
      },
      //   invalidatesTags: [tagTypes.course_label],
    }),
    // update ac department
    updateCourse_label: build.mutation({
      query: ({ data, id }) => {
        // console.log(data, "Course_label data");
        return {
          url: `${COURSE_LEVEL_URL}/${id}`,
          method: 'PATCH',
          data: data,
        };
      },
      invalidatesTags: [tagTypes.course_label],
    }),

    // delete ac department
    deleteCourse_label: build.mutation({
      query: (id) => ({
        url: `${COURSE_LEVEL_URL}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [tagTypes.course_label],
    }),
  }),
  overrideExisting: true,
});

export const {
  useAddHome_VideoMutation,
  useDeleteCourse_labelMutation,
  useGetAllVideoQuery,
  usePlayVideoQuery,
  useUpdateCourse_labelMutation,
} = Home_Video_Play_Api;
