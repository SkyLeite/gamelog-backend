import { IsInt, IsString, IsDate, IsNotEmpty, IsEnum, IsDefined, IsOptional, Min, Max } from "class-validator";
import { EntryStatus } from "./entry.entity";

export class UpdateEntryDto {
    @IsDefined()
    @IsInt()
    id: number;
    
    @IsOptional()
    @IsInt()
    @Min(0)
    @Max(10)
    rating?: number;

    @IsOptional()
    @IsString()
    notes?: string;

    @IsOptional()
    @IsInt()
    minutesPlayed?: number;

    @IsOptional()
    @IsDate()
    endDate?: Date;

    @IsOptional()
    @IsEnum(EntryStatus)
    status?: EntryStatus;
}
