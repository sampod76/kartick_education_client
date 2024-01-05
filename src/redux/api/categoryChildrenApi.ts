import { tagTypes } from "@/redux/tag-types";
import { IMeta } from "@/types";
import { baseApi } from "./baseApi";
import { IFaq } from "@/schemas/faq";

const FAQ_URL = "/category/category-children";

export const faqApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get all academic departments
    getAllCategoryChildren: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: FAQ_URL,
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
      providesTags: [tagTypes.faq],
    }),
  }),
});

export const { useGetAllCategoryChildrenQuery } = faqApi;
