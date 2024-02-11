import { ICourseData } from "@/types/courseType";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { PayloadAction } from '@reduxjs/toolkit';

interface ICart {
  course: ICourseData[];
  total: 0;
  cartModal: boolean;
}

const initialState: ICart = {
  course: [],
  total: 0,
  cartModal: false,
};

const cartSlice = createSlice({
  name: "CourseCart",
  initialState: initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<ICourseData>) => {
      const existingCourse = state.course.find(
        (course) => course._id === action?.payload?._id
      );
      if (existingCourse) {
        console.log("the  course is exists ");
      } else {
        state.course.push(action?.payload);
        state.total += action.payload.price;
      }
    },
    removeFromCart: (state, action: PayloadAction<ICourseData>) => {
      state.course = state.course.filter(
        (course) => course._id !== action.payload._id
      );
      state.total -= action.payload.price;
    },
    toggleCartModal: (state,payload) => {
      state.cartModal = !state.cartModal;
    },
  },
});

export const { addToCart, removeFromCart,toggleCartModal} = cartSlice.actions;

export default cartSlice.reducer;
