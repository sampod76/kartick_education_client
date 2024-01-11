export interface IMeta {
  limit: number;
  page: number;
  total: number;
}

export type ResponseSuccessType = {
  success?: string;
  message?: string;
  data: any;
  meta?: IMeta;
  statusCode?:string;
};

export type IGenericErrorResponse = {
  statusCode: number;
  message: string;
  errorMessages: IGenericErrorMessage[];
};

export type IGenericErrorMessage = {
  path: string | number;
  message: string;
};
export type ICategory = {
  _id: string;
  title: string;
  image?: string;
  status?: string;
};

export type IBookingStatusType = 'pending' | 'accept' | 'reject' | 'complete';

export type ICategoryStatus = 'active' | 'deactivate' | 'disabled' | 'block'|"save";
export type IPriceTypes = "free" | "paid" | "closed" | "recurring"

