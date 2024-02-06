// import { tagTypes.courseg-types";
import { IMeta } from "@/types";

import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../../baseApi";
import { IShow_advance_classes } from "@/types/features/showAdvanceClassType";

const SHOW_ADVANCE_CLASSES = "/show_advance_classes";

export const showAdvanceClassApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get all academic departments
    getAllShowAdvanceClasses: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: SHOW_ADVANCE_CLASSES,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response: IShow_advance_classes[], meta: IMeta) => {
        // console.log(response);
        return {
          data: response,
          meta,
        };
      },
      providesTags: [tagTypes.ShowAdvanceClasses],
    }),
    // get single academic department
    getSingleShowAdvanceClasses: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `${SHOW_ADVANCE_CLASSES}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.ShowAdvanceClasses],
    }),

    // create a new academic department
    addShowAdvanceClasses: build.mutation({
      query: (data) => ({
        url: SHOW_ADVANCE_CLASSES,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.ShowAdvanceClasses, tagTypes.categoryChildren],
    }),
    // update ac department
    updateShowAdvanceClasses: build.mutation({
      query: ({ data, id }) => ({
        url: `${SHOW_ADVANCE_CLASSES}/${id}`,
        method: "PATCH",
        data: data,
      }),
      invalidatesTags: [tagTypes.ShowAdvanceClasses],
    }),

    // delete ac department
    deleteShowAdvanceClasses: build.mutation({
      query: (id) => ({
        url: `${SHOW_ADVANCE_CLASSES}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.ShowAdvanceClasses],
    }),
  }),
});

export const {
  useAddShowAdvanceClassesMutation,
  useDeleteShowAdvanceClassesMutation,
  useGetAllShowAdvanceClassesQuery,
  useGetSingleShowAdvanceClassesQuery,
  useUpdateShowAdvanceClassesMutation,
} = showAdvanceClassApi;
