import { IContactDataType } from "./../../../types/contactDataType";
import { tagTypes } from "@/redux/tag-types";
import { IMeta } from "@/types";
import { baseApi } from "../baseApi";

const Contact_URL = "/contact_mail";

export const contactApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get all academic departments
    getAllContact: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: Contact_URL,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response: IContactDataType[], meta: IMeta) => {
        // console.log(response);
        return {
          data: response,
          meta,
        };
      },
      providesTags: [tagTypes.contact],
    }),
    // get single academic department
    getSingleContact: build.query({
      query: (id: string | string[] | undefined) => {
        // console.log(id);
        return {
          url: `${Contact_URL}/${id}`,
          method: "GET",
        };
      },
      providesTags: [tagTypes.contact],
    }),
    checkPurchaseContact: build.query({
      query: (id: string | string[] | undefined) => {
        // console.log(id);
        return {
          url: `${Contact_URL}/check-purchase/${id}`,
          method: "GET",
        };
      },
      providesTags: [tagTypes.contact],
    }),
    // create a new academic department
    addContact: build.mutation({
      query: (data) => {
        // console.log(data, "cacccc");

        return {
          url: Contact_URL,
          method: "POST",
          data,
        };
      },
      invalidatesTags: [tagTypes.contact],
    }),
    // update ac department
    updateContact: build.mutation({
      query: ({ data, id }) => {
        // console.log(data, "contact data");
        return {
          url: `${Contact_URL}/${id}`,
          method: "PATCH",
          data: data,
        };
      },
      invalidatesTags: [tagTypes.contact],
    }),

    // delete ac department
    deleteContact: build.mutation({
      query: (id) => ({
        url: `${Contact_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.contact],
    }),
  }),
});

export const {
  useAddContactMutation,
  useDeleteContactMutation,
  useGetAllContactQuery,
  useGetSingleContactQuery,
  useUpdateContactMutation,
  useCheckPurchaseContactQuery,
} = contactApi;
