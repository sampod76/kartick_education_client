import { tagTypes } from "@/redux/tag-types";
import {  IMeta } from "@/types";
import { baseApi } from "./baseApi";
import { IBlog } from "@/schemas/blog";

const BLOG_URL = "/blogs";

export const blogsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get all academic departments
    getAllBlog: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: BLOG_URL,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response: IBlog[], meta: IMeta) => {
        return {
          data: response,
          meta,
        };
      },
      // providesTags: [tagTypes.academicDepartment],
    }),
    // get single academic department
    getSingleBlog: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `${BLOG_URL}/${id}`,
        method: "GET",
      }),
      // providesTags: [tagTypes.academicDepartment],
    }),
    // create a new academic department
    addBlog: build.mutation({
      query: (data) => ({
        url: BLOG_URL,
        method: "POST",
        data,
      }),
      // invalidatesTags: [tagTypes.academicDepartment],
    }),
    // update ac department
    updateBlog: build.mutation({
      query: (data) => ({
        url: `${BLOG_URL}/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      // invalidatesTags: [tagTypes.academicDepartment],
    }),

    // delete ac department
    deleteBlog: build.mutation({
      query: (id) => ({
        url: `${BLOG_URL}/${id}`,
        method: "DELETE",
      }),
      // invalidatesTags: [tagTypes.academicDepartment],
    }),
  }),
});

export const {
  useAddBlogMutation,
  useDeleteBlogMutation,
  useGetAllBlogQuery,
  useGetSingleBlogQuery,
  useUpdateBlogMutation,
} = blogsApi;
