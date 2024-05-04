import { Quiz } from "@/types";
import { createSlice } from "@reduxjs/toolkit";

interface initialStateType {
  quiz: Quiz | null;
}

// Define a type for the slice state
const initialState: initialStateType = {
  quiz: null,
};

/**
 * authSlice is a reducer function that accepts state and action as arguments,
 * and returns the next state of the app.
 */
const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    setQuiz: (state, action) => {
      state.quiz = action.payload.quiz;
    },
  },
});

export const { setQuiz } = courseSlice.actions;
export default courseSlice.reducer;
