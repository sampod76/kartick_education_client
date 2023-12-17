import { baseApi } from "./api/baseApi";
import userRoleSlice from "./features/user/userRoleSlice";

export const reducer = {
  [baseApi.reducerPath]: baseApi.reducer,
  role: userRoleSlice,
};
