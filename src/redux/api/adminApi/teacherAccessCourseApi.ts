import { tagTypes } from '@/redux/tag-types';
import { IMeta } from '@/types';
import { baseApi } from '../baseApi';

const URL = '/seller-access-course';

export const teacherAccessCourseApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get all academic departments
    getAllTeacherAccessCoursey: build.query({
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
      providesTags: [tagTypes.TeacherAccessCoursey],
    }),
    // get single academic department
    getSingleTeacherAccessCoursey: build.query({
      query: (id: string | string[] | undefined) => {
        //// console.log(id);
        return {
          url: `${URL}/${id}`,
          method: 'GET',
        };
      },
      providesTags: [tagTypes.TeacherAccessCoursey],
    }),

    // create a new academic department
    addTeacherAccessCoursey: build.mutation({
      query: (data) => {
        //// console.log(data, "cacccc");

        return {
          url: URL,
          method: 'POST',
          data,
        };
      },
      invalidatesTags: [tagTypes.TeacherAccessCoursey, tagTypes.seller],
    }),
    // update ac department
    updateTeacherAccessCoursey: build.mutation({
      query: ({ data, id }) => {
        //// console.log(data, "TeacherAccessCoursey data");
        return {
          url: `${URL}/${id}`,
          method: 'PATCH',
          data: data,
        };
      },
      invalidatesTags: [tagTypes.TeacherAccessCoursey, tagTypes.seller],
    }),

    // delete ac department
    deleteTeacherAccessCoursey: build.mutation({
      query: (id) => ({
        url: `${URL}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [tagTypes.TeacherAccessCoursey, tagTypes.seller],
    }),
  }),
  overrideExisting: true,
});

export const {
  useAddTeacherAccessCourseyMutation,
  useDeleteTeacherAccessCourseyMutation,
  useGetAllTeacherAccessCourseyQuery,
  useGetSingleTeacherAccessCourseyQuery,
  useUpdateTeacherAccessCourseyMutation,
} = teacherAccessCourseApi;
