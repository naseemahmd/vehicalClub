import { Module } from '@nestjs/common';

import { FileDownloadController } from './fileDownload.controller';
// import {DownloadService} from './download.service'
import { VehicleService } from '../vehicle/vehicle.service';
import { FileSaveService } from './fileExport.service';
import { SocketclusterService } from './socketCulster.service';
import { Vehicle } from '../vehicle/module/vehicle';
import { vehicleEntity } from '../vehicle/module/vehicle.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BullModule } from '@nestjs/bull';
import { DowloandConsumer } from './queueProcess.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([vehicleEntity]),
    BullModule.registerQueueAsync({
      name: 'dowloadFiles',
      useFactory: () => ({
        redis: {
          host: 'localhost',
          port: 6379,
        },
      }),
    }),
  ],
  controllers: [FileDownloadController],
  providers: [
    DowloandConsumer,
    VehicleService,
    Vehicle,
    vehicleEntity,
    FileSaveService,
    SocketclusterService,
  ],
})
export class FileDownloadModule {}
