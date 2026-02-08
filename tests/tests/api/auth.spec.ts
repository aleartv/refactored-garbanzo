import { test, expect } from '../../fixtures'
import { createUserRegistrationData } from "../../factories/user.factory";
import { UserApiClient } from "../../client/user.client";
import { UserRegistrationRequest } from '../../schemas/user.schema';

test.describe('POST /users', () => {
  let userClient: UserApiClient;

  test.beforeEach(async ({ baseURL, db }) => {
    userClient = new UserApiClient(baseURL);

    try {
      db.prepare('DELETE FROM user_models').run();
      console.log('Cleaned up users table');
    } catch (error) {
      console.warn('Could not clean users table:', (error as Error).message);
    } finally {
      db.close();
    }
  })

  test('should register user successfully', async () => {
    const userData = createUserRegistrationData();

    const response = await userClient.createUser(userData)
    const data = await response.json()
      
    expect(response.status()).toBe(201)
    expect(data.user!.email).toEqual(userData.user.email)
    expect(data.user!.username).toEqual(userData.user.username)
  })

  test('should not register with duplicate email', async () => {
    const userData = createUserRegistrationData();

    await test.step('register first user', async () => {
      const response = await userClient.createUser(userData)
      expect(response.status()).toBe(201)
    })

    await test.step('try to register second user with same email', async () => {
      const duplicatedUserData = createUserRegistrationData({ email: userData.user.email })

      const response = await userClient.createUser(duplicatedUserData)

      expect(response.status()).toBe(422)
      const data = await response.json()
      expect(data.errors.database).toBe('UNIQUE constraint failed: user_models.email')
    })
  })

  const invalidRegistrationCases = [
    {
      name: 'invalid email format',
      userData: { email: 'not_email' },
      expectedError: { path: 'Email', message: '{key: email}' }
    },
    {
      name: 'empty username',
      userData: { username: '' },
      expectedError: { path: 'Username', message: '{key: required}' }
    },
    {
      name: 'missing password',
      userData: { user: { email: 'test@example.com', username: 'username' } },
      expectedError: { path: 'Password', message: '{key: required}' }
    }
  ];

  invalidRegistrationCases.forEach(({ name, userData, expectedError }) => {
    test(`should not register user with ${name}`, async () => {
      const fullUserData = typeof userData.user === 'object' ? 
        userData : 
        createUserRegistrationData(userData);
      
      const response = await userClient.createUser(fullUserData as UserRegistrationRequest);
      expect(response.status()).toBe(422)
      const data = await response.json()
      expect(data.errors[expectedError.path]).toBe(expectedError.message)
    });
  });
});