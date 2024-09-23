import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AllData } from './storage/data.entity';

@Module({
  imports: [
    // TODO: don't use this if the client is on the other server?
    ServeStaticModule.forRoot({
        rootPath: join(__dirname, '../..', 'client', 'dist'),
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'RitehMapsDB',
      entities: [AllData],
      // synchronize: true, // Enable to generate all necessary tables, but disable for production
    }),
    TypeOrmModule.forFeature([AllData]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
