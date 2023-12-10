import * as yup from "yup";
export const BOOKING_STATUS = [
  "pending",
  "accept",
  "reject",
  "complete",
  "cancel",
];
const IBookingStatusType = yup.string().oneOf(BOOKING_STATUS);

 const IBookingSchema = yup.object().shape({
  // service: yup.string().required("Service is required"),
  userName: yup.string(),
  phoneNumber: yup.string().required("Phone number is required"),
  note: yup.string(),
  address: yup.string().required("address is required"),
  googleMapLink: yup.string(),
  bookingDate: yup.string().required("Booking date is required"),
  bookingTickets: yup.number().required("Booking tickets is required"),
  status: IBookingStatusType,
  user: yup.string(),
});

export { IBookingSchema };
export type IBookingStatusType = 'pending' | 'accept' | 'reject' | 'complete'|'cancel';
export type IBooking = {
    service:string;
    userName?: string;
    phoneNumber: string;
    note?: string;
    address?: string;
    googleMapLink?: string;
    bookingDate: string;
    bookingTickets: number;
    status?: IBookingStatusType;
    user: string 
  
  };
