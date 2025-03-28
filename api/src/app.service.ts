import { Injectable } from '@nestjs/common';
import { ChangeDataRequest, ChangePasswordRequest } from './data/Data';
import { JsonStorageService } from './storage/json-storage.service';
import { AllMapsData, LongtermStorage, LongtermStorageSchema } from './data/ServerData';
import { Logger } from '@nestjs/common';
import { EMPTY_DATA } from './constants';

@Injectable()
export class AppService {

  private allData: AllMapsData = EMPTY_DATA;
  private password: string = "";

  constructor(
    private readonly jsonStorageService: JsonStorageService
  ) {
    jsonStorageService.readData().then((result) => {
      const data = LongtermStorageSchema.safeParse(result);
      if (data.success) {
        this.allData = data.data.mapData;
        this.password = data.data.password;
      } else {
        Logger.error(`couldn't parse stored data`);
      }
    }).catch(e => Logger.error(`jsonStorageService.readData() error: ${e.message}`));
  }

  async getAllData(): Promise<AllMapsData> {
    return this.allData;
  }
  
  async changePassord(update: ChangePasswordRequest): Promise<boolean> {
    if (update.oldPassword === this.password) {
      this.password = update.newPassword;
      this.saveLongTerm();
      return true;
    } else {
      Logger.log(`invalid old password: ${update.oldPassword}`)
      return false;
    }
  }

  async save(data: ChangeDataRequest): Promise<boolean> {
    if (data.password === this.password) {
      this.allData = this.filterProfessorsWithRooms(data.data);
      this.saveLongTerm();
      return true;
    } else {
      return false;
    }
  }

  private filterProfessorsWithRooms(data: AllMapsData): AllMapsData {
    return {
      nodes: data.nodes,
      edges: data.edges,
      hallways: data.hallways,
      submaps: data.submaps,
      professors: data.professors.filter(p => p.room.length > 0),
    };
  }
  
  private saveLongTerm() {
    const storageData: LongtermStorage = {
      mapData: this.allData,
      password: this.password,
    };
    this.jsonStorageService.saveData(storageData);
  }
}
