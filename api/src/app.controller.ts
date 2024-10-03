import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { Request } from 'express';
import { AllMapsData, ChangeDataRequest } from './data/Data';


@Controller("api")
export class AppController {

  constructor(private readonly appService: AppService) {}

  @Get("hello")
  getHello(): string {
    return this.appService.getHello();
  }

  @Get("allData")
  professors(): Promise<AllMapsData> {
    return this.appService.getAllData();
  }

  // Test with: curl -X POST http://localhost:3000/api/save -d '[{ ... mock data here }]' -H "Content-Type: application/json"
  @Post("save")
  async save(@Req() req: Request, @Body() dataToSave: ChangeDataRequest): Promise<boolean> {
    // TODO: change password
    return this.appService.save(dataToSave);
  }
}
