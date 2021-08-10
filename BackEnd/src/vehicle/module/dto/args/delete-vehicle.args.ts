import { ArgsType, Field } from "@nestjs/graphql";

@ArgsType()
export class DeleteVehicleArgs {
    @Field()
    id:string
}