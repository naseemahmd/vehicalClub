import { ArgsType, Field } from "@nestjs/graphql";

@ArgsType()
export class GetUsersArgs {
    @Field(() => [String])
    ids: Number[];
}