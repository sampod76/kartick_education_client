import { tagTypes } from "@/redux/tag-types";
import { IMeta } from "@/types";
import { baseApi } from "../baseApi";

const MILESTONE_URL = "/milestone";

export const milestoneApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get all academic departments
    getAllMilestone: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: MILESTONE_URL,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response: any[], meta: IMeta) => {
        console.log(response);
        return {
          data: response,
          meta,
        };
      },
      providesTags: [tagTypes.milestone],
    }),
    // get single academic department
    getSingleMilestone: build.query({
      query: (id: string | string[] | undefined) => {
        console.log(id);
        return {
          url: `${MILESTONE_URL}/${id}`,
          method: "GET",
        };
      },
      providesTags: [tagTypes.milestone],
    }),
    // create a new academic department
    addMilestone: build.mutation({
      query: (data) => {
        // console.log(data, "cacccc");

        return {
          url: MILESTONE_URL,
          method: "POST",
          data,
        };
      },
      invalidatesTags: [tagTypes.milestone],
    }),
    // update ac department
    updateMilestone: build.mutation({
      query: ({ data, id }) => {
        console.log(data, "Milestone data");
        return {
          url: `${MILESTONE_URL}/${id}`,
          method: "PATCH",
          data: data,
        };
      },
      invalidatesTags: [tagTypes.milestone],
    }),

    // delete ac department
    deleteMilestone: build.mutation({
      query: (id) => ({
        url: `${MILESTONE_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.milestone],
    }),
  }),
});

export const {
  useAddMilestoneMutation,
  useDeleteMilestoneMutation,
  useGetAllMilestoneQuery,
  useGetSingleMilestoneQuery,
  useUpdateMilestoneMutation,
} = milestoneApi;
