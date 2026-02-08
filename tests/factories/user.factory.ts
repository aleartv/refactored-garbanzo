import { faker } from '@faker-js/faker'
import { UserRegistrationData, UserRegistrationRequest } from '../schemas/user.schema'

export const createUserRegistrationData = (overrides?: Partial<UserRegistrationData>): UserRegistrationRequest => ({
  user: {
    email: faker.internet.email(),
    password: faker.internet.password({ length: 12 }),
    username: faker.internet.username(),
    ...overrides,
  }
});