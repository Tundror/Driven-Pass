import { IsNotEmpty, IsString } from "class-validator";


export class CreateNoteDto {
    @IsString()
    @IsNotEmpty()
    name: string

    @IsString()
    @IsNotEmpty()
    text: string
}