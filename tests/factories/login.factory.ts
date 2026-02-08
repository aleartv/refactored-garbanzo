import { LoginRequest } from "../schemas/login.schema";

export const createLoginData = (email: string, password: string): LoginRequest => {
  return {
    user: {
      email,
      password,
    }
  }
}