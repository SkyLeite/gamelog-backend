import { EntryStatus } from "./entry.entity";
import { IsNotEmpty, IsInt, IsString, IsDate, IsEnum, Min, Max, IsOptional } from "class-validator";

export class CreateEntryDto {
    @IsOptional()
    @IsInt()
    @Min(0)
    @Max(10)
    rating: number;

    @IsOptional()
    @IsString()
    notes: string;

    @IsOptional()
    @IsInt()
    minutesPlayed: number;

    @IsOptional()
    @IsDate()
    endDate: Date;

    @IsOptional()
    @IsEnum(EntryStatus)
    @IsNotEmpty()
    status: EntryStatus;
}
