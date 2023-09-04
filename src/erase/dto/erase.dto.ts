import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class EraseDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        example: "S3nh4F0rt3!",
        description: "user password"
    })
    password: string
}
