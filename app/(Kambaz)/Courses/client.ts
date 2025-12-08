import axios from "axios";

const axiosWithCredentials = axios.create({ withCredentials: true });

const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
const COURSES_API = `${HTTP_SERVER}/api/courses`;
const USERS_API = `${HTTP_SERVER}/api/users`;

interface Course {
  _id: string;
  name: string;
  number?: string;
  credits?: number;
  description: string;
  img?: string;
}

interface Module {
  _id: string;
  name: string;
  description?: string;
  lessons?: { _id: string; name: string; description?: string }[];
  editing?: boolean;
}

// Courses
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
  const { data } = await axiosWithCredentials.delete(`${COURSES_API}/${id}`);
  return data;
};

export const updateCourse = async (course: Course): Promise<Course> => {
  const { data } = await axiosWithCredentials.put(`${COURSES_API}/${course._id}`, course);
  return data;
};

// Modules
export const findModulesForCourse = async (courseId: string): Promise<Module[]> => {
  const { data } = await axios.get(`${COURSES_API}/${courseId}/modules`);
  return data;
};

export const createModuleForCourse = async (
  courseId: string,
  module: { name: string; description?: string }
): Promise<Module> => {
  const { data } = await axios.post(`${COURSES_API}/${courseId}/modules`, module);
  return data;
};

export const deleteModule = async (courseId: string, moduleId: string): Promise<void> => {
  const { data } = await axios.delete(`${COURSES_API}/${courseId}/modules/${moduleId}`);
  return data;
};

export const updateModule = async (courseId: string, module: Module): Promise<Module> => {
  const { data } = await axios.put(`${COURSES_API}/${courseId}/modules/${module._id}`, module);
  return data;
};

// Enrollments
export const enrollIntoCourse = async (userId: string, courseId: string) => {
  const { data } = await axiosWithCredentials.post(`${USERS_API}/${userId}/courses/${courseId}`);
  return data;
};

export const unenrollFromCourse = async (userId: string, courseId: string) => {
  const { data } = await axiosWithCredentials.delete(`${USERS_API}/${userId}/courses/${courseId}`);
  return data;
};

export const findUsersForCourse = async (courseId: string) => {
  const { data } = await axios.get(`${COURSES_API}/${courseId}/users`);
  return data;
};