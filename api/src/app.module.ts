import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JsonStorageService } from './storage/json-storage.service';
// import { ServeStaticModule } from '@nestjs/serve-static';
// import { join } from 'path';

@Module({
  // imports: [
  //   // To host client from this endpoint.
  //   ServeStaticModule.forRoot({
  //       rootPath: join(__dirname, '../..', 'client', 'dist'),
  //   }),
  // ],
  controllers: [AppController],
  providers: [JsonStorageService, AppService],
  exports: [JsonStorageService],
})
export class AppModule {}
