import { Injectable } from '@nestjs/common';
import { ChangeDataRequest } from './data/Data';
import { JsonStorageService } from './storage/json-storage.service';
import { AllMapsData, AllMapsDataSchema } from './data/ServerData';
import { Logger } from '@nestjs/common';
import { EMPTY_DATA } from './constants';

@Injectable()
export class AppService {

  private allData: AllMapsData = EMPTY_DATA;

  constructor(
    // @InjectRepository(AllData)
    // private storageRepository: Repository<AllData>,
    private readonly jsonStorageService: JsonStorageService
  ) {
    jsonStorageService.readData().then((result) => {
      const data = AllMapsDataSchema.safeParse(result);
      if (data.success) {
        const value: AllMapsData = data.data;
        this.allData = value;
      }
    }).catch(e => Logger.error(`jsonStorageService.readData() error: ${e.message}`))
  }

  async getAllData(): Promise<AllMapsData> {
    return this.allData;
  }

  async save(data: ChangeDataRequest): Promise<boolean> {
    // TODO: implement proper passwords
    if (data.password === "") {
      this.allData = this.filterProfessorsWithRooms(data.data);
      this.jsonStorageService.saveData(this.allData);
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
