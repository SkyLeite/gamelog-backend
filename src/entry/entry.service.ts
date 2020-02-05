import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Repository } from 'typeorm';
import Entry from './entry.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateEntryDto } from './create-entry.dto';
import { UpdateEntryDto } from './update-entry.dto';
import { DeleteEntryDto } from './delete-entry.dto';

@Injectable()
export class EntryService {

    constructor(
        @InjectRepository(Entry)
        private readonly entryRepository: Repository<Entry>,
    ) {}
    
    async getEntries(userId: number): Promise<Entry[]> {
        return this.entryRepository.find({
            where: {
                user: { id: userId }
            },
            relations: ["game"]
        });
    }

    async createEntry(data: CreateEntryDto): Promise<Entry> {
        const entry = this.entryRepository.create(data);
        return this.entryRepository.save(entry);
    }

    async updateEntry(data: UpdateEntryDto): Promise<void> {
        const { id, ...entryData } = data;
        await this.entryRepository.update(data.id, entryData);
    }

    async deleteEntry(data: DeleteEntryDto, userId: number): Promise<void> {
        const entry = await this.entryRepository.findOne(data.id);

        if (entry.user.id === userId) {
            entry.deletedAt = new Date();
            await this.entryRepository.save(entry);
        } else {
            throw new UnauthorizedException();
        }
    }

}
