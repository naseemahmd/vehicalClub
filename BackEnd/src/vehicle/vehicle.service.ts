
import { VehicleDTO} from "./module/vehicalDto";
import {Vehicle} from "./module/vehicle"
import { vehicleEntity} from './module/vehicle.entity'
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, createConnection } from 'typeorm';
import { GraphQLClient ,gql } from 'graphql-request'
import {UpdateVehicleDetails} from '../vehicle/module/dto/input/update-vehicle.input'
import {DeleteVehicleArgs} from '../vehicle/module/dto/args/delete-vehicle.args'
import {UpdateVehicleArgs} from '../vehicle/module/dto/args/update-vehicle.args'
import {GetVehicleArgs} from 'src/vehicle/module/dto/args/getVehicle-args';
@Injectable()
export class VehicleService {

    constructor(@InjectRepository(vehicleEntity) private vehicalRepository: Repository<vehicleEntity>) { }
    private client = new GraphQLClient("http://localhost:5000/graphql");
    
    async create(data: Vehicle) {
       
        const manudate = new Date(data.manufactured_date);
        const age = this.calculateVehicalAge(manudate);

        data.age_of_vehicle = age + "";
        try {
            
            const vEntity = await this.vehicalRepository.create(data);
            console.log(vEntity,"after");

            await this.vehicalRepository.save(vEntity);
            console.log("before");
            return vEntity;
        } catch (error) {
            console.log(error, "error");
        }
        
    }

    calculateVehicalAge(manuDate) { 
        const age = new Date(Date.now() - manuDate);
       
        return Math.abs(age.getUTCFullYear() - 1970);
    }

    private vehicle : VehicleDTO[] = []

    

    public async deleteVehicleDetails(deleteVehicleArgs:DeleteVehicleArgs) : Promise<VehicleDTO>{

        const query = gql`
            mutation {
                deleteVehicleById(input:{id:"${deleteVehicleArgs.id}"}){
                    vehicle{
                        id
                        vId,
                        firstName,
                        lastName,
                        email,
                        carMake,
                        carModel,
                        vinNumber,
                        manufacturedDate,
                        ageOfVehicle

                    }
                }
             }`
                const data = await this.client.request(query)

                let singleData ={
                    id : data.deleteVehicleById.vehicle.id,
                    v_id : data.deleteVehicleById.vehicle.vId,
                    first_name: data.deleteVehicleById.vehicle.firstName,
                    last_name:data.deleteVehicleById.vehicle.lastName,
                    email:data.deleteVehicleById.vehicle.email,
                    car_make:data.deleteVehicleById.vehicle.carMake,
                    car_model:data.deleteVehicleById.vehicle.carModel,
                    vin_number:data.deleteVehicleById.vehicle.vinNumber,
                    manufactured_date:data.deleteVehicleById.vehicle.manufacturedDate,
                    age_of_vehicle:data.deleteVehicleById.vehicle.ageOfVehicle,
                }
                return singleData
    }

    public async updateVehicleDetails(UpdateVehicleArgs:UpdateVehicleArgs,updateVehicalData:UpdateVehicleDetails) : Promise<VehicleDTO>{
        console.log(updateVehicalData,"a");
        //console.log(`"${updateVehicalData}"`,"args");
        // let value = Object.create( null )
        let value = {...updateVehicalData};
        // console.log(value,);
        const query = gql`
            mutation {
                updateVehicleById(input:{vehiclePatch:{
                    email:"${value.email}",
                    firstName:"${value.firstName}",
                    lastName:"${value.lastName}"
                    },
                    id:"${UpdateVehicleArgs.id}"}){
                    vehicle{
                        id
                        vId,
                        firstName,
                        lastName,
                        email,
                        carMake,
                        carModel,
                        vinNumber,
                        manufacturedDate,
                        ageOfVehicle

                    }
                }
             }`

            // const query = gql`{
                // mutation {
                    // updateVehicleById(input:{id:"${UpdateVehicleArgs.id}"
                    // vehiclePatch:{firstName:"${updateVehicalData.firstName}", lastName:"${updateVehicalData.lastName}",
                    // email:"${updateVehicalData.email}",carMake:"${updateVehicalData.carMake}",carModel:"${updateVehicalData.carModel}",
                    // vinNumber:"${updateVehicalData.vinNumber}",manufacturedDate:"${updateVehicalData.manufacturedDate}",
                    // ageOfVehicle:"${updateVehicalData.ageOfVehicle}"
                //     }}){
                //            vehicle{
                //                vId
       
                //            }
                //        }
                //     }

            //     mutation updateVehical($id:String,$firstName:String,$lastName:String,$email:String,$carMake:String,$carModel:String,$vinNumber:String,$manufacturedDate:String,$ageOfVehicle:String) {
            //     updateVehicleById(input:{id:$id
            //     vehiclePatch:{firstName:$firstName, lastName:$lastName,
            //     email:$email,carMake:$carMake,carModel:$carModel,
            //     vinNumber:$vinNumber,manufacturedDate:$manufacturedDate,
            //     ageOfVehicle:$ageOfVehicle
            //     }}){
            //             vehicle{
            //                 vId

            //             }
            //         }
            //     }
            // }`
        const data = await this.client.request(query)
        console.log(data.updateVehicleById.vehicle,"data");     
        let singleData ={
            id:data.updateVehicleById.vehicle.id,
            v_id : data.updateVehicleById.vehicle.vId,
            first_name: data.updateVehicleById.vehicle.firstName,
            last_name:data.updateVehicleById.vehicle.lastName,
            email:data.updateVehicleById.vehicle.email,
            car_make:data.updateVehicleById.vehicle.carMake,
            car_model:data.updateVehicleById.vehicle.carModel,
            vin_number:data.updateVehicleById.vehicle.vinNumber,
            manufactured_date:data.updateVehicleById.vehicle.manufacturedDate,
            age_of_vehicle:data.updateVehicleById.vehicle.ageOfVehicle,
        }
        return singleData
    }


    public async getVehicleDetails(getVehicleArgs:GetVehicleArgs) : Promise<VehicleDTO[]>{
        this.vehicle = []
        console.log(getVehicleArgs.ofset,"iiiiiii");
        let query = ''
        if(getVehicleArgs.ofset){
        query = gql`
        query{
             allVehicles(first:100,offset:${getVehicleArgs.ofset}){
                 nodes{
                     id
                     vId,
                     firstName,
                     lastName,
                     email,
                     carMake,
                     carModel,
                     vinNumber,
                     manufacturedDate,
                     ageOfVehicle
                 }
             }
         }`
        }else{
            query = gql`
        query{
             allVehicles{
                 nodes{
                     id
                     vId,
                     firstName,
                     lastName,
                     email,
                     carMake,
                     carModel,
                     vinNumber,
                     manufacturedDate,
                     ageOfVehicle
                 }
             }
         }`
        }
        const data = await this.client.request(query)
        if(getVehicleArgs.model){
            data.allVehicles.nodes.forEach(single => {
                if((single.carModel).toLocaleLowerCase().includes(getVehicleArgs.model.toLocaleLowerCase())){
                    let singleData ={
                        id:single.id,
                        v_id : single.vId,
                        first_name: single.firstName,
                        last_name:single.lastName,
                        email:single.email,
                        car_make:single.carMake,
                        car_model:single.carModel,
                        vin_number:single.vinNumber,
                        manufactured_date:single.manufacturedDate,
                        age_of_vehicle:single.ageOfVehicle,
                    }
                    console.log(singleData,"sdad");
                    if(this.vehicle.length <= 100){
                        this.vehicle.push(singleData)
                    }
                    
                  }
            })
        }else{
            data.allVehicles.nodes.forEach(single => {
                let singleData ={
                    id:single.id,
                    v_id : single.vId,
                    first_name: single.firstName,
                    last_name:single.lastName,
                    email:single.email,
                    car_make:single.carMake,
                    car_model:single.carModel,
                    vin_number:single.vinNumber,
                    manufactured_date:single.manufacturedDate,
                    age_of_vehicle:single.ageOfVehicle,
                }
                console.log(singleData,"sdad");
                this.vehicle.push(singleData)
                
                
            });
    }
         console.log(this.vehicle,"sdasd");
         return this.vehicle
     
    }



    public async getDetailsFile(minAge:number,maxAge:number) : Promise<VehicleDTO[]>{
        this.vehicle = []
      
        let query = gql`
        query{
             allVehicles{
                 nodes{
                     id
                     vId,
                     firstName,
                     lastName,
                     email,
                     carMake,
                     carModel,
                     vinNumber,
                     manufacturedDate,
                     ageOfVehicle
                 }
             }
         }`
        
        const data = await this.client.request(query)
            console.log(data.allVehicles.nodes,"sadada");
            console.log(minAge,maxAge,"asdadasd");
            data.allVehicles.nodes.forEach(single => {
                console.log(single.ageOfVehicle,"Sasdad");
                if(single.ageOfVehicle > minAge || single.ageOfVehicle < maxAge){
                    let singleData ={
                        id:single.id,
                        v_id : single.vId,
                        first_name: single.firstName,
                        last_name:single.lastName,
                        email:single.email,
                        car_make:single.carMake,
                        car_model:single.carModel,
                        vin_number:single.vinNumber,
                        manufactured_date:single.manufacturedDate,
                        age_of_vehicle:single.ageOfVehicle,
                    }
                    console.log(singleData,"sdad");

                    this.vehicle.push(singleData)
                    
                  }
            })
        
         console.log(this.vehicle,"sdasd");
         return this.vehicle
     
    }
}