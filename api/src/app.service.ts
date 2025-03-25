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
    // TODO: implement proper passwords
    if (data.password === "jasamadminjasamsuper") {
      this.allData = this.filterProfessorsWithRooms(data.data);
      return true;
    } else {
      return false;
    }
  }

  getHello(): string {
    return 'Hello, World!';
  }
  
  filterProfessorsWithRooms(data: AllMapsData): AllMapsData {
    return {
      nodes: data.nodes,
      edges: data.edges,
      hallways: data.hallways,
      submaps: data.submaps,
      professors: data.professors.filter(p => p.room.length > 0),
    };
  }
}
