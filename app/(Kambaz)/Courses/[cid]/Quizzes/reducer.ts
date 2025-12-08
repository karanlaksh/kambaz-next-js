import { createSlice } from "@reduxjs/toolkit";
import { Quiz } from "./client";

interface QuizzesState {
  quizzes: Quiz[];
  currentQuiz: Quiz | null;
}

const initialState: QuizzesState = {
  quizzes: [],
  currentQuiz: null,
};

const quizzesSlice = createSlice({
  name: "quizzes",
  initialState,
  reducers: {
    setQuizzes: (state, action) => {
      state.quizzes = action.payload;
    },
    setCurrentQuiz: (state, action) => {
      state.currentQuiz = action.payload;
    },
    addQuiz: (state, { payload: quiz }) => {
      state.quizzes = [...state.quizzes, quiz];
    },
    deleteQuiz: (state, { payload: quizId }) => {
      state.quizzes = state.quizzes.filter((q) => q._id !== quizId);
    },
    updateQuiz: (state, { payload: quiz }) => {
      state.quizzes = state.quizzes.map((q) =>
        q._id === quiz._id ? quiz : q
      );
      if (state.currentQuiz && state.currentQuiz._id === quiz._id) {
        state.currentQuiz = quiz;
      }
    },
    togglePublish: (state, { payload: quizId }) => {
      state.quizzes = state.quizzes.map((q) =>
        q._id === quizId ? { ...q, published: !q.published } : q
      );
    },
    // Question reducers
    addQuestion: (state, { payload: { quizId, question } }) => {
      state.quizzes = state.quizzes.map((q) =>
        q._id === quizId
          ? { ...q, questions: [...q.questions, question] }
          : q
      );
      if (state.currentQuiz && state.currentQuiz._id === quizId) {
        state.currentQuiz.questions = [...state.currentQuiz.questions, question];
      }
    },
    updateQuestion: (state, { payload: { quizId, question } }) => {
      state.quizzes = state.quizzes.map((q) =>
        q._id === quizId
          ? {
              ...q,
              questions: q.questions.map((qn) =>
                qn._id === question._id ? question : qn
              ),
            }
          : q
      );
      if (state.currentQuiz && state.currentQuiz._id === quizId) {
        state.currentQuiz.questions = state.currentQuiz.questions.map((qn) =>
          qn._id === question._id ? question : qn
        );
      }
    },
    deleteQuestion: (state, { payload: { quizId, questionId } }) => {
      state.quizzes = state.quizzes.map((q) =>
        q._id === quizId
          ? { ...q, questions: q.questions.filter((qn) => qn._id !== questionId) }
          : q
      );
      if (state.currentQuiz && state.currentQuiz._id === quizId) {
        state.currentQuiz.questions = state.currentQuiz.questions.filter(
          (qn) => qn._id !== questionId
        );
      }
    },
  },
});

export const {
  setQuizzes,
  setCurrentQuiz,
  addQuiz,
  deleteQuiz,
  updateQuiz,
  togglePublish,
  addQuestion,
  updateQuestion,
  deleteQuestion,
} = quizzesSlice.actions;

export default quizzesSlice.reducer;