import { tagTypes } from "@/redux/tag-types";
import { IMeta } from "@/types";
import { baseApi } from "./baseApi";

const ASSIGNMENT = "/assignment";

export const AssignmentsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get all academic departments
    getAllAssignment: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: ASSIGNMENT,
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
      providesTags: [tagTypes.assignment],
    }),
    // get single academic department
    getSingleAssignment: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `${ASSIGNMENT}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.assignment],
    }),
    // create a new academic department
    addAssignment: build.mutation({
      query: (data) => ({
        url: ASSIGNMENT,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.assignment],
    }),
    // update ac department
    updateAssignment: build.mutation({
      query: (data) => ({
        url: `${ASSIGNMENT}/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagTypes.assignment],
    }),

    // delete ac department
    deleteAssignment: build.mutation({
      query: (id) => ({
        url: `${ASSIGNMENT}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.assignment],
    }),
  }),
  overrideExisting: true,
});

export const {
  useAddAssignmentMutation,
  useDeleteAssignmentMutation,
  useGetAllAssignmentQuery,
  useGetSingleAssignmentQuery,
  useUpdateAssignmentMutation,
} = AssignmentsApi;
