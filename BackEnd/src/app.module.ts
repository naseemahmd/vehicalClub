import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { UserModule } from './users/users.module';
import { VehicleModule } from './vehicle/vehicle.module';
import { FileModule } from './FileUpload/file.module';
import { FileDownloadModule } from './FileDownload/fileDownload.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { vehicleEntity } from 'src/vehicle/module/vehicle.entity';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    BullModule.registerQueueAsync({
      name: 'dowloadFiles',
      useFactory: () => ({
        redis: {
          host: 'localhost',
          port: 6379,
        },
      }),
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '127.0.0.1',
      port: 5432,
      username: 'postgres',
      password: '123456',
      database: 'autoMobile',
      schema: 'vehicals',
      entities: [vehicleEntity],
      synchronize: true,
    }),
    UserModule,
    VehicleModule,
    FileModule,
    FileDownloadModule,
  ],
})
export class AppModule {}
