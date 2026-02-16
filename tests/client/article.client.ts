import { ArticleRequest, ArticleResponse } from '../schemas/article.schema'
import { BaseApiClient } from './base.client';
import z from 'zod';
import { validate } from '../validators/validator'
import { Response } from './base.client'

export class ArticleApiClient extends BaseApiClient {
  constructor(baseURL: string | undefined, protected schemas: Record<string, z.ZodType>) {
    super(baseURL)
    this.schemas = schemas;
  }

  async createArticle(article: ArticleRequest, token: string | undefined ): Promise<Response<ArticleResponse>> {
    const response = await this.post('/articles', article, { Authorization: `Token ${token}` });
    if (response.status() === 401) {
      return { response, validated: { article: {}}}
    }
    const data = await response.json()
    const validated = await validate<ArticleResponse>(data, this.schemas.articleResponseSchema);
    return { response, validated }
    
  }
}