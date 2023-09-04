import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";


export class CreateNoteDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        example: "my note",
        description: "note identifier"
    })
    name: string

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        example: "my note content",
        description: "content of the note"
    })
    text: string
}