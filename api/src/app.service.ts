import { Injectable, OnModuleInit } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JsonStorageService } from './storage/json-storage.service';
import {
  AllMapsData,
  LongtermStorage,
  ServerChangeDataRequest,
  ServerChangePasswordRequest,
  ServerLoginRequest,
  StoredDataSchema,
} from './data/ServerData';
import { Logger } from '@nestjs/common';
import { ADMIN_PASSWORD_HASH_ENV, BCRYPT_ROUNDS, EMPTY_DATA } from './constants';

@Injectable()
export class AppService implements OnModuleInit {

  private allData: AllMapsData = EMPTY_DATA;
  /**
   * bcrypt hash of the admin password, or null when none is configured. null
   * fails every check, so a deployment that was never given a password is
   * locked instead of open to anyone who finds the URL.
   */
  private passwordHash: string | null = null;

  constructor(
    private readonly jsonStorageService: JsonStorageService
  ) {}

  /**
   * Nest awaits onModuleInit before the server starts accepting connections.
   * Loading in the constructor instead left a window - one that reopens on
   * every serverless cold start - where requests were checked against a
   * password that hadn't been read from storage yet.
   */
  async onModuleInit(): Promise<void> {
    await this.loadStoredData();
  }

  async getAllData(): Promise<AllMapsData> {
    return this.allData;
  }

  async login(request: ServerLoginRequest): Promise<boolean> {
    return this.checkPassword(request.password);
  }

  async changePassword(update: ServerChangePasswordRequest): Promise<boolean> {
    if (!await this.checkPassword(update.oldPassword)) {
      // Deliberately log without the attempted password: a mistyped entry here is
      // very often the real password going into the wrong field.
      Logger.warn('Rejected a change password request: wrong old password');
      return false;
    }

    const previousHash = this.passwordHash;
    this.passwordHash = await bcrypt.hash(update.newPassword, BCRYPT_ROUNDS);
    if (await this.persist()) {
      return true;
    }
    // Keep memory and storage in agreement. A password that only "changed"
    // until the next restart is worse than a failure the admin can retry.
    this.passwordHash = previousHash;
    return false;
  }

  async save(data: ServerChangeDataRequest): Promise<boolean> {
    if (!await this.checkPassword(data.password)) {
      return false;
    }

    const previousData = this.allData;
    this.allData = this.filterProfessorsWithRooms(data.data);
    if (await this.persist()) {
      return true;
    }
    this.allData = previousData;
    return false;
  }

  /**
   * bcrypt.compare takes the same time whether the password is wrong in the
   * first character or the last, so this doesn't leak the password by timing.
   */
  private async checkPassword(password: string): Promise<boolean> {
    if (this.passwordHash === null) {
      return false;
    }
    return bcrypt.compare(password, this.passwordHash);
  }

  private async loadStoredData(): Promise<void> {
    const stored = await this.jsonStorageService.readData()
      .catch(e => {
        Logger.error(`jsonStorageService.readData() error: ${e.message}`);
        return null;
      });

    if (stored !== null) {
      const parsed = StoredDataSchema.safeParse(stored);
      if (parsed.success) {
        this.allData = parsed.data.mapData;
        this.passwordHash = parsed.data.passwordHash ?? null;
      } else {
        Logger.error(`couldn't parse stored data`);
      }
    }

    if (this.passwordHash === null) {
      this.passwordHash = process.env[ADMIN_PASSWORD_HASH_ENV]?.trim() || null;
    }
    if (this.passwordHash === null) {
      Logger.error(
        `No admin password configured. Every admin request will be rejected until ` +
        `${ADMIN_PASSWORD_HASH_ENV} is set (generate a value with: npm run hash-password).`,
      );
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

  /** Returns whether the data actually reached storage - callers report that as-is. */
  private async persist(): Promise<boolean> {
    if (this.passwordHash === null) {
      Logger.error('Refusing to write storage without an admin password hash');
      return false;
    }
    const storageData: LongtermStorage = {
      mapData: this.allData,
      passwordHash: this.passwordHash,
    };
    return this.jsonStorageService.saveData(storageData);
  }
}
