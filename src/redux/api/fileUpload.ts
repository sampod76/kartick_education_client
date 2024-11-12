import { tagTypes } from '@/redux/tag-types';
import { baseApi } from './baseApi';

const FILE_UPLOAD = '/upload';

export const faqApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // create a new academic department
    addPdf: build.mutation({
      query: (data) => ({
        url: FILE_UPLOAD + '/upload-pdf',
        method: 'POST',
        data,
        contentType: 'multipart/form-data',
      }),
      invalidatesTags: [tagTypes.faq],
    }),
    addAnyFile: build.mutation({
      query: (data) => ({
        url: FILE_UPLOAD + '/upload-any-files-s3',
        method: 'POST',
        data,
        contentType: 'multipart/form-data',
      }),
      invalidatesTags: [tagTypes.faq],
    }),
  }),
});

export const { useAddPdfMutation, useAddAnyFileMutation } = faqApi;
