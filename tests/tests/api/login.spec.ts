import { test, expect } from '../../fixtures/index'
import { createUserRegistrationData } from "../../factories/user.factory";
import { createLoginData } from "../../factories/login.factory";

test.describe('POST /login', () => {
  test.beforeEach(({ db }) => {
    db.deleteFrom('user_models')
  })

  test('should login with valid credentials', async ({ userClient }) => {
    const userData = await createUserRegistrationData();

    await test.step('register new user', async () => {
      const { response } = await userClient.createUser(userData)
      expect(response.status()).toBe(201)
    })
    
    await test.step('try to login with new user credentials', async () => {
      const loginData = createLoginData(userData.user.email, userData.user.password)

      const { response, validated } = await userClient.login(loginData)

      expect(response.status()).toBe(200)
      expect(validated.user!.email).toEqual(userData.user.email)
      expect(validated.user!.username).toEqual(userData.user.username)
    })
  })

  test('should not login with wrong password', async ({ userClient }) => {
    const userData = await createUserRegistrationData()

    await test.step('register new user', async () => {
      const { response } = await userClient.createUser(userData)
      expect(response.status()).toBe(201)
    })

    await test.step('try to login with new user credentials', async () => {
      const loginData = createLoginData(userData.user.email, `${userData.user.password}1`)

      const { response, validated } = await userClient.login(loginData)

      expect(response.status()).toBe(401)
      expect(validated.errors!.login).toBe('Not Registered email or invalid password')
    })
  })
})