import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { ProfessorData, ProfessorDataArray } from './data/ProfessorData';
import { ALL_DATA_ENTRY_ID } from './constants';
import { Request } from 'express';

@Controller("api")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("hello")
  getHello(): string {
    return this.appService.getHello();
  }

  @Get("professors")
  professors(): Promise<ProfessorData[]> {
    console.log("get professors");
    return this.appService.getProfessors();
  }

  // Test with: curl -X POST http://localhost:3000/api/save -d '[{ ... mock data here }]' -H "Content-Type: application/json"
  @Post("save")
  async save(@Req() req: Request, @Body() dataToSave: ProfessorDataArray): Promise<boolean> {
    console.log("save", JSON.stringify(dataToSave.arr));
    await this.appService.save({
      id: ALL_DATA_ENTRY_ID,
      professors: JSON.stringify(dataToSave.arr),
    });
    return true;
  }
}
