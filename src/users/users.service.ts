import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './users.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
    constructor(@InjectModel('User') private readonly userModel: Model<User>) { }

    //throw execption error message
    private async findUser(id: string): Promise<User> {
        let user;
        try{
             user = await this.userModel.findById(id).exec();
        } catch (error) {
        throw new NotFoundException('Could not find user');
        }
        if(!user){
            throw new NotFoundException('Could not find user');
        }
        return user;
     }

        //Add new user's service
    async insertUser(firstName: string, lastName: string, age: number){
        const newUser = new this.userModel({firstName, lastName, age, });
        const result = await newUser.save();

        return result.id as String;
    }

    //fetch all user's service
    async getUsers(){
    const users = await this.userModel.find().exec();
    return users.map((user) => ({
        id:user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        age: user.age,
    }));
    }

    
//get single user's service
async getSingleUser(userID: string){
    const user = await this.findUser(userID);
    return{
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      age:user.age,
  
    };
}

//update user's details
async updateUser(
    userID: string,
    firstName: string,
    lastName: string,
    age: number,
){
    const updatedUser = await this.findUser(userID);
    if(firstName){
        updatedUser.firstName = firstName;
    }
    if(lastName){
        updatedUser.lastName = lastName;
    }
    if(age){
        updatedUser.age = age;
    }

    updatedUser.save();
}

async deleteUser(userID: string){
    const result = await this.userModel.deleteOne({_id:userID}).exec();

    if(result.deletedCount === 0){
        throw new NotFoundException('could Not find user');
    }
}



}