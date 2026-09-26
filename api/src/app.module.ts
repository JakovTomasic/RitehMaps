import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JsonStorageService } from './storage/json-storage.service';
// import { ServeStaticModule } from '@nestjs/serve-static';
// import { join } from 'path';

@Module({
  imports: [
    // Baseline budget for every endpoint; the ones that take a password tighten
    // it further. Counters live in memory, so the limit is per server instance:
    // enough to stop a brute force from one machine, not a distributed one.
    ThrottlerModule.forRoot([{ ttl: 60_000, limit: 60 }]),
    // // To host client from this endpoint.
    // ServeStaticModule.forRoot({
    //     rootPath: join(__dirname, '../..', 'client', 'dist'),
    // }),
  ],
  controllers: [AppController],
  providers: [
    JsonStorageService,
    AppService,
    { provide: APP_GUARD, useClass: ThrottlerGuard },
  ],
  exports: [JsonStorageService],
})
export class AppModule {}
