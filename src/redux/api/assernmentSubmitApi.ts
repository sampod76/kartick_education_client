import { tagTypes } from "@/redux/tag-types";
import { IMeta } from "@/types";
import { baseApi } from "./baseApi";

const ASSIGNMENT = "/assignment-submission";

export const assernmentSubmitApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get all academic departments
    getAllSubmitAssignment: build.query({
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
      providesTags: [tagTypes.submitassignment],
    }),
    // get single academic department
    getSingleSubmitAssignment: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `${ASSIGNMENT}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.submitassignment],
    }),
    // create a new academic department
    addSubmitAssignment: build.mutation({
      query: (data) => ({
        url: ASSIGNMENT,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.submitassignment],
    }),
    // update ac department
    updateSubmitAssignment: build.mutation({
      query: (data) => {
        console.log("🚀 ~ data:", data);
        return {
          url: `${ASSIGNMENT}/${data.id}`,
          method: "PATCH",
          data: data.body,
        };
      },
      invalidatesTags: [tagTypes.submitassignment],
    }),

    // delete ac department
    deleteAssignment: build.mutation({
      query: (id) => ({
        url: `${ASSIGNMENT}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.submitassignment],
    }),
  }),
});

export const {
  useAddSubmitAssignmentMutation,
  useDeleteAssignmentMutation,
  useGetAllSubmitAssignmentQuery,
  useGetSingleSubmitAssignmentQuery,
  useUpdateSubmitAssignmentMutation,
} = assernmentSubmitApi;
