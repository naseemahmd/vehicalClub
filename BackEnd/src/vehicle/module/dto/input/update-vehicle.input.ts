import { Field, InputType, ObjectType } from "@nestjs/graphql";


@InputType()
export class UpdateVehicleDetails {
    @Field({ nullable: true })
    firstName: string;
    @Field({ nullable: true})
    lastName:string;
    @Field({ nullable: true })
    carMake:string;
    @Field({ nullable: true })
    carModel:string;
    @Field({ nullable: true })
    vinNumber:string;
    @Field({ nullable: true })
    manufacturedDate:string;
    @Field({ nullable: true })
    ageOfVehicle:string;
    @Field({ nullable: true })
    email:string;
    
}