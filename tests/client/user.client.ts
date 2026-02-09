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
    const data = await response.json() as UserResponse
    UserResponseSchema.parse(data)
    return response
    
  }

  async login(loginData: LoginRequest): Promise<APIResponse> {
    const response = await this.post('/users/login', loginData);
    const data = await response.json() as LoginResponse
    LoginResponseSchema.parse(data)
    return response;
  }
}