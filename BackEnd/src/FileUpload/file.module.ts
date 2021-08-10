import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { VehicleModule } from '../vehicle/vehicle.module';
import { FileController } from './file.controller';
import { ExportService } from './exportServer.service';
import { VehicleService } from '../vehicle/vehicle.service';
import { vehicleEntity } from '../vehicle/module/vehicle.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([vehicleEntity])],
  controllers: [FileController],
  providers: [ExportService, VehicleService, vehicleEntity],
})
export class FileModule {}
