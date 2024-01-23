import { baseApi } from "./api/baseApi";
import quizSlice from "./features/quizSlice";
import userRoleSlice from "./features/user/userRoleSlice";

export const reducer = {
  [baseApi.reducerPath]: baseApi.reducer,
  userInfo: userRoleSlice,
  quiz:quizSlice
};
