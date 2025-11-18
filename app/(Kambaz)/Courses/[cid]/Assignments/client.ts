import axios from "axios";

const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
const COURSES_API = `${HTTP_SERVER}/api/courses`;
const ASSIGNMENTS_API = `${HTTP_SERVER}/api/assignments`;

interface Assignment {
  _id?: string;
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

export const findAssignmentsForCourse = async (courseId: string): Promise<Assignment[]> => {
  const response = await axios.get(`${COURSES_API}/${courseId}/assignments`);
  return response.data;
};

export const createAssignmentForCourse = async (
  courseId: string,
  assignment: Partial<Assignment>
): Promise<Assignment> => {
  const response = await axios.post(
    `${COURSES_API}/${courseId}/assignments`,
    assignment
  );
  return response.data;
};

export const deleteAssignment = async (assignmentId: string): Promise<void> => {
  const response = await axios.delete(`${ASSIGNMENTS_API}/${assignmentId}`);
  return response.data;
};

export const updateAssignment = async (assignment: Assignment): Promise<Assignment> => {
  const response = await axios.put(
    `${ASSIGNMENTS_API}/${assignment._id}`,
    assignment
  );
  return response.data;
};