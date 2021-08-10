import { Injectable } from "@nestjs/common";
import { GetUserArgs } from "./module/dto/args/get-user.args";
import { GetUsersArgs } from "./module/dto/args/get-users.args";
import { GraphQLClient ,gql } from 'graphql-request'
import { User } from "./module/user";
import { v4 as uuidv4 } from 'uuid';
import { CreateUserInput } from "./module/dto/input/create-user.input";

@Injectable()
export class UserService{
    private users: User[] = []
    private client = new GraphQLClient("http://localhost:5000/graphql");
    public createUser(createUserData: CreateUserInput): User {
        const user: User = {
            id: uuidv4(),
            ...createUserData
        }

        this.users.push(user);

        return user;
    }

    public getUser(getUserArgs: GetUserArgs): User {
        return this.users.find(user => user.id === getUserArgs.id);
    }

    public async getUsers(): Promise<User[]> {
        const query = gql`
       query{
            allUsers{
                nodes{
                    id
                    firstName
                }
            }
        }`


        const data = await this.client.request(query)
        console.log(data.allUsers.nodes);
        return data.allUsers.nodes
    }
}