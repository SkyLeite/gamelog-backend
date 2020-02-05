import { IsInt, IsNotEmpty } from "class-validator";

export class DeleteEntryDto {
    @IsNotEmpty()
    @IsInt()
    id: number;
}
