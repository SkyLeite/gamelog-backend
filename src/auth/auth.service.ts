import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import User from 'src/user/user.entity';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) {}

    async validateUser(username: string, password: string): Promise<User | undefined> {
        const user = await this.userService.findByUsername(username);
        if (user && await user.validatePassword(password)) {
            return user;
        }
    }

    async login(user: User) {
        const payload = { username: user.name, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload),
        }
    }
}
