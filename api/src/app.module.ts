import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JsonStorageService } from './storage/json-storage.service';

@Module({
  imports: [
    // TODO
    // To host client from this endpoint.
    //  disabled because the client is on the other server
    // ServeStaticModule.forRoot({
    //     rootPath: join(__dirname, '../..', 'client', 'dist'),
    // }),
  ],
  controllers: [AppController],
  providers: [JsonStorageService, AppService],
  exports: [JsonStorageService],
})
export class AppModule {}
