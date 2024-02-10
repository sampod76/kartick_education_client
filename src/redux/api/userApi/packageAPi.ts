import { IMeta } from "@/types";
import { baseApi } from "../baseApi";
import { tagTypes } from "@/redux/tag-types";
import { IPackageData } from "@/types/package/packageType";

const PACKAGE_URL = "/packages";

export const packageApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get all academic departments
    getAllPackage: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: PACKAGE_URL,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response: IPackageData[], meta: IMeta) => {
        // console.log(response);
        return {
          data: response,
          meta,
        };
      },
      providesTags: [tagTypes.package,tagTypes.addPackageAndcourseTag],
    }),
    // get single academic department
    getSinglePackage: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `${PACKAGE_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.package,tagTypes.addPackageAndcourseTag],
    }),
    // create a new academic department
    addPackage: build.mutation({
      query: (data: any) => ({
        url: PACKAGE_URL,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.package,tagTypes.addPackageAndcourseTag],
    }),
    // update ac department
    updatePackage: build.mutation({
      query: ({ data, id }) => ({
        url: `${PACKAGE_URL}/${id}`,
        method: "PATCH",
        data: data,
      }),
      invalidatesTags: [tagTypes.package,tagTypes.addPackageAndcourseTag],
    }),
    updateIncreaseStudentPackage: build.mutation({
      query: ({ data, id }) => ({
        url: `${PACKAGE_URL}/increment/${id}`,
        method: "PATCH",
        data: data,
      }),
      invalidatesTags: [tagTypes.package,tagTypes.addPackageAndcourseTag],
    }),

    // delete ac department
    deletePackage: build.mutation({
      query: (id) => ({
        url: `${PACKAGE_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.package,tagTypes.addPackageAndcourseTag],
    }),
  }),
});

export const {
  useAddPackageMutation,
  useDeletePackageMutation,
  useGetAllPackageQuery,
  useGetSinglePackageQuery,
  useUpdatePackageMutation,
  useUpdateIncreaseStudentPackageMutation,
} = packageApi;
