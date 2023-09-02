import { Type } from "class-transformer";
import { IsDate, IsEmail, IsNotEmpty, IsNumber, IsString, IsStrongPassword } from "class-validator";
export class SignInDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}