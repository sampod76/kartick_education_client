import { ICourseData } from "@/types/courseType";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { PayloadAction } from '@reduxjs/toolkit';

interface IBannerCourse {
  searchValue: string;
}

const initialState: IBannerCourse = {
  searchValue: "",
};

const bannerCourseSlice = createSlice({
  name: "BannerCourseSearch",
  initialState: initialState,
  reducers: {
    addBannerSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;

      //   const existingCourse = state.course.find(
      //     (course) => course._id === action?.payload?._id
      //   );
      //   if (existingCourse) {
      //     console.log("the  course is exists ");
      //   } else {
      //     state.course.push(action?.payload);
      //     state.total += action.payload.price;
      //   }
    },
    clearBannerSearchValue: (state, action) => {
      console.log("action", action);
      state.searchValue = "";
      //   state.course = state.course.filter(
      //     (course) => course._id !== action.payload._id
      //   );
      //   state.total -= action.payload.price;
    },
  },
});

export const { addBannerSearchValue, clearBannerSearchValue } =
  bannerCourseSlice.actions;

export default bannerCourseSlice.reducer;
