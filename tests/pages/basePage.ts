import { Page } from '@playwright/test';

export class BasePage {
  readonly page: Page;
  readonly baseURL: string;

  constructor(page: Page, baseURL: string | undefined) {
    this.page = page;
    this.baseURL = baseURL || '';
  }

  async goto(path: string = '/') {
    await this.page.goto(`${this.baseURL}${path}`);
  }
}