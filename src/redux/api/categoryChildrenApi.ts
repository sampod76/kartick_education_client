import { tagTypes } from "@/redux/tag-types";
import { IMeta } from "@/types";
import { baseApi } from "./baseApi";


const CATEGORY_URL = "/category/category-children";

export const categoryChildrenApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get all academic departments
    getAllCategoryChildren: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: CATEGORY_URL,
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
      providesTags: [tagTypes.categoryChildren],
    }),
  }),
});

export const { useGetAllCategoryChildrenQuery } = categoryChildrenApi;
