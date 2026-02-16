import { expect as baseExpect } from "@playwright/test";
import { Response } from '../../client/base.client';
import { UserRegistrationData, UserResponse } from "../../schemas/user.schema";

export const expect = baseExpect.extend({
  toBeValidUserCreation(
    actual: Response<UserResponse>,
    expected: UserRegistrationData,
  ) {
    const success =
      actual.response.status() === 201 &&
      actual.validated.user?.email === expected.email &&
      actual.validated.user?.username === expected.username &&
      !('errors' in actual.validated)

    if (success) {
      return {
        message: () => "expected user creation to be valid",
        pass: true,
      };
    } else {
      return {
        message: () =>
          `expected user creation to be valid but got:
           actual status: ${actual.response.status()} expected status: ${201}
           actual data: ${JSON.stringify(actual.validated, null, 2)}
           expected data: ${JSON.stringify(expected, null, 2)} \n
          `,
        pass: false,
      };
    }
  },
  toBeInvalidUserCreation(
    actual: Response<UserResponse>,
    expectedError: { path?: string, message: string, status: number }
  ) {
    const success = 
      actual.response.status() === expectedError.status &&
      actual.validated.errors![expectedError.path || 'database'] === expectedError.message &&
      !('user' in actual.validated)

    if (success) {
      return {
        message: () => "expected user creation not to be valid",
        pass: true,
      };
    } else {
      return {
        message: () =>
          `expected user creation not to be valid but got:
           actual status: ${actual.response.status()} expected status: ${expectedError.status}
           actual data: ${JSON.stringify(actual.validated, null, 2)}
           expected data: ${JSON.stringify(expectedError, null, 2)} \n
          `,
        pass: false,
      };
    }
  }
});
