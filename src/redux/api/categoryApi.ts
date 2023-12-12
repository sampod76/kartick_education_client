import { tagTypes } from "@/redux/tag-types";
import {  ICategory, IMeta } from "@/types";
import { baseApi } from "./baseApi";

const CATEGORY_URL = "/category";

export const categoryApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get all academic departments
    getAllCategory: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: CATEGORY_URL,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response: ICategory[], meta: IMeta) => {
        return {
          data: response,
          meta,
        };
      },
      // providesTags: [tagTypes.academicDepartment],
    }),
    // get single academic department
    getSingleCategory: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `${CATEGORY_URL}/${id}`,
        method: "GET",
      }),
      // providesTags: [tagTypes.academicDepartment],
    }),
    // create a new academic department
    addCategory: build.mutation({
      query: (data) => ({
        url: CATEGORY_URL,
        method: "POST",
        data,
      }),
      // invalidatesTags: [tagTypes.academicDepartment],
    }),
    // update ac department
    updateCategory: build.mutation({
      query: (data) => ({
        url: `${CATEGORY_URL}/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      // invalidatesTags: [tagTypes.academicDepartment],
    }),

    // delete ac department
    deleteCategory: build.mutation({
      query: (id) => ({
        url: `${CATEGORY_URL}/${id}`,
        method: "DELETE",
      }),
      // invalidatesTags: [tagTypes.academicDepartment],
    }),
  }),
});

export const {
  useAddCategoryMutation,
  useDeleteCategoryMutation,
  useGetAllCategoryQuery,
  useGetSingleCategoryQuery,
  useUpdateCategoryMutation,
} = categoryApi;
