import { baseApi } from "./api/baseApi";
import bannerCourseSlice from "./features/bannerCourseSlice";
import cartSlice from "./features/cartSlice";
import quizSlice from "./features/quizSlice";
import userRoleSlice from "./features/user/userRoleSlice";

export const reducer = {
  [baseApi.reducerPath]: baseApi.reducer,
  userInfo: userRoleSlice,
  quiz: quizSlice,
  cart: cartSlice,
  bannerSearch: bannerCourseSlice,
};
