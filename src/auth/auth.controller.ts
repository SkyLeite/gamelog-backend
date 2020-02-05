import { Controller, Request, UseGuards, Post } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AppRequest } from 'src/types';

@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService,
    ) {}

    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(@Request() req: AppRequest) {
        return this.authService.login(req.user);
    }

}
