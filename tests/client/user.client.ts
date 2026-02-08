import { UserRegistrationRequest, UserResponse, UserResponseSchema } from '../schemas/user.schema'
import { LoginRequest, LoginResponse, LoginResponseSchema } from '../schemas/login.schema'
import { BaseApiClient } from './base.client';
import { APIResponse } from '@playwright/test';


export class UserApiClient extends BaseApiClient {
  constructor(protected baseURL: string | undefined) {
    super(baseURL ? baseURL : '')
  }

  async createUser(userData: UserRegistrationRequest): Promise<APIResponse> {
    const response = await this.post('/users', userData);
    const data = await response.json()
    UserResponseSchema.parse(data)
    return response
    
  }

  async login(loginData: LoginRequest): Promise<APIResponse> {
    return this.post('/users/login', loginData);
  }
}