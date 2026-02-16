import { createArticleData } from "../../factories/article.factory";
import { createUserRegistrationData } from "../../factories/user.factory";
import { test, expect } from "../../fixtures/index";
import { UserResponse } from "../../schemas/user.schema";

test.describe("POST /articles", () => {
  let token: string | undefined;

  test.beforeAll(async ({ userClient }) => {
    const data = await createUserRegistrationData();
    const { response } = await userClient.createUser(data);
    const json = await response.json() as UserResponse;
    token = json.user?.token
  });

  test("Should be post valid article", async ({ articleClient }) => {
    const articleData = await createArticleData();
    const { response, validated } = await articleClient.createArticle(
      articleData,
      token,
    );
    expect(response.status()).toBe(201);
    console.log(validated);
  });
});
