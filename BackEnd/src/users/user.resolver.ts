import { Resolver, Query, Args, Mutation } from "@nestjs/graphql";
import { GetUserArgs } from "./module/dto/args/get-user.args";
import { GetUsersArgs } from "./module/dto/args/get-users.args";
import { CreateUserInput } from "./module/dto/input/create-user.input";
import { User } from "./module/user";
import { UserService } from "./user.service";

 
 @Resolver(() => User)

 export class UserResolver {
     constructor(private readonly userService:UserService) {}

     @Mutation(() => User)
        createUser(@Args('createUserData') createUserData: CreateUserInput): User {
        return this.userService.createUser(createUserData);
    }

     @Query(() => User, {name:'user',nullable:true})
     getUser(@Args() getUserArgs:GetUserArgs):User {
         return this.userService.getUser(getUserArgs);
     }
     @Query(() => [User], { name: 'users', nullable: 'items' })
    getUsers():Promise<User[]> {
        console.log(this.userService.getUsers());
        return this.userService.getUsers();
    }
 }