import { Controller, UseGuards, Get, Req, Post, Body, Put, Delete } from '@nestjs/common';
import { EntryService } from './entry.service';
import { AuthGuard } from '@nestjs/passport';
import User from 'src/user/user.entity';
import { AppRequest } from 'src/types';
import { CreateEntryDto } from './create-entry.dto';
import { UpdateEntryDto } from './update-entry.dto';
import { DeleteEntryDto } from './delete-entry.dto';

@Controller('entries')
export class EntryController {
    constructor(
        private readonly entryService: EntryService,
    ) {}

    @UseGuards(AuthGuard('jwt'))
    @Get()
    getEntries(@Req() req: AppRequest) {
        return this.entryService.getEntries(req.user.id);
    }

    @UseGuards(AuthGuard('jwt'))
    @Post()
    createEntry(@Body() data: CreateEntryDto) {
        return this.entryService.createEntry(data);
    }

    @UseGuards(AuthGuard('jwt'))
    @Put()
    updateEntry(@Body() data: UpdateEntryDto) {
        return this.entryService.updateEntry(data);
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete()
    deleteEntry(@Req() req: AppRequest, @Body() data: DeleteEntryDto) {
        return this.entryService.deleteEntry(data, req.user.id);
    }
}
