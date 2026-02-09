import { test, expect } from '../../fixtures'
import { createUserRegistrationData } from "../../factories/user.factory";
import { createLoginData } from "../../factories/login.factory";
import { UserApiClient } from "../../client/user.client";
import { LoginResponse } from '../../schemas/login.schema';

test.describe('POST /login', () => {
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

  test('should login with valid credentials', async () => {
    const userData = createUserRegistrationData();

    await test.step('register new user', async () => {
      const response = await userClient.createUser(userData)

      expect(response.status()).toBe(201)
    })
    await test.step('try to login with new user credentials', async () => {
      const loginData = createLoginData(userData.user.email, userData.user.password)

      const response = await userClient.login(loginData)
      const data = await response.json() as LoginResponse

      expect(response.status()).toBe(200)
      expect(data.user!.email).toEqual(userData.user.email)
      expect(data.user!.username).toEqual(userData.user.username)
    })
  })

  test('should not login with wrong password', async () => {
    const userData = createUserRegistrationData();

    await test.step('register new user', async () => {
      const response = await userClient.createUser(userData)
      expect(response.status()).toBe(201)
    })

    await test.step('try to login with new user credentials', async () => {
      const loginData = createLoginData(userData.user.email, `${userData.user.password}1`)

      const response = await userClient.login(loginData)

      expect(response.status()).toBe(401)
      const data = await response.json() as LoginResponse
      expect(data.errors!.login).toBe('Not Registered email or invalid password')
    })
  })
})