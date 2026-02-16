import { test, expect } from "../../fixtures/index";
import { createUserRegistrationData } from "../../factories/user.factory";

test.describe("POST /users", () => {
  test.beforeEach(({ db }) => {
    db.deleteFrom("article_tags")
    db.deleteFrom("article_models");
    db.deleteFrom("article_user_models");
    db.deleteFrom("user_models");
  });

  test("Should successfully register a user with valid credentials", async ({
    userClient,
  }) => {
    const userData = await createUserRegistrationData();
    const { response, validated } = await userClient.createUser(userData);
    expect({ response, validated }).toBeValidUserCreation(userData.user);
  });

  test("Should NOT register with duplicate email", async ({ userClient }) => {
    const userData = await createUserRegistrationData();

    await test.step("register first user", async () => {
      const { response, validated } = await userClient.createUser(userData);
      expect({ response, validated }).toBeValidUserCreation(userData.user);
    });

    await test.step("try to register second user with same email", async () => {
      const duplicatedUserData = await createUserRegistrationData({
        email: userData.user.email,
      });
      const { response, validated } = await userClient.createUser(
        duplicatedUserData,
      );

      expect({ response, validated }).toBeInvalidUserCreation({
        status: 422,
        message: "UNIQUE constraint failed: user_models.email",
      });
    });
  });

  const invalidRegistrationCases = [
    {
      name: "invalid email format",
      userData: { email: "not_email" },
      expectedError: { status: 422, path: "Email", message: "{key: email}" },
    },
    {
      name: "empty username",
      userData: { username: "" },
      expectedError: {
        status: 422,
        path: "Username",
        message: "{key: required}",
      },
    },
    {
      name: "missing password",
      userData: { user: { email: "test@example.com", username: "username" } },
      expectedError: {
        status: 422,
        path: "Password",
        message: "{key: required}",
      },
    },
  ];

  invalidRegistrationCases.forEach(({ name, userData, expectedError }) => {
    test(`Should NOT register user with ${name}`, async ({ userClient }) => {
      const data = await createUserRegistrationData(userData);

      const { response, validated } = await userClient.createUser(data);
      expect({ response, validated }).toBeInvalidUserCreation(expectedError);
    });
  });
});
