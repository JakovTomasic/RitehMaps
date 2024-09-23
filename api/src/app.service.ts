import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AllData } from './storage/data.entity';
import { Repository } from 'typeorm';
import { ProfessorData } from './data/ProfessorData';
import { ALL_DATA_ENTRY_ID } from './constants';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(AllData)
    private storageRepository: Repository<AllData>,
  ) {}

  async getProfessors(): Promise<ProfessorData[]> {
    try {
      const data = await this.storageRepository.findOneBy({ id: ALL_DATA_ENTRY_ID });
      console.log("getProfessors: ", JSON.stringify(data));
      return JSON.parse(data.professors);
    } catch (error) {
      console.log("getProfessors error: ", JSON.stringify(error));
      return [];
    }
  }

  async save(data: AllData) {
    data.id = ALL_DATA_ENTRY_ID;
    await this.storageRepository.save(data);
  }

  getHello(): string {
    return 'Hello World!';
  }
}
