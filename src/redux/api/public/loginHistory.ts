// import { tagTypes.LoginHistoryg-types";
import { IMeta } from "@/types";
import { baseApi } from "../baseApi";
import { tagTypes } from "@/redux/tag-types";


const LOGIN_HISTORY = "/login_history";

export const loginHistoryApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get all academic departments
    getAllLoginHistory: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: LOGIN_HISTORY,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response: any[], meta: IMeta) => {
        // console.log(response);
        return {
          data: response,
          meta,
        };
      },
      providesTags: [tagTypes.LoginHistory],
    }),
    // get single academic department
    getSingleLoginHistory: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `${LOGIN_HISTORY}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.LoginHistory],
    }),
    // create a new academic department
    addLoginHistory: build.mutation({
      query: (data) => ({
        url: LOGIN_HISTORY,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.LoginHistory, tagTypes.categoryChildren],
    }),
    // update ac department
    updateLoginHistory: build.mutation({
      query: ({ data, id }) => ({
        url: `${LOGIN_HISTORY}/${id}`,
        method: "PATCH",
        data: data,
      }),
      invalidatesTags: [tagTypes.LoginHistory],
    }),

    // delete ac department
    deleteLoginHistory: build.mutation({
      query: (id) => ({
        url: `${LOGIN_HISTORY}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.LoginHistory],
    }),
  }),
});

export const {
  useAddLoginHistoryMutation,
  useDeleteLoginHistoryMutation,
  useGetAllLoginHistoryQuery,
  useGetSingleLoginHistoryQuery,
  useUpdateLoginHistoryMutation,
} = loginHistoryApi;
