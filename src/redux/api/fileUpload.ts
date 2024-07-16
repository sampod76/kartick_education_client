import { tagTypes } from "@/redux/tag-types";
import { IMeta } from "@/types";
import { baseApi } from "./baseApi";
import { IFaq } from "@/schemas/faq";

const FILE_UPLOAD = "/upload";

export const faqApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // create a new academic department
    addPdf: build.mutation({
      query: (data) => ({
        url: FILE_UPLOAD + "/upload-pdf",
        method: "POST",
        data,
        contentType: "multipart/form-data",
      }),
      invalidatesTags: [tagTypes.faq],
    }),
  }),
});

export const { useAddPdfMutation } = faqApi;
