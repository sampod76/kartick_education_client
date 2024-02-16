import { ICourseData } from "@/types/courseType";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { PayloadAction } from '@reduxjs/toolkit';

interface IBannerCourse {
  searchValue: string;
  generateColor?: {
    color: string;
    bg: string;
  };
}

const initialState: IBannerCourse = {
  searchValue: "",
  generateColor: {
    color: "#108213",
    bg: "#E8EABD",
  },
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
      // console.log("action", action);
      state.searchValue = "";
      //   state.course = state.course.filter(
      //     (course) => course._id !== action.payload._id
      //   );
      //   state.total -= action.payload.price;
    },
    addBackgroundColor: (
      state,
      action: PayloadAction<{ color: string; bg: string }>
    ) => {
      state.generateColor = action.payload;
    },
  },
});

export const {
  addBannerSearchValue,
  clearBannerSearchValue,
  addBackgroundColor,
} = bannerCourseSlice.actions;

export default bannerCourseSlice.reducer;
