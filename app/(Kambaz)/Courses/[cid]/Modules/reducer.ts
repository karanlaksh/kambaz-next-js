import { createSlice } from "@reduxjs/toolkit";

interface Lesson {
  _id: string;
  name: string;
}

interface Module {
  _id: string;
  course: string;
  name: string;
  lessons?: Lesson[];
  editing?: boolean;
}

const initialState = {
  modules: [] as Module[],
};

const modulesSlice = createSlice({
  name: "modules",
  initialState,
  reducers: {
    setModules: (state, action) => {
      state.modules = action.payload;
    },
    addModule: (state, { payload: module }) => {
      state.modules = [...state.modules, module];
    },
    deleteModule: (state, { payload: moduleId }) => {
      state.modules = state.modules.filter(
        (m: Module) => m._id !== moduleId
      );
    },
    updateModule: (state, { payload: module }) => {
      state.modules = state.modules.map((m: Module) =>
        m._id === module._id ? module : m
      );
    },
    editModule: (state, { payload: moduleId }) => {
      state.modules = state.modules.map((m: Module) =>
        m._id === moduleId ? { ...m, editing: true } : m
      );
    },
  },
});

export const { setModules, addModule, deleteModule, updateModule, editModule } =
  modulesSlice.actions;
export default modulesSlice.reducer;