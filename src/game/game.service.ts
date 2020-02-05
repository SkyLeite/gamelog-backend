import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import Game from './game.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { GetGameDto } from './get-game.dto';

@Injectable()
export class GameService {

    constructor(
        @InjectRepository(Game)
        private readonly gameRepository: Repository<Game>,
    ) {}

    async getGames() {
        return this.gameRepository.find({
            take: 20,
        });
    }

    async getGame(id: number) {
        return this.gameRepository.findOne(id);
    }

}
