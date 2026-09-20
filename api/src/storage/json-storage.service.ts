import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { Logger } from '@nestjs/common';
import { LongtermStorage } from '../data/ServerData';

@Injectable()
export class JsonStorageService {
  private readonly filePath = path.join(__dirname, '../../data', 'longterm_storage.json');
  /** Previous contents, kept so a bad save can be undone by hand. */
  private readonly backupPath = `${this.filePath}.bak`;
  private readonly tempPath = `${this.filePath}.tmp`;

  /**
   * Writes run one at a time. Two admins saving at once would otherwise both
   * write the same temp file and rename it, leaving a mix of the two payloads.
   */
  private writeQueue: Promise<unknown> = Promise.resolve();

  constructor() {
    Logger.log(`Using storage file at path: ${this.filePath}`);
  }

  async saveData(newData: LongtermStorage): Promise<boolean> {
    const write = this.writeQueue.then(() => this.writeAtomically(newData));
    // Swallow the result for the *queue* only, so one failed write doesn't
    // reject every write queued behind it. The caller still gets `write`.
    this.writeQueue = write.catch(() => undefined);
    return write;
  }

  /**
   * The live file is never truncated: the new contents go to a temp file and
   * only then replace the real one through rename(), which is atomic. A crash
   * or a full disk mid-write therefore leaves the old file intact rather than
   * half a JSON document that fails to parse on the next boot.
   */
  private async writeAtomically(newData: LongtermStorage): Promise<boolean> {
    try {
      await this.backupCurrentFile();
      await fs.promises.writeFile(this.tempPath, JSON.stringify(newData, null, 2));
      await fs.promises.rename(this.tempPath, this.filePath);
      return true;
    } catch (error) {
      Logger.error('Failed to save data: ' + error.message);
      await fs.promises.rm(this.tempPath, { force: true }).catch(() => undefined);
      return false;
    }
  }

  private async backupCurrentFile(): Promise<void> {
    try {
      await fs.promises.copyFile(this.filePath, this.backupPath);
    } catch (error) {
      // There is nothing to back up before the very first save.
      if (error.code !== 'ENOENT') {
        throw error;
      }
    }
  }

  /**
   * Returns null when there is no file yet or it couldn't be read, and lets the
   * caller decide what that means. It deliberately does not create the file:
   * writing an empty storage file at boot used to hand out a blank password.
   */
  async readData(): Promise<unknown | null> {
    try {
      const data = await fs.promises.readFile(this.filePath, 'utf8');
      Logger.log(`data successfully read`);
      return JSON.parse(data);
    } catch (error) {
      if (error.code === 'ENOENT') {
        Logger.warn(`No storage file at ${this.filePath}. Starting with empty map data.`);
      } else {
        Logger.error('Failed to read data: ' + error.message);
      }
      return null;
    }
  }
}
