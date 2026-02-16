import { fakerRU as faker } from "@faker-js/faker";
import {
  ArticleData,
  ArticleRequest
} from "../schemas/article.schema";
import { withTestStep } from ".";



export const createArticleData = withTestStep("User request")(
  (overrides?: Partial<ArticleData> | ArticleRequest): ArticleRequest => {
    if (overrides && 'article' in overrides) {
      return overrides;
    } else {
      return {
        article: {
          title: faker.lorem.words(),
          description: faker.lorem.sentence(),
          body: faker.lorem.text(),
          ...overrides,
        },
      };
    }
  },
);
