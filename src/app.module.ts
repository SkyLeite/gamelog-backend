import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { GameModule } from './game/game.module';
import { PlatformModule } from './platform/platform.module';
import { EntryModule } from './entry/entry.module';
import { ProfileModule } from './profile/profile.module';

@Module({
    imports: [TypeOrmModule.forRoot(), UserModule, AuthModule, GameModule, PlatformModule, EntryModule, ProfileModule],
    controllers: [AppController, UserController],
    providers: [AppService],
})
export class AppModule {}
