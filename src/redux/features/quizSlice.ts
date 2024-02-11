import { createSlice, PayloadAction } from "@reduxjs/toolkit";
export interface IQuizAnswer {
  userAnswers: {
    serialNumber: number;
    answer: string | string[];
    _id: string;
    title: string;
    index: number;
    type: string;
    is_time_up: boolean;
    usedTime: number;
  }[];
}

const initialState: IQuizAnswer = {
  userAnswers: [],
};

const quizSlice = createSlice({
  name: "userAnswers",
  initialState: initialState,
  reducers: {
    addAnswer: (state, { payload }) => {
      const existingAnswerIndex = state.userAnswers.findIndex(
        (answer) => answer?._id === payload?._id
      );

      if (existingAnswerIndex !== -1) {
        // If the answer with the provided _id already exists, replace it
        state.userAnswers[existingAnswerIndex] = payload;
      } else {
        // If the answer with the provided _id doesn't exist, add it
        state.userAnswers.push(payload);
      }
    },
  },
});

export const { addAnswer } = quizSlice.actions;

export default quizSlice.reducer;

