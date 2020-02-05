import { Controller, Get, Body, Param } from '@nestjs/common';
import { GetGameDto } from './get-game.dto';
import { GameService } from './game.service';

@Controller('game')
export class GameController {
    constructor(
        private readonly gameService: GameService,
    ) {}

    @Get()
    getGames() {
        return this.gameService.getGames();
    }

    @Get(':id')
    getGame(@Param('id') id: number) {
        return this.gameService.getGame(id);
    }
}
