import { ArgsType, Field } from "@nestjs/graphql";

@ArgsType()
export class UpdateVehicleArgs {
    @Field()
    id:string
}