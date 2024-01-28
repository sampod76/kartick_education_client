import { tagTypes } from "@/redux/tag-types";
import { IMeta } from "@/types";
import { baseApi } from "../baseApi";
import { IMilestoneData } from "@/types/miestoneType";

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
      transformResponse: (response: IMilestoneData[], meta: IMeta) => {
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
        //
        return {
          url: MILESTONE_URL,
          method: "POST",
          data,
        };
      },
      invalidatesTags: [tagTypes.milestone, tagTypes.categoryChildren],
    }),
    // update ac department
    updateMilestone: build.mutation({
      query: ({ data, id }) => {
        return {
          url: `${MILESTONE_URL}/${id}`,
          method: "PATCH",
          data: data,
        };
      },
      invalidatesTags: [tagTypes.milestone, tagTypes.categoryChildren],
    }),

    // delete ac department
    deleteMilestone: build.mutation({
      query: (id) => ({
        url: `${MILESTONE_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.milestone, tagTypes.categoryChildren],
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
