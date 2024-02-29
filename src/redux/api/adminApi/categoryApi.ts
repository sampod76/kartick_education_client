import { tagTypes } from "@/redux/tag-types";
import { ICategory, IMeta } from "@/types";
import { baseApi } from "../baseApi";

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
      transformResponse: (response: any[], meta: IMeta) => {
        // console.log(response);
        return {
          data: response,
          meta,
        };
      },
      providesTags: [tagTypes.category],
    }),
    // get single academic department
    getSingleCategory: build.query({
      query: (id: string | string[] | undefined) => {
        // console.log(id);
        return {
          url: `${CATEGORY_URL}/${id}`,
          method: "GET",
        };
      },
      providesTags: [tagTypes.category],
    }),
    checkPurchaseCategory: build.query({
      query: (id: string | string[] | undefined) => {
        // console.log(id);
        return {
          url: `${CATEGORY_URL}/check-purchase/${id}`,
          method: "GET",
        };
      },
      providesTags: [tagTypes.category],
    }),
    // create a new academic department
    addCategory: build.mutation({
      query: (data) => {
        // console.log(data, "cacccc");

        return {
          url: CATEGORY_URL,
          method: "POST",
          data,
        };
      },
      invalidatesTags: [tagTypes.category, tagTypes.categoryChildren],
    }),
    // update ac department
    updateCategory: build.mutation({
      query: ({ data, id }) => {
        // console.log(data, "category data");
        return {
          url: `${CATEGORY_URL}/${id}`,
          method: "PATCH",
          data: data,
        };
      },
      invalidatesTags: [tagTypes.category],
    }),

    // delete ac department
    deleteCategory: build.mutation({
      query: (id) => ({
        url: `${CATEGORY_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.category],
    }),
  }),
});

export const {
  useAddCategoryMutation,
  useDeleteCategoryMutation,
  useGetAllCategoryQuery,
  useGetSingleCategoryQuery,
  useUpdateCategoryMutation,
  useCheckPurchaseCategoryQuery
} = categoryApi;
