import { createUserRegistrationData } from '../../factories/user.factory'
import { test } from '../../fixtures'
import { HomePage } from '../../pages/homePage'

test.describe('register process', () => {

  test('should register with valid data', async ({ page, baseURL }) => {
    const { user } = createUserRegistrationData()
    const homePage = new HomePage(page, baseURL)
    await homePage.goto('/')
    await homePage.signUp(user)
  })
})