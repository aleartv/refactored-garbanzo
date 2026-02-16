import { UserRegistrationRequest, UserResponse } from '../schemas/user.schema'
import { LoginRequest, LoginResponse } from '../schemas/login.schema'
import { BaseApiClient, Response } from './base.client';
import z from 'zod';
import { validate } from '../validators/validator'

export class UserApiClient extends BaseApiClient {
  constructor(baseURL: string | undefined, protected schemas: Record<string, z.ZodType>) {
    super(baseURL)
    this.schemas = schemas;
  }

  async createUser(userData: UserRegistrationRequest): Promise<Response<UserResponse>> {
    const response = await this.post('/users', userData);
    const data = await response.json() as unknown
    const validated = await validate<UserResponse>(data, this.schemas.UserResponseSchema);
    return { response, validated }
    
  }

  async login(loginData: LoginRequest): Promise<Response<LoginResponse>> {
    const response = await this.post('/users/login', loginData);
    const data = await response.json() as unknown
    const validated = await validate<LoginResponse>(data, this.schemas.LoginResponseSchema);
    return { response, validated };
  }
}
