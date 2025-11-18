import { createSlice } from "@reduxjs/toolkit";

interface Assignment {
  _id: string;
  title: string;
  course: string;
  due: string;
  available: string;
  until?: string;
  points: number;
  modules: string[];
  description?: string;
  group?: string;
  displayGrade?: string;
  submissionType?: string;
  assignedTo?: string;
}

const initialState = {
  assignments: [] as Assignment[],
};

const assignmentsSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    setAssignments: (state, action) => {
      state.assignments = action.payload;
    },
    addAssignment: (state, { payload: assignment }) => {
      state.assignments = [...state.assignments, assignment];
    },
    deleteAssignment: (state, { payload: assignmentId }) => {
      state.assignments = state.assignments.filter(
        (a: Assignment) => a._id !== assignmentId
      );
    },
    updateAssignment: (state, { payload: assignment }) => {
      state.assignments = state.assignments.map((a: Assignment) =>
        a._id === assignment._id ? assignment : a
      );
    },
  },
});

export const { setAssignments, addAssignment, deleteAssignment, updateAssignment } =
  assignmentsSlice.actions;
export default assignmentsSlice.reducer;