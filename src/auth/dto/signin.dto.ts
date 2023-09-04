import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsEmail, IsNotEmpty, IsNumber, IsString, IsStrongPassword } from "class-validator";
export class SignInDto {
    @IsEmail()
    @IsNotEmpty()
    @ApiProperty({
        example: "kratos@email.com",
        description: "user email"
    })
    email: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        example: "S3nh4F0rt3!",
        description: "user password"
    })
    password: string;
}