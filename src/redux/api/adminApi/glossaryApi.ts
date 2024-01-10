import { tagTypes } from "@/redux/tag-types";
import { IMeta } from "@/types";
import { baseApi } from "../baseApi";

const GLOSSARY_URL = "/glossary";

export const glossaryApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get all academic departments
    getAllGlossary: build.query({
      query: (arg: Record<string, any>) => {

        return {
          url: GLOSSARY_URL,
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
      providesTags: [tagTypes.glossary],
    }),

    // get single academic department
    getSingleGlossary: build.query({
      query: (id: string | string[] | undefined) => {

        return {
          url: `${GLOSSARY_URL}/${id}`,
          method: "GET",
        };
      },
      providesTags: [tagTypes.glossary],
    }),
    // create a new academic department
    addGlossary: build.mutation({
      query: (data) => {
        //
        return {
          url: GLOSSARY_URL,
          method: "POST",
          data,
        };
      },
      invalidatesTags: [tagTypes.glossary,],
    }),
    // update ac department
    updateGlossary: build.mutation({
      query: ({ data, id }) => {

        return {
          url: `${GLOSSARY_URL}/${id}`,
          method: "PATCH",
          data: data,
        };
      },
      invalidatesTags: [tagTypes.glossary ],
    }),

    // delete ac department
    deleteGlossary: build.mutation({
      query: (id) => ({
        url: `${GLOSSARY_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.glossary],
    }),
  }),
});

export const {
  useAddGlossaryMutation,
  useDeleteGlossaryMutation,
  useGetAllGlossaryQuery,
  useGetSingleGlossaryQuery,
  useUpdateGlossaryMutation,
} = glossaryApi;
