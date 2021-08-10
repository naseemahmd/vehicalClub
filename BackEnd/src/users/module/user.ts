import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class User {
    @Field()
    id: Number;
    @Field()
    firstName: String;
    
}