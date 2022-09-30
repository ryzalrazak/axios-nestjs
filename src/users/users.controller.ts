import { Controller, Post, Body, Get, Param, Patch, Delete } from "@nestjs/common";
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    //Add new user
    @Post()
    async adduser(
        @Body('firstName') firstName: string,
        @Body('lastName') lastName: string,
        @Body('age') age: number,
    ) {
        const generatedId = await this.usersService.insertUser(
            firstName,
            lastName,
            age);
        return { id: generatedId };

    }


    //fetch all users
    @Get()
    async getAllUsers() {
        const users = await this.usersService.getUsers();
        return users;
    }

    //fetch single user
    @Get(':id')
    getUser(@Param('id') userID: string) {
        return this.usersService.getSingleUser(userID);
    }

    //update users' detail
    @Patch(':id')
    async updateUser(
        @Param('id') userID: string,
        @Body('firstName') firstName: string,
        @Body('lastName') lastName: string,
        @Body('age') age: number,
    ) {
        await this.usersService.updateUser(userID, firstName, lastName, age);
        return null;
    }

    //delete user
    @Delete(':id')
    async removeUser(@Param('id') userID: string) {
        await this.usersService.deleteUser(userID);
        return null;
    }

    //dah siap, esok try run

}