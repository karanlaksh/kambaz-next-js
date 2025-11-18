import axios from "axios";

const axiosWithCredentials = axios.create({ withCredentials: true });

const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
const COURSES_API = `${HTTP_SERVER}/api/courses`;
const USERS_API = `${HTTP_SERVER}/api/users`;
const MODULES_API = `${HTTP_SERVER}/api/modules`;

interface Course {
  _id: string;
  name: string;
  description: string;
  img: string;
}

interface Module {
  _id: string;
  name: string;
  course: string;
  lessons?: { _id: string; name: string }[];
  editing?: boolean;
}

export const fetchAllCourses = async (): Promise<Course[]> => {
  const { data } = await axios.get(COURSES_API);
  return data;
};

export const findMyCourses = async (): Promise<Course[]> => {
  const { data } = await axiosWithCredentials.get(`${USERS_API}/current/courses`);
  return data;
};

export const createCourse = async (course: Omit<Course, "_id">): Promise<Course> => {
  const { data } = await axiosWithCredentials.post(
    `${USERS_API}/current/courses`,
    course
  );
  return data;
};

export const deleteCourse = async (id: string): Promise<void> => {
  const { data } = await axios.delete(`${COURSES_API}/${id}`);
  return data;
};

export const updateCourse = async (course: Course): Promise<Course> => {
  const { data } = await axios.put(`${COURSES_API}/${course._id}`, course);
  return data;
};

export const findModulesForCourse = async (courseId: string): Promise<Module[]> => {
  const response = await axios.get(`${COURSES_API}/${courseId}/modules`);
  return response.data;
};

export const createModuleForCourse = async (
  courseId: string,
  module: { name: string; course: string }
): Promise<Module> => {
  const response = await axios.post(
    `${COURSES_API}/${courseId}/modules`,
    module
  );
  return response.data;
};

export const deleteModule = async (moduleId: string): Promise<void> => {
  const response = await axios.delete(`${MODULES_API}/${moduleId}`);
  return response.data;
};

export const updateModule = async (module: Module): Promise<Module> => {
  const { data } = await axios.put(`${MODULES_API}/${module._id}`, module);
  return data;
};