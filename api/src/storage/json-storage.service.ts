import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { Logger } from '@nestjs/common';
import { EMPTY_LONG_TERM_STORAGE_DATA } from 'src/constants';
import { LongtermStorage } from 'src/data/ServerData';

@Injectable()
export class JsonStorageService {
  private filePath = path.join(__dirname, '../..', 'longterm_storage.json'); // Adjust path as needed

  constructor() {
    Logger.log(`Using storage file at path: ${this.filePath}`);
    if (!fs.existsSync(this.filePath)) {
      Logger.log("No storage file. New storage file created");
      fs.writeFileSync(this.filePath, JSON.stringify(EMPTY_LONG_TERM_STORAGE_DATA, null, 2)); // Initialize empty array
    }
  }

  async saveData(newData: LongtermStorage): Promise<boolean> {
    try {
      await fs.promises.writeFile(this.filePath, JSON.stringify(newData, null, 2));
      return true;
    } catch (error) {
      Logger.error('Failed to save data: ' + error.message);
      return false;
    }
  }

  async readData(): Promise<any> {
    try {
      const data = await fs.promises.readFile(this.filePath, 'utf8');
      Logger.log(`data successfully read`);
      return JSON.parse(data);
    } catch (error) {
      Logger.error('Failed to read data: ' + error.message);
      return {};
    }
  }
}
