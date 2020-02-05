import { Module } from '@nestjs/common';
import { EntryService } from './entry.service';
import { EntryController } from './entry.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import Entry from './entry.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Entry])],
    providers: [EntryService],
    controllers: [EntryController],
    exports: [EntryModule]
})
export class EntryModule {}
