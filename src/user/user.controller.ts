import { Controller, Get, Post, Body, Param, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import User from './user.entity';
import { CreateUserDto } from './create-user.dto';
import { FindUserDto } from './find-user.dto';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @UseGuards(AuthGuard('jwt'))
    @Get("me")
    getUser(@Req() req: Request, @Param() data: FindUserDto) {
        return req.user;
    }

    @Get(":id")
    getUserById(@Param() data: FindUserDto) {
        return this.userService.findOneById(data.id);
    }

    @Post()
    createUser(@Body() data: CreateUserDto): Promise<User> {
        return this.userService.create(data.username, data.password);
    }
}
