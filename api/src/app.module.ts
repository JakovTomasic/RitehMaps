import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    // To host client from this endpoint.
    //  disabled because the client is on the other server
    // ServeStaticModule.forRoot({
    //     rootPath: join(__dirname, '../..', 'client', 'dist'),
    // }),

    // TODO: enable database
    // TypeOrmModule.forRoot({
    //   type: 'mysql',
    //   host: 'localhost',
    //   port: 3306,
    //   username: 'root',
    //   password: 'root',
    //   database: 'RitehMapsDB',
    //   entities: [AllData],
    //   // synchronize: true, // Enable to generate all necessary tables, but disable for production
    // }),
    // TypeOrmModule.forFeature([AllData]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
