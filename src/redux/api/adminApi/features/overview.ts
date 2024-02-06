// import { tagTypes.courseg-types";
import { IMeta } from "@/types";
import { baseApi } from "../../baseApi";
import { tagTypes } from "@/redux/tag-types";
import { IShort_overviewData } from "@/types/features/shortOverviewType";

// import { IShort_overviewData } from "@/types/features/showAdvanceClassType";

const SHORT_OVERVIEW = "/short_overview";

export const ShortOverviewApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get all academic departments
    getAllShortOverView: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: SHORT_OVERVIEW,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (data: IShort_overviewData[], meta: IMeta) => {
        // console.log(data);
        return {
          data: data,
          meta,
        };
      },
      providesTags: [tagTypes.overview],
    }),
    // get single academic department
    getSingleShortOverView: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `${SHORT_OVERVIEW}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.overview],
    }),

    // create a new academic department
    addShortOverView: build.mutation({
      query: (data) => ({
        url: SHORT_OVERVIEW,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.overview, tagTypes.categoryChildren],
    }),
    // update ac department
    updateShortOverView: build.mutation({
      query: ({ data, id }) => ({
        url: `${SHORT_OVERVIEW}/${id}`,
        method: "PATCH",
        data: data,
      }),
      invalidatesTags: [tagTypes.overview],
    }),

    // delete ac department
    deleteShortOverView: build.mutation({
      query: (id) => ({
        url: `${SHORT_OVERVIEW}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.overview],
    }),
  }),
});

export const {
  useAddShortOverViewMutation,
  useDeleteShortOverViewMutation,
  useGetAllShortOverViewQuery,
  useGetSingleShortOverViewQuery,
  useUpdateShortOverViewMutation,
} = ShortOverviewApi;
