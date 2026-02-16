import { test as baseTest, mergeExpects } from '@playwright/test';
import { UserApiClient } from '../client/user.client';
import { ArticleApiClient } from '../client/article.client';
import { UserResponseSchema } from '../schemas/user.schema';
import { LoginResponseSchema } from '../schemas/login.schema';
import { DBFixture } from './db';
import { expect as userExpect } from './matchers/user.matcher'
import { articleResponseSchema } from '../schemas/article.schema';

type CustomFixtures = {
  db: DBFixture;
  userClient: UserApiClient;
  articleClient: ArticleApiClient;
}

export const test = baseTest.extend<CustomFixtures>({
  // eslint-disable-next-line no-empty-pattern
  db: async ({ }, use) => {
    const db = new DBFixture()
    await use(db)
    db.instance.close()  
  },
  userClient: async({ baseURL }, use) => {
    const userClient = new UserApiClient(baseURL, { UserResponseSchema, LoginResponseSchema });
    await use(userClient)
  },
  articleClient: async({ baseURL }, use) => {
    const articleClient = new ArticleApiClient(baseURL, { articleResponseSchema })
    await use(articleClient)
  }
});

export const expect = mergeExpects(userExpect)