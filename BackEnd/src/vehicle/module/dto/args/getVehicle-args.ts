import { ArgsType, Field } from "@nestjs/graphql";

@ArgsType()
export class GetVehicleArgs {
    @Field({nullable:true})
    ofset:Number
    @Field({nullable:true})
    model:string

}