import { Field, ObjectType } from "@nestjs/graphql";
import { type } from "node:os";

@ObjectType() 
export class VehicleDTO {
    @Field()
    id: string;
    @Field({ nullable: true })
    v_id: string;
    @Field()
    first_name: string;
    @Field()
    last_name:string;
    @Field()
    email:string;
    @Field()
    car_make:string;
    @Field()
    car_model:string;
    @Field()
    vin_number:string;
    @Field()
    manufactured_date:string;
    @Field()
    age_of_vehicle:string;

    
}