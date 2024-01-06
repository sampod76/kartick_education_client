import { tagTypes } from "@/redux/tag-types";
import { IMeta } from "@/types";
import { baseApi } from "../baseApi";

const MODULE_URL = "/module";

export const moduleApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get all academic departments
    getAllModule: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: MODULE_URL,
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
      providesTags: [tagTypes.module,],
    }),
    // get single academic department
    getSingleModule: build.query({

      query: (id: string | string[] | undefined) => {

        return {
          url: `${MODULE_URL}/${id}`,
          method: "GET",
        };
      },

      providesTags: [tagTypes.module],
    }),
    // create a new academic department
    addModule: build.mutation({
      query: (data) => {

        return {
          url: MODULE_URL,
          method: "POST",
          data,
        };
      },
      invalidatesTags: [tagTypes.module,tagTypes.categoryChildren],
    }),
    // update ac department
    updateModule: build.mutation({
      query: ({ data, id }) => {
        return {
          url: `${MODULE_URL}/${id}`,
          method: "PATCH",
          data: data,
        };
      },
      invalidatesTags: [tagTypes.module,tagTypes.categoryChildren],
    }),

    // delete ac department
    deleteModule: build.mutation({
      query: (id) => ({
        url: `${MODULE_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.module,tagTypes.categoryChildren],
    }),
  }),
});

export const {
  useAddModuleMutation,
  useDeleteModuleMutation,
  useGetAllModuleQuery,
  useGetSingleModuleQuery,
  useUpdateModuleMutation,
} = moduleApi;
