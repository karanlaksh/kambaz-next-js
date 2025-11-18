import { createSlice } from "@reduxjs/toolkit";

interface Course {
  _id: string;
  name: string;
  img: string;
  description: string;
}

const initialState = {
  courses: [] as Course[],
};

const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    setCourses: (state, { payload: courses }) => {
      state.courses = courses;
    },
    addNewCourse: (state, { payload: course }) => {
      state.courses = [...state.courses, course];
    },
    deleteCourse: (state, { payload: courseId }) => {
      state.courses = state.courses.filter(
        (course: Course) => course._id !== courseId
      );
    },
    updateCourse: (state, { payload: course }) => {
      state.courses = state.courses.map((c: Course) =>
        c._id === course._id ? course : c
      );
    },
  },
});

export const { setCourses, addNewCourse, deleteCourse, updateCourse } =
  coursesSlice.actions;
export default coursesSlice.reducer;