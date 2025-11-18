import { createSlice } from "@reduxjs/toolkit";

interface Enrollment {
  _id: string;
  user: string;
  course: string;
}

const initialState = {
  enrollments: [] as Enrollment[],
};

const enrollmentsSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    setEnrollments: (state, action) => {
      state.enrollments = action.payload;
    },
    enrollCourse: (state, { payload: { userId, courseId } }) => {
      const newEnrollment: Enrollment = {
        _id: `${Date.now()}`,
        user: userId,
        course: courseId,
      };
      state.enrollments = [...state.enrollments, newEnrollment];
    },
    unenrollCourse: (state, { payload: { userId, courseId } }) => {
      state.enrollments = state.enrollments.filter(
        (enrollment: Enrollment) =>
          !(enrollment.user === userId && (enrollment.course === courseId || enrollment.course === `CS${courseId}`))
      );
    },
  },
});

export const { setEnrollments, enrollCourse, unenrollCourse } = enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;