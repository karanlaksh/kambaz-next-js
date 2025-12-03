export interface User {
  _id: string;
  username?: string;
  password?: string;
  firstName: string;
  lastName: string;
  email?: string;
  loginId: string;
  section: string;
  role: string;
  lastActivity?: string;
  totalActivity: string;
  dob?: Date;
}