import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './basePage';
import { UserRegistrationData } from '../schemas/user.schema';

export class HomePage extends BasePage {
  private signUpLink: Locator;
  private usernameInput: Locator;
  private emailInput: Locator;
  private passwordInput: Locator;
  private signUpButton: Locator;

  constructor(page: Page, baseURL: string | undefined) {
    super(page, baseURL);
    this.signUpLink = this.page.getByText('Sign Up')
    this.usernameInput = this.page.getByLabel('Username')
    this.emailInput = this.page.getByLabel('Email')
    this.passwordInput = this.page.getByLabel('Password')
    this.signUpButton = this.page.getByRole('button', { name: 'Sign Up' })
  }

  async signUp({ username, email, password }: UserRegistrationData): Promise<HomePage> {
    await this.signUpLink.click()
    await this.usernameInput.fill(username)
    await this.emailInput.fill(email)
    await this.passwordInput.fill(password)
    await this.signUpButton.click()
  }


}