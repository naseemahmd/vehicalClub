import { Module } from '@nestjs/common';
import { VehicleResolver } from './vehicle.resolver';
import { VehicleService } from './vehicle.service';
import { vehicleEntity } from  './module/vehicle.entity'
import { TypeOrmModule } from '@nestjs/typeorm';
import {FileDownloadModule} from '../FileDownload/fileDownload.module'


@Module({
    imports:[TypeOrmModule.forFeature([vehicleEntity])],
    providers:[VehicleResolver, VehicleService,vehicleEntity,FileDownloadModule]
})
export class VehicleModule { }