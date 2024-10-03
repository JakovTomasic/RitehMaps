import { Injectable } from '@nestjs/common';
import { AllMapsData } from './data/Data';

@Injectable()
export class AppService {

  private allData: AllMapsData = {
    nodes: [],
    edges: [],
    hallways: [],
    submaps: [],
    professors: [],
  }

  constructor(
    // @InjectRepository(AllData)
    // private storageRepository: Repository<AllData>,
  ) {}

  async getAllData(): Promise<AllMapsData> {
    return this.allData;
  }

  async save(data: AllMapsData) {
    this.allData = data;
  }

  getHello(): string {
    return 'Hello, World!';
  }
}
