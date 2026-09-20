import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { Request } from 'express';
import { ChangeDataRequest, ChangePasswordRequest, LoginRequest } from './data/Data';
import { AllMapsData } from './data/ServerData';


@Controller("api")
export class AppController {

  constructor(private readonly appService: AppService) {}

  @Get("allData")
  professors(): Promise<AllMapsData> {
    return this.appService.getAllData();
  }

  // Only checks whether the password is correct, so the admin UI can be unlocked.
  // Test with: curl -X POST http://localhost:3000/api/login -d '{ "password": "" }' -H "Content-Type: application/json"
  @Post("login")
  async login(@Body() login: LoginRequest): Promise<boolean> {
    return this.appService.login(login);
  }

  // Test with: curl -X POST http://localhost:3000/api/save -d '[{ ... mock data here }]' -H "Content-Type: application/json"
  @Post("save")
  async save(@Req() req: Request, @Body() dataToSave: ChangeDataRequest): Promise<boolean> {
    return this.appService.save(dataToSave);
  }

  // Test with: curl -X POST http://localhost:3000/api/changePassword -d '{ "oldPassword": "", "newPassword": "a" }' -H "Content-Type: application/json"
  @Post("changePassword")
  async changePassword(@Req() req: Request, @Body() changePassword: ChangePasswordRequest): Promise<boolean> {
    return this.appService.changePassord(changePassword);
  }

  @Get("hello")
  hellp(): string {
    return "hello";
  }

}
