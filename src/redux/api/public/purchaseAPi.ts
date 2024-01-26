import { useGetAllPackageAndCourseQuery } from "@/redux/api/sellerApi/addPackageAndCourse";
import { tagTypes } from "@/redux/tag-types";
import { ICategory, IMeta } from "@/types";
import { baseApi } from "../baseApi";

const PURCHASE_PACKAGE_URL = "/purchase_packages";
const PURCHASE_COURSE_URL = "/purchase_courses";
const PURCHASE_STUDENT_COURSE_URL = "/student_purchase_packages_course";
export const paymentApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // create a new academic department

    getAllPurchasePackage: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: `${PURCHASE_PACKAGE_URL}/purchase-and-pending-package`,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response: any, meta: IMeta) => {
        return {
          data: response,
          meta,
        };
      },
      providesTags: [tagTypes.userPurchaseCourse],
    }),
    getAllPurchaseCourse: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: `${PURCHASE_COURSE_URL}/purchase-and-pending-courses`,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response: any, meta: IMeta) => {
        return {
          data: response,
          meta,
        };
      },
      providesTags: [tagTypes.userPurchaseCourse],
    }),
    getSinglePurchasePackage: build.query({
      query: (id: string | undefined) => {
        return {
          url: `${PURCHASE_PACKAGE_URL}/${id}`,
          method: "GET",
        };
      },
      providesTags: [tagTypes.userPurchaseCourse],
    }),
    getSinglePurchaseCourse: build.query({
      query: (id: string | undefined) => {
        return {
          url: `${PURCHASE_COURSE_URL}/purchase-and-pending-courses/${id}`,
          method: "GET",
        };
      },
      providesTags: [tagTypes.userPurchaseCourse],
    }),
    // update ac department
  }),
  // overrideExisting: true,
});

export const {
  useGetAllPurchasePackageQuery,
  useGetAllPurchaseCourseQuery,
  useGetSinglePurchasePackageQuery,
  useGetSinglePurchaseCourseQuery,
} = paymentApi;
