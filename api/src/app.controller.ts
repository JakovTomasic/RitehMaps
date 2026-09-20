import { Body, Controller, Get, Post } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { AppService } from './app.service';
import {
  AllMapsData,
  ServerChangeDataRequest,
  ServerChangeDataRequestSchema,
  ServerChangePasswordRequest,
  ServerChangePasswordRequestSchema,
  ServerLoginRequest,
  ServerLoginRequestSchema,
} from './data/ServerData';
import { ZodValidationPipe } from './common/zod-validation.pipe';

/** Tight budget for the endpoints that take a password: 5 tries a minute per IP. */
const PASSWORD_ATTEMPTS_THROTTLE = { default: { limit: 5, ttl: 60_000 } };

@Controller("api")
export class AppController {

  constructor(private readonly appService: AppService) {}

  @Get("allData")
  professors(): Promise<AllMapsData> {
    return this.appService.getAllData();
  }

  // Only checks whether the password is correct, so the admin UI can be unlocked.
  // Test with: curl -X POST http://localhost:3000/api/login -d '{ "password": "..." }' -H "Content-Type: application/json"
  @Throttle(PASSWORD_ATTEMPTS_THROTTLE)
  @Post("login")
  async login(
    @Body(new ZodValidationPipe(ServerLoginRequestSchema)) login: ServerLoginRequest,
  ): Promise<boolean> {
    return this.appService.login(login);
  }

  // Test with: curl -X POST http://localhost:3000/api/save -d '{ "password": "...", "data": { ... mock data here } }' -H "Content-Type: application/json"
  @Post("save")
  async save(
    @Body(new ZodValidationPipe(ServerChangeDataRequestSchema)) dataToSave: ServerChangeDataRequest,
  ): Promise<boolean> {
    return this.appService.save(dataToSave);
  }

  // Test with: curl -X POST http://localhost:3000/api/changePassword -d '{ "oldPassword": "...", "newPassword": "..." }' -H "Content-Type: application/json"
  @Throttle(PASSWORD_ATTEMPTS_THROTTLE)
  @Post("changePassword")
  async changePassword(
    @Body(new ZodValidationPipe(ServerChangePasswordRequestSchema)) changePassword: ServerChangePasswordRequest,
  ): Promise<boolean> {
    return this.appService.changePassword(changePassword);
  }

  @Get("hello")
  hellp(): string {
    return "hello";
  }

}
