import { Module } from '@nestjs/common';
import { MongooseModule} from '@nestjs/mongoose';
import { UsersController } from './users.controller';
import { UsersSchema } from './users.model';
import { UsersService } from './users.service';

@Module({
    imports: [MongooseModule.forFeature([{name: 'User', schema: UsersSchema}]),
],
    controllers: [UsersController],
    providers: [UsersService],
})

export class UsersModule{}