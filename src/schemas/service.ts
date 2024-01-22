import * as yup from "yup";
export const serviceStatus = ["available", "upcoming", "unavailable"];
export type ServiceStatusType = "available"| "upcoming"| "unavailable"
export const IServiceSchema = yup.object().shape({
    title: yup.string().required('Title is required'),
    price: yup.string().required('Price is required'),
    // price: yup.number().required('Price is required').positive(),
    image: yup.string().required('Images are required'),
    description: yup.string().required('Description is required'),
    address: yup.string(),
    contact: yup.string().required('Contact is required'),
    availableTickets: yup.string().required('Available tickets is required'),
    // availableTickets: yup.number().required('Available tickets is required').integer().positive(),
    serviceDate: yup.string().required('Service date is required'),
    category: yup.string().required('Category is required'),
    status: yup.string().oneOf(['available', 'upcoming', 'unavailable']),
    publisher: yup.string(),
    // You can include the reviews validation here if needed
    // reviews: yup.array().of(yup.object().shape({
    //   userId: yup.string().required('User ID is required'),
    //   star: yup.number().required('Star rating is required').positive().max(5),
    //   message: yup.string(),
    // })),
  });

  export interface IService {
    title: string;
    price: string;
    image?: string;
    description?: string;
    address?: string;
    contact: string;
    availableTickets: string;
    serviceDate: string;
    category: string;
    status: ServiceStatusType;
    publisher?: string;
    // If you want to include the reviews validation:
    // reviews?: Array<{
    //   userId: string;
    //   star: number;
    //   message?: string;
    // }>;
  }