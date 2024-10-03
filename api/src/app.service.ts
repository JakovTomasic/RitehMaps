import { Injectable } from '@nestjs/common';
import { AllMapsData, ChangeDataRequest } from './data/Data';

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

  async save(data: ChangeDataRequest): Promise<boolean> {
    if (data.password === "jasamadminjasamsuper") {
      this.allData = data.data;
      return true;
    } else {
      return false;
    }
  }

  getHello(): string {
    return 'Hello, World!';
  }
}
