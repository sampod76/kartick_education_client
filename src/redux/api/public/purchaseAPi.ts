import { useGetAllPackageAndCourseQuery } from "@/redux/api/sellerApi/addPackageAndCourse";
import { tagTypes } from "@/redux/tag-types";
import { ICategory, IMeta } from "@/types";
import { baseApi } from "../baseApi";

const PURCHASE_PACKAGE_URL = "/purchase_packages";
const PURCHASE_COURSE_URL = "/purchase_courses";
const PURCHASE_STUDENT_COURSE_URL = "/student_purchase_packages_course_course";
export const paymentApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // create a new academic department

    getAllPurchasePendingAndAcceptedPackage: build.query({
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

    getSinglePurchasePendingAndAcceptedPackage: build.query({
      query: (id: string | undefined) => {
        return {
          url: `${PURCHASE_PACKAGE_URL}/purchase-and-pending-package/${id}`,
          method: "GET",
        };
      },

      providesTags: [tagTypes.userPurchaseCourse],
    }),

    //!  only accepted packages
    getAllPurchaseAcceptedPackage: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: `${PURCHASE_PACKAGE_URL}`,
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
      providesTags: [
        tagTypes.userPurchaseCourse,
        tagTypes.addPackageAndcourseTag,
      ],
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
    //! only course all api
    getAllPurchasePendingAndAcceptedCourse: build.query({
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
    getSinglePurchaseAcceptAndPendingCourse: build.query({
      query: (id: string | undefined) => {
        return {
          url: `${PURCHASE_COURSE_URL}/purchase-and-pending-courses/${id}`,
          method: "GET",
        };
      },
      providesTags: [tagTypes.userPurchaseCourse],
    }),

    getAllPurchaseAcceptedCourse: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: `${PURCHASE_COURSE_URL}`,
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
    getSinglePurchaseAcceptCourse: build.query({
      query: (id: string | undefined) => {
        return {
          url: `${PURCHASE_COURSE_URL}/${id}`,
          method: "GET",
        };
      },
      providesTags: [tagTypes.userPurchaseCourse],
    }),
    //! total amount
    getAllPurchaseAcceptedCourseAmount: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: `${PURCHASE_COURSE_URL}/total-amount`,
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

    getAllPurchaseAcceptedPackageAmount: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: `${PURCHASE_PACKAGE_URL}/total-amount`,
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
  }),
  // overrideExisting: true,
});

export const {
  useGetSinglePurchasePendingAndAcceptedPackageQuery,
  useGetAllPurchasePendingAndAcceptedPackageQuery,
  // package accepted
  useGetAllPurchaseAcceptedPackageQuery,
  useGetSinglePurchasePackageQuery,
  //Course
  useGetAllPurchasePendingAndAcceptedCourseQuery,
  useGetSinglePurchaseAcceptAndPendingCourseQuery,
  //Course accepted
  useGetAllPurchaseAcceptedCourseQuery,
  useGetSinglePurchaseAcceptCourseQuery,
  //total amount
  useGetAllPurchaseAcceptedCourseAmountQuery,
  useGetAllPurchaseAcceptedPackageAmountQuery,
} = paymentApi;
