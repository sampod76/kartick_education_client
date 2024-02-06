// import { tagTypes.courseg-types";
import { IMeta } from "@/types";
import { baseApi } from "../../baseApi";
import { tagTypes } from "@/redux/tag-types";

import { ISkills_plan } from "@/types/features/skillPlan";

const SKILLS_PLAN = "/skills_plan";

export const Skills_planApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get all academic departments
    getAllSkills_plan: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: SKILLS_PLAN,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response: ISkills_plan[], meta: IMeta) => {
        // console.log(response);
        return {
          data: response,
          meta,
        };
      },
      providesTags: [tagTypes.Skills_plan],
    }),
    // get single academic department
    getSingleSkills_plan: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `${SKILLS_PLAN}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.Skills_plan],
    }),

    // create a new academic department
    addSkills_plan: build.mutation({
      query: (data) => ({
        url: SKILLS_PLAN,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.Skills_plan, tagTypes.categoryChildren],
    }),
    // update ac department
    updateSkills_plan: build.mutation({
      query: ({ data, id }) => ({
        url: `${SKILLS_PLAN}/${id}`,
        method: "PATCH",
        data: data,
      }),
      invalidatesTags: [tagTypes.Skills_plan],
    }),

    // delete ac department
    deleteSkills_plan: build.mutation({
      query: (id) => ({
        url: `${SKILLS_PLAN}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.Skills_plan],
    }),
  }),
});

export const {
  useAddSkills_planMutation,
  useDeleteSkills_planMutation,
  useGetAllSkills_planQuery,
  useGetSingleSkills_planQuery,
  useUpdateSkills_planMutation,
} = Skills_planApi;
