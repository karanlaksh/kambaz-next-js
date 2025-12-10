import axios from "axios";

const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
const COURSES_API = `${HTTP_SERVER}/api/courses`;
const QUIZZES_API = `${HTTP_SERVER}/api/quizzes`;

export interface Choice {
  _id: string;
  text: string;
  isCorrect: boolean;
}

export interface Blank {
  _id: string;
  answers: string[];
}

export interface Question {
  _id: string;
  title: string;
  type: "MULTIPLE_CHOICE" | "TRUE_FALSE" | "FILL_IN_BLANK";
  points: number;
  question: string;
  choices: Choice[];
  correctAnswer: boolean;
  blankAnswers: string[];
  blanks: Blank[];
}

export interface Quiz {
  _id: string;
  title: string;
  description: string;
  course: string;
  quizType: "GRADED_QUIZ" | "PRACTICE_QUIZ" | "GRADED_SURVEY" | "UNGRADED_SURVEY";
  assignmentGroup: "QUIZZES" | "EXAMS" | "ASSIGNMENTS" | "PROJECT";
  points: number;
  shuffleAnswers: boolean;
  timeLimit: number;
  hasTimeLimit: boolean;
  multipleAttempts: boolean;
  howManyAttempts: number;
  showCorrectAnswers: string;
  accessCode: string;
  oneQuestionAtATime: boolean;
  webcamRequired: boolean;
  lockQuestionsAfterAnswering: boolean;
  dueDate: string;
  availableDate: string;
  untilDate: string;
  published: boolean;
  questions: Question[];
}

// ==================== QUIZ API ====================

export const findQuizzesForCourse = async (courseId: string): Promise<Quiz[]> => {
  const response = await axios.get(`${COURSES_API}/${courseId}/quizzes`);
  return response.data;
};

export const findQuizById = async (quizId: string): Promise<Quiz> => {
  const response = await axios.get(`${QUIZZES_API}/${quizId}`);
  return response.data;
};

export const createQuiz = async (courseId: string, quiz: Partial<Quiz>): Promise<Quiz> => {
  const response = await axios.post(`${COURSES_API}/${courseId}/quizzes`, quiz);
  return response.data;
};

export const updateQuiz = async (quiz: Quiz): Promise<Quiz> => {
  const response = await axios.put(`${QUIZZES_API}/${quiz._id}`, quiz);
  return response.data;
};

export const deleteQuiz = async (quizId: string): Promise<void> => {
  await axios.delete(`${QUIZZES_API}/${quizId}`);
};

export const publishQuiz = async (quizId: string, published: boolean): Promise<void> => {
  await axios.put(`${QUIZZES_API}/${quizId}/publish`, { published });
};

// ==================== QUESTION API ====================

export const addQuestion = async (quizId: string, question: Partial<Question>): Promise<Question> => {
  const response = await axios.post(`${QUIZZES_API}/${quizId}/questions`, question);
  return response.data;
};

export const updateQuestion = async (
  quizId: string, 
  questionId: string, 
  question: Partial<Question>
): Promise<Question> => {
  const response = await axios.put(`${QUIZZES_API}/${quizId}/questions/${questionId}`, question);
  return response.data;
};

export const deleteQuestion = async (quizId: string, questionId: string): Promise<void> => {
  await axios.delete(`${QUIZZES_API}/${quizId}/questions/${questionId}`);
};

// ==================== ATTEMPT API ====================

export interface Answer {
  questionId: string;
  answer: string | boolean | string[] | null;
  isCorrect?: boolean;
  pointsEarned?: number;
}

export interface Attempt {
  _id: string;
  quiz: string;
  user: string;
  answers: Answer[];
  score: number;
  totalPoints: number;
  attemptNumber: number;
  submittedAt: string;
}

export const findAttemptsForQuiz = async (quizId: string): Promise<Attempt[]> => {
  const response = await axios.get(`${QUIZZES_API}/${quizId}/attempts`, { withCredentials: true });
  return response.data;
};

export const findLatestAttempt = async (quizId: string): Promise<Attempt | null> => {
  const response = await axios.get(`${QUIZZES_API}/${quizId}/attempts/latest`, { withCredentials: true });
  return response.data;
};

export const countAttempts = async (quizId: string): Promise<number> => {
  const response = await axios.get(`${QUIZZES_API}/${quizId}/attempts/count`, { withCredentials: true });
  return response.data.count;
};

export const submitAttempt = async (quizId: string, answers: Answer[]): Promise<Attempt> => {
  const response = await axios.post(`${QUIZZES_API}/${quizId}/attempts`, { answers }, { withCredentials: true });
  return response.data;
};