import { fakerRU as faker } from "@faker-js/faker";
import {
  UserRegistrationData,
  UserRegistrationRequest,
} from "../schemas/user.schema";
import { withTestStep } from ".";

export const createUserRegistrationData = withTestStep("User request")(
  (overrides?: Partial<UserRegistrationData> | UserRegistrationRequest): UserRegistrationRequest => {
    if (overrides && 'user' in overrides) {
      return overrides;
    } else {
      return {
        user: {
          email: faker.internet.email(),
          password: faker.internet.password({ length: 12 }),
          username: faker.internet.username(),
          ...overrides,
        },
      };
    }
  },
);
