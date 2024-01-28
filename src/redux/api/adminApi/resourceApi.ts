import { tagTypes } from "@/redux/tag-types";
import { IMeta } from "@/types";
import { baseApi } from "../baseApi";

const RESOURCE_URL = "/resource";

export const resourceApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get all academic departments
    getAllResource: build.query({
      query: (arg: Record<string, any>) => {

        return {
          url: RESOURCE_URL,
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
      providesTags: [tagTypes.resource],
    }),

    // get single academic department
    getSingleResource: build.query({
      query: (id: string | string[] | undefined) => {

        return {
          url: `${RESOURCE_URL}/${id}`,
          method: "GET",
        };
      },
      providesTags: [tagTypes.resource],
    }),
    // create a new academic department
    addResource: build.mutation({
      query: (data) => {
        //
        return {
          url: RESOURCE_URL,
          method: "POST",
          data,
        };
      },
      invalidatesTags: [tagTypes.resource],
    }),
    // update ac department
    updateResource: build.mutation({
      query: ({ data, id }) => {

        return {
          url: `${RESOURCE_URL}/${id}`,
          method: "PATCH",
          data: data,
        };
      },
      invalidatesTags: [tagTypes.resource,],
    }),

    // delete ac department
    deleteResource: build.mutation({
      query: (id) => ({
        url: `${RESOURCE_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.resource,],
    }),
  }),
});

export const {
  useAddResourceMutation,
  useDeleteResourceMutation,
  useGetAllResourceQuery,
  useGetSingleResourceQuery,
  useUpdateResourceMutation,
} = resourceApi;
