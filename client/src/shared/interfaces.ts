export interface User {
  _id: string;
  email: string;
  firstname: string;
  lastname: string;
  createdAt: string;
  updatedAt: string;
}

export interface Credentials {
  email: string;
  password: string;
}

export interface UserCreation {
  email: string;
  firstname: string;
  lastname: string;
  password: string;
  passwordConfirmation: string;
  role: string;
}
export interface UserUpdate {
  email: string;
  firstname: string;
  lastname: string;
  password: string;
  passwordConfirmation: string;
  role: string;
}
