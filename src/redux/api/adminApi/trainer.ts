import { IMeta } from "@/types";
import { baseApi } from "../baseApi";
import { tagTypes } from "../../tag-types";

const ADMIN_URL = "/trainer";

export const trainerApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    addTrainerWithFormData: build.mutation({
      query: (data) => {
        // 
        return {
          url: "/users/create-trainer",
          method: "POST",
          data: data,
          // contentType: "multipart/form-data",
          contentType: "application/json",
        };
      },
      invalidatesTags: [tagTypes.admin],
    }),
    getAllTrainers: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: ADMIN_URL,
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
      providesTags: [tagTypes.admin],
    }),
    getSingleTrainer: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `${ADMIN_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.admin],
    }),
    updateTrainer: build.mutation({
      query: ({ data, id }) => {
        return {
          url: `${ADMIN_URL}/${id}`,
          method: "PATCH",
          data: data,
        };
      },
      invalidatesTags: [tagTypes.admin],
    }),
    deleteTrainer: build.mutation({
      query: (id) => ({
        url: `${ADMIN_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.admin],
    }),
  }),
});

export const {
  useGetAllTrainersQuery,
  useGetSingleTrainerQuery,
  useAddTrainerWithFormDataMutation,
  useUpdateTrainerMutation,
  useDeleteTrainerMutation,
} = trainerApi;
