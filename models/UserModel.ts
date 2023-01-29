import controller from "../controller";
import { UserRole } from "../enum/UserRole";
import { UserType } from "../enum/UserType";

export default interface UserModel {
  _id: string;
  userType: UserType;
  firstName: string;
  lastName: string;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
  authenticated: boolean;
  isLoggedIn: boolean;
  phoneNumber: string;
  lastLogin: string;
  email: string;
  token?: string;
  userId: string;
}

export interface UserLoginDto {
  username: string;
  password: string;
}

export interface CreateUserDto {
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  phoneNumber: string;
}
