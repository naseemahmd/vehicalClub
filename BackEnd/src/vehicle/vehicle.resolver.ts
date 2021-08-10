import { VehicleDTO} from "./module/vehicalDto";
import { Resolver, Query, Args, Mutation } from "@nestjs/graphql";
import {VehicleService} from 'src/vehicle/vehicle.service';
import {DeleteVehicleArgs} from 'src/vehicle/module/dto/args/delete-vehicle.args';
import {UpdateVehicleArgs} from 'src/vehicle/module/dto/args/update-vehicle.args';
import {GetVehicleArgs} from 'src/vehicle/module/dto/args/getVehicle-args';
import {UpdateVehicleDetails} from 'src/vehicle/module/dto/input/update-vehicle.input';

@Resolver(() => VehicleDTO)
export class VehicleResolver {
    constructor(private readonly vehicleService:VehicleService) {}
        @Mutation(() => VehicleDTO) 
       async updateVehicleDetails(@Args() updateVehicleArgs:UpdateVehicleArgs,
         @Args('updateVehicaleData') updateVehicleDetails:UpdateVehicleDetails):Promise<VehicleDTO>{
            const data = await this.vehicleService.updateVehicleDetails(updateVehicleArgs,updateVehicleDetails)
            return data
        }

        @Mutation(() => VehicleDTO) 
        async deleteVehicleDetails(@Args() deleteVehicleArgs:DeleteVehicleArgs):Promise<VehicleDTO>{
            const date = await this.vehicleService.deleteVehicleDetails(deleteVehicleArgs);
            return date
        }


        @Query(() => [VehicleDTO], { name: 'vehicals', nullable: 'items' })
        async getVehicleDetails(@Args() getVehicleArgs:GetVehicleArgs):Promise<VehicleDTO[]>{
            const data =  await this.vehicleService.getVehicleDetails(getVehicleArgs);
            console.log(data,"hhhh");
            return data
        }
}